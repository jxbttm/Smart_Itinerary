"use client";

import { supabase } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation"; // Use useParams to get dynamic route parameters
import {
  FaUserAlt,
  FaEnvelope,
  FaSuitcase,
  FaMoneyBillAlt,
  FaBullseye,
} from "react-icons/fa";

export default function Profile() {
  const { userId } = useParams(); // Extract userId from URL params
  const [user, setUser] = useState<any>(null);
  const [itineraries, setItineraries] = useState<any[]>([]); // State for itineraries
  const [loading, setLoading] = useState<boolean>(true); // Loading state for fetching data

  // Helper function to format date as dd-mm-yyyy
  const formatDate = (date: string) => {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, "0");
    const month = (d.getMonth() + 1).toString().padStart(2, "0"); // months are zero-indexed
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

      // Fetch user data based on the userId in the URL
      const { data: user_record, error: userError } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId) // Use userId from the URL
        .single();

      if (userError) {
        console.error("Error fetching user data:", userError);
        return;
      }

      setUser(user_record);

      // Get user's itineraries based on the userId
      const { data: itineraries_data, error: itineraryError } = await supabase
        .from("itinerary")
        .select("*")
        .eq("user_id", userId); // Fetch itineraries for the userId

      if (itineraryError) {
        console.error("Error fetching itineraries:", itineraryError);
        return;
      }

      setItineraries(itineraries_data || []);
      setLoading(false); // Set loading state to false after fetching data
    };
    setProfile();
  }, [userId]); // Fetch data again when userId changes

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

  const {
    name,
    email,
    avatar_url,
    travel_group,
    min_budget,
    max_budget,
    purpose,
  } = user;

  const cleanedPurpose = purpose.replace(/[\[\]"]+/g, "");

  return (
    <div className="font-[family-name:var(--font-geist-sans)] flex flex-col items-center justify-center min-h-screen gap-6 p-4 bg-gray-50">
      {/* Avatar and Edit Button Section */}
      <div className="flex flex-col items-center gap-4">
        {avatar_url && (
          <Image
            src={avatar_url}
            alt={name}
            width={200}
            height={200}
            className="rounded-full border-4 border-gray-500 shadow-lg"
            quality={100}
          />
        )}
        <Link href={`/profile/${userId}/edit-profile`}>
          <button className="btn btn-accent text-white py-2 px-6 rounded-lg transition-all hover:bg-accent-focus">
            Edit Profile
          </button>
        </Link>
      </div>

      {/* Name Section */}
      <h1 className="text-4xl font-semibold text-black">{name}</h1>

      {/* User Info */}
      <div className="card bg-white shadow-md w-full max-w-md mt-6 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          User Information
        </h2>
        <div className="space-y-4 text-gray-700 text-lg">
          <div className="flex items-center">
            <FaUserAlt className="text-gray-500 mr-3" />
            <p>
              <span className="font-semibold text-gray-900">User Name:</span>{" "}
              {name}
            </p>
          </div>
          <div className="flex items-center">
            <FaEnvelope className="text-gray-500 mr-3" />
            <p>
              <span className="font-semibold text-gray-900">Email:</span>{" "}
              {email}
            </p>
          </div>
          <div className="flex items-center">
            <FaSuitcase className="text-gray-500 mr-3" />
            <p>
              <span className="font-semibold text-gray-900">Travel Type:</span>{" "}
              {travel_group}
            </p>
          </div>
          <div className="flex items-center">
            <FaMoneyBillAlt className="text-gray-500 mr-3" />
            <p>
              <span className="font-semibold text-gray-900">Budget:</span> $
              {min_budget} - ${max_budget}
            </p>
          </div>
          <div className="flex items-center">
            <FaBullseye className="text-gray-500 mr-3" />
            <p>
              <span className="font-semibold text-gray-900">Preference:</span>{" "}
              {cleanedPurpose}
            </p>
          </div>
        </div>
      </div>

      {/* Itinerary Section */}
      {itineraries.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {itineraries.map((itinerary: any) => (
            <div
              key={itinerary.id}
              className="card bg-base-100 shadow-lg hover:shadow-xl transition-all"
            >
              <figure>
                <img
                  src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                  alt="Itinerary"
                  className="object-cover w-full h-56 rounded-t-lg"
                />
              </figure>
              <div className="card-body p-4">
                <h2 className="card-title text-xl font-bold text-gray-900">
                  {itinerary.destination}
                </h2>
                <p className="text-gray-700">
                  Duration: {formatDate(itinerary.start_date)} -{" "}
                  {formatDate(itinerary.end_date)} <br />
                  Estimated Cost: ${itinerary.estimated_total_cost}
                </p>
                <div className="card-actions justify-end mt-4">
                  <button
                    className="btn btn-primary px-6 py-2 rounded-lg transition-all hover:bg-primary-focus"
                    onClick={() => handleViewDetails(user.id, itinerary.id)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-lg text-center text-gray-600 mt-6">
          No itineraries available.
        </p>
      )}
    </div>
  );
}
