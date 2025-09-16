import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

export interface ComputeStackProps extends cdk.NestedStackProps {
  bucket: s3.Bucket;
}

export class ComputeStack extends cdk.NestedStack {
  public readonly cmsFunction: lambda.Function;

  constructor(scope: Construct, id: string, props: ComputeStackProps) {
    super(scope, id, props);

    // Lambda function for CMS operations
    this.cmsFunction = new lambda.Function(this, 'CmsFunction', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'index.handler',
      code: lambda.Code.fromInline(`
        exports.handler = async (event) => {
          return {
            statusCode: 200,
            body: JSON.stringify({ message: 'CMS function ready' })
          };
        };
      `),
      environment: {
        BUCKET_NAME: props.bucket.bucketName,
      },
    });

    // Grant permissions to S3 bucket
    props.bucket.grantReadWrite(this.cmsFunction);

    // Output function ARN
    new cdk.CfnOutput(this, 'CmsFunctionArn', {
      value: this.cmsFunction.functionArn,
      description: 'CMS Lambda function ARN'
    });
  }
}
