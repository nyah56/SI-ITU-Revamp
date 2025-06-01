'use client';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
import ModalDelete from '@/components/shared/modal-delete';

import { useState } from 'react';
export type Order = {
    id: number;
    consumer_name: string;
};

export const columns = (onEditClick: (id: number) => void, onDeleteClick: (id: number) => void): ColumnDef<Order>[] => [
    {
        accessorKey: 'consumer_name',

        header: 'Consumer Name',
    },

    {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
            const product = row.original;
            const [dropdownOpen, setDropdownOpen] = useState(false);

            return (
                <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => onEditClick(product.id)}>Edit</DropdownMenuItem>

                        <ModalDelete
                            onDelete={() => {
                                onDeleteClick(product.id);
                                setDropdownOpen(false);
                            }}
                            trigger={<DropdownMenuItem onSelect={(e) => e.preventDefault()}>Delete</DropdownMenuItem>}
                        ></ModalDelete>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
