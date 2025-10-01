"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Package, Plus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const stockData = {
  Electronics: [
    { id: 1, name: "Premium Laptop", stock: 45, minStock: 20, price: 1200 },
    { id: 2, name: "Tablet Pro", stock: 32, minStock: 15, price: 800 },
    { id: 3, name: "Smartphone X", stock: 67, minStock: 30, price: 999 },
  ],
  Accessories: [
    { id: 4, name: "Wireless Mouse", stock: 120, minStock: 50, price: 30 },
    { id: 5, name: "USB-C Cable", stock: 200, minStock: 100, price: 15 },
    { id: 6, name: "Phone Case", stock: 150, minStock: 75, price: 25 },
  ],
  Computers: [
    { id: 7, name: "Desktop PC", stock: 28, minStock: 15, price: 1500 },
    { id: 8, name: "Gaming Laptop", stock: 15, minStock: 10, price: 2200 },
  ],
  Peripherals: [
    { id: 9, name: "Keyboard Pro", stock: 85, minStock: 40, price: 100 },
    { id: 10, name: 'Monitor 27"', stock: 42, minStock: 20, price: 400 },
  ],
  Storage: [
    { id: 11, name: "External SSD 1TB", stock: 95, minStock: 50, price: 150 },
    { id: 12, name: "USB Flash Drive", stock: 180, minStock: 100, price: 20 },
  ],
}

export default function ViewStock() {
  const [selectedCategory, setSelectedCategory] = useState("Electronics")
  const [requisitionItem, setRequisitionItem] = useState<string | null>(null)
  const [requisitionQty, setRequisitionQty] = useState(10)

  const currentStock = stockData[selectedCategory as keyof typeof stockData]

  const handleRequisition = () => {
    alert(`Requisition submitted for ${requisitionQty} units`)
    setRequisitionItem(null)
    setRequisitionQty(10)
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground">View Stock</h1>
        <p className="mt-2 text-lg text-muted-foreground">Current inventory by product category</p>
      </div>

      <div className="mb-6">
        <Label htmlFor="category" className="text-lg text-foreground">
          Select Category
        </Label>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger id="category" className="mt-2 h-12 text-lg">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(stockData).map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {currentStock.map((item) => (
          <Card key={item.id} className="border-border bg-card">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-xl text-foreground">{item.name}</CardTitle>
                  <p className="mt-1 text-sm text-muted-foreground">${item.price}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-[hsl(var(--color-accent-cyan))] to-[hsl(var(--color-primary))]">
                  <Package className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Current Stock</span>
                  <span className="font-semibold text-foreground">{item.stock} units</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[hsl(var(--color-accent-cyan))] to-[hsl(var(--color-primary))]"
                    style={{ width: `${Math.min((item.stock / (item.minStock * 2)) * 100, 100)}%` }}
                  />
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Min. Stock</span>
                  <span className="text-muted-foreground">{item.minStock} units</span>
                </div>
              </div>

              <Dialog open={requisitionItem === item.name} onOpenChange={(open) => !open && setRequisitionItem(null)}>
                <DialogTrigger asChild>
                  <Button className="w-full" size="lg" onClick={() => setRequisitionItem(item.name)}>
                    <Plus className="mr-2 h-5 w-5" />
                    Make Requisition
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-2xl">Stock Requisition</DialogTitle>
                    <DialogDescription>Request additional stock for {item.name}</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="reqQty" className="text-foreground">
                        Quantity to Order
                      </Label>
                      <Input
                        id="reqQty"
                        type="number"
                        min="1"
                        value={requisitionQty}
                        onChange={(e) => setRequisitionQty(Number.parseInt(e.target.value) || 1)}
                        className="mt-2"
                      />
                    </div>
                    <div className="rounded-lg bg-secondary p-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Estimated Cost</span>
                        <span className="text-xl font-bold text-foreground">
                          ${(item.price * requisitionQty).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <Button onClick={handleRequisition} className="w-full" size="lg">
                      Submit Requisition
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
