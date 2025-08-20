"use client"

import { MessageSquare, BookMarked, LayoutDashboard, User, Zap, Upload, Bell, LogOut } from "lucide-react"
import { usePathname } from "next/navigation"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
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

const navigationItems = [
  {
    title: "Chat",
    url: "/",
    icon: MessageSquare,
  },
  {
    title: "Upload",
    url: "/upload",
    icon: Upload,
  },
  {
    title: "Courses",
    url: "/courses",
    icon: BookMarked,
  },
  {
    title: "Editor",
    url: "/editor",
    icon: LayoutDashboard,
  },
]

export function AppHeader() {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)

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
    <header className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-slate-200/30 h-14">
      <div className="flex items-center justify-between px-6 h-full max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-primary via-emerald-500 to-teal-600 text-white shadow-lg">
            <Zap className="h-4 w-4" />
          </div>
          <div className="text-lg font-bold text-gradient tracking-tight">LMW AI</div>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-1">
          {navigationItems.map((item) => (
            <Link key={item.title} href={item.url}>
              <Button
                variant={pathname === item.url ? "default" : "ghost"}
                size="sm"
                className={`gap-2 font-medium transition-all duration-200 h-9 px-4 ${
                  pathname === item.url
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/60"
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span className="text-sm">{item.title}</span>
              </Button>
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative p-2 h-9 w-9 hover:bg-slate-100/60">
            <Bell className="h-4 w-4 text-slate-600" />
            <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 text-xs bg-red-500 text-white border-2 border-white">
              3
            </Badge>
          </Button>

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
    </header>
  )
}
