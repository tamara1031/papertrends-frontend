import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import type { AnalysisData } from '../../lib/types';
import { getChartTheme, getFontSize, getSpacing } from '../../lib/themes/theme';

interface StackAreaChartProps {
  data: AnalysisData;
  width?: number;
  height?: number;
  selectedTopic?: string | null;
  onTopicSelect?: (topicId: string | null) => void;
}

export function StackAreaChart({ 
  data, 
  width, 
  height, 
  selectedTopic = null, 
  onTopicSelect 
}: StackAreaChartProps) {
  const svgRef = useRef<HTMLDivElement>(null);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check for dark mode
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    
    checkDarkMode();
    
    // Listen for theme changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!data || !data.topics || !data.topics.series) return;

    const createChart = () => {
      // Clear previous chart
      if (svgRef.current) {
        svgRef.current.innerHTML = '';
      }

      // Get container dimensions
      const container = svgRef.current;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      const containerWidth = width || containerRect.width || 400;
      const containerHeight = height || containerRect.height || 300;

      const chartTheme = getChartTheme(isDark);
      
      // Add padding
      const padding = getSpacing('lg');
      const chartWidth = containerWidth - (padding * 2);
      const chartHeight = containerHeight - (padding * 2);

      const svg = d3.select(svgRef.current)
        .append('svg')
        .attr('width', containerWidth)
        .attr('height', containerHeight)
        .attr('viewBox', [0, 0, containerWidth, containerHeight])
        .style('background', 'transparent');

      // Prepare data
      const years = Object.keys(data.topics.series).sort();
      const topics = Object.keys(data.topics.data);
      
      const seriesData = years.map(year => {
        const values = data.topics.series[year];
        const obj: any = { year: parseInt(year) };
        topics.forEach((topic, i) => {
          obj[topic] = values[i] || 0;
        });
        return obj;
      });

      // Create stack
      const stack = d3.stack()
        .keys(topics)
        .order(d3.stackOrderNone)
        .offset(d3.stackOffsetWiggle);

      const stackedData = stack(seriesData);

      // Scales
      const xScale = d3.scaleLinear()
        .domain(d3.extent(seriesData, d => d.year) as [number, number])
        .range([0, chartWidth]);

      const yScale = d3.scaleLinear()
        .domain([d3.min(stackedData, d => d3.min(d, d => d[0])) || 0, 
                 d3.max(stackedData, d => d3.max(d, d => d[1])) || 0])
        .range([chartHeight, 0]);

      // Color scale
      const color = d3.scaleOrdinal(chartTheme.colors.primary);

      // Create area generator
      const area = d3.area<any>()
        .x(d => xScale(d.data.year))
        .y0(d => yScale(d[0]))
        .y1(d => yScale(d[1]))
        .curve(d3.curveCardinal);

      // Create areas
      const areas = svg.selectAll('.area')
        .data(stackedData)
        .join('g')
        .attr('class', 'area')
        .style('cursor', 'pointer')
        .on('click', function(_, d) {
          const topicId = d.key;
          if (onTopicSelect) {
            if (selectedTopic === topicId) {
              onTopicSelect(null);
            } else {
              onTopicSelect(topicId);
            }
          }
        })
        .on('mouseenter', function(_, d) {
          const topicId = d.key;
          const isSelected = selectedTopic === topicId;
          if (!isSelected) {
            d3.select(this).select('path')
              .style('opacity', 0.8)
              .style('stroke-width', 2);
          }
        })
        .on('mouseleave', function(_, d) {
          const topicId = d.key;
          const isSelected = selectedTopic === topicId;
          if (!isSelected) {
            d3.select(this).select('path')
              .style('opacity', 0.6)
              .style('stroke-width', 1);
          }
        });

      areas.append('path')
        .attr('d', area)
        .attr('fill', (_, i) => color(String(i)))
        .attr('fill-opacity', d => {
          const topicId = d.key;
          const isSelected = selectedTopic === topicId;
          return isSelected ? 0.8 : 0.6;
        })
        .attr('stroke', (_, i) => color(String(i)))
        .attr('stroke-width', d => {
          const topicId = d.key;
          const isSelected = selectedTopic === topicId;
          return isSelected ? 3 : 1;
        })
        .style('filter', d => {
          const topicId = d.key;
          const isSelected = selectedTopic === topicId;
          return isSelected ? 
            `${chartTheme.shadows.lg}, drop-shadow(0 0 8px ${color(topicId)}60)` : 
            chartTheme.shadows.sm;
        });

      // Add labels
      areas.append('text')
        .attr('x', d => xScale(d3.median(d, d => d.data.year) ?? 0))
        .attr('y', d => yScale(((d3.max(d, d => d[1]) ?? 0) + (d3.min(d, d => d[0]) ?? 0)) / 2))
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'middle')
        .attr('font-size', getFontSize('xs'))
        .attr('font-family', chartTheme.typography.fontFamily)
        .attr('font-weight', chartTheme.typography.fontWeight.medium)
        .attr('fill', d => {
          const topicId = d.key;
          const isSelected = selectedTopic === topicId;
          return isSelected ? chartTheme.colors.text.primary : chartTheme.colors.text.muted;
        })
        .text(d => data.topics.data[d.key]?.name || d.key)
        .style('pointer-events', 'none');

      // Add axes
      const xAxis = d3.axisBottom(xScale)
        .tickFormat(d => d.toString())
        .tickSizeOuter(0);

      const yAxis = d3.axisLeft(yScale)
        .tickSizeOuter(0);

      svg.append('g')
        .attr('transform', `translate(${padding}, ${chartHeight + padding})`)
        .call(xAxis)
        .selectAll('text')
        .attr('fill', chartTheme.colors.text.muted)
        .attr('font-size', getFontSize('xs'))
        .attr('font-family', chartTheme.typography.fontFamily);

      svg.append('g')
        .attr('transform', `translate(${padding}, ${padding})`)
        .call(yAxis)
        .selectAll('text')
        .attr('fill', chartTheme.colors.text.muted)
        .attr('font-size', getFontSize('xs'))
        .attr('font-family', chartTheme.typography.fontFamily);

      // Style axes
      svg.selectAll('.domain')
        .attr('stroke', chartTheme.colors.border);

      svg.selectAll('.tick line')
        .attr('stroke', chartTheme.colors.border);
    };

    // Create initial chart
    createChart();

    // Set up ResizeObserver for responsive behavior
    const resizeObserver = new ResizeObserver(() => {
      createChart();
    });

    if (svgRef.current) {
      resizeObserver.observe(svgRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [data, width, height, isDark, selectedTopic, onTopicSelect]);

  // Check if data is available
  const hasData = data && data.topics && data.topics.series;

  if (!hasData) {
    const chartTheme = getChartTheme(isDark);
    return (
      <div className="flex items-center justify-center w-full h-full">
        <div className="text-center">
          <div className={`w-12 h-12 ${chartTheme.colors.surface} rounded-full flex items-center justify-center mx-auto mb-3`}>
            <i className={`fas fa-chart-area ${chartTheme.colors.text.muted} text-xl`}></i>
          </div>
          <p className={`${chartTheme.colors.text.muted} text-sm`}>N/A</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={svgRef} 
      className="w-full h-full"
      data-chart="stack"
    />
  );
}
