import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface AnalysisData {
  topics: {
    data: {
      [topic_id: string]: {
        name: string;
        keywords: [string, number][];
        count: number;
      };
    };
    series: {
      [year: string]: number[];
    };
  };
}

interface TemporalAnalysisChartProps {
  data: AnalysisData;
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
    if (!svgRef.current || !data.topics.series || !containerRef.current) return;

    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    const actualWidth = Math.min(containerRect.width, width);
    const actualHeight = Math.min(containerRect.height, height);

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // Update SVG dimensions
    svg.attr('width', actualWidth).attr('height', actualHeight);

    const margin = { top: 20, right: 20, bottom: 40, left: 40 };
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
    const stack = d3.stack()
      .keys(topics)
      .value((d, key) => {
        const year = d.year;
        const topicIndex = topics.indexOf(key);
        return data.topics.series[year]?.[topicIndex] || 0;
      });

    const stackedData = stack(years.map(year => ({ year })));

    const area = d3.area<d3.SeriesPoint<{ year: string }, string>>()
      .x(d => xScale(d.data.year) || 0)
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
      .selectAll('text')
      .attr('font-size', '10px');

    g.append('g')
      .call(d3.axisLeft(yScale))
      .selectAll('text')
      .attr('font-size', '10px');

    // Add title
    svg.append('text')
      .attr('x', actualWidth / 2)
      .attr('y', 15)
      .attr('text-anchor', 'middle')
      .attr('font-size', '14px')
      .attr('font-weight', 'bold')
      .attr('fill', 'currentColor')
      .text('Temporal Trends');

  }, [data, width, height]);

  return (
    <div ref={containerRef} className="w-full h-full">
      <svg
        ref={svgRef}
        className="w-full h-full rounded-xl shadow-inner shadow-gray-200/50 dark:shadow-gray-800/50"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.2)'
        }}
      />
    </div>
  );
}
