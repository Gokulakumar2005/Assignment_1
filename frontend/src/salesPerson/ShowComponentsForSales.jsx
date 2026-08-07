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
    <div className="w-full max-w-5xl bg-white shadow-lg rounded-xl p-8 mx-auto mt-6">
      <div className="border-b pb-4 mb-6">
        <h2 className="text-3xl font-extrabold text-slate-800">Available Components</h2>
       
      </div>

      {loading && componentData.length === 0 && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-slate-650 border-t-transparent mb-4"></div>
          <p className="text-slate-600 font-semibold">Loading components database...</p>
        </div>
      )}

      {Error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 text-center shadow-sm">
          {Error}
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
              <div key={category} className="bg-slate-50/50 rounded-xl p-5 border border-slate-200 shadow-sm">
                <div className="flex justify-between items-center mb-4 border-b border-slate-200 pb-2">
                  <h3 className="text-lg font-bold text-slate-800 uppercase tracking-wide">
                    {category}
                  </h3>
                  <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
                    Total: {filteredItems.length} / {allItems.length}
                  </span>
                </div>

                {/* Filters Row */}
                <div className="flex flex-col sm:flex-row gap-4 mb-4 bg-slate-100/50 p-3 rounded-lg border border-slate-200/50">
                  <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchTerms[category] || ""}
                    onChange={(e) => handleSearchChange(category, e.target.value)}
                    className="flex-grow border border-slate-200 rounded-lg px-3 py-2 bg-white text-xs focus:ring-2 focus:ring-slate-500 focus:outline-none"
                  />
                  <input
                    type="number"
                    placeholder="Max price (₹)..."
                    value={maxPrices[category] || ""}
                    onChange={(e) => handlePriceChange(category, e.target.value)}
                    className="w-full sm:w-40 border border-slate-200 rounded-lg px-3 py-2 bg-white text-xs focus:ring-2 focus:ring-slate-500 focus:outline-none"
                  />
                </div>

                {filteredItems.length > 0 ? (
                  <>
                    <div className="overflow-x-auto bg-white rounded-lg border border-slate-100">
                      <table className="min-w-full divide-y divide-slate-100">
                        <thead className="bg-slate-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                              Component Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                              Price (₹)
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider w-36">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {paginatedItems.map((component) => (
                            <tr key={component._id} className="hover:bg-slate-50 transition-colors">
                              <td className="px-6 py-4 font-semibold text-slate-800 text-sm">
                                <div>{component.name}</div>
                                <div className="text-xs text-slate-400 font-normal truncate max-w-xs">{component.description}</div>
                              </td>
                              <td className="px-6 py-4 font-bold text-slate-900 text-sm whitespace-nowrap">
                                ₹{Number(component.currentPrice).toLocaleString("en-IN")}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                                <button
                                  onClick={() => addToCart(component)}
                                  className="bg-slate-800 hover:bg-slate-900 text-white font-bold px-3.5 py-1.5 rounded-lg text-xs transition cursor-pointer shadow-md shadow-slate-100"
                                >
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
                      <div className="flex items-center justify-between mt-4 bg-white px-4 py-2.5 rounded-lg border border-slate-100">
                        <button
                          onClick={() => handlePageChange(category, Math.max(activePage - 1, 1))}
                          disabled={activePage === 1}
                          className="px-2.5 py-1 border border-slate-200 rounded text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent font-medium transition cursor-pointer text-xs"
                        >
                          Prev
                        </button>
                        
                        <div className="flex gap-1">
                          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                            <button
                              key={pageNum}
                              onClick={() => handlePageChange(category, pageNum)}
                              className={`px-2.5 py-1 rounded font-semibold text-xs transition cursor-pointer ${
                                activePage === pageNum
                                  ? "bg-slate-850 text-white shadow-sm"
                                  : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                              }`}
                            >
                              {pageNum}
                            </button>
                          ))}
                        </div>

                        <button
                          onClick={() => handlePageChange(category, Math.min(activePage + 1, totalPages))}
                          disabled={activePage === totalPages}
                          className="px-2.5 py-1 border border-slate-200 rounded text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent font-medium transition cursor-pointer text-xs"
                        >
                          Next
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-6 text-slate-400 font-medium bg-white rounded-lg border border-slate-100 text-sm">
                    No components match filters.
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        !loading && !Error && (
          <div className="text-center py-12 text-slate-400 font-medium">
            No components found.
          </div>
        )
      )}
    </div>
  );
}
