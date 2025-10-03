import { useEffect, memo, useMemo, useCallback } from 'react';
import * as d3 from 'd3';
import { useChart } from './hooks/useChart';
import { useDarkMode } from './hooks/useDarkMode';
import { getResponsiveSizing } from './hooks/useResponsiveSizing';
import { getChartTheme } from '../../lib/themes/theme';
import type { TopicData } from '../../types/dashboard';

interface TemporalAnalysisChartProps {
  data: TopicData;
  className?: string;
  'data-testid'?: string;
}

const TemporalAnalysisChartComponent = ({ 
  data, 
  className = '', 
  'data-testid': testId 
}: TemporalAnalysisChartProps) => {
  const { svgRef, containerRef, createChart } = useChart({
    minWidth: 300,
    minHeight: 250,
    enableDebounce: true
  });
  const isDark = useDarkMode();

  // Memoize expensive data processing
  const processedData = useMemo(() => {
    if (!data?.topics?.series) return null;

    const years = Object.keys(data.topics.series).sort();
    const topics = Object.keys(data.topics.series[Object.keys(data.topics.series)[0]] || {});

    // Check if we have valid data
    if (years.length === 0 || topics.length === 0) return null;

    return {
      years,
      topics,
      chartData: years.map(year => {
        const values = data.topics.series[year];
        const obj: any = { year: parseInt(year) };
        topics.forEach((topic, i) => {
          obj[topic] = values[i] || 0;
        });
        return obj;
      }),
      colorScale: d3.scaleOrdinal()
        .domain(topics)
        .range(getChartTheme(isDark).colors.primary)
    };
  }, [data, isDark]);

  const renderChart = useCallback((width: number, height: number) => {
    if (!processedData || !svgRef.current) return;

    const sizingConfig = getResponsiveSizing(width, 'area');
    const chartTheme = getChartTheme(isDark);
    
    const innerWidth = width - sizingConfig.margin.left - sizingConfig.margin.right;
    const innerHeight = height - sizingConfig.margin.top - sizingConfig.margin.bottom;

    const svg = d3.select(svgRef.current);
    const g = svg.append('g')
      .attr('transform', `translate(${sizingConfig.margin.left},${sizingConfig.margin.top})`);

    // Create scales
    const xScale = d3.scaleBand()
      .domain(processedData.years)
      .range([0, innerWidth])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([
        0, 
        d3.max(processedData.chartData, d => 
          d3.sum(processedData.topics, topic => d[topic] || 0)
        ) || 0
      ])
      .range([innerHeight, 0]);

    // Create stacked chart
    const stack = d3.stack()
      .keys(processedData.topics)
      .order(d3.stackOrderNone)
      .offset(d3.stackOffsetWiggle);

    const stackedData = stack(processedData.chartData);

    // Create area generator
    const area = d3.area()
      .x((_, i) => xScale(processedData.years[i]) || 0)
      .y0(d => yScale(d[0]))
      .y1(d => yScale(d[1]))
      .curve(d3.curveMonotoneX);

    // Render areas
    g.selectAll('.area')
      .data(stackedData)
      .enter().append('path')
      .attr('class', 'area')
      .attr('d', d => area(d as any))
      .attr('fill', d => processedData.colorScale(d.key) as string)
      .attr('opacity', 0.7)
      .attr('stroke', d => processedData.colorScale(d.key) as string)
      .attr('stroke-width', 1)
      .attr('stroke-opacity', 0.8);

    // Add axes
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale).ticks(5);

    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(xAxis)
      .style('font-size', sizingConfig.fontSize)
      .style('color', chartTheme.colors.text.muted);

    g.append('g')
      .call(yAxis)
      .style('font-size', sizingConfig.fontSize)
      .style('color', chartTheme.colors.text.muted);

    // Add grid lines
    g.append('g')
      .attr('class', 'grid')
      .call(d3.axisLeft(yScale)
        .tickSize(-innerWidth)
        .tickFormat(() => '')
      )
      .style('stroke', chartTheme.colors.text.muted)
      .style('stroke-opacity', 0.2);
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
      aria-label="Temporal analysis stacked area chart showing research topic trends over time. Chart displays research publication volumes across topic categories by year."
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
          No temporal data available for analysis
        </div>
      )}
      <div className="sr-only">
        Temporal analysis chart showing research trends from {processedData?.years[0]} to {processedData?.years[processedData?.years.length - 1]}.
        Includes {processedData?.topics.length || 0} topic categories.
      </div>
    </div>
  );
};

// Memoized export for performance
export const TemporalAnalysisChart = memo(TemporalAnalysisChartComponent);
TemporalAnalysisChart.displayName = 'TemporalAnalysisChart';