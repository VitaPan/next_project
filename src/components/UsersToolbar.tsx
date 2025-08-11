'use client';
import { Input } from '@/components/ui/input';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';
import { EditUserModal } from '@/components/EditUserModal';
import type { IUserCard } from '@/shared/types/userCard.interface';

export default function UsersToolbar({
    search, setSearch,
    selectedCompany, setSelectedCompany,
    companyList
}: {
    search: string; setSearch: (v: string) => void;
    selectedCompany: string; setSelectedCompany: (v: string) => void;
    companyList: string[];
}) {
    const createEmptyUser = (): IUserCard => ({
        id: Date.now(),
        name: '', username: '', email: '', phone: '', website: '',
        address: { city: '', street: '', zipcode: '' },
        company: { name: '' },
    });

    return (
        <div className="sticky top-14 z-10 mb-4 px-4 py-3 bg-gradient-to-b from-background/80 to-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/40 rounded-b-2xl">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="relative sm:w-[280px]">
                    <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 opacity-60" />
                    <Input
                        placeholder="Search by name..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-8"
                        aria-label="Search users by name"
                    />
                </div>

                <Select value={selectedCompany} onValueChange={setSelectedCompany}>
                    <SelectTrigger className="sm:w-[220px]" aria-label="Filter by company">
                        <SelectValue placeholder="Company" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All companies</SelectItem>
                        {companyList.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                </Select>

                <Button
                    variant="secondary"
                    className="shadow-sm"
                    onClick={() => { setSearch(''); setSelectedCompany('all'); }}
                    disabled={!search && selectedCompany === 'all'}
                    aria-label="Reset search and filters"
                >
                    Reset
                </Button>

                <div className="sm:ml-auto">
                    <EditUserModal user={createEmptyUser()} mode="add" />
                </div>
            </div>
        </div>
    );
}