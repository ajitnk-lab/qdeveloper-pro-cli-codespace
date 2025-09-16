#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { CloudnestleStack } from '../lib/cloudnestle-stack';

const app = new cdk.App();
new CloudnestleStack(app, 'CloudnestleStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});