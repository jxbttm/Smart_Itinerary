"use client";

import useHotelStore from "@/store/hotelStore";
import Image from "next/image";

export default function HotelSearch() {
  // FUNCTIONS AND VARIABLES
  const setHotelSearchData = useHotelStore((state) => state.setHotelSearchData);
  const hotelSearchData = useHotelStore((state) => state.hotelSearchData);

  return (
    <>
      {/** Each card */}

      <div className="flex-1 flex flex-col w-full justify-center items-center py-10">
        {hotelSearchData.length > 0 && (
          <ul className="w-5/6 flex flex-col gap-5">
            {hotelSearchData.map((data, index) => (
              <li key={index}>
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
                        {data.name}
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
                          Add to Itinerary!
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
