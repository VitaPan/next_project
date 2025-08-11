'use client';
import { useRouter } from "next/navigation";
import { PAGES } from "@/config/pages.config";
import { useUserContext } from "@/shared/context/UserContext";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { IUserCard } from "@/shared/types/userCard.interface";
import { Mail, Building2, Globe, Trash2, User2 } from 'lucide-react';
import { motion } from 'framer-motion';

function AvatarInitials({ name }: { name: string }) {
    const initials = name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase() || '?';
    return (
        <div className="h-12 w-12 rounded-full grid place-items-center bg-primary/10 text-primary font-semibold">
            {initials}
        </div>
    );
}

export function UserCard(props: IUserCard) {
    const router = useRouter();
    const { onRemove } = useUserContext();

    const goDetails = () => {
        const search = new URLSearchParams(window.location.search);
        router.push(`${PAGES.PROFILE(props.id)}?${search.toString()}`);
    };

    return (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.18 }}>
            <Card className="rounded-2xl hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center gap-3">
                    <AvatarInitials name={props.name} />
                    <div>
                        <CardTitle className="text-base sm:text-lg">{props.name}</CardTitle>
                        <div className="text-xs text-muted-foreground flex items-center gap-1"><User2 className="h-3.5 w-3.5" /> {props.username}</div>
                    </div>
                </CardHeader>

                <CardContent className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 opacity-70" /><span>{props.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 opacity-70" /><span>{props.company.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 opacity-70" />
                        <a href={`https://${props.website}`} className="underline underline-offset-2 hover:no-underline" target="_blank" rel="noreferrer">{props.website}</a>
                    </div>
                </CardContent>

                <CardFooter className="flex gap-2">
                    <Button
                        onClick={goDetails}
                        className="flex-1"
                        aria-label={`Edit user ${props.name}`}
                    >
                        Details/ Edit
                    </Button>
                    <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => onRemove(props.id)}
                        aria-label="Remove user"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </CardFooter>
            </Card>
        </motion.div>
    );
}