import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
    CalendarDays,
    CheckCircle2,
    ChevronRight,
    Clock3,
    Heart,
    Home,
    Layers3,
    Tag,
} from "lucide-react";
import { getServiceImage } from "@/lib/service-images";
import { getServiceById, getServices } from "@/lib/actions/services";

const ServiceDetailsPage = async ({ params }) => {
    const { id } = await params;
    let service = {};

    try {
        service = await getServiceById(id);
    } catch {
        notFound();
    }


    if (!service) notFound();

    const highlights = [
        "Personalized consultation",
        `Professional ${service.category.toLowerCase()} service`,
        "Premium products and expert care",
        `A relaxing ${service.duration}-minute appointment`,
    ];

    return (
        <main className="bg-background pt-24 pb-16 sm:pt-28 sm:pb-20">
            <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">
                <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-ash">
                    <Link href="/" className="inline-flex items-center gap-2 hover:text-charcoal">
                        <Home className="size-4" aria-hidden="true" />
                        Home
                    </Link>
                    <ChevronRight className="size-4" aria-hidden="true" />
                    <Link href="/services" className="hover:text-charcoal">Browse Services</Link>
                    <ChevronRight className="size-4" aria-hidden="true" />
                    <span className="text-charcoal">Service Details</span>
                </nav>

                <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-muted">
                        <Image
                            src={getServiceImage(service)}
                            alt={service.serviceName}
                            fill
                            priority
                            sizes="(min-width: 1024px) 52vw, 100vw"
                            className="object-cover"
                        />
                        <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-charcoal shadow-sm">
                            <span className="size-2.5 rounded-full bg-green-500" />
                            Active
                        </span>
                    </div>

                    <div className="flex flex-col">
                        <span className="w-fit rounded-md bg-cream px-3 py-1.5 text-sm font-semibold text-charcoal">
                            {service.category}
                        </span>
                        <h1 className="mt-5 font-heading text-4xl leading-tight font-semibold tracking-tight text-charcoal sm:text-5xl">
                            {service.serviceName}
                        </h1>
                        <p className="mt-5 text-base leading-7 text-ash sm:text-lg">
                            {service.description}
                        </p>

                        <div className="mt-7 grid divide-y divide-border border-y border-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                            <div className="py-4 sm:px-4 sm:first:pl-0">
                                <Layers3 className="size-6 text-[#b89462]" aria-hidden="true" />
                                <p className="mt-2 text-sm text-ash">Category</p>
                                <p className="mt-1 font-semibold text-charcoal">{service.category}</p>
                            </div>
                            <div className="py-4 sm:px-4">
                                <Clock3 className="size-6 text-[#b89462]" aria-hidden="true" />
                                <p className="mt-2 text-sm text-ash">Estimated Duration</p>
                                <p className="mt-1 font-semibold text-charcoal">{service.duration} minutes</p>
                            </div>
                            <div className="py-4 sm:px-4 sm:last:pr-0">
                                <Tag className="size-6 text-[#b89462]" aria-hidden="true" />
                                <p className="mt-2 text-sm text-ash">Price</p>
                                <p className="mt-1 font-semibold text-charcoal">${service.price}</p>
                            </div>
                        </div>

                        <div className="mt-7">
                            <h2 className="font-heading text-2xl font-semibold text-charcoal">Service Highlights</h2>
                            <ul className="mt-4 space-y-3">
                                {highlights.map((highlight) => (
                                    <li key={highlight} className="flex items-center gap-3 text-sm text-charcoal sm:text-base">
                                        <CheckCircle2 className="size-5 shrink-0 text-[#b89462]" aria-hidden="true" />
                                        {highlight}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="mt-9 grid gap-3 sm:grid-cols-[1fr_auto]">
                            <Link
                                href={`/book-appointment?service=${service._id}`}
                                className="inline-flex h-14 items-center justify-center gap-3 rounded-md bg-charcoal px-6 text-base font-semibold text-white transition-colors hover:bg-charcoal/85"
                            >
                                <CalendarDays className="size-5" aria-hidden="true" />
                                Book Appointment
                            </Link>
                            <button type="button" className="inline-flex h-14 items-center justify-center gap-3 rounded-md border border-charcoal/40 px-6 text-sm font-semibold text-charcoal transition-colors hover:bg-cream">
                                <Heart className="size-5" aria-hidden="true" />
                                Add to Favorites
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ServiceDetailsPage;
