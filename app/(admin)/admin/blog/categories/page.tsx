'use client'
import { useEffect, useState } from 'react'
import { createBrowserClient } from '@/lib/supabase/client'
import type { BlogCategory } from '@/lib/supabase/types'

function slugify(t:string){return t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}

export default function CategoriesPage() {
  const [cats, setCats] = useState<BlogCategory[]>([])
  const [name, setName] = useState('')
  const [locale, setLocale] = useState<'es'|'en'>('es')
  const [busy, setBusy] = useState(false)

  const load = async()=>{const{data}=await createBrowserClient().from('blog_categories').select('*').order('name');setCats(data||[])}
  useEffect(()=>{load()},[])

  const add = async()=>{if(!name.trim())return;setBusy(true);await(createBrowserClient()as any).from('blog_categories').insert({name,slug:slugify(name),locale});setName('');load();setBusy(false)}
  const del = async(id:string)=>{if(!confirm('¿Eliminar?'))return;await(createBrowserClient()as any).from('blog_categories').delete().eq('id',id);load()}

  return (
    <div>
      <h1 style={{fontSize:22,fontWeight:700,marginBottom:24}}>Categorías</h1>
      <div className="card" style={{padding:20,marginBottom:28}}>
        <div style={{fontSize:13,fontWeight:600,marginBottom:12,color:'#888'}}>Nueva categoría</div>
        <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
          <input className="input" value={name} onChange={e=>setName(e.target.value)} placeholder="Nombre" onKeyDown={e=>e.key==='Enter'&&add()} style={{flex:1,minWidth:200}}/>
          <select className="input" value={locale} onChange={e=>setLocale(e.target.value as any)} title="Idioma" style={{width:80}}>
            <option value="es">ES</option><option value="en">EN</option>
          </select>
          <button type="button" className="btn btn-primary" onClick={add} disabled={busy||!name.trim()}>Agregar</button>
        </div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:16}}>
        {['es','en'].map(lang=>{
          const c=cats.filter(x=>x.locale===lang)
          return(
            <div key={lang} className="card">
              <div style={{padding:'12px 16px',borderBottom:'1px solid #222',display:'flex',justifyContent:'space-between'}}>
                <span style={{fontSize:13,fontWeight:600,color:'#888'}}>{lang==='es'?'Español':'English'}</span>
                <span style={{fontSize:12,color:'#444'}}>{c.length}</span>
              </div>
              {c.length===0?<div style={{padding:'32px 16px',textAlign:'center',color:'#444',fontSize:13}}>Sin categorías</div>:c.map(x=>(
                <div key={x.id} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'10px 16px',borderBottom:'1px solid #1a1a1a',transition:'background .1s'}}
                  onMouseEnter={e=>e.currentTarget.style.background='#1a1a1a'} onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                  <div><span style={{fontSize:13,fontWeight:500}}>{x.name}</span><span style={{color:'#444',fontSize:11,marginLeft:8}}>/{x.slug}</span></div>
                  <button type="button" onClick={()=>del(x.id)} style={{background:'none',border:'none',color:'#444',fontSize:11,cursor:'pointer'}}
                    onMouseEnter={e=>e.currentTarget.style.color='#ef4444'} onMouseLeave={e=>e.currentTarget.style.color='#444'}>Eliminar</button>
                </div>
              ))}
            </div>
          )
        })}
      </div>
    </div>
  )
}
