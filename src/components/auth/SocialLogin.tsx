'use client'

import React from 'react'
import { GoogleLogo, FacebookLogo } from 'phosphor-react'
import { useAuth } from '@/hooks/AuthContext'
import { useToast } from '@/hooks/ToastContext'

export default function SocialLogin() {
  const { signIn, isLoading } = useAuth()
  const { showToast } = useToast()

  const handleSocialLogin = async (provider: 'google' | 'facebook') => {
    try {
      await signIn(provider)
      showToast('Login realizado com sucesso!', 'success')
    } catch (error) {
      showToast('Erro ao realizar login. Tente novamente.', 'error')
    }
  }

  return (
    <div className="space-y-4">
      <button
        onClick={() => handleSocialLogin('google')}
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-3 px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <GoogleLogo size={24} weight="bold" className="text-red-500" />
        <span>Continuar com Google</span>
      </button>

      <button
        onClick={() => handleSocialLogin('facebook')}
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-3 px-4 py-2 bg-[#1877F2] text-white rounded-lg hover:bg-[#1865D1] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FacebookLogo size={24} weight="bold" />
        <span>Continuar com Facebook</span>
      </button>

      <p className="text-sm text-center text-gray-500">
        Ao continuar, você concorda com nossos{' '}
        <a href="/termos" className="text-primary hover:underline">
          Termos de Uso
        </a>{' '}
        e{' '}
        <a href="/privacidade" className="text-primary hover:underline">
          Política de Privacidade
        </a>
        .
      </p>
    </div>
  )
} 