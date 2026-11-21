import { Scissors } from "lucide-react";

const EmptyServices = () => (
    <div className="mt-10 flex min-h-72 flex-col items-center justify-center rounded-lg border border-dashed border-border bg-card px-6 text-center">
        <span className="grid size-12 place-items-center rounded-full bg-cream text-charcoal">
            <Scissors className="size-6" aria-hidden="true" />
        </span>
        <h3 className="mt-4 font-heading text-2xl font-semibold text-charcoal">No services available</h3>
        <p className="mt-2 max-w-sm text-sm leading-6 text-ash">
            We are updating our services. Please check back soon.
        </p>
    </div>
);

export default EmptyServices;
