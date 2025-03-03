"use client";

import { useState } from "react";

export const useHotels = () => {
  const [hotels, useHotels] = useState<any[]>([]);

  const getHotelNameAutoComplete = async (keyword: string) => {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_AMADEUS_TOKEN}`,
      },
    };

    try {
      const data = await fetch(
        `${process.env.NEXT_PUBLIC_AMADEUS_GLOBAL_URL}/v1/reference-data/locations/hotel?keyword=${keyword}&subType=HOTEL_LEISURE`,
        options
      );
      const json = await data.json();      
      console.log(json);
    } catch (error) {
      console.log(error);
    }
  };

  return { hotels, getHotelNameAutoComplete };
};
