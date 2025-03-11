"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import GenerateItinerary from "./GenerateItinerary";
import ItineraryTimeline from "./ItineraryTimeline";
import { Itinerary } from '@/types/Itinerary';

export default function ItineraryPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const searchParams = useSearchParams();
  const data = searchParams.get("data");
  let parsedData: any;

  if (!data) return <div>Loading...</div>;

  try {
    parsedData = JSON.parse(decodeURIComponent(data)); // Parsing the URL-encoded data
  } catch (error) {
    return <div>Error parsing data. Please check the URL.</div>;
  }


  useEffect(() => {
    if (!parsedData || itinerary) {
      return;
    }
    const fetchItinerary = async () => {
      setLoading(true);
      try {
        const result = await GenerateItinerary(parsedData);
        if(result){
          const itineraryData: Itinerary = JSON.parse(result);
          setItinerary(itineraryData);
        } else {
          setItinerary(null);
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
