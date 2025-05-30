'use client'

import * as React from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { psuChartData } from "@/lib/constants"
import { cn } from "@/lib/utils"

export type PSUData = typeof psuChartData[number]

export const columns: ColumnDef<PSUData>[] = [
    {
        accessorKey: "month",
        header: "Month",
    },
    {
        accessorKey: "internetPSUs",
        header: "Internet PSUs",
        cell: info => {
            const v = info.getValue<number>()
            return v.toLocaleString()  // e.g. 1234567 → "1,234,567"
        },
    },
    {
        accessorKey: "videoPSUs",
        header: "Video PSUs",
        cell: info => {
            const v = info.getValue<number>()
            return v.toLocaleString()  // e.g. 1234567 → "1,234,567"
        },
    },
    {
        accessorKey: "voicePSUs",
        header: "Voice PSUs",
        cell: info => {
            const v = info.getValue<number>()
            return v.toLocaleString()  // e.g. 1234567 → "1,234,567"
        },
    },
    {
        accessorKey: "mobilePSUs",
        header: "Mobile PSUs",
        cell: info => {
            const v = info.getValue<number>()
            return v.toLocaleString()  // e.g. 1234567 → "1,234,567"
        },
    },
    {
        accessorKey: "mobileLines",
        header: "Mobile Lines",
        cell: info => {
            const v = info.getValue<number>()
            return v.toLocaleString()  // e.g. 1234567 → "1,234,567"
        },
    },
]

export function SimpleDataTable() {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const table = useReactTable({
        data: psuChartData,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    return (
        <div className="w-full">
            <div className="flex items-center justify-start space-x-2 py-4">
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
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            <div className={cn(
                                                "text-left"
                                            )}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(header.column.columnDef.header, header.getContext())}
                                            </div>
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => {
                                        return (
                                            <TableCell key={cell.id}>
                                                <div className={cn(
                                                    "text-left"
                                                )}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </div>
                                            </TableCell>
                                        )
                                    }
                                    )}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}