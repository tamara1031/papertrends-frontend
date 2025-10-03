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
    if (!svgRef.current || !data?.topics?.series || !containerRef.current) {
      console.log('TemporalAnalysisChart: Missing required refs or data');
      return;
    }

    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    
    // Use full container space but ensure minimum dimensions
    const actualWidth = Math.max(containerRect.width, 300);
    const actualHeight = Math.max(containerRect.height, 250);

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // Update SVG dimensions with actual pixel values
    svg.attr('width', actualWidth).attr('height', actualHeight);

    // Responsive margins based on screen size
    let margin;
    if (actualWidth < 640) { // sm
      margin = { top: 15, right: 10, bottom: 40, left: 30 };
    } else if (actualWidth < 1024) { // md
      margin = { top: 20, right: 15, bottom: 35, left: 45 };
    } else { // lg and above
      margin = { top: 20, right: 20, bottom: 30, left: 50 };
    }
    
    const innerWidth = actualWidth - margin.left - margin.right;
    const innerHeight = actualHeight - margin.top - margin.bottom;

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const years = Object.keys(data.topics.series).sort();
    const topics = Object.keys(data.topics.data);
    
    console.log('TemporalAnalysisChart data:', { years, topics, series: data.topics.series });

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
    let fontSize;
    if (actualWidth < 640) { // sm
      fontSize = '8px';
    } else if (actualWidth < 1024) { // md
      fontSize = '9px';
    } else { // lg and above
      fontSize = '10px';
    }

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
