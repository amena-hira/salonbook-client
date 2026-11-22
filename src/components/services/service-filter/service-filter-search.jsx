import { Search } from 'lucide-react';

const ServiceFilterSearch = ({ search, setSearch, handleSearch }) => {
    const onSubmit = (event) => {
        event.preventDefault();
        handleSearch(search);
    };

    return (
        <form onSubmit={onSubmit} className="relative block w-full sm:max-w-xl">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-ash" />
            <input type="search" placeholder="Search services..." value={search} onChange={(event) => setSearch(event.target.value)} className="h-12 w-full rounded-lg border border-border bg-card py-3 pl-12 pr-4 text-sm outline-none placeholder:text-ash focus:border-charcoal" />
        </form>
    );
};

export default ServiceFilterSearch;
