import React, { useState, useRef } from 'react'
import { Import, X, FileArrowDown, Check, Warning } from 'lucide-react'

interface ImportModalProps {
  onClose: () => void
  onImport: (file: File) => Promise<void>
}

export function ImportModal({ onClose, onImport }: ImportModalProps) {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    if (!selectedFile.name.endsWith('.csv')) {
      setError('Por favor, selecione um arquivo CSV')
      return
    }

    setFile(selectedFile)
    setError('')
  }

  const handleImport = async () => {
    if (!file) return

    try {
      setLoading(true)
      await onImport(file)
      onClose()
    } catch (err) {
      setError('Erro ao importar produtos. Verifique o formato do arquivo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <Import className="text-primary" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Importar Produtos
              </h2>
              <p className="text-sm text-gray-600">
                Importe produtos em massa via CSV
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        {/* Área de Upload */}
        <div
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
            file ? 'border-primary/50 bg-primary/5' : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="flex flex-col items-center gap-3">
            {file ? (
              <>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Check className="text-primary" size={24} />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{file.name}</p>
                  <p className="text-sm text-gray-500">
                    Clique para selecionar outro arquivo
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <FileArrowDown className="text-gray-400" size={24} />
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    Clique para selecionar um arquivo
                  </p>
                  <p className="text-sm text-gray-500">
                    ou arraste e solte aqui
                  </p>
                </div>
                <p className="text-xs text-gray-400">
                  Apenas arquivos CSV são aceitos
                </p>
              </>
            )}
          </div>
        </div>

        {/* Mensagem de Erro */}
        {error && (
          <div className="flex items-center gap-2 mt-4 p-3 bg-red-50 text-red-700 rounded-lg">
            <Warning size={20} />
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Modelo de Arquivo */}
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-900 mb-2">
            Modelo do Arquivo
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            Seu arquivo CSV deve seguir este formato:
          </p>
          <div className="bg-gray-50 p-3 rounded-lg overflow-x-auto">
            <code className="text-xs text-gray-600">
              nome,descricao,preco,categoria,marca,sku,estoque,estoque_minimo
            </code>
          </div>
          <a
            href="/templates/produtos.csv"
            download
            className="inline-flex items-center gap-2 mt-2 text-sm text-primary hover:text-primary-dark"
          >
            <FileArrowDown size={16} />
            <span>Baixar modelo</span>
          </a>
        </div>

        {/* Ações */}
        <div className="flex items-center justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleImport}
            disabled={!file || loading}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Import size={20} />
            <span>{loading ? 'Importando...' : 'Importar'}</span>
          </button>
        </div>
      </div>
    </div>
  )
} 