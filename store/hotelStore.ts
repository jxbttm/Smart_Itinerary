import { Hotel } from "@/interfaces/Hotel";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface HotelStoreState {
  hotelSearchData: Hotel[];
  setHotelSearchData: (hotelSearchData: Hotel[]) => void;
  clearHotelSearchData: () => void;
}
export default function hotelStore() {
  const useHotelStore = create<
    HotelStoreState,
    [["zustand/persist", HotelStoreState]]
  >(
    persist(
      (set) => ({
        hotelSearchData: [],
        isSampleData: false,
        setHotelSearchData: (hotelSearchData: Hotel[]) =>
          set({ hotelSearchData: hotelSearchData }),
        clearHotelSearchData: () => set({ hotelSearchData: [] }),
      }),
      {
        name: "hotel-storage",
      }
    )
  );

  return { useHotelStore };
}
