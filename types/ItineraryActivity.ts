export interface ItineraryActivity {
    name: string;
    details: string;
    estimatedCost: {
      currency: string;
      amount: number;
    };
    googleMapsURL: string;
  }