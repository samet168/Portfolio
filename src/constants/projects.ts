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
  viewUrl?: string;
  frontendUrl?: string;
  backendUrl?: string;
  demoAccount?: {
    email: string;
    password: string;
  };
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
  // {
  //   id: 'portfolio',
  //   slug: 'portfolio',
  //   title: 'Portfolio Website',
  //   shortDescription: 'A premium portfolio website with stunning animations and modern design',
  //   longDescription: 'A cutting-edge personal portfolio website built with Next.js 16 and Framer Motion. Features smooth scroll animations, glassmorphism UI, dark/light theme switching, internationalization, and a premium feel inspired by Apple and Linear design systems.',
  //   category: 'Web Development',
  //   status: 'completed',
  //   image: '/images/projects/portfolio.png',
  //   gradient: 'from-blue-600 via-cyan-500 to-teal-400',
  //   accentColor: '#0088FF',
  //   technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'GSAP'],
  //   features: [
  //     'Smooth Scroll Animations',
  //     'Dark/Light Theme',
  //     'Multi-language Support',
  //     'Responsive Design',
  //     'Custom Cursor',
  //     'Loading Screen',
  //     'Glassmorphism UI',
  //     'Contact Form',
  //   ],
  //   architecture: {
  //     frontend: 'Next.js 16 + React 19',
  //     backend: 'Next.js API Routes',
  //     api: 'REST API',
  //     database: 'N/A (Static)',
  //     deployment: 'Vercel',
  //   },
  //   timeline: [
  //     { phase: 'Planning', duration: '1 week', description: 'Research modern portfolio designs and plan features' },
  //     { phase: 'Design', duration: '1 week', description: 'Create wireframes and design system' },
  //     { phase: 'Development', duration: '3 weeks', description: 'Build components, animations, and pages' },
  //     { phase: 'Testing', duration: '3 days', description: 'Cross-browser testing and performance optimization' },
  //     { phase: 'Deployment', duration: '1 day', description: 'Deploy to Vercel with custom domain' },
  //   ],
  //   challenges: [
  //     {
  //       problem: 'Smooth scroll performance on mobile devices',
  //       solution: 'Implemented Lenis for smooth scrolling with GPU-accelerated transforms',
  //       lesson: 'Mobile performance requires careful consideration of animation complexity',
  //     },
  //     {
  //       problem: 'Theme switching without flash of unstyled content',
  //       solution: 'Used localStorage with SSR-safe hydration pattern',
  //       lesson: 'Server-client state synchronization needs deliberate handling in Next.js',
  //     },
  //   ],
  //   teamSize: 1,
  //   myRole: 'Full Stack Developer & Designer',
  //   difficulty: 'intermediate',
  //   isResponsive: true,
  //   hasDarkMode: true,
  //   github: {
  //     repoName: 'portfolio-web',
  //     repoDescription: 'Premium portfolio website with Next.js and Framer Motion',
  //     stars: 12,
  //     language: 'TypeScript',
  //     lastUpdated: '2025-07',
  //     url: 'https://github.com/samet168/portfolio-web',
  //   },
  //   overview: {
  //     introduction: 'A premium personal portfolio that showcases my skills and projects with a focus on design excellence and smooth interactions.',
  //     problem: 'Traditional portfolio websites feel static and outdated, failing to demonstrate modern frontend capabilities.',
  //     solution: 'Built a visually stunning portfolio with cutting-edge animations, glassmorphism, and a premium user experience.',
  //     goal: 'Create a portfolio that stands out and demonstrates mastery of modern web technologies.',
  //     keyFeatures: [
  //       'Buttery smooth scroll animations',
  //       'Premium glassmorphism design',
  //       'Full dark/light mode support',
  //       'Multi-language (English/Khmer)',
  //       'Mobile-first responsive design',
  //     ],
  //   },
  //   gallery: [],
  //   featured: true,
  //   order: 1,
  // },
  {
  id: 'phone-shop-management',
  slug: 'phone-shop-management',
  title: 'Phone Shop Management System',
  shortDescription: 'A phone shop management system built with C/C++ for inventory, sales, and customer management.',
  longDescription:
    'A desktop-based Phone Shop Management System developed using C/C++. The application helps manage phone inventory, customer information, sales transactions, and basic reporting. This project was completed during my C/C++ training at ANT Technology Training Center and strengthened my programming and problem-solving skills.',

  category: 'Desktop Application',
  status: 'completed',

  image: '/images/C++.png',

  gradient: 'from-slate-700 via-blue-600 to-cyan-500',
  accentColor: '#2563EB',

  technologies: [
    'C',
    'C++',
    'Object-Oriented Programming',
    'File Handling',
  ],

  features: [
    'Phone Inventory Management',
    'Sales Management',
    'Customer Management',
    'Stock Tracking',
    'Search Products',
    'Simple Reporting',
  ],

  architecture: {
    frontend: 'C/C++ Console Application',
    backend: 'Business Logic in C++',
    api: 'N/A',
    database: 'File System',
    deployment: 'Desktop Application',
  },

  timeline: [
    {
      phase: 'Planning',
      duration: '2 days',
      description: 'Analyze shop management requirements.',
    },
    {
      phase: 'Development',
      duration: '2 weeks',
      description: 'Develop inventory, customer, and sales modules.',
    },
    {
      phase: 'Testing',
      duration: '3 days',
      description: 'Fix bugs and improve application stability.',
    },
    {
      phase: 'Completion',
      duration: '1 day',
      description: 'Finalize project and present the system.',
    },
  ],

  challenges: [
    {
      problem: 'Managing product and customer records efficiently.',
      solution:
        'Implemented structured file handling and modular programming techniques.',
      lesson:
        'Learned how to organize data and build maintainable C++ applications.',
    },
    {
      problem: 'Designing reusable code for different management modules.',
      solution:
        'Applied Object-Oriented Programming concepts to improve code structure.',
      lesson:
        'OOP makes applications easier to maintain and extend.',
    },
  ],

  teamSize: 1,

  myRole: 'C/C++ Developer',

  difficulty: 'beginner',

  isResponsive: false,

  hasDarkMode: false,

  github: {
    repoName: '',
    repoDescription: '',
    stars: 0,
    language: 'C++',
    lastUpdated: '2024',
    url: 'https://antkh.com/training/achievements/786.aspx',
  },
  viewUrl: 'https://youtu.be/Q0nZ7Az_3XI?si=Ejc8GoNSZq65zU4V',

  overview: {
    introduction:
      'A desktop application designed to simplify the daily operations of a phone shop.',

    problem:
      'Manual management of products, customers, and sales is time-consuming and error-prone.',

    solution:
      'Developed a C/C++ application to organize inventory, sales, and customer records in one system.',

    goal:
      'Practice core programming concepts while building a practical management application.',

    keyFeatures: [
      'Inventory Management',
      'Sales Tracking',
      'Customer Records',
      'File-Based Data Storage',
      'Simple User Interface',
    ],
  },

  gallery: [
    '/images/C++.png',
  ],

  featured: true,

  order: 1,

  },
  {
    id: 'online-shop',
    slug: 'online-shop',
    title: 'Online Shop',

    shortDescription:
      'An e-commerce website built with Laravel 12 for managing products, orders, and users.',

    longDescription:
      'Online Shop is a full-featured e-commerce web application developed using Laravel 12. The system allows administrators to manage products, categories, orders, and users through an easy-to-use dashboard. Customers can browse products, place orders, and manage their accounts. The project focuses on clean architecture, responsive design, and an efficient shopping experience.',

    category: 'E-Commerce',

    status: 'completed',

    image: '/images/online shop.png',

    gradient: 'from-red-600 via-orange-500 to-yellow-400',

    accentColor: '#F97316',

    technologies: [
      'Laravel 12',
      'PHP',
      'MySQL',
      'Bootstrap 5',
      'CSS',
      'JavaScript'
    ],

    features: [
      'User Authentication',
      'Product Management',
      'Category Management',
      'Shopping Cart',
      'Order Management',
      'Admin Dashboard',
      'Responsive Design'
    ],

    architecture: {
      frontend: 'Blade + Bootstrap 5',
      backend: 'Laravel 12',
      api: 'Laravel Routes',
      database: 'MySQL',
      deployment: 'Localhost / XAMPP'
    },

    timeline: [
      {
        phase: 'Planning',
        duration: '3 Days',
        description: 'Analyze business requirements and database design.'
      },
      {
        phase: 'UI Design',
        duration: '4 Days',
        description: 'Design responsive pages using Bootstrap.'
      },
      {
        phase: 'Development',
        duration: '3 Weeks',
        description: 'Develop authentication, products, cart, and order management.'
      },
      {
        phase: 'Testing',
        duration: '4 Days',
        description: 'Fix bugs and improve application performance.'
      },
      {
        phase: 'Deployment',
        duration: '1 Day',
        description: 'Deploy project on local server.'
      }
    ],

    challenges: [
      {
        problem: 'Managing product inventory and orders efficiently.',
        solution: 'Implemented Laravel Eloquent relationships and validation.',
        lesson: 'Learned how to build scalable CRUD systems using Laravel.'
      },
      {
        problem: 'Creating a responsive shopping experience.',
        solution: 'Used Bootstrap components and responsive layouts.',
        lesson: 'Responsive UI improves usability across devices.'
      },
      {
        problem: 'Securing user authentication.',
        solution: 'Used Laravel authentication and middleware.',
        lesson: 'Security is essential for modern web applications.'
      }
    ],

    teamSize: 1,

    myRole: 'Full Stack Laravel Developer',

    difficulty: 'intermediate',

    isResponsive: true,

    hasDarkMode: false,

    github: {
      repoName: 'Laravel-Onliine-Shop',
      repoDescription: 'Online Shop built with Laravel 12',
      stars: 0,
      language: 'PHP',
      lastUpdated: '2025',
      url: 'https://github.com/samet168/Laravel-Onliine-Shop'
    },

    overview: {
      introduction:
        'Online Shop is a Laravel-based e-commerce website for managing products, orders, and customers.',

      problem:
        'Small businesses need an easy-to-manage online shopping system.',

      solution:
        'Developed a Laravel 12 application with authentication, product management, shopping cart, and order management.',

      goal:
        'Build a complete e-commerce website while improving Laravel and full-stack development skills.',

      keyFeatures: [
        'Laravel Authentication',
        'Product & Category Management',
        'Shopping Cart',
        'Order Management',
        'Responsive Bootstrap UI'
      ]
    },

    gallery: [
      '/images/online shop.png'
    ],

    featured: true,

    order: 2
  },
  {
  id: 'pos-system-coffee',
  slug: 'pos-system-coffee',

  title: 'POS System Coffee',

  shortDescription:
    'A modern Point of Sale (POS) system for coffee shops built with React, Laravel, and MongoDB.',

  longDescription:
    'POS System Coffee is a full-stack web application designed for coffee shop management. The system allows staff to create customer orders, manage products and categories, generate invoices automatically, calculate bills, and monitor daily sales. It provides a responsive user interface and a secure backend for efficient business operations.',

  category: 'Point of Sale',

  status: 'completed',

  image: '/images/Pos_Coffee.png',

  gradient: 'from-amber-700 via-orange-600 to-red-500',

  accentColor: '#C2410C',

  technologies: [
    'React.js',
    'Tailwind CSS',
    'Laravel',
    'MongoDB',
    'Cloudinary'
  ],

  features: [
    'Order Management',
    'Product Management',
    'Category Management',
    'Invoice Generation',
    'Automatic Price Calculation',
    'Customer Management',
    'Sales Dashboard',
    'Responsive Design',
    'Image Upload with Cloudinary'
  ],

  architecture: {
    frontend: 'React.js + Tailwind CSS',
    backend: 'Laravel',
    api: 'REST API',
    database: 'MongoDB',
    deployment: 'Vercel'
  },

  timeline: [
    {
      phase: 'Planning',
      duration: '3 Days',
      description: 'Analyze coffee shop workflow and system requirements.'
    },
    {
      phase: 'Database Design',
      duration: '2 Days',
      description: 'Design MongoDB collections and relationships.'
    },
    {
      phase: 'Development',
      duration: '4 Weeks',
      description: 'Develop frontend, backend, APIs, and POS functionalities.'
    },
    {
      phase: 'Testing',
      duration: '5 Days',
      description: 'Test ordering process, invoice generation, and product management.'
    },
    {
      phase: 'Deployment',
      duration: '2 Days',
      description: 'Deploy frontend to Vercel and connect backend APIs.'
    }
  ],

  challenges: [
    {
      problem: 'Synchronizing frontend and backend data in real time.',
      solution: 'Built RESTful APIs with Laravel and managed state efficiently in React.',
      lesson: 'A well-designed API simplifies frontend and backend integration.'
    },
    {
      problem: 'Uploading and managing product images.',
      solution: 'Integrated Cloudinary for image hosting and optimization.',
      lesson: 'Cloud-based media storage improves scalability and performance.'
    },
    {
      problem: 'Automatically calculating orders and totals.',
      solution: 'Implemented dynamic cart logic with automatic subtotal and total calculations.',
      lesson: 'Business logic should be accurate and reusable.'
    }
  ],

  teamSize: 1,

  myRole: 'Full Stack Developer',

  difficulty: 'advanced',

  isResponsive: true,

  hasDarkMode: false,

  github: {
    repoName: 'POS Coffee System',
    repoDescription: 'Coffee Shop POS System built with React, Laravel, and MongoDB.',
    stars: 0,
    language: 'JavaScript',
    lastUpdated: '2025',
    url: 'https://github.com/samet168/POS_Coffee_FormtEnd'
  },

  frontendUrl: 'https://github.com/samet168/POS_Coffee_FormtEnd',

  backendUrl: 'https://github.com/samet168/POS_System_Coffee_BackEnd',

  viewUrl: 'https://pos-coffee-formt-end-78y1.vercel.app',

  demoAccount: {
    email: 'admin@gamil.com',
    password: '12345678',
  },

  overview: {
    introduction:
      'POS System Coffee is a web-based Point of Sale system that helps coffee shops manage orders, products, invoices, and sales efficiently.',

    problem:
      'Traditional order management in coffee shops can be slow and prone to calculation errors.',

    solution:
      'Developed a modern POS system with automated billing, product management, and invoice generation using React and Laravel.',

    goal:
      'Provide coffee shops with a simple, fast, and reliable sales management solution while improving my full-stack development skills.',

    keyFeatures: [
      'Order Processing',
      'Invoice Generation',
      'Product Management',
      'Sales Dashboard',
      'Cloudinary Image Upload',
      'Responsive User Interface'
    ]
  },

  gallery: [
    '/images/Pos_Coffee.png'
  ],

  featured: true,

  order: 3
  },
  {
    id: 'attendance-system-react',

    slug: 'attendance-system-react',

    title: 'Attendance System (React)',

    shortDescription:
      'A simple attendance management web application built with React.js and CSS.',

    longDescription:
      'Attendance System is a frontend web application developed using React.js and CSS. It provides a clean and user-friendly interface for managing student and staff attendance. Users can record attendance, view attendance information, and navigate through the system with a simple and responsive design.',

    category: 'Web Application',

    status: 'completed',

    image: '/images/Attd.png',

    gradient: 'from-green-600 via-emerald-500 to-teal-500',

    accentColor: '#10B981',

    technologies: [
      'React.js',
      'CSS'
    ],

    features: [
      'Attendance Management',
      'Student Records',
      'Staff Records',
      'Responsive Design',
      'Simple Dashboard',
      'Clean User Interface'
    ],

    architecture: {
      frontend: 'React.js + CSS',
      backend: 'N/A',
      api: 'N/A',
      database: 'N/A',
      deployment: 'Vercel'
    },

    timeline: [
      {
        phase: 'Planning',
        duration: '2 Days',
        description: 'Analyze attendance management requirements.'
      },
      {
        phase: 'UI Design',
        duration: '2 Days',
        description: 'Design a simple and user-friendly interface.'
      },
      {
        phase: 'Development',
        duration: '1 Week',
        description: 'Develop the attendance management application using React.js.'
      },
      {
        phase: 'Testing',
        duration: '2 Days',
        description: 'Test functionality and improve the user interface.'
      },
      {
        phase: 'Deployment',
        duration: '1 Day',
        description: 'Deploy the application to Vercel.'
      }
    ],

    challenges: [
      {
        problem: 'Designing a clean and easy-to-use interface.',
        solution: 'Built reusable React components with simple layouts.',
        lesson: 'A clean UI improves user experience.'
      },
      {
        problem: 'Managing attendance data efficiently.',
        solution: 'Used React state management for handling attendance records.',
        lesson: 'React state makes UI updates simple and efficient.'
      }
    ],

    teamSize: 1,

    myRole: 'Frontend Developer',

    difficulty: 'beginner',

    isResponsive: true,

    hasDarkMode: false,

    github: {
      repoName: '',
      repoDescription: 'Attendance System built with React.js',
      stars: 0,
      language: 'JavaScript',
      lastUpdated: '2025',
      url: '#'
    },

    viewUrl: 'https://react-attendance-student-no-api-7uy.vercel.app/',

    overview: {
      introduction:
        'Attendance System is a simple frontend application for managing student and staff attendance.',

      problem:
        'Manual attendance management can be inefficient and difficult to organize.',

      solution:
        'Developed a React.js application with a clean interface for recording and managing attendance.',

      goal:
        'Practice React.js fundamentals while building a simple attendance management system.',

      keyFeatures: [
        'Attendance Records',
        'Simple Dashboard',
        'Responsive Layout',
        'React Components',
        'Easy Navigation'
      ]
    },

    gallery: [
      '/images/Attd.png'
    ],

    featured: true,

    order: 4
  },
  {
    id: 'attendance-system',
    slug: 'attendance-system',

    title: 'Attendance System',

    shortDescription:
      'A web-based attendance management system built with React, Laravel, and MongoDB for managing student and staff attendance.',

    longDescription:
      'Attendance System is a full-stack web application designed to simplify attendance management for students and staff. The system provides an intuitive interface for recording attendance, managing users, viewing attendance history, and generating reports. It was developed using React.js for the frontend, Laravel for the backend, and MongoDB as the database.',

    category: 'Management System',

    status: 'completed',

    image: '/images/Attd.png',

    gradient: 'from-green-600 via-emerald-500 to-teal-500',

    accentColor: '#10B981',

    technologies: [
      'React.js',
      'CSS',
      'Laravel',
      'MongoDB'
    ],

    features: [
      'Student Attendance',
      'Staff Attendance',
      'User Authentication',
      'Attendance History',
      'Dashboard',
      'Responsive Design',
      'User Management',
      'Real-time Attendance Status'
    ],

    architecture: {
      frontend: 'React.js + CSS',
      backend: 'Laravel',
      api: 'REST API',
      database: 'MongoDB',
      deployment: 'Vercel'
    },

    timeline: [
      {
        phase: 'Planning',
        duration: '2 Days',
        description: 'Analyze attendance management requirements.'
      },
      {
        phase: 'Database Design',
        duration: '2 Days',
        description: 'Design MongoDB collections and application structure.'
      },
      {
        phase: 'Development',
        duration: '3 Weeks',
        description: 'Develop frontend, backend APIs, authentication, and attendance modules.'
      },
      {
        phase: 'Testing',
        duration: '4 Days',
        description: 'Test attendance recording, authentication, and system functionality.'
      },
      {
        phase: 'Deployment',
        duration: '1 Day',
        description: 'Deploy frontend and connect backend services.'
      }
    ],

    challenges: [
      {
        problem: 'Managing attendance records accurately.',
        solution: 'Designed a structured MongoDB database with Laravel REST APIs.',
        lesson: 'A well-designed database improves system reliability and scalability.'
      },
      {
        problem: 'Synchronizing frontend with backend APIs.',
        solution: 'Implemented RESTful API communication using React.js and Laravel.',
        lesson: 'Proper API integration creates a smooth user experience.'
      },
      {
        problem: 'Creating an easy-to-use interface.',
        solution: 'Designed a clean and responsive UI with simple navigation.',
        lesson: 'Simple UI design improves usability for all users.'
      }
    ],

    teamSize: 1,

    myRole: 'Full Stack Developer',

    difficulty: 'intermediate',

    isResponsive: true,

    hasDarkMode: false,

    github: {
      repoName: 'Student Attendance System',
      repoDescription: 'Attendance Management System built with React, Laravel, and MongoDB.',
      stars: 0,
      language: 'JavaScript',
      lastUpdated: '2025',
      url: 'https://github.com/samet168/student_Attendance_frontend'
    },

    frontendUrl: 'https://github.com/samet168/student_Attendance_frontend',

    backendUrl: 'https://github.com/samet168/student_Attendance_backEnd',

    viewUrl: 'https://student-attendance-frontend-i7js.vercel.app',

    demoAccount: {
      email: 'admin@gmail.com',
      password: '12345678'
    },

    overview: {
      introduction:
        'Attendance System is a web application for managing student and staff attendance with a clean and user-friendly interface.',

      problem:
        'Manual attendance tracking is time-consuming and prone to errors.',

      solution:
        'Developed a web-based attendance management system with React.js, Laravel, and MongoDB to automate attendance recording and management.',

      goal:
        'Provide an efficient attendance management solution while improving my full-stack development skills.',

      keyFeatures: [
        'Attendance Recording',
        'User Authentication',
        'Attendance History',
        'Dashboard',
        'Responsive Interface',
        'MongoDB Database'
      ]
    },

    gallery: [
      '/images/Attd.png'
    ],

    featured: true,

    order: 4
  },
  {
    id: 'khmer-update',

    slug: 'khmer-update',

    title: 'Khmer Update',

    shortDescription:
      'A Khmer news website built with Vue 3 and API for displaying the latest news.',

    longDescription:
      'Khmer Update is a Khmer-language news website developed using Vue 3 and API integration. The website displays updated news content with a simple and user-friendly interface. This project demonstrates frontend development skills, API integration, and building dynamic web applications.',

    category: 'News Website',

    status: 'completed',

    image: '/images/Khmer Update.png',

    gradient: 'from-red-600 via-orange-500 to-yellow-400',

    accentColor: '#DC2626',

    technologies: [
      'Vue 3',
      'JavaScript',
      'API',
      'CSS'
    ],

    features: [
      'Latest News Display',
      'API Integration',
      'Dynamic Content',
      'Responsive Design',
      'Simple User Interface',
      'Khmer Language Support'
    ],

    architecture: {
      frontend: 'Vue 3',
      backend: 'External API',
      api: 'REST API',
      database: 'N/A',
      deployment: 'Netlify'
    },

    timeline: [
      {
        phase: 'Planning',
        duration: '2 Days',
        description: 'Analyze news website requirements and user experience.'
      },
      {
        phase: 'UI Design',
        duration: '3 Days',
        description: 'Create a simple and readable news interface.'
      },
      {
        phase: 'Development',
        duration: '2 Weeks',
        description: 'Build Vue components and integrate news API.'
      },
      {
        phase: 'Testing',
        duration: '2 Days',
        description: 'Test API data loading and responsive layouts.'
      },
      {
        phase: 'Deployment',
        duration: '1 Day',
        description: 'Deploy website to Netlify.'
      }
    ],

    challenges: [
      {
        problem: 'Displaying dynamic news data from an API.',
        solution:
          'Integrated REST API with Vue 3 to fetch and display updated content.',
        lesson:
          'API integration is important for building modern dynamic websites.'
      },
      {
        problem: 'Creating a simple interface for reading news.',
        solution:
          'Designed clean layouts with responsive components.',
        lesson:
          'Good UI improves user experience and readability.'
      }
    ],

    teamSize: 1,

    myRole: 'Frontend Developer',

    difficulty: 'beginner',

    isResponsive: true,

    hasDarkMode: false,

    github: {
      repoName: '',
      repoDescription: 'Khmer news website built with Vue 3 and API.',
      stars: 0,
      language: 'JavaScript',
      lastUpdated: '2025',
      url: ''
    },

    viewUrl: 'https://chipper-duckanoo-5f3a1d.netlify.app/',

    overview: {
      introduction:
        'Khmer Update is a news website that provides Khmer-language news content using Vue 3 and API integration.',

      problem:
        'Users need a simple platform to view updated Khmer news content easily.',

      solution:
        'Built a Vue 3 web application that fetches and displays news data from an API.',

      goal:
        'Improve frontend development skills and learn how to work with external APIs.',

      keyFeatures: [
        'News Listing',
        'API Data Fetching',
        'Vue 3 Components',
        'Responsive Design',
        'Khmer Content Support'
      ]
    },

    gallery: [
      '/images/Khmer Update.png'
    ],

    featured: true,

    order: 5
  }
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
