"use client";

import HotelSearchResultCard from "@/components/hotel/HotelSearchResultCard";
import hotelStore from "@/store/hotelStore";

export default function HotelSearch() {
  // FUNCTIONS AND VARIABLES

  const { useHotelStore } = hotelStore();
  const hotelSearchData = useHotelStore((state) => state.hotelSearchData);

  return <HotelSearchResultCard hotelSearchData={hotelSearchData} />;
}
