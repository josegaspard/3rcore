'use client'

import { useEffect, useState } from 'react'
import { createBrowserClient } from '@/lib/supabase/client'
import type { BlogPost } from '@/lib/supabase/types'
import Link from 'next/link'

export default function PostsList() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all')
  const [locale, setLocale] = useState<'es' | 'en'>('es')

  const fetchPosts = async () => {
    setLoading(true)
    const supabase = createBrowserClient()
    let query = supabase
      .from('blog_posts')
      .select('*, category:blog_categories(name)')
      .eq('locale', locale)
      .order('created_at', { ascending: false })
    if (filter !== 'all') query = query.eq('status', filter)
    const { data } = await query
    setPosts(data || [])
    setLoading(false)
  }

  useEffect(() => { fetchPosts() }, [filter, locale])

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar este post permanentemente?')) return
    const supabase = createBrowserClient()
    await (supabase as any).from('blog_posts').delete().eq('id', id)
    fetchPosts()
  }

  const totalCount = posts.length
  const publishedCount = posts.filter(p => p.status === 'published').length
  const draftCount = posts.filter(p => p.status === 'draft').length

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold">Blog Posts</h1>
          <p className="text-zinc-500 text-sm mt-1">{totalCount} posts en {locale.toUpperCase()}</p>
        </div>
        <Link href="/admin/blog/new" className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold text-sm hover:from-purple-500 hover:to-pink-500 transition-all text-center justify-center">
          + Nuevo Post
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
        <div className="flex gap-1 bg-zinc-900 rounded-xl p-1 border border-zinc-800/50">
          {([['all', `Todos (${totalCount})`], ['published', `Publicados (${publishedCount})`], ['draft', `Borradores (${draftCount})`]] as const).map(([key, label]) => (
            <button key={key} type="button" onClick={() => setFilter(key as any)}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${filter === key ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}>
              {label}
            </button>
          ))}
        </div>
        <div className="flex gap-1 bg-zinc-900 rounded-xl p-1 border border-zinc-800/50 sm:ml-auto">
          {(['es', 'en'] as const).map((l) => (
            <button key={l} type="button" onClick={() => setLocale(l)}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${locale === l ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}>
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Posts */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full" />
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-20 bg-zinc-900/30 border border-zinc-800/50 rounded-2xl">
          <p className="text-zinc-500 text-lg mb-2">No hay posts</p>
          <Link href="/admin/blog/new" className="text-purple-400 hover:text-purple-300 text-sm">Crear el primero →</Link>
        </div>
      ) : (
        <div className="space-y-2">
          {posts.map((post) => (
            <div key={post.id} className="group bg-zinc-900/30 border border-zinc-800/50 rounded-xl p-4 hover:border-zinc-700/50 transition-all flex flex-col sm:flex-row sm:items-center gap-3">
              {/* Image thumbnail */}
              {post.featured_image && (
                <div className="w-full sm:w-16 h-32 sm:h-12 rounded-lg overflow-hidden flex-shrink-0 bg-zinc-800">
                  <img src={post.featured_image} alt="" className="w-full h-full object-cover" />
                </div>
              )}

              {/* Info */}
              <div className="flex-1 min-w-0">
                <Link href={`/admin/blog/${post.id}`} className="text-white font-medium hover:text-purple-300 transition-colors line-clamp-1">
                  {post.title}
                </Link>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <span className="text-zinc-600 text-xs">/{post.slug}</span>
                  {(post.category as any)?.name && (
                    <span className="text-purple-400/60 text-[10px] bg-purple-500/10 px-2 py-0.5 rounded-full">{(post.category as any).name}</span>
                  )}
                </div>
              </div>

              {/* Status + SEO + Date */}
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold uppercase tracking-wider ${
                  post.status === 'published' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                }`}>
                  {post.status === 'published' ? 'Publicado' : 'Borrador'}
                </span>
                <SeoScore post={post} />
                <span className="text-zinc-600 text-xs hidden lg:block w-20 text-right">
                  {new Date(post.published_at || post.created_at).toLocaleDateString('es-PE', { day: '2-digit', month: 'short' })}
                </span>
                <div className="flex gap-1">
                  <Link href={`/admin/blog/${post.id}`} className="text-zinc-500 hover:text-white text-xs px-2 py-1 rounded-lg hover:bg-zinc-800 transition-all">
                    Editar
                  </Link>
                  <button type="button" onClick={() => handleDelete(post.id)} className="text-zinc-600 hover:text-red-400 text-xs px-2 py-1 rounded-lg hover:bg-red-500/10 transition-all">
                    ✕
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function SeoScore({ post }: { post: BlogPost }) {
  let score = 0
  if (post.meta_title) score++
  if (post.meta_description) score++
  if (post.og_image || post.featured_image) score++
  if (post.focus_keyword) score++
  if (post.featured_image_alt) score++
  const pct = Math.round((score / 5) * 100)
  const color = pct >= 80 ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' : pct >= 40 ? 'text-amber-400 bg-amber-500/10 border-amber-500/20' : 'text-red-400 bg-red-500/10 border-red-500/20'
  return <span className={`text-[10px] font-bold px-2 py-1 rounded-lg border ${color}`}>SEO {pct}%</span>
}
