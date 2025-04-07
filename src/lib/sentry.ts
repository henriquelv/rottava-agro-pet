import * as Sentry from '@sentry/nextjs'
import { logError } from './logger'

export function initializeSentry() {
  if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      tracesSampleRate: 1.0,
      environment: process.env.NODE_ENV,
      release: process.env.npm_package_version,
      beforeSend(event) {
        logError('Sentry event', { event })
        return event
      },
    })
  }
}

export function captureException(error: Error, context?: Record<string, any>) {
  if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
    Sentry.captureException(error, {
      contexts: {
        ...context,
      },
    })
    logError('Exception captured by Sentry', { error, context })
  }
}

export function captureMessage(message: string, level: Sentry.SeverityLevel = 'info') {
  if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
    Sentry.captureMessage(message, level)
    logError('Message captured by Sentry', { message, level })
  }
}

export function setUser(user: { id: string; email: string; name?: string }) {
  if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
    Sentry.setUser(user)
    logError('User set in Sentry', { user })
  }
}

export function setTag(key: string, value: string) {
  if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
    Sentry.setTag(key, value)
    logError('Tag set in Sentry', { key, value })
  }
}

export function setContext(key: string, context: Record<string, any>) {
  if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
    Sentry.setContext(key, context)
    logError('Context set in Sentry', { key, context })
  }
}

export function addBreadcrumb(breadcrumb: Sentry.Breadcrumb) {
  if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
    Sentry.addBreadcrumb(breadcrumb)
    logError('Breadcrumb added to Sentry', { breadcrumb })
  }
}

export function withSentry<T>(fn: () => T): T {
  if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
    return Sentry.withScope(() => {
      try {
        return fn()
      } catch (error) {
        captureException(error as Error)
        throw error
      }
    })
  }
  return fn()
}

export function wrapApiHandler<T extends (...args: any[]) => any>(
  handler: T
): (...args: Parameters<T>) => ReturnType<T> {
  if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
    return Sentry.withSentry(handler)
  }
  return handler
} 