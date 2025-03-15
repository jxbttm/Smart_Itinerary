import { GoogleGenerativeAI } from "@google/generative-ai";
import { ItineraryProps } from "./ItineraryProps";
import { ItinerarySchema } from "@/data/ItinerarySchema";

const apiKey: string = process.env.NEXT_PUBLIC_GEMINI_API_KEY ?? "";

if (!apiKey) {
  throw new Error("Missing GEMINI_API_KEY in environment variables");
}

const generationConfig = {
  temperature: 1, //More creative & less determinnistic
  topP: 0.95, 
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
  response_schema: ItinerarySchema
};

const genAI = new GoogleGenerativeAI(apiKey);

async function GenerateItinerary(itinerary: ItineraryProps) {
  const prompt = ` I am planning a trip to ${itinerary.country} from ${itinerary.startDate} to ${itinerary.endDate} with a budget between ${itinerary.minBudget} and ${itinerary.maxBudget}. 
                  The purpose of my trip is ${itinerary.preferences}, and I will be traveling with ${itinerary.travelGroup} and number of people is ${itinerary.numberPeople}.
                  Based on these details, suggest an itinerary with recommended places to visit, activities to do with plus.unsplash.com images urls, location, "timings": "9:00 AM - 6:00 PM" and estimated costs within my budget.
                  `;
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" , generationConfig});
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error generating itinerary:", error);
    return null;
  }
}

export default GenerateItinerary;
