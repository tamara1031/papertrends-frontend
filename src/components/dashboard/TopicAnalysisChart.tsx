import { useEffect, memo, useMemo, useCallback } from 'react';
import * as d3 from 'd3';
import { useChart } from './hooks/useChart';
import { useDarkMode } from './hooks/useDarkMode';
import { getResponsiveSizing } from './hooks/useResponsiveSizing';
import { getChartTheme } from '../../lib/themes/theme';
import type { Topic } from '../../types/dashboard';

interface TopicAnalysisChartProps {
  data: Topic[];
  className?: string;
  'data-testid'?: string;
}

interface TopicNode {
  name: string;
  value?: number;
  keywords?: [string, number][];
  id?: string;
  children?: TopicNode[];
}

const TopicAnalysisChartComponent = ({ 
  data, 
  className = '', 
  'data-testid': testId 
}: TopicAnalysisChartProps) => {
  const { svgRef, containerRef, createChart } = useChart({
    minWidth: 250,
    minHeight: 200,
    enableDebounce: true
  });
  const isDark = useDarkMode();

  // Memoize expensive data processing
  const processedData = useMemo(() => {
    if (!data.length) return null;

    return {
      rootData: {
        name: 'Research Topics',
        children: data.map(d => ({
          name: d.name,
          value: d.count,
          keywords: d.keywords,
          id: d.id
        }))
      } as TopicNode,
      colorScale: d3.scaleOrdinal()
        .domain(data.map(d => d.id))
        .range(getChartTheme(isDark).colors.primary)
    };
  }, [data, isDark]);

  const renderChart = useCallback((width: number, height: number) => {
    if (!processedData || !svgRef.current) return;

      const sizingConfig = getResponsiveSizing(width, 'pack');
    
    const innerWidth = width - sizingConfig.margin.left - sizingConfig.margin.right;
    const innerHeight = height - sizingConfig.margin.top - sizingConfig.margin.bottom;

    const svg = d3.select(svgRef.current);
    const g = svg.append('g')
      .attr('transform', `translate(${sizingConfig.margin.left},${sizingConfig.margin.top})`);

    const root = d3.hierarchy(processedData.rootData)
      .sum(d => d.value || 0);

    const pack = d3.pack<TopicNode>()
      .size([innerWidth, innerHeight])
      .padding(3);

    const packed = pack(root);

    const nodes = g.selectAll('.node')
      .data(packed.descendants())
      .enter().append('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.x},${d.y})`);

    // Add circles with optimized rendering
    nodes.append('circle')
      .attr('r', d => d.r)
      .attr('fill', d => {
        if (d.depth === 0) return '#f0f0f0';
        return processedData.colorScale(d.data.id || '') as string;
      })
      .attr('opacity', d => d.depth === 0 ? 0.3 : 0.7)
      .attr('stroke', '#fff')
      .attr('stroke-width', d => d.depth === 0 ? 1 : 2);

    // Add text labels with visibility optimization
    const textNodes = nodes.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .attr('font-size', d => Math.min(
        Math.max(d.r / 3, 8), 
        sizingConfig.minLabelSize || 12
      ))
      .attr('font-weight', d => d.depth === 0 ? 'bold' : 'normal')
      .attr('fill', d => d.depth === 0 ? '#666' : '#fff')
      .text(d => d.data.name);

    // Only show labels for circles large enough
    textNodes.style(
      'visibility', 
      d => d.r < (sizingConfig.labelThreshold || 20) ? 'hidden' : 'visible'
    );

    // Add optimized hover effects
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
  }, [processedData, isDark]);

  useEffect(() => {
    if (!processedData) return;

    createChart((dimensions) => {
      renderChart(dimensions.width, dimensions.height);
    });
  }, [processedData, createChart, renderChart]);

  const containerClasses = useMemo(() => 
    `w-full h-full ${className}`.trim(), 
    [className]
  );

  return (
    <div 
      ref={containerRef} 
      className={containerClasses}
      data-testid={testId}
      role="img"
      aria-label="Topic analysis circular packing visualization showing research topic relationships. Interactive chart displays topic clusters with size representing research volume."
    >
      <svg
        ref={svgRef}
        className="w-full h-full rounded-lg"
        aria-hidden="true"
        focusable="false"
      />
      {!processedData && (
        <div 
          className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400"
          role="status"
          aria-live="polite"
        >
          No topic data available for visualization
        </div>
      )}
      <div className="sr-only">
        Interactive topic analysis chart with {data.length} research topics. 
        {processedData && `Total topics: ${data.length}. Click on circles to explore specific topic details.`}
      </div>
    </div>
  );
};

// Memoized export for performance
export const TopicAnalysisChart = memo(TopicAnalysisChartComponent);
TopicAnalysisChart.displayName = 'TopicAnalysisChart';