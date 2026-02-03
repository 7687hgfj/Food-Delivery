import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import OrderForm from "../components/OrderForm";
import Filters from "../components/Filters";
import OrdersList from "../components/OrdersList";
import AssignPanel from "../components/AssignPanel";
import { assignOrder, createOrder, fetchOrders } from "../services/api";

const initialFilters = {
  paid: "all",
  maxDistance: ""
};

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [filters, setFilters] = useState(initialFilters);
  const [assigned, setAssigned] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders()
      .then((data) => setOrders(data))
      .catch((err) => setError(err.message));
  }, []);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      if (filters.paid !== "all") {
        const isPaid = filters.paid === "paid";
        if (order.isPaid !== isPaid) return false;
      }
      if (filters.maxDistance) {
        const maxDistance = Number(filters.maxDistance);
        if (Number.isFinite(maxDistance) && order.deliveryDistance > maxDistance) {
          return false;
        }
      }
      return true;
    });
  }, [orders, filters]);

  const handleCreate = async (payload) => {
    const created = await createOrder(payload);
    setOrders((prev) => [created, ...prev]);
  };

  const handleAssign = async (maxDistance) => {
    const result = await assignOrder(maxDistance);
    if (result?.orderId) {
      setAssigned(result);
      setOrders((prev) =>
        prev.map((order) => (order.orderId === result.orderId ? { ...order, assigned: true } : order))
      );
    }
    return result;
  };

  return (
    <div>
      <Navbar />
      <main className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8">
        {error && (
          <div className="rounded-2xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
            {error}
          </div>
        )}
        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <OrderForm onSubmit={handleCreate} />
          <AssignPanel onAssign={handleAssign} assigned={assigned} />
        </section>
        <section className="grid gap-6 lg:grid-cols-[0.6fr_1.4fr]">
          <Filters filters={filters} onChange={setFilters} />
          <OrdersList orders={filteredOrders} />
        </section>
      </main>
    </div>
  );
}
