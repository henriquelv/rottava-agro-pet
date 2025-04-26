import { useState } from 'react'
import { MagnifyingGlass, FunnelSimple, X } from 'lucide-react'

interface FilterField {
  name: string
  label: string
  type: 'text' | 'select' | 'number' | 'date'
  options?: Array<{
    value: string | number
    label: string
  }>
}

interface FilterProps {
  fields: FilterField[]
  onFilter: (filters: Record<string, any>) => void
  onClear: () => void
}

export function Filter({ fields, onFilter, onClear }: FilterProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [filters, setFilters] = useState<Record<string, any>>({})
  const [search, setSearch] = useState('')

  const handleFilter = () => {
    onFilter({ ...filters, search })
    setIsOpen(false)
  }

  const handleClear = () => {
    setFilters({})
    setSearch('')
    onClear()
    setIsOpen(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        {/* Busca */}
        <div className="flex-1">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlass className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleFilter()}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Buscar..."
            />
          </div>
        </div>

        {/* Botão de Filtros */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-lg border
            ${isOpen
              ? 'bg-primary text-white border-transparent'
              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }
          `}
        >
          <FunnelSimple size={20} />
          Filtros
        </button>
      </div>

      {/* Painel de Filtros */}
      {isOpen && (
        <div className="bg-white rounded-lg shadow p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {fields.map(field => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {field.label}
                </label>

                {field.type === 'select' ? (
                  <select
                    value={filters[field.name] || ''}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      [field.name]: e.target.value
                    }))}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Todos</option>
                    {field.options?.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    value={filters[field.name] || ''}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      [field.name]: e.target.value
                    }))}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-end gap-4">
            <button
              onClick={handleClear}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} />
              Limpar
            </button>
            <button
              onClick={handleFilter}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              <FunnelSimple size={20} />
              Aplicar Filtros
            </button>
          </div>
        </div>
      )}
    </div>
  )
} 