"use client"

import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Loader2 } from "lucide-react"

interface RouteGuardProps {
  children: React.ReactNode
  allowedUserTypes?: ('instructor' | 'learner')[]
  redirectTo?: string
}

export function RouteGuard({ 
  children, 
  allowedUserTypes = ['instructor', 'learner'],
  redirectTo = '/'
}: RouteGuardProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push(redirectTo)
        return
      }

      if (!allowedUserTypes.includes(user.userType)) {
        // Redirect based on user type
        if (user.userType === 'instructor') {
          router.push('/dashboard')
        } else {
          router.push('/chat')
        }
      }
    }
  }, [user, isLoading, router, allowedUserTypes, redirectTo])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-slate-600" />
      </div>
    )
  }

  if (!user || !allowedUserTypes.includes(user.userType)) {
    return null
  }

  return <>{children}</>
}
