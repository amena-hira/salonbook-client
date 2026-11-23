import Image from "next/image";
import Link from "next/link";
import { Flower2, Hand, Paintbrush, Scissors, Sparkles, SprayCan, Waves } from "lucide-react";
import { getCategories } from "@/lib/api/services";

const categoryVisuals = {
    "haircut-styling": { image: "/images/services/man-hair-cut.jpg", icon: Scissors },
    "hair-coloring": { image: "/images/services/hair-color.jpg", icon: Paintbrush },
    "hair-treatment": { image: "/images/services/shampoo.jpg", icon: Waves },
    "facial-skincare": { image: "/images/services/facial.jpg", icon: Sparkles },
    makeup: { image: "/images/services/makeup.jpg", icon: SprayCan },
    "manicure-pedicure": { image: "/images/services/manicure.jpg", icon: Hand },
    "spa-massage": { image: "/images/services/message.png", icon: Flower2 },
};

const defaultVisual = { image: "/images/services/brushing.jpg", icon: Scissors };

const ServiceCategory = async () => {
    let categories = [];

    try {
        categories = await getCategories();
    } catch {
        categories = [];
    }

    return (
        <section className="bg-background py-8">
            <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">
                <p className="text-sm font-semibold tracking-[0.16em] text-ash uppercase">Explore by Category</p>
                <h2 className="mt-2 font-heading text-4xl font-semibold tracking-tight text-charcoal sm:text-5xl">
                    Our Service Categories
                </h2>

                {categories.length > 0 ? (
                    <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {categories.map((category) => {
                            const visual = categoryVisuals[category.slug] ?? defaultVisual;
                            const Icon = visual.icon;

                            return (
                                <Link
                                    key={category._id}
                                    href={`/services?${new URLSearchParams({ status: "active", category: category.name })}`}
                                    className="group relative min-h-48 overflow-hidden rounded-lg bg-charcoal"
                                >
                                    <Image
                                        src={visual.image}
                                        alt=""
                                        fill
                                        sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/25 to-black/5 transition-colors duration-300 group-hover:from-black/90" />
                                    <div className="relative flex h-full min-h-48 flex-col justify-end p-5 text-white">
                                        <span className="grid size-10 place-items-center rounded-md bg-black/50 backdrop-blur-sm">
                                            <Icon className="size-6" aria-hidden="true" />
                                        </span>
                                        <div className="mt-auto">
                                            <h3 className="font-heading text-2xl font-semibold">{category.name}</h3>
                                            <p className="mt-1 line-clamp-2 text-sm leading-5 text-white/90">
                                                {category.description}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                ) : (
                    <div className="mt-9 flex min-h-56 flex-col items-center justify-center rounded-lg border border-dashed border-border bg-card px-6 text-center">
                        <Sparkles className="size-8 text-charcoal" aria-hidden="true" />
                        <h3 className="mt-4 font-heading text-2xl font-semibold text-charcoal">Categories coming soon</h3>
                        <p className="mt-2 text-sm text-ash">We are preparing our salon categories for you.</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ServiceCategory;
