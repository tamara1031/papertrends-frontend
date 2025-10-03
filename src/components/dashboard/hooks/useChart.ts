import { useEffect, useRef, useCallback, useState } from 'react';
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
  enableDebounce?: boolean;
}

interface ChartState {
  dimensions: ChartDimensions;
  isInitialized: boolean;
  lastRenderTime: number;
}

export function useChart(params: UseChartParams = {}) {
  const {
    defaultWidth = 400,
    defaultHeight = 300,
    minWidth = 250,
    minHeight = 200,
    enableDebounce = true
  } = params;

  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [chartState, setChartState] = useState<ChartState>({
    dimensions: { width: defaultWidth, height: defaultHeight },
    isInitialized: false,
    lastRenderTime: 0
  });

  const getDimensions = useCallback((): ChartDimensions => {
    if (!containerRef.current || typeof window === 'undefined') {
      return { width: defaultWidth, height: defaultHeight };
    }

    const containerRect = containerRef.current.getBoundingClientRect();
    const width = Math.max(containerRect.width || defaultWidth, minWidth);
    const height = Math.max(containerRect.height || defaultHeight, minHeight);
    
    return { width, height };
  }, [defaultWidth, defaultHeight, minWidth, minHeight]);

  const clearChart = useCallback(() => {
    if (svgRef.current) {
      const svg = d3.select(svgRef.current);
      svg.selectAll('*').remove();
      setChartState(prev => ({ ...prev, isInitialized: false }));
    }
  }, []);

  const createChart = useCallback((
    callback: (
      dimensions: ChartDimensions, 
      svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
      state: ChartState
    ) => void
  ) => {
    const dimensions = getDimensions();
    
    if (!svgRef.current || dimensions.width === 0 || dimensions.height === 0) return;

    const now = Date.now();
    
    // Throttle rapid re-renders
    if (enableDebounce && now - chartState.lastRenderTime < 100) {
      return;
    }

    const svg = d3.select(svgRef.current);
    svg
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', `0 0 ${dimensions.width} ${dimensions.height}`)
      .style('background', 'transparent');

    const newState: ChartState = {
      dimensions,
      isInitialized: true,
      lastRenderTime: now
    };

    setChartState(newState);
    callback(dimensions, svg, newState);
  }, [getDimensions, chartState.lastRenderTime, enableDebounce]);

  // Resize observer for better performance than window resize
  useEffect(() => {
    if (!containerRef.current || typeof window === 'undefined') return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width !== chartState.dimensions.width || height !== chartState.dimensions.height) {
          createChart(() => {
            // Chart will be re-rendered by the component using this hook
          });
        }
      }
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [createChart, chartState.dimensions.width, chartState.dimensions.height]);

  // Fallback resize listener
  useEffect(() => {
    const handleResize = () => {
      if (svgRef.current && containerRef.current) {
        setTimeout(() => {
          const newDimensions = getDimensions();
          if (newDimensions.width !== chartState.dimensions.width || 
              newDimensions.height !== chartState.dimensions.height) {
            createChart(() => {});
          }
        }, 16); // ~60fps throttling
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [getDimensions, createChart, chartState.dimensions]);

  return {
    svgRef,
    containerRef,
    getDimensions,
    clearChart,
    createChart,
    chartState
  };
}
