
import { CommonFetchStrategy } from '@/interfaces/CommonFetchStrategy';
import { createClientForServer } from '@/lib/supabase/server';
import { Country } from '@/types/Country';

export class CountryFetchStrategy implements CommonFetchStrategy {
  async fetchData(): Promise<Country[]> {
    const supabaseServer = await createClientForServer();
    const response  = await supabaseServer.from('country').select('*');
    return response.data as Country[];
  }
}
