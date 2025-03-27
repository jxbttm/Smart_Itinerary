"use client";
import { useState, useEffect } from "react";
import { use } from 'react'
import GenerateItinerary from "./GenerateItinerary";
import ItineraryTimeline from "./ItineraryTimeline";
import { Itinerary } from '@/types/Itinerary';
import { FlightsService } from '@/services/FlightsService'
import { FlightDisplayDetails } from '@/types/FlightDisplayDetails'
import generateWeatherForecast from "./GenerateWeatherForecast";
import { WeatherForecast } from '@/types/WeatherForecast'


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

  const { data } = use(searchParams)
  const flightsService = new FlightsService();

  // Test search criteria
  const searchCriteria = {
    origin_country: 'PAR',        // Singapore
    destination_country: 'ICN',    // Seoul
    departure_date: '2025-08-01',  // Future date
    return_date: '2025-08-15',     // Future date
    pax: 2,                        // Number of passengers
    number_of_results: 8           // Max number of results
  };

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


            // Get Weather Forecast once the itinerary is fetched
            const weatherResult = await generateWeatherForecast(parsedData);
            
            if (weatherResult) {
              const weatherForecastData: WeatherForecast = JSON.parse(weatherResult);
              console.log('weatherResult', weatherResult);
              console.log('weatherResult', weatherForecastData);
              setWeatherForecast(Array.isArray(weatherForecastData) ? weatherForecastData : [weatherForecastData]);
              // setWeatherForecast(weatherForecastData);
            } else {
              console.error("Error generating weather forecast.");
            }

          } else {
            setItinerary(null);
          }

          // Get Flight Details
          const flightDetails:FlightDisplayDetails[] = await flightsService.searchFlights(searchCriteria);
          if (flightDetails){
            console.log("got flight details from itinerary page")
            console.log('flight display details: ',flightDetails);
            setFlightDetails(flightDetails);
          }
          else{
            setFlightDetails([]);
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
            <ItineraryTimeline itinerary={itinerary} weatherForecast={weatherForecast} userId="null" itineraryId="null" flightDisplayDetails={flightDetails}/>
          </div>
        ) : (
          <div>Error generating itinerary. Please try again later.</div>
        )}
      </div>
    </>
  )
}
