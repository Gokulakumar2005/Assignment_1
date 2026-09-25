import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CreateQuotation } from "../sclies/quotationSclies.jsx";
import { toast } from "react-toastify";

export default function QuotationCartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.quotation);

  const [cart, setCart] = useState([]);
  const [clientName, setClientName] = useState("");

  // Load cart items from localStorage on mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item._id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.info("Item removed from cart");
  };

  const cartTotal = cart.reduce((acc, item) => acc + item.currentPrice, 0);

  const handleQuotationSubmit = (e) => {
    e.preventDefault();
    if (!clientName.trim()) {
      toast.error("Please enter a Client Name");
      return;
    }
    if (cart.length === 0) {
      toast.error("Your cart is empty. Please add components.");
      return;
    }

    const items = cart.map((item) => ({
      component: item._id,
      name: item.name,
      category: item.category,
      price: item.currentPrice,
    }));

    dispatch(CreateQuotation({ clientName, items, totalPrice: cartTotal }))
      .unwrap()
      .then(() => {
        toast.success("Quotation submitted successfully!");
        // Clear cart
        localStorage.removeItem("cart");
        setCart([]);
        setClientName("");
        // Redirect back to catalog
        navigate("/sales/components");
      })
      .catch((err) => {
        toast.error(err || "Failed to submit quotation");
      });
  };

  return (
    <div className="w-full max-w-3xl mx-auto py-2">
      <div className="bg-white text-slate-900 shadow-xs rounded-2xl p-6 sm:p-8 border border-slate-200/80">
        <div className="border-b border-slate-200/80 pb-5 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Build Configuration & Quotation
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm">
                Assemble hardware specifications and generate a formal client proposal.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleQuotationSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
              Client or Organization Name
            </label>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="e.g. Acme Technologies Inc."
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 sm:py-3 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 font-medium text-sm text-slate-800 placeholder-slate-400 transition"
              required
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                Selected Components ({cart.length})
              </span>
              {cart.length > 0 && (
                <button
                  type="button"
                  onClick={() => navigate("/sales/components")}
                  className="text-xs font-medium text-indigo-600 hover:text-indigo-700 transition cursor-pointer"
                >
                  + Add More Parts
                </button>
              )}
            </div>

            {cart.length > 0 ? (
              <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div
                    key={item._id}
                    className="flex justify-between items-center bg-slate-50 border border-slate-200/80 p-3.5 sm:p-4 rounded-xl hover:border-slate-300 transition duration-150 gap-3"
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded-lg border border-slate-200 bg-white shrink-0 shadow-2xs"
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0 text-slate-400">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <span className="block text-[10px] text-indigo-600 font-bold uppercase tracking-wider leading-none">
                          {item.category}
                        </span>
                        <span className="block font-semibold text-sm text-slate-900 mt-1 truncate">
                          {item.name}
                        </span>
                        <span className="block text-xs text-slate-500 truncate max-w-md font-normal mt-0.5">
                          {item.description}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="font-bold text-sm text-slate-900 tabular-nums">
                        ₹{Number(item.currentPrice).toLocaleString("en-IN")}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item._id)}
                        className="inline-flex items-center gap-1 text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200/80 font-medium text-xs px-2.5 py-1 rounded-lg transition duration-150 cursor-pointer shadow-2xs"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 px-4 border border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
                <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <p className="text-slate-600 font-medium text-sm">Your configuration cart is empty</p>
                <p className="text-slate-400 text-xs mt-0.5 mb-3">Add hardware parts from the catalog to build a quotation.</p>
                <button
                  type="button"
                  onClick={() => navigate("/sales/components")}
                  className="inline-flex items-center gap-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-lg transition cursor-pointer shadow-2xs"
                >
                  Browse Component Catalog
                </button>
              </div>
            )}
          </div>

          <div className="border-t border-slate-200/80 pt-5 mt-6">
            <div className="bg-indigo-50/70 border border-indigo-100/80 rounded-xl p-4 flex justify-between items-center mb-6">
              <div>
                <span className="block text-[11px] font-bold uppercase tracking-wider text-indigo-500">Auto Calculated Total</span>
                <span className="text-xs text-slate-500">Includes all selected specification parts</span>
              </div>
              <span className="text-2xl font-black text-indigo-700 tabular-nums">
                ₹{cartTotal.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => navigate("/sales/components")}
                className="flex-1 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold py-3 px-4 rounded-xl text-center text-sm transition duration-150 cursor-pointer shadow-xs"
              >
                Back to Catalog
              </button>
              <button
                type="submit"
                disabled={loading || cart.length === 0}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold py-3 px-4 rounded-xl transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-xs text-center text-sm flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Saving Configuration...</span>
                  </>
                ) : (
                  "Submit Configuration"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
