"use client"

import { ArrowDown, ArrowUp } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface PerformanceData {
  page: string
  visitors: number
  conversions: number
  rate: number
  change: number
}

interface PerformanceTableProps {
  data: PerformanceData[]
}

export default function PerformanceTable({ data }: PerformanceTableProps) {
  if (!data || data.length === 0) {
    return <p className="text-center text-muted-foreground">No performance data available</p>
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Page</TableHead>
            <TableHead className="text-right">Visitors</TableHead>
            <TableHead className="text-right">Conversions</TableHead>
            <TableHead className="text-right">Rate</TableHead>
            <TableHead className="text-right">Change</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{item.page}</TableCell>
              <TableCell className="text-right">{item.visitors.toLocaleString()}</TableCell>
              <TableCell className="text-right">{item.conversions.toLocaleString()}</TableCell>
              <TableCell className="text-right">{item.rate.toFixed(1)}%</TableCell>
              <TableCell className="text-right">
                <div
                  className={`flex items-center justify-end ${item.change >= 0 ? "text-emerald-500" : "text-rose-500"}`}
                >
                  {item.change >= 0 ? <ArrowUp className="mr-1 h-4 w-4" /> : <ArrowDown className="mr-1 h-4 w-4" />}
                  <span>{Math.abs(item.change)}%</span>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
