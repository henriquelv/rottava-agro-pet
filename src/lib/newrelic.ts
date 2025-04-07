import { logInfo } from './logger'

declare global {
  interface Window {
    newrelic: {
      noticeError: (error: Error, customAttributes?: Record<string, any>) => void
      setCustomAttribute: (key: string, value: any) => void
      addPageAction: (name: string, attributes?: Record<string, any>) => void
      setPageViewName: (name: string, host?: string) => void
      setCurrentRouteName: (name: string) => void
      addRelease: (name: string, version: string) => void
      setErrorHandler: (handler: (error: Error) => void) => void
      finished: () => void
    }
  }
}

export function initializeNewRelic() {
  if (typeof window !== 'undefined' && window.newrelic) {
    window.newrelic.setErrorHandler((error) => {
      logInfo('Error handled by New Relic', { error })
    })
    logInfo('New Relic initialized')
  }
}

export function trackError(error: Error, attributes?: Record<string, any>) {
  if (typeof window !== 'undefined' && window.newrelic) {
    window.newrelic.noticeError(error, attributes)
    logInfo('Error tracked by New Relic', { error, attributes })
  }
}

export function setCustomAttribute(key: string, value: any) {
  if (typeof window !== 'undefined' && window.newrelic) {
    window.newrelic.setCustomAttribute(key, value)
    logInfo('Custom attribute set in New Relic', { key, value })
  }
}

export function trackPageAction(name: string, attributes?: Record<string, any>) {
  if (typeof window !== 'undefined' && window.newrelic) {
    window.newrelic.addPageAction(name, attributes)
    logInfo('Page action tracked by New Relic', { name, attributes })
  }
}

export function setPageViewName(name: string, host?: string) {
  if (typeof window !== 'undefined' && window.newrelic) {
    window.newrelic.setPageViewName(name, host)
    logInfo('Page view name set in New Relic', { name, host })
  }
}

export function setCurrentRouteName(name: string) {
  if (typeof window !== 'undefined' && window.newrelic) {
    window.newrelic.setCurrentRouteName(name)
    logInfo('Current route name set in New Relic', { name })
  }
}

export function addRelease(name: string, version: string) {
  if (typeof window !== 'undefined' && window.newrelic) {
    window.newrelic.addRelease(name, version)
    logInfo('Release added to New Relic', { name, version })
  }
}

export function trackApiCall(endpoint: string, method: string, duration: number, status: number) {
  if (typeof window !== 'undefined' && window.newrelic) {
    window.newrelic.addPageAction('api_call', {
      endpoint,
      method,
      duration,
      status,
    })
    logInfo('API call tracked by New Relic', { endpoint, method, duration, status })
  }
}

export function trackResourceLoad(resource: string, duration: number) {
  if (typeof window !== 'undefined' && window.newrelic) {
    window.newrelic.addPageAction('resource_load', {
      resource,
      duration,
    })
    logInfo('Resource load tracked by New Relic', { resource, duration })
  }
}

export function trackUserAction(action: string, details?: Record<string, any>) {
  if (typeof window !== 'undefined' && window.newrelic) {
    window.newrelic.addPageAction('user_action', {
      action,
      ...details,
    })
    logInfo('User action tracked by New Relic', { action, details })
  }
}

export function trackCustomEvent(name: string, data?: Record<string, any>) {
  if (typeof window !== 'undefined' && window.newrelic) {
    window.newrelic.addPageAction(name, data)
    logInfo('Custom event tracked by New Relic', { name, data })
  }
}

export function trackPerformance(metric: string, value: number) {
  if (typeof window !== 'undefined' && window.newrelic) {
    window.newrelic.addPageAction('performance', {
      metric,
      value,
    })
    logInfo('Performance tracked by New Relic', { metric, value })
  }
}

export function trackException(error: Error, context?: Record<string, any>) {
  if (typeof window !== 'undefined' && window.newrelic) {
    window.newrelic.noticeError(error, context)
    logInfo('Exception tracked by New Relic', { error, context })
  }
}

export function trackWarning(message: string, context?: Record<string, any>) {
  if (typeof window !== 'undefined' && window.newrelic) {
    window.newrelic.addPageAction('warning', {
      message,
      ...context,
    })
    logInfo('Warning tracked by New Relic', { message, context })
  }
} 