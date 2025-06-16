'use client';

import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { ActionColumn } from '../shared/action-column';
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

import { Badge } from '@/components/ui/badge';
export type Order = {
    id: number;
    consumer_name: string;
    status: string;
};
export const columns = (onEditClick: (id: number) => void, onDeleteClick: (id: number) => void): ColumnDef<Order>[] => [
    {
        accessorKey: 'id',

        header: 'Order ID',
    },
    {
        accessorKey: 'consumer_name',

        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Consumer Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: 'status',

        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },

        cell: ({ row }) => {
            const status = row.original.status;
            const capitalizedStatus = status.charAt(0).toUpperCase() + status.slice(1);
            return (
                <Badge
                    className={
                        status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : status === 'cancelled'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-gray-100 text-gray-800'
                    }
                >
                    {capitalizedStatus}
                </Badge>
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
