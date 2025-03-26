import React, { useState } from 'react'
import { Export, CaretDown } from 'phosphor-react'

interface ExportReportProps {
  onExport: (format: 'pdf' | 'excel' | 'csv') => Promise<void>
}

export default function ExportReport({ onExport }: ExportReportProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleExport = async (format: 'pdf' | 'excel' | 'csv') => {
    try {
      setLoading(true)
      await onExport(format)
    } catch (error) {
      console.error('Erro ao exportar relatório:', error)
    } finally {
      setLoading(false)
      setIsOpen(false)
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={loading}
        className={`
          flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg
          hover:bg-primary/90 transition-colors disabled:opacity-50
        `}
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <Export size={20} />
        )}
        Exportar
        <CaretDown size={16} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-border overflow-hidden z-50">
          <button
            onClick={() => handleExport('pdf')}
            className="w-full px-4 py-2 text-left hover:bg-background transition-colors"
          >
            Exportar como PDF
          </button>
          <button
            onClick={() => handleExport('excel')}
            className="w-full px-4 py-2 text-left hover:bg-background transition-colors"
          >
            Exportar como Excel
          </button>
          <button
            onClick={() => handleExport('csv')}
            className="w-full px-4 py-2 text-left hover:bg-background transition-colors"
          >
            Exportar como CSV
          </button>
        </div>
      )}
    </div>
  )
} 