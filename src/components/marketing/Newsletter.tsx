'use client'

import React, { useState } from 'react'
import { Envelope } from 'phosphor-react'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) throw new Error()

      setStatus('success')
      setEmail('')
    } catch (error) {
      setStatus('error')
    }
  }

  return (
    <div className="bg-primary/5 rounded-2xl p-8">
      <div className="max-w-xl mx-auto text-center">
        <h3 className="text-2xl font-bold text-text mb-2">
          Receba nossas novidades
        </h3>
        <p className="text-text/60 mb-6">
          Cadastre-se para receber ofertas exclusivas e dicas para cuidar do seu pet
        </p>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Envelope 
              className="absolute left-3 top-1/2 -translate-y-1/2 text-text/40" 
              size={20} 
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Seu melhor e-mail"
              required
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-shadow"
            />
          </div>
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors disabled:opacity-50"
          >
            {status === 'loading' ? 'Enviando...' : 'Cadastrar'}
          </button>
        </form>

        {status === 'success' && (
          <p className="text-green-600 mt-2">
            Email cadastrado com sucesso!
          </p>
        )}

        {status === 'error' && (
          <p className="text-red-600 mt-2">
            Erro ao cadastrar email. Tente novamente.
          </p>
        )}
      </div>
    </div>
  )
} 