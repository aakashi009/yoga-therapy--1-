// "use client"

// import { useState, useEffect } from "react"
// import { getFirestore, collection, query, where, onSnapshot, orderBy } from "firebase/firestore"
// import { useAuthState } from "react-firebase-hooks/auth"
// import { auth } from "@/lib/firebase"
// import { app } from "@/lib/firebase"
// // --- CORRECTED IMPORT PATHS ---
// import Header from "@/components/ui/header"
// import Footer from "@/components/ui/footer"
// import { MessageSquare, ShieldCheck } from "lucide-react"

// // Initialize Firestore
// const db = getFirestore(app);

// // Define a type for our inquiry documents for better code safety
// type Inquiry = {
//   id: string;
//   subject: string;
//   message: string;
//   reply: string;
//   status: string;
//   createdAt: {
//     seconds: number;
//     nanoseconds: number;
//   };
// };

// export default function NotificationsPage() {
//   const [user, loading] = useAuthState(auth);
//   const [inquiries, setInquiries] = useState<Inquiry[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     if (user) {
//       // Create a query to get inquiries for the current user, ordered by creation date
//       const inquiriesRef = collection(db, "inquiries");
//       const q = query(
//         inquiriesRef, 
//         where("userId", "==", user.uid),
//         orderBy("createdAt", "desc")
//       );

//       // Use onSnapshot for real-time updates
//       const unsubscribe = onSnapshot(q, (querySnapshot) => {
//         const userInquiries = querySnapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data()
//         } as Inquiry));
//         setInquiries(userInquiries);
//         setIsLoading(false);
//       });

//       // Cleanup subscription on component unmount
//       return () => unsubscribe();
//     } else if (!loading) {
//       // If user is not logged in and auth state is loaded
//       setIsLoading(false);
//     }
//   }, [user, loading]);

//   return (
//     <main className="min-h-screen bg-[#0d1a1a] text-gray-200">
//       <Header />
//       <div className="container mx-auto px-4 py-12">
//         <div className="max-w-4xl mx-auto">
//           <h1 className="text-4xl font-bold text-white mb-8 text-center">Notifications</h1>

//           {loading || isLoading ? (
//             <p className="text-center">Loading your messages...</p>
//           ) : !user ? (
//             <p className="text-center text-red-400">Please log in to see your notifications.</p>
//           ) : inquiries.length === 0 ? (
//             <p className="text-center text-gray-400">You have no messages yet.</p>
//           ) : (
//             <div className="space-y-6">
//               {inquiries.map((inquiry) => (
//                 <div key={inquiry.id} className="bg-teal-950/50 border border-teal-700 rounded-lg p-6">
//                   <h2 className="text-xl font-semibold text-teal-300 mb-2">{inquiry.subject}</h2>
                  
//                   {/* User's Message */}
//                   <div className="mb-4">
//                     <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
//                       <MessageSquare size={16} />
//                       <span>Your Message</span>
//                       <span className="text-xs">
//                         (Sent on: {new Date(inquiry.createdAt.seconds * 1000).toLocaleDateString()})
//                       </span>
//                     </div>
//                     <p className="bg-gray-800 p-4 rounded-md">{inquiry.message}</p>
//                   </div>

//                   {/* Admin's Reply */}
//                   {inquiry.reply && (
//                     <div>
//                        <div className="flex items-center gap-2 text-teal-400 text-sm mb-2">
//                          <ShieldCheck size={16} />
//                          <span>Admin Reply</span>
//                        </div>
//                        <p className="bg-teal-900 p-4 rounded-md border border-teal-800">{inquiry.reply}</p>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//       <Footer />
//     </main>
//   );
// }
