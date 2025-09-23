'use client'

import { useEffect, useRef, useCallback } from 'react'
import * as d3 from 'd3'
import { getColorScale } from '@/lib'
interface StackAreaChartData {
  categories: string[];
  data: Array<[string, ...number[]]>;
}

interface StackAreaChartProps {
  data: StackAreaChartData
}

export function StackAreaChart({ 
  data
}: StackAreaChartProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const renderChart = useCallback(() => {
    if (!containerRef.current || !data) return

    const container = d3.select(containerRef.current)
    container.selectAll("*").remove()

    const containerRect = containerRef.current.getBoundingClientRect()
    const totalWidth = Math.max(containerRect.width, 300)
    const height = Math.max(containerRect.height || 300, 300)
    
    const margin = {
      top: 50,
      right: 40,
      bottom: 60,
      left: 60
    }

    const svg = container
      .append("svg")
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("viewBox", `0 0 ${totalWidth} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet")
      .style("max-width", "100%")
      .style("max-height", "100%")
      .style("display", "block")

    // Convert data to D3 format
    const rawData = data.data.map(row => {
      const [month, ...values] = row
      const obj: any = { date: new Date(month + '-01') }
      data.categories.forEach((category, index) => {
        obj[category] = values[index] || 0
      })
      return obj
    })

    const x = d3.scaleTime()
      .domain(d3.extent(rawData, d => d.date) as [Date, Date])
      .range([margin.left, totalWidth - margin.right])

    const y = d3.scaleLinear()
      .domain([0, d3.max(rawData, d => 
        d3.sum(data.categories, category => d[category] || 0)
      ) as number])
      .range([height - margin.bottom, margin.top])

    const color = getColorScale(data.categories)
    
    const chartGroup = svg.append("g")
      .attr("class", "chart-group")

    const stack = d3.stack()
      .keys(data.categories)

    const series = stack(rawData as any)

    // Create area generator
    const area = d3.area()
      .x((d: any) => x(d.data.date))
      .y0((d: any) => y(d[0]))
      .y1((d: any) => y(d[1]))
      .curve(d3.curveCardinal.tension(0.9))

    // Draw areas
    chartGroup.selectAll("path")
      .data(series)
      .enter().append("path")
      .attr("fill", (d: any) => color(d.key))
      .attr("d", area as any)
      .attr("opacity", 0.8)
      // Click interaction removed

    // X axis
    const xAxis = chartGroup.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)

    xAxis.call(d3.axisBottom(x)
      .tickFormat((d: any) => {
        const date = new Date(d)
        return date.getFullYear().toString()
      })
    )

    xAxis.selectAll("text")
      .style("font-size", "0.75rem")
      .style("fill", "#6b7280")

    xAxis.selectAll("line, path")
      .style("stroke", "#e5e7eb")
      .style("stroke-width", 1)

    // Y axis
    const yAxis = chartGroup.append("g")
      .attr("transform", `translate(${margin.left},0)`)

    yAxis.call(d3.axisLeft(y)
      .tickFormat(d3.format(".0f"))
    )

    yAxis.selectAll("text")
      .style("font-size", "0.75rem")
      .style("fill", "#6b7280")

    yAxis.selectAll("line, path")
      .style("stroke", "#e5e7eb")
      .style("stroke-width", 1)
  }, [data])


  useEffect(() => {
    renderChart()
    
    const handleResize = () => {
      renderChart()
    }
    
    window.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [renderChart])

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full relative flex items-end justify-center flex-1" 
      style={{ 
        overflow: 'hidden',
        height: '100%',
        minHeight: '250px' // Ensure minimum height for mobile devices
      }} 
    />
  )
}
