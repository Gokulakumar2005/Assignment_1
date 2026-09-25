export default function PriceHistory({ history }) {
  if (!history || history.length === 0) {
    return (
      <div className="text-[10px] text-slate-400 mt-1 italic">
        No price history recorded.
      </div>
    );
  }

  return (
    <div className="text-xs text-slate-500 mt-2 max-h-28 overflow-y-auto bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 space-y-1.5 w-full min-w-[180px]">
      <span className="font-bold block text-[10px] uppercase text-slate-400 tracking-wider mb-1">
        Price History Log
      </span>
      {[...history].reverse().map((h, index) => (
        <div
          key={index}
          className="flex justify-between items-center gap-2 border-b border-dashed border-slate-200/80 pb-1 last:border-0 last:pb-0 text-xs"
        >
          <span className="font-bold text-slate-800 tabular-nums">
            ₹{Number(h.price).toLocaleString("en-IN")}
          </span>
          <span className="text-[10px] text-slate-400 tabular-nums">
            {new Date(h.updatedAt).toLocaleDateString("en-IN", {
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      ))}
    </div>
  );
}
