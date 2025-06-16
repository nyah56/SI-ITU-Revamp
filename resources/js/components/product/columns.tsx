'use client';

import { Button } from '@/components/ui/button';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { ActionColumn } from '../shared/action-column';
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type Product = {
    id: number;
    product_name: string;
};
export const columns = (onEditClick: (id: number) => void, onDeleteClick: (id: number) => void): ColumnDef<Product>[] => [
    {
        accessorKey: 'product_name',

        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Product Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },

    {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
            <ActionColumn onEditClick={() => onEditClick(row.original.id)} onDeleteClick={() => onDeleteClick(row.original.id)}></ActionColumn>
        ),
    },
];
