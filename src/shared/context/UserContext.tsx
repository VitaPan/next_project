'use client';
import { createContext, useContext, useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import type { IUserCard } from "../types/userCard.interface";

interface IUserContext {
    users: IUserCard[];
    setUsers: (users: IUserCard[]) => void;
    deleteUser: (id: number) => void;
    addUser: (user: IUserCard) => void;
    updateUser: (updatedUser: IUserCard) => void;
    loading: boolean;
    error: string | null;
    reloadUsers: () => Promise<void>;
}

const UserContext = createContext<IUserContext | undefined>(undefined);

export const UserProvider = ({
    children,
    initialUsers,
}: {
    children: React.ReactNode;
    initialUsers: IUserCard[];
}) => {
    const [users, setUsers] = useLocalStorage<IUserCard[]>("users", initialUsers ?? []);
    const [loading, setLoading] = useState<boolean>(!initialUsers?.length);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (initialUsers?.length && users.length) {
            setLoading(false);
        }
    }, [initialUsers, users.length]);

    const reloadUsers = async () => {
        try {
            setError(null);
            setLoading(true);
            const res = await fetch("https://jsonplaceholder.typicode.com/users");
            if (!res.ok) throw new Error(`Ошибка загрузки: ${res.status}`);
            const data = await res.json();
            setUsers(data);
        } catch (e: unknown) {
            const message =
                e instanceof Error ? e.message : "Не удалось загрузить пользователей";
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    const deleteUser = (id: number) => {
        try {
            setUsers(users.filter(u => u.id !== id));
        } catch (e: unknown) {
            const message =
                e instanceof Error ? e.message : "Не удалось удалить пользователя";
            setError(message);
        }
    };

    const addUser = (user: IUserCard) => {
        try {
            setUsers([...users, user]);
        } catch (e: unknown) {
            const message =
                e instanceof Error ? e.message : "Не удалось добавить пользователя";
            setError(message);
        }
    };

    const updateUser = (updatedUser: IUserCard) => {
        try {
            setUsers(users.map(u => (u.id === updatedUser.id ? updatedUser : u)));
        } catch (e: unknown) {
            const message =
                e instanceof Error ? e.message : "Не удалось обновить пользователя";
            setError(message);
        }
    };

    return (
        <UserContext.Provider
            value={{ users, setUsers, deleteUser, addUser, updateUser, loading, error, reloadUsers }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    const ctx = useContext(UserContext);
    if (!ctx) throw new Error("useUserContext must be used within a UserProvider");
    return ctx;
};