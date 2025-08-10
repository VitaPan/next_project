'use client'
import { UserProvider } from "@/shared/context/UserContext";
import { useEffect, useState } from "react";
import UserList from "./UserList";
import type { IUserCard } from "@/shared/types/userCard.interface";
interface Props {
    initialUsers: IUserCard[];
}


export default function UserWrapper({ initialUsers }: Props) {

    const [hasMounted, setHasMounted] = useState(false);
    useEffect(() => {
        setHasMounted(true);
    }, []);
    if (!hasMounted) return null;
    return (
        <UserProvider initialUsers={initialUsers}>
            <UserList />
        </UserProvider>
    );
}