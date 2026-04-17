'use client'
import { useEffect, useState } from 'react'
import { createBrowserClient } from '@/lib/supabase/client'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  const [ok, setOk] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [mob, setMob] = useState(false)
  const router = useRouter()
  const path = usePathname()

  useEffect(() => {
    createBrowserClient().auth.getSession().then(({ data: { session } }) => {
      if (!session) router.push('/admin/login')
      else { setUser(session.user); setOk(true) }
    })
  }, [router])
  useEffect(() => setMob(false), [path])

  if (!ok) return <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center' }}><div className="spinner" /></div>

  const nav = [
    { href:'/admin/blog', label:'Posts', m:(p:string)=>p==='/admin/blog' },
    { href:'/admin/blog/new', label:'Crear', m:(p:string)=>p==='/admin/blog/new' },
    { href:'/admin/blog/categories', label:'Categorías', m:(p:string)=>p==='/admin/blog/categories' },
  ]
  const name = user?.user_metadata?.name || user?.email?.split('@')[0] || 'Admin'

  return (
    <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column' }}>
      <header style={{ position:'sticky', top:0, zIndex:50, background:'rgba(10,10,10,.85)', backdropFilter:'blur(12px)', borderBottom:'1px solid #222' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 20px', height:52 }}>
          <div style={{ display:'flex', alignItems:'center', gap:16 }}>
            <button type="button" className="show-m" onClick={()=>setMob(!mob)} style={{ background:'none', border:'none', color:'#888', cursor:'pointer', padding:4 }} aria-label="Menu">
              <svg width="18" height="18" fill="none"><path d="M2 4h14M2 9h14M2 14h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </button>
            <Link href="/admin/blog" style={{ display:'flex', alignItems:'center', gap:8, textDecoration:'none', color:'inherit' }}>
              <div style={{ width:28, height:28, background:'linear-gradient(135deg,#7c3aed,#ec4899)', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', fontSize:9, fontWeight:800, color:'white' }}>3R</div>
              <span className="hide-m" style={{ fontWeight:600, fontSize:14 }}>Blog CMS</span>
            </Link>
            <nav className="hide-m" style={{ display:'flex', gap:2, marginLeft:8 }}>
              {nav.map(n=>(
                <Link key={n.href} href={n.href} style={{ padding:'6px 14px', borderRadius:8, fontSize:13, fontWeight:500, textDecoration:'none', color:n.m(path)?'white':'#888', background:n.m(path)?'#1a1a1a':'transparent' }}>{n.label}</Link>
              ))}
            </nav>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
            <Link href="/" target="_blank" className="hide-m" style={{ color:'#555', fontSize:12, textDecoration:'none' }}>Ver sitio ↗</Link>
            <div className="hide-m" style={{ width:1, height:16, background:'#222' }} />
            <div style={{ width:26, height:26, borderRadius:'50%', background:'#1a1a1a', border:'1px solid #333', display:'flex', alignItems:'center', justifyContent:'center', fontSize:10, fontWeight:700, color:'#7c3aed' }}>{name[0].toUpperCase()}</div>
            <button type="button" onClick={async()=>{await createBrowserClient().auth.signOut();router.push('/admin/login')}} style={{ background:'none', border:'none', color:'#555', cursor:'pointer', padding:4 }} title="Salir">
              <svg width="15" height="15" fill="none"><path d="M6 14H3a1 1 0 01-1-1V3a1 1 0 011-1h3M11 11l3-3-3-3M14 8H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
        </div>
        {mob && <nav style={{ borderTop:'1px solid #222', padding:'8px 16px' }}>{nav.map(n=>(
          <Link key={n.href} href={n.href} style={{ display:'block', padding:'10px 12px', borderRadius:8, fontSize:14, textDecoration:'none', color:n.m(path)?'white':'#888', background:n.m(path)?'#1a1a1a':'transparent' }}>{n.label}</Link>
        ))}</nav>}
      </header>
      <main className="fade-up" style={{ flex:1, width:'100%', maxWidth:1200, margin:'0 auto', padding:'24px 20px 40px' }}>{children}</main>
    </div>
  )
}
