export interface Service {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  category: 'engineering' | 'cloud' | 'enterprise' | 'ai' | 'design';
  features: string[];
  deliverables: string[];
  techStack: string[];
  featured?: boolean;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  client: string;
  category: string;
  summary: string;
  challenge: string;
  solution: string;
  results: { metric: string; label: string }[];
  tags: string[];
  featured?: boolean;
  publishedAt: string;
  image?: string;
  liveUrl?: string;
  deliverables?: string[];
  architecture?: string[];
  gallery?: string[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  tags: string[];
  readTime: string;
  publishedAt: string;
  seoDescription: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  serviceRequired: string;
  budgetRange?: string;
  message: string;
  source: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'archived';
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  quickReplies?: string[];
}

