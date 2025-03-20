"use client";

import { useHotels } from "@/hooks/useHotels";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import HotelSuggestion from "../../../components/hotel/HotelSuggestion";
import hotelStore from "@/store/hotelStore";

export default function Hotels() {
  const router = useRouter();
  // USESTATES
  const [query, setQuery] = useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // FUNCTIONS AND VARIABLES
  const { getHotelQueryResult } = useHotels();
  const { useHotelStore } = hotelStore();
  const setHotelSearchData = useHotelStore((state) => state.setHotelSearchData);
  const hotelSearchData = useHotelStore((state) => state.hotelSearchData);

  // USEEFFECTS
  useEffect(() => {
    try {
      // This debounce function is to delay the search until the user finish typing
      const delayDebounceFn = setTimeout(async () => {
        if (query !== "") {
          setIsLoading(true);
          setIsOpen(true);
          setDebouncedQuery(query);
          // data return is in an array of 20 items
          const getHotelData = await getHotelQueryResult(query);
          if (getHotelData && getHotelData.length > 0) {
            setIsLoading(false);
            setHotelSearchData(getHotelData);
          }
        } else {
          setIsOpen(false);
          setHotelSearchData([]);
        }
      }, 500);
      return () => clearTimeout(delayDebounceFn);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [query]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      } else {
        if (hotelSearchData.length > 0) {
          setIsOpen(true);
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full flex-1 flex flex-col justify-center items-center">
      <div className="w-4/6 h-72 flex flex-col gap-8">
        <div className="text-3xl text-center w-full">Search For A Hotel</div>
        <div className="relative" ref={dropdownRef}>
          <label className="">
            <MagnifyingGlassIcon className="w-4 h-4 absolute left-3 top-4" />

            <input
              type="text"
              placeholder="Search for hotels...."
              className="input input-bordered w-full pl-8"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => {
                if (!query) setIsOpen(false);
              }}
            />
          </label>
          {isOpen && debouncedQuery && (
            <ul className="absolute z-50 mt-2 bg-base-300 rounded p-2 w-full max-h-48 overflow-y-auto">
              <div className="py-2 rounded">
                {isLoading && (
                  <div className="w-full flex flex-col justify-center items-center">
                    <span className="loading loading-spinner loading-xl"></span>
                  </div>
                )}
                {!isLoading && hotelSearchData && hotelSearchData.length > 0 ? (
                  hotelSearchData.map((hotel, index) => (
                    <li
                      className="hover:bg-gray-400 rounded p-2 cursor-pointer "
                      key={index}
                      onClick={() => {
                        router.push("/hotel/search");
                      }}
                    >
                      {hotel.name}
                    </li>
                  ))
                ) : (
                  <></>
                )}
              </div>
            </ul>
          )}
        </div>
        <HotelSuggestion />
      </div>
    </div>
  );
}
