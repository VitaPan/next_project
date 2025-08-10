'use client';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ErrorCard({ message, onRetry }: { message: string; onRetry?: () => void }) {
    return (
        <div className="p-6 border rounded-2xl bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 shrink-0" />
                <span className="font-medium">{message}</span>
            </div>
            {onRetry && (
                <Button
                    variant="outline"
                    onClick={onRetry}
                    className="ml-auto border-red-300 hover:bg-red-100 dark:border-red-700 dark:hover:bg-red-800"
                >
                    Retry
                </Button>
            )}
        </div>
    );
}