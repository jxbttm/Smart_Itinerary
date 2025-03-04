"use client";

import { useHotels } from "@/hooks/useHotels";
import { Hotel } from "@/types/Hotel";
import {
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Hotels() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [isDropdownHidden, setIsDropdownHidden] = useState<boolean>(false);
  const { getHotelNameAutoComplete } = useHotels();

  useEffect(() => {
    // This debounce function is to delay the search until the user finish typing
    const delayDebounceFn = setTimeout(async () => {
      if (searchTerm !== "") {
        // data return is in an array of 20 items
        const getHotels = await getHotelNameAutoComplete(searchTerm);
        if (getHotels?.data?.length > 0) {
          setHotels([...getHotels.data]);
          setIsDropdownHidden(false);
        }
          
      } else {
        setHotels([]);
      }
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return (
    <div className="w-full h-full flex justify-center py-10">
      <div className="w-11/12 flex flex-col gap-8">
        <div className="relative">
          <label
            className="input input-bordered flex items-center gap-2 w-full"
          >
            <input
              type="text"
              autoComplete="on"
              onChange={(e) => setSearchTerm(e.target.value)}
              className="grow"
              placeholder="Search"
            />
            <MagnifyingGlassIcon className="h-5 w-5" />
          </label>
          <ul
            className={`absolute z-50 mt-2 bg-base-100 rounded p-2 w-full max-h-60 overflow-y-auto ${
              isDropdownHidden ? "hidden" : ""
            }`}
          >
            <div className="py-2">
            {hotels.length > 0 ? (
              hotels.map((hotel, index) => <li className="hover:bg-gray-400 rounded p-2 cursor-pointer " key={index}>{hotel.name}</li>)
            ) : (
              <></>
            )}
            </div>
            
          </ul>
        </div>

        {/** Each card */}
        <div className="card card-side text-white w-full bg-base-100">
          <figure className="w-1/5">
            <Image
              src="/images/building.jpg"
              alt="Building"
              width={320}
              height={320}
              className="w-full"
            />
          </figure>
          <div className="flex flex-row w-full">
            <div className="flex flex-col justify-between w-5/6 border-r p-4">
              <h1 className="text-2xl capitalize font-medium">
                hilton garden inn singapore
              </h1>
              <div>ratings and reviews</div>
              <div>price points</div>
            </div>
            <div className="flex flex-col justify-between w-1/6 p-4">
              <div className="flex justify-center text-2xl font-medium h-full items-center">
                $229
              </div>
              <div className="flex justify-center">
                <button className="btn bg-base-300 w-3/4 hover:bg-gray-400 hover:text-white">
                  Hurry! Select
                </button>
              </div>
            </div>
          </div>
        </div>
        {/** Each card */}
        <div className="card card-side text-white w-full bg-base-100">
          <figure className="w-1/5">
            <Image
              src="/images/building.jpg"
              alt="Building"
              width={320}
              height={320}
              className="w-full"
            />
          </figure>
          <div className="flex flex-row w-full">
            <div className="flex flex-col justify-between w-5/6 border-r p-4">
              <h1 className="text-2xl capitalize font-medium">
                hilton garden inn singapore
              </h1>
              <div>ratings and reviews</div>
              <div>price points</div>
            </div>
            <div className="flex flex-col justify-between w-1/6 p-4">
              <div className="flex justify-center text-2xl font-medium h-full items-center">
                $229
              </div>
              <div className="flex justify-center">
                <button className="btn bg-base-300 w-3/4 hover:bg-gray-400 hover:text-white">
                  Hurry! Select
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
