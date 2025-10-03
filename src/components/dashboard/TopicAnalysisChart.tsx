import { useEffect } from 'react';
import * as d3 from 'd3';
import { useChart } from './hooks/useChart';
import { useDarkMode } from './hooks/useDarkMode';
import { getResponsiveSizing } from './hooks/useResponsiveSizing';
import { getChartTheme } from '../../lib/themes/theme';
import type { Topic } from '../../types/dashboard';

interface TopicAnalysisChartProps {
  data: Topic[];
}

export function TopicAnalysisChart({ data }: TopicAnalysisChartProps) {
  const { svgRef, containerRef, createChart } = useChart({
    minWidth: 250,
    minHeight: 200
  });
  const isDark = useDarkMode();

  useEffect(() => {
    if (!data.length) return;

    createChart(({ width, height }) => {
      const sizingConfig = getResponsiveSizing(width, 'pack');
      const chartTheme = getChartTheme(isDark);
      
      const innerWidth = width - sizingConfig.margin.left - sizingConfig.margin.right;
      const innerHeight = height - sizingConfig.margin.top - sizingConfig.margin.bottom;

      const svg = d3.select(svgRef.current!);
      const g = svg.append('g')
        .attr('transform', `translate(${sizingConfig.margin.left},${sizingConfig.margin.top})`);

      // Prepare hierarchical data for pack layout
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

      const pack = d3.pack<TopicNode>()
        .size([innerWidth, innerHeight])
        .padding(3);

      const packed = pack(root);
      const colorScale = d3.scaleOrdinal()
        .domain(data.map(d => d.id))
        .range(chartTheme.colors.primary);

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

      // Add text labels
      nodes.append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', '0.35em')
        .attr('font-size', d => Math.min(Math.max(d.r / 3, 8), sizingConfig.minLabelSize || 12))
        .attr('font-weight', d => d.depth === 0 ? 'bold' : 'normal')
        .attr('fill', d => d.depth === 0 ? '#666' : '#fff')
        .text(d => d.data.name)
        .style('display', d => d.r < (sizingConfig.labelThreshold || 20) ? 'none' : 'block');

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
    });
  }, [data, isDark, createChart]);

  return (
    <div ref={containerRef} className="w-full h-full">
      <svg
        ref={svgRef}
        className="w-full h-full rounded-lg"
      />
    </div>
  );
}