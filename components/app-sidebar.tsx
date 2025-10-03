"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useEffect, useMemo, useState } from "react"
import { getFirebaseAuth } from "@/lib/firebase"
import { onAuthStateChanged, type User } from "firebase/auth"
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
} from "lucide-react"

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
  const [authUser, setAuthUser] = useState<User | null>(null)

  useEffect(() => {
    const auth = getFirebaseAuth()
    const unsub = onAuthStateChanged(auth, (u) => setAuthUser(u))
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

  return (
    <div className="flex h-screen w-64 flex-col border-r border-border bg-card">
      <div className="flex h-16 items-center border-b border-border px-6">
        <div className="flex items-center gap-2">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-primary to-[hsl(var(--color-accent-purple))]">
            <img src="/placeholder-logo.svg" alt="Logo" className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">BizManager</h1>
            <p className="text-xs text-muted-foreground">Pro Edition</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto p-4">
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
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
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

      <div className="border-t border-border p-4">
        <div className="flex items-center gap-3 rounded-lg bg-secondary p-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[hsl(var(--color-accent-orange))] to-[hsl(var(--color-accent-yellow))] text-sm font-bold text-white">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="truncate text-sm font-medium text-foreground">{displayName}</p>
            <p className="truncate text-xs text-muted-foreground">{email || "Signed out"}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
