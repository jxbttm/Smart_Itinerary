import { BaseFetchStrategy } from "@/services/BaseFetchStrategy";
import { TravelTypeFetchStrategy } from "@/services/TravelTypeFetchStrategy";
import { FetchStrategyFactory } from "@/services/FetchStrategyFactory";

export const useFetchStrategy = () => {
    
      const fetchDataStrategy = async (dataType: string) => {
        const dataFetcher = new BaseFetchStrategy(
            new TravelTypeFetchStrategy(), 
            new FetchStrategyFactory()
        );
        dataFetcher.setStrategy(dataType)
        return await dataFetcher.fetchData()

      };

    return {fetchDataStrategy}

}