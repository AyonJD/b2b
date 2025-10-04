"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, DollarSign, Users, Package, CreditCard } from "lucide-react"
import {
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
  { month: "Jan", income: 20000, expense: 10000 },
  { month: "Feb", income: 35000, expense: 25000 },
  { month: "Mar", income: 90000, expense: 80000 },
  { month: "Apr", income: 75000, expense: 65000 },
  { month: "May", income: 50000, expense: 20000 },
  { month: "Jun", income: 65000, expense: 45000 },
  { month: "Jul", income: 80000, expense: 50000 },
  { month: "Aug", income: 85000, expense: 30000 },
]

const categoryData = [
  { name: "Electronics", value: 35 },
  { name: "Computers", value: 25 },
  { name: "Accessories", value: 20 },
  { name: "Peripherals", value: 12 },
  { name: "Storage", value: 8 },
]

const COLORS = ["#3B82F6", "#8B5CF6", "#F97316", "#10B981", "#EF4444"]

const bestSellerProducts = [
  { name: "Lenovo 3rd Generation", price: "$4420", sales: "6547", icon: "💻" },
  { name: "Bold V3.2", price: "$1474", sales: "3474", icon: "👟" },
  { name: "Nike Jordan", price: "$8784", sales: "1478", icon: "🎧" },
  { name: "Apple Series 5 Watch", price: "$3240", sales: "987", icon: "⌚" },
  { name: "Amazon Echo Dot", price: "$597", sales: "784", icon: "🔊" },
]

