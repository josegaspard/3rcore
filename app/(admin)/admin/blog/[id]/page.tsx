'use client'

import { useEffect, useState } from 'react'
import { createBrowserClient } from '@/lib/supabase/client'
import type { BlogPost } from '@/lib/supabase/types'
import PostEditor from '@/components/admin/PostEditor'
import { useParams } from 'next/navigation'

export default function EditPost() {
  const params = useParams()
  const id = params.id as string
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createBrowserClient()
    supabase.from('blog_posts').select('*').eq('id', id).single()
      .then(({ data }) => { setPost(data); setLoading(false) })
  }, [id])

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin w-8 h-8 border-2 border-[#E91E63] border-t-transparent rounded-full" />
      </div>
    )
  }

  if (!post) return <p className="text-white/40 text-center py-20">Post no encontrado</p>

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-wide mb-8">Editar Post</h1>
      <PostEditor post={post} />
    </div>
  )
}
