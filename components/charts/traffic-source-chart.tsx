"use client"

import { useEffect, useRef } from "react"
import * as echarts from "echarts"

interface TrafficSourceData {
  value: number
  name: string
}

interface TrafficSourceChartProps {
  data?: TrafficSourceData[]
}

export default function TrafficSourceChart({ data }: TrafficSourceChartProps) {
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!chartRef.current || !data) return

    const chart = echarts.init(chartRef.current)

    const colors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"]

    const option = {
      tooltip: {
        trigger: "item",
        formatter: "{b}: {c} ({d}%)",
      },
      legend: {
        orient: "vertical",
        right: 10,
        top: "center",
        textStyle: {
          color: "#888",
        },
      },
      series: [
        {
          name: "Traffic Source",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 16,
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: false,
          },
          data: data || [],
        },
      ],
      color: colors,
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
