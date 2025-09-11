#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { AcademyPlatformStack } from '../lib/academy-platform-stack';

const app = new cdk.App();

new AcademyPlatformStack(app, 'CloudNestleAcademyStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION || 'us-east-1',
  },
});
