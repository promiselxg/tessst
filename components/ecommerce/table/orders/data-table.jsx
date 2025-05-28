"use client";
import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  Download,
  Loader2,
  MenuSquare,
  Trash2,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { apiCall } from "@/lib/utils/api";
import { toast } from "sonner";
import Image from "next/image";
import { Switch } from "@/components/ui/switch";

export function OrderTable({ columns, data, loading }) {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);

  const handleGetSelectedIds = async () => {
    const selectedIds = table
      .getSelectedRowModel()
      .rows.map((row) => row.original.id);

    if (selectedIds.length < 2) {
      toast.error("Please select at least 2 products to delete.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await apiCall("delete", "/product", {
        ...selectedIds,
      });
      toast.success(response?.message || "Products deleted successfully!");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to delete products."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const columnLabels = {
    orderItems: "Items",
    payment: "Payment Method",
    orderStatus: "Payment Status",
    amount: "Total",
    createdAt: "Date",
    user: "Customer",
    order_Id: "Order ID",
    action: "Action",
  };

  return (
    <div>
      <div className="rounded-md p-2">
        <div className="flex justify-between py-4 gap-3">
          <div className="flex w-full gap-4 justify-between">
            <Input
              placeholder="Enter order ID"
              type="search"
              value={table.getColumn("order_Id")?.getFilterValue() ?? ""}
              disabled={isLoading}
              onChange={(event) =>
                table.getColumn("order_Id")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="text-sm font-normal flex items-center gap-2 border py-2 px-2 cursor-pointer rounded-md">
                    <Download className="w-4 h-4" />
                    Export <ChevronDown className="w-4 h-4" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full bg-white shadow-lg">
                  <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                    <Image
                      src="/img/excel-icon.svg"
                      alt="excel"
                      width={20}
                      height={20}
                    />
                    Excel
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                    <Image
                      src="/img/csv-icon.svg"
                      alt="excel"
                      width={20}
                      height={20}
                    />
                    CSV
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                    <Image
                      src="/img/pdf-icon.svg"
                      alt="excel"
                      width={20}
                      height={20}
                    />
                    PDF
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div
                    className="text-sm font-normal flex items-center gap-2 border py-2 px-2 cursor-pointer rounded-md"
                    disabled={isLoading}
                  >
                    <MenuSquare className="w-4 h-4" />
                    Filter columns
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => (
                      <div
                        key={column.id}
                        className="flex items-center justify-between px-2 py-1.5 cursor-default hover:bg-muted"
                      >
                        <span className="text-sm text-slate-700">
                          {columnLabels[column.id] || column.id}
                        </span>
                        <Switch
                          checked={column.getIsVisible()}
                          onCheckedChange={(value) =>
                            column.toggleVisibility(!!value)
                          }
                          className="data-[state=checked]:bg-emerald-500"
                        />
                      </div>
                    ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
        <div className="text-sm text-muted-foreground px-2 py-2 flex items-center gap-3">
          <div>
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <Button
            onClick={() => handleGetSelectedIds()}
            size="icon"
            className=" bg-red-500 hover:bg-red-600 text-black disabled:cursor-not-allowed"
            disabled={
              table.getSelectedRowModel().rows.length === 0 || isLoading
            }
          >
            {isLoading ? (
              <>
                <Loader2 className=" animate-spin" /> please wait...
              </>
            ) : (
              <Trash2 />
            )}
          </Button>
        </div>

        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          {loading ? (
            <>
              <tbody>
                <tr>
                  <td colSpan="9">
                    <div className="p-5 w-full space-y-2">
                      <Skeleton className="h-2 w-full bg-sky-700 rounded-full" />
                      <Skeleton className="h-2 w-2/3 bg-sky-500 rounded-full" />
                      <Skeleton className="h-2 w-1/3 bg-sky-300 rounded-full" />
                    </div>
                  </td>
                </tr>
              </tbody>
            </>
          ) : (
            <TableBody className="relative">
              {isLoading && (
                <tr>
                  <td colSpan={columns.length}>
                    <span className="absolute top-0 left-0 right-0 bottom-0 w-full h-full bg-[rgba(0,0,0,0.1)] z-30 flex justify-center items-center"></span>
                  </td>
                </tr>
              )}
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          )}
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
