
import { CommonFetchStrategy } from '@/interfaces/CommonFetchStrategy';
import { supabase } from "@/lib/supabase";
import { Country } from '@/types/Country';

export class CountryFetchStrategy implements CommonFetchStrategy {
  async fetchData(): Promise<Country[]> {
    const response  = await supabase.from('country').select('*');
    return response.data as Country[];
  }
}
