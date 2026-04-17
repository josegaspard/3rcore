export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string | null
  featured_image: string | null
  featured_image_alt: string | null
  status: 'draft' | 'published' | 'archived'
  locale: 'es' | 'en'
  meta_title: string | null
  meta_description: string | null
  og_title: string | null
  og_description: string | null
  og_image: string | null
  canonical_url: string | null
  robots: string
  focus_keyword: string | null
  author_name: string
  author_id: string | null
  category_id: string | null
  created_at: string
  updated_at: string
  published_at: string | null
  category?: BlogCategory
}

export interface BlogCategory {
  id: string
  name: string
  slug: string
  description: string | null
  locale: 'es' | 'en'
  created_at: string
}

export interface BlogTag {
  id: string
  name: string
  slug: string
  locale: 'es' | 'en'
  created_at: string
}
