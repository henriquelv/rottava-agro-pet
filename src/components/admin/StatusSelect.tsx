import { CaretDown } from 'phosphor-react'

interface Status {
  value: string
  label: string
  color: string
  bgColor: string
}

interface StatusSelectProps {
  value: string
  onChange: (value: string) => void
  options: Status[]
  error?: string
  label?: string
  placeholder?: string
}

export function StatusSelect({
  value,
  onChange,
  options,
  error,
  label,
  placeholder = 'Selecione um status'
}: StatusSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const selectedStatus = options.find(status => status.value === value)

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
          {selectedStatus ? (
            <span className="inline-flex items-center">
              <span
                className={`
                  inline-block w-2 h-2 rounded-full mr-2
                  ${selectedStatus.bgColor}
                `}
              />
              <span className={selectedStatus.color}>
                {selectedStatus.label}
              </span>
            </span>
          ) : (
            <span className="text-gray-500">
              {placeholder}
            </span>
          )}
          <span className="absolute inset-y-0 right-0 flex items-center pr-2">
            <CaretDown
              className={`w-5 h-5 text-gray-400 transition-transform ${
                isOpen ? 'transform rotate-180' : ''
              }`}
            />
          </span>
        </button>

        {isOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg">
            <ul className="py-2">
              {options.map(status => (
                <li key={status.value}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(status.value)
                      setIsOpen(false)
                    }}
                    className="w-full flex items-center px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    <span
                      className={`
                        inline-block w-2 h-2 rounded-full mr-2
                        ${status.bgColor}
                      `}
                    />
                    <span className={status.color}>
                      {status.label}
                    </span>
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
    </div>
  )
}

// Status padrão para produtos
export const productStatuses: Status[] = [
  {
    value: 'active',
    label: 'Ativo',
    color: 'text-green-700',
    bgColor: 'bg-green-500'
  },
  {
    value: 'inactive',
    label: 'Inativo',
    color: 'text-gray-700',
    bgColor: 'bg-gray-500'
  },
  {
    value: 'out_of_stock',
    label: 'Sem Estoque',
    color: 'text-red-700',
    bgColor: 'bg-red-500'
  },
  {
    value: 'draft',
    label: 'Rascunho',
    color: 'text-yellow-700',
    bgColor: 'bg-yellow-500'
  }
]

// Status padrão para pedidos
export const orderStatuses: Status[] = [
  {
    value: 'pending',
    label: 'Pendente',
    color: 'text-yellow-700',
    bgColor: 'bg-yellow-500'
  },
  {
    value: 'processing',
    label: 'Em Processamento',
    color: 'text-blue-700',
    bgColor: 'bg-blue-500'
  },
  {
    value: 'shipped',
    label: 'Enviado',
    color: 'text-purple-700',
    bgColor: 'bg-purple-500'
  },
  {
    value: 'delivered',
    label: 'Entregue',
    color: 'text-green-700',
    bgColor: 'bg-green-500'
  },
  {
    value: 'cancelled',
    label: 'Cancelado',
    color: 'text-red-700',
    bgColor: 'bg-red-500'
  }
] 