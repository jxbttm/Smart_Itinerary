import { TravelType } from "@/types/TravelType";
import { CommonDataFetcher } from "@/services/CommonDataFetcher";
import { TravelTypeFetchStrategy } from "@/services/TravelTypeFetchStrategy";
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation'; // For handling missing userId

// Dynamically import the ItineraryForm component
const ItineraryForm = dynamic(() => import('@/app/profile/[userId]/edit-profile/EditProfileForm'));

// This function gets the userId from the dynamic route and fetches necessary data
export default async function PlanItinerary({ params }: { params: { userId: string } }) {
  // Fetch travel data (using your custom fetcher)
  const dataFetcher = new CommonDataFetcher(new TravelTypeFetchStrategy());
  const travelData = await dataFetcher.fetchData<TravelType[]>() || [];

  // You can fetch user data if needed by userId here or handle it inside the form component


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
