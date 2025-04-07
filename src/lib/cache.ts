import { logInfo, logError } from './logger'
import { getCache, setCache, deleteCache, clearCache } from './redis'
import { addToQueue } from './queue'
import { addSchema } from './api-docs'

// Tipos de cache
export type CacheType = 'memory' | 'redis'

// Interface para configuração de cache
export interface CacheConfig {
  type: CacheType
  ttl?: number
  prefix?: string
}

// Configuração padrão
const defaultConfig: CacheConfig = {
  type: 'redis',
  ttl: 3600, // 1 hora
  prefix: 'cache:',
}

// Configuração do sistema de cache
const config = {
  providers: {
    redis: {
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
      password: process.env.REDIS_PASSWORD,
      database: parseInt(process.env.REDIS_DB || '0'),
    },
    memory: {
      maxSize: 100 * 1024 * 1024, // 100MB
    },
  },
  defaultProvider: 'redis',
  defaultTTL: 3600, // 1 hora
  prefix: 'rottava:',
  compression: {
    enabled: true,
    threshold: 1024, // 1KB
  },
}

// Tipos e interfaces
export type CacheProvider = 'redis' | 'memory'

export interface CacheData {
  key: string
  value: any
  ttl?: number
  provider?: CacheProvider
}

export interface CacheResponse {
  key: string
  value: any
  ttl: number
  provider: CacheProvider
  cachedAt: Date
}

// Classe de cache
export class Cache {
  private config: CacheConfig
  private memoryCache: Map<string, { value: any; expires: number }>
  private store: Map<string, CacheResponse> = new Map()

  constructor(config: Partial<CacheConfig> = {}) {
    this.config = { ...defaultConfig, ...config }
    this.memoryCache = new Map()
  }

  // Funções para gerenciamento de cache
  async get<T>(key: string): Promise<T | null> {
    const cacheKey = this.getCacheKey(key)

    if (this.config.type === 'memory') {
      const item = this.memoryCache.get(cacheKey)
      if (item && item.expires > Date.now()) {
        logInfo('Cache hit (memory)', { key })
        return item.value as T
      }
      this.memoryCache.delete(cacheKey)
      return null
    }

    const value = await getCache<T>(cacheKey)
    if (value) {
      logInfo('Cache hit (redis)', { key })
    } else {
      logInfo('Cache miss', { key })
    }
    return value
  }

  async set(key: string, value: any, ttl?: number): Promise<void> {
    const cacheKey = this.getCacheKey(key)
    const expires = Date.now() + (ttl || this.config.ttl) * 1000

    if (this.config.type === 'memory') {
      this.memoryCache.set(cacheKey, { value, expires })
      logInfo('Cache set (memory)', { key, ttl })
      return
    }

    await setCache(cacheKey, value, ttl || this.config.ttl)
    logInfo('Cache set (redis)', { key, ttl })
  }

  async delete(key: string): Promise<void> {
    const cacheKey = this.getCacheKey(key)

    if (this.config.type === 'memory') {
      this.memoryCache.delete(cacheKey)
      logInfo('Cache deleted (memory)', { key })
      return
    }

    await deleteCache(cacheKey)
    logInfo('Cache deleted (redis)', { key })
  }

  async clear(): Promise<void> {
    if (this.config.type === 'memory') {
      this.memoryCache.clear()
      logInfo('Cache cleared (memory)')
      return
    }

    await clearCache()
    logInfo('Cache cleared (redis)')
  }

  // Funções para gerenciamento de cache em lote
  async mget<T>(keys: string[]): Promise<(T | null)[]> {
    const cacheKeys = keys.map((key) => this.getCacheKey(key))

    if (this.config.type === 'memory') {
      return cacheKeys.map((key) => {
        const item = this.memoryCache.get(key)
        if (item && item.expires > Date.now()) {
          return item.value as T
        }
        this.memoryCache.delete(key)
        return null
      })
    }

    const values = await Promise.all(
      cacheKeys.map((key) => getCache<T>(key))
    )
    logInfo('Multiple cache items retrieved', { keys })
    return values
  }

  async mset(
    items: Array<{ key: string; value: any; ttl?: number }>
  ): Promise<void> {
    if (this.config.type === 'memory') {
      items.forEach(({ key, value, ttl }) => {
        const cacheKey = this.getCacheKey(key)
        const expires = Date.now() + (ttl || this.config.ttl) * 1000
        this.memoryCache.set(cacheKey, { value, expires })
      })
      logInfo('Multiple cache items set (memory)', { count: items.length })
      return
    }

    await Promise.all(
      items.map(({ key, value, ttl }) =>
        setCache(this.getCacheKey(key), value, ttl || this.config.ttl)
      )
    )
    logInfo('Multiple cache items set (redis)', { count: items.length })
  }

  // Funções para verificação de cache
  async exists(key: string): Promise<boolean> {
    const cacheKey = this.getCacheKey(key)

    if (this.config.type === 'memory') {
      const item = this.memoryCache.get(cacheKey)
      return !!(item && item.expires > Date.now())
    }

    const value = await getCache(cacheKey)
    return value !== null
  }

  // Funções para configuração
  updateConfig(config: Partial<CacheConfig>) {
    this.config = { ...this.config, ...config }
    logInfo('Cache config updated', { config })
  }

  getConfig(): CacheConfig {
    return { ...this.config }
  }

