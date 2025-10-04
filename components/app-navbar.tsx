"use client"

import { useState, useEffect, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Mail, Bell, ChevronDown, LogOut } from "lucide-react"
import { getFirebaseAuth } from "@/lib/firebase"
import { onAuthStateChanged, signOut, type User } from "firebase/auth"
import { useRouter } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function AppNavbar() {
  const [searchQuery, setSearchQuery] = useState("")
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
    <>
      {/* Desktop Navbar - Hidden on mobile */}
      <div className="hidden md:block sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
        <div className="flex h-16 items-center justify-between px-6">
          {/* Search Bar */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-50 border-gray-200 rounded-sm"
              />
            </div>
          </div>

          {/* Right Side - Language, Icons, User Profile */}
          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="text-white text-xs font-bold">US</span>
              </div>
              <Select defaultValue="english">
                <SelectTrigger className="w-auto border-0 shadow-none bg-transparent h-auto p-0">
                  <SelectValue>
                    <span className="text-sm text-gray-700">English (US)</span>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English (US)</SelectItem>
                  <SelectItem value="spanish">Spanish</SelectItem>
                  <SelectItem value="french">French</SelectItem>
                </SelectContent>
              </Select>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </div>

            {/* Mail Icon */}
            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full bg-white border border-gray-200 hover:bg-gray-50">
              <Mail className="h-4 w-4 text-gray-600" />
            </Button>

            {/* Notification Bell Icon */}
            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full bg-white border border-gray-200 hover:bg-gray-50 relative">
              <Bell className="h-4 w-4 text-gray-600" />
              <div className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></div>
            </Button>

            {/* User Profile */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 rounded-lg p-2 -m-2">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-sm">{initials}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-900">{displayName}</span>
                    <span className="text-xs text-gray-500">{email ? `${email.split('@')[0]}@${email.split('@')[1]?.substring(0, 6)}...` : 'user@email...'}</span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

    </>
  )
}
