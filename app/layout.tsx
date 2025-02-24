'use client'

import { createClient } from '@/lib/supabase/client'
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Geist, Geist_Mono } from "next/font/google";
import { useState, useEffect } from 'react'
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({children}) {

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Initialize Supabase client inside the useEffect
    const supabase = createClient();

    // Fetch user session on mount
    const fetchUser = async () => {
      const { data: session } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };

    fetchUser();

    // Listen to auth state changes and update user state
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    
  }, []);

  // Sign out function
  const signOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut(); // Sign out the user
    setUser(null); // Set the user state to null
    window.location.href='/' // Reload the window
  };

  return (
    <html lang="en">
      <head>
        <title>Smart Voyage</title>
      </head>
      <body>
        <Header user={user} onLogout={signOut} />

        <main>{children}</main>

        <Footer />
      </body>
    </html>
  );
}
