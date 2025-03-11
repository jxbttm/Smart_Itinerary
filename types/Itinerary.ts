import { ItineraryDay } from './ItineraryDay';

export interface Itinerary {
    id?: string | null;
    user_id?: string | null;
    start_date: string;
    end_date: string;
    destination: string;
    dates: string;
    budget: {
        currency?: string | null;
        min: number;
        max: number;
    };
    travelerType: string;
    purpose: string;
    itinerary: ItineraryDay[],
    estimatedTotalCost: {
        currency: string;
        amount: number;
        notes: string;
    };
    importantNotes: string[];
};