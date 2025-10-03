"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Eye } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const clients = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    lastPurchase: "2024-03-28",
    totalSpent: 4500,
    invoices: 12,
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    lastPurchase: "2024-03-27",
    totalSpent: 8900,
    invoices: 24,
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    lastPurchase: "2024-03-26",
    totalSpent: 3200,
    invoices: 8,
  },
  {
    id: 4,
    name: "Alice Brown",
    email: "alice@example.com",
    lastPurchase: "2024-03-25",
    totalSpent: 12000,
    invoices: 35,
  },
  {
    id: 5,
    name: "Charlie Wilson",
    email: "charlie@example.com",
    lastPurchase: "2024-03-24",
    totalSpent: 5600,
    invoices: 15,
  },
]

const sampleInvoice = {
  id: "INV-2024-001",
  date: "2024-03-28",
  items: [
    { name: "Premium Laptop", quantity: 1, price: 1200 },
    { name: "Wireless Mouse", quantity: 2, price: 30 },
    { name: "USB-C Cable", quantity: 3, price: 15 },
  ],
}

export default function InvoicePage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-[100svh] bg-background p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Invoice Management</h1>
        <p className="mt-2 text-base sm:text-lg text-muted-foreground">View and manage client invoices</p>
      </div>

      <Card className="mb-6 border-border bg-card">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search clients by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 text-base sm:text-lg"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl text-foreground">Client List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto pb-2" style={{ scrollbarGutter: 'stable both-edges' }}>
            <table className="w-full min-w-[720px] sm:min-w-0">
              <thead>
                <tr className="border-b border-border">
                  <th className="pb-3 pr-3 text-left text-xs sm:text-sm font-semibold text-muted-foreground">Client Name</th>
                  <th className="pb-3 pr-3 text-left text-xs sm:text-sm font-semibold text-muted-foreground">Email</th>
                  <th className="pb-3 pr-3 text-left text-xs sm:text-sm font-semibold text-muted-foreground">Last Purchase</th>
                  <th className="pb-3 pr-3 text-left text-xs sm:text-sm font-semibold text-muted-foreground">Total Spent</th>
                  <th className="pb-3 pr-3 text-left text-xs sm:text-sm font-semibold text-muted-foreground">Invoices</th>
                  <th className="pb-3 text-right text-xs sm:text-sm font-semibold text-muted-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredClients.map((client) => (
                  <tr key={client.id} className="border-b border-border">
                    <td className="py-3 pr-3 font-semibold text-foreground whitespace-nowrap text-sm">{client.name}</td>
                    <td className="py-3 pr-3 text-muted-foreground whitespace-nowrap text-sm">{client.email}</td>
                    <td className="py-3 pr-3 text-muted-foreground whitespace-nowrap text-sm">{client.lastPurchase}</td>
                    <td className="py-3 pr-3 text-base sm:text-lg font-semibold text-foreground whitespace-nowrap">
                      ${client.totalSpent.toLocaleString()}
                    </td>
                    <td className="py-3 pr-3 text-muted-foreground text-sm">{client.invoices}</td>
                    <td className="py-3 text-right">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm">
                            <Eye className="mr-2 h-4 w-4" />
                            View Invoice
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-[min(100vw-2rem,42rem)]">
                          <DialogHeader>
                            <DialogTitle className="text-xl sm:text-2xl">Invoice Details</DialogTitle>
                            <DialogDescription>Invoice for {client.name}</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="flex justify-between border-b border-border pb-4">
                              <div>
                                <p className="text-sm text-muted-foreground">Invoice ID</p>
                                <p className="text-lg font-semibold">{sampleInvoice.id}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Date</p>
                                <p className="text-lg font-semibold">{sampleInvoice.date}</p>
                              </div>
                            </div>
                            <div>
                              <h3 className="mb-3 font-semibold">Items</h3>
                              <div className="space-y-2">
                                {sampleInvoice.items.map((item, idx) => (
                                  <div key={idx} className="flex justify-between rounded-lg bg-secondary p-3">
                                    <span>
                                      {item.name} × {item.quantity}
                                    </span>
                                    <span className="font-semibold">${item.price * item.quantity}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div className="border-t border-border pt-4">
                              <div className="flex justify-between text-xl font-bold">
                                <span>Total</span>
                                <span>
                                  $
                                  {sampleInvoice.items
                                    .reduce((sum, item) => sum + item.price * item.quantity, 0)
                                    .toLocaleString()}
                                </span>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
