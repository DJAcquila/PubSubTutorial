#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib'
import {PubSubStack} from '../lib/pub-sub-stack';

const app = new cdk.App();
new PubSubStack(app, 'pub-sub-stack', {
  stackName: 'pub-sub-stack',
  env: {
    region: 'us-west-2',
    account: '254152609012',
  },
});