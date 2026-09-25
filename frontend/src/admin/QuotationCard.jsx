export default function QuotationCard({ quote }) {
  const handlePrintPdf = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const dateStr = quote.createdAt
      ? new Date(quote.createdAt).toLocaleDateString("en-IN", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : new Date().toLocaleDateString("en-IN");

    const rows = quote.items
      .map(
        (item, idx) => `
        <tr>
          <td style="padding: 10px 12px; border-bottom: 1px solid #e2e8f0; font-size: 13px; color: #64748b;">${idx + 1}</td>
          <td style="padding: 10px 12px; border-bottom: 1px solid #e2e8f0; font-size: 13px; font-weight: 600; color: #4338ca; text-transform: uppercase;">${item.category}</td>
          <td style="padding: 10px 12px; border-bottom: 1px solid #e2e8f0; font-size: 13px; font-weight: 600; color: #0f172a;">${item.name}</td>
          <td style="padding: 10px 12px; border-bottom: 1px solid #e2e8f0; font-size: 13px; font-weight: 700; color: #0f172a; text-align: right;">₹${Number(item.price).toLocaleString("en-IN")}</td>
        </tr>
      `
      )
      .join("");

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Quotation - ${quote.clientName}</title>
          <style>
            @page { size: A4; margin: 20mm; }
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b; margin: 0; padding: 20px; }
            .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #4f46e5; padding-bottom: 20px; margin-bottom: 25px; }
            .logo { font-size: 22px; font-weight: 800; color: #4f46e5; letter-spacing: -0.5px; }
            .sublogo { font-size: 12px; color: #64748b; margin-top: 3px; }
            .quote-title { font-size: 18px; font-weight: 700; text-align: right; color: #0f172a; }
            .quote-meta { font-size: 12px; color: #64748b; text-align: right; margin-top: 4px; }
            .info-grid { display: flex; justify-content: space-between; margin-bottom: 25px; }
            .info-block { font-size: 13px; }
            .info-label { font-size: 10px; font-weight: 700; text-transform: uppercase; color: #94a3b8; letter-spacing: 0.5px; margin-bottom: 4px; }
            .info-val { font-size: 14px; font-weight: 600; color: #0f172a; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 25px; }
            th { background: #f8fafc; border-bottom: 2px solid #cbd5e1; padding: 10px 12px; font-size: 11px; text-transform: uppercase; font-weight: 700; color: #475569; text-align: left; letter-spacing: 0.5px; }
            .total-box { margin-left: auto; width: 280px; background: #f1f5f9; padding: 15px 20px; border-radius: 8px; border: 1px solid #e2e8f0; }
            .total-row { display: flex; justify-content: space-between; font-size: 15px; font-weight: 800; color: #1e1b4b; }
            .total-amount { color: #4f46e5; font-size: 20px; }
            .footer { margin-top: 40px; border-top: 1px solid #e2e8f0; padding-top: 15px; font-size: 11px; color: #94a3b8; text-align: center; }
            img { display: none !important; }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <div class="logo">LAPTOP CONFIGURATOR</div>
              <div class="sublogo">Custom Hardware Architecture & Quotation</div>
            </div>
            <div>
              <div class="quote-title">OFFICIAL QUOTATION</div>
              <div class="quote-meta">Date: ${dateStr}</div>
              <div class="quote-meta">Quote Ref: #${(quote._id || "").slice(-8).toUpperCase()}</div>
            </div>
          </div>

          <div class="info-grid">
            <div class="info-block">
              <div class="info-label">Prepared For</div>
              <div class="info-val">${quote.clientName}</div>
            </div>
            ${
              quote.saleExecutive?.userName
                ? `
              <div class="info-block" style="text-align: right;">
                <div class="info-label">Sales Executive</div>
                <div class="info-val">${quote.saleExecutive.userName}</div>
                <div style="font-size: 12px; color: #64748b;">${quote.saleExecutive.email || ""}</div>
              </div>
            `
                : ""
            }
          </div>

          <table>
            <thead>
              <tr>
                <th style="width: 40px;">#</th>
                <th style="width: 150px;">Category</th>
                <th>Component Specification</th>
                <th style="text-align: right; width: 120px;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${rows}
            </tbody>
          </table>

          <div class="total-box">
            <div class="total-row">
              <span>Total Amount:</span>
              <span class="total-amount">₹${Number(quote.totalPrice).toLocaleString("en-IN")}</span>
            </div>
          </div>

          <div class="footer">
            Thank you for choosing Laptop Configurator. This quotation is valid for 30 days from date of issue.
          </div>

          <script>
            window.onload = function() {
              window.print();
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-xs hover:border-slate-300 transition duration-150">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-100 pb-4 mb-4 gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <span className="block text-[10px] uppercase font-bold tracking-wider text-slate-400">Client Quotation</span>
            <span className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
              {quote.clientName}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handlePrintPdf}
            className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200/80 transition cursor-pointer shadow-2xs"
            title="Download or Print Quotation as PDF without images"
          >
            <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            <span>Download PDF</span>
          </button>

          <div className="flex items-center gap-2 bg-indigo-50/60 border border-indigo-100/70 px-4 py-2 rounded-xl">
            <span className="text-xs uppercase font-semibold text-indigo-500">
              Total:
            </span>
            <span className="text-lg font-black text-indigo-700 tabular-nums">
              ₹{Number(quote.totalPrice).toLocaleString("en-IN")}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-1 mb-2">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Configured Specifications ({quote.items.length})</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {quote.items.map((item, idx) => (
          <div
            key={idx}
            className="bg-slate-50 border border-slate-200/70 rounded-xl p-2.5 flex justify-between items-center gap-2"
          >
            <div className="min-w-0 flex-1">
              <span className="block text-[10px] text-indigo-600 font-bold uppercase tracking-wider leading-none">
                {item.category}
              </span>
              <span className="block text-xs font-semibold text-slate-800 truncate mt-0.5">
                {item.name}
              </span>
            </div>
            <span className="font-bold text-slate-900 text-xs shrink-0 tabular-nums">
              ₹{Number(item.price).toLocaleString("en-IN")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
