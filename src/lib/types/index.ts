export interface Paper {
  title: string;
  year: string;
  abstract: string;
  arxiv_id: string;
}

// Bubble Chart specific types
export interface WordNode {
  name: string;
  size: number;
  importance: number;
  topic: string;
}


// Analysis data types
export interface AnalysisData {
  topics: {
    data: {
      [topic_id: string]: {
        name: string;
        keywords: [string, number][];  // [キーワード, 頻度]のタプル配列
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

// Topic data for charts
export interface TopicData {
  id: string;
  name: string;
  count: number;
  keywords: [string, number][];
}

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
