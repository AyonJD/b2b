"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertTriangle, Plus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const lowStockItems = [
  { id: 1, name: "Gaming Laptop", current: 15, minimum: 10, recommended: 30, price: 2200, category: "Computers" },
  { id: 2, name: "Tablet Pro", current: 32, minimum: 15, recommended: 50, price: 800, category: "Electronics" },
  { id: 3, name: "Desktop PC", current: 28, minimum: 15, recommended: 40, price: 1500, category: "Computers" },
  {
    id: 4,
    name: 'Monitor 27"',
    current: 42,
    minimum: 20,
    recommended: 60,
    price: 400,
    category: "Peripherals",
  },
]

export default function LowStockItems() {
  const [addStockItem, setAddStockItem] = useState<string | null>(null)
  const [addStockQty, setAddStockQty] = useState(20)

  const handleAddStock = () => {
    alert(`Added ${addStockQty} units to stock`)
    setAddStockItem(null)
    setAddStockQty(20)
  }

  return (
    <div className="min-h-[100svh] bg-background p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Low Stock Items</h1>
        <p className="mt-2 text-base sm:text-lg text-muted-foreground">Items requiring immediate attention</p>
      </div>

      <div className="mb-6 rounded-lg border border-[hsl(var(--color-accent-orange))] bg-[hsl(var(--color-accent-orange))]/10 p-4 sm:p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[hsl(var(--color-accent-orange))]">
            <AlertTriangle className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-foreground">Stock Alert</h3>
            <p className="mt-1 text-sm sm:text-base text-muted-foreground">
              {lowStockItems.length} items are running low on stock and need restocking
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {lowStockItems.map((item) => {
          const stockPercentage = (item.current / item.recommended) * 100
          const urgency =
            item.current <= item.minimum ? "critical" : item.current <= item.minimum * 1.5 ? "warning" : "low"

          return (
            <Card key={item.id} className="border-border bg-card">
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <CardTitle className="text-lg sm:text-xl text-foreground">{item.name}</CardTitle>
                    <p className="mt-1 text-xs sm:text-sm text-muted-foreground">{item.category}</p>
                  </div>
                  <div
                    className={`rounded-lg px-3 py-1 text-xs font-semibold ${
                      urgency === "critical"
                        ? "bg-[hsl(var(--color-accent-red))]/20 text-[hsl(var(--color-accent-red))]"
                        : urgency === "warning"
                          ? "bg-[hsl(var(--color-accent-orange))]/20 text-[hsl(var(--color-accent-orange))]"
                          : "bg-[hsl(var(--color-accent-yellow))]/20 text-[hsl(var(--color-accent-yellow))]"
                    }`}
                  >
                    {urgency.toUpperCase()}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-xs sm:text-sm text-muted-foreground">Current Stock</span>
                    <span className="text-base sm:text-lg font-bold text-foreground">{item.current} units</span>
                  </div>
                  <div className="h-2.5 sm:h-3 overflow-hidden rounded-full bg-secondary">
                    <div
                      className={`h-full rounded-full ${
                        urgency === "critical"
                          ? "bg-[hsl(var(--color-accent-red))]"
                          : urgency === "warning"
                            ? "bg-[hsl(var(--color-accent-orange))]"
                            : "bg-[hsl(var(--color-accent-yellow))]"
                      }`}
                      style={{ width: `${Math.min(stockPercentage, 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-muted-foreground">Minimum: {item.minimum}</span>
                    <span className="text-muted-foreground">Recommended: {item.recommended}</span>
                  </div>
                </div>

                <div className="rounded-lg bg-secondary p-4">
                  <div className="flex justify-between">
                    <span className="text-xs sm:text-sm text-muted-foreground">Suggested Order</span>
                    <span className="text-base sm:text-lg font-bold text-foreground">{item.recommended - item.current} units</span>
                  </div>
                  <div className="mt-2 flex justify-between">
                    <span className="text-xs sm:text-sm text-muted-foreground">Estimated Cost</span>
                    <span className="text-base sm:text-lg font-bold text-foreground">
                      ${((item.recommended - item.current) * item.price).toLocaleString()}
                    </span>
                  </div>
                </div>

                <Dialog open={addStockItem === item.name} onOpenChange={(open) => !open && setAddStockItem(null)}>
                  <DialogTrigger asChild>
                    <Button className="w-full" size="lg" onClick={() => setAddStockItem(item.name)}>
                      <Plus className="mr-2 h-5 w-5" />
                      Add Stock
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-[min(100vw-2rem,32rem)]">
                    <DialogHeader>
                      <DialogTitle className="text-xl sm:text-2xl">Add Stock</DialogTitle>
                      <DialogDescription>Increase inventory for {item.name}</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="addQty" className="text-foreground">
                          Quantity to Add
                        </Label>
                        <Input
                          id="addQty"
                          type="number"
                          min="1"
                          value={addStockQty}
                          onChange={(e) => setAddStockQty(Number.parseInt(e.target.value) || 1)}
                          className="mt-2"
                        />
                      </div>
                      <div className="rounded-lg bg-secondary p-4 space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Current Stock</span>
                          <span className="font-semibold text-foreground">{item.current} units</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">After Addition</span>
                          <span className="font-semibold text-[hsl(var(--color-accent-green))]">
                            {item.current + addStockQty} units
                          </span>
                        </div>
                        <div className="flex justify-between border-t border-border pt-2">
                          <span className="text-muted-foreground">Total Cost</span>
                          <span className="text-xl font-bold text-foreground">
                            ${(item.price * addStockQty).toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <Button onClick={handleAddStock} className="w-full" size="lg">
                        Confirm Addition
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
