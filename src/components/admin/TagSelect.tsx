import { useState, useEffect } from 'react'
import { X, Plus } from 'phosphor-react'

interface TagSelectProps {
  value: string[]
  onChange: (value: string[]) => void
  error?: string
  label?: string
  placeholder?: string
  suggestions?: string[]
}

export function TagSelect({
  value,
  onChange,
  error,
  label,
  placeholder = 'Adicionar tag',
  suggestions = []
}: TagSelectProps) {
  const [input, setInput] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim()) {
      e.preventDefault()
      if (!value.includes(input.trim())) {
        onChange([...value, input.trim()])
      }
      setInput('')
    } else if (e.key === 'Backspace' && !input && value.length > 0) {
      onChange(value.slice(0, -1))
    }
  }

  const handleRemoveTag = (tag: string) => {
    onChange(value.filter(t => t !== tag))
  }

  const handleAddSuggestion = (tag: string) => {
    if (!value.includes(tag)) {
      onChange([...value, tag])
    }
    setInput('')
    setIsOpen(false)
  }

  const filteredSuggestions = suggestions.filter(tag =>
    tag.toLowerCase().includes(input.toLowerCase()) &&
    !value.includes(tag)
  )

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        <div
          className={`
            flex flex-wrap gap-2 p-2 border rounded-lg bg-white
            focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent
            ${error
              ? 'border-red-500 focus-within:ring-red-500'
              : 'border-gray-300'
            }
          `}
        >
          {value.map(tag => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded text-sm"
            >
              {tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={14} />
              </button>
            </span>
          ))}
          <input
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value)
              setIsOpen(true)
            }}
            onFocus={() => setIsOpen(true)}
            onBlur={() => setTimeout(() => setIsOpen(false), 200)}
            onKeyDown={handleKeyDown}
            className="flex-1 min-w-[120px] outline-none text-sm"
            placeholder={value.length === 0 ? placeholder : ''}
          />
        </div>

        {/* Sugestões */}
        {isOpen && input && filteredSuggestions.length > 0 && (
          <div className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg max-h-60 overflow-auto">
            <ul className="py-2">
              {filteredSuggestions.map(tag => (
                <li key={tag}>
                  <button
                    type="button"
                    onClick={() => handleAddSuggestion(tag)}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    <Plus size={16} className="text-gray-400" />
                    <span>{tag}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}

      {/* Sugestões abaixo do input */}
      {value.length === 0 && suggestions.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {suggestions.slice(0, 5).map(tag => (
            <button
              key={tag}
              type="button"
              onClick={() => handleAddSuggestion(tag)}
              className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded text-sm hover:bg-gray-200"
            >
              <Plus size={14} className="text-gray-500" />
              {tag}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// Tags comuns para produtos
export const commonProductTags = [
  'Promoção',
  'Novo',
  'Mais Vendido',
  'Em Destaque',
  'Edição Limitada',
  'Premium',
  'Recomendado',
  'Exclusivo',
  'Importado',
  'Nacional'
] 