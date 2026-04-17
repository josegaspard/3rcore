'use client'

import { useEffect, useState } from 'react'
import { createBrowserClient } from '@/lib/supabase/client'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'

export default function BlogAdminLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const supabase = createBrowserClient()
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) { router.push('/admin/login') }
      else { setUser(session.user); setLoading(false) }
    })
  }, [router])

  useEffect(() => { setMobileOpen(false) }, [pathname])

  const handleLogout = async () => {
    const supabase = createBrowserClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full" />
    </div>
  )

  const nav = [
    { href: '/admin/blog', label: 'Posts', icon: '📄' },
    { href: '/admin/blog/new', label: 'Nuevo Post', icon: '✏️' },
    { href: '/admin/blog/categories', label: 'Categorías', icon: '🏷️' },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/50">
        <div className="flex items-center justify-between px-4 md:px-6 h-14">
          <div className="flex items-center gap-4">
            <button type="button" onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 -ml-2 text-zinc-400" aria-label="Menu">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
            </button>
            <Link href="/admin/blog" className="flex items-center gap-2">
              <div className="w-7 h-7 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-[10px] font-bold">3R</div>
              <span className="font-semibold text-sm hidden sm:block">Blog CMS</span>
            </Link>
            <nav className="hidden md:flex items-center gap-1 ml-4">
              {nav.map((n) => (
                <Link key={n.href} href={n.href} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all ${pathname === n.href ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'}`}>
                  <span className="text-xs">{n.icon}</span> {n.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" target="_blank" className="text-zinc-500 hover:text-zinc-300 text-xs hidden sm:block">Ver sitio ↗</Link>
            <div className="w-7 h-7 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-[10px] font-bold text-purple-300">
              {(user?.user_metadata?.name || 'U')[0].toUpperCase()}
            </div>
            <button type="button" onClick={handleLogout} className="text-zinc-500 hover:text-red-400 text-xs p-1" title="Salir">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 14H3a1 1 0 01-1-1V3a1 1 0 011-1h3M11 11l3-3-3-3M14 8H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
        </div>
        {mobileOpen && (
          <nav className="md:hidden border-t border-zinc-800/50 px-4 py-3 space-y-1">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm ${pathname === n.href ? 'bg-zinc-800 text-white' : 'text-zinc-400'}`}>
                <span>{n.icon}</span> {n.label}
              </Link>
            ))}
          </nav>
        )}
      </header>
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">{children}</main>
    </div>
  )
}
