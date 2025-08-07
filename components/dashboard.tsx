"use client"

import { useState, useEffect } from "react"
import { Flame } from "lucide-react"
import { practiceTracker, type StreakData } from "@/lib/practice-tracker"
import DashboardPopup from "./dashboard-popup"

export default function Dashboard() {
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [streakData, setStreakData] = useState<StreakData>({
    currentStreak: 0,
    longestStreak: 0,
    totalSessions: 0,
    thisWeek: 0,
    thisMonth: 0,
    lastPracticeDate: null,
  })

  // Load and update streak data
  useEffect(() => {
    const updateStreakData = () => {
      const data = practiceTracker.calculateStreakData()
      setStreakData(data)
    }

    // Initial load
    updateStreakData()

    // Listen for practice events
    const handlePracticeRecorded = () => {
      updateStreakData()
    }

    const handleSampleDataAdded = () => {
      updateStreakData()
    }

    window.addEventListener("practiceRecorded", handlePracticeRecorded)
    window.addEventListener("sampleDataAdded", handleSampleDataAdded)

    return () => {
      window.removeEventListener("practiceRecorded", handlePracticeRecorded)
      window.removeEventListener("sampleDataAdded", handleSampleDataAdded)
    }
  }, [])

  return (
    <>
      {/* Dashboard Button */}
      <button
        onClick={() => setIsPopupOpen(true)}
        className="flex items-center hover:text-[#00DF82] transition-colors relative"
      >
        <Flame size={18} className="mr-1" />
        <span className="hidden sm:inline">Dashboard</span>
        {streakData.currentStreak > 0 && (
          <span className="absolute -top-2 -right-2 bg-[#00DF82] text-[#030F0F] text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
            {streakData.currentStreak}
          </span>
        )}
      </button>

      {/* Dashboard Popup */}
      <DashboardPopup 
        isOpen={isPopupOpen} 
        onClose={() => setIsPopupOpen(false)} 
      />
    </>
  )
} 