import { useState } from 'react'
import { Plus, X, DotsSixVertical } from 'phosphor-react'
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface Option {
  id: string
  name: string
  values: string[]
}

interface OptionSelectProps {
  value: Option[]
  onChange: (options: Option[]) => void
  error?: string
  label?: string
  presetOptions?: Option[]
}

interface SortableOptionProps {
  option: Option
  onChange: (option: Option) => void
  onRemove: () => void
}

function SortableOption({ option, onChange, onRemove }: SortableOptionProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: option.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  }

  const [newValue, setNewValue] = useState('')

  const handleAddValue = () => {
    if (newValue && !option.values.includes(newValue)) {
      onChange({
        ...option,
        values: [...option.values, newValue]
      })
      setNewValue('')
    }
  }

  const handleRemoveValue = (value: string) => {
    onChange({
      ...option,
      values: option.values.filter(v => v !== value)
    })
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
        {/* Nome da opção */}
        <input
          type="text"
          value={option.name}
          onChange={(e) => onChange({ ...option, name: e.target.value })}
          placeholder="Nome da opção (ex: Cor, Tamanho)"
          className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />

        {/* Valores da opção */}
        <div className="flex flex-wrap gap-2">
          {option.values.map((value) => (
            <div
              key={value}
              className="inline-flex items-center gap-1 px-2 py-1 text-sm bg-primary/10 text-primary rounded"
            >
              <span>{value}</span>
              <button
                type="button"
                onClick={() => handleRemoveValue(value)}
                className="p-0.5 rounded-full hover:bg-primary/20"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>

        {/* Adicionar novo valor */}
        <div className="flex gap-2">
          <input
            type="text"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            placeholder="Novo valor"
            className="flex-1 px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <button
            type="button"
            onClick={handleAddValue}
            disabled={!newValue || option.values.includes(newValue)}
            className="flex items-center gap-1 px-3 py-2 text-sm text-white bg-primary rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus size={16} />
            Adicionar
          </button>
        </div>
      </div>
    </div>
  )
}

export function OptionSelect({
  value = [],
  onChange,
  error,
  label,
  presetOptions = [
    {
      id: '1',
      name: 'Cor',
      values: ['Preto', 'Branco', 'Azul', 'Vermelho', 'Verde', 'Amarelo', 'Rosa']
    },
    {
      id: '2',
      name: 'Tamanho',
      values: ['PP', 'P', 'M', 'G', 'GG', 'XG']
    },
    {
      id: '3',
      name: 'Material',
      values: ['Algodão', 'Poliéster', 'Nylon', 'Couro', 'Plástico']
    }
  ]
}: OptionSelectProps) {
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

  const handleAddOption = (preset?: Option) => {
    const newOption: Option = preset || {
      id: Math.random().toString(36).substr(2, 9),
      name: '',
      values: []
    }
    onChange([...value, newOption])
  }

  const handleChangeOption = (index: number, option: Option) => {
    const newValue = [...value]
    newValue[index] = option
    onChange(newValue)
  }

  const handleRemoveOption = (index: number) => {
    const newValue = [...value]
    newValue.splice(index, 1)
    onChange(newValue)
  }

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
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
            strategy={verticalListSortingStrategy}
          >
            {value.map((option, index) => (
              <SortableOption
                key={option.id}
                option={option}
                onChange={(newOption) => handleChangeOption(index, newOption)}
                onRemove={() => handleRemoveOption(index)}
              />
            ))}
          </SortableContext>

          {/* Opções predefinidas */}
          {presetOptions.length > 0 && value.length === 0 && (
            <div className="p-4 border rounded-lg space-y-4">
              <h4 className="text-sm font-medium text-gray-700">
                Opções predefinidas
              </h4>
              <div className="flex flex-wrap gap-2">
                {presetOptions.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => handleAddOption(preset)}
                    className="px-3 py-1 text-sm border rounded-lg hover:border-primary hover:text-primary"
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Adicionar nova opção */}
          <button
            type="button"
            onClick={() => handleAddOption()}
            className="flex items-center justify-center w-full gap-2 px-4 py-2 text-sm text-primary border-2 border-dashed border-primary/20 rounded-lg hover:bg-primary/5 transition-colors"
          >
            <Plus size={16} />
            Adicionar Nova Opção
          </button>
        </div>
      </DndContext>

      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  )
} 