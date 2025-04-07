import { forwardRef } from 'react'
import CurrencyInput from 'react-currency-input-field'

interface PriceInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: number | undefined
  onChange: (value: number | undefined) => void
  error?: string
  label?: string
}

export const PriceInput = forwardRef<HTMLInputElement, PriceInputProps>(
  ({ value, onChange, error, label, className = '', ...props }, ref) => {
    return (
      <div className="space-y-1">
        {label && (
          <label className="block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500">R$</span>
          </div>
          <CurrencyInput
            ref={ref as any}
            value={value}
            onValueChange={(value) => onChange(value ? Number(value) : undefined)}
            decimalScale={2}
            decimalSeparator=","
            groupSeparator="."
            prefix=""
            {...props}
            className={`
              block w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
              ${error
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300'
              }
              ${className}
            `}
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
)

PriceInput.displayName = 'PriceInput' 