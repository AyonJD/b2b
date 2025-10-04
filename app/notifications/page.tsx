"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Bell, CheckCircle, DollarSign, Info, Package, ShoppingCart, TrendingUp, X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

const notifications = [
  {
    id: 1,
    type: "warning",
    category: "Stock",
    title: "Low Stock Alert",
    message: "Gaming Laptop stock is running low",
    details:
      "Current stock: 15 units. Minimum required: 10 units. Recommended: 30 units. Please consider restocking to avoid stockouts.",
    time: "2 hours ago",
    read: false,
    icon: AlertTriangle,
  },
  {
    id: 2,
    type: "success",
    category: "Sales",
    title: "Large Order Completed",
    message: "Order #INV-2024-156 completed successfully",
    details:
      "Customer: Enterprise Client A. Total amount: $12,450. Items: 15 units across 5 products. Payment received and confirmed.",
    time: "3 hours ago",
    read: false,
    icon: CheckCircle,
  },
  {
    id: 3,
    type: "info",
    category: "Accounts",
    title: "Monthly Revenue Target Achieved",
    message: "March revenue target of $450K reached",
    details:
      "Congratulations! The monthly revenue target has been achieved with 3 days remaining. Current revenue: $463,000 (102.9% of target).",
    time: "5 hours ago",
    read: true,
    icon: TrendingUp,
  },
  {
    id: 4,
    type: "warning",
    category: "Stock",
    title: "Stock Requisition Pending",
    message: "3 requisition requests awaiting approval",
    details:
      'Pending requisitions: Desktop PC (20 units), Monitor 27" (15 units), Tablet Pro (25 units). Total estimated cost: $67,500.',
    time: "1 day ago",
    read: true,
    icon: Package,
  },
  {
    id: 5,
    type: "info",
    category: "Sales",
    title: "New Customer Registration",
    message: "5 new customers registered today",
    details:
      "New customer registrations: John Smith, Sarah Johnson, Mike Davis, Emily Brown, and Chris Wilson. Total customer base: 1,289.",
    time: "1 day ago",
    read: true,
    icon: ShoppingCart,
  },
  {
    id: 6,
    type: "success",
    category: "Accounts",
    title: "Payment Received",
    message: "Invoice #INV-2024-145 paid in full",
    details:
      "Customer: Retailer B. Amount: $8,900. Payment method: Bank transfer. Invoice date: March 15, 2024. Payment received on time.",
    time: "2 days ago",
    read: true,
    icon: DollarSign,
  },
  {
    id: 7,
    type: "warning",
    category: "Stock",
    title: "Low Stock Alert",
    message: "Multiple items below minimum stock level",
    details:
      'Items requiring attention: Desktop PC (28 units), Monitor 27" (42 units), Tablet Pro (32 units). Consider bulk ordering for better pricing.',
    time: "2 days ago",
    read: true,
    icon: AlertTriangle,
  },
  {
    id: 8,
    type: "info",
    category: "Sales",
    title: "Weekly Sales Report",
    message: "Week 12 sales summary available",
    details:
      "Total sales: 287 transactions. Revenue: $52,340. Top product: Premium Laptop (45 units). Average order value: $182.",
    time: "3 days ago",
    read: true,
    icon: Info,
  },
]

