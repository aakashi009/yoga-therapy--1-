export interface PracticeSession {
  id: string
  date: string
  poseName: string
  duration: number
  condition: string
  timestamp: number
}

export interface StreakData {
  currentStreak: number
  longestStreak: number
  totalSessions: number
  thisWeek: number
  thisMonth: number
  lastPracticeDate: string | null
}

class PracticeTracker {
  private readonly STORAGE_KEY = "yogaPracticeData"

  // Record a new practice session
  recordPractice(poseName: string, duration: number, condition: string): void {
    try {
      const today = new Date()
      const session: PracticeSession = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        date: today.toISOString().split("T")[0],
        poseName,
        duration,
        condition,
        timestamp: today.getTime(),
      }

      const existingData = this.getPracticeData()
      existingData.push(session)
      
      // Sort by date (newest first)
      existingData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(existingData))
      
      // Dispatch custom event to notify dashboard
      window.dispatchEvent(new CustomEvent("practiceRecorded", { detail: session }))
    } catch (error) {
      console.error("Error recording practice:", error)
    }
  }

  // Get all practice data
  getPracticeData(): PracticeSession[] {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY)
      return data ? JSON.parse(data) : []
    } catch (error) {
      console.error("Error loading practice data:", error)
      return []
    }
  }

  // Calculate streak data
  calculateStreakData(): StreakData {
    const sessions = this.getPracticeData()
    
    if (sessions.length === 0) {
      return {
        currentStreak: 0,
        longestStreak: 0,
        totalSessions: 0,
        thisWeek: 0,
        thisMonth: 0,
        lastPracticeDate: null,
      }
    }

    const today = new Date()
    const todayStr = today.toISOString().split("T")[0]
    
    // Sort sessions by date (newest first)
    const sortedSessions = sessions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    
    // Calculate current streak
    let currentStreak = 0
    let currentDate = new Date(today)
    
    for (let i = 0; i < 365; i++) { // Check up to a year back
      const dateStr = currentDate.toISOString().split("T")[0]
      const hasPractice = sessions.some(session => session.date === dateStr)
      
      if (hasPractice) {
        currentStreak++
        currentDate.setDate(currentDate.getDate() - 1)
      } else {
        break
      }
    }

    // Calculate longest streak
    let longestStreak = 0
    let tempStreak = 0
    const uniqueDates = [...new Set(sessions.map(s => s.date))].sort()
    
    for (let i = 0; i < uniqueDates.length; i++) {
      const currentDate = new Date(uniqueDates[i])
      const nextDate = i < uniqueDates.length - 1 ? new Date(uniqueDates[i + 1]) : null
      
      if (nextDate) {
        const dayDiff = (nextDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)
        if (dayDiff === 1) {
          tempStreak++
        } else {
          longestStreak = Math.max(longestStreak, tempStreak + 1)
          tempStreak = 0
        }
      } else {
        longestStreak = Math.max(longestStreak, tempStreak + 1)
      }
    }

    // Calculate this week and month
    const weekStart = new Date(today)
    weekStart.setDate(today.getDate() - today.getDay())
    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1)
    
    const thisWeek = sessions.filter(session => {
      const sessionDate = new Date(session.date)
      return sessionDate >= weekStart
    }).length

    const thisMonth = sessions.filter(session => {
      const sessionDate = new Date(session.date)
      return sessionDate >= monthStart
    }).length

    return {
      currentStreak,
      longestStreak,
      totalSessions: sessions.length,
      thisWeek,
      thisMonth,
      lastPracticeDate: sortedSessions[0]?.date || null,
    }
  }

  // Check if user has practiced today
  hasPracticedToday(): boolean {
    const today = new Date().toISOString().split("T")[0]
    const sessions = this.getPracticeData()
    return sessions.some(session => session.date === today)
  }

  // Get today's sessions
  getTodaySessions(): PracticeSession[] {
    const today = new Date().toISOString().split("T")[0]
    const sessions = this.getPracticeData()
    return sessions.filter(session => session.date === today)
  }

  // Clear all practice data (for testing/reset)
  clearPracticeData(): void {
    localStorage.removeItem(this.STORAGE_KEY)
    window.dispatchEvent(new CustomEvent("practiceDataCleared"))
  }

  // Add sample data for testing
  addSampleData(): void {
    const today = new Date()
    const sampleSessions: PracticeSession[] = []
    
    // Add sessions for the last 7 days
    for (let i = 0; i < 7; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() - i)
      
      sampleSessions.push({
        id: `sample-${i}`,
        date: date.toISOString().split("T")[0],
        poseName: "Sample Yoga Pose",
        duration: 15 + Math.floor(Math.random() * 30),
        condition: "backpain",
        timestamp: date.getTime(),
      })
    }
    
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(sampleSessions))
    window.dispatchEvent(new CustomEvent("sampleDataAdded"))
  }
}

// Export singleton instance
export const practiceTracker = new PracticeTracker() 