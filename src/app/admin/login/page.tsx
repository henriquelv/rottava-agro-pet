'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/AuthContext'
import { Lock, Envelope } from 'phosphor-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const { signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await signIn({ email, password })
      router.push('/admin/dashboard')
    } catch (err) {
      setError('Email ou senha inválidos')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-sm">
        <h1 className="text-2xl font-bold text-center mb-8">
          Login Administrativo
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Email
            </label>
            <div className="relative">
              <Envelope
                className="absolute left-3 top-1/2 -translate-y-1/2 text-text/40"
                size={20}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary/20 transition-shadow"
                placeholder="admin@rottavaagropet.com.br"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Senha
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-text/40"
                size={20}
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary/20 transition-shadow"
                placeholder="admin123"
                required
              />
            </div>
          </div>

          {error && (
            <p className="text-red-600 text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div className="mt-4 text-sm text-gray-600">
          <p>Credenciais de teste:</p>
          <p>Email: admin@rottavaagropet.com.br</p>
          <p>Senha: admin123</p>
        </div>
      </div>
    </div>
  )
} 