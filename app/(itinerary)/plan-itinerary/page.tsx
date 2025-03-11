import { Country } from "@/types/Country";
import { TravelType } from "@/types/TravelType";
import { CommonDataFetcher } from "@/services/CommonDataFetcher";
import { TravelTypeFetchStrategy } from "@/services/TravelTypeFetchStrategy";
import { CountryFetchStrategy } from "@/services/CountryFetchStrategy";
import dynamic from "next/dynamic";

const ItineraryForm = dynamic(() =>
  import("@/app/(itinerary)/plan-itinerary/ItineraryForm").then(
    (mod) => mod.default
  )
);

export default async function PlanItinerary() {
  const dataFetcher = new CommonDataFetcher(new TravelTypeFetchStrategy());
  const travelData = (await dataFetcher.fetchData<TravelType[]>()) || [];
  dataFetcher.setStrategy(new CountryFetchStrategy());
  const countryData = (await dataFetcher.fetchData<Country[]>()) || [];

  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
      }}
    >
      <div className="hero-overlay bg-opacity-60">
        <div className="flex flex-col items-center text-neutral-content mb-8 font-bold">
          <h1 className="text-5xl mb-5 mt-8">Generate Your Itinerary</h1>
          <p className="mb-5">
            Embark on your dream adventure with just a few simple details. Smart
            Voyage will curate a personalized itinerary, crafted to match your
            unique preferences!
          </p>
        </div>
      </div>
      <div className="hero-content text-neutral-content text-center pt-16">
        <ItineraryForm
          countries={countryData}
          travelType={travelData}
        ></ItineraryForm>
      </div>
    </div>
  );
}
