import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchComponents } from "../sclies/componentSclies.jsx";

export default function PriceHistoryLogs() {
  const dispatch = useDispatch();

  const { componentData, loading, Error } = useSelector(
    (state) => state.compo
  );

  useEffect(() => {
    dispatch(FetchComponents());
  }, [dispatch]);

  const componentsWithHistory =
    componentData?.filter(
      (item) => item.priceHistory && item.priceHistory.length > 1
    ) || [];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      <div className="border-b border-slate-200/80 pb-5">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Price History Logs
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Historical record of all component price modifications and revisions.
        </p>
      </div>

      {loading && (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-3 border-indigo-600 border-t-transparent mb-3"></div>
          <p className="text-slate-600 font-medium text-sm">Loading price logs...</p>
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

      {!loading && !Error && componentsWithHistory.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200/80 shadow-xs text-slate-400 font-medium text-sm">
          No price modification logs available yet.
        </div>
      )}

      {!loading && !Error && componentsWithHistory.map((component) => (
        <div
          key={component._id}
          className="bg-white shadow-xs rounded-2xl p-6 sm:p-7 border border-slate-200/80"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-5 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">{component.name}</h2>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-600 border border-slate-200/60 uppercase tracking-wide">
                  {component.category}
                </span>
              </div>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-xs uppercase font-semibold text-slate-400">Current Price:</span>
              <span className="text-xl font-black text-indigo-600 tabular-nums">
                ₹{Number(component.currentPrice).toLocaleString("en-IN")}
              </span>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200/80">
            <table className="w-full divide-y divide-slate-100">
              <thead className="bg-slate-50/80">
                <tr>
                  <th className="px-5 py-3 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                    Previous Price
                  </th>
                  <th className="px-5 py-3 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                    Updated Price
                  </th>
                  <th className="px-5 py-3 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                    Revision Date
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 bg-white">
                {component.priceHistory
                  .slice(1)
                  .map((history, index) => (
                    <tr key={index} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-5 py-3.5 font-medium text-slate-400 line-through tabular-nums text-sm">
                        ₹{Number(component.priceHistory[index].price).toLocaleString("en-IN")}
                      </td>

                      <td className="px-5 py-3.5 font-bold text-emerald-700 tabular-nums text-sm">
                        ₹{Number(history.price).toLocaleString("en-IN")}
                      </td>

                      <td className="px-5 py-3.5 text-xs text-slate-500 font-medium tabular-nums">
                        {new Date(history.updatedAt).toLocaleString("en-IN", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}