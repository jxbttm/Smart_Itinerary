"use client";
import { useState, useEffect} from "react";
import { useParams } from "next/navigation"; // Use useParams from next/navigation
import ItineraryTimeline from "../../ItineraryTimeline";
import { Itinerary } from '@/types/Itinerary';
import { ItineraryService } from "@/services/ItineraryService";

export default function ItineraryPage()
{
    const [loading, setLoading] = useState<boolean>(false);
    const [itinerary, setItinerary] = useState<Itinerary | null>(null);
    const [weatherForecast, setWeatherForecast] = useState<any | null>(null); // State to store weather forecast

    // Use useParams to get dynamic params in Next.js 13+ App Directory
    const { userId, itineraryId } = useParams(); // Now you get both userId and itineraryId from the URL

    useEffect(() => {
        if (!userId || !itineraryId) {
            return;
        }
        const fetchItinerary = async () => {
        setLoading(true);
        try {

            // Fetch itinerary from ItineraryService if id exists
            const result = await ItineraryService.getItinerary(itineraryId as string);
            console.log('result', result);
            if (result) {
                setItinerary(result);
                setWeatherForecast(result.weather_forecast);
            } else {
                setItinerary(null);
            }
            
        } catch (error) {
            console.error("Error fetching itinerary:", error);
        } finally {
            setLoading(false);
        }
        };
        fetchItinerary();
    }, [userId, itineraryId]); // Run when either userId or itineraryId changes

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
                <ItineraryTimeline itinerary={itinerary} weatherForecast={weatherForecast} userId="not null" itineraryId="not null" flightDisplayDetails={[]}/>
            </div>
            ) : (
            <div>Error viewing itinerary. Please try again later.</div>
            )}
        </div>
        </>
    );
}
