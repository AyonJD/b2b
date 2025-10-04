"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2, ShoppingCart, Search, Printer } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const categories = ["Electronics", "Accessories", "Computers", "Peripherals", "Storage"]

const products = {
  Electronics: [
    { id: 1, name: "Premium Laptop", price: 1200, stock: 45 },
    { id: 2, name: "Tablet Pro", price: 800, stock: 32 },
    { id: 3, name: "Smartphone X", price: 999, stock: 67 },
  ],
  Accessories: [
    { id: 4, name: "Wireless Mouse", price: 30, stock: 120 },
    { id: 5, name: "USB-C Cable", price: 15, stock: 200 },
    { id: 6, name: "Phone Case", price: 25, stock: 150 },
  ],
  Computers: [
    { id: 7, name: "Desktop PC", price: 1500, stock: 28 },
    { id: 8, name: "Gaming Laptop", price: 2200, stock: 15 },
  ],
  Peripherals: [
    { id: 9, name: "Keyboard Pro", price: 100, stock: 85 },
    { id: 10, name: 'Monitor 27"', price: 400, stock: 42 },
  ],
  Storage: [
    { id: 11, name: "External SSD 1TB", price: 150, stock: 95 },
    { id: 12, name: "USB Flash Drive", price: 20, stock: 180 },
  ],
}

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
}

