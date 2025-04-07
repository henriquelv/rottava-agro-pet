declare global {
  interface Window {
    Tawk_API?: {
      showWidget: () => void
      hideWidget: () => void
      maximizeWidget: () => void
      minimizeWidget: () => void
      toggleVisibility: () => void
      getStatus: () => 'online' | 'away' | 'offline'
      isChatMinimized: () => boolean
      isChatHidden: () => boolean
      isChatOngoing: () => boolean
      isVisitorEngaged: () => boolean
      onLoad: () => void
      onStatusChange: (callback: (status: string) => void) => void
      onBeforeLoad: (callback: () => void) => void
      onChatMaximized: (callback: () => void) => void
      onChatMinimized: (callback: () => void) => void
      onChatHidden: (callback: () => void) => void
      onChatStarted: (callback: () => void) => void
      onChatEnded: (callback: () => void) => void
      onPrechatSubmit: (callback: (data: any) => void) => void
      onOfflineSubmit: (callback: (data: any) => void) => void
      onChatMessageVisitor: (callback: (message: string) => void) => void
      onChatMessageAgent: (callback: (message: string) => void) => void
      onChatMessageSystem: (callback: (message: string) => void) => void
      onAgentJoinChat: (callback: (data: any) => void) => void
      onAgentLeaveChat: (callback: (data: any) => void) => void
      onFileUpload: (callback: (data: any) => void) => void
      onManualTrigger: (callback: (data: any) => void) => void
      onAutoStart: (callback: (data: any) => void) => void
      onBeforeUnload: (callback: () => void) => void
      setAttributes: (attributes: Record<string, any>) => void
      visitor: {
        name: string
        email: string
        hash: string
      }
    }
    Tawk_LoadStart?: Date
  }
}

export interface TawkConfig {
  propertyId: string
  widgetId: string
  baseUrl?: string
  s1?: string
  s2?: string
  s3?: string
}

export interface TawkVisitor {
  name: string
  email: string
  hash: string
}

let tawkInitialized = false
let tawkConfig: TawkConfig | null = null

export function initializeTawk(config: TawkConfig): void {
  if (typeof window === 'undefined' || tawkInitialized) return

  tawkConfig = config
  const Tawk_API = window.Tawk_API || {}
  const Tawk_LoadStart = new Date()

  window.Tawk_API = Tawk_API
  window.Tawk_LoadStart = Tawk_LoadStart

  const script = document.createElement('script')
  script.async = true
  script.src = `${config.baseUrl || 'https://embed.tawk.to'}/${config.propertyId}/${config.widgetId}`
  script.charset = 'UTF-8'
  script.setAttribute('crossorigin', '*')

  if (config.s1) script.setAttribute('s1', config.s1)
  if (config.s2) script.setAttribute('s2', config.s2)
  if (config.s3) script.setAttribute('s3', config.s3)

  document.head.appendChild(script)
  tawkInitialized = true

  return () => {
    document.head.removeChild(script)
    tawkInitialized = false
  }
}

export function showTawkWidget(): void {
  if (typeof window === 'undefined' || !window.Tawk_API) return
  window.Tawk_API.showWidget()
}

export function hideTawkWidget(): void {
  if (typeof window === 'undefined' || !window.Tawk_API) return
  window.Tawk_API.hideWidget()
}

export function maximizeTawkWidget(): void {
  if (typeof window === 'undefined' || !window.Tawk_API) return
  window.Tawk_API.maximizeWidget()
}

export function minimizeTawkWidget(): void {
  if (typeof window === 'undefined' || !window.Tawk_API) return
  window.Tawk_API.minimizeWidget()
}

export function toggleTawkWidget(): void {
  if (typeof window === 'undefined' || !window.Tawk_API) return
  window.Tawk_API.toggleVisibility()
}

export function getTawkStatus(): 'online' | 'away' | 'offline' | null {
  if (typeof window === 'undefined' || !window.Tawk_API) return null
  return window.Tawk_API.getStatus()
}

export function isTawkChatMinimized(): boolean {
  if (typeof window === 'undefined' || !window.Tawk_API) return false
  return window.Tawk_API.isChatMinimized()
}

export function isTawkChatHidden(): boolean {
  if (typeof window === 'undefined' || !window.Tawk_API) return false
  return window.Tawk_API.isChatHidden()
}

export function isTawkChatOngoing(): boolean {
  if (typeof window === 'undefined' || !window.Tawk_API) return false
  return window.Tawk_API.isChatOngoing()
}

export function isTawkVisitorEngaged(): boolean {
  if (typeof window === 'undefined' || !window.Tawk_API) return false
  return window.Tawk_API.isVisitorEngaged()
}

export function setTawkVisitor(visitor: TawkVisitor): void {
  if (typeof window === 'undefined' || !window.Tawk_API) return
  window.Tawk_API.visitor = visitor
}

export function setTawkAttributes(attributes: Record<string, any>): void {
  if (typeof window === 'undefined' || !window.Tawk_API) return
  window.Tawk_API.setAttributes(attributes)
}

export function onTawkStatusChange(callback: (status: string) => void): void {
  if (typeof window === 'undefined' || !window.Tawk_API) return
  window.Tawk_API.onStatusChange(callback)
}

export function onTawkChatStarted(callback: () => void): void {
  if (typeof window === 'undefined' || !window.Tawk_API) return
  window.Tawk_API.onChatStarted(callback)
}

export function onTawkChatEnded(callback: () => void): void {
  if (typeof window === 'undefined' || !window.Tawk_API) return
  window.Tawk_API.onChatEnded(callback)
}

export function onTawkChatMessageVisitor(callback: (message: string) => void): void {
  if (typeof window === 'undefined' || !window.Tawk_API) return
  window.Tawk_API.onChatMessageVisitor(callback)
}

export function onTawkChatMessageAgent(callback: (message: string) => void): void {
  if (typeof window === 'undefined' || !window.Tawk_API) return
  window.Tawk_API.onChatMessageAgent(callback)
}

export function onTawkChatMessageSystem(callback: (message: string) => void): void {
  if (typeof window === 'undefined' || !window.Tawk_API) return
  window.Tawk_API.onChatMessageSystem(callback)
} 