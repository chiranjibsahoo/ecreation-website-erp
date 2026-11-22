import fs from 'fs';
import path from 'path';
import { BLOG_POSTS_DATA } from '@/lib/data/seedData';
import { isSupabaseConfigured, createAdminSupabaseClient } from '@/lib/supabase/server';

export type CoverTheme =
  | 'emerald-gold'
  | 'indigo-slate'
  | 'amber-obsidian'
  | 'teal-ivory'
  | 'rose-graphite'
  | 'cyan-midnight';

export interface ManagedBlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  primaryKeyword: string;
  keywordDensity: number;
  seoDescription: string;
  coverTheme: CoverTheme;
  author: {
    name: string;
    role: string;
  };
  readTime: string;
  relatedServiceSlug: string;
  relatedProjectSlug: string;
  status: 'published' | 'draft';
  sourceType: 'manual' | 'auto';
  publishedAt: string;
  updatedAt?: string;
}

export interface AutoBlogSettings {
  id: string;
  enabled: boolean;
  intervalDays: number;
  lastAutoPublishedAt: string | null;
  nextScheduledAt: string | null;
  defaultAuthorName: string;
  defaultAuthorRole: string;
  updatedAt: string;
}

interface LocalBlogDb {
  posts: ManagedBlogPost[];
  automation: AutoBlogSettings;
}

const DATA_DIR = path.join(process.cwd(), '.data');
const BLOG_FILE = path.join(DATA_DIR, 'ecreation_blogs.json');

const COVER_THEMES: CoverTheme[] = [
  'emerald-gold',
  'indigo-slate',
  'amber-obsidian',
  'teal-ivory',
  'rose-graphite',
  'cyan-midnight'
];

export function calculateReadTime(content: string): string {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const mins = Math.max(2, Math.ceil(words / 200));
  return `${mins} min read`;
}

export function calculateKeywordMetrics(content: string, title: string, primaryKeyword: string) {
  const fullText = `${title} ${content}`.toLowerCase();
  const words = fullText.split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const kw = primaryKeyword.trim().toLowerCase();

  let keywordCount = 0;
  if (kw && wordCount > 0) {
    const escaped = kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const matches = fullText.match(new RegExp(`\\b${escaped}\\b`, 'gi'));
    keywordCount = matches ? matches.length : 0;
  }

  const kwWords = kw ? kw.split(/\s+/).filter(Boolean).length : 1;
  const keywordDensity =
    wordCount > 0 ? Number((((keywordCount * kwWords) / wordCount) * 100).toFixed(2)) : 0;

  const hasHeadings = content.includes('### ') || content.includes('## ');
  const hasInternalLinks = content.includes('/services') || content.includes('/projects') || content.includes('/contact');
  const densityIdeal = keywordDensity >= 0.8 && keywordDensity <= 2.8;
  const noSpamStuffing = keywordDensity <= 3.5;

  let seoScore = 40;
  if (wordCount >= 250) seoScore += 15;
  if (hasHeadings) seoScore += 15;
  if (hasInternalLinks) seoScore += 10;
  if (densityIdeal) seoScore += 15;
  if (noSpamStuffing) seoScore += 5;

  return {
    wordCount,
    keywordCount,
    keywordDensity,
    densityIdeal,
    noSpamStuffing,
    hasHeadings,
    hasInternalLinks,
    seoScore: Math.min(100, seoScore)
  };
}

export function getSeedManagedBlogs(): ManagedBlogPost[] {
  const themes: CoverTheme[] = ['emerald-gold', 'indigo-slate', 'amber-obsidian'];
  const services = ['enterprise-erp-crm', 'cloud-devops-infrastructure', 'ai-automation-workflows'];
  const projects = ['nsfs-erp-system', 'duragrit-qr-erp', 'insurance-tracker-suite'];
  const keywords = ['ERP architecture', 'microservices modernization', 'AI automation'];

  return BLOG_POSTS_DATA.map((p, idx) => {
    const kw = keywords[idx] || p.category;
    const metrics = calculateKeywordMetrics(p.content, p.title, kw);
    return {
      id: p.id,
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      content: p.content,
      category: p.category,
      tags: p.tags,
      primaryKeyword: kw,
      keywordDensity: metrics.keywordDensity || 1.6,
      seoDescription: p.seoDescription,
      coverTheme: themes[idx % themes.length],
      author: { name: p.author.name, role: p.author.role },
      readTime: p.readTime,
      relatedServiceSlug: services[idx % services.length],
      relatedProjectSlug: projects[idx % projects.length],
      status: 'published',
      sourceType: 'manual',
      publishedAt: p.publishedAt
    };
  });
}

