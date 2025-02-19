
import { CommonFetchStrategy } from '@/interfaces/CommonFetchStrategy';
import { supabase } from "@/lib/supabase";
import { TravelType } from '@/types/TravelType';

export class TravelTypeFetchStrategy implements CommonFetchStrategy {
  async fetchData(): Promise<TravelType[]> {
    const response  = await supabase.from('travel_type').select('*');
    return response.data as TravelType[];
  }
}
