"use client";

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
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export function VehicleDataTable({ columns, data, loading }) {
  const [columnFilters, setColumnFilters] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      columnFilters,
      sorting,
      columnVisibility,
    },
  });

  return (
    <div className="rounded-md border my-5 p-5 bg-white mb-20">
      <div className="flex items-center py-4 justify-between w-full">
        <Input
          placeholder="Search Table"
          value={table.getColumn("vehicle_name")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("vehicle_name")?.setFilterValue(event.target.value)
          }
          className="w-full md:w-1/3"
        />
      </div>
      <Table className="border w-full">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className="border">
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
                <td colSpan="7">
                  <div className="p-5 w-full space-y-2">
                    <Skeleton className="h-2 w-full bg-[#171726] rounded-full" />
                    <Skeleton className="h-2 w-2/3 bg-[#212136] rounded-full" />
                    <Skeleton className="h-2 w-1/3 bg-[#0d0d16] rounded-full" />
                  </div>
                </td>
              </tr>
            </tbody>
          </>
        ) : (
          <TableBody className="border">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="border">
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
      <div className="space-x-2 py-4 float-right">
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
