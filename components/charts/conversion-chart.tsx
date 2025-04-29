"use client"

import { useEffect, useRef } from "react"
import * as echarts from "echarts"

export default function ConversionChart() {
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!chartRef.current) return

    const chart = echarts.init(chartRef.current)

    const option = {
      color: ["#5470c6", "#91cc75", "#ee6666"],
      tooltip: {
        trigger: "item",
        formatter: "{b}: {c} ({d}%)",
      },
      series: [
        {
          name: "Conversion Funnel",
          type: "funnel",
          left: "10%",
          top: 60,
          bottom: 60,
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
          },
          labelLine: {
            length: 10,
            lineStyle: {
              width: 1,
              type: "solid",
            },
          },
          itemStyle: {
            borderColor: "#1a1a1a",
            borderWidth: 1,
          },
          emphasis: {
            label: {
              fontSize: 14,
            },
          },
          data: [
            { value: 100, name: "Visitors" },
            { value: 80, name: "Product Views" },
            { value: 60, name: "Add to Cart" },
            { value: 40, name: "Checkout" },
            { value: 20, name: "Purchase" },
          ],
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

  return <div ref={chartRef} style={{ height: "300px", width: "100%" }} />
}
