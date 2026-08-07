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
    <div className="max-w-5xl mx-auto p-6 text-slate-800">
      <h2 className="text-3xl font-bold text-center mb-8">
        Price History Logs
      </h2>

      {loading && (
        <p className="text-center text-slate-600 font-semibold">Loading...</p>
      )}

      {Error && (
        <p className="text-center text-red-650 font-semibold">{Error}</p>
      )}

      {!loading && !Error && componentsWithHistory.length === 0 && (
        <p className="text-center text-slate-500 font-semibold">
          No Price History Available
        </p>
      )}

      {componentsWithHistory.map((component) => (
        <div
          key={component._id}
          className="bg-white shadow-md rounded-xl p-6 mb-8 border border-slate-200"
        >
          <h3 className="text-2xl font-bold text-slate-800">{component.name}</h3>

          <p className="text-slate-600 mt-1 text-base">
            Category: <span className="font-semibold">{component.category}</span>
          </p>

          <p className="text-slate-800 font-bold text-lg mt-1 mb-6">
            Current Price: ₹{Number(component.currentPrice).toLocaleString("en-IN")}
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-slate-200">
              <thead className="bg-slate-50 text-slate-700">
                <tr>
                  <th className="border border-slate-200 p-3 text-left font-semibold text-base">Old Price</th>
                  <th className="border border-slate-200 p-3 text-left font-semibold text-base">New Price</th>
                  <th className="border border-slate-200 p-3 text-left font-semibold text-base">Updated At</th>
                </tr>
              </thead>

              <tbody className="text-slate-800 text-base">
                {component.priceHistory
                  .slice(1)
                  .map((history, index) => (
                    <tr key={index} className="hover:bg-slate-50 transition-colors">
                      <td className="border border-slate-200 p-3 font-semibold text-slate-500 line-through">
                        ₹{Number(component.priceHistory[index].price).toLocaleString("en-IN")}
                      </td>

                      <td className="border border-slate-200 p-3 font-bold text-slate-900">
                        ₹{Number(history.price).toLocaleString("en-IN")}
                      </td>

                      <td className="border border-slate-200 p-3 font-medium">
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