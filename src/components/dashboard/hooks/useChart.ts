import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface ChartDimensions {
  width: number;
  height: number;
}

interface UseChartParams {
  defaultWidth?: number;
  defaultHeight?: number;
  minWidth?: number;
  minHeight?: number;
}

export function useChart(params: UseChartParams = {}) {
  const {
    defaultWidth = 400,
    defaultHeight = 300,
    minWidth = 250,
    minHeight = 200
  } = params;

  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const getDimensions = (): ChartDimensions => {
    if (!containerRef.current) {
      return { width: defaultWidth, height: defaultHeight };
    }

    const containerRect = containerRef.current.getBoundingClientRect();
    const width = Math.max(containerRect.width || defaultWidth, minWidth);
    const height = Math.max(containerRect.height || defaultHeight, minHeight);
    
    return { width, height };
  };

  const clearChart = () => {
    if (svgRef.current) {
      const svg = d3.select(svgRef.current);
      svg.selectAll('*').remove();
    }
  };

  const createChart = (callback: (dimensions: ChartDimensions, svg: d3.Selection<SVGSVGElement, unknown, null, undefined>) => void) => {
    const { width, height } = getDimensions();
    
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg
      .attr('width', '100%')
      .attr('height', '100%')
      .style('background', 'transparent');

    callback({ width, height }, svg);
  };

  useEffect(() => {
    const handleResize = () => {
      // Re-render chart on resize
      if (svgRef.current && containerRef.current) {
        window.dispatchEvent(new Event('chart-resize'));
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    svgRef,
    containerRef,
    getDimensions,
    clearChart,
    createChart
  };
}
