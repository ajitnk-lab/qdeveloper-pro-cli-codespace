import * as cdk from 'aws-cdk-lib';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import { Construct } from 'constructs';

export interface NetworkingStackProps extends cdk.NestedStackProps {
  domainName: string;
}

export class NetworkingStack extends cdk.NestedStack {
  public readonly hostedZone: route53.IHostedZone;
  public readonly certificate: acm.ICertificate;

  constructor(scope: Construct, id: string, props: NetworkingStackProps) {
    super(scope, id, props);

    // Use existing hosted zone for domain
    this.hostedZone = route53.HostedZone.fromHostedZoneAttributes(this, 'HostedZone', {
      hostedZoneId: 'Z08034342M6HNTR3SBCZC',
      zoneName: props.domainName
    });

    // Create SSL certificate
    this.certificate = new acm.Certificate(this, 'Certificate', {
      domainName: props.domainName,
      subjectAlternativeNames: [`www.${props.domainName}`],
      validation: acm.CertificateValidation.fromDns(this.hostedZone),
    });

    // Output nameservers - only if available
    if (this.hostedZone.hostedZoneNameServers && this.hostedZone.hostedZoneNameServers.length > 0) {
      new cdk.CfnOutput(this, 'NameServers', {
        value: cdk.Fn.join(',', this.hostedZone.hostedZoneNameServers),
        description: 'Route53 Name Servers for domain configuration'
      });
    }
  }
}
