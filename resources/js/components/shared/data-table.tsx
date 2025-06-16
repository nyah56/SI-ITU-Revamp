'use client';

import { Input } from '@/components/ui/input';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { router } from '@inertiajs/react';
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { DataTablePagination, links } from './data-table-pagination';

export type Meta = {
    current_page: number;
    from: number;
    last_page: number;
    links: links[];
    path: string;
    per_page: number;
    to: number;
    total: number;
};
interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    search: {
        filter: string;
        placeholder: string;
    };

    meta: Meta;
}
function debounce<Args extends unknown[]>(func: (...args: Args) => void, delay: number): (...args: Args) => void {
    let timer: ReturnType<typeof setTimeout>;

    return (...args: Args) => {
        clearTimeout(timer);
        timer = setTimeout(() => func(...args), delay);
    };
}
type searchFilter = {
    search?: string;
    per_page?: string;
};
export function DataTable<TData, TValue>({ columns, data, search, meta }: DataTableProps<TData, TValue>) {
    const [filter, setFilter] = useState({ search: '', per_page: '10' });
    const debouncedSearch = useMemo(
        () =>
            debounce((value: searchFilter) => {
                router.get(
                    route(route().current() ?? ''),
                    { search: value.search, per_page: value.per_page },
                    {
                        preserveState: true,
                        replace: true,
                    },
                );
            }, 300),
        [],
    );

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = { per_page: filter.per_page, ...(e.target.value && e.target.value !== '' && { search: e.target.value }) };

        setFilter({ ...filter, search: value.search ?? '' });
        debouncedSearch(value);
    };
    const handleChange = (e: string) => {
        // console.log(e);
        const value = { per_page: e, ...(filter.per_page && filter.search !== '' && { search: filter.search }) };
        setFilter({ ...filter, per_page: value.per_page });
        router.get(
            route(route().current() ?? ''),
            { per_page: value.per_page, search: value.search },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [sorting, setSorting] = useState<SortingState>([{ id: search.filter, desc: false }]);
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        // getPaginationRowModel: getPaginationRowModel(),
        onColumnFiltersChange: setColumnFilters,
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),

        state: {
            columnFilters,
            sorting,
        },
    });

    return (
        <>
            <div className="flex items-center py-4">
                <Input placeholder={`Search ${search.placeholder}`} value={filter.search} onChange={handleSearch} className="max-w-sm" />
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                    ))}
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
            <div className="flex items-center justify-end space-x-2 py-4">
                <DataTablePagination meta={meta} select={handleChange} />
            </div>
        </>
    );
}
