export default function Navbar() {
  return (
    <header className="sticky top-0 z-10 border-b border-white/30 bg-white/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <div>
          <p className="font-display text-lg font-semibold tracking-tight">Online Food Delivery Order Manager</p>
          <p className="text-sm text-slate-500">Track, filter, and assign orders faster.</p>
        </div>
        <span className="rounded-full bg-ink px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white">
          Live
        </span>
      </div>
    </header>
  );
}
