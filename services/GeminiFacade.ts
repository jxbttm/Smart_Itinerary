import { GoogleGenerativeAI } from "@google/generative-ai";

export class GeminiFacade {
    private apiKey: string;
    private geminiModel: string;
    private genAI: GoogleGenerativeAI;

    constructor() {
        this.apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY ?? "";
        this.geminiModel = "gemini-2.0-flash";
        this.genAI = new GoogleGenerativeAI(this.apiKey);

        if (!this.apiKey) {
            throw new Error("Missing GEMINI_API_KEY in environment variables");
        }
    }

    public async generateContent(prompt: string, schema: Record<string, any>) {
        const generationConfig = {
            temperature: 1, //More creative & less deterministic
            topP: 0.95, // Reduce nonsencial tokens being generate
            topK: 40, // Reduce randomness
            maxOutputTokens: 8192, 
            responseMimeType: "application/json",
            response_schema: schema
        };
        try {
            const model = this.genAI.getGenerativeModel({ model: this?.geminiModel, generationConfig });
            const result = await model.generateContent(prompt);
            return result.response.text();
        } catch (error) {
            console.error("Error generating content:", error);
            return null;
        }
    }

    public async generateWeatherForecast(prompt: string) {
        const generationConfig = {
            temperature: 0.5,
            topP: 0.95,
            topK: 30,
            maxOutputTokens: 4096,
            responseMimeType: "application/json",
            
        };
        try {
            const model = this.genAI.getGenerativeModel({ model: this?.geminiModel, generationConfig });
            const result = await model.generateContent(prompt);
            return result.response.text();
        } catch (error) {
            console.error("Error generating content:", error);
            return null;
        }
    }

}