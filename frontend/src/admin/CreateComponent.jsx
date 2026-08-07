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
    <div className="min-h-screen bg-slate-100 flex flex-col items-center py-10 px-4 w-full">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-xl p-8 mb-10 border border-slate-200">
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-8">
          Create Component
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Category
            </label>

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-500"
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
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Component Name
            </label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter component name"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>

            <textarea
              rows="4"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Enter description"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-slate-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Current Price (₹)
            </label>

            <input
              type="number"
              name="currentPrice"
              value={form.currentPrice}
              onChange={handleChange}
              placeholder="Enter current price"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-800 text-white py-3 rounded-lg font-semibold hover:bg-slate-900 transition duration-200 disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Creating..." : "Create Component"}
          </button>
        </form>
      </div>
    </div>
  );
}