import { Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDateTime } from "@/lib/utils/getDateDifference";

function getStatusVariant(status) {
  switch (status?.toLowerCase()) {
    case "paid":
    case "fulfilled":
      return "success";
    case "pending":
      return "warning";
    case "cancelled":
    case "failed":
      return "destructive";
    case "refunded":
      return "secondary";
    default:
      return "outline";
  }
}

export function OrderHeader({
  orderId,
  paymentStatus,
  fulfillmentStatus,
  date,
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <h1 className="text-2xl font-bold text-slate-800">
        Order <span className="text-primary">#{orderId}</span>
      </h1>

      <div className="flex flex-wrap items-center gap-3 text-sm">
        <Badge
          variant={getStatusVariant(paymentStatus)}
          className="capitalize text-xs font-[400] rounded-[5px]"
        >
          {paymentStatus}
        </Badge>
        <Badge
          variant={getStatusVariant(fulfillmentStatus)}
          className="capitalize text-xs font-[400] rounded-[5px]"
        >
          {fulfillmentStatus}
        </Badge>
        <div className="flex items-center gap-2 text-slate-600">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <span>{formatDateTime(date)}</span>
        </div>
      </div>
    </div>
  );
}
