"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { AuthUser } from '@/lib/auth'

interface AuthContextType {
  user: AuthUser | null
  login: (user: AuthUser) => void
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored auth on mount
    const stored = localStorage.getItem('auth-user')
    if (stored) {
      try {
        setUser(JSON.parse(stored))
      } catch (error) {
        localStorage.removeItem('auth-user')
      }
    }
    setIsLoading(false)
  }, [])

  const login = (userData: AuthUser) => {
    setUser(userData)
    localStorage.setItem('auth-user', JSON.stringify(userData))
  }

  const logout = async () => {
    try {
      // Call logout API
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      })
    } catch (error) {
      console.error('Logout API error:', error)
    } finally {
      // Clear user state and localStorage regardless of API success
      setUser(null)
      localStorage.removeItem('auth-user')
      
      // Redirect to home page
      window.location.href = '/'
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
