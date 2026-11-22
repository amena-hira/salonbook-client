const ServiceFilterDuration = ({ durationOptions, durations, toggleDuration }) => {
    return (
        <fieldset className="pt-5">
            <legend className="font-semibold text-charcoal">Duration</legend>
            <div className="mt-3 space-y-3">
                {durationOptions.map((option) => (
                    <label key={option.value} className="flex cursor-pointer items-center gap-3 text-sm text-charcoal">
                        <input type="checkbox" checked={durations.includes(option.value)} onChange={() => toggleDuration(option.value)} className="size-4 rounded accent-charcoal" />
                        {option.label}
                    </label>
                ))}
            </div>
        </fieldset>
    );
};

export default ServiceFilterDuration;
