import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const JoinWithUs = () => (
    <section className="bg-background py-16 sm:py-20 lg:pb-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">
            <p className="text-sm font-semibold tracking-[0.16em] text-ash uppercase">Join With Us</p>
            <h2 className="mt-2 font-heading text-4xl font-semibold tracking-tight text-charcoal sm:text-5xl">
                Grow Your Salon Business
            </h2>

            <div className="mt-9 grid overflow-hidden rounded-lg border border-border bg-cream lg:grid-cols-2">
                <div className="flex min-h-80 items-center px-7 py-14 sm:px-12 lg:px-16">
                    <div className="max-w-xl">
                        <p className="text-sm font-semibold tracking-[0.16em] text-ash uppercase">For salon professionals</p>
                        <h3 className="mt-3 font-heading text-3xl leading-tight font-semibold tracking-tight text-charcoal sm:text-4xl">
                            Reach more clients and simplify every booking.
                        </h3>
                        <p className="mt-5 max-w-lg text-base leading-7 text-charcoal/75 sm:text-lg">
                            Join our platform to showcase your services, reach more clients, and
                            manage bookings with ease.
                        </p>
                        <Link
                            href="/join-as-a-professional"
                            className="mt-8 inline-flex items-center gap-3 rounded-md bg-charcoal px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-charcoal/85 hover:shadow-lg sm:text-base"
                        >
                            Join SalonBook
                            <ArrowRight className="size-5" aria-hidden="true" />
                        </Link>
                    </div>
                </div>
                <div className="relative min-h-72 sm:min-h-96 lg:min-h-full">
                    <Image
                        src="/images/hero.jpg"
                        alt="Salon professionals ready to welcome clients"
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="object-cover object-[95%_center]"
                    />
                </div>
            </div>
        </div>
    </section>
);

export default JoinWithUs;
