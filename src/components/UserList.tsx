'use client';

import { useMemo, useState, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useUserContext } from '@/shared/context/UserContext';
import UsersToolbar from '@/components/UsersToolbar';
import SkeletonGrid from '@/components/SkeletonGrid';
import { UserCard } from '@/components/UserCard';
import { ErrorCard } from '@/components/ui/ErrorCard';

export default function UserList() {
    const { users, loading, error, reloadUsers } = useUserContext();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [search, setSearch] = useState(searchParams.get('search') || '');
    const [selectedCompany, setSelectedCompany] = useState(searchParams.get('company') || 'all');

    useEffect(() => {
        const t = setTimeout(() => {
            const params = new URLSearchParams();
            if (search) params.set('search', search);
            if (selectedCompany !== 'all') params.set('company', selectedCompany);
            router.replace(params.size ? `${pathname}?${params.toString()}` : pathname);
        }, 250);
        return () => clearTimeout(t);
    }, [search, selectedCompany, pathname, router]);

    const companyList = useMemo(() => {
        const unique = new Set(users.map(u => u.company.name));
        return Array.from(unique);
    }, [users]);

    if (loading) return (
        <div className="grid gap-4">
            <SkeletonGrid count={6} />
        </div>
    );

    if (error) return (
        <div className="grid gap-4">
            <ErrorCard message={error} onRetry={reloadUsers} />
        </div>
    );


    const filteredUsers = users.filter(u => {
        const byName = u.name.toLowerCase().includes(search.toLowerCase());
        const byCompany = selectedCompany === 'all' || u.company.name === selectedCompany;
        return byName && byCompany;
    });

    return (
        <div className="grid gap-4">
            <UsersToolbar
                search={search}
                setSearch={setSearch}
                selectedCompany={selectedCompany}
                setSelectedCompany={setSelectedCompany}
                companyList={companyList}
            />

            {filteredUsers.length === 0 ? (
                <div className="text-sm text-neutral-500">No users found</div>
            ) : (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredUsers.map(u => (
                        <UserCard key={u.id} {...u} />
                    ))}
                </div>
            )}
        </div>
    );
}
