import { useState } from "react";

const initialState = {
  restaurantName: "",
  itemCount: "",
  isPaid: false,
  deliveryDistance: ""
};

export default function OrderForm({ onSubmit }) {
  const [form, setForm] = useState(initialState);
  const [message, setMessage] = useState(null);

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage(null);

    const itemCount = Number(form.itemCount);
    const deliveryDistance = Number(form.deliveryDistance);

    if (!form.restaurantName.trim()) {
      setMessage({ type: "error", text: "Restaurant name is required." });
      return;
    }

    if (!Number.isFinite(itemCount) || itemCount <= 0) {
      setMessage({ type: "error", text: "Item count must be a positive number." });
      return;
    }

    if (!Number.isFinite(deliveryDistance) || deliveryDistance <= 0) {
      setMessage({ type: "error", text: "Delivery distance must be a positive number." });
      return;
    }

    try {
      await onSubmit({
        restaurantName: form.restaurantName.trim(),
        itemCount,
        isPaid: Boolean(form.isPaid),
        deliveryDistance
      });
      setMessage({ type: "success", text: "Order added successfully." });
      setForm(initialState);
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    }
  };

  return (
    <section className="rounded-3xl bg-white/90 p-6 shadow-soft">
      <div className="mb-4">
        <h2 className="font-display text-xl font-semibold">Add New Order</h2>
        <p className="text-sm text-slate-500">Enter order details and save instantly.</p>
      </div>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <div>
          <label className="text-sm font-medium text-slate-600">Restaurant name</label>
          <input
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm focus:border-ink focus:outline-none focus:ring-2 focus:ring-ink/20"
            value={form.restaurantName}
            onChange={(event) => updateField("restaurantName", event.target.value)}
            placeholder="Urban Tandoor"
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-slate-600">Item count</label>
            <input
              type="number"
              min="1"
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm focus:border-ink focus:outline-none focus:ring-2 focus:ring-ink/20"
              value={form.itemCount}
              onChange={(event) => updateField("itemCount", event.target.value)}
              placeholder="3"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-600">Distance (km)</label>
            <input
              type="number"
              min="1"
              step="0.1"
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm focus:border-ink focus:outline-none focus:ring-2 focus:ring-ink/20"
              value={form.deliveryDistance}
              onChange={(event) => updateField("deliveryDistance", event.target.value)}
              placeholder="4.5"
            />
          </div>
        </div>
        <label className="flex items-center gap-3 text-sm font-medium text-slate-600">
          <input
            type="checkbox"
            checked={form.isPaid}
            onChange={(event) => updateField("isPaid", event.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-ink focus:ring-ink"
          />
          Paid order
        </label>
        {message && (
          <div
            className={`rounded-2xl px-4 py-3 text-sm font-medium ${
              message.type === "success" ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"
            }`}
          >
            {message.text}
          </div>
        )}
        <button
          type="submit"
          className="rounded-2xl bg-ink px-5 py-3 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-black"
        >
          Add Order
        </button>
      </form>
    </section>
  );
}
