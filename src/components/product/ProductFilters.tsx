import React, { useState } from 'react'
import { Star, X, CaretDown, CaretUp, ShoppingBag, Dog, Package } from 'phosphor-react'

interface FilterProps {
  filters: {
    category: string[]
    subCategory: string[]
    priceRange: {
      min: number
      max: number
    }
    brand: string[]
    animalType: string[]
    animalAge: string[]
    animalSize: string[]
    specialNeeds: string[]
    flavor: string[]
    packageSize: string[]
    productType: string[]
    material: string[]
    size: string[]
    color: string[]
    availability: {
      inStock: boolean
      onSale: boolean
      bestSellers: boolean
      newArrivals: boolean
    }
    rating: number
  }
  onFilterChange: (filters: FilterProps['filters']) => void
}

interface FilterSectionProps {
  title: string
  icon?: React.ReactNode
  children: React.ReactNode
  defaultOpen?: boolean
}

function FilterSection({ title, icon, children, defaultOpen = true }: FilterSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="border-b border-gray-100 last:border-0 pb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-2 text-text hover:text-primary transition-colors"
      >
        <div className="flex items-center gap-2">
          {icon}
          <span className="font-medium">{title}</span>
        </div>
        {isOpen ? <CaretUp size={16} /> : <CaretDown size={16} />}
      </button>
      {isOpen && <div className="mt-3">{children}</div>}
    </div>
  )
}

export default function ProductFilters({ filters, onFilterChange }: FilterProps) {
  const handleCategoryChange = (category: string) => {
    const newCategories = filters.category.includes(category)
      ? filters.category.filter((c) => c !== category)
      : [...filters.category, category]

    onFilterChange({ ...filters, category: newCategories })
  }

  const handlePriceRangeChange = (min: number, max: number) => {
    onFilterChange({ ...filters, priceRange: { min, max } })
  }

  const handleAnimalTypeChange = (type: string) => {
    const newTypes = filters.animalType.includes(type)
      ? filters.animalType.filter((t) => t !== type)
      : [...filters.animalType, type]

    onFilterChange({ ...filters, animalType: newTypes })
  }

  const handleAvailabilityChange = (key: keyof typeof filters.availability) => {
    onFilterChange({
      ...filters,
      availability: {
        ...filters.availability,
        [key]: !filters.availability[key],
      },
    })
  }

  const handleRatingChange = (rating: number) => {
    onFilterChange({ ...filters, rating })
  }

  const clearFilters = () => {
    onFilterChange({
      category: [],
      subCategory: [],
      priceRange: {
        min: 0,
        max: 0,
      },
      brand: [],
      animalType: [],
      animalAge: [],
      animalSize: [],
      specialNeeds: [],
      flavor: [],
      packageSize: [],
      productType: [],
      material: [],
      size: [],
      color: [],
      availability: {
        inStock: false,
        onSale: false,
        bestSellers: false,
        newArrivals: false,
      },
      rating: 0,
    })
  }

  const hasActiveFilters = () => {
    return (
      filters.category.length > 0 ||
      filters.animalType.length > 0 ||
      filters.priceRange.min > 0 ||
      filters.priceRange.max > 0 ||
      filters.rating > 0 ||
      Object.values(filters.availability).some((value) => value)
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      {/* Cabeçalho dos Filtros */}
      <div className="flex justify-between items-center pb-4 mb-4 border-b border-gray-100">
        <h2 className="text-xl font-semibold text-text">Filtros</h2>
        {hasActiveFilters() && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-2 text-sm text-primary hover:text-primary-dark transition-colors"
          >
            <X size={16} weight="bold" />
            Limpar
          </button>
        )}
      </div>

      {/* Container com Rolagem */}
      <div className="space-y-1 max-h-[calc(100vh-220px)] overflow-y-auto pr-4 -mr-4">
        {/* Categorias */}
        <FilterSection title="Categorias" icon={<ShoppingBag size={18} />}>
          <div className="space-y-2">
            {['Rações', 'Brinquedos', 'Acessórios'].map((category) => (
              <label key={category} className="flex items-center gap-3 group cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary/20 transition-shadow"
                  checked={filters.category.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                />
                <span className="text-text/80 group-hover:text-primary transition-colors">
                  {category}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Preço */}
        <FilterSection title="Faixa de Preço" icon={<Package size={18} />}>
          <div className="space-y-2">
            {[
              { label: 'Até R$ 50', min: 0, max: 50 },
              { label: 'R$ 50 - R$ 100', min: 50, max: 100 },
              { label: 'R$ 100 - R$ 200', min: 100, max: 200 },
              { label: 'Acima de R$ 200', min: 200, max: 999999 },
            ].map((range) => (
              <label key={range.label} className="flex items-center gap-3 group cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary/20 transition-shadow"
                  checked={
                    filters.priceRange.min === range.min && filters.priceRange.max === range.max
                  }
                  onChange={() => handlePriceRangeChange(range.min, range.max)}
                />
                <span className="text-text/80 group-hover:text-primary transition-colors">
                  {range.label}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Tipo de Animal */}
        <FilterSection title="Tipo de Animal" icon={<Dog size={18} />}>
          <div className="space-y-2">
            {['Cães', 'Gatos', 'Pássaros'].map((type) => (
              <label key={type} className="flex items-center gap-3 group cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary/20 transition-shadow"
                  checked={filters.animalType.includes(type)}
                  onChange={() => handleAnimalTypeChange(type)}
                />
                <span className="text-text/80 group-hover:text-primary transition-colors">
                  {type}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Disponibilidade */}
        <FilterSection title="Disponibilidade" icon={<Package size={18} />}>
          <div className="space-y-2">
            {[
              { key: 'inStock' as const, label: 'Em Estoque' },
              { key: 'onSale' as const, label: 'Em Promoção' },
              { key: 'bestSellers' as const, label: 'Mais Vendidos' },
              { key: 'newArrivals' as const, label: 'Novidades' },
            ].map((item) => (
              <label key={item.key} className="flex items-center gap-3 group cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary/20 transition-shadow"
                  checked={filters.availability[item.key]}
                  onChange={() => handleAvailabilityChange(item.key)}
                />
                <span className="text-text/80 group-hover:text-primary transition-colors">
                  {item.label}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Avaliação */}
        <FilterSection title="Avaliação" icon={<Star size={18} />}>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <label key={rating} className="flex items-center gap-3 group cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary/20 transition-shadow"
                  checked={filters.rating === rating}
                  onChange={() => handleRatingChange(rating)}
                />
                <div className="flex items-center gap-1">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < rating ? 'text-yellow-400' : 'text-gray-300'}>
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-text/80 group-hover:text-primary transition-colors">
                    {rating === 5 ? 'e acima' : `ou mais`}
                  </span>
                </div>
              </label>
            ))}
          </div>
        </FilterSection>
      </div>
    </div>
  )
} 