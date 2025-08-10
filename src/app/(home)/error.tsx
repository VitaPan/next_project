'use client';
import { useEffect } from 'react';
import { ErrorCard } from '@/components/ui/ErrorCard';

export default function Error({ error, reset }: { error: Error; reset: () => void; }) {
    useEffect(() => { console.error(error); }, [error]);
    return <ErrorCard message={error.message} onRetry={reset} />;
}