'use client'

import { useEffect } from 'react'
import { Warning } from 'phosphor-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Aqui você pode enviar o erro para um serviço de monitoramento
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Warning size={64} className="text-red-500" />
        <h2 className="text-2xl font-bold text-gray-900">
          Algo deu errado!
        </h2>
        <p className="text-gray-600 text-center max-w-md">
          Ocorreu um erro ao carregar esta página. Por favor, tente novamente mais tarde ou entre em contato com o suporte.
        </p>
        <button
          onClick={reset}
          className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          Tentar novamente
        </button>
      </div>
    </div>
  )
} 