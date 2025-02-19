import { CommonFetchStrategy } from '@/interfaces/CommonFetchStrategy';

export class CommonDataFetcher {
  private strategy: CommonFetchStrategy;

  constructor(strategy: CommonFetchStrategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: CommonFetchStrategy) {
    this.strategy = strategy;
  }

  async fetchData<T>(): Promise<T | null> {
    try {
      return this.strategy.fetchData();
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  }
}
