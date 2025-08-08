"use client"

import { useState, useEffect } from "react"
import { MessageCircle, X, Send, Bot, User } from "lucide-react"
import ChatbotConfig from "./chatbot-config"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! I'm your Yoga AI Assistant. How can I help you with your yoga practice today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [apiKey, setApiKey] = useState("")
  const [apiUrl, setApiUrl] = useState("")

  // Load configuration from localStorage on component mount
  useEffect(() => {
    const savedApiKey = localStorage.getItem("yoga_chatbot_api_key")
    const savedApiUrl = localStorage.getItem("yoga_chatbot_api_url")
    
    if (savedApiKey) setApiKey(savedApiKey)
    if (savedApiUrl) setApiUrl(savedApiUrl)
  }, [])

  // Fallback responses when API is not configured
  const getFallbackResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()
    
    // Common yoga questions and responses
    if (lowerMessage.includes("sun salutation") || lowerMessage.includes("surya namaskar")) {
      return "Sun Salutation (Surya Namaskar) is a sequence of 12 powerful yoga poses that flow together. It's excellent for warming up, improving flexibility, and building strength. Each pose flows into the next with your breath. Would you like me to guide you through the sequence?"
    }
    
    if (lowerMessage.includes("downward dog") || lowerMessage.includes("adho mukha")) {
      return "Downward Dog (Adho Mukha Svanasana) is a foundational pose. Start on hands and knees, lift your hips up and back, forming an inverted V shape. Keep your heels reaching toward the floor, lengthen your spine, and press through your hands. This pose strengthens arms and legs while stretching the back."
    }
    
    if (lowerMessage.includes("meditation") || lowerMessage.includes("meditate")) {
      return "Meditation is a wonderful complement to yoga. Start with just 5-10 minutes daily. Sit comfortably, close your eyes, and focus on your breath. When your mind wanders, gently return to your breath. You can also try guided meditation apps or focus on a mantra like 'Om'."
    }
    
    if (lowerMessage.includes("back pain") || lowerMessage.includes("back")) {
      return "For back pain, gentle yoga poses can help. Try Cat-Cow stretches, Child's Pose, and gentle spinal twists. Always listen to your body and avoid any poses that cause pain. Consider consulting with a yoga therapist for personalized guidance."
    }
    
    if (lowerMessage.includes("beginner") || lowerMessage.includes("start")) {
      return "Welcome to yoga! Start with basic poses like Mountain Pose, Child's Pose, and gentle stretches. Practice regularly, even if just 10 minutes daily. Focus on your breath and don't worry about perfect form - yoga is a journey, not a destination."
    }
    
    if (lowerMessage.includes("breathing") || lowerMessage.includes("pranayama")) {
      return "Breathing is the foundation of yoga. Try deep belly breathing: inhale through your nose, expanding your belly, then exhale slowly. You can also practice alternate nostril breathing (Nadi Shodhana) for balance and calm."
    }
    
    if (lowerMessage.includes("stress") || lowerMessage.includes("anxiety")) {
      return "Yoga is excellent for stress relief. Try gentle poses like Child's Pose, Legs-Up-the-Wall, or Savasana (Corpse Pose). Combine with deep breathing exercises. Even 10 minutes of mindful movement can significantly reduce stress levels."
    }
    
    if (lowerMessage.includes("flexibility") || lowerMessage.includes("stretch")) {
      return "Flexibility develops gradually with consistent practice. Focus on proper alignment rather than how far you can stretch. Gentle poses like Forward Fold, Butterfly Pose, and gentle twists will help improve flexibility over time."
    }
    
    // Default response
    return "I'm here to help with your yoga practice! I can assist with pose guidance, meditation tips, breathing techniques, and general wellness advice. What specific aspect of yoga would you like to learn about? You can also click the settings button (⚙️) to configure AI responses for more detailed answers."
  }

  const sendMessageToApi = async (message: string): Promise<string> => {
    if (!apiKey || !apiUrl) {
      return getFallbackResponse(message)
    }

    try {
      const response = await fetch(`${apiUrl}?key=${apiKey}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are a helpful yoga AI assistant. You help users with yoga-related questions, pose guidance, meditation tips, and wellness advice. Be encouraging, knowledgeable, and supportive. Here's the user's question: ${message}`,
                },
              ],
            },
          ],
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.log("Error from API Response:", errorText)
        return getFallbackResponse(message)
      }

      const data = await response.json()
      if (!data || !data.candidates || data.candidates.length === 0) {
        return getFallbackResponse(message)
      }

      return data.candidates[0].content.parts[0].text
    } catch (error) {
      console.error("Error generating content:", error)
      return getFallbackResponse(message)
    }
  }

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const botResponse = await sendMessageToApi(input)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getFallbackResponse(input),
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleConfigSave = (newApiKey: string, newApiUrl: string) => {
    setApiKey(newApiKey)
    setApiUrl(newApiUrl)
    localStorage.setItem("yoga_chatbot_api_key", newApiKey)
    localStorage.setItem("yoga_chatbot_api_url", newApiUrl)
  }

  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#00DF82] hover:bg-[#03624C] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50 flex items-center justify-center group"
        aria-label="Open chat"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </button>

      {/* Chat Interface */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-lg shadow-2xl border border-gray-200 z-50 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-[#00DF82]/10 to-[#03624C]/10">
            <div className="flex items-center space-x-2">
              <Bot className="w-5 h-5 text-[#00DF82]" />
              <h3 className="font-semibold text-gray-800">Yoga AI Assistant</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`flex max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.sender === "user"
                      ? "bg-gradient-to-r from-[#00DF82] to-[#03624C] text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <div className="flex-shrink-0 mr-3">
                    {message.sender === "user" ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Bot className="h-4 w-4" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="mb-1 flex justify-between items-center">
                      <span className="font-medium text-xs">
                        {message.sender === "user" ? "You" : "Yoga AI"}
                      </span>
                      <span className="text-xs opacity-70 ml-2">
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm whitespace-pre-wrap break-words leading-relaxed">
                      {message.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-2xl px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    </div>
                    <span className="text-sm text-gray-600">Typing...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00DF82] focus:border-transparent"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !input.trim()}
                className="p-2 bg-[#00DF82] hover:bg-[#03624C] text-white rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Configuration Component */}
      <ChatbotConfig onConfigSave={handleConfigSave} />
    </>
  )
}
