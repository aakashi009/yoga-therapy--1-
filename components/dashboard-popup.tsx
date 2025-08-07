"use client"

import { useState, useEffect } from "react"
import { X, Flame, Target, TrendingUp, Clock, Award, Calendar, BarChart3, Trophy, Activity } from "lucide-react"
import { practiceTracker, type StreakData } from "@/lib/practice-tracker"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "@/lib/firebase"
import TestDashboard from "./test-dashboard"

interface DashboardPopupProps {
  isOpen: boolean
  onClose: () => void
}

export default function DashboardPopup({ isOpen, onClose }: DashboardPopupProps) {
  const [user, loading] = useAuthState(auth)
  const [streakData, setStreakData] = useState<StreakData>({
    currentStreak: 0,
    longestStreak: 0,
    totalSessions: 0,
    thisWeek: 0,
    thisMonth: 0,
    lastPracticeDate: null,
  })
  const [activeTab, setActiveTab] = useState<"overview" | "performance" | "test">("overview")

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

  const getStreakEmoji = (streak: number) => {
    if (streak >= 7) return "🔥"
    if (streak >= 3) return "⚡"
    if (streak >= 1) return "✨"
    return "💪"
  }

  const getMotivationalMessage = (streak: number) => {
    if (streak === 0) return "Start your yoga journey today!"
    if (streak === 1) return "Great start! Keep it going!"
    if (streak < 7) return "Building momentum! You're doing great!"
    if (streak < 30) return "Amazing consistency! You're on fire!"
    return "Incredible dedication! You're unstoppable!"
  }

  const getPerformanceLevel = (streak: number) => {
    if (streak >= 30) return { level: "Master", color: "text-purple-600", bg: "bg-purple-100" }
    if (streak >= 14) return { level: "Advanced", color: "text-blue-600", bg: "bg-blue-100" }
    if (streak >= 7) return { level: "Intermediate", color: "text-green-600", bg: "bg-green-100" }
    if (streak >= 1) return { level: "Beginner", color: "text-orange-600", bg: "bg-orange-100" }
    return { level: "New", color: "text-gray-600", bg: "bg-gray-100" }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Flame className="w-8 h-8 text-orange-500" />
            <h2 className="text-2xl font-bold text-gray-800">Yoga Dashboard</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Authentication Check */}
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00DF82] mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading...</p>
          </div>
        ) : !user ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Flame className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Login to Continue</h3>
            <p className="text-gray-600 mb-6">
              Sign in to access your personalized yoga dashboard and track your progress.
            </p>
            <button
              onClick={() => window.location.href = "/index.html"}
              className="bg-[#00DF82] text-[#030F0F] px-6 py-3 rounded-lg font-medium hover:bg-[#03624C] hover:text-white transition-colors"
            >
              Sign In
            </button>
          </div>
        ) : (
          <>
            {/* User Info */}
            <div className="p-6 bg-gradient-to-r from-[#00DF82]/10 to-[#03624C]/10 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Welcome back, {user.email?.split('@')[0]}!
                  </h3>
                  <p className="text-gray-600">Track your yoga journey and progress</p>
                </div>
                <div className={`px-4 py-2 rounded-full ${getPerformanceLevel(streakData.currentStreak).bg}`}>
                  <span className={`font-medium ${getPerformanceLevel(streakData.currentStreak).color}`}>
                    {getPerformanceLevel(streakData.currentStreak).level}
                  </span>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab("overview")}
                className={`px-6 py-3 font-medium transition-colors ${
                  activeTab === "overview"
                    ? "text-[#00DF82] border-b-2 border-[#00DF82]"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("performance")}
                className={`px-6 py-3 font-medium transition-colors ${
                  activeTab === "performance"
                    ? "text-[#00DF82] border-b-2 border-[#00DF82]"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Performance
              </button>
              <button
                onClick={() => setActiveTab("test")}
                className={`px-6 py-3 font-medium transition-colors ${
                  activeTab === "test"
                    ? "text-[#00DF82] border-b-2 border-[#00DF82]"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Test Controls
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === "overview" && (
                <div className="space-y-6">
                  {/* Current Streak */}
                  <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-lg border border-orange-200">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">Current Streak</h3>
                        <p className="text-gray-600">{getMotivationalMessage(streakData.currentStreak)}</p>
                      </div>
                      <span className="text-4xl">{getStreakEmoji(streakData.currentStreak)}</span>
                    </div>
                    <div className="text-4xl font-bold text-orange-600 mb-2">
                      {streakData.currentStreak} days
                    </div>
                    <div className="w-full bg-orange-200 rounded-full h-2">
                      <div 
                        className="bg-orange-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min((streakData.currentStreak / 30) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <div className="flex items-center mb-2">
                        <Target className="w-5 h-5 text-blue-600 mr-2" />
                        <span className="text-sm text-gray-600">Longest Streak</span>
                      </div>
                      <div className="text-2xl font-bold text-blue-600">
                        {streakData.longestStreak} days
                      </div>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <div className="flex items-center mb-2">
                        <TrendingUp className="w-5 h-5 text-green-600 mr-2" />
                        <span className="text-sm text-gray-600">Total Sessions</span>
                      </div>
                      <div className="text-2xl font-bold text-green-600">
                        {streakData.totalSessions}
                      </div>
                    </div>

                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                      <div className="flex items-center mb-2">
                        <Calendar className="w-5 h-5 text-purple-600 mr-2" />
                        <span className="text-sm text-gray-600">This Week</span>
                      </div>
                      <div className="text-2xl font-bold text-purple-600">
                        {streakData.thisWeek}
                      </div>
                    </div>

                    <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                      <div className="flex items-center mb-2">
                        <Award className="w-5 h-5 text-indigo-600 mr-2" />
                        <span className="text-sm text-gray-600">This Month</span>
                      </div>
                      <div className="text-2xl font-bold text-indigo-600">
                        {streakData.thisMonth}
                      </div>
                    </div>
                  </div>

                  {/* Last Practice */}
                  {streakData.lastPracticeDate && (
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <div className="flex items-center mb-2">
                        <Clock className="w-5 h-5 text-gray-600 mr-2" />
                        <span className="text-sm text-gray-600">Last Practice</span>
                      </div>
                      <div className="text-lg font-medium text-gray-800">
                        {new Date(streakData.lastPracticeDate).toLocaleDateString()}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "performance" && (
                <div className="space-y-6">
                  {/* Performance Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-lg border border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
                        Weekly Progress
                      </h3>
                      <div className="space-y-3">
                        {Array.from({ length: 7 }, (_, i) => {
                          const date = new Date()
                          date.setDate(date.getDate() - (6 - i))
                          const dateStr = date.toISOString().split('T')[0]
                          const hasPractice = practiceTracker.getPracticeData().some(
                            session => session.date === dateStr
                          )
                          return (
                            <div key={i} className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">
                                {date.toLocaleDateString('en-US', { weekday: 'short' })}
                              </span>
                              <div className={`w-4 h-4 rounded-full ${hasPractice ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg border border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <Trophy className="w-5 h-5 mr-2 text-yellow-600" />
                        Achievements
                      </h3>
                      <div className="space-y-3">
                        <div className={`flex items-center p-3 rounded-lg ${streakData.currentStreak >= 1 ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'}`}>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${streakData.currentStreak >= 1 ? 'bg-green-500' : 'bg-gray-300'}`}>
                            {streakData.currentStreak >= 1 ? '✓' : '○'}
                          </div>
                          <div>
                            <div className="font-medium">First Practice</div>
                            <div className="text-sm text-gray-600">Complete your first yoga session</div>
                          </div>
                        </div>

                        <div className={`flex items-center p-3 rounded-lg ${streakData.currentStreak >= 7 ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'}`}>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${streakData.currentStreak >= 7 ? 'bg-green-500' : 'bg-gray-300'}`}>
                            {streakData.currentStreak >= 7 ? '✓' : '○'}
                          </div>
                          <div>
                            <div className="font-medium">Week Warrior</div>
                            <div className="text-sm text-gray-600">Practice for 7 consecutive days</div>
                          </div>
                        </div>

                        <div className={`flex items-center p-3 rounded-lg ${streakData.currentStreak >= 30 ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'}`}>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${streakData.currentStreak >= 30 ? 'bg-green-500' : 'bg-gray-300'}`}>
                            {streakData.currentStreak >= 30 ? '✓' : '○'}
                          </div>
                          <div>
                            <div className="font-medium">Monthly Master</div>
                            <div className="text-sm text-gray-600">Practice for 30 consecutive days</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Activity Summary */}
                  <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <Activity className="w-5 h-5 mr-2 text-purple-600" />
                      Activity Summary
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{streakData.totalSessions}</div>
                        <div className="text-sm text-gray-600">Total Sessions</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{streakData.longestStreak}</div>
                        <div className="text-sm text-gray-600">Best Streak</div>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">{streakData.thisMonth}</div>
                        <div className="text-sm text-gray-600">This Month</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "test" && (
                <div>
                  <TestDashboard />
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
} 