export interface Hotel {
  address: { cityName: string; countryCode: string };
  geoCode: { latitude: number; longitude: number };
  hotelIds: string[];
  iataCode: string;
  id: number;
  name: string;
  relevance: number;
  subType: string;
  type: string;
}
