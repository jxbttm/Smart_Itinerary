// /app/api/test-login/route.ts (App Router)
import { User } from "@/types/User";

export async function GET(): Promise<User | null> {
        // During Cypress tests, return a fake user
        // If you want to test with a real user, change the id, email, name and avatar_url to your own values in Supabase
        
        return {
            id: "test-user-id",
            email: "testuser@example.com",
            name: "Test User",
            avatar_url: "",
        };
            
    }
