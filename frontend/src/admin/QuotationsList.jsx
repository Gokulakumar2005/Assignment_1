import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchQuotations } from "../sclies/quotationSclies.jsx";
import QuotationCard from "./QuotationCard.jsx";

export default function QuotationsList() {
  const dispatch = useDispatch();
  const { quotations, loading, Error } = useSelector((state) => state.quotation);

  useEffect(() => {
    dispatch(FetchQuotations());
  }, [dispatch]);

  return (
    <div className="w-full max-w-5xl bg-white shadow-lg rounded-xl p-8 mx-auto mt-6">
      <div className="border-b pb-4 mb-6">
        <h2 className="text-3xl font-extrabold text-slate-800">Submitted Quotations</h2>
      </div>

      {loading && quotations.length === 0 && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-slate-800 border-t-transparent mb-4"></div>
          <p className="text-slate-800 font-semibold">Loading quotations...</p>
        </div>
      )}

      {Error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 text-center shadow-sm">
          {Error}
        </div>
      )}

      {!loading && !Error && quotations.length > 0 ? (
        <div className="space-y-6">
          {quotations.map((quote) => (
            <QuotationCard key={quote._id} quote={quote} />
          ))}
        </div>
      ) : (
        !loading && !Error && (
          <div className="text-center py-16 text-slate-400 font-medium bg-slate-50 rounded-xl border border-slate-100">
            No quotations have been submitted yet.
          </div>
        )
      )}
    </div>
  );
}
