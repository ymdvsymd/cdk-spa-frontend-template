#!/usr/bin/env node
import * as cdk from "@aws-cdk/core";
import "source-map-support/register";
import { Context, StackProps } from "../lib/context";
import { FrontendStack } from "../lib/frontend-stack";

const app = new cdk.App();
const context = new Context(app.node);
const props: StackProps = {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
  context: context,
};

new FrontendStack(app, `${context.stackPrefix}Frontend`, props);
