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
    <div className="w-full max-w-3xl bg-white text-slate-800 shadow-lg rounded-xl p-8 mx-auto mt-6 border border-slate-200">
      <div className="border-b border-slate-200 pb-4 mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Build Configuration</h2>
        </div>
        
      </div>

      <form onSubmit={handleQuotationSubmit} className="space-y-6">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
            Client Name
          </label>
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="Enter client name"
            className="w-full border border-slate-300 rounded-lg px-4 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-slate-500 font-medium text-sm text-slate-800 placeholder-slate-400"
            required
          />
        </div>

        <div className="space-y-3">
          <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
            Selected Specs List
          </span>

          {cart.length > 0 ? (
            <div className="space-y-2.5 pr-1 max-h-[350px] overflow-y-auto scrollbar-thin">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between items-center bg-slate-50 border border-slate-200 p-4 rounded-xl hover:border-slate-300 transition"
                >
                  <div>
                    <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                      {item.category}
                    </span>
                    <span className="block font-semibold text-sm text-slate-800 mt-0.5">
                      {item.name}
                    </span>
                    <span className="block text-xs text-slate-500 truncate max-w-md font-normal mt-0.5">
                      {item.description}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <span className="font-bold text-sm text-slate-900">
                      ₹{Number(item.currentPrice).toLocaleString("en-IN")}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item._id)}
                      className="text-red-600 hover:text-red-700 font-semibold text-xs bg-white hover:bg-slate-50 px-2.5 py-1 rounded border border-slate-250 transition cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border border-dashed border-slate-200 rounded-xl text-slate-400 font-medium text-sm">
              Your configurations cart is empty.
            </div>
          )}
        </div>

        <div className="border-t border-slate-200 pt-6 mt-6">
          <div className="flex justify-between items-center text-base font-bold mb-6">
            <span className="text-slate-500">Auto Calculated Total</span>
            <span className="text-2xl text-slate-900 font-black">
              ₹{cartTotal.toLocaleString("en-IN")}
            </span>
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => navigate("/sales/components")}
              className="flex-1 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-semibold py-2.5 rounded-lg text-center text-sm transition cursor-pointer"
            >
              Back to Catalog
            </button>
            <button
              type="submit"
              disabled={loading || cart.length === 0}
              className="flex-1 bg-slate-800 hover:bg-slate-900 text-white font-bold py-2.5 rounded-lg transition disabled:opacity-50 disabled:hover:bg-slate-800 cursor-pointer shadow-sm text-center text-sm"
            >
              {loading ? "Saving Configuration..." : "Submit Configuration"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
