"use client"

import { useSession } from '@/lib/auth-client';
import { Bell } from 'lucide-react';
import UserMenu from './user-menu';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const AuthenticateNavItem = () => {
    const { data: session } = useSession();
    
    return (
        <>
            {session?.user ? (
                <div className="flex items-center gap-1 sm:gap-3">
                    <button
                        type="button"
                        aria-label="Notifications"
                        className="relative hidden size-10 place-items-center rounded-full transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream sm:grid"
                    >
                        <Bell className="size-6" />
                        <span className="absolute right-1 top-1 size-2.5 rounded-full bg-red-500 ring-2 ring-charcoal" />
                    </button>
                    <UserMenu user={session?.user} />
                </div>
            ) : (
                <Link
                    href="/sign-in"
                    className="hidden rounded-md border border-white/50 px-6 py-2.5 text-sm font-medium transition-colors hover:bg-white/10 sm:block"
                >
                    Sign In
                </Link>
            )}

        </>
    );
};

export default AuthenticateNavItem;
