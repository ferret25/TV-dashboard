"use client"

import { useEffect, useRef } from "react"
import * as echarts from "echarts"

interface FunnelData {
  value: number
  name: string
  percentage: string
}

interface ConversionFunnelChartProps {
  data?: FunnelData[]
}

export default function ConversionFunnelChart({ data }: ConversionFunnelChartProps) {
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!chartRef.current || !data) return

    const chart = echarts.init(chartRef.current)

    const option = {
      tooltip: {
        trigger: "item",
        formatter: "{b}: {c} ({d}%)",
      },
      series: [
        {
          name: "Conversion Funnel",
          type: "funnel",
          left: "10%",
          top: 20,
          bottom: 20,
          width: "80%",
          min: 0,
          max: 100,
          minSize: "0%",
          maxSize: "100%",
          sort: "descending",
          gap: 2,
          label: {
            show: true,
            position: "inside",
            formatter: "{b}: {c}%",
            fontSize: 12,
            fontWeight: "bold",
            color: "#fff",
          },
          labelLine: {
            length: 10,
            lineStyle: {
              width: 1,
              type: "solid",
            },
          },
          itemStyle: {
            borderColor: "#fff",
            borderWidth: 1,
          },
          emphasis: {
            label: {
              fontSize: 14,
            },
          },
          data: data.map((item) => ({
            value: item.value,
            name: item.name,
          })),
          color: ["#3b82f6", "#60a5fa", "#93c5fd", "#bfdbfe", "#dbeafe"],
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
