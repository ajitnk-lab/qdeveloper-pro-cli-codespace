---
title: "Amazon Bedrock Agents"
excerpt: "Orchestrating Business System Integrations with Amazon Bedrock Agents"
publishedAt: "2026-02-19"
category: "AWS"
tags: []
author: "CloudNestle Team"
featured: false
---

# Orchestrating Business System Integrations with Amazon Bedrock Agents

The rise of generative AI has opened new frontiers in technology, offering innovative solutions for content generation and problem-solving. To harness this potential fully, seamless integration with existing business systems and efficient access to data are essential. Amazon Bedrock Agents provides robust integration capabilities that connect generative AI models with the wealth of information and workflows already in place within an organization, enabling the creation of efficient and impactful generative AI applications.

In this blog post, we will explore how to orchestrate business system integrations using Amazon Bedrock Agents. We will delve into the architecture, prerequisites, and step-by-step deployment of a solution that integrates generative AI with existing business systems, leveraging Amazon Bedrock Agents and AWS services.

## Introduction to Amazon Bedrock Agents

Amazon Bedrock is a fully managed service that enables the development and deployment of generative AI applications using high-performance foundation models (FMs) from leading AI companies through a single API. Amazon Bedrock Agents extends this capability by allowing you to streamline workflows and automate repetitive tasks across your company systems and data sources while maintaining security, privacy, and responsible AI practices.

With Amazon Bedrock Agents, you can enable generative AI applications to execute multiple tasks across your company systems and data sources. This allows businesses to unlock the power of generative AI to automate tasks, generate content, and solve complex problems—all while maintaining connectivity to critical enterprise systems and data sources.

## Real-World Use Case: Quality Review Process

To illustrate the capabilities of Amazon Bedrock Agents, let’s consider a fictitious business process involving a quality review. In this scenario, a generative AI assistant determines if a device needs review and creates a case in Appian for further action. The workflow consists of the following steps:

1. The user asks the generative AI assistant to determine if a device needs review.
2. If a device type is provided, the assistant checks if it’s a Type 3 device.
3. If it’s a Type 3 device, the assistant asks the user for the device name.
4. The assistant checks if a document exists with the provided name.
5. If the document exists, the assistant creates a case in Appian to start a review.
6. If the document doesn’t exist, the assistant sends an email for review.

## Solution Architecture

The architecture of the solution involves several AWS services working in concert to facilitate the quality review process. Here’s an overview of the system workflow:

1. **User Interaction**: The user interacts with the generative AI application, which connects to Amazon Bedrock Agents.
2. **Knowledge Bases**: The application uses Amazon Bedrock Knowledge Bases to answer user questions. These knowledge bases are created with Amazon Simple Storage Service (Amazon S3) as the data source and Amazon Titan (or another model of your choice) as the embedding model.
3. **Action Groups**: Amazon Bedrock Agents uses action groups to integrate with different systems. The action groups call different AWS Lambda functions within a private subnet of a virtual private cloud (VPC).
4. **Lambda Functions**: 
   - A Lambda function fetches the classification of the device from Amazon DynamoDB.
   - Another Lambda function checks if quality documents exist in Amazon S3.
   - A Lambda function calls the Appian REST API using a NAT gateway in a public subnet.
   - A Lambda function uses AWS Identity and Access Management (IAM) permissions to make an SDK call to Amazon Simple Email Service (Amazon SES).
5. **Appian Integration**: The Appian key is stored in AWS Secrets Manager. Appian Case Management Studio is used to facilitate the rapid development of case management apps.
6. **Email Notification**: Amazon SES sends an email using SMTP to verified emails provided by the user.

## Prerequisites

Before building the solution, ensure you have the following prerequisites in place:

- A valid AWS account.
- Access to Anthropic’s Claude 3 Sonnet or the model you intend to use.
- An IAM role in the account with sufficient permissions to create the necessary resources.
- AWS CloudTrail logging enabled for operational and risk auditing.
- AWS Budgets policy notifications enabled to protect you from unwanted billing.
- Two email addresses to send and receive emails (do not use existing verified identities in Amazon SES for these email addresses).
- The solution is supported only in the `us-east-1` AWS Region. You can make the necessary changes to the CloudFormation template to deploy to other Regions.

## Creating an Appian Account

Depending on your needs, follow the corresponding steps to create an Appian account:

### Sign Up for Appian Community Edition for Personal Use

