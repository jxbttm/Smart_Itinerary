"use client";

import { useHotels } from "@/hooks/useHotels";
import { Hotel } from "@/interfaces/Hotel";
import useHotelStore from "@/store/hotelStore";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Hotels() {
  const router = useRouter();
  // USESTATES
  const [query, setQuery] = useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const { getHotelQueryResult } = useHotels();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // FUNCTIONS AND VARIABLES
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
          if (getHotelData && getHotelData.data.length > 0) {
            setIsLoading(false);
            setHotelSearchData(getHotelData.data, getHotelData.isSampleData);
          }
        } else {
          setIsOpen(false);
          setHotelSearchData([], false);
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
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full flex-1 flex flex-col justify-center items-center">
      <div className="w-4/6 h-72 flex flex-col gap-8">
        <div className="text-3xl text-center w-full">Search For A Hotel</div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search for hotels...."
            className="input input-bordered w-full"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => {
              if (!query) setIsOpen(false);
            }}
          />

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
      </div>
    </div>
  );
}
