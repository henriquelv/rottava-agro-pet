'use client'

import React, { useEffect } from 'react'
import { X, CheckCircle, WarningCircle, Info } from 'phosphor-react'
import { Toaster } from 'sonner'

export type ToastType = 'success' | 'error' | 'info'

interface ToastProps {
  message?: string
  type?: 'success' | 'error' | 'info'
  onClose?: () => void
}

export default function Toast() {
  return (
    <Toaster
      position="top-right"
      expand={false}
      richColors
      closeButton
      toastOptions={{
        style: {
          background: 'white',
          color: 'black'
        }
      }}
    />
  )
} 