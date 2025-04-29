"use client"

import { useEffect, useState } from "react"
import { Clock, RefreshCw } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { DatePickerWithRange } from "@/components/date-range-picker"
import type { DateRange } from "react-day-picker"
import { format, subDays } from "date-fns"

import MetricCard from "./metric-card"
import RevenueChart from "./charts/revenue-chart"
import TrafficSourceChart from "./charts/traffic-source-chart"
import ConversionFunnelChart from "./charts/conversion-funnel-chart"
import PerformanceTable from "./performance-table"
import YoyComparisonChart from "./charts/yoy-comparison-chart"
import DodMetricsChart from "./charts/dod-metrics-chart"
import { Skeleton } from "@/components/ui/skeleton"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data fetching function - would be replaced with actual API calls
const fetchDashboardData = async (dateRange: DateRange | undefined, view: string) => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Use the dateRange and view to customize the returned data
  // In a real implementation, these would be passed to the API

  return {
    currentVisitors: Math.floor(Math.random() * 500) + 800,
    todayVisitors: Math.floor(Math.random() * 2000) + 7000,
    conversionRate: (Math.random() * 2 + 2).toFixed(1),
    conversionRateChange: (Math.random() * 1 - 0.5).toFixed(1),
    revenue: Math.floor(Math.random() * 10000) + 35000,
    revenueChange: (Math.random() * 10 + 5).toFixed(1),
    averageOrderValue: Math.floor(Math.random() * 50) + 100,
    averageOrderValueChange: (Math.random() * 4 - 2).toFixed(1),
    trafficSources: [
      { value: 42, name: "Organic Search" },
      { value: 28, name: "Direct" },
      { value: 18, name: "Social Media" },
      { value: 12, name: "Referral" },
    ],
    performanceData: [
      { page: "Homepage", visitors: 3245, conversions: 124, rate: 3.8, change: 0.5 },
      { page: "Product Listing", visitors: 2876, conversions: 98, rate: 3.4, change: -0.2 },
      { page: "Product Detail", visitors: 1987, conversions: 87, rate: 4.4, change: 1.2 },
      { page: "Shopping Cart", visitors: 1243, conversions: 62, rate: 5.0, change: 0.8 },
      { page: "Checkout", visitors: 876, conversions: 42, rate: 4.8, change: -0.3 },
    ],
    yoyData: {
      currentYear: [42, 53, 57, 69, 97, 118, 132, 146, 128, 102, 89, 95],
      previousYear: [38, 45, 47, 55, 78, 93, 107, 113, 110, 87, 78, 85],
    },
    dodData: {
      dates: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      current: [320, 332, 301, 334, 390, 330, 320],
      previous: [300, 310, 290, 310, 340, 310, 300],
    },
    funnelData: [
      { value: 100, name: "Visitors", percentage: "100%" },
      { value: 68, name: "Product Views", percentage: "68%" },
      { value: 42, name: "Add to Cart", percentage: "42%" },
      { value: 28, name: "Checkout", percentage: "28%" },
      { value: 16, name: "Purchase", percentage: "16%" },
    ],
  }
}

