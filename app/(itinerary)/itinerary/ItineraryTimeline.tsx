
import { ItineraryService } from '@/services/ItineraryService';
import { ItineraryTimelineProps } from './ItineraryTimelineProps';
import { createClient } from '@/lib/supabase/client'
import { useState } from 'react';
import { useRouter } from "next/navigation";

export default function ItineraryTimeline({ itinerary }: ItineraryTimelineProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  async function SaveItinerary(): Promise<void> {
    setLoading(true);
    const supabase = await createClient();
    const session = await supabase.auth.getUser();
    if (session.data.user) {
      const { id } = session.data.user
      await ItineraryService.saveItinerary(id, itinerary)
      setLoading(false)
      router.push('/profile');
    }
  }

  return (
    <div className="flex flex-col items-center p-8">
      {itinerary ? (
        <>
          {/* Destination */}
          {itinerary.destination ? (
            <h1 className="text-4xl font-bold">{itinerary.destination}</h1>
          ) : (
            <h1>Destination not available</h1>
          )}

          {/* Dates */}
          {itinerary.startDate && itinerary.endDate ? (
            <p>{itinerary.startDate} to {itinerary.endDate}</p>
          ) : (
            <p>Dates not available</p>
          )}

          {itinerary.demographics.travelerType ? (
            <p>({itinerary.demographics.travelerType})</p>
          ) : itinerary.travelerType ? (
            <p>({itinerary.travelerType})</p>
          ) : (
            <p>Traveler Type not available</p>
          )}

          <div className="divider divider-neutral font-bold">Accommodation</div>

          <div>{itinerary.accommodation.name} ({itinerary.accommodation.estimatedCost} {itinerary.demographics.currency})</div>

          <div className="divider divider-neutral font-bold">Activities</div>

          {/* Itinerary Days */}
          {itinerary.itineraryDays && itinerary.itineraryDays.length > 0 ? (
            <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
              {itinerary.itineraryDays.map((day, index) => (
                <li key={index}>
                  <div className="timeline-middle">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="timeline-start mb-10 md:text-end">
                    <time className="font-mono italic">Day {index + 1} - {day.date}</time>
                    <div className="text-lg font-black">{day.description}</div>
                    <div className="text-lg font-black">Activities</div>
                    {day.activities.map((each, index) => (
                      <div key={index}>
                        <div className="text-md ">{each.name} ({each.estimatedCost} {itinerary.demographics.currency})</div>
                        <div className="text-md ">{each.details}</div>
                        <div className="text-md">{each.timing}</div>
                      </div>
                    ))}
                  </div>
                  <hr />
                </li>

              ))}
            </ul>
          ) : (
            <p>No itinerary days available</p>
          )}

          <div className="divider divider-neutral font-bold">Additional Information</div>

          {/* Estimated Total Cost */}
          {itinerary.estimatedTotalCost ? (
            <h3 className="text-lg font-black">
              Estimated Total Cost: {itinerary.estimatedTotalCost}{" "}
              {itinerary.demographics.currency}
            </h3>
          ) : (
            <h3>Estimated Total Cost not available</h3>
          )}

          {/* Important Notes */}
          {itinerary.importantNotes && itinerary.importantNotes.length > 0 ? (
            <div className="flex flex-col items-center justify-center text-center">
              <h3 className="text-lg font-black">Important Notes:</h3>
              <ul>
                {itinerary.importantNotes.map((note, index) => (
                  <li key={index}>{note}</li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-center">No important notes available</p>
          )}
          
        </>
      ) : (
        <p>No itinerary available</p>
      )}
    </div>
  );
}
