# Cloud Nestle Website - Deployment Guide

## 🚀 Quick Deploy

```bash
# Deploy everything (frontend + backend)
./deploy.sh

# Deploy frontend only
./deploy.sh frontend

# Deploy backend only  
./deploy.sh backend
```

## 📋 Prerequisites

- AWS CLI configured with credentials
- Node.js 18+
- AWS CDK installed: `npm install -g aws-cdk`

## 🏗️ Infrastructure (Backend)

**Stack**: `CloudnestleStack`
**Region**: `us-east-1`

### Components
- **S3 Bucket**: `cloudnestle-website-039920874011`
- **CloudFront**: `E2C5OBMIICRQD4` 
- **Domain**: `cloudnestle.com`
- **SSL Certificate**: Auto-managed via ACM

### Manual Deploy
```bash
cd infrastructure
npm install
cdk deploy
```

## 🌐 Frontend

**Framework**: Next.js 15 (Static Export)
**Build**: `npm run build` → `/out` directory

### Manual Deploy
```bash
npm install
npm run build
aws s3 sync out/ s3://cloudnestle-website-039920874011 --delete
aws cloudfront create-invalidation --distribution-id E2C5OBMIICRQD4 --paths "/*"
```

## 🔄 CI/CD

**Trigger**: Push to `main` branch
**Workflow**: `.github/workflows/deploy.yml`

### GitHub Action Steps
1. Build Next.js site
2. Deploy to S3
3. Invalidate CloudFront cache

## 🔗 URLs

- **Live Site**: https://cloudnestle.com
- **CloudFront**: https://d3up3odpfbi214.cloudfront.net
- **GitHub Actions**: https://github.com/ajitnk-lab/qdeveloper-pro-cli-codespace/actions

## 🛠️ Local Development

```bash
npm run dev
# Open http://localhost:3000
```
