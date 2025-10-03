/**
 * Formats authors for display with quantity limit
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
 * Topic color patterns for consistency across charts
 */
export const TOPIC_COLORS = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b'];

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
    value: '88,303',
    color: 'red',
    icon: '📄'
  },
  {
    name: 'topics',
    label: 'Topics',
    value: '48',
    color: 'orange',
    icon: '🏷️'
  },
  {
    name: 'period',
    label: 'Period',
    value: '2020-01 - 2025-09',
    color: 'yellow',
    icon: '📅'
  },
  {
    name: 'updated',
    label: 'Updated',
    value: 'Sep 26',
    color: 'green',
    icon: '🔄',
    subtitle: 'v0.0.2'
  }
];