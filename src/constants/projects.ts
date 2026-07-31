export type ProjectStatus = 'completed' | 'in-progress' | 'open-source';
export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export interface ProjectTimeline {
  phase: string;
  duration: string;
  description: string;
}

export interface ProjectChallenge {
  problem: string;
  solution: string;
  lesson: string;
}

export interface ProjectArchitecture {
  frontend: string;
  backend: string;
  api: string;
  database: string;
  deployment: string;
}

export interface ProjectGithub {
  repoName: string;
  repoDescription: string;
  stars?: number;
  language: string;
  lastUpdated: string;
  url: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  category: string;
  status: ProjectStatus;
  image?: string;
  gradient: string;
  accentColor: string;
  technologies: string[];
  features: string[];
  architecture: ProjectArchitecture;
  timeline: ProjectTimeline[];
  challenges: ProjectChallenge[];
  teamSize: number;
  myRole: string;
  difficulty: DifficultyLevel;
  isResponsive: boolean;
  hasDarkMode: boolean;
  liveUrl?: string;
  github: ProjectGithub;
  overview: {
    introduction: string;
    problem: string;
    solution: string;
    goal: string;
    keyFeatures: string[];
  };
  gallery: string[];
  featured: boolean;
  order: number;
}

export const projects: Project[] = [
  {
    id: 'portfolio',
    slug: 'portfolio',
    title: 'Portfolio Website',
    shortDescription: 'A premium portfolio website with stunning animations and modern design',
    longDescription: 'A cutting-edge personal portfolio website built with Next.js 16 and Framer Motion. Features smooth scroll animations, glassmorphism UI, dark/light theme switching, internationalization, and a premium feel inspired by Apple and Linear design systems.',
    category: 'Web Development',
    status: 'completed',
    image: '/images/projects/portfolio.png',
    gradient: 'from-blue-600 via-cyan-500 to-teal-400',
    accentColor: '#0088FF',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'GSAP'],
    features: [
      'Smooth Scroll Animations',
      'Dark/Light Theme',
      'Multi-language Support',
      'Responsive Design',
      'Custom Cursor',
      'Loading Screen',
      'Glassmorphism UI',
      'Contact Form',
    ],
    architecture: {
      frontend: 'Next.js 16 + React 19',
      backend: 'Next.js API Routes',
      api: 'REST API',
      database: 'N/A (Static)',
      deployment: 'Vercel',
    },
    timeline: [
      { phase: 'Planning', duration: '1 week', description: 'Research modern portfolio designs and plan features' },
      { phase: 'Design', duration: '1 week', description: 'Create wireframes and design system' },
      { phase: 'Development', duration: '3 weeks', description: 'Build components, animations, and pages' },
      { phase: 'Testing', duration: '3 days', description: 'Cross-browser testing and performance optimization' },
      { phase: 'Deployment', duration: '1 day', description: 'Deploy to Vercel with custom domain' },
    ],
    challenges: [
      {
        problem: 'Smooth scroll performance on mobile devices',
        solution: 'Implemented Lenis for smooth scrolling with GPU-accelerated transforms',
        lesson: 'Mobile performance requires careful consideration of animation complexity',
      },
      {
        problem: 'Theme switching without flash of unstyled content',
        solution: 'Used localStorage with SSR-safe hydration pattern',
        lesson: 'Server-client state synchronization needs deliberate handling in Next.js',
      },
    ],
    teamSize: 1,
    myRole: 'Full Stack Developer & Designer',
    difficulty: 'intermediate',
    isResponsive: true,
    hasDarkMode: true,
    github: {
      repoName: 'portfolio-web',
      repoDescription: 'Premium portfolio website with Next.js and Framer Motion',
      stars: 12,
      language: 'TypeScript',
      lastUpdated: '2025-07',
      url: 'https://github.com/samet168/portfolio-web',
    },
    overview: {
      introduction: 'A premium personal portfolio that showcases my skills and projects with a focus on design excellence and smooth interactions.',
      problem: 'Traditional portfolio websites feel static and outdated, failing to demonstrate modern frontend capabilities.',
      solution: 'Built a visually stunning portfolio with cutting-edge animations, glassmorphism, and a premium user experience.',
      goal: 'Create a portfolio that stands out and demonstrates mastery of modern web technologies.',
      keyFeatures: [
        'Buttery smooth scroll animations',
        'Premium glassmorphism design',
        'Full dark/light mode support',
        'Multi-language (English/Khmer)',
        'Mobile-first responsive design',
      ],
    },
    gallery: [],
    featured: true,
    order: 1,
  },
  {
    id: 'quickstore',
    slug: 'quickstore',
    title: 'QuickStore E-Commerce',
    shortDescription: 'Full-featured online shopping platform with modern UI and payment integration',
    longDescription: 'A comprehensive e-commerce platform featuring product catalog management, real-time inventory tracking, secure payment processing with Stripe, and an admin dashboard. Built with a focus on performance and user experience.',
    category: 'E-Commerce',
    status: 'completed',
    image: '/images/projects/quickstore.png',
    gradient: 'from-purple-600 via-pink-500 to-rose-400',
    accentColor: '#A855F7',
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'Stripe', 'PostgreSQL', 'Prisma', 'Redis'],
    features: [
      'Product Catalog',
      'Shopping Cart',
      'Payment Integration',
      'Order Management',
      'Admin Dashboard',
      'Search & Filter',
      'User Authentication',
      'Responsive Design',
    ],
    architecture: {
      frontend: 'Next.js + React',
      backend: 'Next.js API Routes + Node.js',
      api: 'REST API + GraphQL',
      database: 'PostgreSQL + Redis Cache',
      deployment: 'Vercel + Railway',
    },
    timeline: [
      { phase: 'Planning', duration: '2 weeks', description: 'Define requirements and database schema' },
      { phase: 'Design', duration: '1 week', description: 'UI/UX design and component library' },
      { phase: 'Development', duration: '6 weeks', description: 'Frontend, backend, payment integration' },
      { phase: 'Testing', duration: '1 week', description: 'E2E testing, payment flow testing' },
      { phase: 'Deployment', duration: '3 days', description: 'Production deployment and monitoring' },
    ],
    challenges: [
      {
        problem: 'Real-time inventory sync across multiple users',
        solution: 'Implemented optimistic UI updates with Redis pub/sub for real-time sync',
        lesson: 'Distributed state management requires careful consideration of race conditions',
      },
      {
        problem: 'Stripe webhook handling and idempotency',
        solution: 'Used idempotency keys and webhook signature verification',
        lesson: 'Payment systems need robust error handling and retry mechanisms',
      },
      {
        problem: 'Complex product filtering and search performance',
        solution: 'Added full-text search with PostgreSQL tsvector and materialized views',
        lesson: 'Database optimization is crucial for search-heavy applications',
      },
    ],
    teamSize: 2,
    myRole: 'Lead Frontend Developer',
    difficulty: 'advanced',
    isResponsive: true,
    hasDarkMode: true,
    github: {
      repoName: 'quickstore',
      repoDescription: 'Full-stack e-commerce platform with Stripe integration',
      stars: 8,
      language: 'TypeScript',
      lastUpdated: '2025-06',
      url: 'https://github.com/samet168/quickstore',
    },
    overview: {
      introduction: 'QuickStore is a modern e-commerce platform that provides seamless shopping experience with real-time updates.',
      problem: 'Small businesses need affordable, feature-rich e-commerce solutions without the complexity of enterprise platforms.',
      solution: 'Built a lightweight yet powerful e-commerce platform with essential features and excellent performance.',
      goal: 'Provide small businesses with a professional e-commerce solution that is easy to manage and scales well.',
      keyFeatures: [
        'Secure Stripe payment processing',
        'Real-time inventory management',
        'Advanced search and filtering',
        'Admin analytics dashboard',
        'Order tracking system',
      ],
    },
    gallery: [],
    featured: true,
    order: 2,
  },
  {
    id: 'pos-management',
    slug: 'pos-management',
    title: 'POS Coffee Management',
    shortDescription: 'Modern point-of-sale system for coffee shops with real-time analytics',
    longDescription: 'A comprehensive point-of-sale management system designed specifically for coffee shops. Features include order processing, inventory management, staff scheduling, loyalty programs, and real-time sales analytics with beautiful dashboards.',
    category: 'Business Software',
    status: 'completed',
    // image: '/images/projects/pos-management.png',
    gradient: 'from-amber-500 via-orange-500 to-red-500',
    accentColor: '#F59E0B',
    technologies: ['Java', 'Spring Boot', 'MySQL', 'React', 'Docker', 'Redis'],
    features: [
      'Order Processing',
      'Inventory Management',
      'Staff Scheduling',
      'Loyalty Program',
      'Sales Analytics',
      'Receipt Printing',
      'Multi-location Support',
      'REST API',
    ],
    architecture: {
      frontend: 'React + Material UI',
      backend: 'Spring Boot (Java)',
      api: 'REST API',
      database: 'MySQL + Redis',
      deployment: 'Docker + AWS',
    },
    timeline: [
      { phase: 'Planning', duration: '2 weeks', description: 'Requirements gathering and system architecture' },
      { phase: 'Design', duration: '1 week', description: 'Database design and API specification' },
      { phase: 'Development', duration: '8 weeks', description: 'Backend API, frontend, integrations' },
      { phase: 'Testing', duration: '2 weeks', description: 'Unit tests, integration tests, UAT' },
      { phase: 'Deployment', duration: '1 week', description: 'Docker containerization and deployment' },
    ],
    challenges: [
      {
        problem: 'Handling concurrent orders during peak hours',
        solution: 'Implemented queue-based order processing with Redis for high throughput',
        lesson: 'Message queues are essential for handling concurrent operations gracefully',
      },
      {
        problem: 'Real-time dashboard updates without page refresh',
        solution: 'Used WebSocket connections for live data streaming to the dashboard',
        lesson: 'WebSockets provide better UX than polling for real-time features',
      },
    ],
    teamSize: 3,
    myRole: 'Backend Developer & System Architect',
    difficulty: 'advanced',
    isResponsive: true,
    hasDarkMode: true,
    github: {
      repoName: 'pos-coffee-management',
      repoDescription: 'Point-of-sale system for coffee shops with analytics',
      stars: 15,
      language: 'Java',
      lastUpdated: '2025-05',
      url: 'https://github.com/samet168/pos-coffee-management',
    },
    overview: {
      introduction: 'A modern POS system that helps coffee shop owners manage their business efficiently with real-time insights.',
      problem: 'Coffee shops struggle with manual order tracking, inventory management, and lack visibility into sales performance.',
      solution: 'Built an integrated POS system with automated inventory tracking, smart analytics, and staff management.',
      goal: 'Streamline coffee shop operations and provide actionable business insights through data-driven dashboards.',
      keyFeatures: [
        'Fast order processing workflow',
        'Automated inventory alerts',
        'Real-time sales dashboard',
        'Customer loyalty program',
        'Multi-location management',
      ],
    },
    gallery: [],
    featured: true,
    order: 3,
  },
  {
    id: 'video-downloader',
    slug: 'video-downloader',
    title: 'Video Downloader App',
    shortDescription: 'Cross-platform video downloader with format conversion and batch processing',
    longDescription: 'A powerful cross-platform video downloading application that supports multiple video platforms. Features batch downloading, format conversion, quality selection, and a clean intuitive interface built with Flutter.',
    category: 'Desktop Application',
    status: 'open-source',
    gradient: 'from-green-500 via-emerald-500 to-teal-500',
    accentColor: '#10B981',
    technologies: ['Flutter', 'Dart', 'Python', 'FastAPI', 'FFmpeg', 'SQLite'],
    features: [
      'Multi-platform Support',
      'Batch Downloading',
      'Format Conversion',
      'Quality Selection',
      'Download Queue',
      'Resume Downloads',
      'Dark Mode',
      'Responsive Design',
    ],
    architecture: {
      frontend: 'Flutter (Cross-platform)',
      backend: 'Python + FastAPI',
      api: 'REST API',
      database: 'SQLite (Local)',
      deployment: 'GitHub Releases',
    },
    timeline: [
      { phase: 'Planning', duration: '1 week', description: 'Research video extraction APIs and plan architecture' },
      { phase: 'Design', duration: '4 days', description: 'Material Design 3 UI with custom components' },
      { phase: 'Development', duration: '4 weeks', description: 'Flutter app, Python backend, FFmpeg integration' },
      { phase: 'Testing', duration: '1 week', description: 'Cross-platform testing on Windows, Mac, Linux' },
      { phase: 'Deployment', duration: '2 days', description: 'GitHub releases with auto-update' },
    ],
    challenges: [
      {
        problem: 'Handling different video formats and codecs across platforms',
        solution: 'Integrated FFmpeg for universal format conversion with preset profiles',
        lesson: 'Abstracting platform-specific logic behind a unified interface simplifies development',
      },
      {
        problem: 'Large file downloads failing due to network interruptions',
        solution: 'Implemented chunked downloading with resume capability using HTTP range requests',
        lesson: 'Resilient download systems need proper error recovery and state persistence',
      },
    ],
    teamSize: 1,
    myRole: 'Full Stack Developer',
    difficulty: 'intermediate',
    isResponsive: true,
    hasDarkMode: true,
    github: {
      repoName: 'video-downloader',
      repoDescription: 'Cross-platform video downloader with format conversion',
      stars: 24,
      language: 'Dart',
      lastUpdated: '2025-04',
      url: 'https://github.com/samet168/video-downloader',
    },
    overview: {
      introduction: 'A user-friendly video downloading tool that works across all major platforms with powerful format conversion.',
      problem: 'Users need a reliable, ad-free way to save videos for offline viewing across different devices.',
      solution: 'Built a clean, cross-platform app with batch downloading, format conversion, and resume capability.',
      goal: 'Provide a simple yet powerful tool for downloading and converting videos without technical knowledge.',
      keyFeatures: [
        'Support for 100+ video platforms',
        'Batch download with queue management',
        'FFmpeg-powered format conversion',
        'Resume interrupted downloads',
        'Clean Material Design 3 interface',
      ],
    },
    gallery: [],
    featured: false,
    order: 4,
  },
  {
    id: 'attendance-system',
    slug: 'attendance-system',
    title: 'Smart Attendance System',
    shortDescription: 'AI-powered attendance tracking with facial recognition for educational institutions',
    longDescription: 'An intelligent attendance management system for educational institutions featuring facial recognition technology, real-time notifications, comprehensive reporting, and integration with existing school management systems.',
    category: 'AI & Education',
    status: 'in-progress',
    image: '/images/projects/attendance-system.png',
    gradient: 'from-indigo-600 via-violet-500 to-purple-500',
    accentColor: '#6366F1',
    technologies: ['Python', 'Django', 'PostgreSQL', 'Vue.js', 'TensorFlow', 'Docker'],
    features: [
      'Facial Recognition',
      'Real-time Notifications',
      'Report Generation',
      'Student Management',
      'Course Scheduling',
      'Analytics Dashboard',
      'Mobile App',
      'REST API',
    ],
    architecture: {
      frontend: 'Vue.js + Vuetify',
      backend: 'Django + Python',
      api: 'REST API + WebSocket',
      database: 'PostgreSQL',
      deployment: 'Docker + DigitalOcean',
    },
    timeline: [
      { phase: 'Planning', duration: '2 weeks', description: 'Research facial recognition and plan system architecture' },
      { phase: 'Design', duration: '1 week', description: 'Database schema, API design, UI wireframes' },
      { phase: 'Development', duration: '10 weeks', description: 'ML model training, backend, frontend development' },
      { phase: 'Testing', duration: '2 weeks', description: 'Accuracy testing, load testing, security audit' },
      { phase: 'Deployment', duration: '1 week', description: 'Containerized deployment with monitoring' },
    ],
    challenges: [
      {
        problem: 'Facial recognition accuracy in varying lighting conditions',
        solution: 'Used data augmentation and trained model with diverse lighting scenarios',
        lesson: 'ML models need diverse training data to handle real-world conditions',
      },
      {
        problem: 'Processing multiple face detections simultaneously in real-time',
        solution: 'Implemented batch processing with GPU acceleration and async queues',
        lesson: 'Real-time ML inference requires careful optimization of the processing pipeline',
      },
    ],
    teamSize: 4,
    myRole: 'Backend Developer & ML Engineer',
    difficulty: 'expert',
    isResponsive: true,
    hasDarkMode: true,
    github: {
      repoName: 'smart-attendance',
      repoDescription: 'AI-powered attendance system with facial recognition',
      stars: 31,
      language: 'Python',
      lastUpdated: '2025-07',
      url: 'https://github.com/samet168/smart-attendance',
    },
    overview: {
      introduction: 'A next-generation attendance system that uses AI to automate student tracking in educational institutions.',
      problem: 'Manual attendance tracking is time-consuming, error-prone, and susceptible to proxy attendance.',
      solution: 'Implemented facial recognition for automated, accurate attendance with real-time reporting.',
      goal: 'Eliminate manual attendance processes and provide instant insights into student engagement.',
      keyFeatures: [
        'AI facial recognition with 99.2% accuracy',
        'Real-time attendance notifications',
        'Comprehensive analytics dashboard',
        'Integration with existing LMS',
        'Mobile companion app',
      ],
    },
    gallery: [],
    featured: true,
    order: 5,
  },
  {
    id: 'khmer-update',
    slug: 'khmer-update',
    title: 'Khmer News Aggregator',
    shortDescription: 'Real-time Khmer news aggregation platform with AI-powered summaries',
    longDescription: 'A modern news aggregation platform that collects and curates Khmer language news from multiple sources. Features AI-powered article summarization, category filtering, bookmarking, and personalized news feeds.',
    category: 'Web Application',
    status: 'completed',
    image: '/images/projects/khmer-update.png',
    gradient: 'from-rose-500 via-pink-500 to-fuchsia-500',
    accentColor: '#EC4899',
    technologies: ['React', 'Flask', 'MongoDB', 'Docker', 'Tailwind CSS', 'OpenAI API'],
    features: [
      'News Aggregation',
      'AI Summaries',
      'Category Filtering',
      'Bookmarking',
      'Personalized Feed',
      'Dark Mode',
      'Share Articles',
      'Responsive Design',
    ],
    architecture: {
      frontend: 'React + Tailwind CSS',
      backend: 'Flask (Python)',
      api: 'REST API',
      database: 'MongoDB',
      deployment: 'Docker + Heroku',
    },
    timeline: [
      { phase: 'Planning', duration: '1 week', description: 'Identify news sources and plan scraping strategy' },
      { phase: 'Design', duration: '4 days', description: 'UI design with Khmer typography considerations' },
      { phase: 'Development', duration: '5 weeks', description: 'Scraper, API, frontend, AI integration' },
      { phase: 'Testing', duration: '1 week', description: 'Content accuracy, performance, localization testing' },
      { phase: 'Deployment', duration: '2 days', description: 'Docker deployment with automated scraping' },
    ],
    challenges: [
      {
        problem: 'Handling Khmer Unicode text rendering and search',
        solution: 'Used specialized Khmer text processing libraries and MongoDB text indexes',
        lesson: 'Non-Latin scripts require extra attention for text processing and display',
      },
      {
        problem: 'Keeping news content fresh without overwhelming the scraper',
        solution: 'Implemented intelligent polling with rate limiting and content deduplication',
        lesson: 'Web scraping needs to balance freshness with respect for source servers',
      },
    ],
    teamSize: 2,
    myRole: 'Full Stack Developer',
    difficulty: 'intermediate',
    isResponsive: true,
    hasDarkMode: true,
    github: {
      repoName: 'khmer-update',
      repoDescription: 'Khmer news aggregation platform with AI summaries',
      stars: 7,
      language: 'JavaScript',
      lastUpdated: '2025-03',
      url: 'https://github.com/samet168/khmer-update',
    },
    overview: {
      introduction: 'A centralized platform for accessing the latest Khmer news with AI-powered summaries for quick consumption.',
      problem: 'Khmer language news is scattered across many sources with no unified platform for easy consumption.',
      solution: 'Built an aggregation platform that collects, categorizes, and summarizes news from multiple sources.',
      goal: 'Make Khmer news accessible and digestible through AI-powered summarization and smart curation.',
      keyFeatures: [
        'Multi-source news aggregation',
        'AI-powered article summaries',
        'Personalized news feed',
        'Khmer-optimized typography',
        'Offline reading support',
      ],
    },
    gallery: [],
    featured: false,
    order: 6,
  },
];

export const projectCategories = [
  'All',
  'Web Development',
  'E-Commerce',
  'Business Software',
  'Desktop Application',
  'AI & Education',
  'Web Application',
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getRelatedProjects(currentSlug: string, limit = 3): Project[] {
  const current = getProjectBySlug(currentSlug);
  if (!current) return projects.slice(0, limit);

  return projects
    .filter((p) => p.slug !== currentSlug)
    .sort((a, b) => {
      const aMatch = a.category === current.category ? 1 : 0;
      const bMatch = b.category === current.category ? 1 : 0;
      return bMatch - aMatch;
    })
    .slice(0, limit);
}

export function getAdjacentProjects(currentSlug: string) {
  const sorted = [...projects].sort((a, b) => a.order - b.order);
  const idx = sorted.findIndex((p) => p.slug === currentSlug);
  return {
    previous: idx > 0 ? sorted[idx - 1] : null,
    next: idx < sorted.length - 1 ? sorted[idx + 1] : null,
  };
}
