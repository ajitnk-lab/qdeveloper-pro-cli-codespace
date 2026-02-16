---
title: "AWS Cloud Credits for Open Source Projects:"
excerpt: "AWS Cloud Credits for Open Source Projects: Affirming Our Commitment"
publishedAt: "2026-02-16"
category: "AWS"
tags: []
author: "CloudNestle Team"
featured: false
---

# AWS Cloud Credits for Open Source Projects: Affirming Our Commitment

## Introduction

Today, Amazon Web Services (AWS) is proud to reaffirm our commitment to providing vital infrastructure for free and open source software (FOSS) projects. One of the ways we are doing this is with an extended $3 million annual commitment to the Kubernetes project, the container orchestration platform which underpins the Amazon Elastic Kubernetes Service (Amazon EKS). We’re also taking this opportunity to share updated eligibility and application requirements for our AWS Cloud Credits for Open Source program.

AWS is for the builders. Since Day One, we’ve worked hard to create a culture and technologies that help people develop innovative applications. There are few builders in the world doing such vital, transformative, and often thankless work as the contributors and maintainers on whom open source relies. These open source technologies and the communities around them are strong because of their core values: openness, innovation, free redistribution, collaboration, transparency, and accountability. The impact of open source is tremendous; it is at the heart of most software and hardware that people use daily. AWS would not be what it is today without open source. A majority of Amazon services are powered by open source, including two of our most widely-used ones: Amazon Simple Storage Service (Amazon S3) was built on open source Apache Tomcat and Linux, and Amazon Elastic Compute Cloud (Amazon EC2) was started with the help of the Xen hypervisor. 

Many of our customers run open source workloads on our cloud, either directly in Amazon EC2, or through managed open source services like Amazon EKS, Amazon Relational Database Service (Amazon RDS), and Amazon Managed Streaming for Apache Kafka (Amazon MSK). It is critical for AWS to invest in the open source ecosystem, ensuring it is sustainable and vibrant into the future.

## Our Impact

Since our Cloud Credits for Open Source program launched in 2019, we’ve provided AWS Promotional Credits to more than 200 different open source projects. We’ve donated millions of dollars in free services to projects ranging from hobbyists hacking on code in their spare time to the vital foundations which shepherd structural open source projects like the Apache Software Foundation, GNOME Foundation, Linux Foundation, Ruby Central, Rust Foundation, and more.

The impact of our AWS Promotional Credit contributions is best demonstrated by the beneficiaries of our Cloud Credits program. Here’s what Jeffrey Sica, the Cloud Native Computing Foundation’s (CNCF) Head of Projects, had to say about our contribution:

> “Cloud Credit donations from major providers is essential for Kubernetes’ sustainability. AWS’s continued support has helped scale testing, improve performance, and streamline workflows, reducing bottlenecks and operational overhead.”

AWS is a proud Maintaining Sponsor of the Python Software Foundation (PSF), supports the organization with an AWS Promotional Credits contribution, and also provides funding for a full-time Safety and Security Engineer for PyPI. Ee Durbin, Director of Infrastructure, had the following to say about the support they receive from AWS:

> “The support provided by Amazon Web Services (AWS) to the Python Software Foundation has been a core part of operating The Python Package Index (PyPI) since it was relaunched on an all new codebase in March 2018. AWS has provided the PyPI a reliable, stable, and extensible platform for our Kubernetes based deployments. Services like Amazon RDS, Amazon ElastiCache, Amazon Simple Email Service, Amazon OpenSearch Service, and Amazon SNS have made managing the services behind PyPI possible with such a small team. This kind of direct support to open source infrastructure projects is rare and we are happy to see AWS investing in not only the Python community, but the broader open source ecosystem it is built on as well.”

Let’s Encrypt is a Certificate Authority (CA) that provides free TLS certificates, making it easy for websites to enable HTTPS encryption. This organization is a vital part of today’s internet and we’ve supported it for years. When asked about the impact of our AWS Promotional Credits, Sarah Gran, the Vice President of the Internet Security Research Group (ISRG, the non-profit behind Let’s Encrypt) responded:

> “Let’s Encrypt provides free TLS certificates to more than 550 million websites, comprising roughly 60% of the Internet. The AWS Cloud Credits for Open Source program helps make this possible by supporting a critical part of the Web PKI—our Certificate Transparency (CT) logs. Along with only a handful of other CT logs supporting the daily operation of the entire Internet, our Let’s Encrypt CT logs help ensure Internet users’ security and privacy is protected. The AWS Credit Program also enables Let’s Encrypt to defend against Border Gateway Protocol (BGP) attacks on domain control validation via Multi-Perspective Issuance Corroboration (MPIC). In 2024, we increased our remote perspectives from two to four, bolstering our domain validation security and increasing the resilience of Let’s Encrypt issuance. We’re incredibly grateful to AWS for their support of our work to make the Internet more secure.”

