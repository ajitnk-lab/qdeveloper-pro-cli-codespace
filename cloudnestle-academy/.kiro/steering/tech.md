# Technology Stack & Build System

## Core Technologies

### Frontend
- **Next.js 14+** with App Router for both main website and academy platform
- **TypeScript** for type safety and better developer experience
- **Tailwind CSS** for responsive styling and design system
- **React Hook Form** for form management
- **Zustand** for client-side state management

### Backend & API
- **Next.js API Routes** for serverless backend functionality
- **NextAuth.js** for authentication with social providers (Google, Facebook, GitHub)
- **Prisma ORM** for database operations and schema management
- **Zod** for schema validation and type safety

### Database & Storage
- **PostgreSQL** (Amazon RDS) for structured application data
- **Amazon S3** for markdown content files and media storage
- **Redis** (Amazon ElastiCache) for session caching and performance

### Content Management
- **gray-matter** for frontmatter parsing from markdown files
- **remark** and **remark-html** for markdown processing and HTML conversion
- **rehype plugins** for enhanced content formatting

### Infrastructure & Deployment
- **AWS CDK** (TypeScript) for infrastructure as code
- **Amazon ECS Fargate** for containerized deployment
- **Amazon CloudFront** for CDN and global content delivery
- **AWS Application Load Balancer** for traffic distribution
- **GitHub Actions** for CI/CD pipeline

### Payment Integration
- **Razorpay** for Indian market payments (UPI, bank transfers, cards)
- Webhook handling for payment confirmations and subscription management

## Environment Configuration

### Required Environment Variables
- `AWS_PROFILE=cloudnestle-dev` - AWS profile for development
- `AWS_REGION=us-east-1` - Primary AWS region
- `NODE_ENV=development|production` - Environment mode
- `GITHUB_TOKEN` - For repository access and CI/CD
- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_SECRET` - Authentication secret key

### Development Profile
Use `cloudnestle-dev` AWS profile for all development work to maintain separation from production resources.

## Common Commands

### Development
```bash
npm install                 # Install dependencies
npm run dev                # Start development server
npm run build              # Build for production
npm run start              # Start production server
npm run lint               # Run ESLint
npm run type-check         # TypeScript type checking
```

### Database Operations
```bash
npx prisma generate        # Generate Prisma client
npx prisma db push         # Push schema changes to database
npx prisma db seed         # Seed database with initial data
npx prisma studio          # Open Prisma Studio GUI
```

### Infrastructure & Deployment
```bash
cdk bootstrap              # Bootstrap CDK in AWS account
cdk synth                  # Synthesize CloudFormation templates
cdk deploy                 # Deploy infrastructure to AWS
cdk diff                   # Show differences between deployed and local
cdk destroy                # Destroy deployed resources
```

### Testing
```bash
npm test                   # Run unit tests with Jest
npm run test:watch         # Run tests in watch mode
npm run test:coverage      # Generate coverage report
npm run test:e2e           # Run end-to-end tests with Playwright
```

### Environment Setup Scripts
```powershell
.\verify-installation.ps1      # Verify all required software
.\configure-aws-for-project.ps1 # Set up AWS configuration
.\setup-github-project.ps1     # Configure GitHub repository
.\verify-aws-setup.ps1         # Verify AWS credentials and access
```

## Code Quality & Standards
- **ESLint** with Next.js and TypeScript configurations
- **Prettier** for consistent code formatting
- **Husky** for pre-commit hooks
- **Jest** for unit testing with React Testing Library
- **Playwright** for end-to-end testing

## Performance Considerations
- Server-side rendering (SSR) for SEO optimization
- Static generation for marketing pages
- CDN caching for global content delivery
- Database query optimization with Prisma
- Redis caching for frequently accessed data