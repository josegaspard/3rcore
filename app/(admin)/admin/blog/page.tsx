'use client'
import { useEffect, useState } from 'react'
import { createBrowserClient } from '@/lib/supabase/client'
import type { BlogPost } from '@/lib/supabase/types'
import Link from 'next/link'

export default function PostsList() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all'|'published'|'draft'>('all')
  const [locale, setLocale] = useState<'es'|'en'>('es')

  const load = async () => {
    setLoading(true)
    let q = createBrowserClient().from('blog_posts').select('*, category:blog_categories(name)').eq('locale', locale).order('created_at', { ascending: false })
    if (filter !== 'all') q = q.eq('status', filter)
    const { data } = await q
    setPosts(data || []); setLoading(false)
  }
  useEffect(() => { load() }, [filter, locale])

  const del = async (id: string) => {
    if (!confirm('¿Eliminar este post?')) return
    await (createBrowserClient() as any).from('blog_posts').delete().eq('id', id); load()
  }

  const pub = posts.filter(p=>p.status==='published').length
  const dra = posts.filter(p=>p.status==='draft').length

  const Pill = ({k,l}:{k:string,l:string}) => (
    <button type="button" onClick={()=>setFilter(k as any)} style={{ padding:'6px 14px', borderRadius:8, fontSize:12, fontWeight:500, border:'none', cursor:'pointer', background:filter===k?'#222':'transparent', color:filter===k?'white':'#666' }}>{l}</button>
  )

  return (
    <div>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:28, flexWrap:'wrap', gap:12 }}>
        <div>
          <h1 style={{ fontSize:22, fontWeight:700 }}>Posts</h1>
          <p style={{ color:'#555', fontSize:13, marginTop:2 }}>{posts.length} artículos en {locale.toUpperCase()}</p>
        </div>
        <Link href="/admin/blog/new" className="btn btn-primary">+ Nuevo post</Link>
      </div>

      <div style={{ display:'flex', gap:8, marginBottom:20, flexWrap:'wrap', alignItems:'center' }}>
        <div style={{ display:'flex', gap:2, background:'#141414', borderRadius:10, padding:3, border:'1px solid #222' }}>
          <Pill k="all" l={`Todos ${posts.length}`} />
          <Pill k="published" l={`Pub ${pub}`} />
          <Pill k="draft" l={`Borr ${dra}`} />
        </div>
        <div style={{ marginLeft:'auto', display:'flex', gap:2, background:'#141414', borderRadius:10, padding:3, border:'1px solid #222' }}>
          {(['es','en'] as const).map(l=>(
            <button key={l} type="button" onClick={()=>setLocale(l)} style={{ padding:'6px 12px', borderRadius:8, fontSize:12, fontWeight:600, border:'none', cursor:'pointer', background:locale===l?'#222':'transparent', color:locale===l?'white':'#666' }}>{l.toUpperCase()}</button>
          ))}
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign:'center', padding:'60px 0' }}><div className="spinner" style={{ margin:'0 auto' }} /></div>
      ) : posts.length === 0 ? (
        <div className="card" style={{ textAlign:'center', padding:'60px 20px' }}>
          <p style={{ color:'#555', fontSize:15, marginBottom:8 }}>No hay posts</p>
          <Link href="/admin/blog/new" style={{ color:'#7c3aed', fontSize:13, textDecoration:'none' }}>Crear el primero →</Link>
        </div>
      ) : (
        <div style={{ display:'flex', flexDirection:'column', gap:2 }}>
          {posts.map(post => {
            const seo = [post.meta_title, post.meta_description, post.featured_image||post.og_image, post.focus_keyword, post.featured_image_alt].filter(Boolean).length
            const seoPct = Math.round((seo/5)*100)
            const seoClass = seoPct>=80?'badge-g':seoPct>=40?'badge-y':'badge-r'
            return (
              <Link key={post.id} href={`/admin/blog/${post.id}`} style={{ textDecoration:'none', color:'inherit' }}>
                <div style={{ display:'flex', alignItems:'center', gap:14, padding:'12px 16px', background:'#111', borderRadius:10, border:'1px solid transparent', transition:'all .15s', cursor:'pointer' }}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor='#333';e.currentTarget.style.background='#161616'}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor='transparent';e.currentTarget.style.background='#111'}}>
                  {post.featured_image ? (
                    <img src={post.featured_image} alt="" style={{ width:48, height:48, borderRadius:8, objectFit:'cover', flexShrink:0 }} />
                  ) : (
                    <div style={{ width:48, height:48, borderRadius:8, background:'#1a1a1a', flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', color:'#333', fontSize:18 }}>📄</div>
                  )}
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontWeight:600, fontSize:14, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{post.title}</div>
                    <div style={{ display:'flex', alignItems:'center', gap:8, marginTop:3 }}>
                      <span style={{ color:'#444', fontSize:11 }}>/{post.slug}</span>
                      {(post.category as any)?.name && <span className="badge badge-a" style={{ fontSize:10 }}>{(post.category as any).name}</span>}
                    </div>
                  </div>
                  <div className="hide-m" style={{ display:'flex', alignItems:'center', gap:10, flexShrink:0 }}>
                    <span className={`badge ${post.status==='published'?'badge-g':'badge-y'}`}>{post.status==='published'?'Publicado':'Borrador'}</span>
                    <span className={`badge ${seoClass}`}>SEO {seoPct}%</span>
                    <span style={{ color:'#444', fontSize:11, width:65, textAlign:'right' }}>{new Date(post.published_at||post.created_at).toLocaleDateString('es',{day:'2-digit',month:'short'})}</span>
                  </div>
                  <button type="button" onClick={e=>{e.preventDefault();e.stopPropagation();del(post.id)}} style={{ background:'none', border:'none', color:'#333', cursor:'pointer', padding:4, flexShrink:0, fontSize:14 }}
                    onMouseEnter={e=>e.currentTarget.style.color='#ef4444'} onMouseLeave={e=>e.currentTarget.style.color='#333'} title="Eliminar">✕</button>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
