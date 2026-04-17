'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TiptapImage from '@tiptap/extension-image'
import TiptapLink from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import Youtube from '@tiptap/extension-youtube'
import { useCallback } from 'react'
import { createBrowserClient } from '@/lib/supabase/client'

interface TipTapEditorProps {
  content: string
  onChange: (html: string) => void
}

export default function TipTapEditor({ content, onChange }: TipTapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] },
      }),
      TiptapImage.configure({ inline: false, allowBase64: false }),
      TiptapLink.configure({ openOnClick: false, HTMLAttributes: { rel: 'noopener noreferrer' } }),
      Placeholder.configure({ placeholder: 'Escribe el contenido del post...' }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Underline,
      Youtube.configure({ width: 640, height: 360 }),
    ],
    content,
    editorProps: {
      attributes: {
        class: 'prose-editor focus:outline-none min-h-[400px] px-6 py-4',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  const addImage = useCallback(async () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file || !editor) return

      const supabase = createBrowserClient()
      const ext = file.name.split('.').pop()
      const filename = `${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`

      const { data, error } = await supabase.storage
        .from('blog-images')
        .upload(filename, file, { contentType: file.type })

      if (error) {
        alert('Error al subir imagen: ' + error.message)
        return
      }

      const { data: { publicUrl } } = supabase.storage
        .from('blog-images')
        .getPublicUrl(filename)

      editor.chain().focus().setImage({ src: publicUrl, alt: file.name.replace(/\.[^.]+$/, '') }).run()
    }
    input.click()
  }, [editor])

  const addYoutube = useCallback(() => {
    const url = prompt('URL del video de YouTube:')
    if (url && editor) {
      editor.commands.setYoutubeVideo({ src: url })
    }
  }, [editor])

  const addLink = useCallback(() => {
    if (!editor) return
    const url = prompt('URL del enlace:', 'https://')
    if (url) {
      editor.chain().focus().setLink({ href: url }).run()
    }
  }, [editor])

  if (!editor) return null

  return (
    <div className="border border-white/10 rounded-xl overflow-hidden bg-white/[0.02]">
      {/* Toolbar */}
      <div className="border-b border-white/10 px-3 py-2 flex flex-wrap gap-1">
        <ToolGroup>
          <ToolBtn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })} title="H2">
            H2
          </ToolBtn>
          <ToolBtn onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })} title="H3">
            H3
          </ToolBtn>
          <ToolBtn onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()} active={editor.isActive('heading', { level: 4 })} title="H4">
            H4
          </ToolBtn>
        </ToolGroup>

        <div className="w-px bg-white/10 mx-1" />

        <ToolGroup>
          <ToolBtn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} title="Negrita">
            <strong>B</strong>
          </ToolBtn>
          <ToolBtn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} title="Cursiva">
            <em>I</em>
          </ToolBtn>
          <ToolBtn onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive('underline')} title="Subrayado">
            <u>U</u>
          </ToolBtn>
          <ToolBtn onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive('strike')} title="Tachado">
            <s>S</s>
          </ToolBtn>
        </ToolGroup>

        <div className="w-px bg-white/10 mx-1" />

        <ToolGroup>
          <ToolBtn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} title="Lista">
            • Lista
          </ToolBtn>
          <ToolBtn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} title="Lista numerada">
            1. Lista
          </ToolBtn>
          <ToolBtn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')} title="Cita">
            " Cita
          </ToolBtn>
          <ToolBtn onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive('codeBlock')} title="Código">
            {'</>'}
          </ToolBtn>
        </ToolGroup>

        <div className="w-px bg-white/10 mx-1" />

        <ToolGroup>
          <ToolBtn onClick={() => editor.chain().focus().setTextAlign('left').run()} active={editor.isActive({ textAlign: 'left' })} title="Izquierda">
            ←
          </ToolBtn>
          <ToolBtn onClick={() => editor.chain().focus().setTextAlign('center').run()} active={editor.isActive({ textAlign: 'center' })} title="Centro">
            ↔
          </ToolBtn>
          <ToolBtn onClick={() => editor.chain().focus().setTextAlign('right').run()} active={editor.isActive({ textAlign: 'right' })} title="Derecha">
            →
          </ToolBtn>
        </ToolGroup>

        <div className="w-px bg-white/10 mx-1" />

        <ToolGroup>
          <ToolBtn onClick={addLink} active={editor.isActive('link')} title="Enlace">
            🔗
          </ToolBtn>
          <ToolBtn onClick={addImage} active={false} title="Imagen">
            🖼
          </ToolBtn>
          <ToolBtn onClick={addYoutube} active={false} title="YouTube">
            ▶
          </ToolBtn>
        </ToolGroup>

        <div className="w-px bg-white/10 mx-1" />

        <ToolGroup>
          <ToolBtn onClick={() => editor.chain().focus().setHorizontalRule().run()} active={false} title="Separador">
            ─
          </ToolBtn>
          <ToolBtn onClick={() => editor.chain().focus().undo().run()} active={false} title="Deshacer">
            ↩
          </ToolBtn>
          <ToolBtn onClick={() => editor.chain().focus().redo().run()} active={false} title="Rehacer">
            ↪
          </ToolBtn>
        </ToolGroup>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />

      {/* Editor Styles */}
      <style jsx global>{`
        .prose-editor {
          color: white;
          font-size: 1rem;
          line-height: 1.8;
        }
        .prose-editor h2 { font-size: 1.5rem; font-weight: 700; margin: 1.5rem 0 0.5rem; color: white; }
        .prose-editor h3 { font-size: 1.25rem; font-weight: 700; margin: 1.2rem 0 0.5rem; color: white; }
        .prose-editor h4 { font-size: 1.1rem; font-weight: 600; margin: 1rem 0 0.5rem; color: white; }
        .prose-editor p { margin-bottom: 1rem; }
        .prose-editor a { color: #E91E63; text-decoration: underline; }
        .prose-editor ul, .prose-editor ol { padding-left: 1.5rem; margin-bottom: 1rem; }
        .prose-editor li { margin-bottom: 0.25rem; }
        .prose-editor ul li::marker { color: #A21F8A; }
        .prose-editor ol li::marker { color: #A21F8A; font-weight: 700; }
        .prose-editor blockquote { border-left: 3px solid #A21F8A; padding-left: 1rem; margin: 1rem 0; color: rgba(255,255,255,0.6); font-style: italic; }
        .prose-editor img { border-radius: 12px; max-width: 100%; margin: 1rem 0; }
        .prose-editor pre { background: rgba(162,31,138,0.1); border: 1px solid rgba(162,31,138,0.2); border-radius: 8px; padding: 1rem; overflow-x: auto; }
        .prose-editor code { background: rgba(162,31,138,0.1); padding: 0.1em 0.3em; border-radius: 4px; font-size: 0.9em; color: #E91E63; }
        .prose-editor hr { border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 2rem 0; }
        .prose-editor .ProseMirror-placeholder::before { color: rgba(255,255,255,0.2); pointer-events: none; float: left; height: 0; }
        .prose-editor iframe { border-radius: 12px; margin: 1rem 0; max-width: 100%; }
      `}</style>
    </div>
  )
}

function ToolGroup({ children }: { children: React.ReactNode }) {
  return <div className="flex gap-0.5">{children}</div>
}

function ToolBtn({ onClick, active, title, children }: { onClick: () => void; active: boolean; title: string; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`px-2 py-1 rounded text-xs transition-colors ${
        active ? 'bg-[#E91E63]/30 text-white' : 'text-white/50 hover:text-white hover:bg-white/10'
      }`}
    >
      {children}
    </button>
  )
}
