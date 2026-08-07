export default function PriceHistory({ history }) {
  if (!history || history.length === 0) {
    return (
      <div className="text-[10px] text-slate-400 mt-1 italic">
        No price history recorded.
      </div>
    );
  }

  return (
    <div className="text-xs text-gray-500 mt-2 max-h-24 overflow-y-auto bg-slate-50 p-2 rounded-lg border border-slate-100 space-y-1 w-44">
      <span className="font-bold block text-[10px] uppercase text-slate-400 tracking-wider mb-1">
        Price History:
      </span>
      {[...history].reverse().map((h, index) => (
        <div
          key={index}
          className="flex justify-between gap-2 border-b border-dashed border-slate-200 pb-1 last:border-0 last:pb-0 text-[11px]"
        >
          <span className="font-semibold text-slate-700">
            {Number(h.price).toLocaleString("en-IN")}
          </span>
          <span className="text-[10px] text-slate-400">
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
