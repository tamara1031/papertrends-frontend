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

export interface Subcategory {
  id: string;
  name: string;
  emoji: string;
}

export interface SubcategoryGroup {
  id: string;
  name: string;
  emoji: string;
  subcategories: Subcategory[];
}

export interface Category {
  id: string;
  name: string;
  emoji: string;
  subcategories?: Category[];
  subcategoryGroups: SubcategoryGroup[];
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

// Note: Analysis data is now loaded via JSON files instead of global window objects
