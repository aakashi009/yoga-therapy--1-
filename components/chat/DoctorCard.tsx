"use client"

import { Doctor } from "@/types/chat"

interface DoctorCardProps {
  doctor: Doctor
  isSelected: boolean
  onSelect: (doctor: Doctor) => void
}

export default function DoctorCard({ doctor, isSelected, onSelect }: DoctorCardProps) {
  return (
    <div
      className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
        isSelected
          ? "border-[#00DF82] bg-green-50 shadow-md"
          : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
      }`}
      onClick={() => onSelect(doctor)}
    >
      <div className="flex items-center space-x-3">
        <div className="relative">
          <img
            src={doctor.avatar}
            alt={doctor.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
            doctor.isOnline ? "bg-green-500" : "bg-gray-400"
          }`} />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 text-sm">{doctor.name}</h4>
          <p className="text-xs text-gray-600 mb-1">{doctor.specialization}</p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">{doctor.experience}</span>
            <div className="flex items-center">
              <span className="text-xs text-yellow-500">★ {doctor.rating}</span>
            </div>
          </div>
          <div className="mt-1">
            <span className={`text-xs px-2 py-1 rounded-full ${
              doctor.isOnline 
                ? "bg-green-100 text-green-800" 
                : "bg-gray-100 text-gray-600"
            }`}>
              {doctor.isOnline ? "Online" : "Offline"}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
