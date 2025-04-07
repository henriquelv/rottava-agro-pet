import { forwardRef } from 'react'
import ReactInputMask from 'react-input-mask'

interface MaskedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  mask: string
  maskChar?: string
  formatChars?: {
    [key: string]: string
  }
  alwaysShowMask?: boolean
  beforeMaskedStateChange?: (state: any) => any
  error?: string
  label?: string
}

export const MaskedInput = forwardRef<HTMLInputElement, MaskedInputProps>(
  ({ mask, maskChar = '_', formatChars, alwaysShowMask = false, beforeMaskedStateChange, error, label, className = '', ...props }, ref) => {
    return (
      <div className="space-y-1">
        {label && (
          <label className="block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <ReactInputMask
          mask={mask}
          maskChar={maskChar}
          formatChars={formatChars}
          alwaysShowMask={alwaysShowMask}
          beforeMaskedStateChange={beforeMaskedStateChange}
          {...props}
          className={`
            block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
            ${error
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300'
            }
            ${className}
          `}
        />
        {error && (
          <p className="text-sm text-red-500">
            {error}
          </p>
        )}
      </div>
    )
  }
)

MaskedInput.displayName = 'MaskedInput'

// Máscaras comuns
export const masks = {
  cpf: '999.999.999-99',
  cnpj: '99.999.999/9999-99',
  phone: '(99) 99999-9999',
  cep: '99999-999',
  date: '99/99/9999',
  time: '99:99',
  creditCard: '9999 9999 9999 9999',
  money: 'R$ 999.999.999,99'
} 