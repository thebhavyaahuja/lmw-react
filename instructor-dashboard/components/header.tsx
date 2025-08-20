"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, User, LogOut, Bell } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useAuth } from "@/hooks/use-auth"

const navigation = [
  { name: "Courses", href: "/dashboard" },
  { name: "Library", href: "/library" },
  { name: "Upload", href: "/upload" },
  { name: "SME Chat", href: "/chat", special: true },
]

export function Header() {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)

  // Don't render header if user is not authenticated
  if (!user) return null

  const userInitials = `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()

  const handleLogoutClick = () => {
    setShowLogoutDialog(true)
  }

  const handleLogoutConfirm = async () => {
    setShowLogoutDialog(false)
    await logout()
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl text-white shadow-lg group-hover:shadow-xl transition-all duration-200">
              <GraduationCap className="h-6 w-6" />
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">Instructor LMW</span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-2">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}>
                <Button
                  variant={pathname === item.href ? "default" : "ghost"}
                  className={`font-medium transition-all duration-200 ${
                    item.special
                      ? "bg-gradient-to-r from-accent to-emerald-500 text-white hover:from-accent/90 hover:to-emerald-500/90 shadow-lg"
                      : pathname === item.href
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  {item.name}
                </Button>
              </Link>
            ))}
          </nav>

          {/* Right side - Auth Controls */}
          <div className="flex items-center gap-2">
            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative p-2 h-9 w-9 hover:bg-slate-100/60">
              <Bell className="h-4 w-4 text-slate-600" />
              <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 text-xs bg-red-500 text-white border-2 border-white">
                3
              </Badge>
            </Button>

            {/* Logout Button */}
            <Button variant="outline" size="sm" className="gap-2" onClick={handleLogoutClick}>
              <LogOut className="h-4 w-4" />
              Logout
            </Button>

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2 px-2 py-1 h-9 hover:bg-slate-100/60">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="text-xs font-medium bg-gradient-to-br from-slate-100 to-slate-200">
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-slate-700 text-sm">{user.firstName}</span>
                  <Badge variant="outline" className="text-xs">
                    {user.userType}
                  </Badge>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 mt-2">
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Profile & Settings
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Logout Confirmation Dialog */}
      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Sign out</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to sign out? You'll need to sign in again to access your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogoutConfirm}>
              Sign out
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
