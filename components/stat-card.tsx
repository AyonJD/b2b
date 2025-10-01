import type { LucideIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: string
  change?: string
  changeType?: "positive" | "negative" | "neutral"
  icon: LucideIcon
  iconColor: string
}

export function StatCard({ title, value, change, changeType = "neutral", icon: Icon, iconColor }: StatCardProps) {
  return (
    <Card className="overflow-hidden border-border bg-card">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="mt-2 text-3xl font-bold text-foreground">{value}</h3>
            {change && (
              <p
                className={cn(
                  "mt-2 text-sm font-medium",
                  changeType === "positive" && "text-[hsl(var(--color-accent-green))]",
                  changeType === "negative" && "text-[hsl(var(--color-accent-red))]",
                  changeType === "neutral" && "text-muted-foreground",
                )}
              >
                {change}
              </p>
            )}
          </div>
          <div className={cn("flex h-14 w-14 items-center justify-center rounded-xl", iconColor)}>
            <Icon className="h-7 w-7 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
