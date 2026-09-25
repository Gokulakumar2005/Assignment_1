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
    <div className="w-full max-w-5xl mx-auto space-y-6">
      <div className="border-b border-slate-200/80 pb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Submitted Quotations</h1>
          <p className="text-slate-500 text-sm mt-1">
            Review client quotations submitted by sales executives.
          </p>
        </div>
        {!loading && !Error && quotations.length > 0 && (
          <span className="text-xs font-semibold text-slate-500 bg-white border border-slate-200 px-3.5 py-1.5 rounded-full shadow-2xs w-max">
            Total Quotations: {quotations.length}
          </span>
        )}
      </div>

      {loading && quotations.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-3 border-indigo-600 border-t-transparent mb-3"></div>
          <p className="text-slate-600 font-medium text-sm">Loading quotations...</p>
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

      {!loading && !Error && quotations.length > 0 ? (
        <div className="space-y-4">
          {quotations.map((quote) => (
            <QuotationCard key={quote._id} quote={quote} />
          ))}
        </div>
      ) : (
        !loading && !Error && (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200/80 shadow-xs text-slate-400 font-medium text-sm">
            No quotations have been submitted yet.
          </div>
        )
      )}
    </div>
  );
}
