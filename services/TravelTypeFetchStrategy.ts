import { CommonFetchStrategy } from "@/interfaces/CommonFetchStrategy";
import { createClientForServer } from "@/lib/supabase/server";
import { TravelType } from "@/types/TravelType";

export class TravelTypeFetchStrategy implements CommonFetchStrategy {
  async fetchData(): Promise<TravelType[]> {
    const supabaseServer = await createClientForServer();

    const response = await supabaseServer.from("travel_type").select("*");
    return response.data as TravelType[];
  }
}
