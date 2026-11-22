import Image from "next/image";
import Link from "next/link";
import { Eye, ImagePlus, LockKeyhole, Mail, Scissors, UserRound } from "lucide-react";

const SignUpPage = () => (
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

            <Link href="/" className="absolute left-10 top-9 flex items-center gap-3 text-white xl:left-14">
                <span className="grid size-11 place-items-center rounded-full border border-cream/80 text-cream">
                    <Scissors className="size-6" aria-hidden="true" />
                </span>
                <span className="font-heading text-4xl font-semibold tracking-tight">SalonBook</span>
            </Link>

            <div className="absolute inset-x-10 bottom-14 max-w-xl text-white xl:left-14">
                <h1 className="font-heading text-5xl leading-[1.05] font-semibold xl:text-6xl">
                    Book Your Beauty &amp; Wellness Appointments Online
                </h1>
                <p className="mt-6 max-w-md text-lg leading-8 text-white/85">
                    Discover top salon services, book instantly, and look your best — anytime, anywhere.
                </p>
            </div>
        </section>

        <section className="flex items-center justify-center overflow-y-auto px-6 py-12 sm:px-10 lg:px-16 xl:px-24">
            <div className="w-full max-w-xl">
                <Link href="/" className="mb-12 flex items-center gap-3 text-charcoal lg:hidden">
                    <span className="grid size-10 place-items-center rounded-full border border-charcoal/50 text-charcoal">
                        <Scissors className="size-5" aria-hidden="true" />
                    </span>
                    <span className="font-heading text-3xl font-semibold tracking-tight">SalonBook</span>
                </Link>

                <div className="text-center">
                    <h2 className="font-heading text-4xl font-semibold tracking-tight text-charcoal sm:text-5xl">
                        Create an Account
                    </h2>
                    <p className="mx-auto mt-4 max-w-md text-base leading-7 text-ash sm:text-lg">
                        Join SalonBook to book appointments, track your visits, and get exclusive offers.
                    </p>
                </div>

                <form className="mt-10 space-y-5">
                    <label className="block">
                        <span className="mb-2 block text-sm font-semibold text-charcoal">Full Name</span>
                        <span className="relative block">
                            <UserRound className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-ash" aria-hidden="true" />
                            <input type="text" name="name" autoComplete="name" placeholder="Enter your full name" className="h-14 w-full rounded-lg border border-border bg-background px-12 text-base text-charcoal outline-none placeholder:text-ash focus:border-charcoal" />
                        </span>
                    </label>

                    <label className="block">
                        <span className="mb-2 block text-sm font-semibold text-charcoal">Email Address</span>
                        <span className="relative block">
                            <Mail className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-ash" aria-hidden="true" />
                            <input type="email" name="email" autoComplete="email" placeholder="Enter your email address" className="h-14 w-full rounded-lg border border-border bg-background px-12 text-base text-charcoal outline-none placeholder:text-ash focus:border-charcoal" />
                        </span>
                    </label>

                    <label className="block">
                        <span className="mb-2 block text-sm font-semibold text-charcoal">Password</span>
                        <span className="relative block">
                            <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-ash" aria-hidden="true" />
                            <input type="password" name="password" autoComplete="new-password" placeholder="Create a password" className="h-14 w-full rounded-lg border border-border bg-background px-12 pr-12 text-base text-charcoal outline-none placeholder:text-ash focus:border-charcoal" />
                            <Eye className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-ash" aria-hidden="true" />
                        </span>
                    </label>

                    <label className="block">
                        <span className="mb-2 block text-sm font-semibold text-charcoal">Profile Image</span>
                        <span className="flex h-14 cursor-pointer items-center gap-3 rounded-lg border border-dashed border-border bg-background px-4 text-sm text-ash transition-colors hover:border-charcoal">
                            <ImagePlus className="size-5 shrink-0" aria-hidden="true" />
                            <span>Upload your profile image</span>
                            <input type="file" name="image" accept="image/*" className="ml-auto max-w-40 text-xs text-ash file:mr-2 file:rounded file:border-0 file:bg-cream file:px-2 file:py-1 file:text-xs file:font-medium file:text-charcoal" />
                        </span>
                    </label>

                    <button type="button" className="mt-3 h-14 w-full rounded-lg bg-charcoal text-base font-semibold text-white transition-colors hover:bg-charcoal/85">
                        Sign Up
                    </button>
                </form>

                <p className="mt-7 text-center text-sm text-ash sm:text-base">
                    Already have an account?{" "}
                    <Link href="/sign-in" className="font-semibold text-charcoal underline decoration-[#b89462] decoration-2 underline-offset-8 hover:text-ash">
                        Sign In
                    </Link>
                </p>
            </div>
        </section>
    </main>
);

export default SignUpPage;
