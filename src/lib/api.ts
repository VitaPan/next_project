import { API_URL } from "@/config/constants";
import type { IUserCard } from "@/shared/types/userCard.interface";

export default async function GetApi(): Promise<IUserCard[]> {
    const res = await fetch(API_URL, {
        next: { revalidate: 3600 },
    });
    if (!res.ok) {
        throw new Error(`Failed to fetch users: ${res.status}`);
    }
    return res.json();
}