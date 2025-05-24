import React from "react";
import DashboardHeader from "../../../_components/dashboard/header";
import CustomerDetails from "./customer-details";

const page = ({ params }) => {
  const breadcrumbs = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Customers", href: "/dashboard/ecommerce/customers/" },
    { name: "Customer Details" },
  ];
  return (
    <>
      <DashboardHeader breadcrumbs={breadcrumbs} />
      <CustomerDetails customerId={params.customerId} />
    </>
  );
};

export default page;
