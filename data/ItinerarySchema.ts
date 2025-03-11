export const ItinerarySchema = {
    type: "OBJECT",
    properties: {
        start_date: { type: "STRING" },
        end_date: { type: "STRING" },
        destination: { type: "STRING" },
        dates: { type: "STRING" },
        budget: {
            type: "OBJECT",
            properties: {
                currency: { type: "STRING", nullable: true },
                min: { type: "NUMBER" },
                max: { type: "NUMBER" }
            },
            required: ["min", "max"]
        },
        travelerType: { type: "STRING" },
        purpose: { type: "STRING" },
        itinerary: {
            type: "ARRAY",
            items: {
                type: "OBJECT",
                properties: {
                    date: { type: "STRING" },
                    location: { type: "STRING" },
                    description: { type: "STRING" },
                    activities: {
                        type: "ARRAY",
                        items: {
                            type: "OBJECT",
                            properties: {
                                name: { type: "STRING" },
                                details: { type: "STRING" },
                                estimatedCost: {
                                    type: "OBJECT",
                                    properties: {
                                        currency: { type: "STRING" },
                                        amount: { type: "NUMBER" }
                                    },
                                    required: ["currency", "amount"]
                                },
                                googleMapsURL: { type: "STRING" }
                            },
                            required: ["name", "details", "estimatedCost", "googleMapsURL"]
                        }
                    },
                    accommodation: {
                        type: "OBJECT",
                        properties: {
                            type: { type: "STRING" },
                            estimatedCost: {
                                type: "OBJECT",
                                properties: {
                                    currency: { type: "STRING" },
                                    amount: { type: "NUMBER" }
                                },
                                required: ["currency", "amount"]
                            }
                        },
                        required: ["type", "estimatedCost"]
                    }
                },
                required: ["date", "location", "description", "activities", "accommodation"]
            }
        },
        estimatedTotalCost: {
            type: "OBJECT",
            properties: {
                currency: { type: "STRING" },
                amount: { type: "NUMBER" },
                notes: { type: "STRING" }
            },
            required: ["currency", "amount", "notes"]
        },
        importantNotes: {
            type: "ARRAY",
            items: {
                type: "STRING"
            }
        }
    },
    required: [
        "start_date", "end_date", "destination", "dates", "budget",
        "travelerType", "purpose", "itinerary", "estimatedTotalCost", "importantNotes"
    ]
};
