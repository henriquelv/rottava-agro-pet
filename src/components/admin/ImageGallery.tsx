import { useState, useCallback } from 'react'
import Image from 'next/image'
import { useDropzone } from 'react-dropzone'
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, sortableKeyboardCoordinates, rectSortingStrategy, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Upload, X, DotsSixVertical } from 'phosphor-react'

interface ImageItem {
  id: string
  url: string
  file?: File
}

interface ImageGalleryProps {
  value: ImageItem[]
  onChange: (value: ImageItem[]) => void
  maxFiles?: number
  maxSize?: number // em bytes
  accept?: string[]
  error?: string
  label?: string
}

interface SortableImageProps {
  image: ImageItem
  onRemove: () => void
}

function SortableImage({ image, onRemove }: SortableImageProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: image.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative group"
    >
      <div
        {...attributes}
        {...listeners}
        className="absolute top-2 left-2 p-1 bg-white rounded-lg shadow cursor-grab opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <DotsSixVertical size={20} className="text-gray-500" />
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="absolute top-2 right-2 p-1 bg-white rounded-lg shadow opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50"
      >
        <X size={20} className="text-red-500" />
      </button>
      <div className="relative w-32 h-32 rounded-lg overflow-hidden">
        <Image
          src={image.url}
          alt=""
          fill
          className="object-cover"
        />
      </div>
    </div>
  )
}

export function ImageGallery({
  value,
  onChange,
  maxFiles = 5,
  maxSize = 5 * 1024 * 1024, // 5MB
  accept = ['image/jpeg', 'image/png', 'image/webp'],
  error,
  label
}: ImageGalleryProps) {
  const [dragError, setDragError] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setDragError(null)

    // Verifica o número máximo de arquivos
    if (value.length + acceptedFiles.length > maxFiles) {
      setDragError(`Você pode enviar no máximo ${maxFiles} imagens`)
      return
    }

    // Verifica o tamanho dos arquivos
    const oversizedFiles = acceptedFiles.filter(file => file.size > maxSize)
    if (oversizedFiles.length > 0) {
      setDragError(`Os arquivos devem ter no máximo ${Math.round(maxSize / 1024 / 1024)}MB`)
      return
    }

    // Cria URLs temporárias para preview
    const newImages = acceptedFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      url: URL.createObjectURL(file),
      file
    }))

    onChange([...value, ...newImages])
  }, [value, onChange, maxFiles, maxSize])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: accept.reduce((acc, curr) => ({ ...acc, [curr]: [] }), {}),
    maxFiles: maxFiles - value.length,
    multiple: true
  })

  const handleDragEnd = useCallback((event: any) => {
    const { active, over } = event

    if (active.id !== over.id) {
      const oldIndex = value.findIndex(item => item.id === active.id)
      const newIndex = value.findIndex(item => item.id === over.id)

      const newValue = [...value]
      const [removed] = newValue.splice(oldIndex, 1)
      newValue.splice(newIndex, 0, removed)

      onChange(newValue)
    }
  }, [value, onChange])

  const handleRemove = useCallback((id: string) => {
    onChange(value.filter(image => image.id !== id))
  }, [value, onChange])

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
        <div className="flex flex-wrap gap-4">
          <SortableContext
            items={value.map(item => item.id)}
            strategy={rectSortingStrategy}
          >
            {value.map(image => (
              <SortableImage
                key={image.id}
                image={image}
                onRemove={() => handleRemove(image.id)}
              />
            ))}
          </SortableContext>

          {value.length < maxFiles && (
            <div
              {...getRootProps()}
              className={`
                flex flex-col items-center justify-center w-32 h-32
                border-2 border-dashed rounded-lg cursor-pointer
                transition-colors
                ${isDragActive
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-300 hover:border-primary'
                }
              `}
            >
              <input {...getInputProps()} />
              <Upload
                size={24}
                className={isDragActive ? 'text-primary' : 'text-gray-400'}
              />
              <p className="mt-2 text-xs text-center text-gray-500">
                {isDragActive
                  ? 'Solte as imagens aqui'
                  : 'Arraste imagens ou clique para selecionar'
                }
              </p>
            </div>
          )}
        </div>
      </DndContext>

      <div className="flex items-center justify-between text-sm text-gray-500">
        <p>
          {value.length} de {maxFiles} imagens
        </p>
        <p>
          Máximo {Math.round(maxSize / 1024 / 1024)}MB por arquivo
        </p>
      </div>

      {(error || dragError) && (
        <p className="text-sm text-red-500">
          {error || dragError}
        </p>
      )}
    </div>
  )
} 