'use client'

import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

export function Newsletter() {
  const { t } = useTranslation()
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

      if (!response.ok) throw new Error('Falha ao se inscrever')
      
      setStatus('success')
      setEmail('')
    } catch (error) {
      setStatus('error')
    }
  }

  return (
    <div className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {t('newsletter.title', 'Receba nossas novidades')}
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            {t('newsletter.description', 'Inscreva-se para receber ofertas exclusivas e novidades.')}
          </p>
        </div>
        <form onSubmit={handleSubmit} className="mx-auto mt-10 max-w-md">
          <div className="flex gap-x-4">
            <label htmlFor="email-address" className="sr-only">
              {t('newsletter.emailLabel', 'Endereço de email')}
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="min-w-0 flex-auto rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
              placeholder={t('newsletter.emailPlaceholder', 'Digite seu email')}
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="flex-none rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 disabled:opacity-50"
            >
              {status === 'loading'
                ? t('newsletter.subscribing', 'Inscrevendo...')
                : t('newsletter.subscribe', 'Inscrever')}
            </button>
          </div>
          {status === 'success' && (
            <p className="mt-4 text-sm text-green-600">
              {t('newsletter.success', 'Inscrição realizada com sucesso!')}
            </p>
          )}
          {status === 'error' && (
            <p className="mt-4 text-sm text-red-600">
              {t('newsletter.error', 'Erro ao realizar inscrição. Tente novamente.')}
            </p>
          )}
        </form>
      </div>
    </div>
  )
} 