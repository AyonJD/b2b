"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DollarSign, TrendingDown, TrendingUp } from "lucide-react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts"

const monthlyAccountData = {
  "2024-01": {
    revenue: 450000,
    expenditure: 275000,
    profit: 175000,
    profitMargin: 38.9,
  },
  "2024-02": {
    revenue: 520000,
    expenditure: 310000,
    profit: 210000,
    profitMargin: 40.4,
  },
  "2024-03": {
    revenue: 463000,
    expenditure: 285000,
    profit: 178000,
    profitMargin: 38.4,
  },
}

const chartData = [
  { month: "Jan", revenue: 450000, expenditure: 275000, profit: 175000 },
  { month: "Feb", revenue: 520000, expenditure: 310000, profit: 210000 },
  { month: "Mar", revenue: 463000, expenditure: 285000, profit: 178000 },
]

export default function AccountsRecords() {
  const [selectedMonth, setSelectedMonth] = useState("2024-03")
  const data = monthlyAccountData[selectedMonth as keyof typeof monthlyAccountData]

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground">Accounts Records</h1>
          <p className="mt-2 text-lg text-muted-foreground">Monthly financial summary and analysis</p>
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

      <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border bg-card">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Revenue</p>
                <h3 className="mt-2 text-3xl font-bold text-foreground">${data.revenue.toLocaleString()}</h3>
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
                <p className="text-sm font-medium text-muted-foreground">Expenditure</p>
                <h3 className="mt-2 text-3xl font-bold text-foreground">${data.expenditure.toLocaleString()}</h3>
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
                <p className="text-sm font-medium text-muted-foreground">Net Profit</p>
                <h3 className="mt-2 text-3xl font-bold text-foreground">${data.profit.toLocaleString()}</h3>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[hsl(var(--color-accent-cyan))] to-[hsl(var(--color-primary))]">
                <DollarSign className="h-7 w-7 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Profit Margin</p>
                <h3 className="mt-2 text-3xl font-bold text-foreground">{data.profitMargin}%</h3>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[hsl(var(--color-accent-purple))] to-[hsl(var(--color-accent-pink))]">
                <TrendingUp className="h-7 w-7 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8 border-border bg-card">
        <CardHeader>
          <CardTitle className="text-2xl text-foreground">Financial Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Bar dataKey="revenue" fill="hsl(var(--color-accent-green))" radius={[8, 8, 0, 0]} name="Revenue" />
              <Bar dataKey="expenditure" fill="hsl(var(--color-accent-red))" radius={[8, 8, 0, 0]} name="Expenditure" />
              <Bar dataKey="profit" fill="hsl(var(--color-accent-cyan))" radius={[8, 8, 0, 0]} name="Profit" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-2xl text-foreground">Revenue Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { category: "Product Sales", amount: 325000, percentage: 70 },
                { category: "Service Contracts", amount: 85000, percentage: 18 },
                { category: "Wholesale Orders", amount: 42000, percentage: 9 },
                { category: "Other Income", amount: 11000, percentage: 3 },
              ].map((item) => (
                <div key={item.category} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-foreground">{item.category}</span>
                    <span className="font-semibold text-foreground">${item.amount.toLocaleString()}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[hsl(var(--color-accent-green))] to-[hsl(var(--color-accent-cyan))]"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <div className="text-right text-sm text-muted-foreground">{item.percentage}%</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-2xl text-foreground">Expenditure Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { category: "Inventory Purchase", amount: 125000, percentage: 44 },
                { category: "Salaries", amount: 85000, percentage: 30 },
                { category: "Equipment", amount: 30000, percentage: 10 },
                { category: "Marketing", amount: 22000, percentage: 8 },
                { category: "Rent & Utilities", amount: 23000, percentage: 8 },
              ].map((item) => (
                <div key={item.category} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-foreground">{item.category}</span>
                    <span className="font-semibold text-foreground">${item.amount.toLocaleString()}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[hsl(var(--color-accent-orange))] to-[hsl(var(--color-accent-red))]"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <div className="text-right text-sm text-muted-foreground">{item.percentage}%</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
