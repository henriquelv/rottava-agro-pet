import { useState, useEffect, useRef } from 'react'
import { format, parse, isValid } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Calendar, Clock, CaretLeft, CaretRight } from 'phosphor-react'

interface DateTimePickerProps {
  value?: Date
  onChange: (date: Date | undefined) => void
  error?: string
  label?: string
  placeholder?: string
  showTime?: boolean
  minDate?: Date
  maxDate?: Date
}

export function DateTimePicker({
  value,
  onChange,
  error,
  label,
  placeholder = 'Selecione uma data',
  showTime = false,
  minDate,
  maxDate
}: DateTimePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(value || new Date())
  const [inputValue, setInputValue] = useState('')
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
    if (value) {
      setInputValue(format(value, showTime ? 'dd/MM/yyyy HH:mm' : 'dd/MM/yyyy', { locale: ptBR }))
    } else {
      setInputValue('')
    }
  }, [value, showTime])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInputValue(newValue)

    const parsedDate = parse(newValue, showTime ? 'dd/MM/yyyy HH:mm' : 'dd/MM/yyyy', new Date())
    if (isValid(parsedDate)) {
      onChange(parsedDate)
    } else {
      onChange(undefined)
    }
  }

  const handleDateSelect = (date: Date) => {
    if (value) {
      // Mantém as horas e minutos do valor atual
      date.setHours(value.getHours(), value.getMinutes())
    }
    onChange(date)
    if (!showTime) {
      setIsOpen(false)
    }
  }

  const handleTimeChange = (type: 'hours' | 'minutes', value: number) => {
    const newDate = new Date(currentMonth)
    if (type === 'hours') {
      newDate.setHours(value)
    } else {
      newDate.setMinutes(value)
    }
    onChange(newDate)
  }

  const getDaysInMonth = (date: Date) => {
    const start = new Date(date.getFullYear(), date.getMonth(), 1)
    const end = new Date(date.getFullYear(), date.getMonth() + 1, 0)
    const days = []

    // Adiciona dias do mês anterior
    const firstDay = start.getDay()
    const prevMonthEnd = new Date(date.getFullYear(), date.getMonth(), 0).getDate()
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        date: new Date(date.getFullYear(), date.getMonth() - 1, prevMonthEnd - i),
        isCurrentMonth: false
      })
    }

    // Adiciona dias do mês atual
    for (let i = 1; i <= end.getDate(); i++) {
      days.push({
        date: new Date(date.getFullYear(), date.getMonth(), i),
        isCurrentMonth: true
      })
    }

    // Adiciona dias do próximo mês
    const lastDay = end.getDay()
    const remainingDays = 6 - lastDay
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: new Date(date.getFullYear(), date.getMonth() + 1, i),
        isCurrentMonth: false
      })
    }

    return days
  }

  const isDateDisabled = (date: Date) => {
    if (minDate && date < minDate) return true
    if (maxDate && date > maxDate) return true
    return false
  }

  return (
    <div ref={containerRef} className="relative">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}

      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          onClick={() => setIsOpen(true)}
          className={`
            w-full px-3 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
            ${error ? 'border-red-500' : 'border-gray-300'}
          `}
        />
        <Calendar
          size={20}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-1 bg-white border rounded-lg shadow-lg p-4">
          {/* Cabeçalho do calendário */}
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
              className="p-1 rounded hover:bg-gray-100"
            >
              <CaretLeft size={16} className="text-gray-500" />
            </button>
            <span className="font-medium">
              {format(currentMonth, 'MMMM yyyy', { locale: ptBR })}
            </span>
            <button
              type="button"
              onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
              className="p-1 rounded hover:bg-gray-100"
            >
              <CaretRight size={16} className="text-gray-500" />
            </button>
          </div>

          {/* Grade do calendário */}
          <div className="grid grid-cols-7 gap-1">
            {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
              <div key={day} className="text-center text-sm font-medium text-gray-500 mb-1">
                {day}
              </div>
            ))}
            {getDaysInMonth(currentMonth).map(({ date, isCurrentMonth }, index) => {
              const isSelected = value && date.toDateString() === value.toDateString()
              const isDisabled = isDateDisabled(date)

              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => !isDisabled && handleDateSelect(date)}
                  disabled={isDisabled}
                  className={`
                    p-2 text-sm rounded-lg
                    ${isCurrentMonth ? 'text-gray-700' : 'text-gray-400'}
                    ${isSelected ? 'bg-primary text-white' : 'hover:bg-gray-100'}
                    ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                  `}
                >
                  {date.getDate()}
                </button>
              )
            })}
          </div>

          {/* Seletor de hora */}
          {showTime && (
            <div className="mt-4 flex items-center gap-4 border-t pt-4">
              <Clock size={20} className="text-gray-400" />
              <select
                value={value?.getHours() || 0}
                onChange={(e) => handleTimeChange('hours', Number(e.target.value))}
                className="px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {Array.from({ length: 24 }).map((_, i) => (
                  <option key={i} value={i}>
                    {i.toString().padStart(2, '0')}
                  </option>
                ))}
              </select>
              <span className="text-gray-500">:</span>
              <select
                value={value?.getMinutes() || 0}
                onChange={(e) => handleTimeChange('minutes', Number(e.target.value))}
                className="px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {Array.from({ length: 60 }).map((_, i) => (
                  <option key={i} value={i}>
                    {i.toString().padStart(2, '0')}
                  </option>
                ))}
              </select>
            </div>
          )}
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