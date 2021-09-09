// import {
//   expect as expectCDK,
//   MatchStyle,
//   matchTemplate,
// } from "@aws-cdk/assert";
import * as cdk from "@aws-cdk/core";
import { Context } from "../lib/context";
import { FrontendStack } from "../lib/frontend-stack";

test("Empty Stack", () => {
  const app = new cdk.App();
  // WHEN
  const stack = new FrontendStack(app, "MyTestStack", {
    context: new Context(app.node),
  });
  // THEN
  // expectCDK(stack).to(
  //   matchTemplate(
  //     {
  //       Resources: {},
  //     },
  //     MatchStyle.EXACT
  //   )
  // );
});
