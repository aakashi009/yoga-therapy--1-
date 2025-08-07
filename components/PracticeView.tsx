// "use client";

// import { useState, useEffect } from "react";
// import Image from "next/image";
// import { ChevronLeft, Clock } from "lucide-react";

// const PracticeView = ({ pose, onBack }) => {
//   const [timerRunning, setTimerRunning] = useState(false);
//   const [time, setTime] = useState(0);
//   const [initialTime, setInitialTime] = useState(0); // For user-set timer

//   useEffect(() => {
//     let interval;
//     if (timerRunning) {
//       interval = setInterval(() => {
//         setTime((prevTime) => {
//           if (prevTime <= 1) {
//             clearInterval(interval);
//             setTimerRunning(false);
//             return 0;
//           }
//           return prevTime - 1;
//         });
//       }, 1000);
//     }
//     return () => clearInterval(interval);
//   }, [timerRunning]);

//   const handleStartStop = () => {
//     if (time > 0) {
//       setTimerRunning(!timerRunning);
//     }
//   };

//   const handleSetTimer = (minutes, seconds) => {
//     const newTime = minutes * 60 + seconds;
//     setTime(newTime);
//     setInitialTime(newTime);
//     setTimerRunning(false);
//   };

//   const formatTime = (totalSeconds) => {
//     const minutes = Math.floor(totalSeconds / 60);
//     const seconds = totalSeconds % 60;
//     return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
//   };

//   return (
//     <div className="bg-white rounded-lg shadow p-6 border border-[#03624C]/20">
//       <div className="flex items-center justify-between mb-6">
//         <button
//           onClick={onBack}
//           className="flex items-center text-[#03624C] hover:text-[#00DF82] transition-colors"
//         >
//           <ChevronLeft className="w-5 h-5 mr-1" /> Back
//         </button>
//         <h2 className="text-2xl font-bold text-[#030F0F]">Practicing {pose.name}</h2>
//         <div></div> {/* Placeholder for alignment */}
//       </div>

//       <div className="flex flex-col md:flex-row items-center gap-8 p-4 bg-gray-50 rounded-lg border">
//         {/* Asana Image */}
//         <div className="relative h-48 w-48 md:h-64 md:w-64 rounded-lg overflow-hidden border-2 border-[#00DF82]/20 shrink-0">
//           <Image
//             src={pose.imageUrl || "/placeholder.svg"}
//             alt={pose.name}
//             layout="fill"
//             objectFit="cover"
//             className="rounded-lg"
//           />
//         </div>

//         {/* Stopwatch Section */}
//         <div className="flex-1 flex flex-col items-center">
//           <div className="text-6xl md:text-8xl font-mono font-bold text-[#030F0F] mb-4">
//             {formatTime(time)}
//           </div>
//           <div className="flex gap-4 mb-4">
//             <button
//               onClick={handleStartStop}
//               className={`px-6 py-2 rounded-lg font-semibold text-white transition-colors ${
//                 timerRunning ? "bg-red-500 hover:bg-red-600" : "bg-[#00DF82] hover:bg-[#03624C]"
//               } disabled:bg-gray-400 disabled:cursor-not-allowed`}
//               disabled={time === 0}
//             >
//               {timerRunning ? "Stop" : "Start"}
//             </button>
//             <button
//               onClick={() => {
//                 setTimerRunning(false);
//                 setTime(0);
//               }}
//               className="px-6 py-2 rounded-lg font-semibold bg-gray-500 text-white hover:bg-gray-600 transition-colors"
//             >
//               Reset
//             </button>
//           </div>
//           <div className="mt-4 w-full max-w-sm">
//             <p className="text-sm font-medium text-gray-700 mb-2 text-center">Set Timer (Minutes:Seconds)</p>
//             <div className="flex gap-2 items-center justify-center">
//               <input
//                 type="number"
//                 min="0"
//                 max="59"
//                 value={Math.floor(initialTime / 60)}
//                 onChange={(e) => handleSetTimer(parseInt(e.target.value) || 0, initialTime % 60)}
//                 className="w-16 p-2 text-center border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00DF82]"
//               />
//               <span className="font-bold">:</span>
//               <input
//                 type="number"
//                 min="0"
//                 max="59"
//                 value={initialTime % 60}
//                 onChange={(e) => handleSetTimer(Math.floor(initialTime / 60), parseInt(e.target.value) || 0)}
//                 className="w-16 p-2 text-center border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00DF82]"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PracticeView;