export default function Dashboard() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [view, setView] = useState("overview")
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  })
  const [refreshInterval, setRefreshInterval] = useState("60")

  const loadData = async () => {
    setLoading(true)
    try {
      const dashboardData = await fetchDashboardData(dateRange, view)
      setData(dashboardData)
      setLastUpdated(new Date())
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [dateRange, view])

  useEffect(() => {
    // Set up polling for real-time updates
    const interval = setInterval(() => {
      loadData()
    }, Number.parseInt(refreshInterval) * 1000)

    return () => clearInterval(interval)
  }, [refreshInterval, dateRange, view])

  const handleRefreshIntervalChange = (value: string) => {
    setRefreshInterval(value)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto p-4 xl:p-6">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">E-Commerce Analytics Dashboard</h1>
            <p className="text-muted-foreground">
              {lastUpdated ? (
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  Last updated: {format(lastUpdated, "h:mm:ss a")}
                </span>
              ) : (
                "Loading dashboard data..."
              )}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2">
              <DatePickerWithRange dateRange={dateRange} onDateRangeChange={setDateRange} />
              <div className="flex items-center gap-2">
                <Select value={refreshInterval} onValueChange={handleRefreshIntervalChange}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Refresh rate" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">Every 10s</SelectItem>
                    <SelectItem value="30">Every 30s</SelectItem>
                    <SelectItem value="60">Every 1m</SelectItem>
                    <SelectItem value="300">Every 5m</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon" onClick={loadData}>
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="mb-6" onValueChange={setView}>
          <TabsList className="grid w-full grid-cols-3 md:w-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sales">Sales & Revenue</TabsTrigger>
            <TabsTrigger value="traffic">Traffic & Conversion</TabsTrigger>
          </TabsList>

          {/* Key Metrics - These are shown for all tabs */}
          <div className="mb-6 mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="Today's Visitors"
              value={loading ? null : data?.todayVisitors.toLocaleString()}
              icon="users"
            />
            <MetricCard
              title="Conversion Rate"
              value={loading ? null : `${data?.conversionRate}%`}
              change={loading ? null : Number.parseFloat(data?.conversionRateChange)}
              icon="percent"
            />
            <MetricCard
              title="Revenue"
              value={loading ? null : `$${data?.revenue.toLocaleString()}`}
              change={loading ? null : Number.parseFloat(data?.revenueChange)}
              icon="dollar-sign"
            />
            <MetricCard
              title="Avg. Order Value"
              value={loading ? null : `$${data?.averageOrderValue}`}
              change={loading ? null : Number.parseFloat(data?.averageOrderValueChange)}
              icon="shopping-cart"
            />
          </div>

          <TabsContent value="overview" className="mt-0">
            {/* Main Charts */}
            <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="lg:col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle>Revenue Trend</CardTitle>
                  <CardDescription>Daily revenue for the selected period</CardDescription>
                </CardHeader>
                <CardContent>{loading ? <Skeleton className="h-[300px] w-full" /> : <RevenueChart />}</CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Traffic Sources</CardTitle>
                  <CardDescription>Breakdown of visitor acquisition channels</CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <Skeleton className="h-[300px] w-full" />
                  ) : (
                    <TrafficSourceChart data={data?.trafficSources} />
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Secondary Charts */}
            <div className="mb-6 grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Year-over-Year Comparison</CardTitle>
                  <CardDescription>Monthly revenue comparison with previous year</CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? <Skeleton className="h-[300px] w-full" /> : <YoyComparisonChart data={data?.yoyData} />}
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Day-over-Day Metrics</CardTitle>
                  <CardDescription>Daily visitor comparison with previous week</CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? <Skeleton className="h-[300px] w-full" /> : <DodMetricsChart data={data?.dodData} />}
                </CardContent>
              </Card>
            </div>

            {/* Table and Funnel */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="md:col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle>Page Performance</CardTitle>
                  <CardDescription>Conversion metrics by page</CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <Skeleton className="h-[300px] w-full" />
                  ) : (
                    <PerformanceTable data={data?.performanceData} />
                  )}
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Conversion Funnel</CardTitle>
                  <CardDescription>Customer journey conversion rates</CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <Skeleton className="h-[300px] w-full" />
                  ) : (
                    <ConversionFunnelChart data={data?.funnelData} />
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sales" className="mt-0">
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="md:col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle>Revenue Analysis</CardTitle>
                  <CardDescription>Detailed revenue breakdown and trends</CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? <Skeleton className="h-[400px] w-full" /> : <RevenueChart height={400} />}
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Year-over-Year Revenue</CardTitle>
                  <CardDescription>Monthly revenue comparison</CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? <Skeleton className="h-[300px] w-full" /> : <YoyComparisonChart data={data?.yoyData} />}
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Average Order Value</CardTitle>
                  <CardDescription>AOV trends over time</CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? <Skeleton className="h-[300px] w-full" /> : <DodMetricsChart data={data?.dodData} />}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="traffic" className="mt-0">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Traffic Sources</CardTitle>
                  <CardDescription>Visitor acquisition channels</CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <Skeleton className="h-[300px] w-full" />
                  ) : (
                    <TrafficSourceChart data={data?.trafficSources} />
                  )}
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Conversion Funnel</CardTitle>
                  <CardDescription>Customer journey stages</CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <Skeleton className="h-[300px] w-full" />
                  ) : (
                    <ConversionFunnelChart data={data?.funnelData} />
                  )}
                </CardContent>
              </Card>
              <Card className="md:col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle>Page Performance</CardTitle>
                  <CardDescription>Conversion metrics by page</CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <Skeleton className="h-[400px] w-full" />
                  ) : (
                    <PerformanceTable data={data?.performanceData} />
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
