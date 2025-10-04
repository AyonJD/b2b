"use client"

import { usePathname } from "next/navigation"
import { AppSidebar } from "./app-sidebar"
import { AppNavbar } from "./app-navbar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu, ChevronDown, LogOut } from "lucide-react"
import { useState, useEffect, useMemo } from "react"
import { getFirebaseAuth } from "@/lib/firebase"
import { onAuthStateChanged, signOut, type User } from "firebase/auth"
import { useRouter } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type React from "react"

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || ""
  const hideSidebar = pathname === "/" || pathname.startsWith("/login")
  const [authUser, setAuthUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    const auth = getFirebaseAuth()
    const unsub = onAuthStateChanged(auth, (user) => setAuthUser(user))
    return () => unsub()
  }, [])

  const { displayName, email, initials } = useMemo(() => {
    const name = authUser?.displayName || undefined
    const mail = authUser?.email || ""
    const base = name || mail.split("@")[0] || "User"
    const init = name
      ? name
          .split(" ")
          .filter(Boolean)
          .slice(0, 2)
          .map((s) => s[0]?.toUpperCase())
          .join("")
      : (mail[0] || "U").toUpperCase()
    return { displayName: name || base, email: mail, initials: init || "U" }
  }, [authUser])

  const handleLogout = async () => {
    try {
      const auth = getFirebaseAuth()
      await signOut(auth)
      router.push("/login")
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {!hideSidebar && (
        <div className="hidden md:block">
          <AppSidebar />
        </div>
      )}
      <div className="flex-1 overflow-y-auto">
        {/* Navbar - Only show when sidebar is visible */}
        {!hideSidebar && <AppNavbar />}
        
        {/* Mobile Header - Only show on mobile when sidebar is visible */}
        {!hideSidebar && (
          <div className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur md:hidden">
            <div className="flex h-14 items-center justify-between px-3">
              <div className="flex items-center">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" aria-label="Open menu">
                      <Menu className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="p-0">
                    <AppSidebar onNavigate={() => {
                      const closeBtn = document.querySelector('[data-slot="sheet-close"]') as HTMLButtonElement | null
                      closeBtn?.click()
                    }} />
                  </SheetContent>
                </Sheet>
                <div className="ml-2 text-sm font-semibold">BizManager</div>
              </div>
              
              {/* User Profile - Only on mobile */}
              <div className="flex items-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 rounded-lg p-1">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 font-semibold text-xs">{initials}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-medium text-gray-900">{displayName}</span>
                        <span className="text-xs text-gray-500">{email ? `${email.split('@')[0]}@${email.split('@')[1]?.substring(0, 4)}...` : 'user@email...'}</span>
                      </div>
                      <ChevronDown className="h-3 w-3 text-gray-400" />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        )}
        <main>{children}</main>
      </div>
    </div>
  )
}


