'use client';
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useUserContext } from "@/shared/context/UserContext";
import { PAGES } from "@/config/pages.config";
import { EditUserModal } from "./EditUserModal";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ErrorCard } from "@/components/ui/ErrorCard";
import SkeletonUserCard from "@/components/SkeletonUserCard";
import { motion } from 'framer-motion';

function Field({ label, value }: { label: string; value: React.ReactNode }) {
    return (
        <div className="text-sm">
            <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
            <div className="font-medium">{value}</div>
        </div>
    );
}

export default function SingleUser() {
    const { users, loading, error, reloadUsers, updateUser } = useUserContext();
    const params = useParams();
    const searchParams = useSearchParams();
    const router = useRouter();

    const id = Number(params.id);
    const user = users.find(u => u.id === id);

    if (loading) return <SkeletonUserCard />;

    if (error) return <ErrorCard message={error} onRetry={reloadUsers} />;

    if (!user) {
        return <ErrorCard message="User not found" onRetry={() => router.push(PAGES.HOME)} />;
    }

    const query = new URLSearchParams();
    const search = searchParams.get("search");
    const company = searchParams.get("company");
    if (search) query.set("search", search);
    if (company) query.set("company", company);

    return (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
            <Card className="mb-4">
                <CardHeader><CardTitle>{user.name}</CardTitle></CardHeader>
                <CardContent className="grid gap-3 sm:grid-cols-2">
                    <Field label="Username" value={user.username} />
                    <Field label="Email" value={user.email} />
                    <Field label="Company" value={user.company.name} />
                    <Field label="Phone" value={user.phone} />
                    <Field label="Address" value={`${user.address.city}, ${user.address.street}, ${user.address.zipcode}`} />
                    <Field
                        label="Website"
                        value={<a href={`https://${user.website}`} target="_blank" rel="noreferrer" className="underline">{user.website}</a>}
                    />
                </CardContent>
                <CardFooter className="gap-2">
                    <EditUserModal user={user} mode="edit" onSave={updateUser} />
                    <Button onClick={() => router.push(`${PAGES.HOME}?${query.toString()}`)}>Back home</Button>
                </CardFooter>
            </Card>
        </motion.div>
    );
}