export default function SalesDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900 sm:text-2xl md:text-3xl">Sales Dashboard</h1>
            <p className="mt-1 text-xs text-gray-600 sm:text-sm">Comprehensive analytics and performance insights</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500 sm:text-sm">
            <div className="h-3 w-3 rounded bg-gray-400"></div>
            <span className="hidden sm:inline">Sales Dashboard - B2B Module Stock</span>
            <span className="sm:hidden">B2B Module</span>
          </div>
        </div>
      </div>

       {/* Stats Cards Grid - Responsive layout */}
       <div className="mb-8 grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {/* First Row - 3 KPI cards + Total Revenue */}
        {/* Total Sales */}
        <Card className="border-0 bg-orange-50 shadow-sm">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-xs sm:text-sm font-medium text-gray-700">Total Sales</p>
                <h3 className="mt-1 text-lg sm:text-2xl font-bold text-gray-800">3,022</h3>
                <p className="mt-1 text-xs text-orange-500">+8.2% From last month</p>
              </div>
              <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-orange-500 flex-shrink-0 ml-2">
                <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Avg. Order Value */}
        <Card className="border-0 bg-pink-50 shadow-sm">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-xs sm:text-sm font-medium text-gray-700">Avg. Order Value</p>
                <h3 className="mt-1 text-lg sm:text-2xl font-bold text-gray-800">$153</h3>
                <p className="mt-1 text-xs text-purple-500">+3.1% From last month</p>
              </div>
              <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-purple-500 flex-shrink-0 ml-2">
                <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Customers */}
        <Card className="border-0 bg-blue-50 shadow-sm">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-xs sm:text-sm font-medium text-gray-700">Active Customers</p>
                <h3 className="mt-1 text-lg sm:text-2xl font-bold text-gray-800">1,284</h3>
                <p className="mt-1 text-xs text-blue-500">+18.7% From last month</p>
              </div>
              <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-blue-500 flex-shrink-0 ml-2">
                <Users className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
      </div>
          </CardContent>
        </Card>

        {/* Total Revenue Card - Responsive positioning */}
        <Card className="border-0 bg-white shadow-sm sm:row-span-2">
          <CardContent className="p-4 sm:p-6 text-center h-full flex flex-col justify-center">
            <p className="text-xs sm:text-sm font-medium text-gray-700">Total Revenue</p>
            <p className="text-xs text-gray-500 mb-2">From last month</p>
            <h3 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-2">$463,000</h3>
            <p className="text-xs sm:text-sm text-green-500">+12.5%</p>
          </CardContent>
        </Card>

        {/* Conversion Rate */}
        <Card className="border-0 bg-purple-50 shadow-sm">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-xs sm:text-sm font-medium text-gray-700">Conversion Rate</p>
                <h3 className="mt-1 text-lg sm:text-2xl font-bold text-gray-800">24.8%</h3>
                <p className="mt-1 text-xs text-green-500">+2.4% From last month</p>
              </div>
              <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-purple-500 flex-shrink-0 ml-2">
                <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Products Sold */}
        <Card className="border-0 bg-cyan-50 shadow-sm">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-xs sm:text-sm font-medium text-gray-700">Products Sold</p>
                <h3 className="mt-1 text-lg sm:text-2xl font-bold text-gray-800">8,456</h3>
                <p className="mt-1 text-xs text-green-500">+15.3% From last month</p>
              </div>
              <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-cyan-500 flex-shrink-0 ml-2">
                <Package className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Success */}
        <Card className="border-0 bg-green-50 shadow-sm">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-xs sm:text-sm font-medium text-gray-700">Payment Success</p>
                <h3 className="mt-1 text-lg sm:text-2xl font-bold text-gray-800">98.2%</h3>
                <p className="mt-1 text-xs text-green-500">Increase by +200 this week</p>
              </div>
              <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-green-500 flex-shrink-0 ml-2">
                <CreditCard className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid - Responsive layout */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-3">
        {/* Monthly Sales Trend */}
        <Card className="border-0 bg-white shadow-sm">
          <CardHeader className="pb-3 sm:pb-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle className="text-base sm:text-lg font-bold text-gray-800">Monthly Sales Trend</CardTitle>
              <Select defaultValue="yearly">
                <SelectTrigger className="w-20 sm:w-24 h-7 sm:h-8 text-xs sm:text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yearly">Yearly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs sm:text-sm text-gray-600">Income</span>
              <span className="text-xs sm:text-sm font-semibold text-gray-800">$26,201</span>
              <span className="text-xs sm:text-sm text-green-500">10%-</span>
              <div className="h-2 w-2 sm:h-3 sm:w-3 bg-green-500 rounded-sm"></div>
            </div>
          </CardHeader>
          <CardContent className="p-3 sm:p-6">
            <div className="w-full overflow-x-auto pb-2" style={{ scrollbarGutter: "stable both-edges" }}>
              <div className="min-w-[400px] sm:min-w-0">
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={salesData}>
                <defs>
                      <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#F97316" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#F97316" stopOpacity={0} />
                  </linearGradient>
                </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis 
                      dataKey="month" 
                      stroke="#6B7280" 
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis 
                      stroke="#6B7280" 
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => {
                        if (value === 0) return '$0'
                        if (value === 10000) return '$10k'
                        if (value === 25000) return '$25k'
                        if (value === 50000) return '$50k'
                        if (value === 100000) return '$100k'
                        return ''
                      }}
                      domain={[0, 100000]}
                      ticks={[0, 10000, 25000, 50000, 100000]}
                    />
                <Tooltip
                  contentStyle={{
                        backgroundColor: "#FFFFFF",
                        border: "1px solid #E5E7EB",
                    borderRadius: "8px",
                        fontSize: "12px",
                      }}
                      formatter={(value: number, name: string) => [
                        `$${value.toLocaleString()}`,
                        name === 'income' ? 'Income' : 'Expense'
                      ]}
                    />
                    <Area
                      type="monotone"
                      dataKey="income"
                      stroke="#3B82F6"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorIncome)"
                />
                <Area
                  type="monotone"
                      dataKey="expense"
                      stroke="#F97316"
                      strokeWidth={2}
                  fillOpacity={1}
                      fill="url(#colorExpense)"
                />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>

         {/* Best Seller */}
         <Card className="border-0 bg-white shadow-sm">
           <CardHeader className="pb-3 sm:pb-4">
             <div className="flex items-center justify-between">
               <CardTitle className="text-base sm:text-lg font-bold text-gray-800">Best Seller</CardTitle>
               <span className="text-xs sm:text-sm text-blue-500 cursor-pointer">View All</span>
             </div>
           </CardHeader>
           <CardContent className="p-3 sm:p-6">
             <div className="space-y-2 sm:space-y-3">
               {bestSellerProducts.map((product) => (
                 <div key={product.name} className="flex items-center justify-between py-1 sm:py-2">
                   <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                     <div className="text-sm sm:text-lg flex-shrink-0">{product.icon}</div>
                     <div className="min-w-0 flex-1">
                       <p className="text-xs sm:text-sm font-medium text-gray-800 truncate">{product.name}</p>
                     </div>
                   </div>
                   <div className="text-right flex-shrink-0 ml-2">
                     <p className="text-xs sm:text-sm font-bold text-gray-800">{product.price}</p>
                     <p className="text-xs text-gray-500">Sales {product.sales}</p>
                   </div>
                 </div>
               ))}
             </div>
           </CardContent>
         </Card>

        {/* Sales by Category */}
        <Card className="border-0 bg-white shadow-sm">
          <CardHeader className="pb-3 sm:pb-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle className="text-base sm:text-lg font-bold text-gray-800">Sales by Category</CardTitle>
              <Select defaultValue="yearly">
                <SelectTrigger className="w-20 sm:w-24 h-7 sm:h-8 text-xs sm:text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yearly">Yearly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="p-3 sm:p-6">
            <div className="flex flex-col items-center gap-4 sm:gap-6">
              <div className="w-full">
                <ResponsiveContainer width="100%" height={180}>
                  <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                      outerRadius={70}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                        backgroundColor: "#FFFFFF",
                        border: "1px solid #E5E7EB",
                    borderRadius: "8px",
                        fontSize: "12px",
                  }}
                />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {categoryData.map((entry, index) => (
                    <div key={entry.name} className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-sm flex-shrink-0" 
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      ></div>
                      <span className="text-xs sm:text-sm text-gray-700">{entry.name}</span>
            </div>
                  ))}
            </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

