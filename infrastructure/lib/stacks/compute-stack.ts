import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
import { Construct } from 'constructs';

export interface ComputeStackProps extends cdk.NestedStackProps {
  bucket: s3.Bucket;
}

export class ComputeStack extends cdk.NestedStack {
  public readonly api: apigateway.RestApi;

  constructor(scope: Construct, id: string, props: ComputeStackProps) {
    super(scope, id, props);

    // Get Brevo API key from Secrets Manager
    const brevoSecret = secretsmanager.Secret.fromSecretNameV2(
      this,
      'BrevoSecret',
      'brevo-api-key'
    );

    // Newsletter subscription Lambda
    const subscribeFunction = new lambda.Function(this, 'NewsletterSubscribe', {
      runtime: lambda.Runtime.PYTHON_3_12,
      handler: 'newsletter-subscribe.handler',
      code: lambda.Code.fromAsset('../lambda'),
      environment: {
        BREVO_SECRET_ARN: brevoSecret.secretArn,
      },
      timeout: cdk.Duration.seconds(30),
    });

    // Newsletter campaign Lambda
    const campaignFunction = new lambda.Function(this, 'NewsletterCampaign', {
      runtime: lambda.Runtime.PYTHON_3_12,
      handler: 'newsletter-campaign.handler',
      code: lambda.Code.fromAsset('../lambda'),
      environment: {
        BREVO_SECRET_ARN: brevoSecret.secretArn,
      },
      timeout: cdk.Duration.seconds(30),
    });

    // Grant Lambda functions permission to read the secret
    brevoSecret.grantRead(subscribeFunction);
    brevoSecret.grantRead(campaignFunction);

    // API Gateway
    this.api = new apigateway.RestApi(this, 'NewsletterApi', {
      restApiName: 'CloudNestle Newsletter API',
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
      },
    });

    // /subscribe endpoint
    const subscribe = this.api.root.addResource('subscribe');
    subscribe.addMethod('POST', new apigateway.LambdaIntegration(subscribeFunction));

    // /campaign endpoint
    const campaign = this.api.root.addResource('campaign');
    campaign.addMethod('POST', new apigateway.LambdaIntegration(campaignFunction));

    // Outputs
    new cdk.CfnOutput(this, 'ApiUrl', {
      value: this.api.url,
      description: 'Newsletter API URL'
    });

    new cdk.CfnOutput(this, 'SubscribeEndpoint', {
      value: `${this.api.url}subscribe`,
      description: 'Newsletter subscription endpoint'
    });

    new cdk.CfnOutput(this, 'CampaignEndpoint', {
      value: `${this.api.url}campaign`,
      description: 'Newsletter campaign endpoint'
    });
  }
}
