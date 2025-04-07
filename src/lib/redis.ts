import { createClient } from 'redis'
import { logInfo } from './logger'

let redisClient: ReturnType<typeof createClient> | null = null

export async function getRedisClient() {
  if (!redisClient) {
    redisClient = createClient({
      url: process.env.REDIS_URL,
    })

    redisClient.on('error', (err) => {
      logInfo('Redis Client Error', { error: err })
    })

    await redisClient.connect()
    logInfo('Redis Client Connected')
  }

  return redisClient
}

export async function setCache(key: string, value: any, ttl?: number) {
  const client = await getRedisClient()
  const serializedValue = JSON.stringify(value)
  
  if (ttl) {
    await client.set(key, serializedValue, {
      EX: ttl,
    })
  } else {
    await client.set(key, serializedValue)
  }
  
  logInfo('Cache set', { key, ttl })
}

export async function getCache<T>(key: string): Promise<T | null> {
  const client = await getRedisClient()
  const value = await client.get(key)
  
  if (value) {
    logInfo('Cache hit', { key })
    return JSON.parse(value) as T
  }
  
  logInfo('Cache miss', { key })
  return null
}

export async function deleteCache(key: string) {
  const client = await getRedisClient()
  await client.del(key)
  logInfo('Cache deleted', { key })
}

export async function clearCache() {
  const client = await getRedisClient()
  await client.flushAll()
  logInfo('Cache cleared')
}

export async function enqueue(queue: string, data: any) {
  const client = await getRedisClient()
  await client.lPush(queue, JSON.stringify(data))
  logInfo('Item enqueued', { queue, data })
}

export async function dequeue<T>(queue: string): Promise<T | null> {
  const client = await getRedisClient()
  const data = await client.rPop(queue)
  
  if (data) {
    logInfo('Item dequeued', { queue })
    return JSON.parse(data) as T
  }
  
  return null
}

export async function getQueueLength(queue: string) {
  const client = await getRedisClient()
  const length = await client.lLen(queue)
  logInfo('Queue length', { queue, length })
  return length
}

export async function peekQueue<T>(queue: string): Promise<T | null> {
  const client = await getRedisClient()
  const data = await client.lIndex(queue, -1)
  
  if (data) {
    logInfo('Queue peeked', { queue })
    return JSON.parse(data) as T
  }
  
  return null
}

export async function removeFromQueue(queue: string, count: number, value: any) {
  const client = await getRedisClient()
  await client.lRem(queue, count, JSON.stringify(value))
  logInfo('Item removed from queue', { queue, count, value })
}

export async function addToSet(key: string, value: any) {
  const client = await getRedisClient()
  await client.sAdd(key, JSON.stringify(value))
  logInfo('Item added to set', { key, value })
}

export async function removeFromSet(key: string, value: any) {
  const client = await getRedisClient()
  await client.sRem(key, JSON.stringify(value))
  logInfo('Item removed from set', { key, value })
}

export async function isInSet(key: string, value: any) {
  const client = await getRedisClient()
  const isMember = await client.sIsMember(key, JSON.stringify(value))
  logInfo('Set membership checked', { key, value, isMember })
  return isMember
}

export async function getSetMembers<T>(key: string): Promise<T[]> {
  const client = await getRedisClient()
  const members = await client.sMembers(key)
  logInfo('Set members retrieved', { key })
  return members.map((member) => JSON.parse(member) as T)
}

export async function incrementCounter(key: string, by = 1) {
  const client = await getRedisClient()
  const value = await client.incrBy(key, by)
  logInfo('Counter incremented', { key, by, value })
  return value
}

export async function decrementCounter(key: string, by = 1) {
  const client = await getRedisClient()
  const value = await client.decrBy(key, by)
  logInfo('Counter decremented', { key, by, value })
  return value
}

export async function getCounter(key: string) {
  const client = await getRedisClient()
  const value = await client.get(key)
  logInfo('Counter retrieved', { key, value })
  return value ? parseInt(value, 10) : 0
}

export async function setExpire(key: string, seconds: number) {
  const client = await getRedisClient()
  await client.expire(key, seconds)
  logInfo('Key expiration set', { key, seconds })
}

export async function getTTL(key: string) {
  const client = await getRedisClient()
  const ttl = await client.ttl(key)
  logInfo('Key TTL retrieved', { key, ttl })
  return ttl
}

export async function exists(key: string) {
  const client = await getRedisClient()
  const exists = await client.exists(key)
  logInfo('Key existence checked', { key, exists })
  return exists === 1
}

export async function closeRedis() {
  if (redisClient) {
    await redisClient.quit()
    redisClient = null
    logInfo('Redis Client Closed')
  }
} 