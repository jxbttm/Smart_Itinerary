import { supabase } from "@/lib/supabase";
import { Itinerary } from "@/types/Itinerary";

export class ItineraryService {

    static async saveItinerary(userId: string, itinerary: Itinerary): Promise<any> {
        try {
            const { data, error } = await supabase.from('itinerary')
                .insert({
                    user_id: userId,
                    destination: itinerary.destination,
                    start_date: itinerary.startDate,
                    end_date: itinerary.endDate,
                    estimated_total_cost: itinerary.estimatedTotalCost,
                    notes: itinerary.importantNotes
                }).select().single()

            const itineraryId = data?.id

            if (!error && itineraryId) {
                await supabase.from('itinerary_demographics')
                    .insert({
                        currency: itinerary.demographics.currency,
                        budget_min: itinerary.demographics.budgetMin,
                        budget_max: itinerary.demographics.budgetMax,
                        travel_type: itinerary.demographics.travelerType,
                        purpose: itinerary.demographics.purpose,
                        itinerary_id: itineraryId
                    });

                await supabase.from('itinerary_accomodation')
                    .insert({
                        name: itinerary.accommodation.name,
                        estimated_cost: itinerary.accommodation.estimatedCost,
                        image_url: itinerary.accommodation.imageUrl,
                        itinerary_id: itineraryId
                    });

                for (const day of itinerary.itineraryDays) {
                    const { data: dayData, error: dayError } = await supabase
                        .from('itinerary_day')
                        .insert({
                            itinerary_id: itineraryId,
                            date: day.date,
                            location: day.location,
                            description: day.description,
                        }).select().single();

                    const itineraryDayId = dayData.id;
                    if (!dayError && itineraryDayId) {
                        for (const activity of day.activities) {
                            await supabase
                                .from('itinerary_activity')
                                .insert({
                                    itinerary_day_id: itineraryDayId,
                                    name: activity.name,
                                    details: activity.details,
                                    estimated_cost: activity.estimatedCost,
                                    image_url: activity.imageUrl,
                                    timing: activity.timing,
                                });
                        }
                    }
                }
            }
        } catch (error) {
            console.error('Error saving itinerary:', error);
        }
    }
}
