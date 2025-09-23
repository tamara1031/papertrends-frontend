'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

interface StackAreaChartData {
  series: {
    [year: string]: number[]
  }
  topics: {
    [topic_id: string]: {
      name: string
      count: number
    }
  }
}

interface StackAreaChartProps {
  data: StackAreaChartData
  width?: number
  height?: number
  legendContainer?: React.RefObject<HTMLDivElement>
}

export function StackAreaChart({ data, width, height, legendContainer }: StackAreaChartProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<HTMLDivElement>(null)
  const legendRef = legendContainer || useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!data?.series || !data?.topics) return

    const createChart = () => {
      // Clear previous chart
      if (svgRef.current) {
        svgRef.current.innerHTML = ''
      }
      if (legendRef.current) {
        legendRef.current.innerHTML = ''
      }

      // Get container dimensions
      const container = containerRef.current
      if (!container) return

      const containerRect = container.getBoundingClientRect()
      const containerWidth = width || containerRect.width || 300
      const containerHeight = height || containerRect.height || 256

      const margin = { top: 20, right: 20, bottom: 30, left: 40 }

      const svg = d3.select(svgRef.current)
        .append('svg')
        .attr('width', containerWidth)
        .attr('height', containerHeight)
        .attr('viewBox', [0, 0, containerWidth, containerHeight])

    // Prepare data
    const seriesData = data.series
    const years = Object.keys(seriesData).sort()
    const topics = Object.keys(data.topics)

    // Create stacked data
    const chartData = years.map(year => {
      const obj: { [key: string]: number | string } = { year }
      topics.forEach(topic => {
        const topicIndex = parseInt(topic)
        obj[topic] = seriesData[year]?.[topicIndex] || 0
      })
      return obj
    })

    // Apply 6-month moving average
    const movingAverageData = chartData.map((d, index) => {
      const obj: { [key: string]: number | string } = { year: d.year }
      
      topics.forEach(topic => {
        const topicIndex = parseInt(topic)
        let sum = 0
        let count = 0
        
        // Calculate 6-month moving average (including current month and 5 previous months)
        for (let i = Math.max(0, index - 5); i <= index; i++) {
          const value = chartData[i][topic] as number
          sum += value
          count++
        }
        
        obj[topic] = count > 0 ? sum / count : 0
      })
      
      return obj
    })

    // Stack the data
    const stack = d3.stack()
      .keys(topics)
      .order(d3.stackOrderNone)
      .offset(d3.stackOffsetNone)

    const stackedData = stack(movingAverageData as any)

    // Scales
    const xScale = d3.scaleBand()
      .domain(years)
      .range([margin.left, containerWidth - margin.right])
      .padding(0.1)

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(stackedData, d => d3.max(d, d => d[1])) || 0])
      .range([containerHeight - margin.bottom, margin.top])

    // Colors
    const colors = [
      '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6',
      '#06B6D4', '#84CC16', '#F97316', '#EC4899', '#6366F1'
    ]
    const colorScale = d3.scaleOrdinal(colors)

    // Area generator
    const area = d3.area<any>()
      .x(d => (xScale(d.data.year) || 0) + (xScale.bandwidth() || 0) / 2)
      .y0(d => yScale(d[0]))
      .y1(d => yScale(d[1]))
      .curve(d3.curveMonotoneX)

    // Draw areas
    svg.selectAll('.area')
      .data(stackedData)
      .join('path')
      .attr('class', 'area')
      .attr('d', area)
      .attr('fill', (d, i) => colorScale(topics[i]))
      .attr('fill-opacity', 0.7)
      .style('cursor', 'pointer')
      .on('mouseenter', function(event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('fill-opacity', 0.9)
      })
      .on('mouseleave', function(event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('fill-opacity', 0.7)
      })

    // X axis - only show January labels
    svg.append('g')
      .attr('transform', `translate(0,${containerHeight - margin.bottom})`)
      .call(d3.axisBottom(xScale)
        .tickFormat(d => {
          // Only show labels for January (month ending with '01')
          return String(d).endsWith('01') ? String(d) : ''
        })
      )
      .selectAll('text')
      .style('font-size', Math.max(8, containerWidth * 0.02) + 'px')
      .style('fill', '#6B7280')

    // Y axis
    svg.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale))
      .selectAll('text')
      .style('font-size', Math.max(8, containerWidth * 0.02) + 'px')
      .style('fill', '#6B7280')

    // Create legend
    if (legendRef.current) {
      const legendItems = d3.select(legendRef.current)
        .selectAll('.legend-item')
        .data(topics) // Show all topics
        .join('div')
        .attr('class', 'legend-item flex items-start space-x-1.5 sm:space-x-2 py-0.5 sm:py-1')

      legendItems.selectAll('.legend-color').remove()
      legendItems.selectAll('.legend-text').remove()

      legendItems.append('div')
        .attr('class', 'legend-color w-2.5 h-2.5 sm:w-3 sm:h-3 rounded flex-shrink-0 mt-0.5')
        .style('background-color', (d, i) => colorScale(d))
        .style('opacity', 0.7)

      legendItems.append('span')
        .attr('class', 'legend-text text-xs text-slate-600 dark:text-slate-400 break-words overflow-hidden')
        .style('word-wrap', 'break-word')
        .style('overflow-wrap', 'break-word')
        .text(d => {
          const topic = data.topics[d]
          if (!topic) return `Topic ${d}`
          
          let maxLength = 16 
          
          const name = topic.name
          return name.length > maxLength ? name.substring(0, maxLength) + '...' : name
        })
      }
    }

    // Create initial chart
    createChart()

    // Set up ResizeObserver for responsive behavior
    const resizeObserver = new ResizeObserver(() => {
      createChart()
    })

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    return () => {
      resizeObserver.disconnect()
    }
  }, [data, width, height])

  // Check if data is available
  const hasData = data?.series && data?.topics && Object.keys(data.series).length > 0 && Object.keys(data.topics).length > 0

  if (!hasData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-3">
            <i className="fas fa-chart-area text-slate-400 text-xl"></i>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm">N/A</p>
        </div>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="w-full h-full">
      <div ref={svgRef} className="w-full h-full"></div>
    </div>
  )
}