const DEFAULT_AUTOMATION: AutoBlogSettings = {
  id: 'default',
  enabled: true,
  intervalDays: 3,
  lastAutoPublishedAt: null,
  nextScheduledAt: null,
  defaultAuthorName: 'Ecreation Engineering Editorial',
  defaultAuthorRole: 'Principal Solutions Architecture Team',
  updatedAt: '2026-11-22T00:00:00.000Z'
};

function readLocalBlogDb(): LocalBlogDb {
  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    if (!fs.existsSync(BLOG_FILE)) {
      const initial: LocalBlogDb = {
        posts: getSeedManagedBlogs(),
        automation: DEFAULT_AUTOMATION
      };
      fs.writeFileSync(BLOG_FILE, JSON.stringify(initial, null, 2), 'utf-8');
      return initial;
    }
    const raw = fs.readFileSync(BLOG_FILE, 'utf-8');
    const parsed = JSON.parse(raw) as Partial<LocalBlogDb>;
    return {
      posts: Array.isArray(parsed.posts) && parsed.posts.length > 0 ? parsed.posts : getSeedManagedBlogs(),
      automation: parsed.automation ? { ...DEFAULT_AUTOMATION, ...parsed.automation } : DEFAULT_AUTOMATION
    };
  } catch {
    return { posts: getSeedManagedBlogs(), automation: DEFAULT_AUTOMATION };
  }
}

function writeLocalBlogDb(db: LocalBlogDb) {
  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    fs.writeFileSync(BLOG_FILE, JSON.stringify(db, null, 2), 'utf-8');
  } catch (err) {
    console.error('[LocalBlog Write Error]', err);
  }
}

function dbRowToPost(row: Record<string, unknown>): ManagedBlogPost {
  return {
    id: String(row.id || ''),
    slug: String(row.slug || ''),
    title: String(row.title || ''),
    excerpt: String(row.excerpt || ''),
    content: String(row.content || ''),
    category: String(row.category || 'Engineering'),
    tags: Array.isArray(row.tags) ? (row.tags as string[]) : [],
    primaryKeyword: String(row.primary_keyword || ''),
    keywordDensity: Number(row.keyword_density || 1.5),
    seoDescription: String(row.seo_description || ''),
    coverTheme: (row.cover_theme as CoverTheme) || 'emerald-gold',
    author: {
      name: String(row.author_name || 'Ecreation Editorial'),
      role: String(row.author_role || 'Solutions Architecture Team')
    },
    readTime: String(row.read_time || '5 min read'),
    relatedServiceSlug: String(row.related_service_slug || 'custom-software-engineering'),
    relatedProjectSlug: String(row.related_project_slug || 'nsfs-erp-system'),
    status: row.status === 'draft' ? 'draft' : 'published',
    sourceType: row.source_type === 'auto' ? 'auto' : 'manual',
    publishedAt: String(row.published_at || new Date().toISOString().slice(0, 10)),
    updatedAt: row.updated_at ? String(row.updated_at) : undefined
  };
}

function postToDbRow(post: ManagedBlogPost) {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    category: post.category,
    tags: post.tags,
    primary_keyword: post.primaryKeyword,
    keyword_density: post.keywordDensity,
    seo_description: post.seoDescription,
    cover_theme: post.coverTheme,
    author_name: post.author.name,
    author_role: post.author.role,
    read_time: post.readTime,
    related_service_slug: post.relatedServiceSlug,
    related_project_slug: post.relatedProjectSlug,
    status: post.status,
    source_type: post.sourceType,
    published_at: post.publishedAt,
    updated_at: new Date().toISOString()
  };
}

export async function loadAllBlogPosts(includeDrafts = false): Promise<ManagedBlogPost[]> {
  let posts: ManagedBlogPost[] = [];

  if (isSupabaseConfigured()) {
    try {
      const supabase = createAdminSupabaseClient();
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('published_at', { ascending: false });
      if (!error && Array.isArray(data) && data.length > 0) {
        posts = data.map((r) => dbRowToPost(r as Record<string, unknown>));
      }
    } catch {
      // fallback below
    }
  }

  // Merge seed blogs & local store so baseline articles are always present
  const localPosts = readLocalBlogDb().posts;
  const bySlug = new Map<string, ManagedBlogPost>();
  for (const p of [...posts, ...localPosts, ...getSeedManagedBlogs()]) {
    if (!bySlug.has(p.slug)) {
      bySlug.set(p.slug, p);
    }
  }

  const all = Array.from(bySlug.values()).sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return includeDrafts ? all : all.filter((p) => p.status === 'published');
}