export default function NotificationsPage() {
  const [notificationList, setNotificationList] = useState(notifications)
  const [filter, setFilter] = useState<"all" | "unread">("all")

  const unreadCount = notificationList.filter((n) => !n.read).length

  const markAsRead = (id: number) => {
    setNotificationList(notificationList.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotificationList(notificationList.map((n) => ({ ...n, read: true })))
  }

  const deleteNotification = (id: number) => {
    setNotificationList(notificationList.filter((n) => n.id !== id))
  }

  const filteredNotifications = filter === "unread" ? notificationList.filter((n) => !n.read) : notificationList

  const getTypeColor = (type: string) => {
    switch (type) {
      case "warning":
        return "bg-[hsl(var(--color-accent-orange))]/20 text-[hsl(var(--color-accent-orange))]"
      case "success":
        return "bg-[hsl(var(--color-accent-green))]/20 text-[hsl(var(--color-accent-green))]"
      case "info":
        return "bg-[hsl(var(--color-accent-cyan))]/20 text-[hsl(var(--color-accent-cyan))]"
      default:
        return "bg-secondary text-foreground"
    }
  }

  const getIconColor = (type: string) => {
    switch (type) {
      case "warning":
        return "bg-[hsl(var(--color-accent-orange))]"
      case "success":
        return "bg-[hsl(var(--color-accent-green))]"
      case "info":
        return "bg-[hsl(var(--color-accent-cyan))]"
      default:
        return "bg-primary"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="mt-1 text-sm text-gray-600">
            System activities and important updates{" "}
            {unreadCount > 0 && <span className="text-gray-900">({unreadCount} unread)</span>}
          </p>
        </div>

        <div className="mb-6 flex flex-wrap gap-2 sm:gap-3">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
            className={
              filter === "all"
                ? "bg-orange-500 hover:bg-orange-600 text-white border-0"
                : "bg-white hover:bg-gray-50 text-gray-700 border border-gray-300"
            }
          >
            All
          </Button>
          <Button
            variant={filter === "unread" ? "default" : "outline"}
            onClick={() => setFilter("unread")}
            className={
              filter === "unread"
                ? "bg-orange-500 hover:bg-orange-600 text-white border-0"
                : "bg-white hover:bg-gray-50 text-gray-700 border border-gray-300"
            }
          >
            Unread ({unreadCount})
          </Button>
          {unreadCount > 0 && (
            <Button
              variant="outline"
              onClick={markAllAsRead}
              className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300"
            >
              Mark All Read
            </Button>
          )}
        </div>

        <div className="space-y-3">
          {filteredNotifications.length === 0 ? (
            <Card className="border-0 bg-white shadow-sm">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <Bell className="h-16 w-16 text-gray-400" />
                <p className="mt-4 text-lg text-gray-500">No notifications to display</p>
              </CardContent>
            </Card>
          ) : (
             filteredNotifications.map((notification) => (
               <Card
                 key={notification.id}
                 className={cn("border-0 shadow-sm transition-all", notification.read ? "bg-white" : "bg-blue-50")}
               >
                 <CardContent className="py-3 px-4 sm:py-4 sm:px-5">
                   <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                     <div className="flex-1 min-w-0">
                       <div className="mb-2 flex items-center gap-2">
                         <span className="text-xs text-gray-600">{notification.category}</span>
                         {notification.read ? (
                           <Badge className="bg-orange-500 hover:bg-orange-500 text-white text-xs px-2 py-0.5 font-normal">
                             Seen
                           </Badge>
                         ) : (
                           <Badge className="bg-blue-500 hover:bg-blue-500 text-white text-xs px-2 py-0.5 font-normal">
                             New
                           </Badge>
                         )}
                       </div>
                       <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1">{notification.title}</h3>
                       <p className="text-xs sm:text-sm text-gray-600 mb-2">{notification.message}</p>
                       <p className="text-xs text-gray-500">{notification.time}</p>
                     </div>

                     <div className="flex items-center justify-end sm:justify-start gap-2 flex-shrink-0">
                       <Dialog>
                         <DialogTrigger asChild>
                           <Button
                             variant="outline"
                             size="sm"
                             onClick={() => !notification.read && markAsRead(notification.id)}
                             className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 h-7 sm:h-8 px-2 sm:px-3 text-xs"
                           >
                             <Info className="mr-1 h-3 w-3" />
                             <span className="hidden sm:inline">Details</span>
                           </Button>
                         </DialogTrigger>
                         <DialogContent className="max-w-[95vw] sm:max-w-md">
                           <DialogHeader>
                             <DialogTitle className="flex items-center gap-2 text-lg sm:text-xl">
                               <notification.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                               {notification.title}
                             </DialogTitle>
                             <DialogDescription>
                               <Badge className={getTypeColor(notification.type)}>{notification.category}</Badge>
                             </DialogDescription>
                           </DialogHeader>
                           <div className="space-y-4">
                             <div className="rounded-lg bg-secondary p-4">
                               <p className="text-sm text-foreground">{notification.details}</p>
                             </div>
                             <div className="flex justify-between text-xs sm:text-sm text-muted-foreground">
                               <span>Time: {notification.time}</span>
                               <span>Status: {notification.read ? "Read" : "Unread"}</span>
                             </div>
                           </div>
                         </DialogContent>
                       </Dialog>

                       <Button
                         variant="ghost"
                         size="icon"
                         onClick={() => deleteNotification(notification.id)}
                         className="text-gray-400 hover:text-gray-600 hover:bg-transparent h-7 w-7 sm:h-8 sm:w-8"
                       >
                         <X className="h-3 w-3 sm:h-4 sm:w-4" />
                       </Button>
                     </div>
                   </div>
                 </CardContent>
               </Card>
             ))
          )}
        </div>
      </div>
    </div>
  )
}
