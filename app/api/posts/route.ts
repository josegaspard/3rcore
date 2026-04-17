import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export const revalidate = 0

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const lang = searchParams.get('lang') || 'es'
  const page = parseInt(searchParams.get('page') || '1')
  const perPage = parseInt(searchParams.get('per_page') || '6')

  try {
    const supabase = createServerClient()
    const from = (page - 1) * perPage
    const to = from + perPage - 1

    const { data: posts, count, error } = await supabase
      .from('blog_posts')
      .select('id, title, slug, excerpt, featured_image, featured_image_alt, published_at, created_at, og_image, meta_description, category:blog_categories(name)', { count: 'exact' })
      .eq('status', 'published')
      .eq('locale', lang === 'en' ? 'en' : 'es')
      .order('published_at', { ascending: false })
      .range(from, to)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Map to WP-compatible format for backwards compatibility with NewsSection
    const wpCompatPosts = (posts || []).map(p => ({
      title: { rendered: p.title },
      date: p.published_at || p.created_at,
      link: `/${lang}/blogs/${p.slug}`,
      slug: p.slug,
      yoast_head_json: {
        og_image: p.featured_image ? [{ url: p.featured_image }] : p.og_image ? [{ url: p.og_image }] : [],
        og_description: p.meta_description || p.excerpt || '',
      },
    }))

    const totalPages = Math.ceil((count || 0) / perPage)

    return NextResponse.json(
      { posts: wpCompatPosts, totalPages, total: count || 0 },
      { headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' } }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch posts', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