export async function getBlogPostBySlug(slug: string): Promise<ManagedBlogPost | null> {
  const all = await loadAllBlogPosts(true);
  return all.find((p) => p.slug === slug) || null;
}

export async function saveBlogPost(post: ManagedBlogPost): Promise<ManagedBlogPost> {
  const metrics = calculateKeywordMetrics(post.content, post.title, post.primaryKeyword);
  const normalized: ManagedBlogPost = {
    ...post,
    slug: post.slug
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, '-')
      .replace(/^-|-$/g, ''),
    readTime: calculateReadTime(post.content),
    keywordDensity: metrics.keywordDensity,
    updatedAt: new Date().toISOString()
  };

  if (isSupabaseConfigured()) {
    try {
      const supabase = createAdminSupabaseClient();
      await supabase.from('blog_posts').upsert([postToDbRow(normalized)], { onConflict: 'id' });
    } catch (err) {
      console.error('[Supabase UPSERT blog_posts fallback]', err);
    }
  }

  const db = readLocalBlogDb();
  const idx = db.posts.findIndex((p) => p.id === normalized.id || p.slug === normalized.slug);
  if (idx >= 0) {
    db.posts[idx] = normalized;
  } else {
    db.posts = [normalized, ...db.posts];
  }
  writeLocalBlogDb(db);
  return normalized;
}

export async function deleteBlogPost(id: string): Promise<boolean> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createAdminSupabaseClient();
      await supabase.from('blog_posts').delete().eq('id', id);
    } catch {
      // fallback
    }
  }
  const db = readLocalBlogDb();
  db.posts = db.posts.filter((p) => p.id !== id);
  writeLocalBlogDb(db);
  return true;
}

export async function loadAutoBlogSettings(): Promise<AutoBlogSettings> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createAdminSupabaseClient();
      const { data, error } = await supabase
        .from('blog_automation_settings')
        .select('*')
        .eq('id', 'default')
        .single();
      if (!error && data) {
        return {
          id: 'default',
          enabled: Boolean(data.enabled),
          intervalDays: Number(data.interval_days || 3),
          lastAutoPublishedAt: data.last_auto_published_at || null,
          nextScheduledAt: data.next_scheduled_at || null,
          defaultAuthorName: data.default_author_name || DEFAULT_AUTOMATION.defaultAuthorName,
          defaultAuthorRole: data.default_author_role || DEFAULT_AUTOMATION.defaultAuthorRole,
          updatedAt: data.updated_at || new Date().toISOString()
        };
      }
    } catch {
      // fallback
    }
  }
  return readLocalBlogDb().automation;
}

export async function saveAutoBlogSettings(settings: AutoBlogSettings): Promise<AutoBlogSettings> {
  const updated: AutoBlogSettings = {
    ...DEFAULT_AUTOMATION,
    ...settings,
    id: 'default',
    intervalDays: Math.max(1, Math.min(30, Number(settings.intervalDays) || 3)),
    updatedAt: new Date().toISOString()
  };

  if (isSupabaseConfigured()) {
    try {
      const supabase = createAdminSupabaseClient();
      await supabase.from('blog_automation_settings').upsert(
        [
          {
            id: 'default',
            enabled: updated.enabled,
            interval_days: updated.intervalDays,
            last_auto_published_at: updated.lastAutoPublishedAt,
            next_scheduled_at: updated.nextScheduledAt,
            default_author_name: updated.defaultAuthorName,
            default_author_role: updated.defaultAuthorRole,
            updated_at: updated.updatedAt
          }
        ],
        { onConflict: 'id' }
      );
    } catch {
      // fallback
    }
  }

  const db = readLocalBlogDb();
  db.automation = updated;
  writeLocalBlogDb(db);
  return updated;
}

// =========================================================================
// 100% ORIGINAL, COPYRIGHT-FREE, SEO-OPTIMIZED AUTO-BLOG GENERATOR
// =========================================================================
interface TopicBlueprint {
  slugBase: string;
  title: string;
  category: string;
  primaryKeyword: string;
  tags: string[];
  relatedServiceSlug: string;
  relatedProjectSlug: string;
  coverTheme: CoverTheme;
  angle: string;
}

