import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ServiceCard from "@/components/services/service-card";
import { getLimitServices } from "@/lib/actions/services";

const BrowseService = async () => {
    let services = [];

    try {
        services = await getLimitServices("status=active&limit=6");
    } catch {
        services = [];
    }

    return (
        <section className="bg-surface py-16 sm:py-20 lg:py-24">
            <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-sm font-semibold tracking-[0.16em] text-ash uppercase">
                            Featured Services
                        </p>
                        <h2 className="mt-2 font-heading text-4xl font-semibold tracking-tight text-charcoal sm:text-5xl">
                            Our Popular Services
                        </h2>
                    </div>
                    <Link
                        href="/services"
                        className="inline-flex items-center gap-2 self-start text-sm font-semibold text-charcoal transition-colors hover:text-ash sm:self-auto"
                    >
                        Browse All Services
                        <ArrowRight className="size-4" aria-hidden="true" />
                    </Link>
                </div>

                {services.length > 0 ? (
                    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {services.map((service) => (
                            <ServiceCard key={service._id} service={service} />
                        ))}
                    </div>
                ) : (
                    <p className="mt-10 text-ash">Services are unavailable right now. Please try again soon.</p>
                )}
            </div>
        </section>
    );
};

export default BrowseService;
