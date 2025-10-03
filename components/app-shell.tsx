"use client"

import { usePathname } from "next/navigation"
import { AppSidebar } from "./app-sidebar"
import type React from "react"

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || ""
  const hideSidebar = pathname === "/" || pathname.startsWith("/login")
  return (
    <div className="flex h-screen overflow-hidden">
      {!hideSidebar && <AppSidebar />}
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  )
}


