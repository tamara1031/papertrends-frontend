'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { useTheme } from '@/lib/contexts/ThemeContext'
import { useDashboard } from '@/lib/contexts/DashboardContext'
import { getChartTheme, getFontSize, getSpacing } from '@/lib/styles/chartDesignSystem'

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
  const { theme } = useTheme()
  const { state, handlers } = useDashboard()
  const chartTheme = getChartTheme(theme === 'dark')

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
      const padding = getSpacing('lg', chartTheme)
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
      .padding(getSpacing('sm', chartTheme))

    const packed = pack(root as any)

    // Enterprise-grade color palette
    const color = d3.scaleOrdinal(chartTheme.colors.primary)

    // ルートノード（一番外のcircle）を除外して、子ノードのみを処理
    const nodes = packed.descendants().filter(d => d.depth > 0)
    
    // 選択状態に応じて全体のフィルタを適用
    const hasSelection = state.selectedTopic !== null

    const node = svg.selectAll('g')
      .data(nodes)
      .join('g')
      .attr('transform', d => `translate(${d.x + padding},${d.y + padding})`)
      .style('cursor', 'pointer')
      .on('click', function(event, d) {
        const data = d.data as any
        const topicId = data?.id
        if (topicId) {
          if (state.selectedTopic === topicId) {
            handlers.handleTopicSelect(null)
          } else {
            handlers.handleTopicSelect(topicId)
          }
        }
      })
      .on('mouseenter', function(event, d) {
        const data = d.data as any
        const isSelected = state.selectedTopic === data?.id
        if (!isSelected) {
          d3.select(this).select('circle')
            .attr('stroke-width', 3)
            .attr('stroke', chartTheme.colors.hover)
        }
      })
      .on('mouseleave', function(event, d) {
        const data = d.data as any
        const isSelected = state.selectedTopic === data?.id
        if (!isSelected) {
          d3.select(this).select('circle')
            .attr('stroke-width', 2)
            .attr('stroke', chartTheme.colors.border)
        }
      })

    // バブル（円）の描画
    node.append('circle')
      .attr('r', d => d.r)
      .attr('fill', (d, i) => color(String(i))) // 常に元のカラーパレットを使用
      .attr('fill-opacity', d => {
        const data = d.data as any
        const isSelected = state.selectedTopic === data?.id
        if (hasSelection) {
          return isSelected ? 1.0 : 0.2 // 選択時は不透明度を上げ、非選択時は大幅に下げる
        }
        return 0.7 // 選択がない場合は通常の不透明度
      })
      .attr('stroke', d => {
        const data = d.data as any
        const isSelected = state.selectedTopic === data?.id
        return isSelected ? chartTheme.colors.selection : chartTheme.colors.border
      })
      .attr('stroke-width', d => {
        const data = d.data as any
        const isSelected = state.selectedTopic === data?.id
        return isSelected ? 5 : 2
      })
      .style('filter', d => {
        const data = d.data as any
        const isSelected = state.selectedTopic === data?.id
        return isSelected ? 
          `${chartTheme.shadows.lg}, drop-shadow(0 0 12px ${chartTheme.colors.selection}60)` : 
          chartTheme.shadows.sm
      })

    // テキストの描画
    node.append('text')
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .attr('font-size', d => {
        // Scale font size based on bubble size and container size
        const baseFontSize = Math.min(d.r * 0.3, Math.min(chartWidth, chartHeight) * 0.08)
        return Math.max(baseFontSize, getFontSize('xs', chartTheme)) // Minimum font size
      })
      .attr('font-family', chartTheme.typography.fontFamily)
      .attr('font-weight', chartTheme.typography.fontWeight.medium)
      .attr('fill', d => {
        const data = d.data as any
        const isSelected = state.selectedTopic === data?.id
        return isSelected ? chartTheme.colors.text.primary : chartTheme.colors.text.muted
      })
      .style('font-weight', d => {
        const data = d.data as any
        const isSelected = state.selectedTopic === data?.id
        return isSelected ? chartTheme.typography.fontWeight.bold : chartTheme.typography.fontWeight.medium
      })
      .selectAll('tspan')
      .data(d => {
        const data = d.data as any
        const keywords = data?.keywords || []
        if (keywords.length === 0) return [data?.name || 'Unknown']
        const topKeywords = keywords
          .sort((a: any, b: any) => b[1] - a[1])
          .slice(0, 3)
          .map((k: any) => k[0])
        return topKeywords.length > 0 ? topKeywords : [data?.name || 'Unknown']
      })
      .join('tspan')
      .attr('x', 0)
      .attr('y', (d, i, nodes) => {
        const totalLines = nodes.length
        if (totalLines === 1) return 0 // 単一テキストの場合は中央
        if (totalLines === 2) {
          return i === 0 ? '-0.6em' : '0.6em' // 2行の場合は上下に配置
        }
        if (totalLines === 3) {
          return i === 0 ? '-1.0em' : i === 1 ? '0' : '1.0em' // 3行の場合は上、中央、下に配置
        }
        return i === 0 ? 0 : '1.0em' // デフォルト
      })
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
  }, [data, width, height, chartTheme, state.selectedTopic, handlers])

  // Check if data is available
  const hasData = data && data.length > 0

  if (!hasData) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <div className="text-center">
          <div className={`w-12 h-12 ${chartTheme.colors.surface} rounded-full flex items-center justify-center mx-auto mb-3`}>
            <i className={`fas fa-circle ${chartTheme.colors.text.muted} text-xl`}></i>
          </div>
          <p className={`${chartTheme.colors.text.muted} text-sm`}>N/A</p>
        </div>
      </div>
    )
  }

  return (
    <div ref={svgRef} className="w-full h-full"></div>
  )
}