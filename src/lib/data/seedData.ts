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
    id: 'proj-study-tracker',
    slug: 'study-tracker-lockon',
    title: 'Study Tracker Lockon: Deep Work & Student Analytics Suite',
    client: 'LockOn Focus Labs (EdTech)',
    category: 'EdTech & Focus Analytics',
    summary: 'An intelligent focus-tracking and syllabus retention ecosystem featuring real-time distraction blockers, Pomodoro lock-in sessions, and student leaderboard analytics.',
    challenge: 'Students struggled with fragmented study schedules, constant phone notifications, lack of syllabus mastery visibility, and severe drop-offs during high-stakes competitive entrance exams.',
    solution: 'Engineered a high-performance web and mobile app with an authoritative Pomodoro lock-in session timer, automated streak verification, cross-device distraction shield, and multi-cohort rank leaderboards.',
    results: [
      { metric: '48 Days', label: 'Average unbroken study streak in cohorts' },
      { metric: '+82%', label: 'Lift in daily deep-work focus hours' },
      { metric: '120,000+', label: 'Active registered students enrolled' }
    ],
    tags: ['Next.js', 'React Native', 'WebSockets', 'Tailwind CSS', 'PostgreSQL', 'Redis'],
    image: '/images/projects/study-tracker-lockon.svg',
    liveUrl: 'https://app.lockonstudy.com',
    deliverables: [
      'Cross-platform lock-in study timer with background distraction blocker',
      'Subject mastery visualizer (Physics, Chemistry, Mathematics, Biology)',
      'National and cohort-level leaderboard with anti-cheat verification',
      'Automated PDF performance report generation for mentors and parents'
    ],
    architecture: [
      'Stateful Pomodoro timer synced over WebSocket heartbeat channels',
      'Redis cache for instantaneous leaderboard calculation across 120k students',
      'PostgreSQL RLS for strictly partitioned student study logs and exams'
    ],
    featured: true,
    publishedAt: '2026-10-10'
  },
  {
    id: 'proj-nsfs-erp',
    slug: 'nsfs-erp-system',
    title: 'NSFS ERP: Multi-Campus Academy & Education Governance',
    client: 'National School Foundation Society (NSFS)',
    category: 'Enterprise Education ERP',
    summary: 'End-to-end enterprise school governance platform uniting biometric attendance, automated fee collection, parent communications, and CBSE/State compliance across 6 campuses.',
    challenge: 'Operating 6 distinct physical campuses using decentralized desktop ledgers caused widespread billing delays, lost fee reconciliations, and disconnected student records.',
    solution: 'Designed and deployed a unified Next.js + Supabase cloud ERP with role-based access for Principals, Accountants, Teachers, and Parents, featuring automated UPI autopay fee collection and biometric attendance syncing.',
    results: [
      { metric: '₹1.42 Cr', label: 'Term fees collected via automated PG' },
      { metric: '98.4%', label: 'Campus biometric attendance accuracy' },
      { metric: '14,820', label: 'Student profiles unified across 6 campuses' }
    ],
    tags: ['Enterprise ERP', 'Next.js', 'PostgreSQL RLS', 'UPI AutoPay', 'Biometric IoT', 'Audit Trail'],
    image: '/images/projects/nsfs-erp.svg',
    liveUrl: 'https://portal.nsfserp.org',
    deliverables: [
      'Automated student fee ledger with instant GST-compliant digital receipts',
      'Cloud biometric attendance engine with automatic SMS alerts to parents',
      'Examination grading, report card generation, and CBSE export tools',
      'Multi-branch financial auditing and payroll tax withholding calculations'
    ],
    architecture: [
      'Multi-tenant PostgreSQL schema with isolated campus role permissions',
      'Integration with biometric hardware scanners via HTTPS webhook relays',
      'Automated nightly fee reconciliation and failure retry cron tasks'
    ],
    featured: true,
    publishedAt: '2026-09-18'
  },
  {
    id: 'proj-duragrit-qr-erp',
    slug: 'duragrit-qr-erp',
    title: 'Duragrit QR ERP: Industrial Asset & Inventory Serialization Suite',
    client: 'Duragrit Abrasives & Manufacturing Ltd.',
    category: 'Industrial ERP & Asset Tracking',
    summary: 'A rugged, barcode/QR-driven enterprise manufacturing ERP tracking factory floor inventory, batch serialization, machine uptime, and dispatch logistics across 4 plants.',
    challenge: 'High-volume abrasive manufacturing plants faced pallet loss, counterfeit product complaints, slow dispatch verification, and disconnected GST E-Way bill generation.',
    solution: 'Built a real-time QR asset lifecycle platform with industrial thermal printer integration, sub-second handheld scanner APIs, automated batch genealogy, and direct GST portal synchronization.',
    results: [
      { metric: '48,250+', label: 'Serialized QR items scanned daily' },
      { metric: '1.2 sec', label: 'Pallet dispatch scan verification speed' },
      { metric: '99.85%', label: 'Factory machine uptime reliability' }
    ],
    tags: ['Industrial ERP', 'QR Serialization', 'IoT Sensors', 'Thermal Printing API', 'Next.js', 'PostgreSQL'],
    image: '/images/projects/duragrit-qr-erp.svg',
    liveUrl: 'https://erp.duragrit.com',
    deliverables: [
      'High-speed batch QR code generator with thermal printer driver integration',
      'Mobile scanner PWA with offline caching for warehouse floor staff',
      'Real-time warehouse bay utilization visualizer and dispatch vehicle log',
      'Automated GST E-Way bill & dispatch challan auto-generation engine'
    ],
    architecture: [
      'High-throughput barcode ingestion engine handling 100+ scans/sec',
      'Offline-first IndexedDB PWA syncing with central PostgreSQL upon reconnect',
      'Automated batch traceability audit logs for ISO 9001 compliance'
    ],
    featured: true,
    publishedAt: '2026-08-25'
  },
  {
    id: 'proj-insurance-tracker',
    slug: 'insurance-tracker-suite',
    title: 'Insurance Tracker: High-Throughput Claims & Policyholder Portal',
    client: 'InsurTech Solutions Group',
    category: 'InsurTech & Claims Automation',
    summary: 'Enterprise insurance policy lifecycle and automated claims settlement portal featuring OCR document parsing, fraud score telemetry, and 2.4-hour claim resolution.',
    challenge: 'Traditional policyholder claims took an average of 7 to 10 business days, plagued by manual surveyor evaluations, lost physical bills, and high fraud exposure.',
    solution: 'Engineered an InsurTech engine utilizing automated OCR medical bill ingestion, AI-powered fraud risk scoring, instant cashless hospital authorization, and automated WhatsApp status notifications.',
    results: [
      { metric: '2.4 Hours', label: 'Average claim turnaround time' },
      { metric: '₹8.42 Cr', label: 'Direct claims settled without delay' },
      { metric: '34,200', label: 'Active health & motor policies managed' }
    ],
    tags: ['InsurTech', 'OCR AI Parser', 'IRDAI Compliance', 'Next.js', 'WhatsApp API', 'PostgreSQL'],
    image: '/images/projects/insurance-tracker.svg',
    liveUrl: 'https://portal.insurancetracker.io',
    deliverables: [
      'Instant hospital cashless pre-authorization pipeline',
      'AI OCR medical prescription & diagnostic bill parsing engine',
      'Customer self-service portal with UPI autopay renewal and digital card download',
      'Surveyor mobile app with GPS-tagged photo evidence capture'
    ],
    architecture: [
      'Zero-trust policy data encryption adhering to IRDAI data security norms',
      'OCR document intelligence pipeline parsing unstructured hospital discharge summaries',
      'Automated webhook integration with WhatsApp for Business API'
    ],
    featured: true,
    publishedAt: '2026-07-14'
  },
  {
    id: 'proj-social-video-app',
    slug: 'social-media-video-app',
    title: 'PulsePlay: Low-Latency Short-Form Video & Live Creator Platform',
    client: 'NextGen Media Labs',
    category: 'Mobile & Video Streaming',
    summary: 'A viral short-video mobile app and creator studio powered by adaptive bitrate streaming (HLS/WebRTC), instant monetization tipping, and sub-45ms feed recommendation algorithms.',
    challenge: 'High video buffering on tier-2/3 network connections caused 65% drop-offs, while creators struggled with delayed payout reconciliations and toxic comment spam.',
    solution: 'Deployed a distributed media architecture using GPU-accelerated edge transcoding, low-latency HLS streaming, Redis-backed vector recommendations, and automated real-time moderation.',
    results: [
      { metric: '1.2M', label: 'Daily active viewers across platforms' },
      { metric: '120 ms', label: 'Global edge video start latency' },
      { metric: '$485,000', label: 'Processed creator tips & live coins' }
    ],
    tags: ['React Native', 'WebRTC', 'HLS Transcoding', 'Redis Vector Search', 'Node.js', 'Next.js'],
    image: '/images/projects/social-video-app.svg',
    liveUrl: 'https://pulseplay.tv',
    deliverables: [
      'Ultra-responsive short-video infinite feed with swipe gestures and GPU shaders',
      'Sub-second WebRTC interactive live streaming with virtual gift animations',
      'Creator studio analytics dashboard tracking audience retention and watch times',
      'Automated multi-currency creator payout pipeline via Stripe and bank transfer'
    ],
    architecture: [
      'Global multi-CDN edge video routing with automatic adaptive bitrate switching',
      'Vector similarity recommendation engine in Redis delivering 45ms personal feeds',
      'Real-time automated content moderation flagging prohibited streams in milliseconds'
    ],
    featured: true,
    publishedAt: '2026-06-04'
  },
  {
    id: 'proj-game-tracker',
    slug: 'game-tracker-platform',
    title: 'GameTracker Pro: 50+ Games Catalog & Real-Time Player Telemetry Hub',
    client: 'Apex Interactive Gaming Studios',
    category: 'Gaming Analytics & 50+ Game Suite',
    summary: 'A massive high-throughput game analytics engine and cross-platform launcher managing 50+ live game titles, tracking 86,000+ concurrent players, and synchronizing global leaderboards.',
    challenge: 'Managing telemetry, live balance updates, in-app economies, and anti-cheat tracking across 50+ separate hypercasual and multiplayer titles created extreme operational overhead.',
    solution: 'Designed a unified gaming telemetry platform with 60Hz authoritative WebSocket ingestion, centralized player identity sync, dynamic in-game item drop balancers, and real-time fraud monitoring.',
    results: [
      { metric: '54 Titles', label: 'Active games tracked & managed 24/7' },
      { metric: '86,400', label: 'Peak concurrent players online' },
      { metric: '$3.25M', label: 'In-game transactions & season passes' }
    ],
    tags: ['Gaming Telemetry', 'WebSockets 60Hz', 'Unity & UE5 SDK', 'Anti-Cheat AI', 'Next.js', 'ClickHouse/PostgreSQL'],
    image: '/images/projects/game-tracker.svg',
    liveUrl: 'https://gametracker.network',
    deliverables: [
      'Real-time player concurrency & multi-region matchmaking dashboard',
      '50+ title game catalog with one-click patch deployment and asset delivery',
      'Anti-cheat monitoring engine with automated behavioral ban triggers',
      'Global leaderboards and dynamic season pass rewards calculation pipeline'
    ],
    architecture: [
      '60Hz state synchronization handling 500,000 game events per second',
      'Unified OAuth2 game launcher linking mobile, Steam, and WebGL players',
      'Anti-cheat behavioral anomaly detection engine running live on match frames'
    ],
    featured: true,
    publishedAt: '2026-05-19'
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

