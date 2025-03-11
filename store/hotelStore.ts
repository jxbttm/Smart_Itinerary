import { Hotel } from "@/interfaces/Hotel";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface HotelStoreState {
  hotelSearchData: Hotel[];
  isSampleData: boolean;
  setHotelSearchData: (hotelSearchData: Hotel[], isSampleData: boolean) => void;
  clearHotelSearchData: () => void;
}

const useHotelStore = create<
  HotelStoreState,
  [["zustand/persist", HotelStoreState]]
>(
  persist(
    (set) => ({
      hotelSearchData: [],
      isSampleData: false,
      setHotelSearchData: (hotelSearchData: Hotel[], isSampleData: boolean) =>
        set({ hotelSearchData: hotelSearchData, isSampleData: isSampleData }),
      clearHotelSearchData: () =>
        set({ hotelSearchData: [], isSampleData: false }),
    }),
    {
      name: "hotel-storage",
    }
  )
);

export default useHotelStore;
