import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CreateComponent, FetchComponents } from "../sclies/componentSclies.jsx";
import { toast } from "react-toastify";

export default function CreateConfiguration() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.compo);

  const categories = [
    "Processor",
    "RAM",
    "Storage",
    "Graphics Card",
    "Display",
    "Battery",
    "Keyboard",
    "Operating System",
  ];

  const [form, setForm] = useState({
    category: "",
    name: "",
    description: "",
    currentPrice: "",
  });

  useEffect(() => {
    dispatch(FetchComponents());
  }, [dispatch]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!form.category) {
      toast.error("Please select a category");
      return;
    }
    if (!form.name.trim() || form.name.trim().length < 3) {
      toast.error("Component name must be at least 3 characters long");
      return;
    }
    if (!form.description.trim() || form.description.trim().length < 5) {
      toast.error("Description must be at least 5 characters long");
      return;
    }
    const priceVal = Number(form.currentPrice);
    if (isNaN(priceVal) || priceVal <= 0) {
      toast.error("Price must be a valid number greater than 0");
      return;
    }

    dispatch(CreateComponent(form))
      .unwrap()
      .then(() => {
        toast.success("Component created successfully!");
        setForm({
          category: "",
          name: "",
          description: "",
          currentPrice: "",
        });
      })
      .catch((err) => {
        toast.error(err || "Failed to create component");
      });
  };

  return (
    <div className="w-full max-w-2xl mx-auto py-2">
      <div className="bg-white shadow-xs rounded-2xl p-6 sm:p-8 border border-slate-200/80">
        <div className="border-b border-slate-200/80 pb-5 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Create Hardware Component
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm">
                Add a new hardware component to the master parts catalog.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
              Category
            </label>

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 sm:py-3 text-slate-800 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
              required
            >
              <option value="">Select Category</option>

              {categories.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
              Component Name
            </label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Intel Core i7-13700H"
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 sm:py-3 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
              Description & Specifications
            </label>

            <textarea
              rows="3"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="e.g. 14 cores, 20 threads, up to 5.0 GHz Turbo"
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 sm:py-3 text-slate-800 placeholder-slate-400 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
              Base Price (₹)
            </label>

            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm pointer-events-none">
                ₹
              </span>
              <input
                type="number"
                name="currentPrice"
                value={form.currentPrice}
                onChange={handleChange}
                placeholder="25000"
                className="w-full border border-slate-200 rounded-xl pl-8 pr-4 py-2.5 sm:py-3 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 tabular-nums"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white py-3 rounded-xl font-semibold transition duration-150 shadow-xs disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-sm flex items-center justify-center gap-2 mt-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Creating Component...</span>
              </>
            ) : (
              "Save & Add Component"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}