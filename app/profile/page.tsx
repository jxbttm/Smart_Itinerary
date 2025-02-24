'use client'

import { supabase } from "@/lib/supabase";
import { createClient } from "@/lib/supabase/client";
import { signOut } from '@/lib/actions'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Profile(){
    const [user, setUser] = useState<any>(null)

    useEffect(() => {
        const setProfile = async () => {
            const supabase = await createClient();
            const session = await supabase.auth.getUser()
            console.log('session', session)
            if (session.data.user) {
                setUser(session.data.user)
            }
        };
        setProfile();
    }, [])

    // Check if user is null before destructuring
    if (!user) {
        return <div>Loading...</div>;
    }

    const { user_metadata, app_metadata } = user
    const { name, email, avatar_url } = user_metadata || {}

    return (
        <div className="font-[family-name:var(--font-geist-sans)] flex flex-col items-center justify-center h-screen gap-4">
            {avatar_url && (
                <Image
                    src={avatar_url}
                    alt={name}
                    width={200}
                    height={200}
                    className="rounded-full"
                    quality={100}
                />
            )}
            <h1 className="text-4xl font-bold">{name}</h1>
            <p className="text-xl">User Name: {name}</p>
            <p className="text-xl">Email: {email}</p>
            <p className="text-xl">Created with: {app_metadata?.provider}</p>

            <form onSubmit={signOut}>
                <button className="btn" type="submit">
                    Sign Out
                </button>
            </form>
        </div>
    )
}
