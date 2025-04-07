import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { UploadSimple, X, File as FileIcon } from 'phosphor-react'

interface FileUploadProps {
  value?: File[]
  onChange: (files: File[]) => void
  error?: string
  label?: string
  accept?: string
  maxFiles?: number
  maxSize?: number
  placeholder?: string
}

export function FileUpload({
  value = [],
  onChange,
  error,
  label,
  accept,
  maxFiles = 1,
  maxSize = 5 * 1024 * 1024, // 5MB
  placeholder = 'Arraste arquivos ou clique para selecionar'
}: FileUploadProps) {
  const [rejectedFiles, setRejectedFiles] = useState<File[]>([])

  const onDrop = useCallback((acceptedFiles: File[], rejected: any[]) => {
    if (maxFiles === 1) {
      onChange(acceptedFiles.slice(0, 1))
    } else {
      onChange([...value, ...acceptedFiles].slice(0, maxFiles))
    }
    setRejectedFiles(rejected.map(r => r.file))
  }, [maxFiles, onChange, value])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: accept ? { [accept]: [] } : undefined,
    maxSize,
    maxFiles: maxFiles - value.length,
    disabled: value.length >= maxFiles
  })

  const handleRemove = (index: number) => {
    const newFiles = [...value]
    newFiles.splice(index, 1)
    onChange(newFiles)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getFileTypeFromName = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase()
    switch (extension) {
      case 'pdf':
        return 'PDF'
      case 'doc':
      case 'docx':
        return 'Word'
      case 'xls':
      case 'xlsx':
        return 'Excel'
      case 'jpg':
      case 'jpeg':
      case 'png':
        return 'Imagem'
      default:
        return 'Arquivo'
    }
  }

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}

      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary hover:bg-gray-50'}
          ${error ? 'border-red-500' : ''}
          ${value.length >= maxFiles ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <input {...getInputProps()} />
        <div className="space-y-2">
          <UploadSimple size={24} className="mx-auto text-gray-400" />
          <p className="text-sm text-gray-500">
            {placeholder}
          </p>
          <p className="text-xs text-gray-400">
            Máximo: {maxFiles} {maxFiles === 1 ? 'arquivo' : 'arquivos'} de até {formatFileSize(maxSize)} cada
          </p>
        </div>
      </div>

      {/* Lista de arquivos aceitos */}
      {value.length > 0 && (
        <div className="mt-4 space-y-2">
          {value.map((file, index) => (
            <div
              key={file.name + index}
              className="flex items-center justify-between p-2 border rounded-lg bg-gray-50 group"
            >
              <div className="flex items-center gap-2">
                <FileIcon size={20} className="text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {getFileTypeFromName(file.name)} • {formatFileSize(file.size)}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50"
              >
                <X size={16} className="text-red-500" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Lista de arquivos rejeitados */}
      {rejectedFiles.length > 0 && (
        <div className="mt-4 space-y-2">
          {rejectedFiles.map((file, index) => (
            <div
              key={file.name + index}
              className="flex items-center justify-between p-2 border border-red-200 rounded-lg bg-red-50"
            >
              <div className="flex items-center gap-2">
                <FileIcon size={20} className="text-red-400" />
                <div>
                  <p className="text-sm font-medium text-red-700">
                    {file.name}
                  </p>
                  <p className="text-xs text-red-500">
                    Arquivo rejeitado: tamanho ou formato inválido
                  </p>
                </div>
              </div>
            </div>
          ))}
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