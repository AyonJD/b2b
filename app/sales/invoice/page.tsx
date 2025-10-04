"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Eye, Edit, Trash2, Plus } from "lucide-react"
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
    name: "Dianne Russell",
    phone: "013212444",
    lastPurchase: "2024-03-28",
    item: "USB-C Cable(15)",
    amount: 5000,
    invoices: 2,
  },
  {
    id: 2,
    name: "Wade Warren",
    phone: "013212444",
    lastPurchase: "2024-03-28",
    item: "USB-C Cable(15)",
    amount: 1000,
    invoices: 3,
  },
  {
    id: 3,
    name: "Albert Flores",
    phone: "013212444",
    lastPurchase: "2024-03-28",
    item: "USB-C Cable(15)",
    amount: 700,
    invoices: 7,
  },
  {
    id: 4,
    name: "Bessie Cooper",
    phone: "013212444",
    lastPurchase: "2024-03-28",
    item: "USB-C Cable(15)",
    amount: 3000,
    invoices: 1,
  },
  {
    id: 5,
    name: "Arlene McCoy",
    phone: "013212444",
    lastPurchase: "2024-03-28",
    item: "USB-C Cable(15)",
    amount: 4000,
    invoices: 5,
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
      client.phone.includes(searchTerm),
  )

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Invoice Management</h1>
        <p className="mt-1 text-sm text-gray-600">View and manage client invoices</p>
      </div>

      {/* Search and Filter Section */}
      <Card className="mb-6 border-0 bg-white shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full sm:w-64"
              />
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Show</span>
                <Select defaultValue="10">
                  <SelectTrigger className="w-16 h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Create Invoice
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Invoice Table */}
      <Card className="border-0 bg-white shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Client Name</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Phone</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Last Purchase</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Item</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Amount</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Invoices</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Invoice Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredClients.map((client) => (
                  <tr key={client.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{client.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{client.phone}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{client.lastPurchase}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{client.item}</td>
                    <td className="px-4 py-3 text-sm font-bold text-gray-900">
                      ${client.amount.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{client.invoices}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-blue-50">
                              <Eye className="h-4 w-4 text-blue-600" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-[min(100vw-2rem,42rem)]">
                            <DialogHeader>
                              <DialogTitle className="text-xl sm:text-2xl">Invoice Details</DialogTitle>
                              <DialogDescription>Invoice for {client.name}</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="flex justify-between border-b border-gray-200 pb-4">
                                <div>
                                  <p className="text-sm text-gray-600">Invoice ID</p>
                                  <p className="text-lg font-semibold">{sampleInvoice.id}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-600">Date</p>
                                  <p className="text-lg font-semibold">{sampleInvoice.date}</p>
                                </div>
                              </div>
                              <div>
                                <h3 className="mb-3 font-semibold">Items</h3>
                                <div className="space-y-2">
                                  {sampleInvoice.items.map((item, idx) => (
                                    <div key={idx} className="flex justify-between rounded-lg bg-gray-50 p-3">
                                      <span>
                                        {item.name} × {item.quantity}
                                      </span>
                                      <span className="font-semibold">${item.price * item.quantity}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div className="border-t border-gray-200 pt-4">
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
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-green-50">
                          <Edit className="h-4 w-4 text-green-600" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-red-50">
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
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
