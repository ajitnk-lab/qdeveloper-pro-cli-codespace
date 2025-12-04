#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { CloudnestleStack } from '../lib/cloudnestle-stack';

const app = new cdk.App();
const stack = new CloudnestleStack(app, 'CloudnestleStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: 'us-east-1',
  },
});

// Add cost allocation tags
cdk.Tags.of(stack).add('Project', 'cloudnetlewebsite');
cdk.Tags.of(stack).add('Version', 'V1');
cdk.Tags.of(stack).add('Environment', 'Prod');
cdk.Tags.of(stack).add('Purpose', 'Business website');