import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const HeroBanner = () => {
    return (
        <section className="relative min-h-[620px] overflow-hidden bg-charcoal pt-20 lg:h-[560px] lg:min-h-[520px]">
            <div
                className="absolute inset-y-0 right-0 w-full opacity-25 sm:w-[70%] sm:opacity-45 lg:w-[58%] lg:opacity-100"
                style={{
                    WebkitMaskImage: "linear-gradient(to right, transparent, black 20%)",
                    maskImage: "linear-gradient(to right, transparent, black 20%)",
                }}
            >
                <Image
                    src="/images/hero.png"
                    alt="Hair stylist working on a client's hair"
                    fill
                    priority
                    sizes="(min-width: 1024px) 58vw, (min-width: 640px) 70vw, 100vw"
                    className="object-cover object-[center_35%]"
                />
            </div>
            <div className="relative z-10 mx-auto flex min-h-[540px] max-w-7xl items-center px-6 py-16 sm:px-10 lg:min-h-0 lg:px-12">
                <div className="w-full max-w-lg text-white lg:max-w-md">
                        <h1 className="font-heading text-4xl leading-[0.98] font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                            Your next great look starts here.
                        </h1>
                        <p className="mt-7 max-w-md text-base leading-7 text-white/85 sm:text-lg">
                            Discover professional salon services, book your appointment in
                            minutes, and look your best for every occasion.
                        </p>
                        <Link
                            href="/services"
                            className="mt-8 inline-flex items-center gap-3 rounded-md bg-cream px-6 py-3.5 text-sm font-semibold text-charcoal transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-lg sm:text-base"
                        >
                            Explore Salon Services
                            <ArrowRight className="size-5" aria-hidden="true" />
                        </Link>
                </div>
            </div>
        </section>
    );
};

export default HeroBanner;
