
import { Itinerary } from '@/types/Itinerary';
import { ItineraryDay } from '@/types/ItineraryDay';

interface ItineraryTimelineProps {
  itinerary: Itinerary;
}

export default function ItineraryTimeline({ itinerary }: ItineraryTimelineProps) {
  return (
    <div>
      {/* Check if itinerary and destination are available */}
      {itinerary && itinerary.destination ? (
        <h1>{itinerary.destination}</h1>
      ) : (
        <h1>Destination not available</h1>
      )}

      {/* Check if dates are available */}
      {itinerary && itinerary.dates ? (
        <p>{itinerary.dates}</p>
      ) : (
        <p>Dates not available</p>
      )}

      {/* Check if itinerary days are available */}
      {itinerary && itinerary.itinerary && itinerary.itinerary.length > 0 ? (
        itinerary.itinerary.map((day, index) => (
          <div key={index}>
            <h3>Day {index + 1} - {day.date}</h3>
            <p>Location: {day.location}</p>
            <p>Description: {day.description}</p>

            {/* Render activities */}
            <h4>Activities:</h4>
            <ul>
              {day.activities.map((activity, activityIndex) => (
                <li key={activityIndex}>
                  <strong>{activity.name}</strong>
                  <p>{activity.details}</p>
                  <a href={activity.googleMapsURL} target="_blank" rel="noopener noreferrer">
                    View on Map
                  </a>
                </li>
              ))}
            </ul>

            {/* Render accommodation */}
            <h4>Accommodation:</h4>
            <p>{day.accommodation.type} - Estimated Cost: {day.accommodation.estimatedCost.amount} {day.accommodation.estimatedCost.currency}</p>

            {/* Optionally render transportation if available */}
            {day.transportation && (
              <div>
                <h4>Transportation:</h4>
                <p>Type: {day.transportation.type}</p>
                <p>Estimated Cost: {day.transportation.estimatedCost.amount} {day.transportation.estimatedCost.currency}</p>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No itinerary days available</p>
      )}

      {/* Check if notes for estimated total cost are available */}
      {itinerary && itinerary.estimatedTotalCost ? (
        <h3>
          Estimated Total Cost: {itinerary.estimatedTotalCost.amount}{" "}
          {itinerary.estimatedTotalCost.currency}
        </h3>
      ) : (
        <h3>Estimated Total Cost not available</h3>
      )}

      {/* Check if importantNotes array is available */}
      {itinerary && itinerary.importantNotes && itinerary.importantNotes.length > 0 ? (
        <div>
          <h3>Important Notes:</h3>
          <ul>
            {itinerary.importantNotes.map((note, index) => (
              <li key={index}>{note}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No important notes available</p>
      )}
    </div>
  );
}
