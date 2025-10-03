"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { DollarSign, ShoppingCart, TrendingUp, Search } from "lucide-react"

const monthlyData = {
  "2024-01": {
    totalSales: 245,
    totalRevenue: 45000,
    avgOrder: 183,
    sales: [
      {
        id: "INV-001",
        date: "2024-01-15",
        customer: "John Doe",
        items: "Premium Laptop, USB-C Cable",
        itemCount: 2,
        amount: 1215,
      },
      { id: "INV-002", date: "2024-01-16", customer: "Jane Smith", items: "Tablet Pro", itemCount: 1, amount: 800 },
      {
        id: "INV-003",
        date: "2024-01-18",
        customer: "Bob Johnson",
        items: 'Wireless Mouse, Keyboard Pro, Monitor 27"',
        itemCount: 3,
        amount: 530,
      },
      {
        id: "INV-004",
        date: "2024-01-20",
        customer: "Alice Brown",
        items: "Gaming Laptop, External SSD 1TB",
        itemCount: 2,
        amount: 2350,
      },
      {
        id: "INV-005",
        date: "2024-01-22",
        customer: "Charlie Wilson",
        items: 'Desktop PC, Monitor 27"',
        itemCount: 2,
        amount: 1900,
      },
    ],
  },
  "2024-02": {
    totalSales: 289,
    totalRevenue: 52000,
    avgOrder: 180,
    sales: [
      {
        id: "INV-006",
        date: "2024-02-12",
        customer: "Alice Brown",
        items: "Smartphone X, Phone Case",
        itemCount: 2,
        amount: 1024,
      },
      {
        id: "INV-007",
        date: "2024-02-14",
        customer: "Charlie Wilson",
        items: "Gaming Laptop",
        itemCount: 1,
        amount: 2200,
      },
      {
        id: "INV-008",
        date: "2024-02-20",
        customer: "Diana Prince",
        items: "Wireless Mouse, USB Flash Drive",
        itemCount: 2,
        amount: 50,
      },
      {
        id: "INV-009",
        date: "2024-02-25",
        customer: "Eve Adams",
        items: "Premium Laptop, External SSD 1TB",
        itemCount: 2,
        amount: 1350,
      },
    ],
  },
  "2024-03": {
    totalSales: 312,
    totalRevenue: 48000,
    avgOrder: 154,
    sales: [
      {
        id: "INV-010",
        date: "2024-03-05",
        customer: "Eve Adams",
        items: "Tablet Pro, Phone Case",
        itemCount: 2,
        amount: 825,
      },
      {
        id: "INV-011",
        date: "2024-03-10",
        customer: "Frank Miller",
        items: 'Desktop PC, Keyboard Pro, Monitor 27"',
        itemCount: 3,
        amount: 2000,
      },
      {
        id: "INV-012",
        date: "2024-03-22",
        customer: "Grace Lee",
        items: "Premium Laptop, Wireless Mouse, USB-C Cable",
        itemCount: 3,
        amount: 1245,
      },
      {
        id: "INV-013",
        date: "2024-03-28",
        customer: "Henry Ford",
        items: "Smartphone X, External SSD 1TB",
        itemCount: 2,
        amount: 1149,
      },
    ],
  },
}

export default function SalesRecords() {
  const [selectedMonth, setSelectedMonth] = useState("2024-03")
  const [searchTerm, setSearchTerm] = useState("")
  const data = monthlyData[selectedMonth as keyof typeof monthlyData]

  const filteredSales = data.sales.filter(
    (sale) =>
      sale.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.items.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-[100svh] bg-background p-4 sm:p-6 lg:p-8">
      <div className="mb-8 grid gap-4 md:flex md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">View Sales Records</h1>
          <p className="mt-2 text-base sm:text-lg text-muted-foreground">Monthly sales summary and detailed records</p>
        </div>
        <div className="w-full md:w-64">
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-full">
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
                <p className="text-sm font-medium text-muted-foreground">Total Sales</p>
                <h3 className="mt-2 text-3xl font-bold text-foreground">{data.totalSales}</h3>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[hsl(var(--color-accent-cyan))] to-[hsl(var(--color-primary))]">
                <ShoppingCart className="h-7 w-7 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <h3 className="mt-2 text-3xl font-bold text-foreground">${data.totalRevenue.toLocaleString()}</h3>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[hsl(var(--color-accent-yellow))] to-[hsl(var(--color-accent-orange))]">
                <DollarSign className="h-7 w-7 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Order Value</p>
                <h3 className="mt-2 text-3xl font-bold text-foreground">${data.avgOrder}</h3>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[hsl(var(--color-accent-purple))] to-[hsl(var(--color-accent-pink))]">
                <TrendingUp className="h-7 w-7 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border bg-card">
        <CardHeader>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="text-xl sm:text-2xl text-foreground">Sales List</CardTitle>
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by invoice, customer, or items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto pb-2" style={{ scrollbarGutter: 'stable both-edges' }}>
            <table className="w-full min-w-[720px] sm:min-w-0">
              <thead>
                <tr className="border-b border-border">
                  <th className="pb-3 pr-3 text-left text-xs sm:text-sm font-semibold text-muted-foreground">Invoice ID</th>
                  <th className="pb-3 pr-3 text-left text-xs sm:text-sm font-semibold text-muted-foreground">Date</th>
                  <th className="pb-3 pr-3 text-left text-xs sm:text-sm font-semibold text-muted-foreground">Customer</th>
                  <th className="pb-3 pr-3 text-left text-xs sm:text-sm font-semibold text-muted-foreground">Item Names</th>
                  <th className="pb-3 pr-3 text-left text-xs sm:text-sm font-semibold text-muted-foreground">Items</th>
                  <th className="pb-3 text-right text-xs sm:text-sm font-semibold text-muted-foreground">Amount</th>
                </tr>
              </thead>
              <tbody>
                {filteredSales.map((sale) => (
                  <tr key={sale.id} className="border-b border-border">
                    <td className="py-3 pr-3 text-foreground whitespace-nowrap text-sm">{sale.id}</td>
                    <td className="py-3 pr-3 text-muted-foreground whitespace-nowrap text-sm">{sale.date}</td>
                    <td className="py-3 pr-3 text-foreground whitespace-nowrap text-sm">{sale.customer}</td>
                    <td className="py-3 pr-3 text-muted-foreground max-w-[16rem] truncate" title={sale.items}>
                      {sale.items}
                    </td>
                    <td className="py-3 pr-3 text-muted-foreground text-sm">{sale.itemCount}</td>
                    <td className="py-3 text-right text-base sm:text-lg font-semibold text-foreground">${sale.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredSales.length === 0 && (
              <div className="py-12 text-center">
                <p className="text-lg text-muted-foreground">No sales found matching your search</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
