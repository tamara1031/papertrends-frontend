import { useEffect } from 'react';
import * as d3 from 'd3';
import { useChart } from './hooks/useChart';
import { useDarkMode } from './hooks/useDarkMode';
import { getResponsiveSizing } from './hooks/useResponsiveSizing';
import { getChartTheme } from '../../lib/themes/theme';
import type { TopicData } from '../../types/dashboard';

interface TemporalAnalysisChartProps {
  data: TopicData;
}

export function TemporalAnalysisChart({ data }: TemporalAnalysisChartProps) {
  const { svgRef, containerRef, createChart } = useChart({
    minWidth: 300,
    minHeight: 250
  });
  const isDark = useDarkMode();

  useEffect(() => {
    if (!data?.topics?.series) return;

    createChart(({ width, height }) => {
      const { margin, fontSize } = getResponsiveSizing(width, 'area');
      const chartTheme = getChartTheme(isDark);
      
      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;

      const svg = d3.select(svgRef.current!);
      const g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      const years = Object.keys(data.topics.series).sort();
      const topics = Object.keys(data.topics.data);

      const xScale = d3.scaleBand()
        .domain(years)
        .range([0, innerWidth])
        .padding(0.1);

      const yScale = d3.scaleLinear()
        .domain([0, d3.max(years, year => 
          d3.sum(data.topics.series[year]) || 0
        ) || 1])
        .range([innerHeight, 0]);

      const colorScale = d3.scaleOrdinal()
        .domain(topics)
        .range(chartTheme.colors.primary);

      // Create stacked area chart
      const formattedData = years.map(year => {
        const obj: { [key: string]: number } = {};
        topics.forEach((topic, index) => {
          obj[topic] = data.topics.series[year]?.[index] || 0;
        });
        return obj;
      });

      const stack = d3.stack()
        .keys(topics);

      const stackedData = stack(formattedData);

      const area = d3.area<d3.SeriesPoint<{ [key: string]: number }>>()
        .x((_, i) => xScale(years[i]) || 0)
        .y0(d => yScale(d[0]))
        .y1(d => yScale(d[1]))
        .curve(d3.curveMonotoneX);

      g.selectAll('.area')
        .data(stackedData)
        .enter().append('path')
        .attr('class', 'area')
        .attr('d', area)
        .attr('fill', d => colorScale(d.key) as string)
        .attr('opacity', 0.7);

      // Add axes
      g.append('g')
        .attr('transform', `translate(0,${innerHeight})`)
        .call(d3.axisBottom(xScale))
        .selectAll('text');

      g.append('g')
        .call(d3.axisLeft(yScale))
        .selectAll('text');

      // Apply font size
      g.selectAll('text').attr('font-size', fontSize);
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