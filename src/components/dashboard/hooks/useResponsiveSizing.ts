// Utility functions for responsive sizing

interface Margin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

interface ResponsiveConfig {
  margin: Margin;
  fontSize: string;
  minLabelSize?: number;
  labelThreshold?: number;
}

export const getResponsiveSizing = (width: number, chartType: 'area' | 'pack'): ResponsiveConfig => {
  const isSmall = width < 640;
  const isMedium = width < 1024;
  
  const margin: Margin = chartType === 'area' 
    ? (isSmall ? { top: 15, right: 10, bottom: 40, left: 30 }
       : isMedium ? { top: 20, right: 15, bottom: 35, left: 45 }
       : { top: 20, right: 20, bottom: 30, left: 50 })
    : (isSmall ? { top: 15, right: 15, bottom: 15, left: 15 }
       : isMedium ? { top: 18, right: 18, bottom: 18, left: 18 }
       : { top: 20, right: 20, bottom: 20, left: 20 });

  const fontSize = isSmall ? '8px' : isMedium ? '9px' : '10px';
  
  const result: ResponsiveConfig = { margin, fontSize };
  
  if (chartType === 'pack') {
    result.minLabelSize = isSmall ? 8 : isMedium ? 10 : 12;
    result.labelThreshold = isSmall ? 15 : isMedium ? 18 : 20;
  }
  
  return result;
};
