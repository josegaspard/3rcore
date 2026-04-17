import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export const revalidate = 0

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { searchParams } = new URL(request.url)
  const lang = searchParams.get('lang') || 'es'
  const { slug } = await params

  try {
    const supabase = createServerClient()
    const { data: post, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('locale', lang === 'en' ? 'en' : 'es')
      .eq('status', 'published')
      .single()

    if (error || !post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    // Map to WP-compatible format
    return NextResponse.json({
      title: { rendered: post.title },
      date: post.published_at || post.created_at,
      slug: post.slug,
      link: `/${lang}/blogs/${post.slug}`,
      content: { rendered: post.content || '' },
      excerpt: { rendered: post.excerpt || '' },
      yoast_head_json: {
        title: post.meta_title,
        description: post.meta_description,
        og_title: post.og_title,
        og_description: post.og_description,
        og_image: post.og_image ? [{ url: post.og_image }] : [],
        canonical: post.canonical_url,
      },
    }, {
      headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' },
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch post', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
