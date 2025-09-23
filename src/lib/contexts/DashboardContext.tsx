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
  }
}

const DashboardContext = createContext<DashboardContextType | null>(null)

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState({
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

  return (
    <DashboardContext.Provider value={{ state, handlers: { handleClearSelection } }}>
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
