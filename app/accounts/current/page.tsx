"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, TrendingDown, TrendingUp, Wallet } from "lucide-react"

const accountSummary = {
  totalRevenue: 463000,
  totalExpenditure: 285000,
  netProfit: 178000,
  cashBalance: 425000,
}

const expenditures = [
  { id: 1, category: "Inventory Purchase", amount: 125000, date: "2024-03-25", vendor: "Tech Supplies Co." },
  { id: 2, category: "Salaries", amount: 85000, date: "2024-03-20", vendor: "Payroll" },
  { id: 3, category: "Rent", amount: 15000, date: "2024-03-15", vendor: "Property Management" },
  { id: 4, category: "Utilities", amount: 8000, date: "2024-03-10", vendor: "City Services" },
  { id: 5, category: "Marketing", amount: 22000, date: "2024-03-08", vendor: "Digital Agency" },
  { id: 6, category: "Equipment", amount: 30000, date: "2024-03-05", vendor: "Office Depot" },
]

const revenues = [
  { id: 1, source: "Product Sales", amount: 325000, date: "2024-03-28", customer: "Various" },
  { id: 2, source: "Service Contracts", amount: 85000, date: "2024-03-22", customer: "Enterprise Client A" },
  { id: 3, source: "Wholesale Orders", amount: 42000, date: "2024-03-18", customer: "Retailer B" },
  { id: 4, source: "Online Sales", amount: 11000, date: "2024-03-12", customer: "E-commerce Platform" },
]

export default function CurrentAccounts() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground">Current Accounts</h1>
        <p className="mt-2 text-lg text-muted-foreground">Financial overview and current transactions</p>
      </div>

      <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border bg-card">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <h3 className="mt-2 text-3xl font-bold text-foreground">
                  ${accountSummary.totalRevenue.toLocaleString()}
                </h3>
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
                <p className="text-sm font-medium text-muted-foreground">Total Expenditure</p>
                <h3 className="mt-2 text-3xl font-bold text-foreground">
                  ${accountSummary.totalExpenditure.toLocaleString()}
                </h3>
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
                <h3 className="mt-2 text-3xl font-bold text-foreground">
                  ${accountSummary.netProfit.toLocaleString()}
                </h3>
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
                <p className="text-sm font-medium text-muted-foreground">Cash Balance</p>
                <h3 className="mt-2 text-3xl font-bold text-foreground">
                  ${accountSummary.cashBalance.toLocaleString()}
                </h3>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[hsl(var(--color-accent-purple))] to-[hsl(var(--color-accent-pink))]">
                <Wallet className="h-7 w-7 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl text-foreground">
              <TrendingDown className="h-6 w-6 text-[hsl(var(--color-accent-red))]" />
              Current Expenditure List
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {expenditures.map((expense) => (
                <div
                  key={expense.id}
                  className="flex items-center justify-between rounded-lg border border-border bg-secondary p-4"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{expense.category}</h3>
                    <p className="text-sm text-muted-foreground">{expense.vendor}</p>
                    <p className="text-xs text-muted-foreground">{expense.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-[hsl(var(--color-accent-red))]">
                      -${expense.amount.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-between border-t border-border pt-4">
              <span className="text-lg font-semibold text-foreground">Total Expenditure</span>
              <span className="text-2xl font-bold text-[hsl(var(--color-accent-red))]">
                -${expenditures.reduce((sum, e) => sum + e.amount, 0).toLocaleString()}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl text-foreground">
              <TrendingUp className="h-6 w-6 text-[hsl(var(--color-accent-green))]" />
              Current Revenue List
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {revenues.map((revenue) => (
                <div
                  key={revenue.id}
                  className="flex items-center justify-between rounded-lg border border-border bg-secondary p-4"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{revenue.source}</h3>
                    <p className="text-sm text-muted-foreground">{revenue.customer}</p>
                    <p className="text-xs text-muted-foreground">{revenue.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-[hsl(var(--color-accent-green))]">
                      +${revenue.amount.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-between border-t border-border pt-4">
              <span className="text-lg font-semibold text-foreground">Total Revenue</span>
              <span className="text-2xl font-bold text-[hsl(var(--color-accent-green))]">
                +${revenues.reduce((sum, r) => sum + r.amount, 0).toLocaleString()}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
