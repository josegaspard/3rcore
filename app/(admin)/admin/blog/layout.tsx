'use client'

import { useEffect, useState } from 'react'
import { createBrowserClient } from '@/lib/supabase/client'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'

export default function BlogAdminLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const supabase = createBrowserClient()
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push('/admin/login')
      } else {
        setUser(session.user)
        setLoading(false)
      }
    })
  }, [router])

  const handleLogout = async () => {
    const supabase = createBrowserClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0D0010]">
        <div className="animate-spin w-8 h-8 border-2 border-[#E91E63] border-t-transparent rounded-full" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0D0010]">
      {/* Top Bar */}
      <nav className="border-b border-white/10 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/admin/blog" className="text-lg font-bold tracking-[0.15em] uppercase bg-gradient-to-r from-[#E91E63] to-[#9C27B0] bg-clip-text text-transparent">
            3R Core CMS
          </Link>
          <div className="flex gap-1">
            <NavLink href="/admin/blog" active={pathname === '/admin/blog'}>Posts</NavLink>
            <NavLink href="/admin/blog/categories" active={pathname === '/admin/blog/categories'}>Categorías</NavLink>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-white/40 text-xs">{user?.user_metadata?.name || user?.email}</span>
          <button onClick={handleLogout} className="text-white/40 hover:text-white text-xs uppercase tracking-wider transition-colors">
            Salir
          </button>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  )
}

function NavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={`px-4 py-2 rounded-lg text-xs uppercase tracking-wider transition-colors ${
        active
          ? 'bg-white/10 text-white'
          : 'text-white/40 hover:text-white hover:bg-white/5'
      }`}
    >
      {children}
    </Link>
  )
}
