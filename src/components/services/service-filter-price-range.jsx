const ServiceFilterPriceRange = ({ filters, setFilters, handlePriceRange }) => {
    return (
        <div className="border-b border-border py-5">
            <p className="font-semibold text-charcoal">Price Range</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
                <label className="sr-only" htmlFor="minimum-price">Minimum price</label>
                <input id="minimum-price" type="number" min="0" placeholder="$0" value={filters.minimumPrice} onChange={(event) => setFilters({ ...filters, minimumPrice: event.target.value })} onBlur={(event) => handlePriceRange({ minimumPrice: event.target.value })} className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-charcoal" />
                <label className="sr-only" htmlFor="maximum-price">Maximum price</label>
                <input id="maximum-price" type="number" min="0" placeholder="Any" value={filters.maximumPrice} onChange={(event) => setFilters({ ...filters, maximumPrice: event.target.value })} onBlur={(event) => handlePriceRange({ maximumPrice: event.target.value })} className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-charcoal" />
            </div>
        </div>
    );
};

export default ServiceFilterPriceRange;
