"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, User, Bell, MessageCircle } from "lucide-react"
import Dashboard from "./dashboard"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)

  // Sample notifications data with state management
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "health_update",
      title: "New Yoga Poses for Back Pain",
      message: "We've added 3 new effective poses for your back pain relief routine.",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      type: "daily_tip",
      title: "Daily Yoga Tip",
      message: "Remember to practice deep breathing during your morning routine for better results.",
      time: "1 day ago",
      read: false,
    },
    {
      id: 3,
      type: "reminder",
      title: "Practice Reminder",
      message: "It's time for your evening relaxation yoga session!",
      time: "2 days ago",
      read: true,
    },
    {
      id: 4,
      type: "health_update",
      title: "Diabetes Management Update",
      message: "New research shows these 5 poses can help regulate blood sugar levels.",
      time: "3 days ago",
      read: true,
    },
  ])

  const unreadCount = notifications.filter((n) => !n.read).length

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications)
  }

  // Function to mark a single notification as read
  const markAsRead = (notificationId: number) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === notificationId ? { ...notification, read: true } : notification)),
    )
  }

  // Function to mark all notifications as read
  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  return (
    <header className="bg-[#030F0F] text-white shadow-md relative">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-[#00DF82]">
              CureThruYoga
            </Link>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="hover:text-[#00DF82] transition-colors">
              Home
            </Link>
            <Link href="/contact" className="hover:text-[#00DF82] transition-colors">
              Contact Us
            </Link>
            <Link href="/doctor-chat" className="flex items-center hover:text-[#00DF82] transition-colors">
              <MessageCircle size={18} className="mr-1" />
              <span>Chat with Doctor</span>
            </Link>

            {/* Dashboard */}
            <Dashboard />

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={handleNotificationClick}
                className="flex items-center hover:text-[#00DF82] transition-colors relative"
              >
                <Bell size={18} className="mr-1" />
                <span>Notifications</span>
                {unreadCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#00DF82] text-[#030F0F] text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white text-gray-800 rounded-lg shadow-lg border z-50">
                  <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="font-semibold text-lg">Notifications</h3>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllAsRead}
                        className="text-sm text-[#00DF82] hover:text-[#03624C] font-medium"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-gray-500">No notifications yet</div>
                    ) : (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                            !notification.read ? "bg-green-50" : ""
                          }`}
                          onClick={() => markAsRead(notification.id)}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium text-sm mb-1">{notification.title}</h4>
                              <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                              <span className="text-xs text-gray-400">{notification.time}</span>
                            </div>
                            {!notification.read && <div className="w-2 h-2 bg-[#00DF82] rounded-full ml-2 mt-1"></div>}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="p-3 border-t border-gray-200 text-center">
                    <button className="text-[#00DF82] hover:text-[#03624C] text-sm font-medium">
                      View All Notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            <Link href="/account" className="flex items-center hover:text-[#00DF82] transition-colors">
              <User size={18} className="mr-1" />
              <span>My Account</span>
            </Link>
          </nav>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col space-y-4">
            <Link href="/" className="hover:text-[#00DF82] transition-colors">
              Home
            </Link>
            <Link href="/contact" className="hover:text-[#00DF82] transition-colors">
              Contact Us
            </Link>
            <Link href="/doctor-chat" className="flex items-center hover:text-[#00DF82] transition-colors">
              <MessageCircle size={18} className="mr-1" />
              <span>Chat with Doctor</span>
            </Link>
            <div className="flex items-center hover:text-[#00DF82] transition-colors">
              <Dashboard />
            </div>
            <button
              onClick={handleNotificationClick}
              className="flex items-center hover:text-[#00DF82] transition-colors text-left"
            >
              <Bell size={18} className="mr-1" />
              <span>Notifications</span>
              {unreadCount > 0 && (
                <span className="ml-2 bg-[#00DF82] text-[#030F0F] text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {unreadCount}
                </span>
              )}
            </button>
            <Link href="/account" className="flex items-center hover:text-[#00DF82] transition-colors">
              <User size={18} className="mr-1" />
              <span>Account</span>
            </Link>
          </nav>
        )}
      </div>

      {/* Mobile Notifications Dropdown */}
      {showNotifications && isMenuOpen && (
        <div className="md:hidden bg-white text-gray-800 border-t border-[#00DF82]">
          <div className="p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-lg">Notifications</h3>
              {unreadCount > 0 && (
                <button onClick={markAllAsRead} className="text-sm text-[#00DF82] hover:text-[#03624C] font-medium">
                  Mark all as read
                </button>
              )}
            </div>
            {notifications.length === 0 ? (
              <div className="text-center text-gray-500 py-4">No notifications yet</div>
            ) : (
              <div className="space-y-3">
                {notifications.slice(0, 3).map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      !notification.read ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm mb-1">{notification.title}</h4>
                        <p className="text-sm text-gray-600 mb-1">{notification.message}</p>
                        <span className="text-xs text-gray-400">{notification.time}</span>
                      </div>
                      {!notification.read && <div className="w-2 h-2 bg-[#00DF82] rounded-full ml-2 mt-1"></div>}
                    </div>
                  </div>
                ))}
                <button className="w-full text-[#00DF82] hover:text-[#03624C] text-sm font-medium py-2">
                  View All Notifications
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
