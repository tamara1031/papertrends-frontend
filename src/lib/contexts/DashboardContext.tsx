'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'

export interface DashboardContextType {
  state: {
    selectedTopic: string | null
    selectedCategory: string | null
    isFiltered: boolean
  }
  handlers: {
    handleClearSelection: () => void
    handleTopicSelect: (_topicId: string | null) => void
    handleCategorySelect: (_categoryId: string | null) => void
  }
}

const DashboardContext = createContext<DashboardContextType | null>(null)

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<{
    selectedTopic: string | null
    selectedCategory: string | null
    isFiltered: boolean
  }>({
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

  // Topic selection handler
  const handleTopicSelect = useCallback((topicId: string | null) => {
    setState(prev => ({
      ...prev,
      selectedTopic: topicId,
      isFiltered: topicId !== null
    }))
  }, [])

  // Category selection handler
  const handleCategorySelect = useCallback((categoryId: string | null) => {
    setState(prev => ({
      ...prev,
      selectedCategory: categoryId,
      isFiltered: categoryId !== null
    }))
  }, [])

  return (
    <DashboardContext.Provider value={{ 
      state, 
      handlers: { 
        handleClearSelection, 
        handleTopicSelect, 
        handleCategorySelect 
      } 
    }}>
      {children}
    </DashboardContext.Provider>
  )
}

export function useDashboard() {
  const context = useContext(DashboardContext)
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider')
  }
  return context
}
