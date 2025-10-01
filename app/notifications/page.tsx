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
    <div className="min-h-screen bg-background p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground">Notifications</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            System activities and important updates
            {unreadCount > 0 && (
              <span className="ml-2 text-[hsl(var(--color-accent-orange))]">({unreadCount} unread)</span>
            )}
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant={filter === "all" ? "default" : "outline"} onClick={() => setFilter("all")}>
            All
          </Button>
          <Button variant={filter === "unread" ? "default" : "outline"} onClick={() => setFilter("unread")}>
            Unread ({unreadCount})
          </Button>
          {unreadCount > 0 && (
            <Button variant="outline" onClick={markAllAsRead}>
              Mark All Read
            </Button>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {filteredNotifications.length === 0 ? (
          <Card className="border-border bg-card">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <Bell className="h-16 w-16 text-muted-foreground" />
              <p className="mt-4 text-lg text-muted-foreground">No notifications to display</p>
            </CardContent>
          </Card>
        ) : (
          filteredNotifications.map((notification) => (
            <Card
              key={notification.id}
              className={cn(
                "border-border bg-card transition-all",
                !notification.read && "border-l-4 border-l-primary",
              )}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div
                    className={cn(
                      "flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg",
                      getIconColor(notification.type),
                    )}
                  >
                    <notification.icon className="h-6 w-6 text-white" />
                  </div>

                  <div className="flex-1">
                    <div className="mb-2 flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="mb-2 flex items-center gap-2">
                          <Badge className={getTypeColor(notification.type)}>{notification.category}</Badge>
                          {!notification.read && <Badge className="bg-primary text-primary-foreground">New</Badge>}
                        </div>
                        <h3 className="text-xl font-semibold text-foreground">{notification.title}</h3>
                        <p className="mt-1 text-muted-foreground">{notification.message}</p>
                        <p className="mt-2 text-sm text-muted-foreground">{notification.time}</p>
                      </div>

                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => !notification.read && markAsRead(notification.id)}
                            >
                              <Info className="mr-2 h-4 w-4" />
                              Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle className="flex items-center gap-2 text-2xl">
                                <notification.icon className="h-6 w-6" />
                                {notification.title}
                              </DialogTitle>
                              <DialogDescription>
                                <Badge className={getTypeColor(notification.type)}>{notification.category}</Badge>
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="rounded-lg bg-secondary p-4">
                                <p className="text-foreground">{notification.details}</p>
                              </div>
                              <div className="flex justify-between text-sm text-muted-foreground">
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
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
