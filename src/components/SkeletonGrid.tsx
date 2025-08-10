'use client';
import { Skeleton } from '@/components/ui/skeleton';

export default function SkeletonGrid({ count = 6 }: { count?: number }) {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 p-4 bg-gradient-to-b from-background/80 to-background/60 rounded-2xl border shadow-sm">
            {Array.from({ length: count }).map((_, i) => (
                <div
                    key={i}
                    className="p-4 border rounded-xl shadow-sm bg-card"
                >
                    <div className="flex items-center gap-3 mb-3">
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <div className="flex-1">
                            <Skeleton className="h-4 w-2/3 mb-2" />
                            <Skeleton className="h-3 w-1/2" />
                        </div>
                    </div>
                    <div className="space-y-2 mb-4">
                        <Skeleton className="h-3 w-5/6" />
                        <Skeleton className="h-3 w-3/5" />
                    </div>
                    <div className="flex gap-2">
                        <Skeleton className="h-9 w-24 rounded-xl" />
                        <Skeleton className="h-9 w-28 rounded-xl" />
                    </div>
                </div>
            ))}
        </div>
    );
}