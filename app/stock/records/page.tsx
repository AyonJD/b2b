"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Package, TrendingDown, TrendingUp } from "lucide-react"

const monthlyStockData = {
  "2024-01": [
    { id: 1, name: "Premium Laptop", opening: 50, received: 20, sold: 25, closing: 45 },
    { id: 2, name: "Wireless Mouse", opening: 100, received: 50, sold: 30, closing: 120 },
    { id: 3, name: "USB-C Cable", opening: 150, received: 100, sold: 50, closing: 200 },
    { id: 4, name: "Keyboard Pro", opening: 70, received: 30, sold: 15, closing: 85 },
  ],
  "2024-02": [
    { id: 1, name: "Premium Laptop", opening: 45, received: 15, sold: 28, closing: 32 },
    { id: 2, name: "Wireless Mouse", opening: 120, received: 40, sold: 38, closing: 122 },
    { id: 3, name: "USB-C Cable", opening: 200, received: 80, sold: 60, closing: 220 },
    { id: 4, name: "Keyboard Pro", opening: 85, received: 25, sold: 22, closing: 88 },
  ],
  "2024-03": [
    { id: 1, name: "Premium Laptop", opening: 32, received: 25, sold: 22, closing: 35 },
    { id: 2, name: "Wireless Mouse", opening: 122, received: 35, sold: 42, closing: 115 },
    { id: 3, name: "USB-C Cable", opening: 220, received: 90, sold: 75, closing: 235 },
    { id: 4, name: "Keyboard Pro", opening: 88, received: 20, sold: 18, closing: 90 },
  ],
}

export default function StockRecords() {
  const [selectedMonth, setSelectedMonth] = useState("2024-03")
  const data = monthlyStockData[selectedMonth as keyof typeof monthlyStockData]

  const totalReceived = data.reduce((sum, item) => sum + item.received, 0)
  const totalSold = data.reduce((sum, item) => sum + item.sold, 0)
  const totalClosing = data.reduce((sum, item) => sum + item.closing, 0)

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground">Stock Records</h1>
          <p className="mt-2 text-lg text-muted-foreground">Monthly inventory movement records</p>
        </div>
        <div className="w-64">
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024-01">January 2024</SelectItem>
              <SelectItem value="2024-02">February 2024</SelectItem>
              <SelectItem value="2024-03">March 2024</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mb-8 grid gap-6 md:grid-cols-3">
        <Card className="border-border bg-card">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Stock Received</p>
                <h3 className="mt-2 text-3xl font-bold text-foreground">{totalReceived}</h3>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[hsl(var(--color-accent-green))] to-[hsl(var(--color-accent-cyan))]">
                <TrendingUp className="h-7 w-7 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Stock Sold</p>
                <h3 className="mt-2 text-3xl font-bold text-foreground">{totalSold}</h3>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[hsl(var(--color-accent-orange))] to-[hsl(var(--color-accent-red))]">
                <TrendingDown className="h-7 w-7 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Closing Stock</p>
                <h3 className="mt-2 text-3xl font-bold text-foreground">{totalClosing}</h3>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[hsl(var(--color-accent-purple))] to-[hsl(var(--color-accent-pink))]">
                <Package className="h-7 w-7 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-2xl text-foreground">Detailed Stock Movement</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="pb-3 text-left text-sm font-semibold text-muted-foreground">Product Name</th>
                  <th className="pb-3 text-center text-sm font-semibold text-muted-foreground">Opening Stock</th>
                  <th className="pb-3 text-center text-sm font-semibold text-muted-foreground">Received</th>
                  <th className="pb-3 text-center text-sm font-semibold text-muted-foreground">Sold</th>
                  <th className="pb-3 text-center text-sm font-semibold text-muted-foreground">Closing Stock</th>
                  <th className="pb-3 text-right text-sm font-semibold text-muted-foreground">Change</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => {
                  const change = item.closing - item.opening
                  const changePercent = ((change / item.opening) * 100).toFixed(1)
                  return (
                    <tr key={item.id} className="border-b border-border">
                      <td className="py-4 font-semibold text-foreground">{item.name}</td>
                      <td className="py-4 text-center text-muted-foreground">{item.opening}</td>
                      <td className="py-4 text-center font-semibold text-[hsl(var(--color-accent-green))]">
                        +{item.received}
                      </td>
                      <td className="py-4 text-center font-semibold text-[hsl(var(--color-accent-red))]">
                        -{item.sold}
                      </td>
                      <td className="py-4 text-center text-lg font-bold text-foreground">{item.closing}</td>
                      <td className="py-4 text-right">
                        <span
                          className={`font-semibold ${change >= 0 ? "text-[hsl(var(--color-accent-green))]" : "text-[hsl(var(--color-accent-red))]"}`}
                        >
                          {change >= 0 ? "+" : ""}
                          {change} ({changePercent}%)
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
