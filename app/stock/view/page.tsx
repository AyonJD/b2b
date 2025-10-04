"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

const stockData = [
  { id: 1, name: "Premium Laptop", stock: 70, minStock: 15, price: 1200 },
  { id: 2, name: "Tablet Pro", stock: 20, minStock: 15, price: 800 },
  { id: 3, name: "Smartphone X", stock: 8, minStock: 15, price: 999 },
  { id: 4, name: "Desktop", stock: 5, minStock: 15, price: 1500 },
  { id: 5, name: "Monitor", stock: 25, minStock: 15, price: 400 },
]

export default function ViewStock() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showEntries, setShowEntries] = useState("10")
  const [requisitionItem, setRequisitionItem] = useState<string | null>(null)
  const [requisitionQty, setRequisitionQty] = useState(10)

  const handleRequisition = () => {
    alert(`Requisition submitted for ${requisitionQty} units`)
    setRequisitionItem(null)
    setRequisitionQty(10)
  }

  const getStockPercentage = (stock: number, minStock: number) => {
    // Calculate percentage based on how much stock we have compared to minimum required
    // If stock is above minStock, show 100%+ 
    // If stock is below minStock, show actual percentage
    if (stock >= minStock) {
      return Math.min(100, Math.round((stock / minStock) * 100))
    } else {
      return Math.round((stock / minStock) * 100)
    }
  }

  const getStockBadgeColor = (stock: number, minStock: number) => {
    if (stock >= minStock) return "bg-green-100 text-green-700"
    if (stock >= minStock * 0.5) return "bg-yellow-100 text-yellow-700"
    return "bg-red-100 text-red-700"
  }

  const getProgressBarColor = (stock: number, minStock: number) => {
    if (stock >= minStock) return "bg-green-500"
    if (stock >= minStock * 0.5) return "bg-yellow-500"
    return "bg-red-500"
  }

  const filteredData = stockData.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">View Stock</h1>
        <p className="mt-1 text-sm text-gray-500">Current inventory by product category</p>
      </div>

      <div className="mb-6 rounded-lg bg-white p-4 sm:p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            {/* Search input */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Show entries dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Show</span>
              <Select value={showEntries} onValueChange={setShowEntries}>
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Add Stock button */}
          <Button className="bg-blue-500 hover:bg-blue-600 w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Add Stock
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg bg-white shadow-sm">
        <table className="w-full min-w-[800px]">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-3 py-3 text-left text-xs sm:text-sm font-semibold text-gray-700">SL</th>
              <th className="px-3 py-3 text-left text-xs sm:text-sm font-semibold text-gray-700">Name</th>
              <th className="px-3 py-3 text-left text-xs sm:text-sm font-semibold text-gray-700">Price</th>
              <th className="px-3 py-3 text-left text-xs sm:text-sm font-semibold text-gray-700">Current Stock</th>
              <th className="px-3 py-3 text-left text-xs sm:text-sm font-semibold text-gray-700">Min. Stock</th>
              <th className="px-3 py-3 text-left text-xs sm:text-sm font-semibold text-gray-700">Status</th>
              <th className="px-3 py-3 text-left text-xs sm:text-sm font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredData.map((item, index) => {
              const percentage = getStockPercentage(item.stock, item.minStock)
              const selectedItem = stockData.find((i) => i.id === item.id)

              return (
                <tr key={item.id} className="hover:bg-gray-50">
                  {/* Serial Number */}
                  <td className="px-3 py-4 text-xs sm:text-sm text-gray-600">{String(index + 1).padStart(2, "0")}</td>

                  {/* Product Name */}
                  <td className="px-3 py-4 text-xs sm:text-sm font-medium text-gray-900">{item.name}</td>

                  {/* Price */}
                  <td className="px-3 py-4 text-xs sm:text-sm text-gray-600">${item.price}</td>

                  {/* Current Stock with colored badge */}
                  <td className="px-3 py-4">
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${getStockBadgeColor(item.stock, item.minStock)}`}
                    >
                      {item.stock} units
                    </span>
                  </td>

                  {/* Min Stock */}
                  <td className="px-3 py-4 text-xs sm:text-sm text-gray-600">{item.minStock} units</td>

                  {/* Status with progress bar */}
                  <td className="px-3 py-4">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-20 sm:w-32 overflow-hidden rounded-full bg-gray-200">
                        <div
                          className={`h-full ${getProgressBarColor(item.stock, item.minStock)}`}
                          style={{ width: `${Math.min(percentage, 100)}%` }}
                        />
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-gray-700">{percentage}%</span>
                    </div>
                  </td>

                  {/* Action button */}
                  <td className="px-3 py-4">
                    <Dialog
                      open={requisitionItem === item.name}
                      onOpenChange={(open) => !open && setRequisitionItem(null)}
                    >
                      <DialogTrigger asChild>
                        <Button
                          className="bg-green-500 hover:bg-green-600 text-xs sm:text-sm"
                          size="sm"
                          onClick={() => setRequisitionItem(item.name)}
                        >
                          Make Requisition
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-[95vw] sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle className="text-xl sm:text-2xl">Stock Requisition</DialogTitle>
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
                              <span className="text-lg sm:text-xl font-bold text-foreground">
                                ${selectedItem ? (selectedItem.price * requisitionQty).toLocaleString() : 0}
                              </span>
                            </div>
                          </div>
                          <Button onClick={handleRequisition} className="w-full" size="lg">
                            Submit Requisition
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
