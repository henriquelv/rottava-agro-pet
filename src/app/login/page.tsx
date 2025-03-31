'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { toast } from 'sonner'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError('Email ou senha incorretos')
      } else {
        router.push('/')
        router.refresh()
      }
    } catch (error) {
      setError('Ocorreu um erro ao fazer login')
    } finally {
      setIsLoading(false)
    }
  }

  const handleAdminLogin = async () => {
    setIsLoading(true)
    try {
      // Configuração direta para fazer login como administrador
      const result = await signIn('credentials', {
        email: 'henrique.vmoreno@gmail.com',
        password: 'admin123', // Qualquer senha funciona no modo de teste
        redirect: false,
      })

      if (result?.error) {
        toast.error('Erro ao fazer login como administrador')
      } else {
        toast.success('Login como administrador realizado com sucesso')
        router.push('/')
        router.refresh()
      }
    } catch (error) {
      toast.error('Ocorreu um erro ao fazer login')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <Link href="/" className="block text-center">
            <Image
              src="/logo.png"
              alt="Rottava Agro Pet"
              width={200}
              height={80}
              className="mx-auto"
            />
          </Link>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-text">
            Entre na sua conta
          </h2>
          <p className="mt-2 text-center text-sm text-text/60">
            Ou{' '}
            <Link href="/registro" className="font-medium text-primary hover:text-primary-dark">
              crie uma conta gratuita
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
              {error}
            </div>
          )}

          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-text rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="Email"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-text rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="Senha"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-text">
                Lembrar de mim
              </label>
            </div>

            <div className="text-sm">
              <Link href="/esqueci-senha" className="font-medium text-primary hover:text-primary-dark">
                Esqueceu sua senha?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </button>
          </div>
          
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={handleAdminLogin}
              disabled={isLoading}
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Processando...' : 'Entrar como Administrador'}
            </button>
            <p className="mt-2 text-xs text-gray-500">
              Email: henrique.vmoreno@gmail.com
            </p>
          </div>
          
          <div className="mt-6">
            <Link 
              href="/teste-admin" 
              className="flex justify-center text-sm text-primary hover:text-primary-dark"
            >
              Verificar status de autenticação
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
} 