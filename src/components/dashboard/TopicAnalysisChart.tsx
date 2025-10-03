import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { getResponsiveSizing } from './hooks/useResponsiveSizing';
import type { Topic } from '../../types/dashboard';

interface TopicAnalysisChartProps {
  data: Topic[];
  width?: number;
  height?: number;
}

export function TopicAnalysisChart({ 
  data, 
  width = 400, 
  height = 300 
}: TopicAnalysisChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current || !data.length || !containerRef.current) return;

    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    
    // Use full container space but ensure minimum dimensions
    const actualWidth = Math.max(containerRect.width, 250);
    const actualHeight = Math.max(containerRect.height, 200);

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // Update SVG dimensions to fill container
    svg.attr('width', '100%').attr('height', '100%');

    // Get responsive sizing configuration
    const { margin, labelThresholds } = getResponsiveSizing(actualWidth, 'pack');
    
    const innerWidth = actualWidth - margin.left - margin.right;
    const innerHeight = actualHeight - margin.top - margin.bottom;

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Create hierarchical data structure for pack layout
    interface TopicNode {
      name: string;
      value?: number;
      keywords?: [string, number][];
      id?: string;
      children?: TopicNode[];
    }

    const rootData: TopicNode = {
      name: 'Research Topics',
      children: data.map(d => ({
        name: d.name,
        value: d.count,
        keywords: d.keywords,
        id: d.id
      }))
    };

    const root = d3.hierarchy(rootData)
      .sum(d => d.value || 0);

    // Create pack layout
    const pack = d3.pack<TopicNode>()
      .size([innerWidth, innerHeight])
      .padding(3);

    const packed = pack(root);

    // Color scale
    const colorScale = d3.scaleOrdinal()
      .domain(data.map(d => d.id))
      .range(d3.schemeCategory10);

    // Create circles for each node
    const nodes = g.selectAll('.node')
      .data(packed.descendants())
      .enter().append('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.x},${d.y})`);

    // Add circles
    nodes.append('circle')
      .attr('r', d => d.r)
      .attr('fill', d => {
        if (d.depth === 0) return '#f0f0f0';
        return colorScale(d.data.id || '') as string;
      })
      .attr('opacity', d => d.depth === 0 ? 0.3 : 0.7)
      .attr('stroke', '#fff')
      .attr('stroke-width', d => d.depth === 0 ? 1 : 2);

    // Add text labels with responsive sizing
    nodes.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .attr('font-size', d => Math.min(Math.max(d.r / 3, 8), labelThresholds.minLabelSize))
      .attr('font-weight', d => d.depth === 0 ? 'bold' : 'normal')
      .attr('fill', d => d.depth === 0 ? '#666' : '#fff')
      .text(d => d.data.name)
      .style('display', d => d.r < labelThresholds.labelThreshold ? 'none' : 'block');

    // Add hover effects
    nodes
      .on('mouseover', function(_, d) {
        if (d.depth > 0) {
          d3.select(this).select('circle')
            .attr('opacity', 0.9)
            .attr('stroke-width', 3);
        }
      })
      .on('mouseout', function(_, d) {
        if (d.depth > 0) {
          d3.select(this).select('circle')
            .attr('opacity', 0.7)
            .attr('stroke-width', 2);
        }
      });

  }, [data, width, height]);

  return (
    <div ref={containerRef} className="w-full h-full">
      <svg
        ref={svgRef}
        className="w-full h-full rounded-lg"
        style={{
          background: 'transparent'
        }}
      />
    </div>
  );
}
