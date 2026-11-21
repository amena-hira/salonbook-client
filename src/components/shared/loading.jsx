import { LoaderCircle } from "lucide-react";

const Loading = ({ label = "Loading...", className = "" }) => (
    <div className={`flex min-h-48 flex-col items-center justify-center gap-3 ${className}`} role="status">
        <LoaderCircle className="size-8 animate-spin text-charcoal" aria-hidden="true" />
        <span className="text-sm text-ash">{label}</span>
        <span className="sr-only">{label}</span>
    </div>
);

export default Loading;
