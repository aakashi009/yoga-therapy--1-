"use client"

import { useState } from "react"
import { practiceTracker } from "@/lib/practice-tracker"
import { Button } from "@/components/ui/button"

export default function TestDashboard() {
  const [message, setMessage] = useState("")

  const addSampleData = () => {
    practiceTracker.addSampleData()
    setMessage("Sample data added! Check the dashboard.")
    setTimeout(() => setMessage(""), 3000)
  }

  const clearData = () => {
    practiceTracker.clearPracticeData()
    setMessage("All practice data cleared!")
    setTimeout(() => setMessage(""), 3000)
  }

  const addTodayPractice = () => {
    practiceTracker.recordPractice("Test Yoga Pose", 120, "backpain")
    setMessage("Today's practice recorded!")
    setTimeout(() => setMessage(""), 3000)
  }

  return (
    <div className="p-6 bg-gradient-to-r from-[#030F0F]/5 to-[#03624C]/5 rounded-lg border border-[#00DF82]/20">
      <h3 className="text-xl font-semibold mb-4 text-[#030F0F] flex items-center">
        <span className="mr-2">🧪</span>
        Dashboard Test Controls
      </h3>
      <div className="space-y-3">
        <Button 
          onClick={addSampleData} 
          className="w-full bg-[#00DF82] text-[#030F0F] hover:bg-[#03624C] hover:text-white transition-colors font-medium"
        >
          Add Sample Data (7 days)
        </Button>
        <Button 
          onClick={addTodayPractice} 
          className="w-full bg-transparent border-2 border-[#00DF82] text-[#00DF82] hover:bg-[#00DF82] hover:text-[#030F0F] transition-colors font-medium"
        >
          Add Today's Practice
        </Button>
        <Button 
          onClick={clearData} 
          className="w-full bg-red-500 text-white hover:bg-red-600 transition-colors font-medium"
        >
          Clear All Data
        </Button>
      </div>
      {message && (
        <div className="mt-4 p-3 bg-[#00DF82]/10 border border-[#00DF82]/20 text-[#03624C] rounded-lg">
          {message}
        </div>
      )}
    </div>
  )
} 