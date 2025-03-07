import { Hotel } from "@/interfaces/Hotel";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface HotelStoreState {
  hotelSearchData: Hotel[];
  setHotelSearchData: (hotelSearchData: Hotel[]) => void;
  clearHotelSearchData: () => void;
}

const useHotelStore = create<
  HotelStoreState,
  [["zustand/persist", HotelStoreState]]
>(
  persist(
    (set) => ({
      hotelSearchData: [],
      setHotelSearchData: (hotelSearchData) => set({ hotelSearchData }),
      clearHotelSearchData: () => set({ hotelSearchData: [] }),
    }),
    {
      name: "hotel-storage",
    }
  )
);

export default useHotelStore;
