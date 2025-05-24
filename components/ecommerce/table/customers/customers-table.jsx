"use client";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/authProvider";

import { useCustomersColumns } from "./useCustomersColumns";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getAllCustomers } from "@/service/ecommerce/customerService";
import { CustomersDataTable } from "./data-table";

const CustomersTable = () => {
  const { user } = useAuth();
  const customerColumn = useCustomersColumns();
  const router = useRouter();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAllCustomers = async () => {
      try {
        setLoading(true);
        const response = await getAllCustomers();
        setCustomers(response.customerOrderSummary);
      } catch (error) {
        toast.error(
          error?.response?.data?.message ||
            error?.message ||
            "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchAllCustomers();
  }, []);

  useEffect(() => {
    if (!user?.id) router.replace("/auth/login");
  }, [user?.id, router]);

  return (
    <>
      <TableContainer
        title="Customers"
        loading={loading}
        customers={customers}
        columns={customerColumn}
      />
    </>
  );
};

const TableContainer = ({ title, loading, customers, columns }) => (
  <div className="w-full bg-white rounded-bl-lg rounded-br-lg overflow-hidden mt-10">
    <div className="flex w-full p-6">
      <div className="container mx-auto bg-white shadow p-4 rounded-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold mb-4"></h2>
          <Button disabled={loading}>
            <Plus />
            Add customers
          </Button>
        </div>
        <CustomersDataTable
          columns={columns}
          data={customers}
          loading={loading}
        />
      </div>
    </div>
  </div>
);

export default CustomersTable;
