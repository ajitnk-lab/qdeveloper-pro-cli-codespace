# Project Structure & Organization

## Root Directory Structure

```
cloudnestle-website/
├── .env.example                    # Environment variables template
├── .env.local                      # Local environment configuration
├── .gitignore                      # Git ignore patterns
├── README.md                       # Project documentation
├── package.json                    # Node.js dependencies and scripts
├── tsconfig.json                   # TypeScript configuration
├── tailwind.config.js              # Tailwind CSS configuration
├── next.config.js                  # Next.js configuration
├── prisma/                         # Database schema and migrations
│   ├── schema.prisma              # Prisma database schema
│   ├── migrations/                # Database migration files
│   └── seed.ts                    # Database seeding script
├── src/                           # Application source code
├── public/                        # Static assets
├── content/                       # Git-based CMS content (markdown files)
├── infrastructure/                # AWS CDK infrastructure code
├── docs/                          # Project documentation
├── .github/                       # GitHub Actions workflows
├── .kiro/                         # Kiro AI assistant configuration
└── logs/                          # Application and setup logs
```

## Source Code Organization (`src/`)

```
src/
├── app/                           # Next.js 14+ App Router pages
│   ├── (auth)/                   # Authentication route group
│   ├── (dashboard)/              # User dashboard route group
│   ├── (admin)/                  # Admin interface route group
│   ├── academy/                  # Academy platform pages
│   ├── api/                      # API routes
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout component
│   └── page.tsx                  # Home page
├── components/                    # Reusable React components
│   ├── ui/                       # Base UI components (buttons, inputs, etc.)
│   ├── forms/                    # Form components
│   ├── layout/                   # Layout components (header, footer, nav)
│   ├── course/                   # Course-related components
│   └── auth/                     # Authentication components
├── lib/                          # Utility libraries and configurations
│   ├── auth.ts                   # NextAuth.js configuration
│   ├── db.ts                     # Database connection and Prisma client
│   ├── utils.ts                  # General utility functions
│   ├── validations.ts            # Zod schema validations
│   └── constants.ts              # Application constants
├── hooks/                        # Custom React hooks
├── stores/                       # Zustand state management stores
├── types/                        # TypeScript type definitions
└── styles/                       # Additional CSS/styling files
```

## Infrastructure Organization (`infrastructure/`)

```
infrastructure/
├── lib/                          # CDK construct libraries
│   ├── website-stack.ts          # Main website infrastructure
│   ├── academy-stack.ts          # Academy platform infrastructure
│   ├── database-stack.ts         # RDS PostgreSQL setup
│   ├── storage-stack.ts          # S3 buckets and CloudFront
│   └── monitoring-stack.ts       # CloudWatch and logging
├── bin/                          # CDK application entry points
│   └── app.ts                    # Main CDK application
├── config/                       # Environment-specific configurations
│   ├── dev.ts                    # Development environment config
│   ├── staging.ts                # Staging environment config
│   └── prod.ts                   # Production environment config
└── cdk.json                      # CDK configuration file
```

## Content Organization (`content/`)

```
content/
├── courses/                      # Course content in markdown
│   ├── aws-fundamentals/         # Course directory
│   │   ├── meta.json            # Course metadata
│   │   ├── 01-introduction.md   # Course modules
│   │   ├── 02-ec2-basics.md
│   │   └── assets/              # Course-specific assets
│   └── kubernetes-basics/
├── workshops/                    # Workshop content
├── tutorials/                    # Tutorial content
└── blog/                        # Blog posts for main website
```

## Configuration Files

### Environment Configuration
- `.env.example` - Template for environment variables
- `.env.local` - Local development environment (gitignored)
- `.env.production` - Production environment variables

### Build Configuration
- `package.json` - Dependencies, scripts, and project metadata
- `tsconfig.json` - TypeScript compiler configuration
- `next.config.js` - Next.js framework configuration
- `tailwind.config.js` - Tailwind CSS utility configuration

### Code Quality
- `.eslintrc.json` - ESLint linting rules
- `.prettierrc` - Prettier code formatting rules
- `jest.config.js` - Jest testing framework configuration
- `playwright.config.ts` - Playwright E2E testing configuration

## Setup and Verification Scripts

Located in project root for Windows PowerShell:
- `verify-installation.ps1` - Check all required software installations
- `configure-aws-for-project.ps1` - Set up AWS credentials and profiles
- `setup-github-project.ps1` - Configure GitHub repository and tokens
- `verify-aws-setup.ps1` - Verify AWS access and permissions
- `verify-github-setup.ps1` - Verify GitHub integration

## Kiro AI Configuration (`.kiro/`)

```
.kiro/
├── settings/                     # Kiro-specific settings
├── steering/                     # AI assistant guidance documents
│   ├── product.md               # Product overview and goals
│   ├── tech.md                  # Technology stack and commands
│   └── structure.md             # Project organization (this file)
└── specs/                       # Feature specifications
    └── academy-platform/        # Academy platform specification
        ├── requirements.md      # Functional requirements
        ├── design.md           # Technical design document
        └── tasks.md            # Implementation tasks
```

## Naming Conventions

### Files and Directories
- Use kebab-case for directories: `course-management/`
- Use PascalCase for React components: `CourseCard.tsx`
- Use camelCase for utilities and hooks: `useAuth.ts`
- Use lowercase for configuration files: `next.config.js`

### Code Conventions
- React components use PascalCase: `UserDashboard`
- Functions and variables use camelCase: `getUserCourses`
- Constants use UPPER_SNAKE_CASE: `API_BASE_URL`
- Types and interfaces use PascalCase: `CourseData`

### Database Conventions
- Table names use snake_case: `user_progress`
- Column names use snake_case: `created_at`
- Primary keys use `id` (cuid format)
- Foreign keys use `{table}_id` format: `user_id`

## Import Organization

Follow this import order in TypeScript files:
1. React and Next.js imports
2. Third-party library imports
3. Internal component imports
4. Utility and configuration imports
5. Type imports (with `type` keyword)

```typescript
import React from 'react'
import { NextPage } from 'next'
import { Button } from '@/components/ui/button'
import { getUserCourses } from '@/lib/api'
import type { Course } from '@/types/course'
```