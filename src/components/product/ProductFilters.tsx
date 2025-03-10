import React from 'react'
import { Star, X } from 'phosphor-react'

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
  onFilterChange: (filters: any) => void
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
    <div className="space-y-4">
      {/* Cabeçalho dos Filtros */}
      <div className="flex justify-between items-center pb-4 border-b">
        <h2 className="text-lg font-semibold text-text">Filtros</h2>
        {hasActiveFilters() && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
          >
            <X size={16} />
            Limpar Filtros
          </button>
        )}
      </div>

      {/* Container com Rolagem */}
      <div className="space-y-6 max-h-[calc(100vh-220px)] overflow-y-auto pr-4 -mr-4">
        {/* Filtros Básicos */}
        <div>
          <h3 className="font-semibold mb-3">Categorias</h3>
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="rounded text-primary"
                checked={filters.category.includes('Rações')}
                onChange={() => handleCategoryChange('Rações')}
              />
              <span>Rações</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="rounded text-primary"
                checked={filters.category.includes('Brinquedos')}
                onChange={() => handleCategoryChange('Brinquedos')}
              />
              <span>Brinquedos</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="rounded text-primary"
                checked={filters.category.includes('Acessórios')}
                onChange={() => handleCategoryChange('Acessórios')}
              />
              <span>Acessórios</span>
            </label>
          </div>
        </div>

        {/* Preço */}
        <div>
          <h3 className="font-semibold mb-3">Preço</h3>
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="rounded text-primary"
                checked={filters.priceRange.max === 50}
                onChange={() => handlePriceRangeChange(0, 50)}
              />
              <span>Até R$ 50</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="rounded text-primary"
                checked={filters.priceRange.min === 50 && filters.priceRange.max === 100}
                onChange={() => handlePriceRangeChange(50, 100)}
              />
              <span>R$ 50 - R$ 100</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="rounded text-primary"
                checked={filters.priceRange.min === 100 && filters.priceRange.max === 200}
                onChange={() => handlePriceRangeChange(100, 200)}
              />
              <span>R$ 100 - R$ 200</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="rounded text-primary"
                checked={filters.priceRange.min === 200}
                onChange={() => handlePriceRangeChange(200, 999999)}
              />
              <span>Acima de R$ 200</span>
            </label>
          </div>
        </div>

        {/* Filtros para Rações */}
        <div>
          <h3 className="font-semibold mb-3">Tipo de Animal</h3>
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="rounded text-primary"
                checked={filters.animalType.includes('Cães')}
                onChange={() => handleAnimalTypeChange('Cães')}
              />
              <span>Cães</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="rounded text-primary"
                checked={filters.animalType.includes('Gatos')}
                onChange={() => handleAnimalTypeChange('Gatos')}
              />
              <span>Gatos</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="rounded text-primary"
                checked={filters.animalType.includes('Pássaros')}
                onChange={() => handleAnimalTypeChange('Pássaros')}
              />
              <span>Pássaros</span>
            </label>
          </div>
        </div>

        {/* Disponibilidade */}
        <div>
          <h3 className="font-semibold mb-3">Disponibilidade</h3>
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="rounded text-primary"
                checked={filters.availability.inStock}
                onChange={() => handleAvailabilityChange('inStock')}
              />
              <span>Em Estoque</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="rounded text-primary"
                checked={filters.availability.onSale}
                onChange={() => handleAvailabilityChange('onSale')}
              />
              <span>Promoções</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="rounded text-primary"
                checked={filters.availability.bestSellers}
                onChange={() => handleAvailabilityChange('bestSellers')}
              />
              <span>Mais Vendidos</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="rounded text-primary"
                checked={filters.availability.newArrivals}
                onChange={() => handleAvailabilityChange('newArrivals')}
              />
              <span>Lançamentos</span>
            </label>
          </div>
        </div>

        {/* Avaliação */}
        <div>
          <h3 className="font-semibold mb-3">Avaliação</h3>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <label key={rating} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="rounded text-primary"
                  checked={filters.rating === rating}
                  onChange={() => handleRatingChange(rating)}
                />
                <div className="flex items-center">
                  {Array.from({ length: rating }).map((_, index) => (
                    <Star
                      key={index}
                      weight="fill"
                      className="w-4 h-4 text-yellow-400"
                    />
                  ))}
                  <span className="ml-1">ou mais</span>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 