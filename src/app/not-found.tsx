import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="mx-auto max-w-xl rounded-2xl border bg-gradient-to-b from-background/80 to-background/60 p-8 text-center shadow-sm">
                <div className="text-7xl font-bold leading-none tracking-tighter">404</div>
                <h1 className="mt-2 text-2xl font-semibold">Page not found</h1>
                <p className="mt-2 text-sm text-muted-foreground">
                    There is no such page you have been looking for.
                </p>

                <div className="mt-6 flex items-center justify-center gap-3">
                    <Button asChild>
                        <Link href="/">Back home</Link>
                    </Button>
                </div>
            </div>
        </main>
    );
}