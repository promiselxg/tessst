import {
  CreditCard,
  Banknote,
  HandCoins,
  HelpCircle,
  PiggyBank,
} from "lucide-react";

const methodMap = {
  CARD: {
    label: "Card",
    icon: <CreditCard className="w-4 h-4 mr-1" />,
    className: "bg-blue-100 text-blue-800",
  },
  PAYPAL: {
    label: "PayPal",
    icon: <Banknote className="w-4 h-4 mr-1" />,
    className: "bg-yellow-100 text-yellow-800",
  },
  BANK_TRANSFER: {
    label: "Bank Transfer",
    icon: <PiggyBank className="w-4 h-4 mr-1" />,
    className: "bg-green-100 text-green-800",
  },
  CASH_ON_DELIVERY: {
    label: "Cash on Delivery",
    icon: <HandCoins className="w-4 h-4 mr-1" />,
    className: "bg-green-100 text-gray-800",
  },
};

export default function PaymentMethodBadge({ method }) {
  const payment = methodMap[method] || {
    label: "No Paid",
    icon: <HelpCircle className="w-4 h-4 mr-1" />,
    className: "bg-slate-100 text-slate-700",
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${payment.className}`}
    >
      {payment.icon}
      {payment.label}
    </span>
  );
}
