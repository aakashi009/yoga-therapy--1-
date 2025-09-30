export interface Message {
  id: string
  text: string
  sender: "user" | "doctor"
  timestamp: Date
  type?: "text" | "image" | "file"
}

export interface Doctor {
  id: string
  name: string
  specialization: string
  experience: string
  rating: number
  isOnline: boolean
  avatar: string
}

export interface ChatSession {
  id: string
  doctorId: string
  startTime: Date
  endTime?: Date
  messages: Message[]
  isActive: boolean
}
