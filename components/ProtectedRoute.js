// src/components/ProtectedRoute.js
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth'; // A helpful library!
import { Navigate } from 'react-router-dom';
import { auth } from '../firebase-config'; // Your React app's firebase config

const ProtectedRoute = ({ children }) => {
    const [user, loading, error] = useAuthState(auth);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        // If no user is logged in, redirect to the HTML login page
        return <Navigate to="/index.html" />;
    }

    // If user is logged in, show the page content
    return children;
};

export default ProtectedRoute;