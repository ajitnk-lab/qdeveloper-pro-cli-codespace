const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL || 'postgresql://academy_admin:password@cloudnestleacademystack-academydatabased943c326-7maqrii9izhi.cy5qa6kyq6f4.us-east-1.rds.amazonaws.com:5432/academy_platform'
    }
  }
});

const sampleCourses = [
  {
    title: "AWS Cloud Fundamentals",
    slug: "aws-cloud-fundamentals",
    description: "Learn the basics of Amazon Web Services including EC2, S3, RDS, and VPC. Perfect for beginners starting their cloud journey.",
    category: "Cloud Computing",
    difficulty: "beginner",
    price: 99.99,
    imageUrl: "https://via.placeholder.com/400x300/1f2937/ffffff?text=AWS+Fundamentals",
    duration: 115,
    instructor: "John Smith",
    tags: "[]",
    isPublished: true,
    modules: [
      {
        title: "Introduction to AWS",
        content: "# Introduction to AWS\n\nAmazon Web Services (AWS) is the world's most comprehensive cloud platform...",
        duration: 30,
        order: 1,
        isPublished: true
      },
      {
        title: "EC2 Instances",
        content: "# EC2 Instances\n\nElastic Compute Cloud (EC2) provides scalable computing capacity...",
        duration: 45,
        order: 2,
        isPublished: true
      },
      {
        title: "S3 Storage",
        content: "# S3 Storage\n\nSimple Storage Service (S3) is object storage built to store and retrieve any amount of data...",
        duration: 40,
        order: 3,
        isPublished: true
      }
    ]
  },
  {
    title: "Docker Containerization",
    slug: "docker-containerization",
    description: "Master Docker containers, images, and orchestration. Learn to containerize applications and deploy them efficiently.",
    category: "DevOps",
    difficulty: "intermediate",
    price: 149.99,
    imageUrl: "https://via.placeholder.com/400x300/2563eb/ffffff?text=Docker+Course",
    duration: 85,
    instructor: "Sarah Johnson",
    tags: "[]",
    isPublished: true,
    modules: [
      {
        title: "Docker Basics",
        content: "# Docker Basics\n\nDocker is a platform for developing, shipping, and running applications using containers...",
        duration: 35,
        order: 1,
        isPublished: true
      },
      {
        title: "Docker Images",
        content: "# Docker Images\n\nLearn how to create, manage, and optimize Docker images...",
        duration: 50,
        order: 2,
        isPublished: true
      }
    ]
  },
  {
    title: "Kubernetes Orchestration",
    slug: "kubernetes-orchestration",
    description: "Advanced container orchestration with Kubernetes. Deploy, scale, and manage containerized applications.",
    category: "DevOps",
    difficulty: "advanced",
    price: 199.99,
    imageUrl: "https://via.placeholder.com/400x300/059669/ffffff?text=Kubernetes",
    duration: 60,
    instructor: "Mike Chen",
    tags: "[]",
    isPublished: true,
    modules: [
      {
        title: "Kubernetes Architecture",
        content: "# Kubernetes Architecture\n\nUnderstand the core components of Kubernetes cluster...",
        duration: 60,
        order: 1,
        isPublished: true
      }
    ]
  },
  {
    title: "React Development Masterclass",
    slug: "react-development-masterclass",
    description: "Complete React.js course covering hooks, context, state management, and modern development practices.",
    category: "Web Development",
    difficulty: "intermediate",
    price: 179.99,
    imageUrl: "https://via.placeholder.com/400x300/0ea5e9/ffffff?text=React+Course",
    duration: 100,
    instructor: "Emily Davis",
    tags: "[]",
    isPublished: true,
    modules: [
      {
        title: "React Fundamentals",
        content: "# React Fundamentals\n\nLearn the core concepts of React including components, JSX, and props...",
        duration: 45,
        order: 1,
        isPublished: true
      },
      {
        title: "React Hooks",
        content: "# React Hooks\n\nMaster useState, useEffect, and custom hooks...",
        duration: 55,
        order: 2,
        isPublished: true
      }
    ]
  },
  {
    title: "Python for Data Science",
    slug: "python-data-science",
    description: "Learn Python programming for data analysis, visualization, and machine learning with pandas, numpy, and matplotlib.",
    category: "Data Science",
    difficulty: "beginner",
    price: 129.99,
    imageUrl: "https://via.placeholder.com/400x300/7c3aed/ffffff?text=Python+Data",
    duration: 40,
    instructor: "Dr. Alex Rodriguez",
    tags: "[]",
    isPublished: true,
    modules: [
      {
        title: "Python Basics for Data Science",
        content: "# Python Basics for Data Science\n\nIntroduction to Python programming concepts essential for data science...",
        duration: 40,
        order: 1,
        isPublished: true
      }
    ]
  }
];

async function seedCourses() {
  try {
    console.log('🌱 Starting to seed courses...');
    
    for (const courseData of sampleCourses) {
      const { modules, ...course } = courseData;
      
      console.log(`📚 Creating course: ${course.title}`);
      
      const createdCourse = await prisma.course.create({
        data: {
          ...course,
          modules: {
            create: modules
          }
        },
        include: {
          modules: true
        }
      });
      
      console.log(`✅ Created course: ${createdCourse.title} with ${createdCourse.modules.length} modules`);
    }
    
    console.log('🎉 Successfully seeded all courses!');
    
    const totalCourses = await prisma.course.count();
    console.log(`📊 Total courses in database: ${totalCourses}`);
    
  } catch (error) {
    console.error('❌ Error seeding courses:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedCourses();
