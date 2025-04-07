import { useState, useEffect } from 'react'
import { CaretDown, Check } from 'phosphor-react'

interface Brand {
  id: string
  name: string
  logo?: string
}

interface BrandSelectProps {
  value: string
  onChange: (value: string) => void
  error?: string
  label?: string
  placeholder?: string
}

export function BrandSelect({
  value,
  onChange,
  error,
  label,
  placeholder = 'Selecione uma marca'
}: BrandSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [brands, setBrands] = useState<Brand[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Aqui você irá buscar as marcas da API
    const fetchBrands = async () => {
      try {
        // Simulando dados
        const data = [
          { id: '1', name: 'Royal Canin', logo: '/brands/royal-canin.png' },
          { id: '2', name: 'Premier', logo: '/brands/premier.png' },
          { id: '3', name: 'Pro Plan', logo: '/brands/pro-plan.png' },
          { id: '4', name: 'Hills', logo: '/brands/hills.png' },
          { id: '5', name: 'Pedigree', logo: '/brands/pedigree.png' },
          { id: '6', name: 'Whiskas', logo: '/brands/whiskas.png' },
        ]
        setBrands(data)
      } catch (error) {
        console.error('Erro ao buscar marcas:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBrands()
  }, [])

  const filteredBrands = brands.filter(brand =>
    brand.name.toLowerCase().includes(search.toLowerCase())
  )

  const selectedBrand = brands.find(brand => brand.id === value)

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
          <span className={selectedBrand ? 'text-gray-900' : 'text-gray-500'}>
            {selectedBrand ? selectedBrand.name : placeholder}
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
                placeholder="Buscar marca..."
              />
            </div>

            {loading ? (
              <div className="p-4 text-center text-gray-500">
                Carregando...
              </div>
            ) : filteredBrands.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                Nenhuma marca encontrada
              </div>
            ) : (
              <ul className="py-2">
                {filteredBrands.map(brand => (
                  <li key={brand.id}>
                    <button
                      type="button"
                      onClick={() => {
                        onChange(brand.id)
                        setIsOpen(false)
                        setSearch('')
                      }}
                      className={`
                        w-full flex items-center px-4 py-2 text-sm hover:bg-gray-100
                        ${brand.id === value ? 'text-primary' : 'text-gray-900'}
                      `}
                    >
                      {brand.logo && (
                        <img
                          src={brand.logo}
                          alt={brand.name}
                          className="w-6 h-6 object-contain mr-2"
                        />
                      )}
                      <span className="flex-1 text-left">
                        {brand.name}
                      </span>
                      {brand.id === value && (
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