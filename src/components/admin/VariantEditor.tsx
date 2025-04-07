import { useState } from 'react'
import { Plus, X, DotsSixVertical } from 'phosphor-react'
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, sortableKeyboardCoordinates, rectSortingStrategy, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { PriceInput } from './PriceInput'
import { WeightInput } from './WeightInput'

interface Variant {
  id: string
  name: string
  sku: string
  price: number
  compareAtPrice?: number
  weight?: string
  stock: number
}

interface VariantEditorProps {
  value: Variant[]
  onChange: (value: Variant[]) => void
  error?: string
  label?: string
}

interface SortableVariantProps {
  variant: Variant
  onChange: (variant: Variant) => void
  onRemove: () => void
}

function SortableVariant({ variant, onChange, onRemove }: SortableVariantProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: variant.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative p-4 border rounded-lg bg-white group"
    >
      <div
        {...attributes}
        {...listeners}
        className="absolute top-4 left-4 p-1 rounded cursor-grab opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100"
      >
        <DotsSixVertical size={20} className="text-gray-500" />
      </div>

      <button
        type="button"
        onClick={onRemove}
        className="absolute top-4 right-4 p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50"
      >
        <X size={20} className="text-red-500" />
      </button>

      <div className="pl-8 pr-8 space-y-4">
        {/* Nome */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Nome da Variação
          </label>
          <input
            type="text"
            value={variant.name}
            onChange={(e) => onChange({ ...variant, name: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        {/* SKU */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            SKU
          </label>
          <input
            type="text"
            value={variant.sku}
            onChange={(e) => onChange({ ...variant, sku: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        {/* Preços */}
        <div className="grid grid-cols-2 gap-4">
          <PriceInput
            label="Preço"
            value={variant.price}
            onChange={(value) => onChange({ ...variant, price: value || 0 })}
          />

          <PriceInput
            label="Preço Promocional"
            value={variant.compareAtPrice}
            onChange={(value) => onChange({ ...variant, compareAtPrice: value })}
          />
        </div>

        {/* Peso e Estoque */}
        <div className="grid grid-cols-2 gap-4">
          <WeightInput
            label="Peso/Volume"
            value={variant.weight || ''}
            onChange={(value) => onChange({ ...variant, weight: value })}
          />

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Estoque
            </label>
            <input
              type="number"
              value={variant.stock}
              onChange={(e) => onChange({ ...variant, stock: Number(e.target.value) })}
              min="0"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export function VariantEditor({
  value,
  onChange,
  error,
  label
}: VariantEditorProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event: any) => {
    const { active, over } = event

    if (active.id !== over.id) {
      const oldIndex = value.findIndex(item => item.id === active.id)
      const newIndex = value.findIndex(item => item.id === over.id)

      const newValue = [...value]
      const [removed] = newValue.splice(oldIndex, 1)
      newValue.splice(newIndex, 0, removed)

      onChange(newValue)
    }
  }

  const handleAdd = () => {
    const newVariant: Variant = {
      id: Math.random().toString(36).substr(2, 9),
      name: '',
      sku: '',
      price: 0,
      stock: 0
    }

    onChange([...value, newVariant])
  }

  const handleChange = (index: number, variant: Variant) => {
    const newValue = [...value]
    newValue[index] = variant
    onChange(newValue)
  }

  const handleRemove = (index: number) => {
    const newValue = [...value]
    newValue.splice(index, 1)
    onChange(newValue)
  }

  return (
    <div className="space-y-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="space-y-4">
          <SortableContext
            items={value.map(item => item.id)}
            strategy={rectSortingStrategy}
          >
            {value.map((variant, index) => (
              <SortableVariant
                key={variant.id}
                variant={variant}
                onChange={(newVariant) => handleChange(index, newVariant)}
                onRemove={() => handleRemove(index)}
              />
            ))}
          </SortableContext>

          <button
            type="button"
            onClick={handleAdd}
            className="flex items-center justify-center w-full gap-2 px-4 py-2 text-sm text-primary border-2 border-dashed border-primary/20 rounded-lg hover:bg-primary/5 transition-colors"
          >
            <Plus size={20} />
            Adicionar Variação
          </button>
        </div>
      </DndContext>

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  )
} 