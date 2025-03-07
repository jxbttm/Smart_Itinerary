"use client"; // This makes this file run on the client side

import { FormEvent, useState } from "react";
import { Country } from "@/types/Country";
import { TravelType } from "@/types/TravelType";
import CountrySearch from "@/app/(itinerary)/plan-itinerary/CountrySearch";

import SubmitForm from "./SubmitForm";
import ViewItinerary from "../itinerary/ViewItinerary";

interface ItineraryFormProps {
  countries: Country[];
  travelType: TravelType[];
}

export default function ItineraryForm({
  countries,
  travelType,
}: ItineraryFormProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [itinerary, setItinerary] = useState<any>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    try {
      const res = await SubmitForm(
        searchCountry,
        startDate,
        endDate,
        minBudget,
        maxBudget,
        preferences,
        travelGroup
      );
      setItinerary(res);
    } catch (error) {
      throw new Error("Error submitting form data");
    } finally {
      setLoading(false);
    }
  }

  //#region Country
  const [searchCountry, setSearchCountry] = useState<string>("");
  const handleSearchTermChange = (term: string) => {
    setSearchCountry(term); // Update the searchTerm in the parent component
  };

  //#endregion

  //#region Trip duration Input
  const [startDate, setStartDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  //#endregion

  //#region Budget Input
  const [minBudget, setMinBudget] = useState<number>(0);
  const [maxBudget, setMaxBudget] = useState<number>(0);
  //#endregion

  //#region Preferences Input
  const [preferences, setPreferences] = useState<string[]>([]);

  const handlCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setPreferences((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };
  //#endregion

  //#region Travel Group Input
  const [travelGroup, setTravelGroup] = useState<string>("");
  //#endregion

  return (
    <div className="col">
      <div className="card bg-base-100 w-full max-w-2xl shrink-0 shadow-2xl items-center pb-2">
        {loading && (
          <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-10">
            <span className="loading loading-spinner text-white text-2xl"></span>
          </div>
        )}
        <form className="card-body relative" onSubmit={onSubmit}>
          <fieldset disabled={loading} className="w-full">
            {countries && countries.length > 0 && (
              <CountrySearch
                countries={countries}
                onSearchTermChange={handleSearchTermChange}
              />
            )}
            <div className="form-control mt-6">
              <label className="label">
                <span className="label-text font-bold">
                  How long is your Trip?
                </span>
              </label>
              <div className="flex w-full">
                <input
                  name="start_date"
                  type="date"
                  placeholder="Start Date"
                  className="input input-bordered flex-grow text-black "
                  required
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <div className="divider divider-horizontal">-----</div>
                <input
                  name="end_date"
                  type="date"
                  placeholder="End Date"
                  className="input input-bordered flex-grow text-black "
                  required
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>

            <div className="form-control mt-6">
              <label className="label">
                <span className="label-text font-bold">
                  What is your Budget limit?
                </span>
              </label>
              <div className="flex w-full">
                <div className="flex-grow place-items-center">
                  <input
                    name="min_budget"
                    type="number"
                    placeholder="Min Budget"
                    className="input input-bordered text-black"
                    required
                    step="0.01"
                    min={0}
                    value={minBudget}
                    onChange={(e) => {
                      const inputValue = Number(e.target.value);
                      if (!isNaN(inputValue)) {
                        setMinBudget(parseFloat(inputValue.toFixed(2)));
                      }
                    }}
                  />
                </div>
                <div className="divider divider-horizontal">-----</div>
                <div className="flex-grow place-items-center">
                  <input
                    name="max_budget"
                    type="number"
                    placeholder="Max Budget"
                    className="input input-bordered text-black"
                    required
                    step="0.01"
                    min={0}
                    value={maxBudget}
                    onChange={(e) => {
                      const inputValue = Number(e.target.value);
                      if (!isNaN(inputValue)) {
                        setMaxBudget(parseFloat(inputValue.toFixed(2)));
                      }
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="form-control mt-6">
              <label className="label">
                <span className="label-text font-bold">
                  What do you like to see more?
                </span>
              </label>
              <label className="label cursor-pointer">
                <span className="label-text">More attractions</span>
                <input
                  name="more_attractions"
                  value="More Attractions"
                  type="checkbox"
                  className="checkbox"
                  onChange={handlCheckBoxChange}
                />
              </label>
              <label className="label cursor-pointer">
                <span className="label-text">More scenery</span>
                <input
                  name="more_scenery"
                  value="More Scenery"
                  type="checkbox"
                  className="checkbox"
                  onChange={handlCheckBoxChange}
                />
              </label>
              <label className="label cursor-pointer">
                <span className="label-text">More restaurants</span>
                <input
                  name="more-restaurants"
                  value="More Restaurants"
                  type="checkbox"
                  className="checkbox"
                  onChange={handlCheckBoxChange}
                />
              </label>
            </div>

            <div className="form-control mt-6">
              <label className="label">
                <span className="label-text font-bold">
                  Who are you traveling with?
                </span>
              </label>
              <div className="grid grid-cols-2 gap-4">
                {travelType &&
                  travelType.map((travel) => (
                    <label
                      key={travel.type_code}
                      className="label cursor-pointer"
                    >
                      <span className="label-text pr-4">
                        {travel.type_name}
                      </span>
                      <input
                        type="radio"
                        name="travel-group"
                        value={travel.type_name}
                        className="radio radio-accent"
                        onChange={(e) => setTravelGroup(e.target.value)}
                      />
                    </label>
                  ))}
              </div>
            </div>
            <div className="form-control mt-6">
              <button
                className="btn btn-primary"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="loading loading-spinner"></span>{" "}
                    Generating...
                  </span>
                ) : (
                  "Generate"
                )}
              </button>
            </div>
          </fieldset>
        </form>
      </div>

      {itinerary && (
        <div className="card bg-base-100 w-full max-w-2xl shrink-0 shadow-2xl p-4 mt-4">
          <ViewItinerary itinerary={itinerary} />
        </div>
      )}
    </div>
  );
}
