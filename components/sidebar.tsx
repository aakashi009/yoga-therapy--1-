"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

const healthConditions = [
  { id: "backpain", name: "Back Pain" },
  { id: "diabetes", name: "Digestion" },
  { id: "anxiety", name: "Hypotension and Hypertension" },
  { id: "insomnia", name: "Meditative asana" },
  { id: "digestion", name: "Slipped Disc" },
  { id: "hypertension", name: "Shoulder Problem" },
  { id: "arthritis", name: "Kidneys Problem" },
  { id: "respiratory", name: "Respiratory Problems" },
  { id: "migraine", name: "Knee and Ankle problem" },
  { id: "obesity", name: "Blood Circulation" },
  { id: "bladder", name: "Yoga for Athlete" },
  { id: "menstrual", name: "Menstrual Pain" },
]

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCondition, setSelectedCondition] = useState<string | null>(null)

  const handleConditionClick = (conditionId: string) => {
    setSelectedCondition(conditionId)
    // Dispatch custom event to notify YogaContent component
    const event = new CustomEvent("conditionSelected", {
      detail: { conditionId },
    })
    document.dispatchEvent(event)

    // Close sidebar on mobile after selection
    if (window.innerWidth < 768) {
      setIsOpen(false)
    }
  }

  return (
    <>
      {/* Mobile toggle */}
      <div className="md:hidden w-full mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between bg-[#03624C] text-white p-4 rounded-lg shadow hover:bg-[#00DF82] hover:text-[#030F0F] transition-colors"
        >
          <span className="font-medium">Health Conditions</span>
          <ChevronDown className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </button>
      </div>

      {/* Sidebar content - always visible on desktop, toggleable on mobile */}
      <div className={`${isOpen ? "block" : "hidden"} md:block md:w-1/4 min-w-[250px] md:h-full`}>
        <div className="bg-white rounded-lg shadow p-4 h-full flex flex-col border border-[#03624C]/20">
          <h2 className="text-xl font-semibold mb-4 text-[#030F0F] hidden md:block">Health Conditions</h2>

          {/* Scrollable container for health conditions */}
          <div className="flex-grow overflow-y-auto max-h-[400px] md:max-h-[500px] pr-2">
            <ul className="space-y-2">
              {healthConditions.map((condition) => (
                <li key={condition.id}>
                  <button
                    onClick={() => handleConditionClick(condition.id)}
                    className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                      selectedCondition === condition.id
                        ? "bg-[#00DF82] text-[#030F0F] font-medium"
                        : "hover:bg-[#03624C] hover:text-white"
                    }`}
                  >
                    {condition.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Custom scrollbar styling */}
          <style jsx>{`
            .overflow-y-auto::-webkit-scrollbar {
              width: 6px;
            }
            .overflow-y-auto::-webkit-scrollbar-track {
              background: #f1f1f1;
              border-radius: 3px;
            }
            .overflow-y-auto::-webkit-scrollbar-thumb {
              background: #03624C;
              border-radius: 3px;
            }
            .overflow-y-auto::-webkit-scrollbar-thumb:hover {
              background: #00DF82;
            }
          `}</style>
        </div>
      </div>
    </>
  )
}
