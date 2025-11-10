"use client"

import { useState } from "react"
import Sidebar from "./sidebar"
import Header from "./dashboard-header"
import { Outlet } from "react-router-dom"

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className={`flex min-h-screen bg-background`}> 
      <Sidebar open={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      <div className={`flex-1 flex flex-col overflow-hidden transition-[padding-left] duration-300 ease-in-out ${
        sidebarOpen ? 'md:pl-64' : 'md:pl-0'
      }`}>
        <Header onSidebarToggle={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl w-full mx-auto p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
