import { NextRequest, NextResponse } from 'next/server';
import { isAdminRequest } from '@/lib/supabase/server';
import {
  loadAllBlogPosts,
  saveBlogPost,
  deleteBlogPost,
  loadAutoBlogSettings,
  ManagedBlogPost
} from '@/lib/blog/blogEngine';

// GET /api/blogs - Public gets published posts; Admin gets all posts + automation config
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const adminMode = searchParams.get('admin') === 'true';

    if (adminMode) {
      if (!(await isAdminRequest())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      const [posts, automation] = await Promise.all([
        loadAllBlogPosts(true),
        loadAutoBlogSettings()
      ]);
      return NextResponse.json({ success: true, posts, automation });
    }

    const posts = await loadAllBlogPosts(false);
    return NextResponse.json({ success: true, posts });
  } catch (err) {
    console.error('[GET /api/blogs Error]', err);
    return NextResponse.json({ error: 'Failed to load blogs' }, { status: 500 });
  }
}

// POST /api/blogs - Admin creates or updates a manual blog post
export async function POST(req: NextRequest) {
  try {
    if (!(await isAdminRequest())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = (await req.json()) as Partial<ManagedBlogPost>;
    if (!body.title?.trim() || !body.content?.trim()) {
      return NextResponse.json({ error: 'Title and article content are required.' }, { status: 400 });
    }

    const slug =
      (body.slug || body.title)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '') || `article-${Date.now()}`;

    const post: ManagedBlogPost = {
      id: body.id || `blog-${Date.now().toString().slice(-6)}`,
      slug,
      title: body.title.trim(),
      excerpt: body.excerpt?.trim() || body.content.trim().slice(0, 175) + '...',
      content: body.content.trim(),
      category: body.category?.trim() || 'Engineering',
      tags: Array.isArray(body.tags) && body.tags.length > 0 ? body.tags : ['Engineering', 'SEO'],
      primaryKeyword: body.primaryKeyword?.trim() || body.category?.trim() || 'enterprise software',
      keywordDensity: Number(body.keywordDensity || 1.5),
      seoDescription:
        body.seoDescription?.trim() || body.excerpt?.trim() || body.title.trim(),
      coverTheme: body.coverTheme || 'emerald-gold',
      author: {
        name: body.author?.name?.trim() || 'Ecreation Engineering Editorial',
        role: body.author?.role?.trim() || 'Solutions Architecture Team'
      },
      readTime: body.readTime || '5 min read',
      relatedServiceSlug: body.relatedServiceSlug || 'custom-software-engineering',
      relatedProjectSlug: body.relatedProjectSlug || 'nsfs-erp-system',
      status: body.status === 'draft' ? 'draft' : 'published',
      sourceType: body.sourceType === 'auto' ? 'auto' : 'manual',
      publishedAt: body.publishedAt || new Date().toISOString().slice(0, 10)
    };

    const saved = await saveBlogPost(post);
    return NextResponse.json({ success: true, post: saved });
  } catch (err) {
    console.error('[POST /api/blogs Error]', err);
    return NextResponse.json({ error: 'Failed to save blog post' }, { status: 500 });
  }
}

// DELETE /api/blogs?id=... - Admin removes a blog post
export async function DELETE(req: NextRequest) {
  try {
    if (!(await isAdminRequest())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Blog post id is required' }, { status: 400 });
    }

    await deleteBlogPost(id);
    return NextResponse.json({ success: true, id });
  } catch (err) {
    console.error('[DELETE /api/blogs Error]', err);
    return NextResponse.json({ error: 'Failed to delete blog post' }, { status: 500 });
  }
}
