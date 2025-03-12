'use client'; // This makes this file run on the client side

import { useEffect, FormEvent, useState } from 'react';
import { TravelType } from "@/types/TravelType";
import { logFormData } from '@/utils/logger';
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation';


interface ItineraryFormProps {
    travelType: TravelType[];
}

export default function ItineraryForm({ travelType }: ItineraryFormProps) {
    const supabase = createClient();
    
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState<any>(null)
    const [minBudget, setMinBudget] = useState<number | undefined>(undefined);
    const [maxBudget, setMaxBudget] = useState<number | undefined>(undefined);
    const [travelGroup, setTravelGroup] = useState<string | undefined>(undefined);
    const router = useRouter();  // Initialise the useRouter hook

    useEffect(() => {
            const setProfile = async () => {
                const session = await supabase.auth.getUser()
                console.log('session', session)
                if (session.data.user) {
                    setUser(session.data.user)

                    // Fetch user data from the 'users' table to prefill the form
                    const { data, error } = await supabase
                    .from('users')
                    .select('*')
                    .eq('id', session.data.user.id)
                    .single();

                    if (error) {
                        console.error('Error fetching user data:', error.message);
                        return;
                    }

                    if (data) {
                        setMinBudget(data.min_budget);
                        setMaxBudget(data.max_budget);
                        setTravelGroup(data.travel_group);
                    }
                }
            };
            setProfile();
        }, [])

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        logFormData(event);

        const formData = new FormData(event.target as HTMLFormElement);
        const minBudget = formData.get('min_budget');
        const maxBudget = formData.get('max_budget');
        const travelGroup = formData.get('travel_group');

        try {
            setIsLoading(true);
            
            // Get the authenticated user's ID
            if (!user) {
                setError("You must be logged in to save data.");
                return;
            }

            // Insert the data into the users table
            const { error } = await supabase
              .from('users')
              .upsert({  // Use `upsert` to either insert new or update existing user
                id: user.id,
                min_budget: minBudget,
                max_budget: maxBudget,
                travel_group: travelGroup,
              });
      
            if (error) {
              throw error;
            }
      
            console.log("Data saved!");
            // Redirect to the profile page
            router.push('/profile');

          } catch (error: any) {
            setError(error.message);
          } finally {
            setIsLoading(false);
          }
        }
    
    return (
        <div className="card bg-base-100 w-full max-w-2xl shrink-0 shadow-2xl items-center">
            <form className="card-body" onSubmit={onSubmit}>

                <div className="form-control mt-6">
                    <label className="label">
                        <span className="label-text font-bold">What is your Budget limit?</span>
                    </label>
                    <div className="flex w-full">
                        <div className="flex-grow place-items-center">
                            <input name="min_budget" type="number" placeholder="Min Budget" className="input input-bordered text-black" required min={0} value={minBudget || ''} onChange={(e) => setMinBudget(Number(e.target.value))}/>
                        </div>
                        <div className="divider divider-horizontal">-----</div>
                        <div className="flex-grow place-items-center">
                            <input name="max_budget" type="number" placeholder="Max Budget" className="input input-bordered text-black" required min={0} value={maxBudget || ''} onChange={(e) => setMaxBudget(Number(e.target.value))}/>
                        </div>
                    </div>
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
                                    name="travel_group"
                                    value={travel.type_name}
                                    checked={travelGroup === travel.type_name}
                                    onChange={() => setTravelGroup(travel.type_name)}
                                    className="radio radio-accent"
                                />
                            </label>
                        ))
                        }
                    </div>
                </div>

                <div className="form-control mt-6">
                <button className="btn" type="submit" disabled={isLoading}>
                    {isLoading ? 'Saving...' : 'Save'}
                </button>
                </div>
            </form>
        </div>
    )
}