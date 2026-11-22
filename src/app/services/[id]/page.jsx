import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  BadgeCheck,
  Check,
  ChevronRight,
  Clock3,
  Layers3,
  Tag,
} from "lucide-react";
import { getServiceImage } from "@/lib/service-images";
import { getServiceById } from "@/lib/actions/services";
import BookAppointmentModal from "@/components/services/appointment/book-appointment-modal";

const ServiceDetailsPage = async ({ params }) => {
  const { id } = await params;
  let service = {};

  try {
    service = await getServiceById(id);
  } catch {
    notFound();
  }

  if (!service) notFound();

  const image = getServiceImage(service);
  const highlights = [
    "Personalized consultation",
    `Professional ${service.category.toLowerCase()} service`,
    "Premium products and expert care",
    `A relaxing ${service.duration}-minute appointment`,
  ];

  return (
    <main className="bg-background pb-16 pt-24 sm:pb-20 sm:pt-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-sm text-ash"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 hover:text-charcoal"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Services
          </Link>
          <ChevronRight className="size-4 text-ash/60" aria-hidden="true" />
          <span className="font-semibold text-charcoal">Service Details</span>
        </nav>

        <div className="mt-8 grid items-start gap-8 xl:grid-cols-[minmax(0,1.65fr)_minmax(330px,0.85fr)] xl:gap-12">
          <div>
            <h1 className="font-heading text-4xl font-semibold tracking-tight text-charcoal sm:text-5xl">
              {service.serviceName}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm font-semibold text-charcoal sm:text-base">
              <span className="inline-flex items-center gap-2">
                <Clock3 className="size-5" />
                {service.duration} minutes
              </span>
              <span className="inline-flex items-center gap-2">
                <Tag className="size-5" />${service.price}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1.5 text-sm text-green-700">
                <span className="size-2 rounded-full bg-green-600" />
                Active
              </span>
            </div>

            <div className="relative mt-7 aspect-[16/9] overflow-hidden rounded-2xl bg-muted sm:aspect-[16/8.5]">
              <Image
                src={image}
                alt={service.serviceName}
                fill
                priority
                sizes="(min-width: 1280px) 720px, (min-width: 640px) 90vw, 100vw"
                className="object-cover"
              />
            </div>

            <section className="mt-7 max-w-3xl">
              <h2 className="font-heading text-2xl font-semibold text-charcoal">
                Description
              </h2>
              <p className="mt-2 text-sm leading-6 text-ash sm:text-base sm:leading-7">
                {service.description}
              </p>
            </section>

            <section className="mt-7">
              <h2 className="font-heading text-2xl font-semibold text-charcoal">
                Service Highlights
              </h2>
              <ul className="mt-3 space-y-2">
                {highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-center gap-3 text-sm text-charcoal sm:text-base"
                  >
                    <Check
                      className="size-5 shrink-0 text-[#684521]"
                      strokeWidth={2.5}
                      aria-hidden="true"
                    />
                    {highlight}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="rounded-2xl border border-border bg-card p-6 shadow-[0_10px_30px_rgba(60,42,29,0.08)]">
            <h2 className="flex items-center gap-3 font-heading text-2xl font-semibold text-charcoal">
              <BadgeCheck
                className="size-7 text-[#684521]"
                aria-hidden="true"
              />
              Service Information
            </h2>
            <div className="mt-5 border-y border-border">
              <div className="flex items-center justify-between gap-4 border-b border-border py-4 text-sm">
                <span className="flex items-center gap-3 font-medium">
                  <Layers3 className="size-5 text-[#684521]" />
                  Category
                </span>
                <b className="text-right">{service.category}</b>
              </div>
              <div className="flex items-center justify-between gap-4 border-b border-border py-4 text-sm">
                <span className="flex items-center gap-3 font-medium">
                  <Clock3 className="size-5 text-[#684521]" />
                  Duration
                </span>
                <b>{service.duration} minutes</b>
              </div>
              <div className="flex items-center justify-between gap-4 border-b border-border py-4 text-sm">
                <span className="flex items-center gap-3 font-medium">
                  <Tag className="size-5 text-[#684521]" />
                  Price
                </span>
                <b>${service.price}</b>
              </div>
              <div className="flex items-center justify-between gap-4 py-4 text-sm">
                <span className="flex items-center gap-3 font-medium">
                  <BadgeCheck className="size-5 text-[#684521]" />
                  Status
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                  <span className="size-2 rounded-full bg-green-600" />
                  Active
                </span>
              </div>
            </div>
            <BookAppointmentModal
              service={service}
              className="mt-6 inline-flex h-14 w-full items-center justify-center gap-3 rounded-xl bg-[#4c3019] px-5 text-base font-semibold text-white transition-colors hover:bg-[#684521]"
            />
          </aside>
        </div>
      </div>
    </main>
  );
};

export default ServiceDetailsPage;
