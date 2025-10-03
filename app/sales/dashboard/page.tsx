"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatCard } from "@/components/stat-card"
import { DollarSign, ShoppingCart, TrendingUp, Users, Package, CreditCard } from "lucide-react"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts"

const salesData = [
  { month: "Jan", sales: 45000, revenue: 52000, orders: 245 },
  { month: "Feb", sales: 52000, revenue: 61000, orders: 289 },
  { month: "Mar", sales: 48000, revenue: 55000, orders: 312 },
  { month: "Apr", sales: 61000, revenue: 72000, orders: 356 },
  { month: "May", sales: 55000, revenue: 65000, orders: 298 },
  { month: "Jun", sales: 67000, revenue: 78000, orders: 412 },
]

const categoryData = [
  { name: "Electronics", value: 35, sales: 294000 },
  { name: "Computers", value: 28, sales: 245000 },
  { name: "Accessories", value: 18, sales: 156000 },
  { name: "Peripherals", value: 12, sales: 98000 },
  { name: "Storage", value: 7, sales: 67000 },
]

const COLORS = [
  "hsl(var(--color-accent-cyan))",
  "hsl(var(--color-accent-yellow))",
  "hsl(var(--color-accent-orange))",
  "hsl(var(--color-accent-purple))",
  "hsl(var(--color-accent-pink))",
]

const dailySalesData = [
  { day: "Mon", sales: 8500 },
  { day: "Tue", sales: 9200 },
  { day: "Wed", sales: 11000 },
  { day: "Thu", sales: 10500 },
  { day: "Fri", sales: 13000 },
  { day: "Sat", sales: 15000 },
  { day: "Sun", sales: 12800 },
]

const topProducts = [
  { name: "Premium Laptop", sold: 245, revenue: "$294,000", trend: "+12%", category: "Electronics" },
  { name: "Gaming Laptop", sold: 189, revenue: "$415,800", trend: "+24%", category: "Computers" },
  { name: "Desktop PC", sold: 156, revenue: "$234,000", trend: "+18%", category: "Computers" },
  { name: "Wireless Mouse", sold: 892, revenue: "$26,760", trend: "+8%", category: "Accessories" },
  { name: 'Monitor 27"', sold: 189, revenue: "$75,600", trend: "+18%", category: "Peripherals" },
]

export default function SalesDashboard() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground">Sales Dashboard</h1>
        <p className="mt-2 text-lg text-muted-foreground">Comprehensive analytics and performance insights</p>
      </div>

      <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value="$463,000"
          change="+12.5% from last month"
          changeType="positive"
          icon={DollarSign}
          iconColor="bg-gradient-to-br from-[hsl(var(--color-accent-cyan))] to-[hsl(var(--color-primary))]"
        />
        <StatCard
          title="Total Sales"
          value="3,022"
          change="+8.2% from last month"
          changeType="positive"
          icon={ShoppingCart}
          iconColor="bg-gradient-to-br from-[hsl(var(--color-accent-yellow))] to-[hsl(var(--color-accent-orange))]"
        />
        <StatCard
          title="Avg. Order Value"
          value="$153"
          change="+3.1% from last month"
          changeType="positive"
          icon={TrendingUp}
          iconColor="bg-gradient-to-br from-[hsl(var(--color-accent-purple))] to-[hsl(var(--color-accent-pink))]"
        />
        <StatCard
          title="Active Customers"
          value="1,284"
          change="+18.7% from last month"
          changeType="positive"
          icon={Users}
          iconColor="bg-gradient-to-br from-[hsl(var(--color-accent-green))] to-[hsl(var(--color-accent-cyan))]"
        />
      </div>

      <div className="mb-8 grid gap-6 md:grid-cols-3">
        <Card className="border-border bg-card">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Conversion Rate</p>
                <h3 className="mt-2 text-3xl font-bold text-foreground">24.8%</h3>
                <p className="mt-1 text-sm text-[hsl(var(--color-accent-green))]">+2.4% from last month</p>
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
                <p className="text-sm font-medium text-muted-foreground">Products Sold</p>
                <h3 className="mt-2 text-3xl font-bold text-foreground">8,456</h3>
                <p className="mt-1 text-sm text-[hsl(var(--color-accent-green))]">+15.3% from last month</p>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[hsl(var(--color-accent-orange))] to-[hsl(var(--color-accent-red))]">
                <Package className="h-7 w-7 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Payment Success</p>
                <h3 className="mt-2 text-3xl font-bold text-foreground">98.2%</h3>
                <p className="mt-1 text-sm text-[hsl(var(--color-accent-green))]">+0.8% from last month</p>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[hsl(var(--color-accent-purple))] to-[hsl(var(--color-accent-pink))]">
                <CreditCard className="h-7 w-7 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-8 grid gap-6 lg:grid-cols-2">
        <Card className="border-border bg-card overflow-hidden">
          <CardHeader>
            <CardTitle className="text-2xl text-foreground">Monthly Sales Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full overflow-x-auto">
              <div className="min-w-[560px] sm:min-w-0">
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--color-accent-cyan))" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="hsl(var(--color-accent-cyan))" stopOpacity={0} />
                  </linearGradient>
                </defs>
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
                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke="hsl(var(--color-accent-cyan))"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorSales)"
                />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card overflow-hidden">
          <CardHeader>
            <CardTitle className="text-2xl text-foreground">Sales by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full overflow-x-auto">
              <div className="min-w-[560px] sm:min-w-0">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  formatter={(value: number, name: string, props: any) => [
                    `${value}% ($${props.payload.sales.toLocaleString()})`,
                    name,
                  ]}
                />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-8 grid gap-6 lg:grid-cols-2">
        <Card className="border-border bg-card overflow-hidden">
          <CardHeader>
            <CardTitle className="text-2xl text-foreground">Weekly Sales Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full overflow-x-auto">
              <div className="min-w-[560px] sm:min-w-0">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={dailySalesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="sales" fill="hsl(var(--color-accent-yellow))" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card overflow-hidden">
          <CardHeader>
            <CardTitle className="text-2xl text-foreground">Order Volume Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full overflow-x-auto">
              <div className="min-w-[560px] sm:min-w-0">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={salesData}>
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
                <Line
                  type="monotone"
                  dataKey="orders"
                  stroke="hsl(var(--color-accent-purple))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--color-accent-purple))", r: 6 }}
                />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-2xl text-foreground">Top Selling Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div
                key={product.name}
                className="grid gap-3 rounded-lg border border-border bg-muted p-4 sm:grid-cols-[1fr_auto] sm:items-start"
              >
                {/* Mobile: centered rank badge on top */}
                <div className="sm:hidden flex justify-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-br from-gray-200 to-gray-500 text-xl font-extrabold text-white shadow-lg">
                    {index + 1}
                  </div>
                </div>

                {/* Info block; desktop keeps badge on the left */}
                <div className="flex items-start gap-4">
                  <div className="hidden sm:flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-gray-200 to-gray-500 text-lg font-bold text-white shadow-sm">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-foreground leading-snug">{product.name}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {product.category} • {product.sold} units sold
                    </p>
                  </div>
                </div>

                {/* Price/Trend */}
                <div className="text-left sm:text-right sm:ml-6">
                  <p className="text-base sm:text-xl font-bold text-foreground leading-tight">{product.revenue}</p>
                  <p className="text-xs sm:text-sm font-medium text-[hsl(var(--color-accent-green))]">{product.trend}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
