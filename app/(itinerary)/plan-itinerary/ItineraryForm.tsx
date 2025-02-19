'use client'; // This makes this file run on the client side

import { FormEvent } from 'react'
import { Country } from "@/types/Country";
import { TravelType } from "@/types/TravelType";
import CountrySearch from '@/app/(itinerary)/plan-itinerary/CountrySearch';
import { logFormData } from '@/utils/logger';

interface ItineraryFormProps {
    countries: Country[];
    travelType: TravelType[];
}

export default function ItineraryForm({ countries, travelType }: ItineraryFormProps) {

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        logFormData(event);
    }

    return (
        <div className="card bg-base-100 w-full max-w-2xl shrink-0 shadow-2xl items-center">
            <form className="card-body" onSubmit={onSubmit}>
                {countries && countries.length > 0 && (
                    <CountrySearch countries={countries} />
                )}
                <div className="form-control mt-6">
                    <label className="label">
                        <span className="label-text font-bold">How long is your Trip?</span>
                    </label>
                    <div className="flex w-full">
                        <input name="start_date" type="date" placeholder="Start Date" className="input input-bordered flex-grow text-black " required />
                        <div className="divider divider-horizontal">-----</div>
                        <input name="end_date" type="date" placeholder="End Date" className="input input-bordered flex-grow text-black " required />
                    </div>
                </div>

                <div className="form-control mt-6">
                    <label className="label">
                        <span className="label-text font-bold">What is your Budget limit?</span>
                    </label>
                    <div className="flex w-full">
                        <div className="flex-grow place-items-center">
                            <input name="min_budget" type="number" placeholder="Min Budget" className="input input-bordered text-black" required min={0} />
                        </div>
                        <div className="divider divider-horizontal">-----</div>
                        <div className="flex-grow place-items-center">
                            <input name="max_budget" type="number" placeholder="Max Budget" className="input input-bordered text-black" required min={0} />
                        </div>
                    </div>
                </div>

                <div className="form-control mt-6">
                    <label className="label">
                        <span className="label-text font-bold">What do you like to see more?</span>
                    </label>
                    <label className="label cursor-pointer">
                        <span className="label-text">More attractions</span>
                        <input name="more_attractions" value="More Attractions" type="checkbox" className="checkbox" />
                    </label>
                    <label className="label cursor-pointer">
                        <span className="label-text">More scenery</span>
                        <input name="more_scenery" value="More Scenery" type="checkbox" className="checkbox" />
                    </label>
                    <label className="label cursor-pointer">
                        <span className="label-text">More restaurants</span>
                        <input name="more-restaurants" value="More Restaurants" type="checkbox" className="checkbox" />
                    </label>
                </div>

                <div className="form-control mt-6">
                    <label className="label">
                        <span className="label-text font-bold">Who are you traveling with?</span>
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                        {travelType && travelType.map((travel) => (
                            <label key={travel.type_code} className="label cursor-pointer">
                                <span className="label-text pr-4">{travel.type_name}</span>
                                <input
                                    type="radio"
                                    name="travel-group"
                                    value={travel.type_name}
                                    className="radio radio-accent"
                                />
                            </label>
                        ))
                        }
                    </div>
                </div>
                <div className="form-control mt-6">
                    <button className="btn" type="submit">Generate</button>
                </div>
            </form>
        </div>
    )
}