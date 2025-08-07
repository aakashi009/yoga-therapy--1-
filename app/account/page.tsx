// app/account/page.tsx

'use client';

import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase'; // Make sure you have this client-side config file
import { useEffect } from 'react'; // <-- ADDED THIS IMPORT

// You can uncomment these if you have Header and Footer components
// import Header from '@/components/ui/header'; 
// import Footer from '@/components/ui/footer';

export default function AccountPage() {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);

  // This hook handles the redirect logic
  useEffect(() => {
    // If authentication is done loading and there's still no user,
    // redirect them to the login page.
    if (!loading && !user) {
      router.push('/index.html');
    }
  }, [user, loading, router]); // Dependencies for the effect

  const handleLogout = async () => {
    const response = await fetch('/api/auth/session-logout', {
      method: 'POST',
    });

    if (response.ok) {
      // Redirect to the login page after successful logout
      router.push('/index.html');
    } else {
      alert('Logout failed. Please try again.');
    }
  };

  // While loading, or if there is no user (before redirect happens),
  // show a loading screen. This prevents the "No user" text from flashing.
  if (loading || !user) {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900">
            <p className="text-white text-lg">Loading account details...</p>
        </div>
    );
  }

  // If the code reaches this point, the user is authenticated.
  return (
    <div className="flex flex-col min-h-screen bg-[#0d1a1a]">
      {/* <Header /> */}
      
      <main className="flex-grow container mx-auto p-8 text-gray-200">
        <h1 className="text-4xl font-bold mb-8 text-center text-white">My Account</h1>
        
        {/* We know the user exists here, so we can render the account details directly */}
        <div className="max-w-2xl mx-auto bg-teal-950/50 border border-teal-700 p-8 rounded-xl shadow-lg">
          <p className="text-xl text-center mb-6">Welcome back!</p>
          
          <div className="text-lg space-y-4">
              <p>
                <strong className="text-teal-400 font-medium">Email:</strong> {user.email}
              </p>
              {/* <p>
                <strong className="text-teal-400 font-medium">User ID:</strong> <span className="text-sm font-mono">{user.uid}</span>
              </p> */}
          </div>
          
          {/* Logout Button styled with the theme's green color */}
          <button 
            onClick={handleLogout} 
            className="mt-8 w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Logout
          </button>
        </div>
      </main>
      
      {/* <Footer /> */}
    </div>
  );
}
