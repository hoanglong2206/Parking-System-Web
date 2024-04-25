import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronDown } from "lucide-react";
import { columnsManagement, Management } from "@/components/";

const data: Management[] = [
  {
    id: "m5gr84i9",
    license_plate: "51B-123",
    checkIn: "2024-02-01T08:00:00.000Z",
    checkOut: "2024-02-01T12:00:00.000Z",
    slot: "A1",
    status: "success",
  },
  {
    id: "3u1reuv4",
    license_plate: "51B-123",
    checkIn: "2024-03-03T12:00:00.000Z",
    checkOut: "2024-03-03T14:00:00.000Z",
    slot: "A2",
    status: "success",
  },
  {
    id: "derv1ws0",
    license_plate: "51B-1232",
    checkIn: "2024-01-01T08:00:00.000Z",
    checkOut: null,
    slot: "A12",
    status: "pending",
  },
  {
    id: "2v3d4f5",
    license_plate: "51A-1232",
    checkIn: "2024-03-01T09:00:00.000Z",
    checkOut: "2024-03-01T12:00:00.000Z",
    slot: "A20",
    status: "success",
  },
  {
    id: "a1v2d3f4",
    license_plate: "51C-123",
    checkIn: "2024-02-11T13:00:00.000Z",
    checkOut: "2024-02-11T15:00:00.000Z",
    slot: "A32",
    status: "success",
  },
  {
    id: "v1d2f3g4",
    license_plate: "68A-12322",
    checkIn: "2024-04-01T08:00:00.000Z",
    checkOut: null,
    slot: "A7",
    status: "pending",
  },
  {
    id: "v1d2f3g4",
    license_plate: "51B-123",
    checkIn: "2024-10-01T08:00:00.000Z",
    checkOut: null,
    slot: "A6",
    status: "pending",
  },
  {
    id: "p1o2i3u4",
    license_plate: "51B-123",
    checkIn: "2024-10-01T08:00:00.000Z",
    checkOut: null,
    slot: "A5",
    status: "pending",
  },
  {
    id: "m1n2b3v4",
    license_plate: "51B-123",
    checkIn: "2024-10-01T08:00:00.000Z",
    checkOut: "2024-10-01T12:00:00.000Z",
    slot: "A12",
    status: "success",
  },
];

const ManagementTable = () => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 8,
  });
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns: columnsManagement,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
  });

  React.useEffect(() => {
    table.setPagination(pagination);
  }, [pagination, table]);

  return (
    <div className="w-full">
      <div className="flex items-center py-4 gap-x-4">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
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
          <TableBody>
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
                  colSpan={columnsManagement.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
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
    </div>
  );
};

export default ManagementTable;
