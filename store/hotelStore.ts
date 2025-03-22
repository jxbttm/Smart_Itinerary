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
      isSampleData: false,
      setHotelSearchData: (hotelSearchData: Hotel[]) => {
        set({ hotelSearchData: hotelSearchData });
        console.log("Updating store with data"); // Log when store is updated
      },
      clearHotelSearchData: () => set({ hotelSearchData: [] }),
    }),
    {
      name: "hotel-storage",
    }
  )
);

export default useHotelStore;
