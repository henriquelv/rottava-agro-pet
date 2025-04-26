import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import {
  Bold,
  Italic,
  ListBullets,
  ListNumbers,
  TextHOne,
  TextHTwo,
  Quote,
  ArrowCounterClockwise,
  ArrowClockwise
} from 'lucide-react'

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  error?: string
  label?: string
  placeholder?: string
}

export function RichTextEditor({
  value,
  onChange,
  error,
  label,
  placeholder = 'Digite aqui...'
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder
      })
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    }
  })

  if (!editor) {
    return null
  }

  const tools = [
    {
      icon: TextHOne,
      title: 'Título 1',
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: () => editor.isActive('heading', { level: 1 })
    },
    {
      icon: TextHTwo,
      title: 'Título 2',
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: () => editor.isActive('heading', { level: 2 })
    },
    {
      icon: Bold,
      title: 'Negrito',
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: () => editor.isActive('bold')
    },
    {
      icon: Italic,
      title: 'Itálico',
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: () => editor.isActive('italic')
    },
    {
      icon: ListBullets,
      title: 'Lista com marcadores',
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: () => editor.isActive('bulletList')
    },
    {
      icon: ListNumbers,
      title: 'Lista numerada',
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: () => editor.isActive('orderedList')
    },
    {
      icon: Quote,
      title: 'Citação',
      action: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: () => editor.isActive('blockquote')
    }
  ]

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <div
        className={`
          border rounded-lg overflow-hidden
          focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent
          ${error
            ? 'border-red-500 focus-within:ring-red-500'
            : 'border-gray-300'
          }
        `}
      >
        {/* Barra de ferramentas */}
        <div className="flex items-center gap-1 p-2 border-b bg-gray-50">
          {tools.map((tool, index) => {
            const Icon = tool.icon

            return (
              <button
                key={index}
                onClick={tool.action}
                title={tool.title}
                type="button"
                className={`
                  p-1 rounded hover:bg-gray-200
                  ${tool.isActive() ? 'text-primary bg-primary/10' : 'text-gray-600'}
                `}
              >
                <Icon size={20} />
              </button>
            )
          })}

          <div className="w-px h-6 mx-2 bg-gray-300" />

          <button
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            title="Desfazer"
            type="button"
            className="p-1 rounded text-gray-600 hover:bg-gray-200 disabled:opacity-50"
          >
            <ArrowCounterClockwise size={20} />
          </button>

          <button
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            title="Refazer"
            type="button"
            className="p-1 rounded text-gray-600 hover:bg-gray-200 disabled:opacity-50"
          >
            <ArrowClockwise size={20} />
          </button>
        </div>

        {/* Editor */}
        <EditorContent
          editor={editor}
          className="prose prose-sm max-w-none p-4"
        />
      </div>

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  )
} 