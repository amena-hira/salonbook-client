"use client";

import { useMemo, useState } from "react";
import { Filter, Search, SlidersHorizontal } from "lucide-react";
import EmptyServices from "@/components/services/empty-services";
import ServiceCard from "@/components/services/service-card";

const durationOptions = [
    { label: "Up to 30 min", value: "short", matches: (duration) => duration <= 30 },
    { label: "31 – 60 min", value: "medium", matches: (duration) => duration >= 31 && duration <= 60 },
    { label: "61 – 90 min", value: "long", matches: (duration) => duration >= 61 && duration <= 90 },
    { label: "More than 90 min", value: "extended", matches: (duration) => duration > 90 },
];

const ServicesCatalog = ({ services, categories, initialCategoryId = "" }) => {
    const activeCategories = categories.filter((category) => category.status === "active");
    const initialCategory = activeCategories.find((category) => category._id === initialCategoryId)?.name ?? "";
    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("price-asc");
    const [minimumPrice, setMinimumPrice] = useState("");
    const [maximumPrice, setMaximumPrice] = useState("");
    const [durations, setDurations] = useState([]);

    const filteredServices = useMemo(() => {
        const normalizedSearch = search.trim().toLowerCase();
        const min = minimumPrice === "" ? -Infinity : Number(minimumPrice);
        const max = maximumPrice === "" ? Infinity : Number(maximumPrice);

        return services
            .filter((service) => {
                const matchesCategory = !selectedCategory || service.category === selectedCategory;
                const matchesSearch =
                    !normalizedSearch ||
                    service.serviceName.toLowerCase().includes(normalizedSearch) ||
                    service.description.toLowerCase().includes(normalizedSearch);
                const matchesPrice = service.price >= min && service.price <= max;
                const matchesDuration =
                    durations.length === 0 ||
                    durationOptions.some((option) => durations.includes(option.value) && option.matches(service.duration));

                return matchesCategory && matchesSearch && matchesPrice && matchesDuration;
            })
            .sort((first, second) =>
                sort === "price-asc" ? first.price - second.price : second.price - first.price,
            );
    }, [durations, maximumPrice, minimumPrice, search, selectedCategory, services, sort]);

    const clearFilters = () => {
        setSelectedCategory("");
        setSearch("");
        setMinimumPrice("");
        setMaximumPrice("");
        setDurations([]);
        setSort("price-asc");
    };

    const toggleDuration = (value) => {
        setDurations((current) =>
            current.includes(value) ? current.filter((item) => item !== value) : [...current, value],
        );
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
                                    <input
                                        type="radio"
                                        name="category"
                                        checked={!selectedCategory}
                                        onChange={() => setSelectedCategory("")}
                                        className="size-4 accent-charcoal"
                                    />
                                    All Services
                                </label>
                                {activeCategories.map((category) => (
                                    <label key={category._id} className="flex cursor-pointer items-center gap-3 text-sm text-charcoal">
                                        <input
                                            type="radio"
                                            name="category"
                                            checked={selectedCategory === category.name}
                                            onChange={() => setSelectedCategory(category.name)}
                                            className="size-4 accent-charcoal"
                                        />
                                        {category.name}
                                    </label>
                                ))}
                            </div>
                        </fieldset>

                        <div className="border-b border-border py-5">
                            <p className="font-semibold text-charcoal">Price Range</p>
                            <div className="mt-4 grid grid-cols-2 gap-3">
                                <label className="sr-only" htmlFor="minimum-price">Minimum price</label>
                                <input
                                    id="minimum-price"
                                    type="number"
                                    min="0"
                                    placeholder="$0"
                                    value={minimumPrice}
                                    onChange={(event) => setMinimumPrice(event.target.value)}
                                    className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-charcoal"
                                />
                                <label className="sr-only" htmlFor="maximum-price">Maximum price</label>
                                <input
                                    id="maximum-price"
                                    type="number"
                                    min="0"
                                    placeholder="Any"
                                    value={maximumPrice}
                                    onChange={(event) => setMaximumPrice(event.target.value)}
                                    className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-charcoal"
                                />
                            </div>
                        </div>

                        <fieldset className="pt-5">
                            <legend className="font-semibold text-charcoal">Duration</legend>
                            <div className="mt-3 space-y-3">
                                {durationOptions.map((option) => (
                                    <label key={option.value} className="flex cursor-pointer items-center gap-3 text-sm text-charcoal">
                                        <input
                                            type="checkbox"
                                            checked={durations.includes(option.value)}
                                            onChange={() => toggleDuration(option.value)}
                                            className="size-4 rounded accent-charcoal"
                                        />
                                        {option.label}
                                    </label>
                                ))}
                            </div>
                        </fieldset>
                    </aside>

                    <div>
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <label className="relative block w-full sm:max-w-xl">
                                <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-ash" />
                                <input
                                    type="search"
                                    placeholder="Search services..."
                                    value={search}
                                    onChange={(event) => setSearch(event.target.value)}
                                    className="h-12 w-full rounded-lg border border-border bg-card py-3 pl-12 pr-4 text-sm outline-none placeholder:text-ash focus:border-charcoal"
                                />
                            </label>
                            <label className="flex items-center gap-3 text-sm font-medium text-charcoal">
                                <SlidersHorizontal className="size-4" />
                                Sort by:
                                <select
                                    value={sort}
                                    onChange={(event) => setSort(event.target.value)}
                                    className="h-12 rounded-lg border border-border bg-card px-4 text-sm font-medium outline-none focus:border-charcoal"
                                >
                                    <option value="price-asc">Price: Low to High</option>
                                    <option value="price-desc">Price: High to Low</option>
                                </select>
                            </label>
                        </div>

                        <p className="mt-5 text-sm text-ash">{filteredServices.length} services found</p>
                        {filteredServices.length > 0 ? (
                            <div className="mt-5 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                                {filteredServices.map((service) => (
                                    <ServiceCard key={service._id} service={service} />
                                ))}
                            </div>
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
