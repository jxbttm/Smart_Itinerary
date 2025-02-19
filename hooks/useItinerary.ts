import { supabase } from "@/lib/supabase";
import { useState } from "react";

export const useItinerary = () => {
  const [itinerary, setItinerary] = useState<any[]>([]);

  const getItinerary = async () => {
    const { data, error } = await supabase.from("Itinerary").select("*");

    if (data) {
      setItinerary(data);
    }

    if (error) {
      console.error(error);
    }
  };

  return {
    itinerary,
    getItinerary,
  };
};
