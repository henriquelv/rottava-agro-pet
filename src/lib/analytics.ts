import { logInfo } from './client-logger'

declare global {
  interface Window {
    gtag: (
      command: string,
      action: string,
      params?: Record<string, any>
    ) => void
    dataLayer: any[]
  }
}

export function trackPageView(url: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_ID!, {
      page_path: url,
    })
    logInfo('Page view tracked', { url })
  }
}

export function trackEvent(action: string, category: string, label: string, value?: number) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
    logInfo('Event tracked', { action, category, label, value })
  }
}

export function trackConversion(conversionId: string, label: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: `${process.env.NEXT_PUBLIC_GA_ID}/${conversionId}`,
      event_callback: () => {
        logInfo('Conversion tracked:', { conversionId, label })
      },
    })
  }
}

export function trackTiming(category: string, variable: string, value: number, label?: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'timing_complete', {
      name: variable,
      value: value,
      event_category: category,
      event_label: label,
    })
    logInfo('Timing tracked', { category, variable, value, label })
  }
}

export function trackError(error: Error) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'exception', {
      description: error.message,
      fatal: false,
    })
    logInfo('Error tracked', { error: error.message })
  }
}

export function trackPerformance(metric: string, value: number) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'timing_complete', {
      name: metric,
      value: value,
      event_category: 'Performance',
    })
    logInfo('Performance tracked', { metric, value })
  }
}

export function trackUserAction(action: string, details?: Record<string, any>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'user_action', {
      action,
      ...details,
    })
    logInfo('User action tracked', { action, details })
  }
}

export function trackApiCall(endpoint: string, method: string, status: number, duration: number) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'api_call', {
      endpoint,
      method,
      status,
      duration,
    })
    logInfo('API call tracked', { endpoint, method, status, duration })
  }
}

export function trackResourceLoad(resource: string, duration: number) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'resource_load', {
      resource,
      duration,
    })
    logInfo('Resource load tracked', { resource, duration })
  }
}

export function trackException(error: Error, context?: Record<string, any>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'exception', {
      description: error.message,
      fatal: true,
      ...context,
    })
    logInfo('Exception tracked', { error: error.message, context })
  }
}

export function trackWarning(message: string, context?: Record<string, any>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'warning', {
      message,
      ...context,
    })
    logInfo('Warning tracked', { message, context })
  }
}

export function trackCustomEvent(name: string, data?: Record<string, any>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', name, data)
    logInfo('Custom event tracked', { name, data })
  }
}

export function setUserProperties(properties: Record<string, any>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('set', 'user_properties', properties)
    logInfo('User properties set', { properties })
  }
} 