import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface TopicData {
  id: string;
  name: string;
  count: number;
  keywords: [string, number][];
}

interface TopicAnalysisChartProps {
  data: TopicData[];
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

    // Create bubble chart
    const maxCount = d3.max(data, d => d.count) || 1;
    const radiusScale = d3.scaleSqrt()
      .domain([0, maxCount])
      .range([10, 60]);

    const colorScale = d3.scaleOrdinal()
      .domain(data.map(d => d.id))
      .range(d3.schemeCategory10);

    const simulation = d3.forceSimulation(data)
      .force('charge', d3.forceManyBody().strength(-100))
      .force('center', d3.forceCenter(innerWidth / 2, innerHeight / 2))
      .force('collision', d3.forceCollide().radius(d => radiusScale(d.count) + 5));

    const bubbles = g.selectAll('.bubble')
      .data(data)
      .enter().append('g')
      .attr('class', 'bubble');

    bubbles.append('circle')
      .attr('r', d => radiusScale(d.count))
      .attr('fill', d => colorScale(d.id) as string)
      .attr('opacity', 0.7)
      .attr('stroke', '#fff')
      .attr('stroke-width', 2);

    bubbles.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .attr('font-size', d => Math.min(radiusScale(d.count) / 3, 12))
      .attr('font-weight', 'bold')
      .attr('fill', '#fff')
      .text(d => d.name);

    simulation.on('tick', () => {
      bubbles.attr('transform', d => `translate(${d.x},${d.y})`);
    });

    // Add title
    svg.append('text')
      .attr('x', actualWidth / 2)
      .attr('y', 15)
      .attr('text-anchor', 'middle')
      .attr('font-size', '14px')
      .attr('font-weight', 'bold')
      .attr('fill', 'currentColor')
      .text('Research Topics');

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
