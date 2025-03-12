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

    static async getItinerary(itineraryId: string): Promise<any> {
        try {
            // Fetch the main itinerary details
            const { data: itineraryData, error: itineraryError } = await supabase
                .from('itinerary')
                .select('*')
                .eq('id', itineraryId)
                .single(); // We assume we are fetching a single itinerary
        
            if (itineraryError) {
                console.error('Error fetching itinerary:', itineraryError);
                return null; // Return null if there is an error fetching the itinerary
            }
        
            if (!itineraryData) {
                console.log('No itinerary found with this ID');
                return null; // Return null if no data is found
            }
        
            
        
            // Fetch related demographics data (same as before)
            const { data: demographicsData, error: demographicsError } = await supabase
                .from('itinerary_demographics')
                .select('*')
                .eq('itinerary_id', itineraryId)
                .single(); // Assuming a 1-to-1 relationship
        
            if (demographicsError) {
                console.error('Error fetching demographics:', demographicsError);
            }
        
            // Fetch related accommodation data (same as before)
            const { data: accommodationData, error: accommodationError } = await supabase
                .from('itinerary_accomodation')
                .select('*')
                .eq('itinerary_id', itineraryId)
                .single(); // Assuming a 1-to-1 relationship
        
            if (accommodationError) {
                console.error('Error fetching accommodation:', accommodationError);
            }
        
            // Fetch related itinerary days data (same as before)
            const { data: itineraryDaysData, error: itineraryDaysError } = await supabase
                .from('itinerary_day')
                .select('*')
                .eq('itinerary_id', itineraryId);
        
            if (itineraryDaysError) {
                console.error('Error fetching itinerary days:', itineraryDaysError);
            }


            // Transform start_date and end_date to startDate and endDate
            const itineraryWithCorrectProps = {
                ...itineraryData,
                ...demographicsData,
                startDate: itineraryData.start_date,
                endDate: itineraryData.end_date,
                travelerType: demographicsData.travel_type,
                estimatedTotalCost: itineraryData.estimated_total_cost,
                importantNotes: itineraryData.notes ? JSON.parse(itineraryData.notes) : [], // Parse the notes string into an array
            };
    
            // Fetch activities for each itinerary day (same as before)
            if (itineraryDaysData) {
                for (let day of itineraryDaysData) {
                    const { data: activitiesData, error: activitiesError } = await supabase
                        .from('itinerary_activity')
                        .select('*')
                        .eq('itinerary_day_id', day.id); // Fetch activities by itinerary_day_id
                    
                    if (activitiesError) {
                        console.error('Error fetching activities for day:', activitiesError);
                    }
    
                    day.activities = activitiesData || []; // Add activities to each day
                }
            }
    
            // Assemble and return the complete itinerary data including all related data
            return {
                ...itineraryWithCorrectProps,  // Use transformed itinerary data
                demographics: demographicsData || {},
                accommodation: accommodationData || {},
                itineraryDays: itineraryDaysData || [],
            };
        } catch (error) {
            console.error('Error fetching itinerary:', error);
            return null;
        }
    }
    
    
}
