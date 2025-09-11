# CloudNestle Academy Infrastructure

AWS CDK infrastructure for the CloudNestle Academy Platform.

## Architecture

- **ECS Fargate**: Containerized Next.js application
- **RDS PostgreSQL**: Database for user data, courses, orders
- **ElastiCache Redis**: Session caching and performance
- **S3**: Course content and media storage
- **CloudFront**: CDN for global content delivery
- **Application Load Balancer**: Traffic distribution

## Prerequisites

1. **AWS CLI** configured with appropriate credentials
2. **AWS CDK** installed globally: `npm install -g aws-cdk`
3. **Docker** for building container images

## Deployment Steps

### 1. Bootstrap CDK (First time only)
```bash
cd infrastructure
npm install
npm run bootstrap
```

### 2. Build and Push Docker Image
```bash
cd ../academy-platform

# Build the Docker image
docker build -t cloudnestle-academy .

# Tag for ECR (replace with your ECR URI)
docker tag cloudnestle-academy:latest 123456789012.dkr.ecr.us-east-1.amazonaws.com/cloudnestle-academy:latest

# Push to ECR
docker push 123456789012.dkr.ecr.us-east-1.amazonaws.com/cloudnestle-academy:latest
```

### 3. Deploy Infrastructure
```bash
cd ../infrastructure

# Preview changes
npm run diff

# Deploy stack
npm run deploy
```

### 4. Update Environment Variables

After deployment, update the ECS service with production environment variables:

- `DATABASE_URL`: From RDS output
- `REDIS_URL`: From ElastiCache output
- `AWS_S3_BUCKET`: From S3 output
- `NEXTAUTH_SECRET`: Generate secure secret
- Social auth provider credentials

## Environment Variables

Required environment variables for production:

```bash
NODE_ENV=production
DATABASE_URL=postgresql://username:password@host:5432/academy_platform
REDIS_URL=redis://redis-host:6379
AWS_S3_BUCKET=cloudnestle-academy-content
AWS_REGION=us-east-1
NEXTAUTH_SECRET=your-secure-secret
NEXTAUTH_URL=https://academy.cloudnestle.com
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
FACEBOOK_CLIENT_ID=your-facebook-client-id
FACEBOOK_CLIENT_SECRET=your-facebook-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_KEY_SECRET=your-razorpay-key-secret
```

## Domain Setup

1. **Route 53**: Create hosted zone for `cloudnestle.com`
2. **Certificate Manager**: Request SSL certificate for `academy.cloudnestle.com`
3. **Update CDK**: Add hosted zone and certificate to the stack

## Monitoring

- **CloudWatch**: Application and infrastructure metrics
- **ECS Service**: Auto-scaling based on CPU/memory
- **RDS**: Automated backups and monitoring
- **CloudFront**: CDN performance metrics

## Costs Estimation

**Monthly costs (approximate):**
- ECS Fargate (2 tasks): ~$30
- RDS t3.micro: ~$15
- ElastiCache t3.micro: ~$15
- S3 storage: ~$5
- CloudFront: ~$10
- **Total**: ~$75/month

## Cleanup

To destroy all resources:
```bash
npm run destroy
```

**Warning**: This will delete all data. Ensure backups are taken before destroying.
