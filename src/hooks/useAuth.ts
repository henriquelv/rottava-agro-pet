import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

interface AuthState {
  isAuthenticated: boolean
  user: {
    email: string
    name: string
  } | null
}

export function useAuth() {
  const router = useRouter()
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null
  })

  useEffect(() => {
    // Verifica se existe um token ao montar o componente
    const token = Cookies.get('adminToken')
    if (token) {
      // Aqui você pode fazer uma requisição para a API para validar o token
      // e buscar os dados do usuário
      setAuthState({
        isAuthenticated: true,
        user: {
          email: 'admin@rottava.com.br',
          name: 'Administrador'
        }
      })
    }
  }, [])

  const login = async (email: string, password: string) => {
    try {
      // Aqui você deve fazer a requisição para a API
      // Simulando uma validação simples
      if (email === 'admin@rottava.com.br' && password === 'admin123') {
        // Gerar e salvar o token
        const token = 'dummy-token'
        Cookies.set('adminToken', token, { expires: 7 }) // Expira em 7 dias

        // Atualizar o estado
        setAuthState({
          isAuthenticated: true,
          user: {
            email,
            name: 'Administrador'
          }
        })

        return true
      }

      throw new Error('Credenciais inválidas')
    } catch (error) {
      throw error
    }
  }

  const logout = () => {
    // Remover o token
    Cookies.remove('adminToken')

    // Limpar o estado
    setAuthState({
      isAuthenticated: false,
      user: null
    })

    // Redirecionar para o login
    router.push('/admin/login')
  }

  return {
    ...authState,
    login,
    logout
  }
} 