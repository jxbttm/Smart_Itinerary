import { UserDemographics } from "./UserDemographics";

export interface User {
    id: string;
    name: string | "null";
    email?: string | null;
    avatarUrl: string | null;
    userDemographics?: UserDemographics | null;
}