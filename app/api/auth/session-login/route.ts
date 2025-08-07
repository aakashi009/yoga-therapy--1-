// app/api/auth/session-login/route.ts
import { NextResponse } from 'next/server';
import admin from 'firebase-admin';

// Initialize Firebase Admin
const serviceAccount = require('../../../../../curethuyoga-firebase-adminsdk-fbsvc-1405930ebe.json'); // Adjust path to your key
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export async function POST(request: Request) {
  const { idToken } = await request.json();

  // Set session expiration to 5 days.
  const expiresIn = 60 * 60 * 24 * 5 * 1000;

  try {
    // Create the session cookie. This will also verify the ID token.
    const sessionCookie = await admin.auth().createSessionCookie(idToken, { expiresIn });

    // Set cookie policy for session cookie.
    const options = {
      name: 'session',
      value: sessionCookie,
      maxAge: expiresIn,
      httpOnly: true,
      secure: true,
    };

    const response = NextResponse.json({ status: 'success' });
    response.cookies.set(options);
    return response;

  } catch (error) {
    console.error('Session Login Error:', error);
    return NextResponse.json({ error: 'Failed to create session' }, { status: 401 });
  }
}
