'use client'

import { createClient } from "@/lib/supabase/client";
import { signOut } from '@/lib/actions'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from "next/navigation";


export default function Profile(){
    const router = useRouter();
    const [user, setUser] = useState<any>(null)
    const [itineraries, setItineraries] = useState<any[]>([]);  // State for itineraries
    const [loading, setLoading] = useState<boolean>(true);  // Loading state for fetching data

    // Helper function to format date as dd-mm-yyyy
    const formatDate = (date: string) => {
        const d = new Date(date);
        const day = d.getDate().toString().padStart(2, '0');
        const month = (d.getMonth() + 1).toString().padStart(2, '0'); // months are zero-indexed
        const year = d.getFullYear();
        return `${day}-${month}-${year}`;
    };

     // Function to handle redirection on button click
    const handleViewDetails = (userId:string, itineraryId: string) => {
        router.push(`/itinerary/${userId}/${itineraryId}`); // Navigate to the full itinerary page with the itinerary id
    };

    useEffect(() => {
        const setProfile = async () => {
            const supabase = await createClient();
            const session = await supabase.auth.getUser()
            console.log('session', session)
            if (session.data.user) {
                // Get user data
                const { data: user_record, error: userError } = await supabase
                .from('users')
                .select('*')
                .eq('id', session.data.user.id)
                .single();

                if (userError) {
                    console.error('Error fetching user data:', userError);
                    return;
                  }

                console.log('user', user_record);
                setUser(user_record);

                // Get user's itineraries
                const { data: itineraries_data, error: itineraryError } = await supabase
                .from('itinerary')
                .select('*')
                .eq('user_id', session.data.user.id);

                if (itineraryError) {
                    console.error('Error fetching itineraries:', itineraryError);
                    return;
                }

                console.log('itineraries', itineraries_data);
                console.log(itineraries_data[0].destination);
                setItineraries(itineraries_data || []);  // Set the fetched itineraries in state


            }
            setLoading(false);  // Set loading state to false after fetching data
        };
        setProfile();
    }, [])

    // Check if user is null before destructuring
    if (!user) {
        return (
            <div className="absolute inset-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center z-10">
              <span className="loading loading-spinner text-white text-2xl"></span>
            </div>
          );
    }

    if (loading) {
        return (
            <div className="absolute inset-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center z-10">
              <span className="loading loading-spinner text-white text-2xl"></span>
            </div>
          );
      }

    const { name, email, avatar_url, travel_group, min_budget, max_budget } = user

    return (
        <div className="font-[family-name:var(--font-geist-sans)] flex flex-col items-center justify-center min-h-screen gap-4">
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

            {itineraries.length > 0 ? (
                itineraries.map((itinerary: any) => (
                <div key={itinerary.id} className="card bg-base-100 w-96 shadow-sm mb-4">
                    <figure>
                    <img
                        src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                        alt="Itinerary"
                    />
                    </figure>
                    <div className="card-body">
                    <h2 className="card-title">{itinerary.destination}</h2>
                    <p>
                        Duration: {formatDate(itinerary.start_date)} - {formatDate(itinerary.end_date)} <br /> 
                        Estimated Cost: ${itinerary.estimated_total_cost}
                    </p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary" onClick={() => handleViewDetails(user.id, itinerary.id)}>View Details</button>
                    </div>
                    </div>
                </div>
                ))
            ) : (
                <p>No itineraries available.</p>
            )}
            
        </div>
    )
}
