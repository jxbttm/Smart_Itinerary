
import { IBaseFetchStrategy } from '@/types/IBaseFetchStrategy';
import { TravelTypeFetchStrategy } from '@/services/TravelTypeFetchStrategy';
import { CountryFetchStrategy } from '@/services/CountryFetchStrategy';
import { IFetchStrategyFactory } from '@/types/IFetchStrategyFactory';

export class FetchStrategyFactory implements IFetchStrategyFactory {
    createStrategy(dataType: string): IBaseFetchStrategy {
      switch (dataType) {
        case 'travel':
          return new TravelTypeFetchStrategy();
        case 'country':
          return new CountryFetchStrategy();
        default:
          throw new Error(`Unknown data type: ${dataType}`);
      }
    }
  }