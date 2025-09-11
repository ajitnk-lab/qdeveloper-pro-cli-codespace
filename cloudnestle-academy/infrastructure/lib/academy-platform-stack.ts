import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ecsPatterns from 'aws-cdk-lib/aws-ecs-patterns';
import * as rds from 'aws-cdk-lib/aws-rds';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as elasticache from 'aws-cdk-lib/aws-elasticache';
import { Construct } from 'constructs';

export class AcademyPlatformStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Add cost tracking tags to all resources
    cdk.Tags.of(this).add('Project', 'cloudnestleacademy');
    cdk.Tags.of(this).add('Environment', 'production');
    cdk.Tags.of(this).add('Owner', 'CloudNestle');

    // VPC
    const vpc = new ec2.Vpc(this, 'AcademyVPC', {
      maxAzs: 2,
      natGateways: 1,
    });

    // S3 Bucket for course content
    const contentBucket = new s3.Bucket(this, 'AcademyContentBucket', {
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      versioned: true,
      cors: [{
        allowedMethods: [s3.HttpMethods.GET, s3.HttpMethods.POST],
        allowedOrigins: ['*'],
        allowedHeaders: ['*'],
      }],
    });

    // RDS PostgreSQL Database
    const database = new rds.DatabaseInstance(this, 'AcademyDatabase', {
      engine: rds.DatabaseInstanceEngine.postgres({
        version: rds.PostgresEngineVersion.VER_15,
      }),
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T3, ec2.InstanceSize.MICRO),
      vpc,
      credentials: rds.Credentials.fromGeneratedSecret('academy_admin'),
      databaseName: 'academy_platform',
      allocatedStorage: 20,
      storageEncrypted: true,
      backupRetention: cdk.Duration.days(7),
      deletionProtection: false, // Set to true for production
    });

    // Redis ElastiCache
    const redisSubnetGroup = new elasticache.CfnSubnetGroup(this, 'RedisSubnetGroup', {
      description: 'Subnet group for Redis',
      subnetIds: vpc.privateSubnets.map(subnet => subnet.subnetId),
    });

    const redis = new elasticache.CfnCacheCluster(this, 'AcademyRedis', {
      cacheNodeType: 'cache.t3.micro',
      engine: 'redis',
      numCacheNodes: 1,
      cacheSubnetGroupName: redisSubnetGroup.ref,
      vpcSecurityGroupIds: [database.connections.securityGroups[0].securityGroupId],
      tags: [{
        key: 'Project',
        value: 'cloudnestleacademy'
      }],
    });

    // ECS Cluster
    const cluster = new ecs.Cluster(this, 'AcademyCluster', {
      vpc,
    });

    // Fargate Service
    const fargateService = new ecsPatterns.ApplicationLoadBalancedFargateService(this, 'AcademyService', {
      cluster,
      cpu: 256,
      memoryLimitMiB: 512,
      desiredCount: 1,
      taskImageOptions: {
        image: ecs.ContainerImage.fromAsset('../academy-platform'),
        containerPort: 3000,
        environment: {
          NODE_ENV: 'production',
          AWS_S3_BUCKET: contentBucket.bucketName,
          AWS_REGION: this.region,
          DATABASE_URL: `postgresql://${database.secret?.secretValueFromJson('username').unsafeUnwrap()}:${database.secret?.secretValueFromJson('password').unsafeUnwrap()}@${database.instanceEndpoint.hostname}:5432/${database.secret?.secretValueFromJson('dbname').unsafeUnwrap()}`,
          NEXTAUTH_SECRET: 'cloudnestle-academy-secret-2025',
          NEXTAUTH_URL: 'https://d22xjflyfu64hu.cloudfront.net',
          NEXT_PUBLIC_ADMIN_EMAIL: 'admin@cloudnestle.com',
          ADMIN_EMAIL: 'admin@cloudnestle.com',
          GOOGLE_CLIENT_ID: 'demo-client-id',
          GOOGLE_CLIENT_SECRET: 'demo-client-secret',
        },
      },
      publicLoadBalancer: true,
      listenerPort: 80,
    });

    // Allow ECS to access RDS
    database.connections.allowFrom(fargateService.service, ec2.Port.tcp(5432));

    // Allow ECS to access S3
    contentBucket.grantReadWrite(fargateService.taskDefinition.taskRole);

    // CloudFront Distribution
    const distribution = new cloudfront.Distribution(this, 'AcademyDistribution', {
      defaultBehavior: {
        origin: new origins.LoadBalancerV2Origin(fargateService.loadBalancer, {
          protocolPolicy: cloudfront.OriginProtocolPolicy.HTTP_ONLY,
        }),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        cachePolicy: cloudfront.CachePolicy.CACHING_DISABLED, // Disable for dynamic content
      },
      additionalBehaviors: {
        '/static/*': {
          origin: new origins.S3Origin(contentBucket),
          viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
          cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
        },
      },
    });

    // Outputs
    new cdk.CfnOutput(this, 'LoadBalancerDNS', {
      value: fargateService.loadBalancer.loadBalancerDnsName,
    });

    new cdk.CfnOutput(this, 'CloudFrontURL', {
      value: distribution.distributionDomainName,
    });

    new cdk.CfnOutput(this, 'DatabaseEndpoint', {
      value: database.instanceEndpoint.hostname,
    });

    new cdk.CfnOutput(this, 'S3BucketName', {
      value: contentBucket.bucketName,
    });
  }
}
