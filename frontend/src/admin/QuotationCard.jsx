export default function QuotationCard({ quote }) {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 shadow-sm hover:border-slate-350 transition">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-200/60 pb-4 mb-4 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-slate-800">
              Client: {quote.clientName}
            </span>
          </div>
         
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="block text-xs uppercase font-semibold text-slate-400">
              Total Price
            </span>
            <span className="text-xl font-black text-slate-800">
              ₹{Number(quote.totalPrice).toLocaleString("en-IN")}
            </span>
          </div>
        </div>
      </div>

   
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {quote.items.map((item, idx) => (
          <div
            key={idx}
            className="bg-white border border-slate-100 rounded-lg p-3 flex justify-between items-center"
          >
            <div>
              <span className="block text-[10px] text-slate-500 font-extrabold uppercase tracking-wider">
                {item.category}
              </span>
              <span className="block text-xs font-semibold text-slate-700 truncate max-w-[120px]">
                {item.name}
              </span>
            </div>
            <span className="font-bold text-slate-900 text-xs">
              ₹{Number(item.price).toLocaleString("en-IN")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