At AWS, we know that scale and success bring broad responsibility. We use our strengths and resources to help honor our commitment to open source. We also acknowledge that donating credits alone is not enough. We are members of numerous open source foundations to ensure the sustainability of the organizations which host and shepherd crucial aspects of the technology landscape. We hire and train engineers to contribute to open source projects. Some Amazonians even contribute to open source as their full-time job. We sponsor and participate in dozens of open source events every year, actively seeking to learn from the open source community and to share knowledge and resources with them in return.

## AWS Cloud Credits for Open Source Program – Eligibility and Application Process

If you’re part of an open source project that could benefit from our Cloud Credits for Open Source program, we encourage you to apply. To qualify for credits, organizations must have an OSI-approved license and not be dominated by a single vendor or VC-funded. We also expect credit recipients to actively maintain their project and engage with their developer community. To ensure the long-term sustainability of this program, we tend to favor investing in projects that are technical complements to AWS or that are important to our customers. The credits can be used on compute resources, storage, database services, development tools, and testing infrastructure.

### Eligibility Criteria

- **OSI-approved License**: Your project must have an OSI-approved open source license.
- **Non-Dominated**: Your project should not be dominated by a single vendor or be VC-funded.
- **Active Maintenance**: Your project must be actively maintained.
- **Community Engagement**: Engage with your developer community.

### Application Process

To apply for the AWS Open Source Credits Program, complete the [AWS Open Source Credits Application form](https://aws.amazon.com/opensource/credits/) and email it to `awsopensourcecredits@amazon.com`. We review applications and issue credits on a monthly basis. Please note that while we continue reviewing applications through the winter holiday season, we do not issue credits in December. We resume issuing credits in January, so make sure to plan ahead with your application!

### Example Application

Here’s an example of how to fill out the application form:

```markdown
**Project Name:** ExampleOpenSourceProject
**Project URL:** https://github.com/example/ExampleOpenSourceProject
**OSI-approved License:** MIT License
**Project Description:** 
This project is an open source library for performing complex mathematical operations. It is widely used in academic and commercial applications.
**Community Engagement:**
We have an active community of contributors on GitHub. We host regular meetups and contribute to relevant forums and discussions.
**AWS Services Required:**
- Amazon EC2 for running computation-intensive tasks.
- Amazon S3 for storing large datasets.
- Amazon RDS for managing relational databases.
```

## Practical Examples and Best Practices

### Example 1: Running a CI/CD Pipeline with AWS Credits

Suppose you have an open source project that requires continuous integration and continuous deployment (CI/CD). You can use AWS credits to set up an efficient CI/CD pipeline using AWS CodePipeline and AWS CodeBuild.

#### Step-by-Step Guide

1. **Set Up AWS CodePipeline**

    ```bash
    aws codepipeline create-pipeline --cli-input-json file://pipeline-definition.json
    ```

2. **Create a Build Project in AWS CodeBuild**

    ```bash
    aws codebuild create-project --name my-build-project --source... --artifacts... --environment...
    ```

3. **Configure Source Control**

    Link your GitHub repository to AWS CodePipeline.

4. **Run the Pipeline**

   Trigger the pipeline to start building and deploying your project.

### Example 2: Hosting a Website with AWS Credits

If your open source project includes a website, you can use AWS credits to host it on Amazon S3 and Amazon CloudFront.

#### Step-by-Step Guide

1. **Create an S3 Bucket**

    ```bash
    aws s3api create-bucket --bucket my-opensource-website --region us-west-2
    ```

2. **Upload Website Files**

    ```bash
    aws s3 cp index.html s3://my-opensource-website/
    ```

3. **Configure Bucket for Static Website Hosting**

    ```bash
    aws s3 website s3://my-opensource-website/ --index-document index.html --error-document error.html
    ```

4. **Set Up Amazon CloudFront**

    Create a CloudFront distribution to serve your website with low latency.

## Conclusion

AWS is committed to supporting the open source community through our Cloud Credits for Open Source program. By providing essential infrastructure and resources, we aim to help open source projects thrive and innovate. If you’re part of an open source project, we encourage you to apply for AWS Promotional Credits. Together, we can build a more sustainable and vibrant open source ecosystem.

For more information and to apply, visit the [AWS Open Source Credits page](https://aws.amazon.com/opensource/credits/). Follow us on [LinkedIn](https://www.linkedin.com/company/amazon-web-services/) and [X](https://twitter.com/awscloud) to stay updated with the latest news and opportunities.
