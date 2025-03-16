"use client";

import { useHotels } from "@/hooks/useHotels";
import { Hotel } from "@/interfaces/Hotel";
import { createClient } from "@/lib/supabase/client";
import { ItineraryService } from "@/services/ItineraryService";

import { useEffect, useState } from "react";
import HotelSearchResultCard from "@/components/hotel/HotelSearchResultCard";
import itineraryStore from "@/store/itineraryStore";
import { Itinerary } from "@/types/Itinerary";

export default function HotelSuggestion() {
  // UseState
  const [suggestedHotels, setSuggestedHotels] = useState<Hotel[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // Variable and functions
  const { useItineraryStore } = itineraryStore();
  const { getHotelQueryResult } = useHotels();
  const setItineraryData = useItineraryStore((state) => state.setItineraryData);

  const getUserItinerary = async () => {
    const supabase = await createClient();
    const session = await supabase.auth.getUser();

    if (session.data.user) {
      const { id } = session.data.user;
      const userItineraryData = await ItineraryService.getUserItinerary(id);

      if (userItineraryData) {
        setItineraryData(userItineraryData);
        setIsLoading(true);
        const hotelSuggestions = await getHotelQueryResult(
          userItineraryData.destination
        );
        if (hotelSuggestions && hotelSuggestions?.length > 0) {
          setSuggestedHotels(hotelSuggestions);
          setIsLoading(false);
        }
      } else {
        return null;
      }
    }
  };

  // UseEffect
  useEffect(() => {
    getUserItinerary();
  }, []);

  return (
    <>
      {isLoading && <div className="skeleton h-32 w-full"></div>}
      {!isLoading && suggestedHotels && suggestedHotels.length > 0 ? (
        <div className="w-full flex flex-col gap-10 py-8">
          <h1 className="text-2xl text-center">
            Suggested Hotels Based on your Itinerary
          </h1>
          <HotelSearchResultCard
            hotelSearchData={suggestedHotels}
            isSuggestion={true}
          />
        </div>
      ) : (
        !isLoading && <>No Suggested Hotels!</>
      )}
    </>
  );
}
