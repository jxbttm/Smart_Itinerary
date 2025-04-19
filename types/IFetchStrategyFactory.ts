import { IBaseFetchStrategy } from '@/types/IBaseFetchStrategy';

export interface IFetchStrategyFactory{
    createStrategy(dataType: string): IBaseFetchStrategy
}