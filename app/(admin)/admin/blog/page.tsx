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
    const supabase = createBrowserClient()
    let query = supabase
      .from('blog_posts')
      .select('*, category:blog_categories(name)')
      .eq('locale', locale)
      .order('created_at', { ascending: false })

    if (filter !== 'all') {
      query = query.eq('status', filter)
    }

    const { data } = await query
    setPosts(data || [])
    setLoading(false)
  }

  useEffect(() => { fetchPosts() }, [filter, locale])

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar este post?')) return
    const supabase = createBrowserClient()
    await supabase.from('blog_posts').delete().eq('id', id)
    fetchPosts()
  }

  const publishedCount = posts.filter(p => p.status === 'published').length
  const draftCount = posts.filter(p => p.status === 'draft').length

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-wide">Blog Posts</h1>
          <p className="text-white/40 text-sm mt-1">{posts.length} posts total</p>
        </div>
        <Link
          href="/admin/blog/new"
          className="px-6 py-2.5 bg-gradient-to-r from-[#E91E63] to-[#9C27B0] rounded-xl font-bold uppercase tracking-widest text-xs hover:opacity-90 transition-opacity"
        >
          + Nuevo Post
        </Link>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex gap-1 bg-white/5 rounded-lg p-1">
          {(['all', 'published', 'draft'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-md text-xs uppercase tracking-wider transition-colors ${
                filter === f ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white'
              }`}
            >
              {f === 'all' ? `Todos (${posts.length})` : f === 'published' ? `Publicados (${publishedCount})` : `Borradores (${draftCount})`}
            </button>
          ))}
        </div>
        <div className="flex gap-1 bg-white/5 rounded-lg p-1 ml-auto">
          {(['es', 'en'] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLocale(l)}
              className={`px-3 py-1.5 rounded-md text-xs uppercase tracking-wider transition-colors ${
                locale === l ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white'
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin w-8 h-8 border-2 border-[#E91E63] border-t-transparent rounded-full" />
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-20 text-white/30">
          <p className="text-lg mb-4">No hay posts aún</p>
          <Link href="/admin/blog/new" className="text-[#E91E63] hover:underline text-sm">
            Crear el primero
          </Link>
        </div>
      ) : (
        <div className="border border-white/10 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10 text-left">
                <th className="px-4 py-3 text-[10px] uppercase tracking-widest text-white/40 font-medium">Título</th>
                <th className="px-4 py-3 text-[10px] uppercase tracking-widest text-white/40 font-medium">Categoría</th>
                <th className="px-4 py-3 text-[10px] uppercase tracking-widest text-white/40 font-medium">Estado</th>
                <th className="px-4 py-3 text-[10px] uppercase tracking-widest text-white/40 font-medium">SEO</th>
                <th className="px-4 py-3 text-[10px] uppercase tracking-widest text-white/40 font-medium">Fecha</th>
                <th className="px-4 py-3 text-[10px] uppercase tracking-widest text-white/40 font-medium w-20"></th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3">
                    <Link href={`/admin/blog/${post.id}`} className="text-white hover:text-[#E91E63] transition-colors font-medium">
                      {post.title}
                    </Link>
                    <p className="text-white/30 text-xs mt-0.5">/{post.slug}</p>
                  </td>
                  <td className="px-4 py-3 text-white/50 text-sm">
                    {(post.category as any)?.name || '—'}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-bold ${
                      post.status === 'published'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {post.status === 'published' ? 'Publicado' : 'Borrador'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <SeoScore post={post} />
                  </td>
                  <td className="px-4 py-3 text-white/40 text-xs">
                    {new Date(post.published_at || post.created_at).toLocaleDateString('es-PE', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Link href={`/admin/blog/${post.id}`} className="text-white/30 hover:text-white text-xs transition-colors">
                        Editar
                      </Link>
                      <button onClick={() => handleDelete(post.id)} className="text-white/30 hover:text-red-400 text-xs transition-colors">
                        Borrar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
  const color = pct >= 80 ? 'text-green-400' : pct >= 40 ? 'text-yellow-400' : 'text-red-400'

  return <span className={`text-xs font-bold ${color}`}>{pct}%</span>
}
