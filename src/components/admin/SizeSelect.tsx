import { useState } from 'react'
import { Plus, X } from 'phosphor-react'

interface Size {
  value: string
  label: string
  order: number
}

interface SizeSelectProps {
  value: Size[]
  onChange: (sizes: Size[]) => void
  error?: string
  label?: string
  presetSizes?: Size[]
}

export function SizeSelect({
  value = [],
  onChange,
  error,
  label,
  presetSizes = [
    // Roupas
    { value: 'PP', label: 'PP', order: 1 },
    { value: 'P', label: 'P', order: 2 },
    { value: 'M', label: 'M', order: 3 },
    { value: 'G', label: 'G', order: 4 },
    { value: 'GG', label: 'GG', order: 5 },
    { value: 'XG', label: 'XG', order: 6 },
    // Calçados
    { value: '34', label: '34', order: 7 },
    { value: '35', label: '35', order: 8 },
    { value: '36', label: '36', order: 9 },
    { value: '37', label: '37', order: 10 },
    { value: '38', label: '38', order: 11 },
    { value: '39', label: '39', order: 12 },
    { value: '40', label: '40', order: 13 },
    { value: '41', label: '41', order: 14 },
    { value: '42', label: '42', order: 15 },
    // Coleiras
    { value: 'P-COLEIRA', label: 'P (30-40cm)', order: 16 },
    { value: 'M-COLEIRA', label: 'M (40-50cm)', order: 17 },
    { value: 'G-COLEIRA', label: 'G (50-60cm)', order: 18 },
    // Roupas Pet
    { value: 'PP-PET', label: 'PP (20-25cm)', order: 19 },
    { value: 'P-PET', label: 'P (25-30cm)', order: 20 },
    { value: 'M-PET', label: 'M (30-35cm)', order: 21 },
    { value: 'G-PET', label: 'G (35-40cm)', order: 22 },
    { value: 'GG-PET', label: 'GG (40-45cm)', order: 23 }
  ]
}: SizeSelectProps) {
  const [customSize, setCustomSize] = useState('')
  const [customLabel, setCustomLabel] = useState('')

  const handleToggleSize = (size: Size) => {
    const exists = value.find(s => s.value === size.value)
    if (exists) {
      onChange(value.filter(s => s.value !== size.value))
    } else {
      onChange([...value, size].sort((a, b) => a.order - b.order))
    }
  }

  const handleAddCustomSize = () => {
    if (customSize && customLabel) {
      const newSize = {
        value: customSize,
        label: customLabel,
        order: presetSizes.length + value.length + 1
      }
      onChange([...value, newSize].sort((a, b) => a.order - b.order))
      setCustomSize('')
      setCustomLabel('')
    }
  }

  const handleRemoveSize = (sizeValue: string) => {
    onChange(value.filter(s => s.value !== sizeValue))
  }

  // Agrupa os tamanhos por categoria
  const groupedSizes = presetSizes.reduce((groups, size) => {
    let category = 'Outros'
    if (size.value.includes('COLEIRA')) category = 'Coleiras'
    else if (size.value.includes('PET')) category = 'Roupas Pet'
    else if (/^\d+$/.test(size.value)) category = 'Calçados'
    else if (['PP', 'P', 'M', 'G', 'GG', 'XG'].includes(size.value)) category = 'Roupas'

    return {
      ...groups,
      [category]: [...(groups[category] || []), size]
    }
  }, {} as Record<string, Size[]>)

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}

      {/* Tamanhos selecionados */}
      <div className="flex flex-wrap gap-2 mb-4">
        {value.map((size) => (
          <div
            key={size.value}
            className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-lg"
          >
            <span>{size.label}</span>
            <button
              type="button"
              onClick={() => handleRemoveSize(size.value)}
              className="p-0.5 rounded-full hover:bg-primary/20"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>

      {/* Tamanhos predefinidos agrupados */}
      <div className="space-y-4">
        {Object.entries(groupedSizes).map(([category, sizes]) => (
          <div key={category}>
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              {category}
            </h4>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => {
                const isSelected = value.some(s => s.value === size.value)
                return (
                  <button
                    key={size.value}
                    type="button"
                    onClick={() => handleToggleSize(size)}
                    className={`
                      px-3 py-1 text-sm rounded-lg border transition-colors
                      ${isSelected
                        ? 'bg-primary text-white border-primary'
                        : 'border-gray-300 hover:border-primary hover:text-primary'
                      }
                    `}
                  >
                    {size.label}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Adicionar tamanho personalizado */}
      <div className="mt-4 p-4 border rounded-lg space-y-4">
        <h4 className="text-sm font-medium text-gray-700">
          Adicionar tamanho personalizado
        </h4>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            value={customSize}
            onChange={(e) => setCustomSize(e.target.value)}
            placeholder="Valor (ex: XGG)"
            className="px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <input
            type="text"
            value={customLabel}
            onChange={(e) => setCustomLabel(e.target.value)}
            placeholder="Rótulo (ex: Extra Extra Grande)"
            className="px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        <button
          type="button"
          onClick={handleAddCustomSize}
          disabled={!customSize || !customLabel}
          className="flex items-center justify-center w-full gap-2 px-4 py-2 text-sm text-white bg-primary rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus size={16} />
          Adicionar Tamanho
        </button>
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  )
} 