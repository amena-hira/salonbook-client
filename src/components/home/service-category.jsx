import Link from "next/link";
import { Flower2, Hand, PaintGun, Scissors, Sparkles, SprayCan, Waves } from "lucide-react";
import { getCategories } from "@/lib/actions/services";

const getCategoryIcon = (category) => {
    const name = category.toLowerCase();

    if (name.includes("color")) return PaintGun;
    if (name.includes("treatment")) return Waves;
    if (name.includes("facial") || name.includes("skin")) return Sparkles;
    if (name.includes("makeup")) return SprayCan;
    if (name.includes("nail") || name.includes("manicure") || name.includes("pedicure")) return Hand;
    if (name.includes("spa") || name.includes("massage")) return Flower2;

    return Scissors;
};

const ServiceCategory = async () => {
    let categories = [];

    try {
        categories = await getCategories();
    } catch {
        categories = [];
    }

    const categoryList = categories
        .map((category) =>
            typeof category === "string"
                ? { id: category, label: category }
                : {
                      id: category._id ?? category.id ?? category.name,
                      label: category.categoryName ?? category.name ?? category.title ?? "",
                  },
        )
        .filter((category) => category.label);

    if (categoryList.length === 0) return null;

    return (
        <section className="bg-background py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">
            <p className="text-sm font-semibold tracking-[0.16em] text-ash uppercase">Explore by Category</p>
            <h2 className="mt-2 font-heading text-4xl font-semibold tracking-tight text-charcoal sm:text-5xl">
                Our Service Categories
            </h2>

            <div className="mt-9 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
                {categoryList.map(({ id, label }) => {
                    const Icon = getCategoryIcon(label);

                    return (
                        <Link
                            key={id}
                            href={`/services?category=${encodeURIComponent(label)}`}
                            className="group flex min-h-36 flex-col items-center justify-center rounded-lg border border-border bg-card px-3 text-center transition-all duration-300 hover:-translate-y-1 hover:border-charcoal/30 hover:shadow-md"
                        >
                            <Icon className="size-9 text-charcoal transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
                            <span className="mt-4 max-w-28 text-sm font-semibold leading-5 text-charcoal">{label}</span>
                        </Link>
                    );
                })}
            </div>
        </div>
    </section>
    );
};

export default ServiceCategory;
