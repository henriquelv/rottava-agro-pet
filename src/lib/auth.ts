import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { userRepository } from '@/database/repositories';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Senha', type: 'password' },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error('Email e senha são obrigatórios');
          }

          const user = await userRepository.findByEmail(credentials.email);

          if (!user) {
            throw new Error('Usuário não encontrado');
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordValid) {
            throw new Error('Senha inválida');
          }

          // Atualizar último login
          await userRepository.update(user.id, {
            lastLoginAt: new Date()
          });

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            phone: user.phone,
            address: user.address,
            preferences: user.preferences
          };
        } catch (error) {
          console.error('Erro na autenticação:', error);
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === 'update' && session) {
        // Atualizar o token quando a sessão for atualizada
        return { ...token, ...session.user };
      }

      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.phone = user.phone;
        token.address = user.address;
        token.preferences = user.preferences;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.phone = token.phone;
        session.user.address = token.address;
        session.user.preferences = token.preferences;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login?error=true',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 dias
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
  events: {
    async signIn({ user }) {
      try {
        // Carregar ou criar carrinho do usuário
        const cart = await userRepository.getOrCreateCart(user.id);
        console.log('Carrinho do usuário carregado:', cart.id);
      } catch (error) {
        console.error('Erro ao carregar carrinho do usuário:', error);
      }
    },
    async signOut({ token }) {
      try {
        // Salvar estado do carrinho antes do logout
        await userRepository.saveCartState(token.id);
      } catch (error) {
        console.error('Erro ao salvar estado do carrinho:', error);
      }
    }
  }
}; 