  // Funções auxiliares
  private getCacheKey(key: string): string {
    return `${this.config.prefix}${key}`
  }

  // Funções de cache
  async set(data: CacheData): Promise<CacheResponse> {
    try {
      this.validateData(data)

      const response = await this.setWithProvider(data)

      // Adiciona job para notificar cache
      await addToQueue('notification', {
        type: 'cache_set',
        data: {
          key: response.key,
          ttl: response.ttl,
          provider: response.provider,
        },
      })

      return response
    } catch (error) {
      logError('Cache set failed', { error, data })
      throw error
    }
  }

  async get(key: string, provider?: CacheProvider): Promise<CacheResponse | null> {
    try {
      if (!key) {
        throw new Error('Chave não especificada')
      }

      const response = await this.getWithProvider(key, provider)

      if (response) {
        // Adiciona job para notificar cache
        await addToQueue('notification', {
          type: 'cache_get',
          data: {
            key: response.key,
            ttl: response.ttl,
            provider: response.provider,
          },
        })
      }

      return response
    } catch (error) {
      logError('Cache get failed', { error, key })
      throw error
    }
  }

  async delete(key: string, provider?: CacheProvider): Promise<void> {
    try {
      if (!key) {
        throw new Error('Chave não especificada')
      }

      await this.deleteWithProvider(key, provider)

      // Adiciona job para notificar cache
      await addToQueue('notification', {
        type: 'cache_delete',
        data: {
          key,
          provider,
        },
      })
    } catch (error) {
      logError('Cache delete failed', { error, key })
      throw error
    }
  }

  async clear(provider?: CacheProvider): Promise<void> {
    try {
      await this.clearWithProvider(provider)

      // Adiciona job para notificar cache
      await addToQueue('notification', {
        type: 'cache_clear',
        data: {
          provider,
        },
      })
    } catch (error) {
      logError('Cache clear failed', { error })
      throw error
    }
  }

  // Funções auxiliares
  private validateData(data: CacheData): void {
    if (!data.key) {
      throw new Error('Chave não especificada')
    }

    if (data.value === undefined) {
      throw new Error('Valor não especificado')
    }

    if (data.ttl && data.ttl < 0) {
      throw new Error('TTL deve ser maior que 0')
    }

    if (data.provider && !config.providers[data.provider]) {
      throw new Error(`Provedor inválido: ${data.provider}`)
    }
  }

  private async setWithProvider(data: CacheData): Promise<CacheResponse> {
    // Implementação real iria salvar no provedor escolhido
    const provider = data.provider || config.defaultProvider

    return {
      key: data.key,
      value: data.value,
      ttl: data.ttl || config.defaultTTL,
      provider,
      cachedAt: new Date(),
    }
  }

  private async getWithProvider(
    key: string,
    provider?: CacheProvider
  ): Promise<CacheResponse | null> {
    // Implementação real iria buscar no provedor escolhido
    const selectedProvider = provider || config.defaultProvider

    // Simula cache miss
    if (Math.random() > 0.5) {
      return null
    }

    return {
      key,
      value: 'cached-value',
      ttl: config.defaultTTL,
      provider: selectedProvider,
      cachedAt: new Date(),
    }
  }

  private async deleteWithProvider(key: string, provider?: CacheProvider): Promise<void> {
    // Implementação real iria deletar do provedor escolhido
    logInfo('Cache deleted', { key, provider })
  }

  private async clearWithProvider(provider?: CacheProvider): Promise<void> {
    // Implementação real iria limpar o provedor escolhido
    logInfo('Cache cleared', { provider })
  }

  // Funções de configuração
  updateConfig(newConfig: Partial<typeof config>) {
    Object.assign(config, newConfig)
    logInfo('Cache config updated', { config })
  }

  getConfig() {
    return { ...config }
  }
}

// Instância padrão
export const cache = new Cache()

// Funções de conveniência
export async function getCached<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl?: number
): Promise<T> {
  const cached = await cache.get<T>(key)
  if (cached !== null) {
    return cached
  }

  const value = await fetcher()
  await cache.set(key, value, ttl)
  return value
}

export async function invalidateCache(pattern: string): Promise<void> {
  // Implementar lógica para invalidar cache por padrão
  logInfo('Cache invalidated by pattern', { pattern })
}

export async function getCacheStats(): Promise<{
  hits: number
  misses: number
  size: number
}> {
  // Implementar lógica para obter estatísticas de cache
  return {
    hits: 0,
    misses: 0,
    size: 0,
  }
}

// Adiciona schemas para documentação
addSchema('CacheData', {
  type: 'object',
  properties: {
    key: {
      type: 'string',
    },
    value: {
      type: 'any',
    },
    ttl: {
      type: 'integer',
      minimum: 0,
    },
    provider: {
      type: 'string',
      enum: ['redis', 'memory'],
    },
  },
  required: ['key', 'value'],
})

addSchema('CacheResponse', {
  type: 'object',
  properties: {
    key: {
      type: 'string',
    },
    value: {
      type: 'any',
    },
    ttl: {
      type: 'integer',
      minimum: 0,
    },
    provider: {
      type: 'string',
      enum: ['redis', 'memory'],
    },
    cachedAt: {
      type: 'string',
      format: 'date-time',
    },
  },
  required: ['key', 'value', 'ttl', 'provider', 'cachedAt'],
}) 