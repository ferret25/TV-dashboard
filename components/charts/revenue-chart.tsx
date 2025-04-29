"use client"

import { useEffect, useRef } from "react"
import * as echarts from "echarts"

interface RevenueChartProps {
  height?: number
}

export default function RevenueChart({ height = 300 }: RevenueChartProps) {
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!chartRef.current) return

    const chart = echarts.init(chartRef.current)

    const option = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      legend: {
        data: ["Revenue", "Target"],
        textStyle: {
          color: "#888",
        },
      },
      xAxis: {
        type: "category",
        data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      },
      yAxis: {
        type: "value",
        axisLabel: {
          formatter: "${value}k",
        },
      },
      series: [
        {
          name: "Revenue",
          type: "bar",
          data: [35, 42, 47, 53, 65, 72, 78, 83, 76, 68, 72, 80],
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#3b82f6" },
              { offset: 1, color: "#1d4ed8" },
            ]),
            borderRadius: [4, 4, 0, 0],
          },
          emphasis: {
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#60a5fa" },
                { offset: 1, color: "#3b82f6" },
              ]),
            },
          },
        },
        {
          name: "Target",
          type: "line",
          data: [40, 40, 45, 50, 60, 70, 75, 80, 80, 70, 70, 75],
          symbol: "circle",
          symbolSize: 8,
          lineStyle: {
            color: "#10b981",
            width: 2,
          },
          itemStyle: {
            color: "#10b981",
            borderWidth: 2,
            borderColor: "#fff",
          },
        },
      ],
    }

    chart.setOption(option)

    const handleResize = () => {
      chart.resize()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      chart.dispose()
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return <div ref={chartRef} style={{ height: `${height}px`, width: "100%" }} />
}
