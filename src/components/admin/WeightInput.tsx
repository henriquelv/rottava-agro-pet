import { useState } from 'react'

interface WeightInputProps {
  value: string
  onChange: (value: string) => void
  error?: string
  label?: string
}

export function WeightInput({
  value,
  onChange,
  error,
  label
}: WeightInputProps) {
  const [amount, setAmount] = useState(() => {
    const match = value.match(/^(\d+(?:\.\d+)?)\s*(g|kg|ml|L)$/)
    return match ? match[1] : ''
  })

  const [unit, setUnit] = useState(() => {
    const match = value.match(/^(\d+(?:\.\d+)?)\s*(g|kg|ml|L)$/)
    return match ? match[2] : 'g'
  })

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = e.target.value
    setAmount(newAmount)
    if (newAmount) {
      onChange(`${newAmount}${unit}`)
    } else {
      onChange('')
    }
  }

  const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newUnit = e.target.value
    setUnit(newUnit)
    if (amount) {
      onChange(`${amount}${newUnit}`)
    }
  }

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="flex gap-2">
        <input
          type="number"
          value={amount}
          onChange={handleAmountChange}
          min="0"
          step="0.1"
          className={`
            block flex-1 px-3 py-2 border rounded-lg
            focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
            ${error
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300'
            }
          `}
          placeholder="0"
        />
        <select
          value={unit}
          onChange={handleUnitChange}
          className={`
            block w-24 px-3 py-2 border rounded-lg appearance-none bg-white
            focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
            ${error
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300'
            }
          `}
        >
          <option value="g">g</option>
          <option value="kg">kg</option>
          <option value="ml">ml</option>
          <option value="L">L</option>
        </select>
      </div>

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  )
}

// Função auxiliar para formatar o peso/volume
export function formatWeight(value: string): string {
  const match = value.match(/^(\d+(?:\.\d+)?)\s*(g|kg|ml|L)$/)
  if (!match) return value

  const [, amount, unit] = match
  const numAmount = parseFloat(amount)

  if (unit === 'g' && numAmount >= 1000) {
    return `${(numAmount / 1000).toFixed(1)}kg`
  }

  if (unit === 'ml' && numAmount >= 1000) {
    return `${(numAmount / 1000).toFixed(1)}L`
  }

  return value
}

// Função auxiliar para converter peso/volume
export function convertWeight(value: string, targetUnit: 'g' | 'kg' | 'ml' | 'L'): string {
  const match = value.match(/^(\d+(?:\.\d+)?)\s*(g|kg|ml|L)$/)
  if (!match) return value

  const [, amount, unit] = match
  const numAmount = parseFloat(amount)

  if (unit === targetUnit) return value

  switch (`${unit}-${targetUnit}`) {
    case 'g-kg':
      return `${(numAmount / 1000).toFixed(3)}kg`
    case 'kg-g':
      return `${(numAmount * 1000).toFixed(0)}g`
    case 'ml-L':
      return `${(numAmount / 1000).toFixed(3)}L`
    case 'L-ml':
      return `${(numAmount * 1000).toFixed(0)}ml`
    default:
      return value
  }
} 