import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines class names using clsx and tailwind-merge for optimal Tailwind CSS class handling
 * @param inputs - Class values to be combined
 * @returns Merged and deduplicated class string
 * @example
 * ```typescript
 * cn('px-4 py-2', 'text-red-500', 'px-6') // 'px-6 py-2 text-red-500'
 * ```
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Formats large numbers with appropriate units (K, M, B) for better readability
 * @param num - Number to format
 * @returns Formatted string with appropriate unit
 * @example
 * ```typescript
 * formatNumber(1500) // '1.5K'
 * formatNumber(2500000) // '2.5M'
 * formatNumber(1200000000) // '1.2B'
 * ```
 */
export function formatNumber(num: number): string {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + 'B';
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

/**
 * Truncates text to specified length with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

/**
 * Generates a safe ID from a string
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Debounce function for performance optimization
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Throttle function for performance optimization
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Formats authors list for display
 */
export function formatAuthors(authors: string[], maxDisplay: number = 2): string {
  if (authors.length <= maxDisplay) {
    return authors.join(', ');
  }
  
  const displayed = authors.slice(0, maxDisplay);
  const remaining = authors.length - maxDisplay;
  
  return [...displayed, `+${remaining} more`].join(', ');
}

/**
 * Checks if we're in dark mode
 */
export function isDarkMode(): boolean {
  if (typeof window === 'undefined') return false;
  return document.documentElement.classList.contains('dark');
}

/**
 * Safe local storage operations
 */
export const storage = {
  get: (key: string): string | null => {
    if (typeof window === 'undefined') return null;
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  
  set: (key: string, value: string): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(key, value);
    } catch {
      // Silent fail for storage quota exceeded
    }
  },
  
  remove: (key: string): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem(key);
    } catch {
      // Silent fail
    }
  }
};

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (typeof window === 'undefined') return false;
  
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
      document.execCommand('copy'); // eslint-disable-line deprecation/deprecation
      return true;
    } catch {
      return false;
    } finally {
      document.body.removeChild(textArea);
    }
  }
}

/**
 * Smooth scroll to element
 */
export function scrollTo(element: HTMLElement | string, offset: number = 0): void {
  const target = typeof element === 'string' ? document.querySelector(element) : element;
  if (!target) return;
  
  const elementRect = (target as HTMLElement).getBoundingClientRect();
  const absoluteElementTop = elementRect.top + window.pageYOffset;
  const middleOffset = offset;
  
  window.scrollTo({
    top: absoluteElementTop - middleOffset,
    behavior: 'smooth'
  });
}

/**
 * Check if element is in viewport
 */
export function isInViewport(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
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