1. Visit the [Appian Community Edition page](https://www.appian.com/try-appian/).
2. Enter your email address and choose **Submit** to receive confirmation and login details.
3. Check your inbox for a verification email from Appian. Choose the link in the email to validate your email address.
4. Finish setting up your account by providing your first name, last name, email, and password, then accept the terms.
5. Choose **Register** to complete the registration.
6. Choose the activation link and log in with your email address and password.
7. Complete your profile by entering information about your company, phone number, and learning interests, among other details.
8. Choose **Access Environment**.
9. Choose your region (USA, India, or Germany) by choosing the appropriate link.
10. Navigate to Appian Designer and start exploring Appian’s features and capabilities.

### Purchase Appian Platform for Business Use

1. Visit the [Appian Platform listing at AWS Marketplace](https://aws.amazon.com/marketplace/pp/B07Q54826L).
2. Choose **View purchase options**.
3. Fill out the contract form by providing your duration, renewal settings, and contract options.
4. Choose **Create Contract** to submit your request. An Appian representative will contact you to discuss your needs. They might provide access to a trial environment or schedule a personalized demo.
5. Follow the instructions provided by the Appian representative to access your account.

Note the following values, which we will use in the CloudFormation template below:
- `AppianHostEndpoint`
- `AppianAPIKey`

## Deploying the CloudFormation Template

Complete the following steps to deploy the CloudFormation template:

1. **Download the CloudFormation Template**: Obtain the CloudFormation template from the provided source.
2. **Open the AWS CloudFormation Console**: Navigate to the us-east-1 region.
3. **Create a New Stack**:
   - Choose **Stacks** in the navigation pane, then choose **Create stack**.
   - Upload the template and choose **Next**.
4. **Configure Stack Details**:
   - For **Stack name**, enter a name such as `QualityReviewStack`.
5. **Specify Parameters**:
   - For `DynamoDBTableName`, enter the name of the DynamoDB table.
   - For `FromEmailAddress`, enter the email address to be used for sending notifications.

## Implementing the Solution

### Step 1: Setting Up Amazon Bedrock Agents

1. **Create Knowledge Bases**:
   ```bash
   aws bedrock create-knowledge-base \
       --name "QualityReviewKB" \
       --description "Knowledge base for quality review process" \
       --data-source-configurations S3BucketName=your-s3-bucket,S3Prefix=your-s3-prefix \
       --embedding-model "amazon.titan-embed-text-v1"
   ```

2. **Define Action Groups**:
   ```json
   {
       "ActionGroups": [
           {
               "Name": "CheckDeviceClassification",
               "LambdaFunctionArn": "arn:aws:lambda:us-east-1:123456789012:function:CheckDeviceClassification"
           },
           {
               "Name": "CheckDocumentExistence",
               "LambdaFunctionArn": "arn:aws:lambda:us-east-1:123456789012:function:CheckDocumentExistence"
           },
           {
               "Name": "CreateAppianCase",
               "LambdaFunctionArn": "arn:aws:lambda:us-east-1:123456789012:function:CreateAppianCase"
           },
           {
               "Name": "SendEmailNotification",
               "LambdaFunctionArn": "arn:aws:lambda:us-east-1:123456789012:function:SendEmailNotification"
           }
       ]
   }
   ```

### Step 2: Configuring AWS Lambda Functions

1. **Check Device Classification**:
   ```python
   import boto3
   import json

   dynamodb = boto3.client('dynamodb')

   def lambda_handler(event, context):
       device_type = event['device_type']
       response = dynamodb.get_item(
           TableName='DeviceClassificationTable',
           Key={'DeviceType': {'S': device_type}}
       )
       return response['Item']
   ```

2. **Check Document Existence**:
   ```python
   import boto3

   s3 = boto3.client('s3')

   def lambda_handler(event, context):
       document_name = event['document_name']
       try:
           s3.head_object(Bucket='your-s3-bucket', Key=document_name)
           return {'exists': True}
       except:
           return {'exists': False}
   ```

3. **Create Appian Case**:
   ```python
   import boto3
   import json
   import requests

   secretsmanager = boto3.client('secretsmanager')

   def lambda_handler(event, context):
       appian_api_key = secretsmanager.get_secret_value(SecretId='AppianAPIKey')['SecretString']
       headers = {'Authorization': f'Bearer {appian_api_key}'}
       response = requests.post('https://your-appian-host/suite/rest/cases', headers=headers, json=event)
       return response.json()
   ```

4. **Send Email Notification**:
   ```python
   import boto3

   ses = boto3.client('ses')

   def lambda_handler(event, context):
       ses.send_email(
           Source='your-verified-email@example.com',
           Destination={'ToAddresses': [event['to_email']]},
           Message={
               'Subject': {'Data': 'Device Review Required'},
               'Body': {'Text': {'Data': 'Please review the device.'}}
           }
       )
   ```

### Step 3: Integrating with Appian

Ensure that your Appian environment is set up to receive REST API calls and that the necessary cases are configured in Appian Case Management Studio.

## Best Practices and Additional Insights

### Security and Privacy

- **Data Encryption**: Ensure that all data stored in Amazon S3 and DynamoDB is encrypted at rest and in transit.
- **IAM Roles and Policies**: Use IAM roles and policies to grant the minimum necessary permissions to Lambda functions and other services.
- **Secrets Management**: Store sensitive information such as API keys and passwords in AWS Secrets Manager.

### Monitoring and Logging

- **CloudWatch Logs**: Enable CloudWatch logging for all Lambda functions to monitor their execution and troubleshoot issues.
- **CloudTrail**: Use AWS CloudTrail to log API calls made by the generative AI application for auditing and compliance purposes.

### Scalability and Performance

- **Auto Scaling**: Configure auto-scaling for your Lambda functions to handle varying loads efficiently.
- **Caching**: Use Amazon ElastiCache to cache frequently accessed data and improve the performance of your generative AI application.

## Conclusion

Amazon Bedrock Agents offer a powerful way to orchestrate business system integrations, enabling generative AI applications to automate tasks, generate content, and solve complex problems while maintaining connectivity to critical enterprise systems and data sources. By following the steps outlined in this blog post, you can deploy a solution that integrates generative AI with existing business systems, leveraging the full potential of Amazon Bedrock Agents and AWS services.

Whether you are exploring Appian’s platform individually or assessing it for your organization, Amazon Bedrock Agents provides the tools and capabilities to help you get started with seamless business system integrations.
