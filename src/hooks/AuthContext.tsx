'use client'
import { createContext, useContext, useState, ReactNode } from 'react'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null)
  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext) 