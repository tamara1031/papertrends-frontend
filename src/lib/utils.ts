/**
 * arXiv-style utilities for academic dashboard
 */

/**
 * Formats authors for display with quantity limit
 * Follows arXiv citation formatting standards
 */
export function formatAuthors(authors: string[], maxDisplay: number = 2): string {
  if (!authors || authors.length === 0) {
    return 'N/A';
  }
  if (authors.length <= maxDisplay) {
    return authors.join(', ');
  }
  return `${authors.slice(0, maxDisplay).join(', ')} et al.`;
}

// Dashboard-specific utilities
import type { Topic, TopicData, DashboardStats } from '../types/dashboard';

/**
 * arXiv-inspired color palette for research visualization
 * Academic colors optimized for research dashboard charts
 */
export const TOPIC_COLORS = [
  '#0000ee', // arXiv blue
  '#cc0000', // arXiv red  
  '#006600', // Academic green
  '#ff6600', // Research orange
  '#6600cc', // Academic purple
  '#ffaa00'  // Highlight yellow
];

/**
 * Generate temporal data from topics for chart visualization
 * @param topics - Array of topic objects
 * @returns Generated temporal data structure
 */
export const generateTemporalData = (topics: Topic[]): TopicData => {
  const data: TopicData = {
    topics: {
      data: Object.fromEntries(topics.map(topic => [topic.id, topic])),
      series: {
        '2020': topics.map(t => Math.floor(t.count / 20)),
        '2021': topics.map(t => Math.floor(t.count / 15)),
        '2022': topics.map(t => Math.floor(t.count / 12)),
        '2023': topics.map(t => Math.floor(t.count / 10)),
        '2024': topics.map(t => Math.floor(t.count / 8)),
      }
    }
  };
  return data;
};

/**
 * Dashboard statistics data
 */
export const DASHBOARD_STATS: DashboardStats[] = [
  {
    name: 'papers',
    label: 'Papers',
    value: '1,825',
    color: 'blue',
    icon: '📄'
  },
  {
    name: 'topics',
    label: 'Topics',
    value: '8',
    color: 'green',
    icon: '🏷️'
  },
  {
    name: 'period',
    label: 'Period',
    value: '2020-01 - 2025-09',
    color: 'orange',
    icon: '📅',
    subtitle: '69mo'
  },
  {
    name: 'updated',
    label: 'Updated',
    value: 'Sep 26, 25',
    color: 'purple',
    icon: '🔄',
    subtitle: 'v0.0.2'
  }
];