import React from "react";
import { Send } from "lucide-react";
function ChInput({darkMode, input, setinput,loading, handleSendMessage}) {
    return <div className={`${darkMode ? "bg-gray-800 border-t border-gray-700" : "bg-white border-t border-gray-200"} p-4`}>

        <div className="max-w-5xl mx-auto">
            <div className="flex items-center space-x-3">

                <input 
                type="text" 
                value={input}
                onChange={(e) => setinput(e.target.value)}
                onKeyDown={(e)=> {
                    if(e.key === "Enter" && !e.shiftKey){
                        e.preventDefault();
                        handleSendMessage();
                    }
                }}
                placeholder="Type you message" 
                className={`flex-1 border ${
                    darkMode ? "bg-gray-600 border-gray-500 text-white placeholder-gray-300" : "bg-white border-gray-300 text0gray-900" } rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}/>
                    
                    <button className="p-3 rounded-full transition-colors shadow-md cursor-pointer"
                    onClick={handleSendMessage}
                    disabled={loading || !input.trim()}
                    >    
                        <Send className={`${darkMode ? "text-white" : "text-gray-800"}`} />
                        </button>

            </div>
        </div>
    </div>
}
export default ChInput;