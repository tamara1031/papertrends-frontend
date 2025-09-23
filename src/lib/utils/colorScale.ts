// Common color scale for consistent coloring across charts
export const getColorScale = (categories: string[]) => {
  const colorPalette = [
    "#3b82f6", // Blue
    "#10b981", // Emerald
    "#f59e0b", // Amber
    "#ef4444", // Red
    "#8b5cf6", // Violet
    "#06b6d4", // Cyan
    "#84cc16", // Lime
    "#f97316", // Orange
    "#ec4899", // Pink
    "#14b8a6", // Teal
    "#6366f1", // Indigo
    "#f43f5e", // Rose
    "#22c55e", // Green
    "#eab308", // Yellow
    "#a855f7", // Purple
    "#06b6d4", // Sky
  ]

  const colorMap = new Map<string, string>()
  
  categories.forEach((category, index) => {
    colorMap.set(category, colorPalette[index % colorPalette.length])
  })

  return (category: string) => colorMap.get(category) || "#6b7280"
}

// Get color for a specific category
export const getCategoryColor = (category: string, categories: string[]) => {
  const colorScale = getColorScale(categories)
  return colorScale(category)
}
