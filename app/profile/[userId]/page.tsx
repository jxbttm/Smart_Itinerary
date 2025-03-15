'use client'

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useParams } from "next/navigation"; // Use useParams to get dynamic route parameters

export default function Profile() {
    const { userId } = useParams(); // Extract userId from URL params
    const [user, setUser] = useState<any>(null);
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
    const handleViewDetails = (userId: string, itineraryId: string) => {
        window.location.href = `/itinerary/${userId}/${itineraryId}`; // Redirect to itinerary page
    };

    useEffect(() => {
        const setProfile = async () => {
            if (!userId) return; // Ensure userId is available

            const supabase = await createClient();

            // Fetch user data based on the userId in the URL
            const { data: user_record, error: userError } = await supabase
                .from('users')
                .select('*')
                .eq('id', userId)  // Use userId from the URL
                .single();

            if (userError) {
                console.error('Error fetching user data:', userError);
                return;
            }

            setUser(user_record);

            // Get user's itineraries based on the userId
            const { data: itineraries_data, error: itineraryError } = await supabase
                .from('itinerary')
                .select('*')
                .eq('user_id', userId);  // Fetch itineraries for the userId

            if (itineraryError) {
                console.error('Error fetching itineraries:', itineraryError);
                return;
            }

            setItineraries(itineraries_data || []);
            setLoading(false);  // Set loading state to false after fetching data
        };
        setProfile();
    }, [userId]);  // Fetch data again when userId changes

    if (loading) {
        return (
            <div className="absolute inset-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center z-10">
                <span className="loading loading-spinner text-white text-2xl"></span>
            </div>
        );
    }

    if (!user) {
        return <p>User not found</p>;
    }

    const { name, email, avatar_url, travel_group, min_budget, max_budget, purpose } = user;

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
            <Link href={`/profile/${userId}/edit-profile`}>
                <button className="btn btn-neutral py-2 px-6 text-white">Edit Profile</button>
            </Link>
            <h1 className="text-4xl font-bold">{name}</h1>
            <p className="text-xl">User Name: {name}</p>
            <p className="text-xl">Email: {email}</p>
            <p className="text-xl">Travel Type: {travel_group}</p>
            <p className="text-xl">Budget: ${min_budget} - ${max_budget}</p>
            <p className="text-xl">Purpose: {purpose}</p>

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
    );
}
