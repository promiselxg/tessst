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

import { Loader2, Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { apiCall } from "@/lib/utils/api";
import { toast } from "sonner";
import ConfirmAlertModal from "@/components/alert/confirm-alert";

export function ProjectCategoryTable({ columns, data, loading }) {
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
      toast.error("Please select at least 2 items to delete.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await apiCall("delete", "/project", {
        ...selectedIds,
      });
      toast.success(response?.message || "categories deleted successfully!");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to delete categories."
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

  return (
    <div>
      <div className="rounded-md p-2">
        <div className="flex justify-between py-4 gap-3">
          <div className="flex w-1/2 gap-4">
            <Input
              placeholder="search by category name"
              value={table.getColumn("title")?.getFilterValue() ?? ""}
              disabled={isLoading}
              onChange={(event) =>
                table.getColumn("title")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
          </div>
        </div>
        <div className="text-sm text-muted-foreground px-2 py-2 flex items-center gap-3">
          <div>
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <ConfirmAlertModal
            title="Delete Categories"
            description="Are you sure you want to delete the selected categories? This action cannot be undone."
            confirmText="Delete"
            onConfirm={handleGetSelectedIds}
            isLoading={isLoading}
          >
            <Button
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
          </ConfirmAlertModal>
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
                  <td colSpan="8">
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
