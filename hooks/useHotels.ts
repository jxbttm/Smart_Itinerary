"use client";

import { HotelSchema } from "@/data/HotelSchema";
import { Hotel } from "@/interfaces/Hotel";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const useHotels = () => {
  const apiKey: string | undefined = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("Missing GEMINI_API_KEY in environment variables");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const generationConfig = {
    temperature: 1, //More creative & less determinnistic
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
    response_schema: HotelSchema,
  };

  const extractJsonFromText = (text: string) => {
    const regex = /```json([\s\S]*?)```/;
    const match = text.match(regex);
    if (match && match[1]) {
      const jsonString = match[1].trim();
      const finalData = JSON.stringify(jsonString);
      try {
        return JSON.parse(finalData);
      } catch (error) {
        console.error("Invalid JSON:", error);
        return null;
      }
    }
    return null;
  };
  const getHotelQueryResult = async (query: string) => {
    const prompt =
      "I am creating a search bar for hotels, and I would like you to suggest hotels based on my search query. " +
      "Can you include hotel details suchs as ratings, price, description, image address of any image you can " +
      "get on the website itself. " +
      `The query is "${query}"`;

    try {
      const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash",
        generationConfig,
      });
      const result = await model.generateContent(prompt);
      const text = result.response.text();
      return JSON.parse(text) as Hotel[];
    } catch (error) {
      console.error("Error getting hotel results: ", error);
      return null;
    }
  };

  return { getHotelQueryResult };
};
