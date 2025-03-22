"use client";

import { useHotels } from "@/hooks/useHotels";
import { supabase } from "@/lib/supabase/client";
import { ItineraryService } from "@/services/ItineraryService";

import { useEffect, useState } from "react";
import HotelSearchResultCard from "@/components/hotel/HotelSearchResultCard";
import itineraryStore from "@/store/itineraryStore";
import useHotelStore from "@/store/hotelStore";

export default function HotelSuggestion() {
  // UseState
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Variable and functions
  const { useItineraryStore } = itineraryStore();
  const { getHotelQueryResult } = useHotels();
  const setItineraryData = useItineraryStore((state) => state.setItineraryData);
  const setHotelSearchData = useHotelStore((state) => state.setHotelSearchData);
  const hotelsearchData = useHotelStore((state) => state.hotelSearchData);

  const getUserItinerary = async () => {
    const session = await supabase.auth.getUser();

    if (session.data.user) {
      const { id } = session.data.user;
      const userItineraryData = await ItineraryService.getUserItineraries(id);

      if (userItineraryData) {
        setItineraryData(userItineraryData);
        setIsLoading(true);
        const destinations = userItineraryData
          .map((item: any) => item.destination)
          .join(",");
        const hotelSuggestions = await getHotelQueryResult(destinations);
        if (hotelSuggestions && hotelSuggestions?.length > 0) {
          setHotelSearchData(hotelSuggestions);
        }
        setIsLoading(false);
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
      {!isLoading && hotelsearchData && hotelsearchData.length > 0 ? (
        <div className="w-full flex flex-col gap-10 py-8">
          <h1 className="text-2xl text-center">
            Suggested Hotels Based on your Itinerary
          </h1>
          <HotelSearchResultCard isSuggestion={true} />
        </div>
      ) : (
        !isLoading && (
          <div className="flex w-full text-xl justify-center">
            No Suggested Hotels!
          </div>
        )
      )}
    </>
  );
}
