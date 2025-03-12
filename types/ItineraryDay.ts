import { ItineraryActivity } from "./ItineraryActivity";

export interface ItineraryDay {
  date: string;
  location: string;
  description: string;
  activities: ItineraryActivity[];
}
