'use client'

import { useState, useCallback } from 'react'

export interface DashboardState {
  selectedTopic: string | null
  selectedCategory: string | null
  isFiltered: boolean
}

export function useDashboardEvents() {
  const [state, setState] = useState<DashboardState>({
    selectedTopic: null,
    selectedCategory: null,
    isFiltered: false
  })

  // Clear selection handler
  const handleClearSelection = useCallback(() => {
    setState({
      selectedTopic: null,
      selectedCategory: null,
      isFiltered: false
    })
  }, [])

  return {
    state,
    handlers: {
      handleClearSelection
    }
  }
}