const AUTO_BLOG_BLUEPRINTS: TopicBlueprint[] = [
  {
    slugBase: 'custom-erp-software-roi-guide-indian-enterprises',
    title: 'How Custom ERP Software Eliminates Operational Bottlenecks and Accelerates Growth',
    category: 'Enterprise ERP',
    primaryKeyword: 'custom ERP software',
    tags: ['ERP', 'Office Automation', 'GST Billing', 'PostgreSQL', 'Digital Transformation'],
    relatedServiceSlug: 'enterprise-erp-crm',
    relatedProjectSlug: 'nsfs-erp-system',
    coverTheme: 'emerald-gold',
    angle: 'unifying GST invoicing, multi-branch inventory tracking, HR payroll, and live executive analytics into a single role-based system'
  },
  {
    slugBase: 'qr-code-inventory-erp-manufacturing-traceability',
    title: 'QR-Code Asset Serialization: Building Real-Time Factory Floor Inventory Visibility',
    category: 'Industrial ERP',
    primaryKeyword: 'QR inventory ERP',
    tags: ['QR ERP', 'Manufacturing', 'Supply Chain', 'Asset Tracking', 'Automation'],
    relatedServiceSlug: 'enterprise-erp-crm',
    relatedProjectSlug: 'duragrit-qr-erp',
    coverTheme: 'amber-obsidian',
    angle: 'eliminating pallet loss, speeding up dispatch verification with thermal QR labels, and automating GST E-Way documentation'
  },
  {
    slugBase: 'nextjs-seo-core-web-vitals-business-websites',
    title: 'Technical SEO & Core Web Vitals: Engineering Websites That Rank and Convert',
    category: 'Web & SEO',
    primaryKeyword: 'SEO web development',
    tags: ['SEO', 'Next.js', 'Core Web Vitals', 'Content Marketing', 'Web Engineering'],
    relatedServiceSlug: 'custom-software-engineering',
    relatedProjectSlug: 'study-tracker-lockon',
    coverTheme: 'indigo-slate',
    angle: 'achieving sub-second page loads, clean JSON-LD structured data, semantic HTML, and high-converting lead capture funnels'
  },
  {
    slugBase: 'ai-chatbots-24-7-lead-qualification-b2b-websites',
    title: 'Deploying 24/7 AI Sales Assistants to Capture and Qualify Website Enquiries',
    category: 'Artificial Intelligence',
    primaryKeyword: 'AI sales chatbot',
    tags: ['AI Automation', 'Lead Generation', 'B2B Growth', 'CRM', 'Customer Support'],
    relatedServiceSlug: 'ai-automation-workflows',
    relatedProjectSlug: 'insurance-tracker-suite',
    coverTheme: 'teal-ivory',
    angle: 'answering technical visitor queries instantly, capturing validated phone and email leads, and syncing transcripts into your CRM'
  },
  {
    slugBase: 'insurtech-claims-automation-ocr-document-pipelines',
    title: 'Modernizing Insurance Operations with OCR Document Intelligence and Fast Claims Portals',
    category: 'InsurTech & Cloud',
    primaryKeyword: 'claims automation software',
    tags: ['InsurTech', 'OCR AI', 'Claims Portal', 'Cloud Security', 'Compliance'],
    relatedServiceSlug: 'ai-automation-workflows',
    relatedProjectSlug: 'insurance-tracker-suite',
    coverTheme: 'cyan-midnight',
    angle: 'reducing manual claim settlement times through automated document parsing, risk scoring, and real-time policyholder updates'
  },
  {
    slugBase: 'school-multi-campus-erp-biometric-fee-automation',
    title: 'Multi-Campus Education ERP: Unifying Admissions, Biometric Attendance, and Fee Ledgers',
    category: 'EdTech & ERP',
    primaryKeyword: 'education ERP platform',
    tags: ['EdTech', 'School ERP', 'Fee Automation', 'Parent Portal', 'Cloud ERP'],
    relatedServiceSlug: 'enterprise-erp-crm',
    relatedProjectSlug: 'nsfs-erp-system',
    coverTheme: 'emerald-gold',
    angle: 'connecting principals, teachers, accountants, and parents on one secure cloud platform with automated digital receipts'
  },
  {
    slugBase: 'scalable-mobile-app-architecture-android-ios',
    title: 'Engineering High-Retention Mobile Applications for Android, iOS, and Progressive Web',
    category: 'Mobile Engineering',
    primaryKeyword: 'mobile app engineering',
    tags: ['Mobile Apps', 'PWA', 'Android APK', 'React Native', 'UX Design'],
    relatedServiceSlug: 'mobile-app-development',
    relatedProjectSlug: 'social-media-video-app',
    coverTheme: 'rose-graphite',
    angle: 'combining offline-first caching, over-the-air updates, low-latency media delivery, and thumb-friendly enterprise dashboards'
  },
  {
    slugBase: 'zero-trust-cloud-security-rls-enterprise-portals',
    title: 'Zero-Trust Cloud Architecture: Protecting Enterprise Data with Row-Level Security',
    category: 'Cloud & Security',
    primaryKeyword: 'cloud security architecture',
    tags: ['Cyber Security', 'PostgreSQL RLS', 'DevOps', 'Cloud Hosting', 'Zero-Trust'],
    relatedServiceSlug: 'cloud-devops-infrastructure',
    relatedProjectSlug: 'duragrit-qr-erp',
    coverTheme: 'indigo-slate',
    angle: 'enforcing database-level tenant isolation, encrypted API boundaries, and automated CI/CD rollbacks for mission-critical portals'
  }
];

