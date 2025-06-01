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
    inputValues?: {
        consumer_name: string;
    };

    onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
};
export function DialogComponent({
    title,
    description,
    trigger,
    footer,
    open,
    onOpenChange,
    inputValues,
    onInputChange,
    comboBoxValue,
    onComboboxChange,
    comboKeyPair,
}: ModalProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
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
                {footer && <DialogFooter>{footer}</DialogFooter>}
            </DialogContent>
        </Dialog>
    );
}
