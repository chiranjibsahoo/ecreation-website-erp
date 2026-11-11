import { Service, Project, BlogPost } from '@/types';

export const SERVICES_DATA: Service[] = [
  {
    id: 'svc-1',
    slug: 'custom-software-engineering',
    title: 'Custom Software & Web Engineering',
    shortDescription: 'Tailored enterprise software, responsive web applications, and mission-critical digital systems built for performance, security, and long-term scale.',
    fullDescription: 'At Ecreation IT Solution, our software engineering practice focuses on crafting tailored systems that eliminate operational bottlenecks. We combine clean TypeScript architectures, modern frameworks, and robust API designs to build platforms capable of serving millions of concurrent requests with sub-100ms response times.',
    iconName: 'Code2',
    category: 'engineering',
    features: [
      'Microservices & Modular Monolith architectures',
      'Next.js App Router & React server component engineering',
      'High-throughput RESTful and GraphQL APIs',
      'Real-time data synchronization with WebSocket & Supabase',
      'Strict automated testing suites (Unit, E2E, Regression)'
    ],
    deliverables: [
      'Production-ready deployable codebase with full documentation',
      'Automated CI/CD deployment pipelines',
      'Post-deployment SLA maintenance and monitoring'
    ],
    techStack: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Supabase', 'Tailwind CSS'],
    featured: true
  },
  {
    id: 'svc-2',
    slug: 'enterprise-erp-crm',
    title: 'Enterprise ERP & Client Portals',
    shortDescription: 'End-to-end ERP systems and self-service client portals unifying CRM, invoicing, project delivery, and resource planning under one roof.',
    fullDescription: 'We develop bespoke ERP solutions engineered to fit your distinct business workflows rather than forcing you into rigid off-the-shelf software. From multi-department role permissions to automated billing pipelines and live project dashboards, our solutions empower management teams with complete visibility.',
    iconName: 'Building2',
    category: 'enterprise',
    features: [
      'Role-Based Access Control (RBAC) & Audit Logging',
      'Automated invoice generation, payment gateways & ledger tracking',
      'Interactive client project milestones & sign-off portals',
      'Cross-department task scheduling and resource allocation',
      'Custom reporting dashboards with real-time KPI metrics'
    ],
    deliverables: [
      'Tailored ERP web portal with responsive mobile access',
      'Data migration tools from legacy spreadsheets/databases',
      'Comprehensive staff onboarding and administrative guides'
    ],
    techStack: ['PostgreSQL', 'Next.js', 'Supabase Auth', 'Prisma/Drizzle', 'Tailwind CSS'],
    featured: true
  },
  {
    id: 'svc-3',
    slug: 'cloud-devops-infrastructure',
    title: 'Cloud Architecture & DevOps',
    shortDescription: 'Scalable cloud foundations, automated CI/CD pipelines, container orchestration, and serverless architectures with 99.99% uptime guarantees.',
    fullDescription: 'Our cloud architects design resilient, secure infrastructure across AWS, Google Cloud, and modern edge platforms like Vercel and Supabase. We implement Infrastructure-as-Code (IaC), zero-trust networking, and automated self-healing clusters that guarantee continuous business availability.',
    iconName: 'Cloud',
    category: 'cloud',
    features: [
      'Zero-downtime deployment pipelines with rollback guarantees',
      'Docker containerization & Kubernetes cluster orchestration',
      'Serverless computing & global edge cache distribution',
      'Comprehensive CloudWatch / Prometheus telemetry and alerting',
      'Database replication, backup retention, and disaster recovery'
    ],
    deliverables: [
      'Terraform / IaC repository configuration',
      'Multi-region staging and production cloud environments',
      'Security posture and compliance audit report'
    ],
    techStack: ['AWS', 'GCP', 'Vercel', 'Docker', 'Terraform', 'PostgreSQL'],
    featured: true
  },
  {
    id: 'svc-4',
    slug: 'ai-automation-workflows',
    title: 'AI Solutions & Workflow Automation',
    shortDescription: 'Intelligent AI chatbots, automated document processing, vector search, and predictive workflows that unlock exponential operational leverage.',
    fullDescription: 'Harness the power of practical Artificial Intelligence. We integrate large language models, custom retrieval-augmented generation (RAG) pipelines, and intelligent workflow automation into your daily operations to cut manual data entry by up to 80% while boosting customer response speed.',
    iconName: 'Bot',
    category: 'ai',
    features: [
      'Domain-trained AI customer support & sales chatbots',
      'Document parsing, OCR, and automated structured data extraction',
      'Vector database embeddings for semantic search (pgvector)',
      'Automated triage, lead scoring, and CRM routing',
      'Human-in-the-loop review interfaces for mission-critical tasks'
    ],
    deliverables: [
      'Trained AI model pipeline integrated into existing business tools',
      'Interactive chatbot widget for web and WhatsApp integration',
      'Operational analytics dashboard tracking resolution rates'
    ],
    techStack: ['Python', 'OpenAI/Gemini APIs', 'pgvector', 'Next.js', 'LangChain'],
    featured: true
  },
  {
    id: 'svc-5',
    slug: 'mobile-app-development',
    title: 'Mobile App Engineering (iOS & Android)',
    shortDescription: 'High-performance cross-platform and native mobile applications with fluid 120fps interactions and seamless offline capabilities.',
    fullDescription: 'We build consumer-facing and enterprise mobile applications that provide native performance and cohesive experiences across both Apple iOS and Google Android. From biometric authentication to offline synchronization, our apps are built to excel on the app stores.',
    iconName: 'Smartphone',
    category: 'engineering',
    features: [
      'React Native & Flutter high-efficiency cross-platform builds',
      'Native biometric authentication (Face ID / Fingerprint)',
      'Offline-first architecture with local SQLite/WatermelonDB caching',
      'Push notification dispatch with granular preference centers',
      'App Store & Google Play submission management'
    ],
    deliverables: [
      'Published apps on Apple App Store & Google Play Console',
      'Source code with automated mobile CI/CD build scripts',
      'Mobile analytics and crash reporting integration'
    ],
    techStack: ['React Native', 'Expo', 'TypeScript', 'Supabase', 'Tailwind'],
    featured: false
  },
  {
    id: 'svc-6',
    slug: 'ui-ux-design-modernization',
    title: 'UI/UX Design & Product Strategy',
    shortDescription: 'Research-backed user interfaces, enterprise design systems, interactive prototypes, and modern brand design systems that convert visitors.',
    fullDescription: 'Design is not just decoration—it is your most potent customer conversion tool. We employ human-centered design sprints, thorough user journey mapping, and rigorous accessibility testing to create interfaces that look breathtaking and drive measurable business results.',
    iconName: 'Palette',
    category: 'design',
    features: [
      'Comprehensive Figma design systems with interactive tokens',
      'Wireframing, rapid prototyping, and usability testing',
      'WCAG 2.1 AA/AAA accessibility compliance auditing',
      'Micro-interactions and responsive layout architectures',
      'Brand identity systems and digital marketing creative assets'
    ],
    deliverables: [
      'Figma source files with complete component library',
      'Design tokens ready for Tailwind CSS consumption',
      'Interactive clickable prototype for investor and user testing'
    ],
    techStack: ['Figma', 'Tailwind CSS', 'shadcn/ui', 'Radix UI', 'KaTeX'],
    featured: false
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: 'proj-1',
    slug: 'omnilogistics-erp',
    title: 'OmniLogistics: Global Freight ERP & Telematics Hub',
    client: 'OmniLogistics International',
    category: 'Enterprise ERP & Cloud Architecture',
    summary: 'A unified enterprise logistics management platform managing over 4,500 active freight shipments daily across 14 international trade corridors.',
    challenge: 'OmniLogistics was hindered by disconnected legacy systems, resulting in dispatch delays, manual billing reconciliation errors, and lack of real-time visibility for cargo owners.',
    solution: 'Ecreation IT Solution engineered a Next.js and Supabase enterprise ERP featuring real-time GPS telematics integration, automated multi-currency customs invoicing, and a self-service client tracking portal.',
    results: [
      { metric: '94%', label: 'Reduction in manual dispatch paperwork' },
      { metric: '3.4x', label: 'Faster invoice settlement speed' },
      { metric: '99.98%', label: 'System uptime across global zones' }
    ],
    tags: ['Next.js', 'Supabase', 'PostgreSQL', 'Telematics', 'Tailwind CSS'],
    featured: true,
    publishedAt: '2026-08-15'
  },
  {
    id: 'proj-2',
    slug: 'finedge-banking-portal',
    title: 'FinEdge: High-Throughput Digital Banking Suite',
    client: 'FinEdge Capital Group',
    category: 'Fintech & Web Engineering',
    summary: 'A bank-grade commercial banking and loan underwriting portal processing over $120M in monthly transactional volume with zero security breaches.',
    challenge: 'Legacy banking core had high latency during peak market opening hours, failing to meet strict modern security compliance and mobile customer expectations.',
    solution: 'We built a modern, micro-frontend client portal backed by audited PostgreSQL RLS, hardware security key 2FA, and dynamic PDF statement generation.',
    results: [
      { metric: '68ms', label: 'Average API transaction latency' },
      { metric: '100%', label: 'SOC2 Type II compliance audit pass' },
      { metric: '180,000+', label: 'Active monthly verified business users' }
    ],
    tags: ['TypeScript', 'Next.js', 'PostgreSQL', 'Tailwind CSS', 'Zero-Trust'],
    featured: true,
    publishedAt: '2026-06-22'
  },
  {
    id: 'proj-3',
    slug: 'medihealth-telemedicine',
    title: 'MediHealth: Clinical Care & Telehealth Ecosystem',
    client: 'MediHealth Networks',
    category: 'Healthcare & Mobile Engineering',
    summary: 'HIPAA-compliant patient record, electronic prescriptions, and encrypted video consultation suite connecting 600+ physicians with over 250,000 patients.',
    challenge: 'Dispersed clinic branches required a centralized medical record system capable of functioning seamlessly during internet disruptions in rural clinics.',
    solution: 'Engineered an offline-first mobile app and web EHR with end-to-end encrypted video channels, automated prescription delivery, and calendar scheduling.',
    results: [
      { metric: '4.9/5', label: 'Average patient satisfaction rating' },
      { metric: '45%', label: 'Decrease in patient appointment no-shows' },
      { metric: '100%', label: 'HIPAA and GDPR compliance certification' }
    ],
    tags: ['React Native', 'WebRTC', 'Supabase', 'Next.js', 'Tailwind'],
    featured: true,
    publishedAt: '2026-04-10'
  },
  {
    id: 'proj-4',
    slug: 'apex-headless-commerce',
    title: 'Apex Lifestyle: Global Headless E-Commerce System',
    client: 'Apex Retail Global',
    category: 'Headless Commerce & Performance',
    summary: 'A sub-second international commerce engine serving 32 localized storefronts with automated multi-warehouse inventory routing.',
    challenge: 'Slow monolithic Shopify setup suffered from high cart abandonment on mobile devices and struggled with currency conversion and multi-warehouse sync.',
    solution: 'Implemented a headless Next.js frontend with localized edge caching, Algolia instant search, and real-time inventory webhooks.',
    results: [
      { metric: '0.4s', label: 'Average page load speed globally' },
      { metric: '+41%', label: 'Lift in mobile checkout conversions' },
      { metric: '32', label: 'Global regions served simultaneously' }
    ],
    tags: ['Next.js', 'Tailwind CSS', 'Edge Caching', 'Stripe', 'Headless'],
    featured: false,
    publishedAt: '2026-02-18'
  }
];