function buildOriginalArticleFromBlueprint(
  bp: TopicBlueprint,
  settings: AutoBlogSettings,
  suffix = ''
): ManagedBlogPost {
  const kw = bp.primaryKeyword;
  const slug = suffix ? `${bp.slugBase}-${suffix}` : bp.slugBase;
  const today = new Date().toISOString().slice(0, 10);

  const content = `Modern organizations competing in fast-moving digital markets can no longer rely on disconnected spreadsheets, slow legacy portals, or manual follow-up processes. Implementing well-engineered ${kw} gives leadership teams real-time operational clarity while dramatically reducing administrative overhead.

### Why Businesses Are Investing in ${bp.category}

When teams scale across multiple departments or branches, small data silos quickly compound into delayed billing, missed customer enquiries, and inconsistent reporting. By focusing on ${bp.angle}, forward-thinking companies transform technology from a recurring expense into a measurable revenue multiplier.

A structured approach to ${kw} starts by mapping real daily workflows before writing a single line of code. Instead of forcing staff to adapt to rigid off-the-shelf software, tailored engineering aligns permissions, dashboards, and automation rules directly with how your business operates.

### Core Architectural Pillars for Long-Term Reliability

1. **Clean Data Modeling & Security First:** Every high-performing ${kw} implementation relies on normalized relational schemas, role-based access control (RBAC), and encrypted transport layers to protect sensitive client and financial records.
2. **Performance & Search Engine Readiness:** Fast load speeds, semantic structure, and mobile responsiveness ensure both human visitors and search engine crawlers can navigate your platform effortlessly.
3. **Automated Workflows & Instant Alerts:** Connecting enquiry forms, billing events, and inventory milestones to real-time email and mobile notifications ensures your team responds to high-intent opportunities within minutes.
4. **Zero-Downtime Cloud Deployment:** Automated build verification and edge caching keep your digital systems responsive during peak traffic surges without manual server intervention.

### Real-World Implementation & Internal Ecosystem

At Ecreation IT Solution, our engineering teams design and deploy production-grade systems built for measurable business impact. You can explore our dedicated service roadmap at [/services/${bp.relatedServiceSlug}](/services/${bp.relatedServiceSlug}) or review a verified client deployment in our portfolio at [/projects/${bp.relatedProjectSlug}](/projects/${bp.relatedProjectSlug}).

### Key Checklist Before Launching Your Next Digital Initiative

- Define clear operational KPIs such as response speed, manual hours saved, and monthly lead conversion rate.
- Ensure 100% source code ownership, clean documentation, and transparent post-launch SLA support.
- Prioritize mobile accessibility so decision-makers can review analytics and respond to enquiries from anywhere.

Ready to evaluate how ${kw} can streamline your operations and drive qualified enquiries? Schedule a complimentary technical discovery session with our Principal Solutions Architects at [/contact](/contact).`;

  const excerpt = `A practical engineering guide to ${kw} — covering ${bp.angle} with measurable ROI and clean cloud architecture.`;
  const seoDescription = `Discover how ${kw} transforms enterprise workflows through ${bp.angle.slice(0, 85)}. Engineering guide by Ecreation IT Solution.`;
  const metrics = calculateKeywordMetrics(content, bp.title, kw);

  return {
    id: `blog-${Date.now().toString().slice(-6)}`,
    slug,
    title: bp.title,
    excerpt,
    content,
    category: bp.category,
    tags: bp.tags,
    primaryKeyword: kw,
    keywordDensity: metrics.keywordDensity,
    seoDescription: seoDescription.slice(0, 158),
    coverTheme: bp.coverTheme,
    author: {
      name: settings.defaultAuthorName,
      role: settings.defaultAuthorRole
    },
    readTime: calculateReadTime(content),
    relatedServiceSlug: bp.relatedServiceSlug,
    relatedProjectSlug: bp.relatedProjectSlug,
    status: 'published',
    sourceType: 'auto',
    publishedAt: today,
    updatedAt: new Date().toISOString()
  };
}

