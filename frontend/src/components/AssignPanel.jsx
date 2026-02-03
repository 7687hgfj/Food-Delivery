import { useState } from "react";

export default function AssignPanel({ onAssign, assigned }) {
  const [distance, setDistance] = useState(5);
  const [message, setMessage] = useState(null);

  const handleAssign = async () => {
    setMessage(null);
    const maxDistance = Number(distance);

    if (!Number.isFinite(maxDistance) || maxDistance <= 0) {
      setMessage({ type: "error", text: "Enter a positive distance." });
      return;
    }

    try {
      const result = await onAssign(maxDistance);
      if (!result?.orderId) {
        setMessage({ type: "info", text: "No order available" });
        return;
      }
      setMessage({ type: "success", text: "Order assigned successfully." });
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    }
  };

  return (
    <section className="rounded-3xl bg-white/90 p-6 shadow-soft">
      <div className="mb-4">
        <h3 className="font-display text-lg font-semibold">Assign Delivery</h3>
        <p className="text-sm text-slate-500">Find the nearest unpaid order within a distance.</p>
      </div>
      <div className="flex flex-col gap-4">
        <div>
          <label className="text-sm font-medium text-slate-600">Max distance (km)</label>
          <input
            type="number"
            min="1"
            step="0.1"
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm focus:border-ink focus:outline-none focus:ring-2 focus:ring-ink/20"
            value={distance}
            onChange={(event) => setDistance(event.target.value)}
          />
        </div>
        <button
          type="button"
          onClick={handleAssign}
          className="rounded-2xl bg-accent px-5 py-3 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-orange-600"
        >
          Assign Delivery
        </button>
        {message && (
          <div
            className={`rounded-2xl px-4 py-3 text-sm font-medium ${
              message.type === "success"
                ? "bg-emerald-50 text-emerald-700"
                : message.type === "info"
                ? "bg-slate-100 text-slate-600"
                : "bg-rose-50 text-rose-700"
            }`}
          >
            {message.text}
          </div>
        )}
        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Assigned Order</p>
          {assigned ? (
            <div className="mt-2 text-sm text-slate-600">
              <p className="font-semibold text-ink">{assigned.restaurantName}</p>
              <p>Order ID: {assigned.orderId}</p>
              <p>Distance: {assigned.deliveryDistance} km</p>
              <p>Items: {assigned.itemCount}</p>
            </div>
          ) : (
            <p className="mt-2 text-sm text-slate-500">No assigned order yet.</p>
          )}
        </div>
      </div>
    </section>
  );
}
