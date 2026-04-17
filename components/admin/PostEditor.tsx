'use client'

import { useState, useEffect, useCallback } from 'react'
import { createBrowserClient } from '@/lib/supabase/client'
import type { BlogPost, BlogCategory } from '@/lib/supabase/types'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'

const TipTapEditor = dynamic(() => import('./TipTapEditor'), { ssr: false })

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

interface PostEditorProps {
  post?: BlogPost
}

export default function PostEditor({ post }: PostEditorProps) {
  const router = useRouter()
  const isEdit = !!post
  const [saving, setSaving] = useState(false)
  const [categories, setCategories] = useState<BlogCategory[]>([])
  const [seoOpen, setSeoOpen] = useState(true)
  const [previewOpen, setPreviewOpen] = useState(false)

  // Form state
  const [title, setTitle] = useState(post?.title || '')
  const [slug, setSlug] = useState(post?.slug || '')
  const [excerpt, setExcerpt] = useState(post?.excerpt || '')
  const [content, setContent] = useState(post?.content || '')
  const [featuredImage, setFeaturedImage] = useState(post?.featured_image || '')
  const [featuredImageAlt, setFeaturedImageAlt] = useState(post?.featured_image_alt || '')
  const [status, setStatus] = useState<'draft' | 'published'>(post?.status === 'published' ? 'published' : 'draft')
  const [locale, setLocale] = useState<'es' | 'en'>(post?.locale || 'es')
  const [categoryId, setCategoryId] = useState(post?.category_id || '')
  const [authorName, setAuthorName] = useState(post?.author_name || 'Piero Roque')

  // SEO state
  const [metaTitle, setMetaTitle] = useState(post?.meta_title || '')
  const [metaDescription, setMetaDescription] = useState(post?.meta_description || '')
  const [ogTitle, setOgTitle] = useState(post?.og_title || '')
  const [ogDescription, setOgDescription] = useState(post?.og_description || '')
  const [ogImage, setOgImage] = useState(post?.og_image || '')
  const [canonicalUrl, setCanonicalUrl] = useState(post?.canonical_url || '')
  const [robots, setRobots] = useState(post?.robots || 'index, follow')
  const [focusKeyword, setFocusKeyword] = useState(post?.focus_keyword || '')

  const [slugManual, setSlugManual] = useState(false)

  useEffect(() => {
    const supabase = createBrowserClient()
    supabase.from('blog_categories').select('*').order('name').then(({ data }) => {
      setCategories(data || [])
    })
  }, [])

  // Auto-generate slug from title
  useEffect(() => {
    if (!slugManual && !isEdit) {
      setSlug(slugify(title))
    }
  }, [title, slugManual, isEdit])

  // Auto-fill SEO from content
  useEffect(() => {
    if (!metaTitle && title) setMetaTitle(`${title} | 3R Core`)
    if (!ogTitle && title) setOgTitle(title)
  }, [title])

  const uploadFeaturedImage = useCallback(async () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return

      const supabase = createBrowserClient()
      const ext = file.name.split('.').pop()
      const filename = `featured/${Date.now()}.${ext}`

      const { error } = await supabase.storage.from('blog-images').upload(filename, file, { contentType: file.type })
      if (error) { alert('Error: ' + error.message); return }

      const { data: { publicUrl } } = supabase.storage.from('blog-images').getPublicUrl(filename)
      setFeaturedImage(publicUrl)
      if (!ogImage) setOgImage(publicUrl)
    }
    input.click()
  }, [ogImage])

  const handleSave = async (publishNow = false) => {
    if (!title.trim() || !slug.trim()) {
      alert('Título y slug son obligatorios')
      return
    }

    setSaving(true)
    const supabase = createBrowserClient()

    const postData = {
      title,
      slug,
      excerpt,
      content,
      featured_image: featuredImage || null,
      featured_image_alt: featuredImageAlt || null,
      status: publishNow ? 'published' : status,
      locale,
      meta_title: metaTitle || `${title} | 3R Core`,
      meta_description: metaDescription || excerpt || '',
      og_title: ogTitle || title,
      og_description: ogDescription || metaDescription || excerpt || '',
      og_image: ogImage || featuredImage || null,
      canonical_url: canonicalUrl || null,
      robots,
      focus_keyword: focusKeyword || null,
      author_name: authorName,
      category_id: categoryId || null,
      ...(publishNow && !post?.published_at ? { published_at: new Date().toISOString() } : {}),
    }

    let error: any
    if (isEdit) {
      const res = await (supabase as any).from('blog_posts').update(postData).eq('id', post.id)
      error = res.error
    } else {
      const res = await (supabase as any).from('blog_posts').insert(postData)
      error = res.error
    }

    setSaving(false)

    if (error) {
      alert('Error al guardar: ' + error.message)
      return
    }

    router.push('/admin/blog')
    router.refresh()
  }

  // SEO Score calculation
  const seoScore = (() => {
    let score = 0
    let checks: { label: string; ok: boolean }[] = []

    const check = (label: string, condition: boolean) => {
      checks.push({ label, ok: condition })
      if (condition) score++
    }

    check('Meta título definido', !!metaTitle)
    check('Meta título < 60 caracteres', !!metaTitle && metaTitle.length <= 60)
    check('Meta descripción definida', !!metaDescription)
    check('Meta descripción 120-160 caracteres', !!metaDescription && metaDescription.length >= 120 && metaDescription.length <= 160)
    check('Imagen destacada', !!featuredImage)
    check('Alt text de imagen', !!featuredImageAlt)
    check('Keyword de enfoque', !!focusKeyword)
    check('Keyword en título', !!focusKeyword && title.toLowerCase().includes(focusKeyword.toLowerCase()))
    check('Keyword en meta descripción', !!focusKeyword && metaDescription.toLowerCase().includes(focusKeyword.toLowerCase()))
    check('Extracto definido', !!excerpt)
    check('Slug contiene keyword', !!focusKeyword && slug.includes(slugify(focusKeyword)))
    check('OG Image definida', !!ogImage || !!featuredImage)
    check('Contenido > 300 palabras', (content?.replace(/<[^>]*>/g, '').split(/\s+/).length || 0) > 300)

    return { score, total: checks.length, pct: Math.round((score / checks.length) * 100), checks }
  })()

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Editor - 2/3 */}
      <div className="lg:col-span-2 space-y-6">
        {/* Title */}
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título del post"
            className="w-full bg-transparent text-3xl font-bold text-white placeholder:text-white/20 focus:outline-none border-b border-white/10 pb-4"
          />
          <div className="flex items-center gap-2 mt-2">
            <span className="text-white/30 text-xs">3rcore.com/{locale}/blogs/</span>
            <input
              type="text"
              value={slug}
              onChange={(e) => { setSlug(slugify(e.target.value)); setSlugManual(true) }}
              className="bg-white/5 border border-white/10 rounded px-2 py-0.5 text-xs text-[#E91E63] focus:outline-none focus:border-[#E91E63] flex-1"
            />
          </div>
        </div>

        {/* Excerpt */}
        <div>
          <label className="text-white/40 text-[10px] uppercase tracking-widest block mb-2">Extracto / Resumen</label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Breve resumen del post (aparece en la lista de blogs y en búsquedas)"
            rows={2}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#E91E63] transition-colors resize-none"
          />
        </div>

        {/* WYSIWYG Editor */}
        <div>
          <label className="text-white/40 text-[10px] uppercase tracking-widest block mb-2">Contenido</label>
          <TipTapEditor content={content} onChange={setContent} />
          <p className="text-white/20 text-xs mt-2">
            {content?.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length || 0} palabras
          </p>
        </div>

        {/* SEO Panel */}
        <div className="border border-white/10 rounded-xl overflow-hidden">
          <button
            type="button"
            onClick={() => setSeoOpen(!seoOpen)}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold uppercase tracking-wider">SEO & Metadatos</span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                seoScore.pct >= 80 ? 'bg-green-500/20 text-green-400' :
                seoScore.pct >= 50 ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-red-500/20 text-red-400'
              }`}>
                {seoScore.pct}% ({seoScore.score}/{seoScore.total})
              </span>
            </div>
            <span className="text-white/30">{seoOpen ? '▲' : '▼'}</span>
          </button>

          {seoOpen && (
            <div className="px-6 pb-6 space-y-5 border-t border-white/10 pt-5">
              {/* Focus Keyword */}
              <div>
                <label className="text-white/40 text-[10px] uppercase tracking-widest block mb-2">Keyword de enfoque</label>
                <input
                  type="text"
                  value={focusKeyword}
                  onChange={(e) => setFocusKeyword(e.target.value)}
                  placeholder="ej: marketing digital lima"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#E91E63]"
                />
              </div>

              {/* Meta Title */}
              <div>
                <label className="text-white/40 text-[10px] uppercase tracking-widest block mb-2">
                  Meta Título <span className={metaTitle.length > 60 ? 'text-red-400' : 'text-white/20'}>({metaTitle.length}/60)</span>
                </label>
                <input
                  type="text"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  placeholder={`${title} | 3R Core`}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#E91E63]"
                />
              </div>

              {/* Meta Description */}
              <div>
                <label className="text-white/40 text-[10px] uppercase tracking-widest block mb-2">
                  Meta Descripción <span className={metaDescription.length > 160 ? 'text-red-400' : metaDescription.length >= 120 ? 'text-green-400' : 'text-white/20'}>({metaDescription.length}/160)</span>
                </label>
                <textarea
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  placeholder="Descripción que aparece en Google (120-160 caracteres ideal)"
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#E91E63] resize-none"
                />
              </div>

              {/* OG Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-white/40 text-[10px] uppercase tracking-widest block mb-2">OG Título</label>
                  <input
                    type="text"
                    value={ogTitle}
                    onChange={(e) => setOgTitle(e.target.value)}
                    placeholder={title}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#E91E63]"
                  />
                </div>
                <div>
                  <label className="text-white/40 text-[10px] uppercase tracking-widest block mb-2">OG Descripción</label>
                  <input
                    type="text"
                    value={ogDescription}
                    onChange={(e) => setOgDescription(e.target.value)}
                    placeholder={metaDescription}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#E91E63]"
                  />
                </div>
              </div>

              {/* OG Image */}
              <div>
                <label className="text-white/40 text-[10px] uppercase tracking-widest block mb-2">OG Image URL</label>
                <input
                  type="text"
                  value={ogImage}
                  onChange={(e) => setOgImage(e.target.value)}
                  placeholder={featuredImage || 'https://...'}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#E91E63]"
                />
              </div>

              {/* Canonical + Robots */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-white/40 text-[10px] uppercase tracking-widest block mb-2">URL Canónica</label>
                  <input
                    type="text"
                    value={canonicalUrl}
                    onChange={(e) => setCanonicalUrl(e.target.value)}
                    placeholder={`https://3rcore.com/${locale}/blogs/${slug}`}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#E91E63]"
                  />
                </div>
                <div>
                  <label className="text-white/40 text-[10px] uppercase tracking-widest block mb-2">Robots</label>
                  <select
                    value={robots}
                    onChange={(e) => setRobots(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#E91E63] appearance-none"
                  >
                    <option value="index, follow" className="bg-[#0D0010]">index, follow</option>
                    <option value="noindex, follow" className="bg-[#0D0010]">noindex, follow</option>
                    <option value="index, nofollow" className="bg-[#0D0010]">index, nofollow</option>
                    <option value="noindex, nofollow" className="bg-[#0D0010]">noindex, nofollow</option>
                  </select>
                </div>
              </div>

              {/* SEO Checklist */}
              <div className="bg-white/5 rounded-xl p-4 space-y-2">
                <p className="text-[10px] uppercase tracking-widest text-white/40 mb-3">Checklist SEO</p>
                {seoScore.checks.map((c, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs">
                    <span className={c.ok ? 'text-green-400' : 'text-red-400'}>{c.ok ? '✓' : '✗'}</span>
                    <span className={c.ok ? 'text-white/60' : 'text-white/40'}>{c.label}</span>
                  </div>
                ))}
              </div>

              {/* Google Preview */}
              <div>
                <p className="text-[10px] uppercase tracking-widest text-white/40 mb-3">Vista previa en Google</p>
                <div className="bg-white rounded-xl p-4">
                  <p className="text-[#1a0dab] text-lg font-normal leading-tight truncate">
                    {metaTitle || `${title} | 3R Core`}
                  </p>
                  <p className="text-[#006621] text-sm mt-1 truncate">
                    3rcore.com/{locale}/blogs/{slug}
                  </p>
                  <p className="text-[#545454] text-sm mt-1 line-clamp-2">
                    {metaDescription || excerpt || 'Sin descripción...'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sidebar - 1/3 */}
      <div className="space-y-6">
        {/* Publish Box */}
        <div className="border border-white/10 rounded-xl p-5 space-y-4 sticky top-4">
          <h3 className="text-sm font-bold uppercase tracking-wider">Publicar</h3>

          <div>
            <label className="text-white/40 text-[10px] uppercase tracking-widest block mb-2">Estado</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as 'draft' | 'published')}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#E91E63] appearance-none"
            >
              <option value="draft" className="bg-[#0D0010]">Borrador</option>
              <option value="published" className="bg-[#0D0010]">Publicado</option>
            </select>
          </div>

          <div>
            <label className="text-white/40 text-[10px] uppercase tracking-widest block mb-2">Idioma</label>
            <div className="flex gap-2">
              {(['es', 'en'] as const).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLocale(l)}
                  className={`flex-1 py-2 rounded-lg text-xs uppercase tracking-wider transition-colors ${
                    locale === l ? 'bg-[#E91E63]/20 text-[#E91E63] border border-[#E91E63]/30' : 'bg-white/5 text-white/40 border border-white/10'
                  }`}
                >
                  {l === 'es' ? 'Español' : 'English'}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-white/40 text-[10px] uppercase tracking-widest block mb-2">Categoría</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#E91E63] appearance-none"
            >
              <option value="" className="bg-[#0D0010]">Sin categoría</option>
              {categories.filter(c => c.locale === locale).map((c) => (
                <option key={c.id} value={c.id} className="bg-[#0D0010]">{c.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-white/40 text-[10px] uppercase tracking-widest block mb-2">Autor</label>
            <input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#E91E63]"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={() => handleSave(false)}
              disabled={saving}
              className="flex-1 py-2.5 border border-white/20 rounded-xl text-xs uppercase tracking-widest font-bold hover:bg-white/5 transition-colors disabled:opacity-50"
            >
              {saving ? 'Guardando...' : 'Guardar'}
            </button>
            <button
              type="button"
              onClick={() => handleSave(true)}
              disabled={saving}
              className="flex-1 py-2.5 bg-gradient-to-r from-[#E91E63] to-[#9C27B0] rounded-xl text-xs uppercase tracking-widest font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              Publicar
            </button>
          </div>
        </div>

        {/* Featured Image */}
        <div className="border border-white/10 rounded-xl p-5 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider">Imagen Destacada</h3>

          {featuredImage ? (
            <div className="relative">
              <img src={featuredImage} alt={featuredImageAlt} className="w-full rounded-lg aspect-video object-cover" />
              <button
                type="button"
                onClick={() => { setFeaturedImage(''); setFeaturedImageAlt('') }}
                className="absolute top-2 right-2 bg-red-500/80 text-white w-6 h-6 rounded-full text-xs flex items-center justify-center hover:bg-red-500"
              >
                ✗
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={uploadFeaturedImage}
              className="w-full py-8 border-2 border-dashed border-white/10 rounded-xl text-white/30 text-sm hover:border-[#E91E63]/30 hover:text-white/50 transition-colors"
            >
              + Subir imagen
            </button>
          )}

          <div>
            <label className="text-white/40 text-[10px] uppercase tracking-widest block mb-2">Alt Text (SEO)</label>
            <input
              type="text"
              value={featuredImageAlt}
              onChange={(e) => setFeaturedImageAlt(e.target.value)}
              placeholder="Descripción de la imagen para SEO"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#E91E63]"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
