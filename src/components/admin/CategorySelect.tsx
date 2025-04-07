import { useState, useEffect } from 'react'
import { CaretDown, Check } from 'phosphor-react'

interface Category {
  id: string
  name: string
}

interface CategorySelectProps {
  value: string
  onChange: (value: string) => void
  error?: string
  label?: string
  placeholder?: string
}

export function CategorySelect({
  value,
  onChange,
  error,
  label,
  placeholder = 'Selecione uma categoria'
}: CategorySelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Aqui você irá buscar as categorias da API
    const fetchCategories = async () => {
      try {
        // Simulando dados
        const data = [
          { id: '1', name: 'Rações' },
          { id: '2', name: 'Acessórios' },
          { id: '3', name: 'Higiene' },
          { id: '4', name: 'Medicamentos' },
          { id: '5', name: 'Brinquedos' },
          { id: '6', name: 'Petiscos' },
        ]
        setCategories(data)
      } catch (error) {
        console.error('Erro ao buscar categorias:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(search.toLowerCase())
  )

  const selectedCategory = categories.find(category => category.id === value)

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`
            relative w-full bg-white pl-3 pr-10 py-2 text-left border rounded-lg
            focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
            ${error
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300'
            }
          `}
        >
          <span className={selectedCategory ? 'text-gray-900' : 'text-gray-500'}>
            {selectedCategory ? selectedCategory.name : placeholder}
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2">
            <CaretDown
              className={`w-5 h-5 text-gray-400 transition-transform ${
                isOpen ? 'transform rotate-180' : ''
              }`}
            />
          </span>
        </button>

        {isOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg max-h-60 overflow-auto">
            <div className="sticky top-0 p-2 bg-white border-b">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Buscar categoria..."
              />
            </div>

            {loading ? (
              <div className="p-4 text-center text-gray-500">
                Carregando...
              </div>
            ) : filteredCategories.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                Nenhuma categoria encontrada
              </div>
            ) : (
              <ul className="py-2">
                {filteredCategories.map(category => (
                  <li key={category.id}>
                    <button
                      type="button"
                      onClick={() => {
                        onChange(category.id)
                        setIsOpen(false)
                        setSearch('')
                      }}
                      className={`
                        w-full flex items-center px-4 py-2 text-sm hover:bg-gray-100
                        ${category.id === value ? 'text-primary' : 'text-gray-900'}
                      `}
                    >
                      <span className="flex-1 text-left">
                        {category.name}
                      </span>
                      {category.id === value && (
                        <Check className="w-5 h-5 ml-2" />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  )
} 