export const BLOG_POSTS_DATA: BlogPost[] = [
  {
    id: 'post-1',
    slug: 'mission-critical-erp-architecture-2026',
    title: 'Designing Mission-Critical ERP Architecture: High-Throughput & Zero Downtime',
    excerpt: 'Explore the architectural patterns required to scale enterprise ERPs to thousands of concurrent operations without database locking or degraded responsiveness.',
    content: `Building an Enterprise Resource Planning (ERP) platform in 2026 demands a complete departure from the bloated, monolithic database models of the previous decade. When operational teams manage logistics, invoicing, and real-time project milestones simultaneously, single-point bottlenecks can bring entire companies to an expensive halt.

### Key Architectural Pillars

1. **Strict Separation of Transactional and Analytical Workloads:** By routing analytical reporting and dashboard queries to read replicas while preserving primary nodes for transactional state changes, database lock contention drops by over 80%.
2. **Row-Level Security (RLS) as a Core Security Boundary:** Rather than relying solely on application-level middleware to enforce multi-tenant isolation, embedding security policies directly at the database engine guarantees that cross-tenant data leaks are mathematically impossible.
3. **Optimistic UI Updates with Event Sourcing:** For high-speed operations like inventory counting or order dispatch, adopting optimistic client updates coupled with idempotent backend events gives operators an instantaneous desktop-like responsiveness.

At Ecreation IT Solution, we design our enterprise solutions around these exact principles to ensure zero operational interruptions.`,
    category: 'Architecture',
    author: {
      name: 'Er. Rajesh Sharma',
      role: 'Principal Cloud Architect',
      avatar: '/team/rajesh.jpg'
    },
    tags: ['ERP', 'Next.js', 'PostgreSQL', 'Architecture', 'Enterprise'],
    readTime: '6 min read',
    publishedAt: '2026-10-14',
    seoDescription: 'A deep-dive guide by Ecreation IT Solution into building resilient, high-throughput ERP systems using modern Next.js and Supabase architectures.'
  },
  {
    id: 'post-2',
    slug: 'modernizing-legacy-monoliths-to-microservices',
    title: 'Modernizing Monoliths to Event-Driven Microservices: An Actionable Playbook',
    excerpt: 'Step-by-step breakdown of how to migrate legacy enterprise systems to scalable, modern edge services without pausing business operations.',
    content: `Many growing enterprises find themselves held hostage by legacy codebases built five to ten years ago. Feature releases that once took days now take months, regression bugs multiply, and onboarding new software engineers becomes an agonizing ordeal.

### The Strangulation Pattern: Modernization Without Outages

The biggest mistake leadership teams make is attempting a "big-bang rewrite." In almost every case, a total rewrite runs over budget, falls behind changing business requirements, and introduces new critical errors.

Instead, the **Strangler Fig Pattern** provides a proven, incremental methodology:
- Identify the most isolated, high-value domain (such as the notification engine or billing portal).
- Build the new service using modern Next.js and serverless APIs.
- Place an intelligent reverse proxy at the edge to route that specific domain to the new platform while leaving the rest intact.
- Gradually slice away legacy modules until the old monolith gracefully retires.

By decoupling domain responsibilities, companies gain agility and reliability while minimizing operational risk.`,
    category: 'Engineering',
    author: {
      name: 'Vikram Mehta',
      role: 'Head of Software Engineering',
      avatar: '/team/vikram.jpg'
    },
    tags: ['Microservices', 'Cloud Migration', 'DevOps', 'Legacy Refactoring'],
    readTime: '8 min read',
    publishedAt: '2026-09-28',
    seoDescription: 'Practical guide to modernizing legacy enterprise software systems using the Strangler Fig pattern, written by Ecreation IT Solution engineers.'
  },
  {
    id: 'post-3',
    slug: 'practical-ai-automation-b2b-roi',
    title: 'Practical AI-Driven Automation for B2B Operations: Beyond the Hype to Real ROI',
    excerpt: 'How leading enterprises are utilizing domain-specific AI agents and retrieval pipelines to automate manual documentation and customer support.',
    content: `Artificial intelligence has shifted from exploratory research labs into the daily operational machinery of competitive enterprises. However, commercial success depends on identifying real operational friction rather than deploying superficial gimmicks.

### Where AI Delivers Immediate Enterprise Value

1. **Automated Document Intelligence:** Ingesting complex vendor contracts, unstructured invoices, and compliance audits with custom OCR and LLM parsers translates hundreds of manual hours into instantaneous verified database records.
2. **First-Response Customer & Technical Triage:** Implementing retrieval-augmented generation (RAG) over verified internal documentation allows AI assistants to solve 60-70% of standard customer inquiries accurately within seconds.
3. **Predictive Resource Allocation:** Analyzing historical project timelines and delivery data allows management to accurately forecast project delivery dates and detect potential budget variances weeks before they occur.

At Ecreation IT Solution, we build practical AI systems that integrate seamlessly with your existing databases, adhering to strict data sovereignty and security guidelines.`,
    category: 'Artificial Intelligence',
    author: {
      name: 'Pooja Kulkarni',
      role: 'Lead AI Engineer',
      avatar: '/team/pooja.jpg'
    },
    tags: ['AI', 'Automation', 'B2B', 'RAG', 'Machine Learning'],
    readTime: '5 min read',
    publishedAt: '2026-08-19',
    seoDescription: 'Learn how to implement high-ROI AI automation in enterprise operations with this comprehensive analysis from Ecreation IT Solution.'
  }
];

export const COMPANY_INFO = {
  name: 'Ecreation IT Solution',
  tagline: 'Engineering Scalable Enterprise Software & Modern Digital Experiences',
  founded: '2019',
  headquarters: 'Tech Hub, Sector 62, Noida, Uttar Pradesh, India',
  email: 'contact@ecreation.in',
  phone: '+91 98765 43210',
  whatsappNumber: '919876543210',
  defaultWhatsAppMessage: 'Hello Ecreation IT Solution! I would like to inquire about your software engineering and ERP services.',
  website: 'https://ecreation.in',
  stats: [
    { value: '120+', label: 'Enterprise Projects Delivered' },
    { value: '99.9%', label: 'Client Retention Rate' },
    { value: '14+', label: 'Countries Served' },
    { value: '25+', label: 'Senior Engineers & Architects' }
  ],
  socials: {
    linkedin: 'https://linkedin.com/company/ecreation-it-solution',
    github: 'https://github.com/ecreation-it',
    twitter: 'https://twitter.com/ecreation_it'
  }
};

