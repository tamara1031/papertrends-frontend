import { Category } from '../types';

export function getColorScale(categoryId: string): string[] {
  const colorScales: Record<string, string[]> = {
    cs: ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4', '#84cc16', '#f97316', '#ec4899', '#6366f1'],
    math: ['#10b981', '#059669', '#84cc16', '#65a30d', '#4d7c0f', '#365314', '#15803d', '#166534', '#14532d', '#052e16'],
    physics: ['#f97316', '#f59e0b', '#eab308', '#ca8a04', '#a16207', '#854d0e', '#713f12', '#422006', '#451a03', '#7c2d12'],
    bio: ['#059669', '#10b981', '#14b8a6', '#0d9488', '#0f766e', '#115e59', '#134e4a', '#164e63', '#155e75', '#0c4a6e'],
    econ: ['#f43f5e', '#ec4899', '#d946ef', '#c026d3', '#a21caf', '#86198f', '#701a75', '#581c87', '#4c1d95', '#3730a3'],
    stat: ['#64748b', '#6b7280', '#71717a', '#78716c', '#7c2d12', '#92400e', '#b45309', '#d97706', '#ea580c', '#dc2626'],
    eng: ['#f97316', '#f59e0b', '#eab308', '#ca8a04', '#a16207', '#854d0e', '#713f12', '#422006', '#451a03', '#7c2d12'],
    other: ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16', '#10b981']
  };
  
  return colorScales[categoryId] || colorScales.other;
}

export function getCategoryGradient(categoryId: string): string {
  const gradients: Record<string, string> = {
    cs: 'bg-gradient-cs',
    math: 'bg-gradient-math',
    physics: 'bg-gradient-physics',
    bio: 'bg-gradient-bio',
    econ: 'bg-gradient-econ',
    stat: 'bg-gradient-stat',
    eng: 'bg-gradient-eng',
    other: 'bg-gradient-other'
  };
  
  return gradients[categoryId] || gradients.other;
}

export function getCategoryEmoji(categoryId: string): string {
  const emojis: Record<string, string> = {
    cs: '💻',
    math: '📐',
    physics: '⚛️',
    bio: '🧬',
    econ: '💰',
    stat: '📊',
    eng: '⚙️',
    other: '🔬'
  };
  
  return emojis[categoryId] || emojis.other;
}
