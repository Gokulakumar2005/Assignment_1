export default function QuotationCart({
  cart,
  removeFromCart,
  clientName,
  setClientName,
  handleQuotationSubmit,
  cartTotal,
}) {
  return (
    <div className="w-full lg:w-1/3 bg-slate-900 text-white shadow-xl rounded-2xl p-6 self-start lg:sticky lg:top-6 border border-slate-800">
      <div className="border-b border-slate-800 pb-4 mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white">Build Config</h2>
          <span className="text-xs text-slate-400">Live Proposal Summary</span>
        </div>
        <div className="w-7 h-7 rounded-lg bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
      </div>

      <form onSubmit={handleQuotationSubmit} className="space-y-5">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
            Client Name
          </label>
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="Enter client name"
            className="w-full border border-slate-800 rounded-xl px-4 py-2.5 bg-slate-800/80 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-sm text-white placeholder-slate-500 transition"
            required
          />
        </div>

        <div className="space-y-2.5">
          <div className="flex justify-between items-center">
            <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
              Selected Specs ({cart.length})
            </span>
          </div>

          {cart.length > 0 ? (
            <div className="max-h-[300px] overflow-y-auto space-y-2.5 pr-1">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between items-center bg-slate-800/70 border border-slate-800 p-3 rounded-xl hover:border-slate-700 transition gap-2"
                >
                  <div className="min-w-0 flex-1">
                    <span className="block text-[10px] text-indigo-400 font-extrabold uppercase tracking-wide leading-none">
                      {item.category}
                    </span>
                    <span className="block font-medium text-sm text-slate-200 truncate mt-0.5">
                      {item.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="font-bold text-sm text-white tabular-nums">
                      ₹{Number(item.currentPrice).toLocaleString("en-IN")}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item._id)}
                      className="text-rose-400 hover:text-rose-300 font-semibold cursor-pointer text-xs transition"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 px-3 border border-dashed border-slate-800 rounded-xl text-slate-500 font-medium text-xs bg-slate-800/30">
              Add parts from catalog to build receipt.
            </div>
          )}
        </div>

        <div className="border-t border-slate-800 pt-5 mt-4">
          <div className="flex justify-between items-center mb-5">
            <span className="text-xs uppercase font-semibold text-slate-400">Total Price</span>
            <span className="text-2xl text-indigo-400 font-black tabular-nums">
              ₹{cartTotal.toLocaleString("en-IN")}
            </span>
          </div>

          <button
            type="submit"
            disabled={cart.length === 0}
            className="w-full bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold py-3 rounded-xl transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-lg shadow-indigo-950/40 text-center text-sm"
          >
            Submit Proposal
          </button>
        </div>
      </form>
    </div>
  );
}
