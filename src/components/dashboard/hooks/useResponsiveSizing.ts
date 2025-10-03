// Utility functions for responsive sizing

interface ResponsiveMargin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export const getResponsiveSizing = (width: number, chartType: 'area' | 'pack') => {
  const getResponsiveMargin = (): ResponsiveMargin => {
    if (chartType === 'area') {
      // Temporal Analysis Chart margins
      if (width < 640) return { top: 15, right: 10, bottom: 40, left: 30 };
      if (width < 1024) return { top: 20, right: 15, bottom: 35, left: 45 };
      return { top: 20, right: 20, bottom: 30, left: 50 };
    } else {
      // Topic Analysis Chart margins (pack)
      if (width < 640) return { top: 15, right: 15, bottom: 15, left: 15 };
      if (width < 1024) return { top: 18, right: 18, bottom: 18, left: 18 };
      return { top: 20, right: 20, bottom: 20, left: 20 };
    }
  };

  const getResponsiveFontSize = (): string => {
    if (width < 640) return '8px';
    if (width < 1024) return '9px';
    return '10px';
  };

  const getResponsiveLabelThresholds = () => {
    if (chartType === 'pack') {
      return {
        minLabelSize: width < 640 ? 8 : width < 1024 ? 10 : 12,
        labelThreshold: width < 640 ? 15 : width < 1024 ? 18 : 20
      };
    }
    return { minLabelSize: 8, labelThreshold: 20 };
  };

  return {
    margin: getResponsiveMargin(),
    fontSize: getResponsiveFontSize(),
    labelThresholds: getResponsiveLabelThresholds()
  };
};
