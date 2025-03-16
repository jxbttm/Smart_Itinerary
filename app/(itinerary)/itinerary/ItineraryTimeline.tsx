
import { ItineraryService } from '@/services/ItineraryService';
import { ItineraryTimelineProps } from './ItineraryTimelineProps';
import { createClient } from '@/lib/supabase/client'
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import Image from 'next/image'

export default function ItineraryTimeline({ itinerary, userId, itineraryId }: ItineraryTimelineProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const router = useRouter();

  // Fetch the current user session to get the logged-in user ID
  useEffect(() => {
    const fetchUser = async () => {
      const supabase = await createClient();
      const session = await supabase.auth.getUser();
      if (session.data.user) {
        setCurrentUser(session.data.user.id);
      }
    };

    fetchUser();
  }, []);

  async function SaveItinerary(): Promise<void> {
    setLoading(true);
    const supabase = await createClient();
    const session = await supabase.auth.getUser();
    if (session.data.user) {
      const { id } = session.data.user
      await ItineraryService.saveItinerary(id, itinerary)
      setLoading(false)
      router.push(`/profile/${id}`);
    }
  }

  // Check if the itinerary belongs to the current logged-in user
  const isViewingOwnItinerary = userId === "not null" && itineraryId === "not null";

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
          <div className="text-md font-black">{itinerary.accommodation.name}</div>
          <Image
            width={360}
            height={360}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Sydney_%28AU%29%2C_Bondi_Beach_--_2019_--_2354.jpg/640px-Sydney_%28AU%29%2C_Bondi_Beach_--_2019_--_2354.jpg"
            alt={itinerary.accommodation.name}
            style={{ width: "auto", height: "auto" }}
          />
          <div className="text-md flex items-center justify-center mt-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
              <path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 0 1-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004ZM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 0 1-.921.42Z" />
              <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v.816a3.836 3.836 0 0 0-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 0 1-.921-.421l-.879-.66a.75.75 0 0 0-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 0 0 1.5 0v-.81a4.124 4.124 0 0 0 1.821-.749c.745-.559 1.179-1.344 1.179-2.191 0-.847-.434-1.632-1.179-2.191a4.122 4.122 0 0 0-1.821-.75V8.354c.29.082.559.213.786.393l.415.33a.75.75 0 0 0 .933-1.175l-.415-.33a3.836 3.836 0 0 0-1.719-.755V6Z" clipRule="evenodd" />
            </svg>

            <span className='font-bold mr-2'>Estimated Price: </span> ${itinerary.accommodation.estimatedCost} {itinerary.demographics.currency}
          </div>

          <div className="divider divider-neutral font-bold">Activities</div>

          {/* Itinerary Days */}
          {itinerary.itineraryDays && itinerary.itineraryDays.length > 0 ? (
            <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
              {itinerary.itineraryDays.map((day, dayIndex) => (
                <li key={dayIndex}>
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
                  <div className={`mb-10 ${dayIndex % 2 === 0 ? 'timeline-start' : 'timeline-end'} ${dayIndex % 2 === 0 ? 'md:text-end' : 'md:text-start'}`}>
                    <time className="font-mono italic text-lg">Day {dayIndex + 1} - {day.date}</time>
                    <div className="text-md font-black">{day.description}</div>
                    {day.activities.map((each, activityIndex) => (
                      <div key={activityIndex} className='card bg-base-200 shadow-lg m-6 text-center'>
                        <span className='font-bold p-2'>{each.name}</span>
                        <figure>
                          <Image
                            width={360}
                            height={180}
                            src="https://plus.unsplash.com/premium_photo-1733306520547-1ffd55596459?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c3lkbmV5JTIwaGFyYm91JTIwYnJpZGdlfGVufDB8fDB8fHww"
                            alt={each.name}
                            style={{ width: "auto", height: "auto" }}
                          />
                        </figure>
                        <div className="card-body">
                          <div className="text-md ">{each.details}</div>
                          <div className="text-md flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                              <path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 0 1-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004ZM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 0 1-.921.42Z" />
                              <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v.816a3.836 3.836 0 0 0-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 0 1-.921-.421l-.879-.66a.75.75 0 0 0-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 0 0 1.5 0v-.81a4.124 4.124 0 0 0 1.821-.749c.745-.559 1.179-1.344 1.179-2.191 0-.847-.434-1.632-1.179-2.191a4.122 4.122 0 0 0-1.821-.75V8.354c.29.082.559.213.786.393l.415.33a.75.75 0 0 0 .933-1.175l-.415-.33a3.836 3.836 0 0 0-1.719-.755V6Z" clipRule="evenodd" />
                            </svg>

                            <span className='font-bold mr-2'>Estimated Price: </span> ${each.estimatedCost} {itinerary.demographics.currency}
                          </div>
                          <div className="text-md flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                              <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clipRule="evenodd" />
                            </svg>

                            <span className='font-bold mr-2'>Timings: </span> {each.timing}
                          </div>
                        </div>
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
                  <li key={index}>{index + 1}. {note}</li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-center">No important notes available</p>
          )}
          {/* Conditionally render the "Save Itinerary" button */}
          {!isViewingOwnItinerary && (
            <div className="mt-6">
              <button className="btn btn-outline" onClick={() => SaveItinerary()} disabled={loading}>
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="loading loading-spinner"></span>{" "}
                    Saving...
                  </span>
                ) : (
                  "Save Itinerary"
                )}
              </button>
            </div>
          )}
        </>
      ) : (
        <p>No itinerary available</p>
      )}
    </div>
  );
}
