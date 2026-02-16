---
title: "Your own JupyterLab application"
excerpt: "Your Own JupyterLab Application: Deploying with Real-Time Collaboration in Minutes"
publishedAt: "2026-02-16"
category: "AWS"
tags: []
author: "CloudNestle Team"
featured: false
---

# Your Own JupyterLab Application: Deploying with Real-Time Collaboration in Minutes

Jupyter notebooks have become an indispensable tool for data scientists, researchers, educators, and analysts. They offer an interactive environment for experimenting with code, visualizing data, and documenting findings. However, running Jupyter on local machines presents limitations, especially when it comes to collaboration and compute power. 

Enter **Jupyter Deploy**, a new open-source command line interface (CLI) developed by the AI/ML Open Source team at AWS. Jupyter Deploy allows you to deploy a JupyterLab application to the cloud in just a few minutes, complete with real-time collaboration, GitHub OAuth integration, and high-performance development environments. 

In this blog post, we'll walk through the process of deploying your own JupyterLab application using Jupyter Deploy, highlighting best practices and real-world use cases.

## Introduction

Jupyter notebooks are widely used for data science and machine learning projects due to their interactive nature and support for rich media. However, local deployments can be limiting:

- **Collaboration**: Sharing a local JupyterLab instance over the internet is insecure and impractical.
- **Compute Power**: Local machines may lack the necessary resources for compute-intensive tasks, such as GPU acceleration for deep learning.

Large enterprises often have the resources to set up and maintain complex deployment frameworks. However, smaller organizations, such as startups or research teams, may find these solutions out of reach. Jupyter Deploy addresses these challenges by providing a simple, vendor-neutral CLI for deploying Jupyter to the cloud.

## What is Jupyter Deploy?

Jupyter Deploy is an open-source CLI that allows you to deploy a JupyterLab application to the cloud using infrastructure-as-code (IaC). Key features include:

- **Dedicated and Sharable Application**: Run JupyterLab on your own domain with encrypted HTTP (TLS).
- **GitHub OAuth Integration**: Authenticate users with their existing GitHub accounts.
- **Real-Time Collaboration**: Enable simultaneous work on notebooks with the latest improvements from `jupyter-server-documents`.
- **High-Performance Development Environment**: Use UV-based environments for applying updates and configuring your application.

## Getting Started with Jupyter Deploy

### Prerequisites

Before you begin, ensure you have the following:

- An AWS account (you can use the [AWS Free Tier](https://aws.amazon.com/free/)).
- A domain name (you can purchase one from [Amazon Route 53](https://aws.amazon.com/route53/)).
- A GitHub account.

### Step 1: Set Up AWS Credentials

First, set up your AWS credentials. Install the AWS CLI and configure it with your AWS account details.

```bash
# Install AWS CLI
pip install awscli

# Configure AWS CLI
aws configure
```

Verify your setup by running:

```bash
aws sts get-caller-identity
# You should see a response referencing your AWS account.
```

### Step 2: Purchase a Domain

Next, purchase a domain from Amazon Route 53. Navigate to the Route 53 console, select "Domains," and then "Register domains." Follow the prompts to buy your domain.

### Step 3: Set Up GitHub OAuth App

Create a GitHub OAuth app for authentication. Follow [this link](https://github.com/settings/developers) to create an OAuth app with the following details:

- **Application name**: JupyterLab application (or any name)
- **Homepage URL**: `https://jupyter.{your-domain}`
- **Application description**: `jupyter.{your-domain}` (optional)
- **Authorization callback URL**: `https://jupyter.{your-domain}/oauth2/callback`

Note down the **Client ID** and generate a **Client Secret**.

### Step 4: Create a Python Environment and Install Jupyter Deploy

Create a Python virtual environment and install Jupyter Deploy.

```bash
# Navigate to your home directory
cd ~

# Create a UV project
uv init jupyter-deploy-projects --bare

# Install Jupyter Deploy CLI
uv add jupyter-deploy
```

### Step 5: Deploy Your Environment

Finally, deploy your JupyterLab application using the Jupyter Deploy CLI.

```bash
# Initialize a new Jupyter Deploy project
jupyter-deploy init

# Configure your project
jupyter-deploy configure

# Deploy your JupyterLab application
jupyter-deploy deploy
```

## Main Sections

### 1. Selecting a Jupyter Deploy Template

Jupyter Deploy uses templates to simplify the deployment process. Templates are pre-built IaC projects that handle the technical setup for you. The base template includes:

- **Terraform** as the IaC engine.
- **AWS** as the cloud provider.
- **Amazon EC2** instance.
- **GitHub authentication**.

You can discover and use additional templates by installing them in your Python environment.

### 2. Simplifying Collaboration with Jupyter Deploy

Once deployed, access your JupyterLab application from any web browser. Share the URL with collaborators, who will authenticate via GitHub. If their identity matches your allowlist, they will gain access to your JupyterLab application, enabling real-time collaboration.

#### Scaling Compute Resources

Need more compute power? Swap out your EC2 instance with a few commands.

```bash
# List available EC2 instance types
aws ec2 describe-instance-types

# Update your instance type
jupyter-deploy update-instance --instance-type <new-instance-type>
```

#### Managing Collaborators and Storage

Adding collaborators or scaling storage is equally straightforward.

```bash
# Add a new collaborator
jupyter-deploy add-collaborator <github-username>

# Mount a new Amazon EBS volume
jupyter-deploy add-ebs <volume-size>

# Mount an Amazon EFS
jupyter-deploy add-efs <file-system-id>
```

### 3. Practical Examples and Use Cases

#### Use Case: Data Science Team Collaboration

Imagine a data science team working on a machine learning project. By deploying JupyterLab with Jupyter Deploy, they can:

- Collaborate in real-time on notebooks.
- Utilize GPU instances for model training.
- Share results and insights seamlessly.

#### Use Case: Educational Institution

An educational institution can deploy JupyterLab for students and faculty to:

- Access course materials and assignments.
- Collaborate on group projects.
- Utilize high-performance compute resources for research.

## Conclusion

Jupyter Deploy simplifies the process of deploying a JupyterLab application to the cloud, enabling real-time collaboration, secure access, and scalable compute resources. Whether you're a data science team, a research group, or an educational institution, Jupyter Deploy provides a practical solution for deploying and managing JupyterLab in the cloud.

By following the steps outlined in this blog post, you can set up your own JupyterLab application in minutes, overcoming the limitations of local deployments and fostering a collaborative environment for data science and machine learning projects.

For more details and advanced configurations, refer to the [Jupyter Deploy documentation](https://jupyter-deploy.readthedocs.io/). Happy deploying!
