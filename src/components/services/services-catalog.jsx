"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Filter, SlidersHorizontal } from "lucide-react";
import EmptyServices from "@/components/services/empty-services";
import ServiceCard from "@/components/services/service-card";
import ServiceFilterPriceRange from "./service-filter-price-range";
import ServiceFilterDuration from "./service-filter-duration";
import ServiceFilterSearch from "./service-filter-search";

const durationOptions = [
    { label: "Up to 30 min", value: "short" },
    { label: "31 – 60 min", value: "medium" },
    { label: "61 – 90 min", value: "long" },
    { label: "More than 90 min", value: "extended" },
];

const ServicesCatalog = ({ services, categories, initialFilters }) => {
    const router = useRouter();
    const [filters, setFilters] = useState(initialFilters);
    const activeCategories = categories.filter((category) => category.status === "active");

    const createUrlSearch = (nextFilters) => {
        const params = new URLSearchParams({
            status: "active",
            sortBy: "price",
            order: nextFilters.sort === "price-desc" ? "desc" : "asc",
        });

        if (nextFilters.category) params.set("category", nextFilters.category);
        if (nextFilters.search.trim()) params.set("search", nextFilters.search.trim());
        if (nextFilters.minimumPrice !== "") params.set("minPrice", nextFilters.minimumPrice);
        if (nextFilters.maximumPrice !== "") params.set("maxPrice", nextFilters.maximumPrice);
        if (nextFilters.durations.length > 0) params.set("duration", nextFilters.durations.join(","));

        return params;
    };

    const handleCategory = (category) => {
        const nextFilters = { ...filters, category };
        setFilters(nextFilters);
        router.push(`/services?${createUrlSearch(nextFilters).toString()}`);
    };

    const handleSearch = (search) => {
        const nextFilters = { ...filters, search };
        setFilters(nextFilters);
        router.push(`/services?${createUrlSearch(nextFilters).toString()}`);
    };

    const handlePriceRange = (changes) => {
        const nextFilters = { ...filters, ...changes };
        setFilters(nextFilters);
        router.push(`/services?${createUrlSearch(nextFilters).toString()}`);
    };

    const handleDuration = (durations) => {
        const nextFilters = { ...filters, durations };
        setFilters(nextFilters);
        router.push(`/services?${createUrlSearch(nextFilters).toString()}`);
    };

    const handleSort = (sort) => {
        const nextFilters = { ...filters, sort };
        setFilters(nextFilters);
        router.push(`/services?${createUrlSearch(nextFilters).toString()}`);
    };

    const clearFilters = () => {
        const nextFilters = {
            category: "",
            search: "",
            minimumPrice: "",
            maximumPrice: "",
            durations: [],
            sort: "price-asc",
        };

        setFilters(nextFilters);
        router.push(`/services?${createUrlSearch(nextFilters).toString()}`);
    };

    const toggleDuration = (value) => {
        const durations = filters.durations.includes(value)
            ? filters.durations.filter((item) => item !== value)
            : [...filters.durations, value];

        handleDuration(durations);
    };

    return (
        <section className="bg-surface py-10 sm:py-14 lg:py-16">
            <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">
                <div className="grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
                    <aside className="h-fit rounded-lg border border-border bg-card p-5 lg:sticky lg:top-24">
                        <div className="flex items-center justify-between border-b border-border pb-5">
                            <div className="flex items-center gap-2 font-heading text-2xl font-semibold text-charcoal">
                                <Filter className="size-5" />
                                Filters
                            </div>
                            <button type="button" onClick={clearFilters} className="text-sm font-medium text-ash hover:text-charcoal">
                                Clear All
                            </button>
                        </div>

                        <fieldset className="border-b border-border py-5">
                            <legend className="font-semibold text-charcoal">Categories</legend>
                            <div className="mt-3 space-y-3">
                                <label className="flex cursor-pointer items-center gap-3 text-sm text-charcoal">
                                    <input type="radio" name="category" checked={!filters.category} onChange={() => handleCategory("")} className="size-4 accent-charcoal" />
                                    All Services
                                </label>
                                {activeCategories.map((category) => (
                                    <label key={category._id} className="flex cursor-pointer items-center gap-3 text-sm text-charcoal">
                                        <input type="radio" name="category" checked={filters.category === category.name} onChange={() => handleCategory(category.name)} className="size-4 accent-charcoal" />
                                        {category.name}
                                    </label>
                                ))}
                            </div>
                        </fieldset>

                        <ServiceFilterPriceRange
                            filters={filters}
                            setFilters={setFilters}
                            handlePriceRange={handlePriceRange}
                        />

                        <ServiceFilterDuration
                            durationOptions={durationOptions}
                            durations={filters.durations}
                            toggleDuration={toggleDuration}
                        />
                    </aside>

                    <div>
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <ServiceFilterSearch
                                search={filters.search}
                                setSearch={(search) => setFilters({ ...filters, search })}
                                handleSearch={handleSearch}
                            />
                            <label className="flex items-center gap-3 text-sm font-medium text-charcoal">
                                <SlidersHorizontal className="size-4" />
                                Sort by:
                                <select value={filters.sort} onChange={(event) => handleSort(event.target.value)} className="h-12 rounded-lg border border-border bg-card px-4 text-sm font-medium outline-none focus:border-charcoal">
                                    <option value="price-asc">Price: Low to High</option>
                                    <option value="price-desc">Price: High to Low</option>
                                </select>
                            </label>
                        </div>

                        {services.length > 0 ? (
                            <>
                                <p className="mt-5 text-sm text-ash">{services.length} services found</p>
                                <div className="mt-5 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                                    {services.map((service) => <ServiceCard key={service._id} service={service} />)}
                                </div>
                            </>
                        ) : (
                            <EmptyServices />
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServicesCatalog;
