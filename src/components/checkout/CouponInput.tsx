'use client'

import React, { useState } from 'react'
import { Tag, CheckCircle, X } from 'phosphor-react'

interface CouponInputProps {
  onApply: (code: string) => Promise<boolean>
  onRemove: () => void
}

export function CouponInput({ onApply, onRemove }: CouponInputProps) {
  const [code, setCode] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!code.trim()) return

    setStatus('loading')
    try {
      const success = await onApply(code)
      if (success) {
        setStatus('success')
      } else {
        setStatus('error')
        setErrorMessage('Cupom inválido ou expirado')
      }
    } catch (error) {
      setStatus('error')
      setErrorMessage('Erro ao aplicar cupom')
    }
  }

  const handleRemove = () => {
    setCode('')
    setStatus('idle')
    setErrorMessage('')
    onRemove()
  }

  if (status === 'success') {
    return (
      <div className="bg-green-50 rounded-lg p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CheckCircle className="text-green-600" size={20} weight="fill" />
          <span className="font-medium text-green-600">
            Cupom {code.toUpperCase()} aplicado
          </span>
        </div>
        <button
          onClick={handleRemove}
          className="text-text/40 hover:text-text/60 transition-colors"
        >
          <X size={20} />
        </button>
      </div>
    )
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Tag
            className="absolute left-3 top-1/2 -translate-y-1/2 text-text/40"
            size={20}
          />
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="Código do cupom"
            className="w-full pl-10 pr-24 py-2 rounded-lg border focus:ring-2 focus:ring-primary/20 transition-shadow"
            disabled={status === 'loading'}
          />
          <button
            type="submit"
            disabled={status === 'loading' || !code.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1 bg-primary text-white rounded-md text-sm font-medium hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? 'Aplicando...' : 'Aplicar'}
          </button>
        </div>
      </form>

      {status === 'error' && (
        <p className="text-red-600 text-sm mt-2">{errorMessage}</p>
      )}
    </div>
  )
} 