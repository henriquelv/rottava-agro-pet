import { useState, useEffect, useRef } from 'react'
import { CaretDown } from 'lucide-react'

interface ColorPickerProps {
  value?: string
  onChange: (color: string) => void
  error?: string
  label?: string
  placeholder?: string
  presetColors?: string[]
}

export function ColorPicker({
  value = '#000000',
  onChange,
  error,
  label,
  placeholder = 'Selecione uma cor',
  presetColors = [
    '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF',
    '#FFFF00', '#FF00FF', '#00FFFF', '#808080', '#800000',
    '#808000', '#008000', '#800080', '#008080', '#000080',
    '#FFA500', '#FFC0CB', '#800000', '#FF6B6B', '#4ECDC4'
  ]
}: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState(value)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    setInputValue(value)
  }, [value])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInputValue(newValue)

    // Valida se é uma cor hexadecimal válida
    if (/^#[0-9A-F]{6}$/i.test(newValue)) {
      onChange(newValue)
    }
  }

  const handlePresetClick = (color: string) => {
    onChange(color)
    setIsOpen(false)
  }

  // Calcula a cor do texto baseado no brilho da cor de fundo
  const getContrastColor = (hexcolor: string) => {
    const r = parseInt(hexcolor.slice(1, 3), 16)
    const g = parseInt(hexcolor.slice(3, 5), 16)
    const b = parseInt(hexcolor.slice(5, 7), 16)
    const brightness = (r * 299 + g * 587 + b * 114) / 1000
    return brightness > 128 ? '#000000' : '#FFFFFF'
  }

  return (
    <div ref={containerRef} className="relative">
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
            w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
            ${error ? 'border-red-500' : 'border-gray-300'}
          `}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded border"
              style={{
                backgroundColor: value,
                borderColor: getContrastColor(value)
              }}
            />
            <span
              className="flex-1 text-left"
              style={{ color: value === '#FFFFFF' ? '#000000' : undefined }}
            >
              {value || placeholder}
            </span>
            <CaretDown
              size={16}
              className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            />
          </div>
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 p-4 bg-white border rounded-lg shadow-lg">
            <div className="mb-4">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="#000000"
                className={`
                  w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                  ${error ? 'border-red-500' : 'border-gray-300'}
                `}
              />
            </div>

            <div className="grid grid-cols-5 gap-2">
              {presetColors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => handlePresetClick(color)}
                  className={`
                    w-8 h-8 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                    ${color === value ? 'ring-2 ring-primary ring-offset-2' : ''}
                  `}
                  style={{
                    backgroundColor: color,
                    borderColor: getContrastColor(color)
                  }}
                  title={color}
                />
              ))}
            </div>

            <div className="relative mt-4">
              <input
                type="color"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full h-10 rounded-lg cursor-pointer"
              />
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