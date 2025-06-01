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
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
import ModalDelete from '@/components/shared/modal-delete';
import { useState } from 'react';
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
