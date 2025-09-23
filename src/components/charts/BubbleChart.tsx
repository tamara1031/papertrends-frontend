'use client'

import { useEffect, useRef, useCallback } from 'react'
import * as d3 from 'd3'
import { getColorScale } from '@/lib'

interface TopicData {
  name: string;
  keywords: string[];
  count: number;
}

interface BubbleChartData {
  topics: Array<{
    topic_id: number;
    frequency: number;
  }>;
  correlationMatrix: number[][];
}

interface BubbleChartProps {
  data: BubbleChartData
  topicData: TopicData[]
}

export function BubbleChart({ 
  data, 
  topicData
}: BubbleChartProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  

  const renderChart = useCallback(() => {
    if (!containerRef.current || !data) return
    
    const container = d3.select(containerRef.current)
    container.selectAll("*").remove()
    
    const containerRect = containerRef.current.getBoundingClientRect()
    const width = Math.max(containerRect.width || 400, 300)
    const height = Math.max(containerRect.height || 300, 300)

    const svg = container
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet")
      .style("background", "transparent")
      .style("display", "block")
      .style("margin", "0 auto")

    const padding = 2
    const pack = d3.pack()
      .size([width - padding * 2, height - padding * 2])
      .padding(padding)
    
    const root = d3.hierarchy({
      children: data.topics.map(topic => ({
        name: topic.topic_id.toString(),
        value: topic.frequency
      }))
    } as any)
      .sum((d: any) => d.value)

    const packData = pack(root)

    const topicIdToName = new Map<number, string>()
    topicData.forEach((topic, index) => {
      topicIdToName.set(index, topic.name)
    })
    
    const topicNames = topicData.map(topic => topic.name)
    const colorScale = getColorScale(topicNames)
    const g = svg.append("g")
      .attr("transform", `translate(${padding}, ${padding})`)
    
    g.selectAll("circle")
      .data(packData.descendants().slice(1))
      .enter().append("circle")
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .attr("r", d => d.r)
      .attr("fill", (d: any) => {
        const topicName = topicIdToName.get(parseInt(d.data.name))
        return topicName ? colorScale(topicName) : "#6b7280"
      })
      .attr("stroke", "#fff")
      .attr("stroke-width", 1)
      .style("opacity", 0.6)
    
    g.selectAll("text")
      .data(packData.descendants().slice(1))
      .enter().append("text")
      .attr("x", d => d.x)
      .attr("y", d => d.y)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .style("font-size", d => Math.max(8, Math.min(16, d.r / 2.5)))
      .style("font-weight", "600")
      .style("fill", "#fff")
      .style("text-shadow", "1px 1px 3px rgba(0,0,0,0.9)")
      .style("pointer-events", "none")
      .text((d: any) => {
        const topic = topicData.find((t, index) => index === parseInt(d.data.name))
        return topic ? topic.name : d.data.name
      })
  }, [data, topicData])


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
      className="bubble-chart-container"
      style={{ 
        position: 'relative',
        width: '100%',
        height: '100%',
        minWidth: '300px',
        minHeight: '300px',
        display: 'block',
        flex: '1 1 auto',
        overflow: 'hidden'
      }}
    />
  )
}