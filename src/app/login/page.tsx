'use client'

import { useState, FormEvent } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import { toast } from 'react-hot-toast'
import { Loader2 } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    if (!email || !senha) {
      toast.error('Por favor, preencha todos os campos')
      return
    }
    
    try {
      setIsLoading(true)
      
      const result = await signIn('credentials', {
        redirect: false,
        email,
        senha,
        callbackUrl: '/'
      })
      
      if (result?.error) {
        toast.error(result.error)
        setIsLoading(false)
        return
      }
      
      toast.success('Login realizado com sucesso!')
      router.replace('/')
      
    } catch (error) {
      console.error('Erro ao fazer login:', error)
      toast.error('Ocorreu um erro ao fazer login. Tente novamente.')
      setIsLoading(false)
    }
  }
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-gray-50">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-md">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Image
              src="/logo.png"
              alt="Rottava Agro Pet"
              width={120}
              height={120}
              className="h-16 w-auto"
            />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Faça seu login</h2>
          <p className="mt-2 text-sm text-gray-600">
            Ou{' '}
            <Link href="/registro" className="font-medium text-green-600 hover:text-green-500">
              crie sua conta
            </Link>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                E-mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                placeholder="seu@email.com"
              />
            </div>
            
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Senha
                </label>
                <Link href="/esqueci-senha" className="text-xs text-green-600 hover:text-green-500">
                  Esqueceu a senha?
                </Link>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>
          
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  Entrando...
                </>
              ) : (
                'Entrar'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 