"use client";
import { useState, useEffect } from "react";
import { use } from 'react'
import GenerateItinerary from "./GenerateItinerary";
import ItineraryTimeline from "./ItineraryTimeline";
import { Itinerary } from '@/types/Itinerary';

export default function ItineraryPage({
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string }>
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const { data } = use(searchParams)

  useEffect(() => {
    if (!data || itinerary) {
      return;
    }
    const fetchItinerary = async () => {
      setLoading(true);
      try {
        if (data) {
          const parsedData = JSON.parse(decodeURIComponent(data));
          const result = await GenerateItinerary(parsedData);
          if (result) {
            const itineraryData: Itinerary = JSON.parse(result);
            console.log('itineraryData', itineraryData);
            setItinerary(itineraryData);
          } else {
            setItinerary(null);
          }
        }
      } catch (error) {
        console.error("Error generating itinerary:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchItinerary();
  }, []);

  if (loading) {
    return (
      <div className="absolute inset-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center z-10">
        <span className="loading loading-spinner text-white text-2xl"></span>
      </div>
    );
  }

  return (
    <>
      <div>
        {itinerary ? (
          <div>
            <ItineraryTimeline itinerary={itinerary} />
          </div>
        ) : (
          <div>Error generating itinerary. Please try again later.</div>
        )}
      </div>
    </>
  )
}
