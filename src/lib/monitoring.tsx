'use client'

import React from 'react'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { logError, logInfo, logWarn } from './client-logger'

interface MonitoringProps {
  children: React.ReactNode
}

export function Monitoring({ children }: MonitoringProps): React.ReactElement {
  return (
    <React.Fragment>
      {children}
      <Analytics />
      <SpeedInsights />
    </React.Fragment>
  )
}

export function trackError(error: Error, context?: Record<string, any>): void {
  logError('Error occurred', { error: error.message, context })
}

export function trackPerformance(metric: string, value: number): void {
  logInfo('Performance metric', { metric, value })
}

export function trackUserAction(action: string, details?: Record<string, any>): void {
  logInfo('User action', { action, details })
}

export function trackApiCall(endpoint: string, method: string, status: number, duration: number): void {
  logInfo('API call', { endpoint, method, status, duration })
}

export function trackResourceLoad(resource: string, duration: number): void {
  logInfo('Resource loaded', { resource, duration })
}

export function trackWarning(message: string, context?: Record<string, any>): void {
  logWarn(message, context)
}

export function trackCustomEvent(name: string, data?: Record<string, any>): void {
  logInfo('Custom event', { name, data })
} 