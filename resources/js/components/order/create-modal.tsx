import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { ComboboxDemo } from './combo';
type ModalProps = {
    title: string;
    description?: string;
    trigger?: React.ReactNode;
    footer?: React.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;

    comboBoxValue: {
        consumer: string;
        status: string;
    };
    onComboboxChange: {
        consumer: (value: string) => void;
        status: (value: string) => void;
    };
    comboKeyPair: {
        consumer: Array<{ value: string; label: string }>;
        status: Array<{ value: string; label: string }>;
    };
    handleSubmit: () => void;
};
export function CreateModal({ title, description, open, onOpenChange, comboBoxValue, onComboboxChange, comboKeyPair, handleSubmit }: ModalProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
                <Button variant="outline">New</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[768px]" onOpenAutoFocus={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    {description && <DialogDescription>{description}</DialogDescription>}
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Consumer Name
                        </Label>

                        <ComboboxDemo
                            placeholder="Consumer"
                            value={comboBoxValue.consumer}
                            onChange={onComboboxChange.consumer}
                            keyValuePair={comboKeyPair.consumer}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Order Status
                        </Label>

                        <ComboboxDemo
                            placeholder="Order Status"
                            value={comboBoxValue.status}
                            onChange={onComboboxChange.status}
                            keyValuePair={comboKeyPair.status}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleSubmit}>Save</Button>
                </DialogFooter>
                {/* {footer && <DialogFooter>{footer}</DialogFooter>} */}
            </DialogContent>
        </Dialog>
    );
}