export default function MakeSale() {
  const [selectedCategory, setSelectedCategory] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [cart, setCart] = useState<CartItem[]>([])
  const [selectedProduct, setSelectedProduct] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [clientName, setClientName] = useState("")
  const [clientPhone, setClientPhone] = useState("")
  const [discount, setDiscount] = useState(0)
  const [showInvoice, setShowInvoice] = useState(false)
  const [invoiceNumber, setInvoiceNumber] = useState("")

  const allProducts = Object.values(products).flat()
  const filteredProducts = searchTerm
    ? allProducts.filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : selectedCategory
      ? products[selectedCategory as keyof typeof products]
      : []

  const addToCart = () => {
    const product = allProducts.find((p) => p.id.toString() === selectedProduct)
    if (product) {
      const existingItem = cart.find((item) => item.id === product.id)
      if (existingItem) {
        setCart(cart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item)))
      } else {
        setCart([...cart, { id: product.id, name: product.name, price: product.price, quantity }])
      }
      setSelectedProduct("")
      setQuantity(1)
    }
  }

  const removeFromCart = (id: number) => {
    setCart(cart.filter((item) => item.id !== id))
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discountAmount = discount
  const subtotalAfterDiscount = subtotal - discountAmount
  const total = subtotalAfterDiscount

  const completeSale = () => {
    const invNum = `INV-${Date.now().toString().slice(-6)}`
    setInvoiceNumber(invNum)
    setShowInvoice(true)
  }

  const resetSale = () => {
    setCart([])
    setClientName("")
    setClientPhone("")
    setDiscount(0)
    setShowInvoice(false)
  }

  return (
    <div className="min-h-[100svh] bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="mb-8 ">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center">Sales Dashboard</h1>
        <p className="mt-2 text-sm sm:text-base text-gray-600 text-center">Comprehensive analytics and performance insights</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <Card className="bg-white rounded-lg shadow-sm border-0">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold text-gray-800">Product Selection</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="clientName" className="text-sm font-medium text-gray-700">
                    Customer Name
                  </Label>
                  <Input
                    id="clientName"
                    placeholder="Enter client name"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="mt-1 border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <Label htmlFor="clientPhone" className="text-sm font-medium text-gray-700">
                    Phone Number
                  </Label>
                  <Input
                    id="clientPhone"
                    placeholder="Enter phone number"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="mt-1 border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="search" className="text-sm font-medium text-gray-700">
                  Direct Search
                </Label>
                <div className="relative mt-1">
                  <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <Input
                    id="search"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value)
                      setSelectedCategory("")
                    }}
                    className="pl-10 border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="category" className="text-sm font-medium text-gray-700">
                  Product Category
                </Label>
                <Select
                  value={selectedCategory}
                  onValueChange={(value) => {
                    setSelectedCategory(value)
                    setSearchTerm("")
                  }}
                >
                  <SelectTrigger id="category" className="mt-1 w-full border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="product" className="text-sm font-medium text-gray-700">
                  Product Item
                </Label>
                <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                  <SelectTrigger id="product" className="mt-1 w-full border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500">
                    <SelectValue placeholder="Select Product" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredProducts.map((product) => (
                      <SelectItem key={product.id} value={product.id.toString()}>
                        {product.name} - ${product.price} (Stock: {product.stock})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="quantity" className="text-sm font-medium text-gray-700">
                  Quantity
                </Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Number.parseInt(e.target.value) || 1)}
                  className="mt-1 border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <Button 
                onClick={addToCart} 
                disabled={!selectedProduct} 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-md"
              >
                <Plus className="mr-2 h-5 w-5" />
                + Add to Cart
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-[#155DFC] rounded-lg shadow-sm border-0">
          <CardHeader className="pb-0">
            <CardTitle className="flex w-full items-center justify-center gap-2 text-xl font-bold text-white">
              <ShoppingCart className="h-6 w-6" />
              Sale Invoice
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {cart.length === 0 ? (
                <div className="py-12 text-center">
                  <ShoppingCart className="mx-auto h-16 w-16 text-white/60" />
                  <p className="mt-4 text-lg text-white/80">No items in cart</p>
                </div>
              ) : (
                <>
                  <div className="space-y-2 bg-white rounded-md max-h-64 overflow-y-auto pr-2">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between border-b border-gray-200 p-3"
                      >
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-800">{item.name}</p>
                          <p className="text-xs text-gray-500">(${item.price} x {item.quantity})</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-bold text-gray-800">${item.price * item.quantity}</span>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="bg-orange-500 hover:bg-orange-600 text-white p-1 rounded"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-white rounded-md p-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="discount" className="text-sm font-medium text-gray-700">
                        Discount
                      </Label>
                      <Input
                        id="discount"
                        type="number"
                        min="0"
                        value={discount}
                        onChange={(e) => setDiscount(Number.parseFloat(e.target.value) || 0)}
                        className="w-20 border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 text-right"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <div className="space-y-2  rounded-md p-4">
                    <div className="flex justify-between text-gray-800">
                      <span className="text-white">Subtotal</span>
                      <span className="text-white">${subtotal.toFixed(2)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-gray-800">
                        <span className="text-yellow-500">Discount</span>
                        <span className="text-yellow-500">-${discountAmount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between border-t border-gray-200 pt-2 text-lg font-bold text-gray-800">
                      <span className="text-white">Total</span>
                      <span className="text-white">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <Button 
                    onClick={completeSale} 
                    className="w-full bg-orange-500 hover:bg-orange-600 text-black font-bold py-3 rounded-md"
                  >
                    Complete Sale
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={showInvoice} onOpenChange={setShowInvoice}>
        <DialogContent className="max-w-[min(100vw-2rem,42rem)]">
          <DialogHeader>
            <DialogTitle className="text-2xl">Sale Completed Successfully!</DialogTitle>
            <DialogDescription>Invoice #{invoiceNumber}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="rounded-lg border border-border bg-secondary p-4">
              <h3 className="mb-3 text-lg font-semibold text-foreground">Client Information</h3>
              <div className="space-y-1">
                <p className="text-foreground">
                  <span className="font-medium">Name:</span> {clientName || "N/A"}
                </p>
                <p className="text-foreground">
                  <span className="font-medium">Phone:</span> {clientPhone || "N/A"}
                </p>
                <p className="text-foreground">
                  <span className="font-medium">Date:</span> {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-secondary p-4">
              <h3 className="mb-3 text-lg font-semibold text-foreground">Items</h3>
              <div className="space-y-2">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-foreground">
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-border bg-secondary p-4">
              <div className="space-y-2">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[hsl(var(--color-accent-green))]">
                    <span>Discount</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between border-t border-border pt-2 text-xl font-bold text-foreground">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button onClick={resetSale} className="flex-1" size="lg">
                <Plus className="mr-2 h-5 w-5" />
                New Sale
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent" size="lg">
                <Printer className="mr-2 h-5 w-5" />
                Print Invoice
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
