import React, { useState } from "react";
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
  const [itinerary, setItinerary] = useState<string>("");
  const prompt = `I am planning a trip to Singapore from 28-02-2025 to 03-03-2025 with a budget between $1000 and $1500. The purpose of my trip is More restaurants, and I will be traveling with family. Based on these details, suggest an itinerary with recommended places to visit, activities to do, and estimated costs within my budget.`;
  // const prompt = `I am planning a trip to ${country} from ${startDate} to ${endDate} with a budget between ${minBudget} and ${maxBudget}. The purpose of my trip is ${preferences}, and I will be traveling with ${travelGroup}. Based on these details, suggest an itinerary with recommended places to visit, activities to do, and estimated costs within my budget.`;
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5" });
    const result = await model.generateContent(prompt);
    setItinerary(result.response.text());

    console.log("Generated Itinerary:", itinerary);
    return itinerary;
  } catch (error) {
    console.error("Error generating itinerary:", error);
    return null;
  }
}

export default SubmitFormData;
