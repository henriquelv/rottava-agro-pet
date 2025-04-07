import { useState, useEffect } from 'react'
import { CaretDown, MagnifyingGlass } from 'phosphor-react'

interface Supplier {
  id: string
  name: string
  cnpj: string
  email: string
  phone: string
}

interface SupplierSelectProps {
  value?: string
  onChange: (value: string) => void
  error?: string
  label?: string
  placeholder?: string
}

export function SupplierSelect({
  value,
  onChange,
  error,
  label,
  placeholder = 'Selecione um fornecedor'
}: SupplierSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [suppliers, setSuppliers] = useState<Supplier[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Simula busca de fornecedores
    setLoading(true)
    setTimeout(() => {
      setSuppliers([
        {
          id: '1',
          name: 'Fornecedor 1',
          cnpj: '12.345.678/0001-90',
          email: 'contato@fornecedor1.com.br',
          phone: '(11) 99999-9999'
        },
        {
          id: '2', 
          name: 'Fornecedor 2',
          cnpj: '98.765.432/0001-10',
          email: 'contato@fornecedor2.com.br',
          phone: '(11) 88888-8888'
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(search.toLowerCase()) ||
    supplier.cnpj.includes(search) ||
    supplier.email.toLowerCase().includes(search.toLowerCase()) ||
    supplier.phone.includes(search)
  )

  const selectedSupplier = suppliers.find(s => s.id === value)

  return (
    <div className="relative">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}

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
          <span className={selectedSupplier ? 'text-gray-900' : 'text-gray-500'}>
            {selectedSupplier ? selectedSupplier.name : placeholder}
          </span>
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
                placeholder="Buscar fornecedor..."
                className="w-full pl-8 pr-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          <div className="max-h-60 overflow-auto">
            {loading ? (
              <div className="p-4 text-center text-gray-500">
                Carregando...
              </div>
            ) : filteredSuppliers.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                Nenhum fornecedor encontrado
              </div>
            ) : (
              <div className="py-1">
                {filteredSuppliers.map((supplier) => (
                  <button
                    key={supplier.id}
                    type="button"
                    onClick={() => {
                      onChange(supplier.id)
                      setIsOpen(false)
                      setSearch('')
                    }}
                    className={`
                      w-full px-4 py-2 text-left hover:bg-gray-100
                      ${value === supplier.id ? 'bg-primary/5 text-primary' : ''}
                    `}
                  >
                    <div className="font-medium">
                      {supplier.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {supplier.cnpj} • {supplier.email} • {supplier.phone}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  )
} 