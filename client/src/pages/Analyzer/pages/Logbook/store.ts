import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { StockLog } from './types'

interface AnalyzerState {
  // Data Persistence (The History)
  logs: StockLog[]
  addLog: (log: StockLog) => void
  deleteLog: (id: string) => void
  clearLogs: () => void
}

export const useAnalyzerStore = create<AnalyzerState>()(
  persist(
    set => ({
      logs: [],
      // Log actions
      addLog: log =>
        set(state => ({
          logs: [log, ...state.logs]
        })),

      deleteLog: id =>
        set(state => ({
          logs: state.logs.filter(log => log.id !== id)
        })),

      clearLogs: () =>
        set(() => ({
          logs: []
        }))
    }),
    {
      name: 'cold-eye-analyzer-storage'
    }
  )
)
