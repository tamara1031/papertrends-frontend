'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

interface TopicData {
  id: string
  name: string
  count: number
  keywords: [string, number][]
}

interface BubbleChartProps {
  data: TopicData[]
  width?: number
  height?: number
}

export function BubbleChart({ data, width, height }: BubbleChartProps) {
  const svgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!data || data.length === 0) return

    const createChart = () => {
      // Clear previous chart
      if (svgRef.current) {
        svgRef.current.innerHTML = ''
      }

      // Get container dimensions
      const container = svgRef.current
      if (!container) return

      const containerRect = container.getBoundingClientRect()
      const containerWidth = width || containerRect.width || 320
      const containerHeight = height || containerRect.height || 320

      // Add padding to ensure bubbles fit within container
      const padding = 20
      const chartWidth = containerWidth - (padding * 2)
      const chartHeight = containerHeight - (padding * 2)

      const svg = d3.select(svgRef.current)
        .append('svg')
        .attr('width', containerWidth)
        .attr('height', containerHeight)
        .attr('viewBox', [0, 0, containerWidth, containerHeight])
        .style('background', 'transparent')

    // Prepare data for pack layout
    const topics = data.map(topic => ({
      id: topic.id,
      name: topic.name,
      count: topic.count,
      keywords: topic.keywords || []
    }))

    const root = d3.hierarchy({ children: topics })
      .sum(d => d.children ? 0 : (d as any).count)
      .sort((a, b) => (b.value || 0) - (a.value || 0))

    const pack = d3.pack()
      .size([chartWidth, chartHeight])
      .padding(8)

    const packed = pack(root as any)

    // より美しいカラーパレット
    const colors = [
      '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6',
      '#06B6D4', '#84CC16', '#F97316', '#EC4899', '#6366F1',
      '#14B8A6', '#F43F5E', '#A855F7', '#0EA5E9', '#22C55E'
    ]
    const color = d3.scaleOrdinal(colors)

    // ルートノード（一番外のcircle）を除外して、子ノードのみを処理
    const nodes = packed.descendants().filter(d => d.depth > 0)

    const node = svg.selectAll('g')
      .data(nodes)
      .join('g')
      .attr('transform', d => `translate(${d.x + padding},${d.y + padding})`)
      .style('cursor', 'pointer')
      .on('mouseenter', function(event, d) {
        d3.select(this).select('circle')
          .transition()
          .duration(200)
          .attr('stroke-width', 3)
          .attr('stroke', '#1F2937')
      })
      .on('mouseleave', function(event, d) {
        d3.select(this).select('circle')
          .transition()
          .duration(200)
          .attr('stroke-width', 2)
          .attr('stroke', '#ffffff')
      })

    // バブル（円）の描画
    node.append('circle')
      .attr('r', d => d.r)
      .attr('fill', (d, i) => color(String(i)))
      .attr('fill-opacity', 0.8)
      .attr('stroke', '#ffffff')
      .attr('stroke-width', 2)
      .style('filter', 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))')

    // テキストの描画
    node.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '0.3em')
      .attr('font-size', d => {
        // Scale font size based on bubble size and container size
        const baseFontSize = Math.min(d.r * 0.3, Math.min(chartWidth, chartHeight) * 0.08)
        return Math.max(baseFontSize, 8) // Minimum font size
      })
      .attr('font-family', 'system-ui, -apple-system, sans-serif')
      .attr('font-weight', '500')
      .attr('fill', '#1F2937')
      .selectAll('tspan')
      .data(d => {
        const data = d.data as any
        if (!data.keywords || data.keywords.length === 0) return [data.name]
        const topKeywords = data.keywords
          .sort((a: any, b: any) => b[1] - a[1])
          .slice(0, 3)
          .map((k: any) => k[0])
        return topKeywords.length > 0 ? topKeywords : [data.name]
      })
      .join('tspan')
      .attr('x', 0)
      .attr('dy', (d, i) => i === 0 ? 0 : '1.1em')
      .text(d => String(d))
      .style('pointer-events', 'none')
    }

    // Create initial chart
    createChart()

    // Set up ResizeObserver for responsive behavior
    const resizeObserver = new ResizeObserver(() => {
      createChart()
    })

    if (svgRef.current) {
      resizeObserver.observe(svgRef.current)
    }

    return () => {
      resizeObserver.disconnect()
    }
  }, [data, width, height])

  // Check if data is available
  const hasData = data && data.length > 0

  if (!hasData) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <div className="text-center">
          <div className="w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-3">
            <i className="fas fa-circle text-slate-400 text-xl"></i>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm">N/A</p>
        </div>
      </div>
    )
  }

  return (
    <div ref={svgRef} className="w-full h-full"></div>
  )
}