import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { useState } from 'react';
import ModalDelete from './modal-delete';
type propsTypes = {
    onEditClick: () => void;
    onDeleteClick: () => void;
};
export const ActionColumn = ({ onEditClick, onDeleteClick }: propsTypes) => {
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
                <DropdownMenuItem onClick={onEditClick}>Edit</DropdownMenuItem>

                <ModalDelete
                    onDelete={() => {
                        onDeleteClick();
                        setDropdownOpen(false);
                    }}
                    trigger={<DropdownMenuItem onSelect={(e) => e.preventDefault()}>Delete</DropdownMenuItem>}
                ></ModalDelete>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
