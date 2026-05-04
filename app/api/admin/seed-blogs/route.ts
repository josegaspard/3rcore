import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"
import { SEED_POSTS } from "@/lib/blog-seed/posts"

// One-shot token. After running the seed once, this route can be deleted.
const SEED_TOKEN = "seed_2476c302a214b6669b313ff3db6fad9db2aef1e7"

const INDEXNOW_KEY = "20cdaaacbcde738724ae0cf7fc05ebdb"
const HOST = "3rcore.com"
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`
const INDEXNOW_ENDPOINTS = [
  "https://api.indexnow.org/indexnow",
  "https://www.bing.com/indexnow",
  "https://yandex.com/indexnow",
]

async function pingIndexNow(urls: string[]) {
  const payload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  }
  const results = await Promise.all(
    INDEXNOW_ENDPOINTS.map(async (endpoint) => {
      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
        return { endpoint, status: res.status }
      } catch (e: any) {
        return { endpoint, status: 0, error: String(e?.message ?? e) }
      }
    })
  )
  return results
}

export async function POST(req: NextRequest) {
  const auth = req.headers.get("authorization") || req.headers.get("x-seed-token") || ""
  const token = auth.replace(/^Bearer\s+/i, "")
  if (token !== SEED_TOKEN) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 })
  }

  const supabase = createServerClient()
  const now = new Date().toISOString()
  const inserted: string[] = []
  const skipped: string[] = []
  const errors: { slug: string; error: string }[] = []

  for (const post of SEED_POSTS) {
    const record = {
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      featured_image: post.featured_image,
      featured_image_alt: post.featured_image_alt,
      status: "published" as const,
      locale: "es" as const,
      meta_title: post.meta_title,
      meta_description: post.meta_description,
      og_title: post.og_title,
      og_description: post.og_description,
      og_image: post.featured_image,
      canonical_url: `https://3rcore.com/es/blogs/${post.slug}`,
      robots: "index, follow",
      focus_keyword: post.focus_keyword,
      author_name: post.author_name,
      published_at: now,
    }

    // Check if slug already exists
    const { data: existing } = await supabase
      .from("blog_posts")
      .select("id")
      .eq("slug", post.slug)
      .eq("locale", "es")
      .maybeSingle()

    if (existing?.id) {
      // Update existing instead of skip — keeps content fresh
      const { error } = await (supabase as any)
        .from("blog_posts")
        .update(record)
        .eq("id", existing.id)
      if (error) {
        errors.push({ slug: post.slug, error: error.message })
      } else {
        skipped.push(`${post.slug} (updated)`)
      }
    } else {
      const { error } = await (supabase as any).from("blog_posts").insert(record)
      if (error) {
        errors.push({ slug: post.slug, error: error.message })
      } else {
        inserted.push(post.slug)
      }
    }
  }

  // Ping IndexNow with the new blog URLs
  const blogUrls = SEED_POSTS.map((p) => `https://3rcore.com/es/blogs/${p.slug}`)
  const indexnowResults = await pingIndexNow(blogUrls)

  return NextResponse.json({
    ok: errors.length === 0,
    inserted,
    skipped_or_updated: skipped,
    errors,
    indexnow: indexnowResults,
    total_posts: SEED_POSTS.length,
  })
}

export async function GET() {
  return NextResponse.json({
    info: "Use POST with Authorization: Bearer <seed_token> to seed blogs.",
    posts_count: SEED_POSTS.length,
    slugs: SEED_POSTS.map((p) => p.slug),
  })
}
