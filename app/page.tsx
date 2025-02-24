'use client'

import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Home() {

  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // This runs on the client-side when the component mounts
    const fetchUser = async () => {
      const supabase = await createClient()

      // Get the user session
      const session = await supabase.auth.getUser()
      console.log('session', session)
      if (session.data.user) {
        const { user_metadata, email, id } = session.data.user
        const { name, avatar_url } = user_metadata

        // Check if the user already exists in the 'users' table
        const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)

        // If user does not exist in the users table, insert user data
        if (data.length === 0) {
          const { error: insertError } = await supabase.from('users').insert([
            {
              id,
              name,
              email,
              avatar_url,
              // Add any other columns as required in the 'users' table
            }
          ])
          
            if (insertError) {
              console.error("Error inserting user into 'users' table:", insertError)
            }
        }

        

        // Set the user data to display their profile
        setUser(session.data.user)
      }

      setLoading(false)
    }

    fetchUser()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return (
      <div className='flex flex-col items-center justify-center h-screen gap-4'>
        <h1 className="text-3xl font-bold text-center mb-4">Plan Your Dream Trip</h1>
        <p className="text-center text-lg mb-6">Get started by exploring destinations and planning your next adventure.</p>

        <div className="flex gap-4">
          <Link href="/plan-itinerary">
            <button className="btn btn-primary py-2 px-6 text-white">Plan a Trip</button>
          </Link>
          <button className="btn btn-neutral py-2 px-6 text-white">Buy us Coffee</button>
        </div>
      </div>
    )
  }

  // Destructure user metadata and app metadata
  const { user_metadata, app_metadata } = user
  const { name, email, avatar_url } = user_metadata

  const userName = name ? `@${name}` : 'User Name Not Set'


  return (
    <div>
      {/* Plan Your Trip Section (Always visible) */}
      <main className="flex flex-col justify-center items-center min-h-screen">
        <h1 className="text-3xl font-bold text-center mb-4 ring-4 ring-white">Plan Your Dream Trip</h1>
        <p className="text-center text-lg mb-6 ring-4 ring-white">Get started by exploring destinations and planning your next adventure.</p>

        <div className="flex gap-4">
          <Link href="/plan-itinerary">
            <button className="btn btn-primary py-2 px-6 text-white">Plan a Trip</button>
          </Link>
          <button className="btn btn-neutral py-2 px-6 text-white">Buy us Coffee</button>
          <Link className="btn" href="/create">
              Create Post
          </Link>
        </div>
      </main>
    </div>

    )
  


}
