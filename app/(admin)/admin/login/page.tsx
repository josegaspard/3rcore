'use client'
import { useState } from 'react'
import { createBrowserClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handle = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setError('')
    const { error } = await createBrowserClient().auth.signInWithPassword({ email, password })
    if (error) { setError('Email o contraseña incorrectos'); setLoading(false); return }
    router.push('/admin/blog')
  }

  return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', padding:20 }}>
      <div className="fade-up" style={{ width:'100%', maxWidth:380 }}>
        <div style={{ textAlign:'center', marginBottom:40 }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:10, marginBottom:8 }}>
            <div style={{ width:36, height:36, background:'linear-gradient(135deg,#7c3aed,#ec4899)', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, fontWeight:800, color:'white' }}>3R</div>
            <span style={{ fontSize:20, fontWeight:700 }}>Core CMS</span>
          </div>
          <p style={{ color:'#555', fontSize:13 }}>Panel de administración del blog</p>
        </div>
        <div className="card" style={{ padding:32 }}>
          <form onSubmit={handle}>
            <div style={{ marginBottom:20 }}>
              <label className="label" style={{ display:'block', fontSize:12, fontWeight:500, color:'#888', marginBottom:6 }}>Email</label>
              <input className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)} required autoFocus placeholder="pieroque@3rcore.com" />
            </div>
            <div style={{ marginBottom:24 }}>
              <label className="label" style={{ display:'block', fontSize:12, fontWeight:500, color:'#888', marginBottom:6 }}>Contraseña</label>
              <input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} required placeholder="••••••••" />
            </div>
            {error && <div style={{ background:'rgba(239,68,68,.08)', border:'1px solid rgba(239,68,68,.2)', borderRadius:10, padding:'10px 14px', color:'#ef4444', fontSize:13, marginBottom:16 }}>{error}</div>}
            <button type="submit" className="btn btn-primary" disabled={loading} style={{ width:'100%', padding:'12px 0', fontSize:14 }}>
              {loading ? 'Ingresando...' : 'Iniciar sesión'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
