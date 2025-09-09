# Cloud Nestle Website

Professional website for Cloud Nestle Consulting and Services - AWS cloud consulting and migration services.

## Project Overview

This is a modern, scalable website built with:
- **Next.js** with TypeScript for static site generation
- **Tailwind CSS** for responsive styling
- **AWS CDK** for infrastructure as code
- **Git-based CMS** for content management
- **AWS S3 + CloudFront** for hosting and CDN

## Development Setup

1. Install required software (see setup-environment.md)
2. Configure AWS credentials (see aws-setup-guide.md)
3. Set up GitHub repository (see github-setup-guide.md)
4. Install dependencies: `npm install`
5. Start development server: `npm run dev`

## Project Structure

```
cloudnestle-website/
├── content/                 # Git-based CMS content
├── infrastructure/          # AWS CDK infrastructure code
├── src/                    # Next.js application source
├── public/                 # Static assets
└── docs/                   # Project documentation
```

## Deployment

The website is automatically deployed to AWS when changes are pushed to the main branch using GitHub Actions.

## License

MIT License - see LICENSE file for details.

## 🚀 Automated Deployment Test

GitHub Actions automation is now active with AWS secrets configured.

Test timestamp: Tue Sep  9 14:44:00 UTC 2025



<!-- GitHub Actions Test -->
Workflow should trigger now: Tue Sep  9 14:47:11 UTC 2025

# CloudFront fix deployed Tue Sep  9 17:41:40 UTC 2025
<!-- Trigger workflow: Tue Sep  9 18:49:46 UTC 2025 -->
