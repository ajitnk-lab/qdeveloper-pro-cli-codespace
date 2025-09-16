#!/bin/bash

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Configuration
S3_BUCKET="cloudnestle-website-039920874011"
CLOUDFRONT_ID="E2C5OBMIICRQD4"
REGION="us-east-1"

print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

deploy_backend() {
    print_status "Deploying backend infrastructure..."
    cd infrastructure
    
    if [ ! -d "node_modules" ]; then
        print_status "Installing CDK dependencies..."
        npm install
    fi
    
    print_status "Deploying CDK stack..."
    cdk deploy --require-approval never
    
    cd ..
    print_status "Backend deployment complete!"
}

deploy_frontend() {
    print_status "Deploying frontend..."
    
    if [ ! -d "node_modules" ]; then
        print_status "Installing dependencies..."
        npm install
    fi
    
    print_status "Building Next.js site..."
    npm run build
    
    print_status "Syncing to S3..."
    aws s3 sync out/ s3://$S3_BUCKET --delete --cache-control max-age=31536000,public --region $REGION
    
    print_status "Invalidating CloudFront cache..."
    aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_ID --paths "/*" --region $REGION
    
    print_status "Frontend deployment complete!"
    echo -e "${GREEN}🌐 Live at: https://cloudnestle.com${NC}"
}

# Main deployment logic
case "${1:-all}" in
    "backend")
        deploy_backend
        ;;
    "frontend")
        deploy_frontend
        ;;
    "all"|*)
        deploy_backend
        deploy_frontend
        ;;
esac

print_status "🚀 Deployment finished successfully!"
