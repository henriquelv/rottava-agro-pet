'use client'

import { useState } from 'react'
import { Envelope } from 'phosphor-react'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      setStatus('loading')
      
      // Aqui você irá implementar a lógica de cadastro do email na newsletter
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setStatus('success')
      setEmail('')
    } catch (error) {
      setStatus('error')
    }
  }

  return (
    <section className="py-16 bg-primary">
      <div className="max-w-7xl mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <Envelope className="w-12 h-12 text-white mx-auto mb-4" weight="thin" />
          <h2 className="text-3xl font-bold text-white mb-2">
            Receba nossas novidades
          </h2>
          <p className="text-white/80 mb-8">
            Cadastre-se para receber ofertas exclusivas e dicas para o seu pet
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu e-mail"
              className="flex-1 px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/60 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-transparent"
              required
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? 'Cadastrando...' : 'Cadastrar'}
            </button>
          </form>

          {status === 'success' && (
            <p className="mt-4 text-white/80">
              Email cadastrado com sucesso! 🎉
            </p>
          )}

          {status === 'error' && (
            <p className="mt-4 text-white/80">
              Ocorreu um erro. Por favor, tente novamente.
            </p>
          )}

          <p className="mt-4 text-sm text-white/60">
            Ao se cadastrar, você concorda em receber emails de marketing da Rottava Agro Pet.
            Você pode cancelar a inscrição a qualquer momento.
          </p>
        </div>
      </div>
    </section>
  )
} 