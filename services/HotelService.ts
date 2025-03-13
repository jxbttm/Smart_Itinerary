import { Hotel } from "@/interfaces/Hotel";
import { supabase } from "@/lib/supabase";

export class HotelService {
  static saveHoteltoItinerary = async (itineraryId: number, hotel: Hotel) => {
    try {
      const { data, error } = await supabase
        .from("itinerary_accomodation")
        .insert({
          name: hotel.name,
          estimated_cost: parseInt(hotel.price.slice(1)),
          image_url: hotel.image_url,
          itinerary_id: itineraryId,
        })
        .select("*")
        .single();
      if (data) {
        return data.id;
      }
    } catch (error) {}
  };
}
