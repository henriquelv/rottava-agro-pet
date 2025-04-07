import { useState, useCallback } from 'react'
import Image from 'next/image'
import { useDropzone } from 'react-dropzone'
import { Upload, X } from 'phosphor-react'

interface ImageUploadProps {
  value?: string | null
  onChange: (value: string | null) => void
  maxSize?: number // em bytes
  accept?: string[]
  aspectRatio?: number
  className?: string
}

export function ImageUpload({
  value,
  onChange,
  maxSize = 5 * 1024 * 1024, // 5MB
  accept = ['image/jpeg', 'image/png', 'image/webp'],
  aspectRatio,
  className = ''
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(value || null)
  const [error, setError] = useState<string | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null)

    const file = acceptedFiles[0]
    if (!file) return

    // Verifica o tamanho do arquivo
    if (file.size > maxSize) {
      setError(`O arquivo deve ter no máximo ${Math.round(maxSize / 1024 / 1024)}MB`)
      return
    }

    // Verifica o tipo do arquivo
    if (!accept.includes(file.type)) {
      setError(`Tipo de arquivo não suportado. Use: ${accept.join(', ')}`)
      return
    }

    // Verifica as dimensões da imagem
    if (aspectRatio) {
      const img = new Image()
      img.src = URL.createObjectURL(file)
      img.onload = () => {
        const ratio = img.width / img.height
        if (Math.abs(ratio - aspectRatio) > 0.1) {
          setError(`A imagem deve ter proporção ${aspectRatio}:1`)
          return
        }
      }
    }

    // Cria o preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result as string)
      onChange(reader.result as string)
    }
    reader.readAsDataURL(file)
  }, [maxSize, accept, aspectRatio, onChange])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: accept.reduce((acc, curr) => ({ ...acc, [curr]: [] }), {}),
    maxFiles: 1,
    multiple: false
  })

  const handleRemove = () => {
    setPreview(null)
    onChange(null)
  }

  return (
    <div className={className}>
      {preview ? (
        <div className="relative">
          <div className="relative w-full aspect-video rounded-lg overflow-hidden">
            <Image
              src={preview}
              alt="Preview"
              fill
              className="object-cover"
            />
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`
            flex flex-col items-center justify-center w-full aspect-video
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
          <p className="mt-2 text-sm text-gray-500">
            {isDragActive
              ? 'Solte a imagem aqui'
              : 'Arraste uma imagem ou clique para selecionar'
            }
          </p>
          <p className="mt-1 text-xs text-gray-400">
            {`Máximo ${Math.round(maxSize / 1024 / 1024)}MB`}
          </p>
        </div>
      )}

      {error && (
        <p className="mt-2 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  )
} 