'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/lib/firebase'
import Link from 'next/link'

interface Patient {
  id: string
  name: string
  condition: string
  lastMessage?: string
}

export default function DoctorDashboardPage() {
  const router = useRouter()
  const [user, loading] = useAuthState(auth)
  const [patients, setPatients] = useState<Patient[]>([])

  useEffect(() => {
    if (!loading && !user) {
      router.push('/index.html')
    }
  }, [user, loading, router])

  useEffect(() => {
    // Placeholder data for patients; replace with real data source later
    const demoPatients: Patient[] = [
      { id: 'p1', name: 'Aarav Sharma', condition: 'Back Pain', lastMessage: 'Experiencing stiffness in mornings.' },
      { id: 'p2', name: 'Ananya Gupta', condition: 'Hypertension', lastMessage: 'Looking for breathing exercises.' },
      { id: 'p3', name: 'Rahul Verma', condition: 'Digestion', lastMessage: 'Post-meal bloating persists.' },
    ]
    setPatients(demoPatients)
  }, [])

  const handleLogout = async () => {
    const response = await fetch('/api/auth/session-logout', { method: 'POST' })
    if (response.ok) {
      router.push('/index.html')
    }
  }

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-gray-700">Loading doctor dashboard...</div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="bg-[#030F0F] text-white shadow">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-semibold text-[#00DF82]">CureThruYoga</Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-200">Signed in as {user?.email}</span>
            <button onClick={handleLogout} className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white text-sm">Logout</button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#030F0F]">Doctor Dashboard</h1>
          <p className="text-gray-600 mt-1">Review patients, open chats, and manage sessions.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <section className="lg:col-span-2 bg-white rounded-lg border border-slate-200 shadow-sm">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
              <h2 className="font-semibold text-[#030F0F]">Patients</h2>
              <input
                type="text"
                placeholder="Search patients..."
                className="w-56 px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-[#00DF82]"
              />
            </div>
            <ul className="divide-y">
              {patients.map((p) => (
                <li key={p.id} className="p-4 flex items-center justify-between hover:bg-slate-50">
                  <div>
                    <div className="font-medium text-[#030F0F]">{p.name}</div>
                    <div className="text-sm text-gray-600">{p.condition}</div>
                    {p.lastMessage && (
                      <div className="text-xs text-gray-500 mt-1 truncate max-w-md">Last: {p.lastMessage}</div>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <Link
                      href="/doctor-chat"
                      className="px-3 py-2 rounded bg-[#00DF82] text-[#030F0F] text-sm font-medium hover:bg-[#03624C] hover:text-white"
                    >
                      Open Chat
                    </Link>
                    <button className="px-3 py-2 rounded border text-sm hover:bg-slate-100">View Details</button>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <aside className="bg-white rounded-lg border border-slate-200 shadow-sm p-4 h-fit">
            <h3 className="font-semibold text-[#030F0F] mb-3">Today</h3>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-center justify-between">
                <span>Scheduled Consultations</span>
                <span className="px-2 py-0.5 rounded bg-slate-100">3</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Pending Follow-ups</span>
                <span className="px-2 py-0.5 rounded bg-slate-100">2</span>
              </li>
              <li className="flex items-center justify-between">
                <span>New Messages</span>
                <span className="px-2 py-0.5 rounded bg-slate-100">5</span>
              </li>
            </ul>
            <div className="mt-4">
              <Link href="/doctor-chat" className="inline-block px-4 py-2 rounded bg-teal-600 text-white text-sm hover:bg-teal-700">Go to Chat</Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
} 