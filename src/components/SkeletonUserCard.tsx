'use client';
import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonUserCard() {
    return (
        <div className="p-4 border rounded-2xl shadow-sm">
            <div className="mb-3">
                <Skeleton className="h-6 w-1/2" />
            </div>
            <div className="space-y-3">
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-2/3" />
            </div>
        </div>
    );
}