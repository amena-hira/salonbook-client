import Image from "next/image";
import ServicesCatalog from "@/components/services/services-catalog";
import { getCategories, getServices } from "@/lib/actions/services";

const ServicesPage = async ({ searchParams }) => {
    const { category = "" } = await searchParams;
    let services = [];
    let categories = [];

    try {
        [services, categories] = await Promise.all([
            getServices("status=active"),
            getCategories(),
        ]);
    } catch {
        services = [];
        categories = [];
    }

    return (
        <>
            <section className="relative overflow-hidden bg-secondary pt-10">
                <div className="absolute inset-y-0 right-0 hidden w-1/2 sm:block">
                    <Image
                        src="/images/services/towels.jpg"
                        alt="Relaxing salon treatment"
                        fill
                        priority
                        sizes="50vw"
                        className="object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-linear-to-r from-secondary via-secondary/25 to-transparent" />
                </div>
                <div className="relative mx-auto max-w-7xl px-6 py-10 sm:px-10 sm:py-20 lg:px-12">
                    <p className="text-sm font-semibold tracking-[0.16em] text-ash uppercase">Our Services</p>
                    <h1 className="mt-3 font-heading text-5xl font-semibold tracking-tight text-charcoal sm:text-6xl">
                        Browse Services
                    </h1>
                    <p className="mt-4 max-w-xl text-base leading-7 text-charcoal/75 sm:text-lg">
                        Explore our wide range of professional salon services and book your appointment easily.
                    </p>
                </div>
            </section>
            <ServicesCatalog services={services} categories={categories} initialCategoryId={category} />
        </>
    );
};

export default ServicesPage;
