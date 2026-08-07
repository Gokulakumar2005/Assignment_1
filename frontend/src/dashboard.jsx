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
    <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl p-8 mx-auto mt-6">
      <div className="border-b pb-4 mb-6">
        <h2 className="text-3xl font-black text-slate-800">System Dashboard</h2>
       
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-xs uppercase font-extrabold tracking-wider text-slate-500">
            Account Profile
          </span>
          <h3 className="text-xl font-bold text-slate-800 mt-1">
            {user?.userName}
          </h3>
          <p className="text-sm text-slate-600">{user?.email}</p>
        </div>
        <div>
          <span className="inline-block bg-slate-800 text-white text-xs font-black uppercase tracking-widest px-3.5 py-1.5 rounded-full shadow-sm">
            {user?.role === "admin" ? "Administrator" : "Sales Executive"}
          </span>
        </div>
      </div>

      {user?.role === "admin" ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-6 shadow-sm">
            <span className="block text-xs uppercase font-semibold text-slate-400 tracking-wider">
              Total Hardware Parts
            </span>
            <span className="block text-4xl font-black text-slate-850 mt-2">
              {totalComponents}
            </span>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-6 shadow-sm">
            <span className="block text-xs uppercase font-semibold text-slate-400 tracking-wider">
              Modified Price Logs
            </span>
            <span className="block text-4xl font-black text-slate-850 mt-2">
              {componentsWithPriceLogs}
            </span>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-6 shadow-sm">
            <span className="block text-xs uppercase font-semibold text-slate-400 tracking-wider">
              Submitted Quotations
            </span>
            <span className="block text-4xl font-black text-slate-850 mt-2">
              {totalQuotations}
            </span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-6 shadow-sm">
            <span className="block text-xs uppercase font-semibold text-slate-400 tracking-wider">
              Available Components Catalog
            </span>
            <span className="block text-4xl font-black text-slate-800 mt-2">
              {totalComponents}
            </span>
            
          </div>
        </div>
      )}
    </div>
  );
}