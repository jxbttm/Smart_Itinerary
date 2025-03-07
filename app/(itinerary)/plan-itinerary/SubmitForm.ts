import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey: string = process.env.GEMINI_API_KEY ?? "";

if (!apiKey) {
  throw new Error("Missing GEMINI_API_KEY in environment variables");
}

const genAI = new GoogleGenerativeAI(apiKey);

async function SubmitFormData(
  country: string,
  startDate: string,
  endDate: string,
  minBudget: number,
  maxBudget: number,
  preferences: string[],
  travelGroup: string
) {
  const prompt = `I am planning a trip to ${country} from ${startDate} to ${endDate} with a budget between ${minBudget} and ${maxBudget}. The purpose of my trip is ${preferences}, and I will be traveling with ${travelGroup}. Based on these details, suggest an itinerary with recommended places to visit, activities to do, and estimated costs within my budget.`;
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const result = await model.generateContent(prompt);
    console.log("Generated Itinerary:", result.response.text());
    return result.response.text();
  } catch (error) {
    console.error("Error generating itinerary:", error);
    return null;
  }
}

export default SubmitFormData;
