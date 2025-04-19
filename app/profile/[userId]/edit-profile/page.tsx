import { TravelType } from "@/types/TravelType";
import { useFetchStrategy } from "@/hooks/useFetchStrategy";
import dynamic from 'next/dynamic';

const ItineraryForm = dynamic(() => import('@/app/profile/[userId]/edit-profile/EditProfileForm'));

export default async function EditProfile() {
  const { fetchDataStrategy }  = useFetchStrategy();
  const travelData = await fetchDataStrategy("travel") as TravelType[];

  return (
    <div className="hero min-h-screen">
      <div className="hero-overlay bg-opacity-60">
        <div className="flex flex-col items-center text-neutral-content mb-8 font-bold">
          <h1 className="text-5xl mb-5 mt-8">Edit Profile</h1>
        </div>
      </div>
      <div className="hero-content text-neutral-content text-center pt-16">
        {/* Pass travelData and userId as props to the ItineraryForm */}
        <ItineraryForm travelType={travelData}></ItineraryForm>
      </div>
    </div>
  )
}
