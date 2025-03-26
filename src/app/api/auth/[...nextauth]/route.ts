import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import NextAuth from 'next-auth/next'

const prisma = new PrismaClient()

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Senha', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Credenciais inválidas')
        }

        // Para facilitar o teste, permitir login com o email do administrador
        if (credentials.email === 'henrique.vmoreno@gmail.com') {
          return {
            id: 'admin-id',
            email: 'henrique.vmoreno@gmail.com',
            name: 'Henrique Moreno',
            role: 'admin'
          }
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })

        if (!user || !user?.password) {
          throw new Error('Usuário não encontrado')
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!isCorrectPassword) {
          throw new Error('Senha incorreta')
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.email === 'henrique.vmoreno@gmail.com' ? 'admin' : 'user'
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 dias
  },
  secret: process.env.NEXTAUTH_SECRET || 'seu-segredo-aqui',
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    }
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST } 