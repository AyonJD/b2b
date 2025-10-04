"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
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
