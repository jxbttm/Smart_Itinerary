import { ItineraryProps } from "./ItineraryProps";
import { GeminiFacade } from "@/services/GeminiFacade";

async function generateWeatherForecast(itinerary: ItineraryProps) {
  const geminiFacade = new GeminiFacade();

  const prompt = `  Generate a weather forecast for ${itinerary.destination} from ${itinerary.startDate} to ${itinerary.endDate}. 
                    The forecast should include the temperature, and a description of the weather condition for each day. The weather conditions should include one of the following descriptions: clear sky, few clouds, scattered clouds, broken clouds, shower rain, rain, thunderstorm, snow, or mist. 
                    Ensure the forecast is based on typical weather patterns for this time of year in the specified location.
                    Ensure that the forecast has only one forecast for each day.
                    The forecast should be in JSON format.
                  `;

  const result = await geminiFacade.generateWeatherForecast(prompt);
  if (result != null) {
    return result;
  }
}

export default generateWeatherForecast;
