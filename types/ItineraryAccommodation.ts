export interface ItineraryAccommodation {
  type: string;
  estimatedCost: {
    currency: string;
    amount: number;
  };
}