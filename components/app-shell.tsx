"use client"

import { usePathname } from "next/navigation"
import { AppSidebar } from "./app-sidebar"
import { AppNavbar } from "./app-navbar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import type React from "react"

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || ""
  const hideSidebar = pathname === "/" || pathname.startsWith("/login")
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
        
        {/* Mobile Sidebar Toggle - Only show on mobile when sidebar is visible */}
        {!hideSidebar && (
          <div className="sticky top-16 z-40 border-b border-border bg-background/80 backdrop-blur md:hidden">
            <div className="flex h-14 items-center px-3">
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
          </div>
        )}
        <main>{children}</main>
      </div>
    </div>
  )
}


