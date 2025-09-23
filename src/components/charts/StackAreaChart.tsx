'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { useTheme } from '@/lib/contexts/ThemeContext'
import { useDashboard } from '@/lib/contexts/DashboardContext'
import { getChartTheme, getFontSize, getSpacing } from '@/lib/styles/chartDesignSystem'

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
  const defaultLegendRef = useRef<HTMLDivElement>(null)
  const legendRef = legendContainer || defaultLegendRef
  const { theme } = useTheme()
  const { state, handlers } = useDashboard()
  const chartTheme = getChartTheme(theme === 'dark')

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

      const margin = { 
        top: getSpacing('lg', chartTheme), 
        right: getSpacing('lg', chartTheme), 
        bottom: getSpacing('xl', chartTheme), 
        left: getSpacing('xl', chartTheme) 
      }

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
        obj[topic] = seriesData[year]?.[parseInt(topic)] || 0
      })
      return obj
    })

    // Apply 6-month moving average
    const movingAverageData = chartData.map((d, index) => {
      const obj: { [key: string]: number | string } = { year: d.year }
      
      topics.forEach(topic => {
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

    // Enterprise-grade colors
    const colorScale = d3.scaleOrdinal(chartTheme.colors.primary)
    
    // 選択状態に応じて全体のフィルタを適用
    const hasSelection = state.selectedTopic !== null

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
      .attr('fill', (d, i) => colorScale(topics[i])) // 常に元のカラーパレットを使用
      .attr('fill-opacity', (d, i) => {
        const topicId = topics[i]
        const isSelected = state.selectedTopic === topicId
        if (hasSelection) {
          return isSelected ? 1.0 : 0.15 // 選択時は不透明度を上げ、非選択時は大幅に下げる
        }
        return 0.7 // 選択がない場合は通常の不透明度
      })
      .style('filter', (d, i) => {
        const topicId = topics[i]
        const isSelected = state.selectedTopic === topicId
        return isSelected ? 
          `${chartTheme.shadows.lg}, drop-shadow(0 0 10px ${chartTheme.colors.selection}60)` : 
          chartTheme.shadows.sm
      })
      .style('cursor', 'pointer')
      .on('click', function(event, d) {
        const topicId = topics[d.index]
        if (state.selectedTopic === topicId) {
          handlers.handleTopicSelect(null)
        } else {
          handlers.handleTopicSelect(topicId)
        }
      })
      .on('mouseenter', function(event, d) {
        const topicId = topics[d.index]
        const isSelected = state.selectedTopic === topicId
        if (!isSelected) {
          d3.select(this)
            .attr('fill-opacity', hasSelection ? 0.3 : 0.9)
        }
      })
      .on('mouseleave', function(event, d) {
        const topicId = topics[d.index]
        const isSelected = state.selectedTopic === topicId
        if (!isSelected) {
          d3.select(this)
            .attr('fill-opacity', hasSelection ? 0.15 : 0.7)
        }
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
      .style('font-size', Math.max(getFontSize('xs', chartTheme), containerWidth * 0.02) + 'px')
      .style('fill', chartTheme.colors.text.secondary)
      .style('font-family', chartTheme.typography.fontFamily)
      .style('font-weight', chartTheme.typography.fontWeight.normal)

    // Y axis
    svg.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale))
      .selectAll('text')
      .style('font-size', Math.max(getFontSize('xs', chartTheme), containerWidth * 0.02) + 'px')
      .style('fill', chartTheme.colors.text.secondary)
      .style('font-family', chartTheme.typography.fontFamily)
      .style('font-weight', chartTheme.typography.fontWeight.normal)

    // Create legend
    if (legendRef.current) {
      const legendItems = d3.select(legendRef.current)
        .selectAll('.legend-item')
        .data(topics) // Show all topics
        .join('div')
        .attr('class', 'legend-item flex items-start space-x-1.5 sm:space-x-2 py-0.5 sm:py-1')
        .style('cursor', 'pointer')
        .style('user-select', 'none')
        .style('border-radius', '4px')
        .style('padding', '2px 4px')
        .style('margin', '1px')
        .on('click', function(event, d) {
          if (state.selectedTopic === d) {
            handlers.handleTopicSelect(null)
          } else {
            handlers.handleTopicSelect(d)
          }
        })
        .on('mouseenter', function(event, d) {
          const isSelected = state.selectedTopic === d
          if (!isSelected) {
            d3.select(this)
              .style('background-color', chartTheme.colors.surface)
              .style('transition', 'background-color 0.2s ease')
          }
        })
        .on('mouseleave', function(event, d) {
          const isSelected = state.selectedTopic === d
          if (!isSelected) {
            d3.select(this)
              .style('background-color', 'transparent')
          }
        })

      legendItems.selectAll('.legend-color').remove()
      legendItems.selectAll('.legend-text').remove()

      legendItems.append('div')
        .attr('class', 'legend-color w-2.5 h-2.5 sm:w-3 sm:h-3 rounded flex-shrink-0 mt-0.5')
        .style('background-color', d => colorScale(d)) // 常に元のカラーパレットを使用
        .style('opacity', d => {
          const isSelected = state.selectedTopic === d
          if (hasSelection) {
            return isSelected ? 1.0 : 0.3 // 選択時は不透明度を上げ、非選択時は大幅に下げる
          }
          return 0.7 // 選択がない場合は通常の不透明度
        })
        .style('box-shadow', d => {
          const isSelected = state.selectedTopic === d
          return isSelected ? `0 0 12px ${chartTheme.colors.selection}60` : 'none'
        })
        .style('border', d => {
          const isSelected = state.selectedTopic === d
          return isSelected ? `2px solid ${chartTheme.colors.selection}` : 'none'
        })

      legendItems.append('span')
        .attr('class', 'legend-text text-xs break-words overflow-hidden')
        .style('word-wrap', 'break-word')
        .style('overflow-wrap', 'break-word')
        .style('color', d => {
          const isSelected = state.selectedTopic === d
          return isSelected ? chartTheme.colors.text.primary : chartTheme.colors.text.secondary
        })
        .style('font-family', chartTheme.typography.fontFamily)
        .style('font-weight', d => {
          const isSelected = state.selectedTopic === d
          return isSelected ? chartTheme.typography.fontWeight.bold : chartTheme.typography.fontWeight.normal
        })
        .style('user-select', 'none')
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
  }, [data, width, height, chartTheme, legendRef, state.selectedTopic, handlers])

  // Check if data is available
  const hasData = data?.series && data?.topics && Object.keys(data.series).length > 0 && Object.keys(data.topics).length > 0

  if (!hasData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className={`w-12 h-12 ${chartTheme.colors.surface} rounded-full flex items-center justify-center mx-auto mb-3`}>
            <i className={`fas fa-chart-area ${chartTheme.colors.text.muted} text-xl`}></i>
          </div>
          <p className={`${chartTheme.colors.text.muted} text-sm`}>N/A</p>
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