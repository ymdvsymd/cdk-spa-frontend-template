import * as acm from "@aws-cdk/aws-certificatemanager";
import "@aws-cdk/aws-cloudfront/lib/distribution";
import * as route53 from "@aws-cdk/aws-route53";
import * as route53Targets from "@aws-cdk/aws-route53-targets";
import * as cdk from "@aws-cdk/core";
import { CloudFrontToS3 } from "@aws-solutions-constructs/aws-cloudfront-s3";
import { StackProps } from "./context";

export class FrontendStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const cert = acm.Certificate.fromCertificateArn(
      this,
      "Certificate",
      props.context.certArn
    );

    const cfToS3 = new CloudFrontToS3(this, "CloudFrontToS3", {
      bucketProps: {
        versioned: false,
      },
      cloudFrontDistributionProps: {
        certificate: cert,
        domainNames: [props.context.frontendDomain],
      },
    });

    const hostedZone = route53.HostedZone.fromLookup(this, "HostedZone", {
      domainName: props.context.domain,
    });

    new route53.ARecord(this, "ARecord", {
      zone: hostedZone,
      recordName: props.context.frontendDomain,
      target: route53.RecordTarget.fromAlias(
        new route53Targets.CloudFrontTarget(cfToS3.cloudFrontWebDistribution)
      ),
    });
  }
}
