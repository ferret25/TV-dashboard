"use client"

import { useEffect, useRef } from "react"
import * as echarts from "echarts"

interface YoyData {
  currentYear: number[]
  previousYear: number[]
}

interface YoyComparisonChartProps {
  data?: YoyData
}

export default function YoyComparisonChart({ data }: YoyComparisonChartProps) {
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!chartRef.current || !data) return

    const chart = echarts.init(chartRef.current)

    const option = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      legend: {
        data: ["Current Year", "Previous Year"],
        textStyle: {
          color: "#888",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
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
          name: "Current Year",
          type: "bar",
          data: data.currentYear,
          itemStyle: {
            color: "#3b82f6",
            borderRadius: [4, 4, 0, 0],
          },
        },
        {
          name: "Previous Year",
          type: "bar",
          data: data.previousYear,
          itemStyle: {
            color: "#94a3b8",
            borderRadius: [4, 4, 0, 0],
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
  }, [data])

  return <div ref={chartRef} style={{ height: "300px", width: "100%" }} />
}
