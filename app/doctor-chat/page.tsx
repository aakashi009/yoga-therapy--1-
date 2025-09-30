"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Phone, Video, MessageCircle, Clock, User, Shield, Heart } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import MessageBubble from "@/components/chat/MessageBubble"
import TypingIndicator from "@/components/chat/TypingIndicator"
import DoctorCard from "@/components/chat/DoctorCard"
import { Message, Doctor } from "@/types/chat"

export default function DoctorChat() {
  const doctors: Doctor[] = [
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      specialization: "Yoga Therapy & Rehabilitation",
      experience: "8 years",
      rating: 4.9,
      isOnline: true,
      avatar: "/placeholder-user.jpg"
    },
    {
      id: "2", 
      name: "Dr. Michael Chen",
      specialization: "Sports Medicine & Yoga",
      experience: "12 years",
      rating: 4.8,
      isOnline: true,
      avatar: "/placeholder-user.jpg"
    },
    {
      id: "3",
      name: "Dr. Priya Sharma",
      specialization: "Holistic Health & Yoga",
      experience: "10 years", 
      rating: 4.9,
      isOnline: false,
      avatar: "/placeholder-user.jpg"
    }
  ]

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm Dr. Sarah Johnson, your yoga therapy specialist. How can I help you today?",
      sender: "doctor",
      timestamp: new Date(),
    },
  ])
  
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(doctors[0]) // Auto-select first doctor

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setNewMessage("")
    setIsTyping(true)

    // Simulate doctor response
    setTimeout(() => {
      const doctorResponses = [
        "I understand your concern. Based on your symptoms, I recommend starting with gentle yoga poses that focus on your specific condition.",
        "That's a great question! For your condition, I suggest incorporating breathing exercises along with the yoga poses I'll recommend.",
        "I can help you with that. Let me suggest some specific yoga sequences that are safe and effective for your situation.",
        "Based on what you've described, I recommend a gradual approach. We'll start with basic poses and progress as your body adapts.",
        "Your health is my priority. I'll provide you with a personalized yoga therapy plan that addresses your specific needs."
      ]
      
      const randomResponse = doctorResponses[Math.floor(Math.random() * doctorResponses.length)]
      
      const doctorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        sender: "doctor", 
        timestamp: new Date(),
      }
      
      setMessages(prev => [...prev, doctorMessage])
      setIsTyping(false)
    }, 2000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Chat with Doctor</h1>
                <p className="text-gray-600">Get personalized health advice from certified yoga therapy specialists</p>
              </div>
              <div className="flex space-x-3">
                <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  <Phone size={18} className="mr-2" />
                  Voice Call
                </button>
                <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Video size={18} className="mr-2" />
                  Video Call
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Doctor Selection Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Doctors</h3>
                <div className="space-y-3">
                  {doctors.map((doctor) => (
                    <DoctorCard
                      key={doctor.id}
                      doctor={doctor}
                      isSelected={selectedDoctor?.id === doctor.id}
                      onSelect={setSelectedDoctor}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Chat Interface */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow-sm flex flex-col h-[600px]">
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <img
                        src={selectedDoctor?.avatar || "/placeholder-user.jpg"}
                        alt="Doctor"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                        selectedDoctor?.isOnline ? "bg-green-500" : "bg-gray-400"
                      }`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {selectedDoctor?.name || "Select a Doctor"}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {selectedDoctor?.specialization || "Choose from available doctors"}
                      </p>
                    </div>
                    <div className="ml-auto flex items-center space-x-2">
                      <div className="flex items-center text-sm text-gray-500">
                        <Shield size={16} className="mr-1" />
                        <span>Secure</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Heart size={16} className="mr-1" />
                        <span>HIPAA Compliant</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4">
                  {messages.map((message) => (
                    <MessageBubble key={message.id} message={message} />
                  ))}
                  
                  {isTyping && <TypingIndicator />}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-200">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message here..."
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00DF82] focus:border-transparent"
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      className="px-4 py-2 bg-[#00DF82] text-white rounded-lg hover:bg-[#03624C] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    >
                      <Send size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Health Tips Section */}
          <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Health Tips from Our Doctors</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center mb-2">
                  <Heart size={20} className="text-green-600 mr-2" />
                  <h4 className="font-medium text-green-800">Daily Practice</h4>
                </div>
                <p className="text-sm text-green-700">
                  Consistency is key. Even 15 minutes of daily yoga can significantly improve your health.
                </p>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center mb-2">
                  <Clock size={20} className="text-blue-600 mr-2" />
                  <h4 className="font-medium text-blue-800">Best Timing</h4>
                </div>
                <p className="text-sm text-blue-700">
                  Practice yoga in the morning for energy or evening for relaxation, based on your needs.
                </p>
              </div>
              
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <div className="flex items-center mb-2">
                  <Shield size={20} className="text-purple-600 mr-2" />
                  <h4 className="font-medium text-purple-800">Safety First</h4>
                </div>
                <p className="text-sm text-purple-700">
                  Always listen to your body and consult with healthcare providers for serious conditions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}
