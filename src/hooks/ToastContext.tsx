'use client'

import { createContext, useContext, ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'

const ToastContext = createContext(null)

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ToastContext.Provider value={{}}>
      {children}
      <Toaster position="top-right" />
    </ToastContext.Provider>
  )
}

export const useToast = () => useContext(ToastContext) 