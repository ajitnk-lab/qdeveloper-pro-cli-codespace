import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { NetworkingStack } from './stacks/networking-stack';
import { StorageStack } from './stacks/storage-stack';
import { ComputeStack } from './stacks/compute-stack';

export class CloudnestleStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Networking Stack - Route53, ACM
    const networking = new NetworkingStack(this, 'Networking', {
      domainName: 'cloudnestle.com'
    });

    // Storage Stack - S3, CloudFront
    const storage = new StorageStack(this, 'Storage', {
      domainName: 'cloudnestle.com',
      certificate: networking.certificate,
      hostedZone: networking.hostedZone
    });

    // Compute Stack - Lambda functions for CMS
    const compute = new ComputeStack(this, 'Compute', {
      bucket: storage.bucket
    });
  }
}
