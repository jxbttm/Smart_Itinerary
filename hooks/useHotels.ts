"use client";

import { Hotel } from "@/interfaces/Hotel";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const useHotels = () => {
  const apiKey: string | undefined = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("Missing GEMINI_API_KEY in environment variables");
  }

  const genAI = new GoogleGenerativeAI(apiKey);

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
      "get on the website itself. Please give me the result in json parsable format. " +
      `The result should be standardised in this format:"
      address: string;
      description: string;
      image_url: string;
      name: string;
      price: string;
      rating: number;"` +
      `The query is "${query}"`;

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
      const result = await model.generateContent(prompt);
      const text = result.response.text();
      let isSampleData = false;

      // Data is not real and image urls are fake so don't use them
      if (
        text.includes(
          `I can't directly access and scrape real-time data from hotel websites, including images and pricing.`
        )
      ) {
        isSampleData = true;
      }
      const extractedJson = extractJsonFromText(text);
      return { data: JSON.parse(extractedJson) as Hotel[], isSampleData };
    } catch (error) {
      console.error("Error getting hotel results: ", error);
      return null;
    }
  };

  return { getHotelQueryResult };
};
