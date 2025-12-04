#!/bin/bash

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Configuration
REGION="us-east-1"
STACK_NAME="CloudnestleStack"

# Function to get stack outputs
get_stack_outputs() {
    print_status "Fetching stack outputs..."
    
    # Get the Storage nested stack name
    STORAGE_STACK=$(aws cloudformation describe-stack-resources \
        --region $REGION \
        --stack-name $STACK_NAME \
        --query "StackResources[?LogicalResourceId=='StorageNestedStackStorageNestedStackResource9807768E'].PhysicalResourceId" \
        --output text)
    
    if [ -z "$STORAGE_STACK" ]; then
        print_error "Could not find Storage nested stack. Make sure backend is deployed."
        exit 1
    fi
    
    # Get S3 bucket and CloudFront ID from nested stack outputs
    S3_BUCKET=$(aws cloudformation describe-stacks \
        --region $REGION \
        --stack-name $STORAGE_STACK \
        --query "Stacks[0].Outputs[?OutputKey=='BucketName'].OutputValue" \
        --output text)
    
    CLOUDFRONT_ID=$(aws cloudformation describe-stacks \
        --region $REGION \
        --stack-name $STORAGE_STACK \
        --query "Stacks[0].Outputs[?OutputKey=='DistributionId'].OutputValue" \
        --output text)
    
    if [ -z "$S3_BUCKET" ] || [ -z "$CLOUDFRONT_ID" ]; then
        print_error "Could not retrieve S3 bucket or CloudFront ID from stack outputs."
        exit 1
    fi
    
    print_status "S3 Bucket: $S3_BUCKET"
    print_status "CloudFront Distribution: $CLOUDFRONT_ID"
}

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
    # Get stack outputs first
    get_stack_outputs
    
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
