"use client";
import { useState, useEffect } from "react";
import { use } from 'react'
import ItineraryTimeline from "./ItineraryTimeline";
import { Itinerary } from '@/types/Itinerary';
import { FlightDisplayDetails } from '@/types/FlightDisplayDetails'
import { ItineraryPlannerFacade } from "@/services/ItineraryPlannerFacade";

export default function ItineraryPage({
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string }>
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [flightDetails, setFlightDetails] = useState<FlightDisplayDetails[] | []>([]);
  const [weatherForecast, setWeatherForecast] = useState<any | null>(null); // State to store weather forecast
  const [isGeneratedItinerary, setIsGeneratedItinerary] = useState<boolean>(false);

  const { data } = use(searchParams)

  const itineraryPlannerFacade = new ItineraryPlannerFacade();

  useEffect(() => {
    if (!data || itinerary) {
      return;
    }
    const fetchItinerary = async () => {
      setLoading(true);
      try {
        if (data) {
          setIsGeneratedItinerary(true);
          const parsedData = JSON.parse(decodeURIComponent(data));
          if (parsedData) {
            const searchCriteria = {
              origin_country: parsedData.sourceAirportCode || '',
              destination_country: parsedData.destinationAirportCode || '',
              departure_date: parsedData.startDate || '',
              return_date: parsedData.endDate || '',
              pax: parseInt(parsedData.numberPeople) || 1,
              number_of_results: 8
            };

            const results = await itineraryPlannerFacade.planItinerary(parsedData, searchCriteria)

            if (results.itineraryData) {
              setItinerary(results.itineraryData || null);
            }
            if (results.weatherData) {
              setWeatherForecast(Array.isArray(results.weatherData) ? results.weatherData : [results.weatherData]);
            }

            if (results.flightDetails) {
              setFlightDetails(flightDetails || []);
            }
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
            <ItineraryTimeline isGeneratedItinerary={isGeneratedItinerary} itinerary={itinerary} weatherForecast={weatherForecast} userId="null" itineraryId="null" flightDisplayDetails={flightDetails} />
          </div>
        ) : (
          <div>Error generating itinerary. Please try again later.</div>
        )}
      </div>
    </>
  )
}
