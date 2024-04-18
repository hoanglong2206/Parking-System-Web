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
import { UserManagement, columnsUser } from "@/components";

const data: UserManagement[] = [
  {
    id: "m5gr84i9",
    name: "Monserrat",
    email: "ken99@yahoo.com",
    gender: "Female",
    age: 25,
    joinDate: "2021-10-01",
  },
  {
    id: "3u1reuv4",
    name: "Silas",
    email: "Abe45@gmail.com",
    gender: "Male",
    age: 20,
    joinDate: "2020-10-01",
  },
  {
    id: "derv1ws0",
    name: "Carmella",
    email: "Monserrat44@gmail.com",
    gender: "Female",
    age: 22,
    joinDate: "2019-10-01",
  },
  {
    id: "2v3d4f5",
    name: "Luna",
    email: "Luna@gmail.com",
    gender: "Male",
    age: 23,
    joinDate: "2021-12-01",
  },
  {
    id: "a1v2d3f4",
    name: "Abe",
    email: "Abe@gmail.com",
    gender: "Female",
    age: 25,
    joinDate: "2021-10-03",
  },
  {
    id: "v1d2f3g4",
    name: "Oscar",
    email: "Oscar@gmail.com",
    gender: "Other",
    age: 23,
    joinDate: "2020-12-01",
  },
  {
    id: "v1d2f3g4",
    name: "Oscar",
    email: "Oscar@gmail.com",
    gender: "Male",
    age: 20,
    joinDate: "2021-10-22",
  },
  {
    id: "p1o2i3u4",
    name: "Pablo",
    email: "Pablo@gmail.com",
    gender: "Other",
    age: 25,
    joinDate: "2020-8-26",
  },
  {
    id: "m1n2b3v4",
    name: "Xavier",
    email: "Xavier@gmail.com",
    gender: "Male",
    age: 25,
    joinDate: "2021-10-01",
  },
  {
    id: "z1x2c3v4",
    name: "Zach",
    email: "Zach@gmail.com",
    gender: "Female",
    age: 22,
    joinDate: "2021-5-01",
  },
];

const UserManagementTable = () => {
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
    columns: columnsUser,
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
                  colSpan={columnsUser.length}
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

export default UserManagementTable;