export async function generateAndPublishAutoBlog(forceNow = false): Promise<{
  published: boolean;
  reason: string;
  post?: ManagedBlogPost;
}> {
  const settings = await loadAutoBlogSettings();
  if (!forceNow && !settings.enabled) {
    return { published: false, reason: 'Auto-blog publishing is currently paused in Admin Settings.' };
  }

  if (!forceNow && settings.lastAutoPublishedAt) {
    const elapsedDays =
      (Date.now() - new Date(settings.lastAutoPublishedAt).getTime()) / (1000 * 60 * 60 * 24);
    if (elapsedDays < settings.intervalDays - 0.1) {
      return {
        published: false,
        reason: `Next auto-blog is scheduled in ${(settings.intervalDays - elapsedDays).toFixed(1)} days.`
      };
    }
  }

  const existingPosts = await loadAllBlogPosts(true);
  const existingSlugs = new Set(existingPosts.map((p) => p.slug));

  // Pick next unused unique blueprint
  let chosen = AUTO_BLOG_BLUEPRINTS.find((bp) => !existingSlugs.has(bp.slugBase));
  let suffix = '';
  if (!chosen) {
    const idx = existingPosts.length % AUTO_BLOG_BLUEPRINTS.length;
    chosen = AUTO_BLOG_BLUEPRINTS[idx];
    suffix = new Date().toISOString().slice(0, 10);
  }

  let generatedPost = buildOriginalArticleFromBlueprint(chosen, settings, suffix);

  // Optional live Gemini AI enrichment if GEMINI_API_KEY is configured in Vercel env
  const geminiKey = process.env.GEMINI_API_KEY;
  if (geminiKey) {
    try {
      const prompt = `Write a 100% original, copyright-free, helpful English technical blog post (550-750 words) for Ecreation IT Solution (an enterprise software, ERP, web & AI engineering company).
Topic: ${chosen.title}
Primary SEO Keyword: "${chosen.primaryKeyword}" (use naturally 4 to 6 times so keyword density stays between 1.2% and 2.2%, zero keyword stuffing, zero exaggerated claims, zero spam).
Format with markdown ### headings, numbered insights, and include natural internal link references to /services/${chosen.relatedServiceSlug}, /projects/${chosen.relatedProjectSlug}, and /contact.
Return ONLY the article body markdown (no title line, no frontmatter).`;

      const aiRes = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${encodeURIComponent(geminiKey)}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.7, maxOutputTokens: 1200 }
          })
        }
      );

      if (aiRes.ok) {
        const aiJson = await aiRes.json();
        const aiText = aiJson?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
        if (aiText && aiText.length > 400) {
          const m = calculateKeywordMetrics(aiText, generatedPost.title, generatedPost.primaryKeyword);
          generatedPost = {
            ...generatedPost,
            content: aiText,
            readTime: calculateReadTime(aiText),
            keywordDensity: m.keywordDensity
          };
        }
      }
    } catch {
      // Cleanly fall back to the original engineering blueprint article
    }
  }

  const saved = await saveBlogPost(generatedPost);
  const nowIso = new Date().toISOString();
  const nextIso = new Date(Date.now() + settings.intervalDays * 86400 * 1000).toISOString();

  await saveAutoBlogSettings({
    ...settings,
    lastAutoPublishedAt: nowIso,
    nextScheduledAt: nextIso
  });

  return {
    published: true,
    reason: `Published unique SEO article "${saved.title}" (Keyword density: ${saved.keywordDensity}%)`,
    post: saved
  };
}
