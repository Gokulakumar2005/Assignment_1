export default function QuotationCard({ quote }) {
  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-xs hover:border-slate-300 transition duration-150">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-100 pb-4 mb-4 gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <span className="block text-[10px] uppercase font-bold tracking-wider text-slate-400">Client Quotation</span>
            <span className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
              {quote.clientName}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-indigo-50/60 border border-indigo-100/70 px-4 py-2 rounded-xl">
          <span className="text-xs uppercase font-semibold text-indigo-500">
            Total:
          </span>
          <span className="text-lg font-black text-indigo-700 tabular-nums">
            ₹{Number(quote.totalPrice).toLocaleString("en-IN")}
          </span>
        </div>
      </div>

      <div className="space-y-1 mb-2">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Configured Specifications ({quote.items.length})</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {quote.items.map((item, idx) => (
          <div
            key={idx}
            className="bg-slate-50 border border-slate-200/70 rounded-xl p-2.5 flex justify-between items-center gap-2"
          >
            <div className="min-w-0 flex-1">
              <span className="block text-[10px] text-indigo-600 font-bold uppercase tracking-wider leading-none">
                {item.category}
              </span>
              <span className="block text-xs font-semibold text-slate-800 truncate mt-0.5">
                {item.name}
              </span>
            </div>
            <span className="font-bold text-slate-900 text-xs shrink-0 tabular-nums">
              ₹{Number(item.price).toLocaleString("en-IN")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
