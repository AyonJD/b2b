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
  const discountAmount = (subtotal * discount) / 100
  const subtotalAfterDiscount = subtotal - discountAmount
  const tax = subtotalAfterDiscount * 0.1
  const total = subtotalAfterDiscount + tax

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
    <div className="min-h-screen bg-background p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground">Make Sale</h1>
        <p className="mt-2 text-lg text-muted-foreground">Add products and complete the transaction</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-2xl text-foreground">Product Selection</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="clientName" className="text-foreground">
                    Client Name
                  </Label>
                  <Input
                    id="clientName"
                    placeholder="Enter client name"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="clientPhone" className="text-foreground">
                    Phone Number
                  </Label>
                  <Input
                    id="clientPhone"
                    placeholder="Enter phone number"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="mt-2"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="search" className="text-foreground">
                  Direct Search
                </Label>
                <div className="relative mt-2">
                  <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value)
                      setSelectedCategory("")
                    }}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="category" className="text-foreground">
                  Product Category
                </Label>
                <Select
                  value={selectedCategory}
                  onValueChange={(value) => {
                    setSelectedCategory(value)
                    setSearchTerm("")
                  }}
                >
                  <SelectTrigger id="category" className="mt-2">
                    <SelectValue placeholder="Select category" />
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
                <Label htmlFor="product" className="text-foreground">
                  Select Product
                </Label>
                <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                  <SelectTrigger id="product" className="mt-2">
                    <SelectValue placeholder="Choose product" />
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
                <Label htmlFor="quantity" className="text-foreground">
                  Quantity
                </Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Number.parseInt(e.target.value) || 1)}
                  className="mt-2"
                />
              </div>

              <Button onClick={addToCart} disabled={!selectedProduct} className="w-full" size="lg">
                <Plus className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl text-foreground">
              <ShoppingCart className="h-6 w-6" />
              Sale Invoice
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {(clientName || clientPhone) && (
                <div className="rounded-lg border border-border bg-secondary p-4">
                  <h4 className="mb-2 font-semibold text-foreground">Client Information</h4>
                  {clientName && <p className="text-sm text-foreground">Name: {clientName}</p>}
                  {clientPhone && <p className="text-sm text-foreground">Phone: {clientPhone}</p>}
                </div>
              )}

              {cart.length === 0 ? (
                <div className="py-12 text-center">
                  <ShoppingCart className="mx-auto h-16 w-16 text-muted-foreground" />
                  <p className="mt-4 text-lg text-muted-foreground">No items in cart</p>
                </div>
              ) : (
                <>
                  <div className="space-y-3">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between rounded-lg border border-border bg-secondary p-4"
                      >
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            ${item.price} × {item.quantity}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <p className="text-lg font-bold text-foreground">${item.price * item.quantity}</p>
                          <Button variant="destructive" size="icon" onClick={() => removeFromCart(item.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-lg border border-border bg-secondary p-4">
                    <Label htmlFor="discount" className="text-foreground">
                      Discount (%)
                    </Label>
                    <Input
                      id="discount"
                      type="number"
                      min="0"
                      max="100"
                      value={discount}
                      onChange={(e) => setDiscount(Number.parseInt(e.target.value) || 0)}
                      className="mt-2"
                    />
                  </div>

                  <div className="space-y-2 border-t border-border pt-4">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-[hsl(var(--color-accent-green))]">
                        <span>Discount ({discount}%)</span>
                        <span>-${discountAmount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-muted-foreground">
                      <span>Tax (10%)</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between border-t border-border pt-2 text-xl font-bold text-foreground">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <Button onClick={completeSale} className="w-full" size="lg">
                    Complete Sale
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={showInvoice} onOpenChange={setShowInvoice}>
        <DialogContent className="max-w-2xl">
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
                    <span>Discount ({discount}%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-muted-foreground">
                  <span>Tax (10%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
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
