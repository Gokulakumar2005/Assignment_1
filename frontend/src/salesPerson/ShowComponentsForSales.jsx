import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchComponents } from "../sclies/componentSclies.jsx";
import { toast } from "react-toastify";

export default function ShowComponentsForSales() {
  const dispatch = useDispatch();
  const { componentData, loading, Error } = useSelector((state) => state.compo);

  // Pagination state for each category: { categoryName: pageNumber }
  const [currentPage, setCurrentPage] = useState({});
  const itemsPerPage = 5;

  // Search and Price filter state for each category
  const [searchTerms, setSearchTerms] = useState({});
  const [maxPrices, setMaxPrices] = useState({});

  useEffect(() => {
    dispatch(FetchComponents());
  }, [dispatch]);

  const groupedComponents = componentData ? componentData.reduce((acc, curr) => {
    if (!acc[curr.category]) {
      acc[curr.category] = [];
    }
    acc[curr.category].push(curr);
    return acc;
  }, {}) : {};

  const handlePageChange = (category, pageNum) => {
    setCurrentPage((prev) => ({
      ...prev,
      [category]: pageNum,
    }));
  };

  const handleSearchChange = (category, val) => {
    setSearchTerms((prev) => ({ ...prev, [category]: val }));
    handlePageChange(category, 1);
  };

  const handlePriceChange = (category, val) => {
    setMaxPrices((prev) => ({ ...prev, [category]: val }));
    handlePageChange(category, 1);
  };


  const addToCart = (component) => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    
    // Avoid adding the exact same component twice
    if (storedCart.find((item) => item._id === component._id)) {
      toast.warn(`${component.name} is already in the cart`);
      return;
    }
    
    const updatedCart = [...storedCart, component];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success(`Added ${component.name} to cart`);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      <div className="border-b border-slate-200/80 pb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Available Components</h1>
          <p className="text-slate-500 text-sm mt-1">
            Browse and add components to build client laptop configurations.
          </p>
        </div>
      </div>

      {loading && componentData.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-3 border-indigo-600 border-t-transparent mb-3"></div>
          <p className="text-slate-600 font-medium text-sm">Loading components database...</p>
        </div>
      )}

      {Error && (
        <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-xl mb-4 text-sm flex items-center gap-2.5">
          <svg className="w-5 h-5 text-rose-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>{Error}</span>
        </div>
      )}

      {!loading && !Error && Object.keys(groupedComponents).length > 0 ? (
        <div className="space-y-8">
          {Object.keys(groupedComponents).map((category) => {
            const allItems = groupedComponents[category];
            const activePage = currentPage[category] || 1;
            
            const searchTerm = (searchTerms[category] || "").toLowerCase();
            const maxPrice = maxPrices[category] ? Number(maxPrices[category]) : null;

            const filteredItems = allItems.filter((item) => {
              const matchesName = item.name.toLowerCase().includes(searchTerm);
              const matchesPrice = maxPrice !== null ? item.currentPrice <= maxPrice : true;
              return matchesName && matchesPrice;
            });

            const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
            const startIndex = (activePage - 1) * itemsPerPage;
            const paginatedItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

            return (
              <div key={category} className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-indigo-600"></div>
                    <h3 className="text-base font-bold text-slate-900 uppercase tracking-wide">
                      {category}
                    </h3>
                  </div>
                  <span className="text-xs font-semibold text-slate-500 bg-slate-100 border border-slate-200/60 px-3 py-1 rounded-full w-max">
                    Showing {filteredItems.length} of {allItems.length}
                  </span>
                </div>

                {/* Filters Row */}
                <div className="flex flex-col sm:flex-row gap-3 mb-4 bg-slate-50 p-3 rounded-xl border border-slate-200/70">
                  <div className="relative flex-grow">
                    <svg className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                      type="text"
                      placeholder="Search by name..."
                      value={searchTerms[category] || ""}
                      onChange={(e) => handleSearchChange(category, e.target.value)}
                      className="w-full border border-slate-200 rounded-lg pl-9 pr-3 py-2 bg-white text-xs text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 focus:outline-none transition"
                    />
                  </div>
                  <div className="relative w-full sm:w-44">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold pointer-events-none">
                      ₹
                    </span>
                    <input
                      type="number"
                      placeholder="Max price..."
                      value={maxPrices[category] || ""}
                      onChange={(e) => handlePriceChange(category, e.target.value)}
                      className="w-full border border-slate-200 rounded-lg pl-7 pr-3 py-2 bg-white text-xs text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 focus:outline-none tabular-nums transition"
                    />
                  </div>
                </div>

                {filteredItems.length > 0 ? (
                  <>
                    <div className="overflow-x-auto rounded-xl border border-slate-200/80">
                      <table className="min-w-full divide-y divide-slate-100">
                        <thead className="bg-slate-50/80">
                          <tr>
                            <th className="px-5 py-3 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                              Component Name
                            </th>
                            <th className="px-5 py-3 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                              Price (₹)
                            </th>
                            <th className="px-5 py-3 text-center text-[11px] font-semibold text-slate-500 uppercase tracking-wider w-36">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                          {paginatedItems.map((component) => (
                            <tr key={component._id} className="hover:bg-slate-50/80 transition-colors">
                              <td className="px-5 py-3.5 font-semibold text-slate-900 text-sm">
                                <div>{component.name}</div>
                                <div className="text-xs text-slate-400 font-normal mt-0.5 max-w-md">{component.description}</div>
                              </td>
                              <td className="px-5 py-3.5 font-bold text-slate-900 text-sm whitespace-nowrap tabular-nums">
                                ₹{Number(component.currentPrice).toLocaleString("en-IN")}
                              </td>
                              <td className="px-5 py-3.5 whitespace-nowrap text-center text-sm">
                                <button
                                  onClick={() => addToCart(component)}
                                  className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold px-3 py-1.5 rounded-lg text-xs transition duration-150 cursor-pointer shadow-xs"
                                >
                                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                  </svg>
                                  Add to Cart
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                      <div className="flex items-center justify-between mt-4 bg-slate-50/60 px-4 py-2 rounded-xl border border-slate-200/70">
                        <button
                          onClick={() => handlePageChange(category, Math.max(activePage - 1, 1))}
                          disabled={activePage === 1}
                          className="px-3 py-1.5 border border-slate-200 rounded-lg text-slate-600 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-white font-medium transition cursor-pointer text-xs"
                        >
                          Previous
                        </button>
                        
                        <div className="flex gap-1">
                          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                            <button
                              key={pageNum}
                              onClick={() => handlePageChange(category, pageNum)}
                              className={`w-7 h-7 flex items-center justify-center rounded-lg font-semibold text-xs transition cursor-pointer ${
                                activePage === pageNum
                                  ? "bg-indigo-600 text-white shadow-xs"
                                  : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-100"
                              }`}
                            >
                              {pageNum}
                            </button>
                          ))}
                        </div>

                        <button
                          onClick={() => handlePageChange(category, Math.min(activePage + 1, totalPages))}
                          disabled={activePage === totalPages}
                          className="px-3 py-1.5 border border-slate-200 rounded-lg text-slate-600 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-white font-medium transition cursor-pointer text-xs"
                        >
                          Next
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-8 text-slate-400 font-medium bg-slate-50/50 rounded-xl border border-slate-200/60 text-xs">
                    No components match the specified filters.
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        !loading && !Error && (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200/80 shadow-xs text-slate-400 font-medium text-sm">
            No components found.
          </div>
        )
      )}
    </div>
  );
}
