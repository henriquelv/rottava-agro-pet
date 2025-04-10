import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import fs from 'fs'
import path from 'path'

// Interface para usuários
interface Usuario {
  id: string
  email: string
  nome: string
  senha: string
  role: string
}

// Função para carregar usuários do arquivo JSON
const getUsuarios = (): Usuario[] => {
  const filePath = path.join(process.cwd(), 'src/data/usuarios.json')
  
  // Verifica se o arquivo existe
  if (!fs.existsSync(filePath)) {
    // Cria o diretório se não existir
    const dir = path.dirname(filePath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    
    // Cria um usuário admin padrão com senha hasheada
    const adminPassword = bcrypt.hashSync('admin123', 10)
    const usuarios = [
      {
        id: '1',
        email: 'admin@rottavaagropet.com.br',
        nome: 'Administrador',
        senha: adminPassword,
        role: 'admin'
      }
    ]
    
    // Salva no arquivo
    fs.writeFileSync(filePath, JSON.stringify(usuarios, null, 2))
    return usuarios
  }
  
  try {
    const data = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Erro ao ler arquivo de usuários:', error)
    return []
  }
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        senha: { label: 'Senha', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.senha) {
          throw new Error('Email e senha são obrigatórios')
        }

        const usuarios = getUsuarios()
        const usuario = usuarios.find(u => u.email === credentials.email)

        if (!usuario) {
          throw new Error('Usuário não encontrado')
        }

        const senhaCorreta = await bcrypt.compare(credentials.senha, usuario.senha)

        if (!senhaCorreta) {
          throw new Error('Senha incorreta')
        }

        return {
          id: usuario.id,
          email: usuario.email,
          name: usuario.nome,
          role: usuario.role
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string
        session.user.id = token.id as string
      }
      return session
    }
  },
  pages: {
    signIn: '/login',
    error: '/auth/error'
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60 // 30 dias
  },
  secret: process.env.NEXTAUTH_SECRET || 'minha-chave-secreta-fallback'
})

export { handler as GET, handler as POST } 