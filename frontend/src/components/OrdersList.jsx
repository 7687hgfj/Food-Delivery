import StatusBadge from "./StatusBadge";

export default function OrdersList({ orders }) {
  return (
    <section className="rounded-3xl bg-white/90 p-6 shadow-soft">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg font-semibold">Orders</h3>
          <p className="text-sm text-slate-500">All current orders in the system.</p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
          {orders.length} total
        </span>
      </div>
      <div className="grid gap-4">
        {orders.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-center text-sm text-slate-500">
            No orders yet. Add your first order to get started.
          </div>
        ) : (
          orders.map((order) => (
            <article
              key={order.orderId}
              className="rounded-2xl border border-slate-100 bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                    {order.orderId}
                  </p>
                  <h4 className="font-display text-lg font-semibold text-ink">{order.restaurantName}</h4>
                </div>
                <StatusBadge isPaid={order.isPaid} />
              </div>
              <div className="mt-4 grid gap-2 text-sm text-slate-600 md:grid-cols-3">
                <p>
                  <span className="font-semibold text-slate-800">Items:</span> {order.itemCount}
                </p>
                <p>
                  <span className="font-semibold text-slate-800">Distance:</span> {order.deliveryDistance} km
                </p>
                <p>
                  <span className="font-semibold text-slate-800">Assigned:</span> {order.assigned ? "Yes" : "No"}
                </p>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
