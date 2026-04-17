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
    await (supabase as any).from('blog_categories').insert({ name, slug: slugify(name), locale })
    setName('')
    fetchCategories()
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar categoría?')) return
    const supabase = createBrowserClient()
    await (supabase as any).from('blog_categories').delete().eq('id', id)
    fetchCategories()
  }

  const esCats = categories.filter(c => c.locale === 'es')
  const enCats = categories.filter(c => c.locale === 'en')

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Categorías</h1>

      {/* Add form */}
      <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-xl p-5 mb-8">
        <p className="text-sm font-medium mb-4">Nueva categoría</p>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre de la categoría"
            className="flex-1 bg-zinc-800/50 border border-zinc-700/50 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-purple-500/50 transition-all"
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          />
          <select
            value={locale}
            onChange={(e) => setLocale(e.target.value as 'es' | 'en')}
            title="Idioma"
            className="bg-zinc-800/50 border border-zinc-700/50 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none appearance-none w-full sm:w-24"
          >
            <option value="es" className="bg-zinc-900">ES</option>
            <option value="en" className="bg-zinc-900">EN</option>
          </select>
          <button
            type="button"
            onClick={handleAdd}
            disabled={loading || !name.trim()}
            className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold text-sm hover:from-purple-500 hover:to-pink-500 transition-all disabled:opacity-50"
          >
            Agregar
          </button>
        </div>
      </div>

      {/* Categories list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CategoryList title="Español" categories={esCats} onDelete={handleDelete} />
        <CategoryList title="English" categories={enCats} onDelete={handleDelete} />
      </div>
    </div>
  )
}

function CategoryList({ title, categories, onDelete }: { title: string; categories: BlogCategory[]; onDelete: (id: string) => void }) {
  return (
    <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-xl overflow-hidden">
      <div className="px-5 py-3 border-b border-zinc-800/50">
        <h3 className="text-sm font-medium text-zinc-400">{title} ({categories.length})</h3>
      </div>
      {categories.length === 0 ? (
        <p className="text-zinc-600 text-sm text-center py-8">Sin categorías</p>
      ) : (
        <div className="divide-y divide-zinc-800/30">
          {categories.map((cat) => (
            <div key={cat.id} className="flex items-center justify-between px-5 py-3 hover:bg-zinc-800/20 transition-colors">
              <div>
                <span className="text-white text-sm font-medium">{cat.name}</span>
                <span className="text-zinc-600 text-xs ml-2">/{cat.slug}</span>
              </div>
              <button type="button" onClick={() => onDelete(cat.id)} className="text-zinc-600 hover:text-red-400 text-xs transition-colors">
                Eliminar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
