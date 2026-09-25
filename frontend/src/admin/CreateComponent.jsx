import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CreateComponent, FetchComponents } from "../sclies/componentSclies.jsx";
import { toast } from "react-toastify";
import axiosInstance from "../config/axiosInstance.jsx";

export default function CreateConfiguration() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.compo);
  const [uploading, setUploading] = useState(false);

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
    image: "",
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

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.post("/upload/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      });
      setForm((prev) => ({ ...prev, image: res.data.url }));
      toast.success("Image uploaded successfully!");
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to upload image");
    } finally {
      setUploading(false);
    }
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
          image: "",
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

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
              Component Image (Upload via Cloudinary or Paste URL)
            </label>

            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <label className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl border border-slate-200 text-xs font-semibold cursor-pointer transition">
                  <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{uploading ? "Uploading..." : "Upload Image File"}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading}
                    className="hidden"
                  />
                </label>
                <span className="text-xs text-slate-400">or</span>
                <input
                  type="url"
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  placeholder="Paste Cloudinary / image URL"
                  className="flex-1 w-full border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                />
              </div>

              {form.image && (
                <div className="flex items-center gap-3 p-2.5 bg-slate-50 border border-slate-200/80 rounded-xl">
                  <img
                    src={form.image}
                    alt="Component preview"
                    className="w-14 h-14 object-cover rounded-lg border border-slate-200 bg-white shrink-0"
                    onError={(e) => { e.target.style.display = "none"; }}
                  />
                  <div className="flex-1 min-w-0">
                    <span className="block text-xs font-semibold text-slate-700">Image Attached</span>
                    <span className="block text-[11px] text-slate-400 truncate">{form.image}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setForm((prev) => ({ ...prev, image: "" }))}
                    className="text-xs text-rose-600 hover:text-rose-700 font-medium px-2 py-1 rounded-lg hover:bg-rose-50 transition"
                  >
                    Remove
                  </button>
                </div>
              )}
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