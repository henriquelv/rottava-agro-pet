import { logInfo, logError } from './logger'
import { sign, verify, decode } from 'jsonwebtoken'
import { hash, compare } from 'bcrypt'
import { addToQueue } from './queue'
import { addSchema } from './api-docs'

// Configuração do sistema de autenticação
const config = {
  jwtSecret: process.env.JWT_SECRET || 'secret',
  jwtExpiresIn: '1h',
  refreshTokenExpiresIn: '7d',
  saltRounds: 10,
  passwordMinLength: 8,
  passwordMaxLength: 32,
  roles: {
    admin: ['*'],
    user: ['read', 'write'],
    guest: ['read'],
  },
}

// Tipos e interfaces
export interface User {
  id: string
  email: string
  name: string
  role: keyof typeof config.roles
  password?: string
  createdAt: Date
  updatedAt: Date
}

export interface AuthResponse {
  user: Omit<User, 'password'>
  token: string
  refreshToken: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  name: string
  password: string
  role?: keyof typeof config.roles
}

// Classe de autenticação
export class Auth {
  // Funções de autenticação
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      this.validateLogin(credentials)

      const user = await this.getUserByEmail(credentials.email)
      if (!user) {
        throw new Error('Usuário não encontrado')
      }

      const isValid = await this.validatePassword(credentials.password, user.password!)
      if (!isValid) {
        throw new Error('Senha inválida')
      }

      const response = await this.generateTokens(user)

      // Adiciona job para notificar login
      await addToQueue('notification', {
        type: 'user_logged_in',
        data: {
          userId: user.id,
          email: user.email,
        },
      })

      return response
    } catch (error) {
      logError('Login failed', { error, email: credentials.email })
      throw error
    }
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      this.validateRegister(data)

      const existingUser = await this.getUserByEmail(data.email)
      if (existingUser) {
        throw new Error('Email já cadastrado')
      }

      const user = await this.createUser(data)
      const response = await this.generateTokens(user)

      // Adiciona job para notificar registro
      await addToQueue('notification', {
        type: 'user_registered',
        data: {
          userId: user.id,
          email: user.email,
          name: user.name,
        },
      })

      return response
    } catch (error) {
      logError('Registration failed', { error, email: data.email })
      throw error
    }
  }

  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    try {
      if (!refreshToken) {
        throw new Error('Refresh token não especificado')
      }

      const decoded = verify(refreshToken, config.jwtSecret) as User
      const user = await this.getUserById(decoded.id)
      if (!user) {
        throw new Error('Usuário não encontrado')
      }

      const response = await this.generateTokens(user)

      // Adiciona job para notificar refresh
      await addToQueue('notification', {
        type: 'token_refreshed',
        data: {
          userId: user.id,
          email: user.email,
        },
      })

      return response
    } catch (error) {
      logError('Token refresh failed', { error })
      throw error
    }
  }

  // Funções auxiliares
  private validateLogin(credentials: LoginCredentials): void {
    if (!credentials.email) {
      throw new Error('Email não especificado')
    }

    if (!credentials.password) {
      throw new Error('Senha não especificada')
    }

    if (!this.isValidEmail(credentials.email)) {
      throw new Error('Email inválido')
    }
  }

  private validateRegister(data: RegisterData): void {
    if (!data.email) {
      throw new Error('Email não especificado')
    }

    if (!data.name) {
      throw new Error('Nome não especificado')
    }

    if (!data.password) {
      throw new Error('Senha não especificada')
    }

    if (!this.isValidEmail(data.email)) {
      throw new Error('Email inválido')
    }

    if (data.password.length < config.passwordMinLength) {
      throw new Error(`Senha deve ter no mínimo ${config.passwordMinLength} caracteres`)
    }

    if (data.password.length > config.passwordMaxLength) {
      throw new Error(`Senha deve ter no máximo ${config.passwordMaxLength} caracteres`)
    }

    if (data.role && !config.roles[data.role]) {
      throw new Error(`Função inválida: ${data.role}`)
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  private async generateTokens(user: User): Promise<AuthResponse> {
    const token = sign({ id: user.id, email: user.email, role: user.role }, config.jwtSecret, {
      expiresIn: config.jwtExpiresIn,
    })

    const refreshToken = sign({ id: user.id }, config.jwtSecret, {
      expiresIn: config.refreshTokenExpiresIn,
    })

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      token,
      refreshToken,
    }
  }

  private async validatePassword(password: string, hash: string): Promise<boolean> {
    return compare(password, hash)
  }

  private async hashPassword(password: string): Promise<string> {
    return hash(password, config.saltRounds)
  }

  // Funções de banco de dados (mock)
  private async getUserByEmail(email: string): Promise<User | null> {
    // Implementação real iria buscar no banco
    return null
  }

  private async getUserById(id: string): Promise<User | null> {
    // Implementação real iria buscar no banco
    return null
  }

  private async createUser(data: RegisterData): Promise<User> {
    // Implementação real iria criar no banco
    const hashedPassword = await this.hashPassword(data.password)
    return {
      id: '1',
      email: data.email,
      name: data.name,
      role: data.role || 'user',
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  }

  // Funções de configuração
  updateConfig(newConfig: Partial<typeof config>) {
    Object.assign(config, newConfig)
    logInfo('Auth config updated', { config })
  }

  getConfig() {
    return { ...config }
  }
}

// Instância padrão
export const auth = new Auth()

// Funções de conveniência
export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  return auth.login(credentials)
}

export async function register(data: RegisterData): Promise<AuthResponse> {
  return auth.register(data)
}

export async function refreshToken(refreshToken: string): Promise<AuthResponse> {
  return auth.refreshToken(refreshToken)
}

// Adiciona schemas para documentação
addSchema('User', {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    email: {
      type: 'string',
      format: 'email',
    },
    name: {
      type: 'string',
    },
    role: {
      type: 'string',
      enum: Object.keys(config.roles),
    },
    password: {
      type: 'string',
    },
    createdAt: {
      type: 'string',
      format: 'date-time',
    },
    updatedAt: {
      type: 'string',
      format: 'date-time',
    },
  },
  required: ['id', 'email', 'name', 'role', 'createdAt', 'updatedAt'],
})

addSchema('AuthResponse', {
  type: 'object',
  properties: {
    user: {
      $ref: '#/components/schemas/User',
    },
    token: {
      type: 'string',
    },
    refreshToken: {
      type: 'string',
    },
  },
  required: ['user', 'token', 'refreshToken'],
})

addSchema('LoginCredentials', {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      format: 'email',
    },
    password: {
      type: 'string',
    },
  },
  required: ['email', 'password'],
})

addSchema('RegisterData', {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      format: 'email',
    },
    name: {
      type: 'string',
    },
    password: {
      type: 'string',
    },
    role: {
      type: 'string',
      enum: Object.keys(config.roles),
    },
  },
  required: ['email', 'name', 'password'],
}) 