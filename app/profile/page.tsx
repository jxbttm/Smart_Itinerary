'use client'

import { createClient } from "@/lib/supabase/client";
import { signOut } from '@/lib/actions'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Profile(){
    const [user, setUser] = useState<any>(null)
    let user_record: any

    useEffect(() => {
        const setProfile = async () => {
            const supabase = await createClient();
            const session = await supabase.auth.getUser()
            console.log('session', session)
            if (session.data.user) {
                user_record = await supabase
                .from('users')
                .select('*')
                .eq('id', session.data.user.id)
                .single()
                console.log('user', user_record)
                setUser(user_record.data)
            }
        };
        setProfile();
    }, [])

    // Check if user is null before destructuring
    if (!user) {
        return <div>Loading...</div>;
    }

    const { name, email, avatar_url, travel_group, min_budget, max_budget } = user

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
            <Link href="/profile/edit-profile">
                <button className="btn btn-neutral py-2 px-6 text-white">Edit Profile</button>
            </Link>
            <h1 className="text-4xl font-bold">{name}</h1>
            <p className="text-xl">User Name: {name}</p>
            <p className="text-xl">Email: {email}</p>
            <p className="text-xl">Travel Type: {travel_group} </p>
            <p className="text-xl">Budget: ${min_budget} - ${max_budget}</p>
            

            <form onSubmit={signOut}>
                <button className="btn" type="submit">
                    Sign Out
                </button>
            </form>
        </div>
    )
}
