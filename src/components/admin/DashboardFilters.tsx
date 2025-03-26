import React from 'react'
import { MagnifyingGlass, CaretDown } from 'phosphor-react'

interface DashboardFiltersProps {
  onPeriodChange: (period: string) => void
  onCategoryChange: (category: string) => void
  onSearch: (searchTerm: string) => void
  selectedPeriod: string
  selectedCategory: string
  searchTerm: string
}

const periods = [
  { value: 'today', label: 'Hoje' },
  { value: 'week', label: 'Esta Semana' },
  { value: 'month', label: 'Este Mês' },
  { value: 'year', label: 'Este Ano' }
]

const categories = [
  { value: 'all', label: 'Todas as Categorias' },
  { value: 'racao', label: 'Ração' },
  { value: 'medicamentos', label: 'Medicamentos' },
  { value: 'acessorios', label: 'Acessórios' },
  { value: 'higiene', label: 'Higiene' }
]

export default function DashboardFilters({
  onPeriodChange,
  onCategoryChange,
  onSearch,
  selectedPeriod,
  selectedCategory,
  searchTerm
}: DashboardFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      {/* Seletor de Período */}
      <div className="relative">
        <select
          value={selectedPeriod}
          onChange={(e) => onPeriodChange(e.target.value)}
          className="appearance-none bg-white w-full md:w-48 px-4 py-2.5 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
        >
          {periods.map((period) => (
            <option key={period.value} value={period.value}>
              {period.label}
            </option>
          ))}
        </select>
        <CaretDown
          className="absolute right-4 top-1/2 -translate-y-1/2 text-text/40 pointer-events-none"
          size={16}
        />
      </div>

      {/* Seletor de Categoria */}
      <div className="relative">
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="appearance-none bg-white w-full md:w-48 px-4 py-2.5 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
        >
          {categories.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
        <CaretDown
          className="absolute right-4 top-1/2 -translate-y-1/2 text-text/40 pointer-events-none"
          size={16}
        />
      </div>

      {/* Campo de Busca */}
      <div className="relative flex-1">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Buscar produtos..."
          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
        />
        <MagnifyingGlass
          className="absolute left-3 top-1/2 -translate-y-1/2 text-text/40"
          size={20}
        />
      </div>
    </div>
  )
} 