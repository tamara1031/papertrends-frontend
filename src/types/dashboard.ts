// Common types for dashboard components

export interface Topic {
  id: string;
  name: string;
  count: number;
  keywords: [string, number][];
}

export interface TopicData {
  topics: {
    data: Record<string, Topic>;
    series: Record<string, number[]>;
  };
}

export interface Paper {
  id: string;
  title: string;
  authors: string[];
  year: number;
  citations: number;
  abstract: string;
  topics: string[];
}

export interface DashboardStats {
  name: string;
  label: string;
  value: string | number;
  color: string;
  icon?: string;
  subtitle?: string;
}

export interface ChartColors {
  [key: string]: string[];
}

export type ChartType = 'area' | 'pack';
export type LegendVariant = 'desktop' | 'mobile';
