"use client"

import { useState } from "react"
import { Settings, Save, AlertCircle } from "lucide-react"

interface ChatbotConfigProps {
  onConfigSave: (apiKey: string, apiUrl: string) => void
}

export default function ChatbotConfig({ onConfigSave }: ChatbotConfigProps) {
  const [apiKey, setApiKey] = useState("")
  const [apiUrl, setApiUrl] = useState("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent")
  const [isOpen, setIsOpen] = useState(false)
  const [showAlert, setShowAlert] = useState(false)

  const handleSave = () => {
    if (!apiKey.trim()) {
      setShowAlert(true)
      setTimeout(() => setShowAlert(false), 3000)
      return
    }
    
    onConfigSave(apiKey, apiUrl)
    setIsOpen(false)
    setShowAlert(false)
  }

  return (
    <>
      {/* Config Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 w-12 h-12 bg-gray-600 hover:bg-gray-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50 flex items-center justify-center"
        aria-label="Configure chatbot"
      >
        <Settings className="w-5 h-5" />
      </button>

      {/* Config Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Chatbot Configuration</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Settings size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {showAlert && (
                <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  <span className="text-sm text-red-700">API Key is required</span>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  API Key
                </label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter your API key"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00DF82] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  API URL
                </label>
                <input
                  type="text"
                  value={apiUrl}
                  onChange={(e) => setApiUrl(e.target.value)}
                  placeholder="API endpoint URL"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00DF82] focus:border-transparent"
                />
              </div>

              <div className="text-xs text-gray-500">
                <p>• Get your API key from Google AI Studio</p>
                <p>• Default URL is for Gemini Pro model</p>
                <p>• Your API key is stored locally in your browser</p>
              </div>
            </div>

            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-[#00DF82] hover:bg-[#03624C] text-white rounded-lg transition-colors flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Save</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
