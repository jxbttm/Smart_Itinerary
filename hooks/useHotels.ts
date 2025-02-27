"use client";

import { useState } from "react";

const token = `Xn67Am6mCp6rsk6KOCt4ARGXUG1G`;
export const useHotels = () => {
  const [hotels, useHotels] = useState<any[]>([]);

  const getHotelNameAutoComplete = async (keyword: string) => {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const data = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/v1/reference-data/locations/hotel?keyword=${keyword}&subType=HOTEL_LEISURE`,
        options
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return { hotels, getHotelNameAutoComplete };
};
