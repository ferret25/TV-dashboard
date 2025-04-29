"use client"

import { RefreshCw, Users } from "lucide-react"

interface DashboardHeaderProps {
  lastUpdated: Date | null
  currentVisitors: number
  onRefresh: () => void
}

export default function DashboardHeader({ lastUpdated, currentVisitors, onRefresh }: DashboardHeaderProps) {
  return (
    <div className="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h1 className="h3 mb-0">E-Commerce Performance Dashboard</h1>
        {lastUpdated && <p className="text-muted mb-0">Last updated: {lastUpdated.toLocaleTimeString()}</p>}
      </div>
      <div className="d-flex align-items-center gap-4">
        <div className="d-flex align-items-center">
          <div className="d-flex align-items-center me-2">
            <Users className="text-primary me-2" size={20} />
            <span className="fw-bold">{currentVisitors}</span>
          </div>
          <span className="text-muted">Live Visitors</span>
        </div>
        <button className="btn btn-outline-primary d-flex align-items-center" onClick={onRefresh}>
          <RefreshCw size={16} className="me-2" />
          Refresh
        </button>
      </div>
    </div>
  )
}
