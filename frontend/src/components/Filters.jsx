export default function Filters({ filters, onChange }) {
  return (
    <section className="rounded-3xl bg-white/90 p-6 shadow-soft">
      <div className="mb-4">
        <h3 className="font-display text-lg font-semibold">Filters</h3>
        <p className="text-sm text-slate-500">Combine filters to narrow the list.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-slate-600">Paid status</label>
          <select
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm focus:border-ink focus:outline-none focus:ring-2 focus:ring-ink/20"
            value={filters.paid}
            onChange={(event) => onChange({ ...filters, paid: event.target.value })}
          >
            <option value="all">All</option>
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-slate-600">Max distance (km)</label>
          <input
            type="number"
            min="0"
            step="0.1"
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm focus:border-ink focus:outline-none focus:ring-2 focus:ring-ink/20"
            value={filters.maxDistance}
            onChange={(event) => onChange({ ...filters, maxDistance: event.target.value })}
            placeholder="10"
          />
        </div>
      </div>
    </section>
  );
}
