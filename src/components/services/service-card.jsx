import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock3 } from "lucide-react";

const ServiceCard = ({ service }) => {
    return (
        <article className="group overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="relative aspect-[2.35/1] overflow-hidden">
                <Image
                    src={service.image}
                    alt={service.serviceName}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>
            <div className="p-5">
                <p className="text-sm text-ash">{service.category}</p>
                <div className="mt-1 flex items-start justify-between gap-4">
                    <h3 className="font-heading text-2xl leading-tight font-semibold text-charcoal">
                        {service.serviceName}
                    </h3>
                    <span className="shrink-0 pt-1 text-lg font-semibold text-charcoal">${service.price}</span>
                </div>
                <div className="mt-3 flex items-center gap-2 text-sm text-ash">
                    <Clock3 className="size-4" aria-hidden="true" />
                    {service.duration} min
                </div>
                <p className="mt-3 line-clamp-2 text-sm leading-6 text-ash">{service.description}</p>
                <Link
                    href={`/services/${service._id}`}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-charcoal transition-colors hover:text-ash"
                >
                    View Details
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
            </div>
        </article>
    )
};

export default ServiceCard;
