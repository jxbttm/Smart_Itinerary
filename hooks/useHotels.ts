"use client";

import { HotelSchema } from "@/data/HotelSchema";
import { Hotel } from "@/types/Hotel";
import { GeminiFacade } from "@/services/GeminiFacade";

export const useHotels = () => {

  const getHotelQueryResult = async (query: string) => {
    const geminiFacade = new GeminiFacade();

    const prompt =
      "I am creating a search bar for hotels, and I would like you to suggest hotels based on my search query. " +
      "Can you include hotel details suchs as ratings, price, description, image address of any image you can " +
      "get on the website itself. Please return an empty json array if there are no hotel suggestions. "+
      `The query is "${query}"`;

     const result = await geminiFacade.generateContent(prompt, HotelSchema);
     if(result != null){
      return JSON.parse(result) as Hotel[];
     }
  };

  return { getHotelQueryResult };
};
