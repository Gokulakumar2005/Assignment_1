import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { FetchComponents, UpdateComponentPrice, DeleteComponent } from "../sclies/componentSclies.jsx";
import { toast } from "react-toastify";

export default function ShowComponent() {
    const dispatch = useDispatch();
    const { componentData, loading, Error } = useSelector((state) => state.compo);
    
    // Modal state for price updates
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeComponent, setActiveComponent] = useState(null);
    const [priceInput, setPriceInput] = useState("");

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

    const openUpdateModal = (component) => {
        setActiveComponent(component);
        setPriceInput(component.currentPrice.toString());
        setIsModalOpen(true);
    };

    const handleUpdatePriceSubmit = (e) => {
        e.preventDefault();
        const newPrice = Number(priceInput);
        if (isNaN(newPrice) || newPrice <= 0) {
            toast.error("Please enter a valid price amount greater than 0");
            return;
        }

        dispatch(UpdateComponentPrice({ id: activeComponent._id, currentPrice: newPrice }))
            .unwrap()
            .then(() => {
                toast.success("Price updated successfully!");
                setIsModalOpen(false);
                setActiveComponent(null);
                setPriceInput("");
            })
            .catch((err) => {
                toast.error(err || "Failed to update price");
            });
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this component?")) {
            dispatch(DeleteComponent(id))
                .unwrap()
                .then(() => {
                    toast.success("Component deleted successfully!");
                })
                .catch((err) => {
                    toast.error(err || "Failed to delete component");
                });
        }
    };

    return (
        <div className="w-full max-w-5xl bg-white shadow-md rounded-xl p-8 mx-auto mt-6 relative border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b pb-4">
                Component Database
            </h2>

            {loading && componentData.length === 0 && (
                <div className="text-center py-10 text-slate-650 font-medium">
                    Loading components...
                </div>
            )}

            {Error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-center">
                    {Error}
                </div>
            )}

            {!loading && !Error && Object.keys(groupedComponents).length > 0 ? (
                <div className="space-y-10">
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
                                        <div className="overflow-x-auto bg-white rounded-lg border border-slate-200">
                                            <table className="min-w-full divide-y divide-slate-200">
                                                <thead className="bg-slate-50">
                                                    <tr>
                                                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                                            Component Name
                                                        </th>
                                                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                                            Description
                                                        </th>
                                                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                                            Price (₹)
                                                        </th>
                                                        <th className="px-6 py-3 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider w-44">
                                                            Actions
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-slate-100">
                                                    {paginatedItems.map((component) => (
                                                        <tr key={component._id} className="hover:bg-slate-50 transition-colors">
                                                            <td className="px-6 py-4 font-semibold text-slate-800 text-sm">
                                                                {component.name}
                                                            </td>
                                                            <td className="px-6 py-4 text-xs text-slate-500 max-w-xs truncate">
                                                                {component.description}
                                                            </td>
                                                            <td className="px-6 py-4 font-bold text-slate-900 text-sm whitespace-nowrap">
                                                                ₹{Number(component.currentPrice).toLocaleString("en-IN")}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-center text-xs space-x-3">
                                                                <button
                                                                    onClick={() => openUpdateModal(component)}
                                                                    className="text-slate-700 hover:text-slate-900 font-semibold hover:underline cursor-pointer"
                                                                >
                                                                    Update Price
                                                                </button>
                                                                <button
                                                                    onClick={() => handleDelete(component._id)}
                                                                    className="text-red-600 hover:text-red-900 font-semibold hover:underline cursor-pointer"
                                                                >
                                                                    Delete
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>

                                        {/* Pagination Controls */}
                                        {totalPages > 1 && (
                                            <div className="flex items-center justify-between mt-4 bg-white px-4 py-2 rounded-lg border border-slate-200">
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
                                                                    ? "bg-slate-800 text-white shadow-sm"
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
                                    <div className="text-center py-6 text-slate-400 font-medium bg-white rounded-lg border border-slate-200 text-sm">
                                        No components match filters.
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            ) : (
                !loading && !Error && (
                    <div className="text-center py-10 text-gray-500 font-medium">
                        No components found in database.
                    </div>
                )
            )}

            {/* Custom Modal Popup for price updates */}
            {isModalOpen && activeComponent && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity">
                    <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl transform scale-100 transition-all border border-slate-200">
                        <h3 className="text-2xl font-bold text-slate-800 mb-2">
                            Update Price
                        </h3>
                        <p className="text-sm text-slate-500 mb-6">
                            Changing price for <strong className="text-slate-800">{activeComponent.name}</strong>
                        </p>

                        <form onSubmit={handleUpdatePriceSubmit} className="space-y-6">
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                                    New Price (₹)
                                </label>
                                <input
                                    type="number"
                                    value={priceInput}
                                    onChange={(e) => setPriceInput(e.target.value)}
                                    placeholder="Enter new price"
                                    className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-550 font-medium text-lg text-slate-800"
                                    required
                                    autoFocus
                                />
                            </div>

                            <div className="flex gap-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsModalOpen(false);
                                        setActiveComponent(null);
                                    }}
                                    className="flex-1 border border-slate-200 text-slate-600 py-3 rounded-lg font-semibold hover:bg-slate-50 transition duration-150 cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 bg-slate-800 hover:bg-slate-900 text-white py-3 rounded-lg font-semibold transition duration-150 cursor-pointer shadow-md"
                                >
                                    Save Price
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}