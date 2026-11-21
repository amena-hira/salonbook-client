import Link from "next/link";
import { ArrowLeft, SearchX } from "lucide-react";

const NotFound = () => (
    <main className="flex flex-1 items-center justify-center bg-surface px-6 py-28 text-center">
        <div className="max-w-md">
            <span className="mx-auto grid size-16 place-items-center rounded-full bg-cream text-charcoal">
                <SearchX className="size-8" aria-hidden="true" />
            </span>
            <p className="mt-6 text-sm font-semibold tracking-[0.16em] text-ash uppercase">Error 404</p>
            <h1 className="mt-2 font-heading text-5xl font-semibold text-charcoal">Page not found</h1>
            <p className="mt-4 text-base leading-7 text-ash">
                The page you are looking for does not exist or may have moved.
            </p>
            <Link
                href="/"
                className="mt-8 inline-flex items-center gap-2 rounded-md bg-charcoal px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-charcoal/85"
            >
                <ArrowLeft className="size-4" aria-hidden="true" />
                Return Home
            </Link>
        </div>
    </main>
);

export default NotFound;
