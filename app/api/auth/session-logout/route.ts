// app/api/auth/session-logout/route.ts
import { NextResponse } from 'next/server';

export async function POST() {
  // To log out, we simply clear the session cookie.
  const options = { name: 'session', value: '', maxAge: -1 };

  const response = NextResponse.json({ status: 'success' });
  response.cookies.set(options);
  return response;
}
