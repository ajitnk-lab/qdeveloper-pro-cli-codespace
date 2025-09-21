# Cloud Nestle Website

Professional website for Cloud Nestle Consulting and Services - AWS cloud consulting and migration services.

## Project Overview
This is a **Next.js-based static website** for Cloud Nestle Consulting and Services, focused on AWS cloud consulting and migration services.

## Architecture & Technology Stack

### Frontend
- **Framework**: Next.js 15.5.3 with React 19.1.0
- **Build**: Static export (`output: 'export'`) with Turbopack
- **Styling**: CSS modules + global CSS (18px font fix implemented)
- **Content**: Markdown processing with `gray-matter` and `remark`
- **TypeScript**: Full TypeScript support

### Infrastructure (AWS CDK)
- **S3 Bucket**: `cloudnestle-website-039920874011` for static hosting
- **CloudFront**: Distribution `E2C5OBMIICRQD4` for CDN
- **Route53**: Custom domain `cloudnestle.com`
- **ACM**: SSL certificate management
- **Modular CDK stacks**: Networking, Storage, and Compute

### Deployment
- **CI/CD**: GitHub Actions workflow for automated deployment
- **Manual Deploy**: `deploy.sh` script for local deployments
- **Build Process**: `npm run build` → S3 sync → CloudFront invalidation

## Key Features
- ✅ **Fixed font sizing** (18px body text, proper headings)
- ✅ **Card-based layouts** for services and content
- ✅ **Working navigation** with Next.js routing
- ✅ **Cookie banner** compliance
- ✅ **Responsive design**
- ✅ **SEO optimized** with proper metadata

## Content Structure
- **Services**: AWS consulting, migration, optimization
- **Company**: About, team, certifications
- **Blog**: Technical articles and insights  
- **Solutions**: Industry-specific cloud solutions
- **Contact**: Multiple contact forms and consultation requests

## Development Workflow

### Local Development
```bash
npm run dev          # Development server with Turbopack
npm run build        # Production build
npm run serve        # Local static server (./serve-clean.sh)
```

### Testing Locally
```bash
npm run build
npx serve out
```

### Deployment
```bash
./deploy.sh          # Deploy to AWS (backend + frontend)
./deploy.sh frontend # Deploy frontend only
./deploy.sh backend  # Deploy infrastructure only
```

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment URLs

- **Production**: https://cloudnestle.com
- **CloudFront**: https://d3tlqqb05xfabm.cloudfront.net
- **Distribution ID**: E2C5OBMIICRQD4
- **S3 Bucket**: cloudnestle-website-039920874011

## Project Structure
```
├── src/
│   ├── app/           # Next.js App Router pages
│   ├── components/    # Reusable React components
│   └── lib/          # Utility functions
├── content/          # Markdown content files
├── public/           # Static assets
├── infrastructure/   # AWS CDK infrastructure code
├── out/             # Built static files
└── .github/         # GitHub Actions workflows
```

The project is well-structured with proper separation of concerns, modern tooling, and automated deployment to AWS infrastructure. The site focuses on showcasing AWS expertise and providing consultation services.
