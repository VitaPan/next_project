import Image from "next/image";
import Link from "next/link";

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-gradient-to-b from-background/80 to-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/40">
            <div className="container mx-auto h-14 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 hover:opacity-85 transition">
                    <Image
                        src="/worker-logo.png"
                        alt="Worker Logo"
                        width={28}
                        height={28}
                        priority
                    />
                    <span className="font-semibold tracking-tight">Worker</span>
                </Link>

                <nav className="hidden md:flex items-center gap-6 text-sm">
                    <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                        Home
                    </Link>
                </nav>
            </div>
        </header>
    );
}