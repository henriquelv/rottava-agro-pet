import { useState, useEffect } from 'react'
import { CaretDown, MagnifyingGlass, X } from 'phosphor-react'

interface Category {
  id: string
  name: string
  parent?: string
}

interface MultiCategorySelectProps {
  value: string[]
  onChange: (value: string[]) => void
  error?: string
  label?: string
  placeholder?: string
}

export function MultiCategorySelect({
  value,
  onChange,
  error,
  label,
  placeholder = 'Selecione as categorias'
}: MultiCategorySelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Simula busca de categorias
    setLoading(true)
    setTimeout(() => {
      setCategories([
        { id: '1', name: 'Rações' },
        { id: '2', name: 'Rações para Cães', parent: '1' },
        { id: '3', name: 'Rações para Gatos', parent: '1' },
        { id: '4', name: 'Acessórios' },
        { id: '5', name: 'Coleiras', parent: '4' },
        { id: '6', name: 'Brinquedos', parent: '4' },
        { id: '7', name: 'Medicamentos' },
        { id: '8', name: 'Vermífugos', parent: '7' },
        { id: '9', name: 'Antipulgas', parent: '7' }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(search.toLowerCase())
  )

  const selectedCategories = categories.filter(c => value.includes(c.id))

  const getParentName = (parentId?: string) => {
    if (!parentId) return null
    const parent = categories.find(c => c.id === parentId)
    return parent ? parent.name : null
  }

  const handleSelect = (categoryId: string) => {
    if (value.includes(categoryId)) {
      onChange(value.filter(id => id !== categoryId))
    } else {
      onChange([...value, categoryId])
    }
  }

  const handleRemove = (categoryId: string) => {
    onChange(value.filter(id => id !== categoryId))
  }

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}

      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`
            w-full px-3 py-2 text-left border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
            ${error ? 'border-red-500' : 'border-gray-300'}
            ${isOpen ? 'ring-2 ring-primary border-transparent' : ''}
          `}
        >
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-1">
              {selectedCategories.length === 0 ? (
                <span className="text-gray-500">{placeholder}</span>
              ) : (
                selectedCategories.map(category => (
                  <div
                    key={category.id}
                    className="inline-flex items-center gap-1 px-2 py-1 text-sm bg-primary/10 text-primary rounded"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleRemove(category.id)
                    }}
                  >
                    {category.name}
                    <X size={14} className="cursor-pointer" />
                  </div>
                ))
              )}
            </div>
            <CaretDown
              size={16}
              className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            />
          </div>
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg">
            <div className="p-2 border-b">
              <div className="relative">
                <MagnifyingGlass size={20} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar categorias..."
                  className="w-full pl-8 pr-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>

            <div className="max-h-60 overflow-auto">
              {loading ? (
                <div className="p-4 text-center text-gray-500">
                  Carregando...
                </div>
              ) : filteredCategories.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  Nenhuma categoria encontrada
                </div>
              ) : (
                <div className="py-1">
                  {filteredCategories.map((category) => {
                    const parentName = getParentName(category.parent)
                    const isSelected = value.includes(category.id)

                    return (
                      <button
                        key={category.id}
                        type="button"
                        onClick={() => handleSelect(category.id)}
                        className={`
                          w-full px-4 py-2 text-left hover:bg-gray-100
                          ${isSelected ? 'bg-primary/5 text-primary' : ''}
                        `}
                      >
                        <div className="font-medium">
                          {category.name}
                        </div>
                        {parentName && (
                          <div className="text-sm text-gray-500">
                            {parentName}
                          </div>
                        )}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  )
} 