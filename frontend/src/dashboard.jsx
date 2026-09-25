import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchComponents } from "./sclies/componentSclies.jsx";
import { FetchQuotations } from "./sclies/quotationSclies.jsx";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { componentData } = useSelector((state) => state.compo);
  const { quotations } = useSelector((state) => state.quotation);

  useEffect(() => {
    dispatch(FetchComponents());
    if (user?.role === "admin") {
      dispatch(FetchQuotations());
    }
  }, [dispatch, user]);

  const totalComponents = componentData ? componentData.length : 0;
  const totalQuotations = quotations ? quotations.length : 0;

  const componentsWithPriceLogs = componentData
    ? componentData.filter((c) => c.priceHistory && c.priceHistory.length > 1).length
    : 0;

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200/80 pb-5">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">System Dashboard</h1>
        <p className="text-sm text-slate-500 mt-1">Overview of system metrics, catalog parts, and configuration quotations.</p>
      </div>

      {/* Account Profile Card */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-lg shadow-xs">
            {user?.userName ? user.userName.charAt(0).toUpperCase() : "U"}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900 leading-tight">
                {user?.userName}
              </h2>
            </div>
            <p className="text-sm text-slate-500">{user?.email}</p>
          </div>
        </div>

        <span className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-700 border border-indigo-100/80 text-xs font-semibold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
          {user?.role === "admin" ? "Administrator" : "Sales Executive"}
        </span>
      </div>

      {/* Metrics Cards */}
      {user?.role === "admin" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs hover:border-slate-300 transition duration-150">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase font-semibold text-slate-500 tracking-wider">
                Total Hardware Parts
              </span>
              <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
            </div>
            <span className="block text-3xl font-extrabold text-slate-900 tabular-nums">
              {totalComponents}
            </span>
            <span className="block text-xs text-slate-400 mt-2">Active parts in master database</span>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs hover:border-slate-300 transition duration-150">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase font-semibold text-slate-500 tracking-wider">
                Modified Price Logs
              </span>
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <span className="block text-3xl font-extrabold text-slate-900 tabular-nums">
              {componentsWithPriceLogs}
            </span>
            <span className="block text-xs text-slate-400 mt-2">Parts with recorded price adjustments</span>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs hover:border-slate-300 transition duration-150">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase font-semibold text-slate-500 tracking-wider">
                Submitted Quotations
              </span>
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <span className="block text-3xl font-extrabold text-slate-900 tabular-nums">
              {totalQuotations}
            </span>
            <span className="block text-xs text-slate-400 mt-2">Client quotations configured and saved</span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs hover:border-slate-300 transition duration-150">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase font-semibold text-slate-500 tracking-wider">
                Available Components Catalog
              </span>
              <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </div>
            </div>
            <span className="block text-3xl font-extrabold text-slate-900 tabular-nums">
              {totalComponents}
            </span>
            <span className="block text-xs text-slate-400 mt-2">Components ready for custom quotation builds</span>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase font-semibold text-slate-500 tracking-wider block mb-2">
                Quick Action
              </span>
              <h3 className="text-base font-bold text-slate-800">Custom Laptop Builder</h3>
              <p className="text-xs text-slate-500 mt-1">
                Browse all components by category, select specs, and generate instant client quotations.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-semibold text-indigo-600">
              Select "Build Configuration" or "View Components" from the menu
            </div>
          </div>
        </div>
      )}
    </div>
  );
}