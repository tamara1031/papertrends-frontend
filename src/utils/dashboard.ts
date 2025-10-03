import type { Topic, TopicData, DashboardStats } from '../types/dashboard';

// Topic color patterns for consistency
export const TOPIC_COLORS = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b'];

// Generate temporal data from topics
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

// Dashboard statistics data
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

// Common chart container CSS classes
export const CSS_CLASSES = {
  chartContainer: 'w-full h-72 sm:h-80 md:h-96 lg:h-[400px] xl:h-[450px]',
  mainContainer: 'max-w-[90%] mx-auto px-6 sm:px-8 lg:px-12',
  pageLayout: 'min-h-screen bg-gray-50 dark:bg-gray-900',
  headerSection: 'bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800',
  card: 'bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 h-full',
  statsCard: 'bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3 min-w-[100px] h-[70px] flex flex-col justify-between'
} as const;
