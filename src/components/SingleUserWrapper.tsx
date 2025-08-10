'use client'

import { useEffect, useState } from "react";
import { useLocalStorage } from "@/shared/hooks/useLocalStorage";
import { UserProvider } from "@/shared/context/UserContext";
import SingleUser from "./SingleUser";
import type { IUserCard } from "@/shared/types/userCard.interface";

export default function SingleUserWrapper() {
    const [hasMounted, setHasMounted] = useState(false);
    const [users] = useLocalStorage<IUserCard[]>("users", []);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) return null;

    return (
        <UserProvider initialUsers={users}>
            <SingleUser />
        </UserProvider>
    );
}