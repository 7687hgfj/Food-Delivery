export default function StatusBadge({ isPaid }) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
        isPaid ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
      }`}
    >
      {isPaid ? "Paid" : "Unpaid"}
    </span>
  );
}
