'use client'

import { useEffect, useRef, useMemo } from 'react'
import * as d3 from 'd3'
import { useDashboard } from '@/lib/contexts'
import { useTheme } from '@/lib/contexts'
import { getChartTheme } from '@/lib/styles/chartDesignSystem'

interface TopicData {
  id: string
  name: string
  count: number
  keywords: [string, number][]
}

interface TreemapChartProps {
  data: TopicData[]
}

export default function TreemapChart({ data }: TreemapChartProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const { state, handlers } = useDashboard()
  const { theme } = useTheme()
  
  // Memoize theme and color scale to prevent unnecessary re-renders
  const chartTheme = useMemo(() => getChartTheme(theme === 'dark'), [theme])
  const colorScale = useMemo(() => d3.scaleOrdinal(chartTheme.colors.primary), [chartTheme.colors.primary])

  useEffect(() => {
    if (!data.length || !svgRef.current) return

    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove()

    const width = svgRef.current.clientWidth
    const height = svgRef.current.clientHeight
    const margin = { top: 10, right: 10, bottom: 10, left: 10 }
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    // Prepare data for treemap
    const root = d3.hierarchy({ children: data })
      .sum((d: any) => d.count || 0)
      .sort((a: any, b: any) => (b.value || 0) - (a.value || 0))

    // Create treemap layout
    const treemap = d3.treemap()
      .size([innerWidth, innerHeight])
      .padding(1)
      .round(false)

    treemap(root as any)

    // Create SVG elements
    const container = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)

    // Selection state
    const hasSelection = state.selectedTopic !== null
    const selectedTopic = state.selectedTopic

    // Create cells
    const cell = container.selectAll('g')
      .data(root.leaves())
      .join('g')
      .attr('transform', (d: any) => `translate(${d.x0},${d.y0})`)
      .style('cursor', 'pointer')
      .on('click', function(event, d: any) {
        const topicId = d.data.id
        if (selectedTopic === topicId) {
          handlers.handleTopicSelect(null)
        } else {
          handlers.handleTopicSelect(topicId)
        }
      })
      .on('mouseenter', function(event, d: any) {
        if (selectedTopic !== d.data.id) {
          d3.select(this).select('rect')
            .attr('stroke-width', 3)
            .attr('stroke', chartTheme.colors.hover)
        }
      })
      .on('mouseleave', function(event, d: any) {
        if (selectedTopic !== d.data.id) {
          d3.select(this).select('rect')
            .attr('stroke-width', 2)
            .attr('stroke', chartTheme.colors.border)
        }
      })

    // Add rectangles
    cell.append('rect')
      .attr('width', (d: any) => d.x1 - d.x0)
      .attr('height', (d: any) => d.y1 - d.y0)
      .attr('fill', (d: any, i: number) => colorScale(i.toString()))
      .attr('fill-opacity', (d: any) => {
        const isSelected = selectedTopic === d.data.id
        return hasSelection ? (isSelected ? 1.0 : 0.2) : 0.7
      })
      .attr('stroke', (d: any) => {
        return selectedTopic === d.data.id ? chartTheme.colors.selection : chartTheme.colors.border
      })
      .attr('stroke-width', (d: any) => {
        return selectedTopic === d.data.id ? 3 : 2
      })
      .style('filter', (d: any) => {
        return selectedTopic === d.data.id ? chartTheme.shadows.lg : chartTheme.shadows.sm
      })

    // Add labels with simple, readable styling
    const label = cell.append('text')
      .attr('x', 8)
      .attr('y', 18)
      .attr('font-size', '12px')
      .attr('font-family', 'system-ui, -apple-system, sans-serif')
      .attr('font-weight', '500')
      .attr('fill', '#ffffff')
      .style('pointer-events', 'none')
      .style('text-shadow', '0 1px 3px rgba(0,0,0,0.8)')

    // Add topic names
    label.append('tspan')
      .text((d: any) => {
        const name = d.data.name
        const width = d.x1 - d.x0
        const height = d.y1 - d.y0
        
        // Better truncation based on both width and height
        if (width < 80 || height < 30) {
          return name.length > 8 ? name.substring(0, 8) + '...' : name
        } else if (width < 120 || height < 40) {
          return name.length > 15 ? name.substring(0, 15) + '...' : name
        } else {
          return name.length > 25 ? name.substring(0, 25) + '...' : name
        }
      })
      .attr('x', 8)
      .attr('dy', 0)

    // Add count labels
    label.append('tspan')
      .text((d: any) => d.data.count.toLocaleString())
      .attr('x', 8)
      .attr('dy', 16)
      .attr('font-size', '10px')
      .attr('font-weight', '600')
      .attr('fill', '#ffffff')
      .style('text-shadow', '0 1px 3px rgba(0,0,0,0.8)')

    // Cleanup
    return () => {
      // No cleanup needed for treemap
    }
  }, [data, state.selectedTopic, chartTheme, colorScale, handlers.handleTopicSelect])

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      className="w-full h-full"
    />
  )
}
