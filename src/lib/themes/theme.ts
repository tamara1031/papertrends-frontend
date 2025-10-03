export type Theme = 'light' | 'dark';

export interface ThemeColors {
  primary: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
  surface: string;
  background: string;
  text: {
    primary: string;
    secondary: string;
    muted: string;
  };
  border: string;
  hover: string;
  selection: string;
}

export interface ChartTheme {
  colors: {
    primary: string[];
    surface: string;
    background: string;
    text: {
      primary: string;
      muted: string;
    };
    border: string;
    hover: string;
    selection: string;
  };
  typography: {
    fontFamily: string;
    fontWeight: {
      medium: string;
      bold: string;
    };
  };
  shadows: {
    sm: string;
    lg: string;
  };
}

export const lightTheme: ThemeColors = {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  surface: '#ffffff',
  background: '#f9fafb',
  text: {
    primary: '#1f2937', // より読みやすいダークグレー
    secondary: '#374151',
    muted: '#6b7280',
  },
  border: '#e5e7eb',
  hover: '#3b82f6',
  selection: '#3b82f6',
};

export const darkTheme: ThemeColors = {
  primary: {
    50: '#1e3a8a',
    100: '#1e40af',
    200: '#1d4ed8',
    300: '#2563eb',
    400: '#3b82f6',
    500: '#60a5fa',
    600: '#93c5fd',
    700: '#bfdbfe',
    800: '#dbeafe',
    900: '#eff6ff',
  },
  surface: '#1f2937',
  background: '#111827',
  text: {
    primary: '#f3f4f6', // より読みやすいライトグレー（純白より目に優しい）
    secondary: '#e5e7eb',
    muted: '#9ca3af',
  },
  border: '#374151',
  hover: '#60a5fa',
  selection: '#60a5fa',
};

export const chartThemes: Record<Theme, ChartTheme> = {
  light: {
    colors: {
      primary: [
        '#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6',
        '#06b6d4', '#84cc16', '#f97316', '#ec4899', '#6366f1'
      ],
      surface: '#ffffff',
      background: '#f9fafb',
      text: {
        primary: '#1f2937', // より読みやすいダークグレー
        muted: '#6b7280',
      },
      border: '#e5e7eb',
      hover: '#3b82f6',
      selection: '#3b82f6',
    },
    typography: {
      fontFamily: 'Inter, system-ui, sans-serif',
      fontWeight: {
        medium: '500',
        bold: '700',
      },
    },
    shadows: {
      sm: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.05))',
      lg: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))',
    },
  },
  dark: {
    colors: {
      primary: [
        '#60a5fa', '#f87171', '#34d399', '#fbbf24', '#a78bfa',
        '#22d3ee', '#a3e635', '#fb923c', '#f472b6', '#818cf8'
      ],
      surface: '#1f2937',
      background: '#111827',
      text: {
        primary: '#f3f4f6', // より読みやすいライトグレー
        muted: '#9ca3af',
      },
      border: '#374151',
      hover: '#60a5fa',
      selection: '#60a5fa',
    },
    typography: {
      fontFamily: 'Inter, system-ui, sans-serif',
      fontWeight: {
        medium: '500',
        bold: '700',
      },
    },
    shadows: {
      sm: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3))',
      lg: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.4))',
    },
  },
};

export function getChartTheme(isDark: boolean): ChartTheme {
  return isDark ? chartThemes.dark : chartThemes.light;
}

export function getFontSize(size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'): string {
  const sizes = {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
  };
  return sizes[size];
}

export function getSpacing(size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'): number {
  const spacings = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  };
  return spacings[size];
}
