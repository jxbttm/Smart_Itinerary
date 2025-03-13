import Rating from "@/components/hotel/Rating";
import { Hotel } from "@/interfaces/Hotel";
import { HotelService } from "@/services/HotelService";
import itineraryStore from "@/store/itineraryStore";
import Image from "next/image";
import Swal from "sweetalert2";

export default function HotelSearchResultCard({
  isSuggestion = false,
  hotelSearchData,
}: {
  isSuggestion?: boolean;
  hotelSearchData: Hotel[];
}) {
  // variables
  const { useItineraryStore } = itineraryStore();
  const itinerary = useItineraryStore((state) => state.itinerary);

  // functions
  const addHotelToItinerary = async (
    itineraryId: string | null | undefined,
    hotel: Hotel
  ): Promise<void> => {
    if (itineraryId) {
      Swal.fire({
        background: "#23282e",
        color: "#FFFFFF",
        title: "Confirmation",
        icon: "question",
        text: "Are you sure you want to add it to your itinerary?",
        cancelButtonText: "No",
        showCancelButton: true,
        confirmButtonText: "Yes!",
        showLoaderOnConfirm: true,
        preConfirm: async () => {
          try {
            const itinerary_id = parseInt(itineraryId);
            const id = await HotelService.saveHoteltoItinerary(
              itinerary_id,
              hotel
            );
            if (id) return id;
          } catch (error) {
            Swal.showValidationMessage(
              `Error saving hotel to itinerary: ${error}`
            );
            console.error("Error saving hotel to itinerary:", error);
          }
        },
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            background: "#23282e",
            color: "#FFFFFF",
            title: `Success`,
            text: "You have successfully added this hotel to your Itinerary!",
            icon: "success",
          });
        }
      });
    }
  };

  return (
    <div className="flex-1 flex flex-col w-full justify-center items-center py-10">
      {hotelSearchData.length > 0 && (
        <ul
          className={`flex flex-col ${isSuggestion ? "w-full" : "w-5/6"} gap-5`}
        >
          {hotelSearchData.map((data, index) => (
            <li key={index}>
              <div className="card card-side text-white w-full bg-base-100">
                <figure className="w-1/5">
                  <Image
                    src={"/images/building.jpg"}
                    alt="Building"
                    width={320}
                    height={320}
                    className="w-full"
                  />
                </figure>
                <div className="flex flex-row w-full">
                  <div className="flex flex-col justify-between w-5/6 border-r p-4">
                    <h1 className="text-2xl capitalize font-medium">
                      {data.name}
                    </h1>
                    <Rating rating={data.rating} />
                    <div className="overflow-hidden text-ellipsis max-h-12 line-clamp-2">
                      {data.description}
                    </div>
                  </div>
                  <div className="flex flex-col justify-between w-1/6 p-4">
                    <div className="flex flex-col justify-center h-full items-center">
                      <span className="text-2xl font-medium">{data.price}</span>
                      <span className="text-xs">per night</span>
                    </div>
                    <div className="flex justify-center">
                      <button
                        onClick={() => {
                          addHotelToItinerary(itinerary?.id, data);
                        }}
                        className="btn bg-base-300 w-3/4 hover:bg-gray-400 hover:text-white"
                      >
                        Add to Itinerary
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
