"use client";

import { Suspense, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, LockKeyhole, Mail, Scissors } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";
import { toast } from "@/components/ui/toast";

const SignInContent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get("redirectTo") ?? "/";
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSignIn = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        const data = new FormData(event.currentTarget);
        const password = String(data.get("password") || "");

        try {
            const { error: signInError } = await authClient.signIn.email({
                email: String(data.get("email") || ""),
                password,
                rememberMe: data.get("remember") === "on",
                callbackURL: redirectTo,
            });

            if (signInError) {
                toast.add({
                    title: "Sign in failed",
                    description:
                        signInError.message || "Unable to sign in. Please try again.",
                    type: "error",
                });
                return;
            }

            toast.add({
                title: "Welcome back",
                description: "You have signed in successfully.",
                type: "success",
            });
            router.refresh();
            router.push(redirectTo);
        } catch (requestError) {
            toast.add({
                title: "Sign in failed",
                description:
                    requestError.message || "Unable to sign in. Please try again.",
                type: "error",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            const { error: signInError } = await authClient.signIn.social({
                provider: "google",
                callbackURL: redirectTo,
            });

            if (signInError) {
                toast.add({
                    title: "Google sign in failed",
                    description: signInError.message || "Unable to sign in with Google.",
                    type: "error",
                });
            }
        } catch (requestError) {
            toast.add({
                title: "Google sign in failed",
                description: requestError.message || "Unable to sign in with Google.",
                type: "error",
            });
        }
    };

    return (
        <main className="grid min-h-screen bg-card lg:h-screen lg:max-h-screen lg:grid-cols-[48%_52%]">
            <section className="relative hidden h-full overflow-hidden lg:block">
                <Image
                    src="/images/hero.png"
                    alt="A professional stylist working in a salon"
                    fill
                    priority
                    sizes="48vw"
                    className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-black/45" />

                <Link
                    href="/"
                    className="absolute left-10 top-9 flex items-center gap-3 text-white xl:left-14"
                >
                    <span className="grid size-11 place-items-center rounded-full border border-cream/80 text-cream">
                        <Scissors className="size-6" aria-hidden="true" />
                    </span>
                    <span className="font-heading text-4xl font-semibold tracking-tight">
                        SalonBook
                    </span>
                </Link>

                <div className="absolute inset-x-10 bottom-14 max-w-xl text-white xl:left-14">
                    <h1 className="font-heading text-5xl leading-[1.05] font-semibold xl:text-6xl">
                        Book Your Beauty &amp; Wellness Appointments Online
                    </h1>
                    <p className="mt-6 max-w-md text-lg leading-8 text-white/85">
                        Find your favorite services, book instantly, and enjoy a premium
                        salon experience.
                    </p>
                </div>
            </section>

            <section className="flex items-center justify-center overflow-y-auto px-6 py-12 sm:px-10 lg:px-16 xl:px-24">
                <div className="w-full max-w-xl">
                    <Link
                        href="/"
                        className="mb-12 flex items-center gap-3 text-charcoal lg:hidden"
                    >
                        <span className="grid size-10 place-items-center rounded-full border border-charcoal/50 text-charcoal">
                            <Scissors className="size-5" aria-hidden="true" />
                        </span>
                        <span className="font-heading text-3xl font-semibold tracking-tight">
                            SalonBook
                        </span>
                    </Link>

                    <div className="text-center">
                        <h1 className="font-heading text-4xl font-semibold tracking-tight text-charcoal sm:text-5xl">
                            Welcome Back
                        </h1>
                        <p className="mx-auto mt-4 max-w-md text-base leading-7 text-ash sm:text-lg">
                            Sign in to your SalonBook account to book appointments and manage
                            your visits.
                        </p>
                    </div>

                    <form onSubmit={handleSignIn} className="mt-10 space-y-5">
                        <label className="block">
                            <span className="mb-2 block text-sm font-semibold text-charcoal">
                                Email Address
                            </span>
                            <span className="relative block">
                                <Mail
                                    className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-ash"
                                    aria-hidden="true"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    autoComplete="email"
                                    required
                                    placeholder="Enter your email address"
                                    className="h-14 w-full rounded-lg border border-border bg-background px-12 text-base text-charcoal outline-none placeholder:text-ash focus:border-charcoal"
                                />
                            </span>
                        </label>

                        <label className="block">
                            <span className="mb-2 block text-sm font-semibold text-charcoal">
                                Password
                            </span>
                            <span className="relative block">
                                <LockKeyhole
                                    className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-ash"
                                    aria-hidden="true"
                                />
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    autoComplete="current-password"
                                    required
                                    placeholder="Enter your password"
                                    className="h-14 w-full rounded-lg border border-border bg-background px-12 pr-12 text-base text-charcoal outline-none placeholder:text-ash focus:border-charcoal"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 size-5 -translate-y-1/2 text-ash hover:text-charcoal"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? (
                                        <EyeOff className="size-5" />
                                    ) : (
                                        <Eye className="size-5" />
                                    )}
                                </button>
                            </span>
                        </label>

                        <div className="flex items-center justify-between gap-4 text-sm sm:text-base">
                            <label className="flex cursor-pointer items-center gap-2 text-charcoal">
                                <input
                                    type="checkbox"
                                    name="remember"
                                    className="size-4 rounded accent-charcoal"
                                />
                                Remember me
                            </label>
                            <Link
                                href="#"
                                className="font-semibold text-charcoal underline decoration-[#b89462] decoration-2 underline-offset-6 hover:text-ash"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="h-14 w-full rounded-lg bg-charcoal text-base font-semibold text-white transition-colors hover:bg-charcoal/85 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isLoading ? "Signing In..." : "Sign In"}
                        </button>
                    </form>

                    <div className="my-8 flex items-center gap-4 text-sm text-ash">
                        <span className="h-px flex-1 bg-border" />
                        or
                        <span className="h-px flex-1 bg-border" />
                    </div>

                    <button
                        type="button"
                        onClick={handleGoogleSignIn}
                        className="flex h-14 w-full items-center justify-center gap-3 rounded-lg border border-border bg-background text-base font-semibold text-charcoal transition-colors hover:bg-cream"
                    >
                        <FcGoogle className="size-6" aria-hidden="true" />
                        Continue with Google
                    </button>

                    <p className="mt-8 text-center text-sm text-ash sm:text-base">
                        Don&apos;t have an account?{" "}
                        <Link
                            href="/sign-up"
                            className="font-semibold text-charcoal underline decoration-[#b89462] decoration-2 underline-offset-8 hover:text-ash"
                        >
                            Sign Up
                        </Link>
                    </p>
                </div>
            </section>
        </main>
    );
};

const SignInPage = () => (
    <Suspense fallback={<main className="min-h-screen bg-card" />}>
        <SignInContent />
    </Suspense>
);

export default SignInPage;
