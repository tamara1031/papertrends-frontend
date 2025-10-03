/**
 * Dashboard Type Definitions
 * arXiv-inspired academic research dashboard types
 */

export interface Topic {
  id: string;
  name: string;
  count: number;
  keywords: [string, number][];
}

// Analysis data types
export interface AnalysisData {
  topics: {
    data: {
      [topic_id: string]: {
        name: string;
        keywords: [string, number][];
        count: number;
      };
    };
    correlations: number[][];
    series: {
      [year: string]: number[];
    };
    papers: {
      [topic_id: string]: Paper[];
    };
  };
  metadata: {
    categoryId: string;
    subcategoryId: string;
    lastUpdated: string;
    dataVersion: string;
    period: {
      start: string;
      end: string;
    };
  };
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
  color: 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple' | 'gray';
  icon: string;
  subtitle?: string;
}

export interface ChartColors {
  [key: string]: string[];
}

export type ChartType = 'area' | 'pack';
export type LegendVariant = 'desktop' | 'mobile';

// Dashboard state
export interface DashboardState {
  selectedTopic: string | null;
  selectedYear: string | null;
  viewMode: 'bubble' | 'river';
}

export interface DashboardHandlers {
  handleTopicSelect: (topicId: string | null) => void;
  handleYearSelect: (year: string | null) => void;
  handleViewModeChange: (mode: 'bubble' | 'river') => void;
}

// Bubble Chart specific types
export interface WordNode {
  name: string;
  size: number;
  importance: number;
  topic: string;
}
