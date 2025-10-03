import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { getResponsiveSizing } from './hooks/useResponsiveSizing';
import type { TopicData } from '../../types/dashboard';

interface TemporalAnalysisChartProps {
  data: TopicData;
  width?: number;
  height?: number;
}

export function TemporalAnalysisChart({ 
  data, 
  width = 400, 
  height = 300 
}: TemporalAnalysisChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current || !data?.topics?.series || !containerRef.current) return;

    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    
    // Use full container space but ensure minimum dimensions
    const actualWidth = Math.max(containerRect.width, 300);
    const actualHeight = Math.max(containerRect.height, 250);

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // Update SVG dimensions with actual pixel values
    svg.attr('width', actualWidth).attr('height', actualHeight);

    // Get responsive sizing configuration
    const { margin, fontSize } = getResponsiveSizing(actualWidth, 'area');
    
    const innerWidth = actualWidth - margin.left - margin.right;
    const innerHeight = actualHeight - margin.top - margin.bottom;

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
      .range(d3.schemeCategory10);

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

    // Add axes with responsive font sizes
    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale))
      .selectAll('text')
      .attr('font-size', fontSize);

    g.append('g')
      .call(d3.axisLeft(yScale))
      .selectAll('text')
      .attr('font-size', fontSize);


  }, [data, width, height]);

  // Handle resize events
  useEffect(() => {
    const handleResize = () => {
      if (svgRef.current && containerRef.current && data.topics.series) {
        const container = containerRef.current;
        const containerRect = container.getBoundingClientRect();
        
        const actualWidth = Math.max(containerRect.width, 300);
        const actualHeight = Math.max(containerRect.height, 250);
        
        const svg = d3.select(svgRef.current);
        svg.attr('width', actualWidth).attr('height', actualHeight);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [data.topics.series]);

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
