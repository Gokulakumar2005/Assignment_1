export default function QuotationCart({
  cart,
  removeFromCart,
  clientName,
  setClientName,
  handleQuotationSubmit,
  cartTotal,
}) {
  return (
    <div className="w-full lg:w-1/3 bg-slate-900 text-white shadow-xl rounded-xl p-6 self-start lg:sticky lg:top-6">
      <h2 className="text-2xl font-black border-b border-slate-800 pb-3 mb-6 flex justify-between items-center">
        <span>Build Config</span>
      </h2>

      <form onSubmit={handleQuotationSubmit} className="space-y-6">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
            Client Name
          </label>
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="Enter client name"
            className="w-full border border-slate-800 rounded-lg px-4 py-3 bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-sm text-white placeholder-slate-500"
            required
          />
        </div>

        <div className="space-y-3">
          <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
            Selected Specs
          </span>

          {cart.length > 0 ? (
            <div className="max-h-[300px] overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between items-center bg-slate-800/60 border border-slate-800 p-3 rounded-lg hover:border-slate-700 transition"
                >
                  <div className="max-w-[70%]">
                    <span className="block text-[10px] text-indigo-400 font-extrabold uppercase tracking-wide">
                      {item.category}
                    </span>
                    <span className="block font-medium text-sm text-slate-200 truncate">
                      {item.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-sm text-slate-100">
                      ₹{Number(item.currentPrice).toLocaleString("en-IN")}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item._id)}
                      className="text-red-400 hover:text-red-500 font-semibold cursor-pointer text-xs"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 border border-dashed border-slate-800 rounded-lg text-slate-500 font-medium text-sm">
              Add parts from the database catalog to build a quotation receipt.
            </div>
          )}
        </div>

        <div className="border-t border-slate-800 pt-5 mt-4">
          <div className="flex justify-between items-center text-lg font-bold mb-6">
            <span className="text-slate-400">Total Price</span>
            <span className="text-2xl text-indigo-400 font-black">
              ₹{cartTotal.toLocaleString("en-IN")}
            </span>
          </div>

          <button
            type="submit"
            disabled={cart.length === 0}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-lg transition duration-200 disabled:opacity-50 disabled:hover:bg-indigo-600 cursor-pointer shadow-lg shadow-indigo-900/40 text-center text-sm"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
