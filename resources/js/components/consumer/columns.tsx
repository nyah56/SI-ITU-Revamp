'use client';

import { ColumnDef } from '@tanstack/react-table';
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
import { ActionColumn } from '../shared/action-column';
export type Consumer = {
    id: number;
    consumer_name: string;
    phone: string;
    email: string;
    address: string;
};

export const columns = (onEditClick: (id: number) => void, onDeleteClick: (id: number) => void): ColumnDef<Consumer>[] => [
    {
        accessorKey: 'consumer_name',

        header: 'Consumer Name',
    },
    {
        accessorKey: 'phone',

        header: 'Phone',
    },
    {
        accessorKey: 'email',

        cell: ({ row }) => row.original.email || 'Email is not Provided',
        header: 'Email',
    },
    {
        accessorKey: 'address',

        header: 'Address',
    },

    {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
            <ActionColumn onEditClick={() => onEditClick(row.original.id)} onDeleteClick={() => onDeleteClick(row.original.id)}></ActionColumn>
        ),
    },
];
