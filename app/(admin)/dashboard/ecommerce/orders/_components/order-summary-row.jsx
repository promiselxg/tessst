import { formatCurrency } from "@/lib/utils/formatCurrency";

const OrderSummaryRow = ({ label, value, bold }) => (
  <div className="grid grid-cols-6 gap-6 items-center p-4 bg-gray-50 border-t">
    <div className="col-span-3" />
    <div
      className={`col-span-2 text-center text-sm font-medium text-slate-700 ${
        bold && "text-base font-semibold"
      }`}
    >
      {label}:
    </div>
    <div
      className={`text-sm font-semibold text-slate-900 ${
        bold && "text-base font-bold"
      }`}
    >
      {formatCurrency(value)}
    </div>
  </div>
);

export default OrderSummaryRow;
