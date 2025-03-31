'use client'

import { useAuth } from '@/hooks/useAuth'

export default function TesteAdmin() {
  const { user, isAuthenticated } = useAuth()

  return (
    <div className="container mx-auto p-8 mt-20">
      <h1 className="text-2xl font-bold mb-4">Teste de Administração</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Status de Autenticação</h2>
        <p>
          <span className="font-bold">Autenticado:</span>{' '}
          <span className={isAuthenticated ? 'text-green-600' : 'text-red-600'}>
            {isAuthenticated ? 'Sim' : 'Não'}
          </span>
        </p>
        
        {isAuthenticated && user && (
          <>
            <h2 className="text-xl font-semibold mt-6 mb-4">Informações do Usuário</h2>
            <p><span className="font-bold">Nome:</span> {user.name}</p>
            <p><span className="font-bold">Email:</span> {user.email}</p>
            <p>
              <span className="font-bold">É admin:</span>{' '}
              <span className={user.email === 'henrique.vmoreno@gmail.com' ? 'text-green-600' : 'text-red-600'}>
                {user.email === 'henrique.vmoreno@gmail.com' ? 'Sim' : 'Não'}
              </span>
            </p>
            <p><span className="font-bold">Tipo:</span> {user.role}</p>
          </>
        )}
        
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Instruções:</h2>
          <ol className="list-decimal ml-6 space-y-2">
            <li>Se você não está autenticado, faça login em <a href="/login" className="text-primary hover:underline">/login</a>.</li>
            <li>Use o email <code className="bg-gray-100 px-2 py-1 rounded">henrique.vmoreno@gmail.com</code> para fazer login como administrador.</li>
            <li>Após o login, retorne a esta página para verificar seu status.</li>
            <li>Se estiver autenticado como administrador, o botão de administração deve aparecer no menu.</li>
          </ol>
        </div>
      </div>
    </div>
  )
} 