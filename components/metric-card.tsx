"use client"

import { ArrowDown, ArrowUp, DollarSign, Percent, ShoppingCart, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface MetricCardProps {
  title: string
  value: string | number | null
  change?: number | null
  icon: "users" | "percent" | "dollar-sign" | "shopping-cart"
}

export default function MetricCard({ title, value, change, icon }: MetricCardProps) {
  const renderIcon = () => {
    switch (icon) {
      case "users":
        return <Users className="h-5 w-5 text-primary" />
      case "percent":
        return <Percent className="h-5 w-5 text-primary" />
      case "dollar-sign":
        return <DollarSign className="h-5 w-5 text-primary" />
      case "shopping-cart":
        return <ShoppingCart className="h-5 w-5 text-primary" />
      default:
        return null
    }
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="rounded-full bg-primary/10 p-1.5">{renderIcon()}</div>
        </div>
        <div className="mt-4">
          {value === null ? <Skeleton className="h-9 w-28" /> : <div className="text-2xl font-bold">{value}</div>}
          {change !== null && change !== undefined ? (
            <div className={`mt-1 flex items-center text-sm ${change >= 0 ? "text-emerald-500" : "text-rose-500"}`}>
              {change >= 0 ? <ArrowUp className="mr-1 h-4 w-4" /> : <ArrowDown className="mr-1 h-4 w-4" />}
              <span>{Math.abs(change)}% vs previous</span>
            </div>
          ) : change === null ? (
            <Skeleton className="mt-1 h-5 w-24" />
          ) : null}
        </div>
      </CardContent>
    </Card>
  )
}
