'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

const errors: Record<string, string> = {
  Signin: "Tente entrar com uma conta diferente.",
  OAuthSignin: "Tente entrar com uma conta diferente.",
  OAuthCallback: "Tente entrar com uma conta diferente.",
  OAuthCreateAccount: "Tente entrar com uma conta diferente.",
  EmailCreateAccount: "Tente entrar com uma conta diferente.",
  Callback: "Tente entrar com uma conta diferente.",
  OAuthAccountNotLinked: "Essa conta já está associada a outra credencial.",
  EmailSignin: "Verifique seu email.",
  CredentialsSignin: "Falha no login. Verifique se o email e senha estão corretos.",
  SessionRequired: "Faça login para acessar esta página.",
  default: "Não foi possível fazer login."
}

export default function AuthError() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [errorMessage, setErrorMessage] = useState<string>('')

  useEffect(() => {
    const error = searchParams.get('error')
    setErrorMessage(error && error in errors ? errors[error] : errors.default)
  }, [searchParams])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-gray-50">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-md">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Ocorreu um erro</h2>
          <p className="mt-2 text-sm text-gray-600">{errorMessage}</p>
        </div>
        
        <div className="flex flex-col space-y-4">
          <Link 
            href="/login"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Voltar para login
          </Link>
          
          <Link 
            href="/"
            className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Ir para página inicial
          </Link>
        </div>
      </div>
    </div>
  )
} 