"use client";

import {
  BuildingLibraryIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

export default function Hotels() {
  return (
    <div className="w-full h-full flex justify-center py-10">
      <div className="w-11/12 flex flex-col gap-8">
        <label className="input input-bordered flex items-center gap-2 w-full h-full">
          <input type="text" className="grow" placeholder="Search" />
          <MagnifyingGlassIcon className="h-5 w-5" />
        </label>

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
