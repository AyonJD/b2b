"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { getFirebaseAuth } from "@/lib/firebase"
import { onAuthStateChanged } from "firebase/auth"

export default function Home() {
  const router = useRouter()
  const [ready, setReady] = useState(false)
  const hasNavigatedRef = useRef(false)

  useEffect(() => {
    const auth = getFirebaseAuth()
    const unsub = onAuthStateChanged(auth, (user) => {
      // Show splash for a brief moment, then route based on auth
      if (hasNavigatedRef.current) return
      hasNavigatedRef.current = true
      const target = user ? "/sales/dashboard" : "/login"
      // allow animation to play ~1.2s
      setTimeout(() => router.replace(target), 1200)
      setReady(true)
    })
    return () => unsub()
  }, [router])

  const letters = useMemo(() => {
    const text = "BizManager"
    return text.split("")
  }, [])

  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-background">
      {/* aurora background */}
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(60rem_30rem_at_50%_-10%,hsl(var(--primary)/.2),transparent_60%),radial-gradient(40rem_20rem_at_10%_110%,hsl(var(--color-accent-purple)/.18),transparent_60%),radial-gradient(40rem_28rem_at_90%_120%,hsl(var(--color-accent-cyan)/.15),transparent_60%)]" />

      {/* logo orb */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        <div className="relative">
          <div className="size-28 rounded-full bg-gradient-to-br from-primary to-[hsl(var(--color-accent-purple))] blur-[1px] shadow-[0_0_40px_hsl(var(--primary)/.6)] animate-[spin_10s_linear_infinite]" />
          <div className="absolute inset-0 grid place-items-center">
            <img
              src="/placeholder-logo.svg"
              alt="Logo"
              className="size-12 drop-shadow-[0_2px_8px_hsl(var(--primary)/.6)] animate-[float_3s_ease-in-out_infinite]"
            />
          </div>
        </div>

        {/* wordmark reveal */}
        <div className="flex items-end gap-1 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          {letters.map((ch, i) => (
            <span
              key={i}
              className="inline-block opacity-0 translate-y-3 animate-[fadeUp_.7s_ease-out_forwards]"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              {ch}
            </span>
          ))}
        </div>

        <div className="text-sm text-muted-foreground">Modern business management</div>
      </div>

      {/* progress sweep */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] overflow-hidden">
        <div className="h-full w-full origin-left bg-gradient-to-r from-primary via-[hsl(var(--color-accent-cyan))] to-[hsl(var(--color-accent-purple))] animate-[sweep_1.2s_ease-out_forwards]" />
      </div>

      {/* keyframes inline via tailwind v4 arbitrary */}
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform: translateY(12px) } to { opacity:1; transform: translateY(0) } }
        @keyframes float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-6px) } }
        @keyframes sweep { from { transform: scaleX(0) } to { transform: scaleX(1) } }
      `}</style>
    </div>
  )
}
