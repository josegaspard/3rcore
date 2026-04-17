'use client'

import { useEffect, useState } from 'react'
import { createBrowserClient } from '@/lib/supabase/client'
import type { BlogCategory } from '@/lib/supabase/types'

function slugify(text: string): string {
  return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<BlogCategory[]>([])
  const [name, setName] = useState('')
  const [locale, setLocale] = useState<'es' | 'en'>('es')
  const [loading, setLoading] = useState(false)

  const fetchCategories = async () => {
    const supabase = createBrowserClient()
    const { data } = await supabase.from('blog_categories').select('*').order('name')
    setCategories(data || [])
  }

  useEffect(() => { fetchCategories() }, [])

  const handleAdd = async () => {
    if (!name.trim()) return
    setLoading(true)
    const supabase = createBrowserClient()
    await supabase.from('blog_categories').insert({ name, slug: slugify(name), locale } as any)
    setName('')
    fetchCategories()
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar categoría?')) return
    const supabase = createBrowserClient()
    await supabase.from('blog_categories' as any).delete().eq('id', id)
    fetchCategories()
  }

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-wide mb-8">Categorías</h1>

      <div className="flex gap-3 mb-8">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre de la categoría"
          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#E91E63]"
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
        />
        <select
          value={locale}
          onChange={(e) => setLocale(e.target.value as 'es' | 'en')}
          title="Idioma"
          className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none appearance-none"
        >
          <option value="es" className="bg-[#0D0010]">ES</option>
          <option value="en" className="bg-[#0D0010]">EN</option>
        </select>
        <button
          onClick={handleAdd}
          disabled={loading}
          className="px-6 py-2.5 bg-gradient-to-r from-[#E91E63] to-[#9C27B0] rounded-xl font-bold uppercase tracking-widest text-xs hover:opacity-90 disabled:opacity-50"
        >
          Agregar
        </button>
      </div>

      <div className="border border-white/10 rounded-xl overflow-hidden">
        {categories.map((cat) => (
          <div key={cat.id} className="flex items-center justify-between px-5 py-3 border-b border-white/5 last:border-0">
            <div>
              <span className="text-white font-medium">{cat.name}</span>
              <span className="text-white/30 text-xs ml-3">/{cat.slug}</span>
              <span className="text-white/20 text-[10px] ml-2 uppercase">{cat.locale}</span>
            </div>
            <button onClick={() => handleDelete(cat.id)} className="text-white/20 hover:text-red-400 text-xs transition-colors">
              Eliminar
            </button>
          </div>
        ))}
        {categories.length === 0 && (
          <p className="text-white/30 text-center py-8 text-sm">No hay categorías</p>
        )}
      </div>
    </div>
  )
}
