import { ItineraryActivity } from "./ItineraryActivity";
import { ItineraryAccommodation } from './ItineraryAccommodation';

export interface ItineraryDay {
  date: string;
  location: string;
  description: string;
  activities: ItineraryActivity[];
  accommodation: ItineraryAccommodation;
  transportation?: {
    type: string;
    estimatedCost: {
      currency: string;
      amount: number;
    };
  };
}
