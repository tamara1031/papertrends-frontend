// Enterprise-grade chart design system
// Based on Highcharts and Splunk design patterns

export interface ChartTheme {
  colors: {
    primary: string[]
    background: string
    surface: string
    text: {
      primary: string
      secondary: string
      muted: string
    }
    border: string
    grid: string
    selection: string
    hover: string
  }
  typography: {
    fontFamily: string
    fontSize: {
      xs: number
      sm: number
      base: number
      lg: number
      xl: number
    }
    fontWeight: {
      normal: number
      medium: number
      semibold: number
      bold: number
    }
  }
  spacing: {
    xs: number
    sm: number
    md: number
    lg: number
    xl: number
  }
  shadows: {
    sm: string
    md: string
    lg: string
  }
  borderRadius: {
    sm: number
    md: number
    lg: number
  }
}

// Light theme
export const lightTheme: ChartTheme = {
  colors: {
    primary: [
      '#2563EB', // Blue - Primary
      '#059669', // Emerald - Success
      '#DC2626', // Red - Danger
      '#7C3AED', // Violet - Info
      '#EA580C', // Orange - Warning
      '#0891B2', // Cyan - Secondary
      '#16A34A', // Green - Success variant
      '#CA8A04', // Yellow - Warning variant
      '#DB2777', // Pink - Accent
      '#6366F1', // Indigo - Primary variant
      '#0D9488', // Teal - Info variant
      '#DC2626', // Red variant
      '#9333EA', // Purple - Accent variant
      '#0891B2', // Sky - Secondary variant
      '#65A30D'  // Lime - Success variant
    ],
    background: '#FFFFFF',
    surface: '#F8FAFC',
    text: {
      primary: '#0F172A',
      secondary: '#475569',
      muted: '#64748B'
    },
    border: '#E2E8F0',
    grid: '#F1F5F9',
    selection: '#3B82F6',
    hover: '#1E40AF'
  },
  typography: {
    fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontSize: {
      xs: 10,
      sm: 12,
      base: 14,
      lg: 16,
      xl: 18
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    }
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
  },
  borderRadius: {
    sm: 4,
    md: 6,
    lg: 8
  }
}

// Dark theme
export const darkTheme: ChartTheme = {
  colors: {
    primary: [
      '#3B82F6', // Blue - Primary
      '#10B981', // Emerald - Success
      '#EF4444', // Red - Danger
      '#8B5CF6', // Violet - Info
      '#F59E0B', // Orange - Warning
      '#06B6D4', // Cyan - Secondary
      '#22C55E', // Green - Success variant
      '#EAB308', // Yellow - Warning variant
      '#EC4899', // Pink - Accent
      '#6366F1', // Indigo - Primary variant
      '#14B8A6', // Teal - Info variant
      '#F87171', // Red variant
      '#A855F7', // Purple - Accent variant
      '#0EA5E9', // Sky - Secondary variant
      '#84CC16'  // Lime - Success variant
    ],
    background: '#0F172A',
    surface: '#1E293B',
    text: {
      primary: '#F8FAFC',
      secondary: '#CBD5E1',
      muted: '#94A3B8'
    },
    border: '#334155',
    grid: '#1E293B',
    selection: '#60A5FA',
    hover: '#93C5FD'
  },
  typography: {
    fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontSize: {
      xs: 10,
      sm: 12,
      base: 14,
      lg: 16,
      xl: 18
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    }
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)'
  },
  borderRadius: {
    sm: 4,
    md: 6,
    lg: 8
  }
}

// Chart-specific utilities
export const getChartTheme = (isDark: boolean): ChartTheme => {
  return isDark ? darkTheme : lightTheme
}

// Color utilities
export const getColorByIndex = (index: number, theme: ChartTheme): string => {
  return theme.colors.primary[index % theme.colors.primary.length]
}

// Typography utilities
export const getFontSize = (size: keyof ChartTheme['typography']['fontSize'], theme: ChartTheme): number => {
  return theme.typography.fontSize[size]
}

// Spacing utilities
export const getSpacing = (size: keyof ChartTheme['spacing'], theme: ChartTheme): number => {
  return theme.spacing[size]
}

// Selection state utilities
export const getSelectionColor = (theme: ChartTheme, isSelected: boolean, isHovered: boolean): string => {
  if (isSelected) return theme.colors.selection
  if (isHovered) return theme.colors.hover
  return theme.colors.primary[0]
}

// Opacity utilities for different states
export const getOpacity = (isSelected: boolean, isHovered: boolean): number => {
  if (isSelected) return 1.0
  if (isHovered) return 0.9
  return 0.7
}
