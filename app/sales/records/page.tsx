"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DollarSign, ShoppingCart, TrendingUp, Search, Eye, Edit, Trash2, Plus } from "lucide-react"

const monthlyData = {
  "2024-01": {
    totalSales: 245,
    totalRevenue: 45000,
    avgOrder: 183,
    sales: [
      {
        id: "INV010",
        distributor: "Eve Adams",
        date: "2024-03-28",
        itemNames: "Tablet Pro, Phone Case",
        items: 2,
        amount: 825,
      },
      { id: "INV011", distributor: "Frank Miller", date: "2024-03-28", itemNames: "Tablet Pro, Phone Case", items: 3, amount: 825 },
      {
        id: "INV012",
        distributor: "Grace Lee",
        date: "2024-03-28",
        itemNames: "Tablet Pro, Phone Case",
        items: 7,
        amount: 825,
      },
      {
        id: "INV013",
        distributor: "Henry Ford",
        date: "2024-03-28",
        itemNames: "Tablet Pro, Phone Case",
        items: 1,
        amount: 825,
      },
      {
        id: "INV014",
        distributor: "Ivy Chen",
        date: "2024-03-28",
        itemNames: "Tablet Pro, Phone Case",
        items: 5,
        amount: 825,
      },
    ],
  },
  "2024-02": {
    totalSales: 289,
    totalRevenue: 52000,
    avgOrder: 180,
    sales: [
      {
        id: "INV010",
        distributor: "Eve Adams",
        date: "2024-03-28",
        itemNames: "Tablet Pro, Phone Case",
        items: 2,
        amount: 825,
      },
      { id: "INV011", distributor: "Frank Miller", date: "2024-03-28", itemNames: "Tablet Pro, Phone Case", items: 3, amount: 825 },
      {
        id: "INV012",
        distributor: "Grace Lee",
        date: "2024-03-28",
        itemNames: "Tablet Pro, Phone Case",
        items: 7,
        amount: 825,
      },
      {
        id: "INV013",
        distributor: "Henry Ford",
        date: "2024-03-28",
        itemNames: "Tablet Pro, Phone Case",
        items: 1,
        amount: 825,
      },
      {
        id: "INV014",
        distributor: "Ivy Chen",
        date: "2024-03-28",
        itemNames: "Tablet Pro, Phone Case",
        items: 5,
        amount: 825,
      },
    ],
  },
  "2024-03": {
    totalSales: 312,
    totalRevenue: 48000,
    avgOrder: 154,
    sales: [
      {
        id: "INV010",
        distributor: "Eve Adams",
        date: "2024-03-28",
        itemNames: "Tablet Pro, Phone Case",
        items: 2,
        amount: 825,
      },
      { id: "INV011", distributor: "Frank Miller", date: "2024-03-28", itemNames: "Tablet Pro, Phone Case", items: 3, amount: 825 },
      {
        id: "INV012",
        distributor: "Grace Lee",
        date: "2024-03-28",
        itemNames: "Tablet Pro, Phone Case",
        items: 7,
        amount: 825,
      },
      {
        id: "INV013",
        distributor: "Henry Ford",
        date: "2024-03-28",
        itemNames: "Tablet Pro, Phone Case",
        items: 1,
        amount: 825,
      },
      {
        id: "INV014",
        distributor: "Ivy Chen",
        date: "2024-03-28",
        itemNames: "Tablet Pro, Phone Case",
        items: 5,
        amount: 825,
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
      sale.distributor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.itemNames.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">View Sales Records</h1>
        <p className="mt-1 text-sm text-gray-600">Monthly sales summary and detailed records</p>
      </div>

      {/* Summary Cards */}
      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <Card className="border-0 bg-orange-50 shadow-sm">
          <CardContent className="px-6 py-2">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">Total Sales</p>
                <h3 className="mt-1 text-3xl font-bold text-gray-800">{data.totalSales}</h3>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-orange-500">
                <ShoppingCart className="h-7 w-7 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-pink-50 shadow-sm">
          <CardContent className="px-6 py-2">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">Total Revenue</p>
                <h3 className="mt-1 text-3xl font-bold text-gray-800">${data.totalRevenue.toLocaleString()}</h3>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-pink-500">
                <DollarSign className="h-7 w-7 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-cyan-50 shadow-sm">
          <CardContent className="px-6 py-2">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">Avg. Order Value</p>
                <h3 className="mt-1 text-3xl font-bold text-gray-800">${data.avgOrder}</h3>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-cyan-500">
                <TrendingUp className="h-7 w-7 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sales List Section */}
      <Card className="border-0 bg-white shadow-sm">
        <CardHeader className="">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-bold text-gray-800">Sales List</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {/* Search and Filter Section */}
          <div className="px-6 pb-4">
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
                <Select defaultValue="date">
                  <SelectTrigger className="w-24 h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">Date</SelectItem>
                    <SelectItem value="amount">Amount</SelectItem>
                    <SelectItem value="distributor">Distributor</SelectItem>
                  </SelectContent>
                </Select>
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
          </div>

          {/* Sales Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Invoice ID</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Distributor</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Item Names</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Items</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Amount</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Invoice Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredSales.map((sale) => (
                  <tr key={sale.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{sale.id}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{sale.distributor}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{sale.date}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{sale.itemNames}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{sale.items}</td>
                    <td className="px-4 py-3 text-sm font-bold text-gray-900">${sale.amount}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-blue-50">
                          <Eye className="h-4 w-4 text-blue-600" />
                        </Button>
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
            {filteredSales.length === 0 && (
              <div className="py-12 text-center">
                <p className="text-lg text-gray-500">No sales found matching your search</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
