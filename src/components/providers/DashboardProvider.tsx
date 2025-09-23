'use client'

import React, { createContext, useContext } from 'react'
import { useDashboardEvents } from '@/lib'

interface DashboardContextType {
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

interface DashboardProviderProps {
  children: React.ReactNode
}

export function DashboardProvider({ children }: DashboardProviderProps) {
  const dashboardEvents = useDashboardEvents()

  return (
    <DashboardContext.Provider value={dashboardEvents}>
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
