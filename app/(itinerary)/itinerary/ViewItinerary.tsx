import ReactMarkdown from "react-markdown";

interface ViewItineraryProps {
  itinerary: string;
}

export default function ViewItinerary({ itinerary }: ViewItineraryProps) {
  return (
    <div>
      <h1>Generated Itinerary</h1>
      <div className="text-left">
        <ReactMarkdown>{itinerary}</ReactMarkdown>
      </div>
    </div>
  );
}
