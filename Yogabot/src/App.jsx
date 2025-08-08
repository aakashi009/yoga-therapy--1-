import React, {useState} from 'react';
import Header from "./components/Header";
import CMessage from "./components/CMessage";
import {formatTime, getRandomResponse} from "../utils/chatUtils";
import LoadingIndicatior from './components/LoadingIndicator';
import ChInput from './components/ChInput';
import {sendMessageToApi} from "./Services/Api"

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setinput] = useState("")
  const [messages,setmessages] = useState([
    {
      id:1,
      text:"Hi, how can I help you?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleSendMessage = ()=>{
    const userMessage = {
      id: Date.now().toString(),
      text: input, sender: "user",
      timestamp: new Date(),
    };
    setmessages((prev)=> [...prev, userMessage]);
    setinput("");
    setIsLoading(true);

    setTimeout(()=>{
      const botMessage = {
        id: (Date.now() +1).toString(),
        text: sendMessageToApi(input),
        sender: "bot",
        timestamp: new Date(),
      }
      setmessages((prev)=> [...prev, botMessage]);
      setIsLoading(false);   
    }, 1500);
  };
return (
  <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800 transition-all duration-500">
    
    <div className="w-full max-w-md h-[600px] flex flex-col backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl overflow-hidden bg-white/80 dark:bg-gray-800/80 transition-all duration-500">
      
      
      <div className="sticky top-0 z-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
      </div>

      
      <div className="flex-1 overflow-y-auto px-4 py-3 custom-scrollbar space-y-4">
        {messages.map((message) => (
          <CMessage
            key={message.id}
            darkMode={darkMode}
            messages={message}
            formatTime={formatTime}
          />
        ))}

        
        {isLoading && (
          <div className="flex justify-center mt-4 animate-pulse">
            <LoadingIndicatior darkMode={darkMode} />
          </div>
        )}
      </div>

      
      <div className="sticky bottom-0 z-20 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700 shadow-inner px-2 py-2">
        <ChInput
          darkMode={darkMode}
          input={input}
          setinput={setinput}
          loading={isLoading}
          handleSendMessage={handleSendMessage}
        />
      </div>
    </div>
  </div>
);
}
export default App