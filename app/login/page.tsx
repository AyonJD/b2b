"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { getFirebaseAuth } from "@/lib/firebase"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const auth = getFirebaseAuth()
      await signInWithEmailAndPassword(auth, email, password)
      router.replace("/sales/dashboard")
    } catch (err: any) {
      const code = err?.code || ""
      if (code === "auth/invalid-credential" || code === "auth/user-not-found") {
        try {
          const auth = getFirebaseAuth()
          await createUserWithEmailAndPassword(auth, email, password)
          router.replace("/sales/dashboard")
          return
        } catch (createErr: any) {
          setError(createErr?.message ?? "Failed to create account")
        }
      } else {
        setError(err?.message ?? "Failed to sign in")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-sm shadow-lg">
        <CardHeader className="space-y-2 text-center">
          <div className="mx-auto size-12 rounded-full bg-gradient-to-br from-primary to-[hsl(var(--color-accent-purple))] grid place-items-center">
            <img src="/placeholder-logo.svg" alt="Logo" className="size-6" />
          </div>
          <CardTitle className="text-xl">Welcome back</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm" htmlFor="email">Email</label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <label className="text-sm" htmlFor="password">Password</label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            {error && (
              <div className="text-sm text-destructive-foreground">
                {error}
              </div>
            )}
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex w-full flex-col gap-2">
          <p className="w-full text-center text-xs text-muted-foreground">Use your business account to continue</p>
        </CardFooter>
      </Card>
    </div>
  )
}


