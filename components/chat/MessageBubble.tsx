"use client"

import { Message } from "@/types/chat"

interface MessageBubbleProps {
  message: Message
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.sender === "user"
  
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
          isUser
            ? "bg-[#00DF82] text-white rounded-br-md"
            : "bg-gray-100 text-gray-900 rounded-bl-md"
        }`}
      >
        <p className="text-sm leading-relaxed">{message.text}</p>
        <p className={`text-xs mt-2 ${
          isUser ? "text-green-100" : "text-gray-500"
        }`}>
          {message.timestamp.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </p>
      </div>
    </div>
  )
}
