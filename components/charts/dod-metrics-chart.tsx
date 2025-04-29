"use client"

import { useEffect, useRef } from "react"
import * as echarts from "echarts"

interface DodData {
  dates: string[]
  current: number[]
  previous: number[]
}

interface DodMetricsChartProps {
  data?: DodData
}

export default function DodMetricsChart({ data }: DodMetricsChartProps) {
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!chartRef.current || !data) return

    const chart = echarts.init(chartRef.current)

    const option = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#6a7985",
          },
        },
      },
      legend: {
        data: ["Current Week", "Previous Week"],
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
        boundaryGap: false,
        data: data.dates,
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "Current Week",
          type: "line",
          stack: "Total",
          areaStyle: {
            opacity: 0.3,
          },
          emphasis: {
            focus: "series",
          },
          data: data.current,
          lineStyle: {
            width: 2,
          },
          itemStyle: {
            color: "#3b82f6",
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "rgba(59, 130, 246, 0.5)" },
              { offset: 1, color: "rgba(59, 130, 246, 0.1)" },
            ]),
          },
          smooth: true,
        },
        {
          name: "Previous Week",
          type: "line",
          stack: "Total",
          areaStyle: {
            opacity: 0.3,
          },
          emphasis: {
            focus: "series",
          },
          data: data.previous,
          lineStyle: {
            width: 2,
          },
          itemStyle: {
            color: "#94a3b8",
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "rgba(148, 163, 184, 0.5)" },
              { offset: 1, color: "rgba(148, 163, 184, 0.1)" },
            ]),
          },
          smooth: true,
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
