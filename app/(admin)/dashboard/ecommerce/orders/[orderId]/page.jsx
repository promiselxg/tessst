import DashboardHeader from "../../../_components/dashboard/header";
import OrderDetails from "./order-details";

const page = async ({ params }) => {
  const breadcrumbs = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Orders", href: "/dashboard/ecommerce/orders" },
    { name: "Order Details" },
  ];

  return (
    <>
      <DashboardHeader breadcrumbs={breadcrumbs} />
      <OrderDetails orderId={params.orderId} />
    </>
  );
};

export default page;
