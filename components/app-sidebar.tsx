"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useState, useEffect, useMemo } from "react"
import { getFirebaseAuth } from "@/lib/firebase"
import { onAuthStateChanged, signOut, type User } from "firebase/auth"
import { useRouter } from "next/navigation"
import {
  LayoutDashboard,
  ShoppingCart,
  FileText,
  Receipt,
  Package,
  Archive,
  AlertTriangle,
  Wallet,
  FileBarChart,
  Bell,
  TrendingUp,
  Search,
  Mail,
  LogOut,
  ChevronDown,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navigation = [
  {
    title: "Sales",
    items: [
      { name: "Sales Dashboard", href: "/sales/dashboard", icon: LayoutDashboard },
      { name: "Make Sale", href: "/sales/make-sale", icon: ShoppingCart },
      { name: "View Sales Records", href: "/sales/records", icon: FileText },
      { name: "Invoice", href: "/sales/invoice", icon: Receipt },
    ],
  },
  {
    title: "Stock",
    items: [
      { name: "View Stock", href: "/stock/view", icon: Package },
      { name: "Stock Records", href: "/stock/records", icon: Archive },
      { name: "Low Stock Items", href: "/stock/low-stock", icon: AlertTriangle },
    ],
  },
  {
    title: "Accounts",
    items: [
      { name: "Current Accounts", href: "/accounts/current", icon: Wallet },
      { name: "Accounts Records", href: "/accounts/records", icon: FileBarChart },
    ],
  },
  {
    title: "System",
    items: [{ name: "Notifications", href: "/notifications", icon: Bell }],
  },
]

export function AppSidebar({ onNavigate }: { onNavigate?: () => void } = {}) {
  const pathname = usePathname()
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
    <div className="flex h-screen w-64 flex-col border-r border-border bg-card">
      <div className="flex h-16 items-center border-b border-border px-6">
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-gray-500 to-gray-700">
              <span className="text-white font-bold text-sm">#</span>
            </div>
            <span className="text-sm font-semibold text-foreground">Snack</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-full bg-blue-600">
              <span className="text-white font-bold text-sm">B</span>
            </div>
            <span className="text-sm font-semibold text-foreground">BizManager</span>
          </div>
        </div>
      </div>

      {/* Mobile Navbar Elements - Only visible on mobile */}
      <div className="md:hidden border-b border-border p-4 space-y-4">
        {/* Search Bar */}
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

        {/* Mail and Notification Icons */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full bg-white border border-gray-200 hover:bg-gray-50">
            <Mail className="h-4 w-4 text-gray-600" />
          </Button>
          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full bg-white border border-gray-200 hover:bg-gray-50 relative">
            <Bell className="h-4 w-4 text-gray-600" />
            <div className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></div>
          </Button>
        </div>
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto scrollbar-hide p-4">
        {navigation.map((section) => (
          <div key={section.title}>
            <h2 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {section.title}
            </h2>
            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-[4px] px-3 py-1.5 text-sm font-medium transition-all",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 ml-2"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                    )}
                    onClick={() => {
                      if (onNavigate) onNavigate()
                    }}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

     
    </div>
  )
}
