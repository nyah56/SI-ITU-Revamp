import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
type ModalProps = {
    title: string;
    description?: string;
    trigger?: React.ReactNode;
    footer?: React.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    inputValues?: {
        consumer_name: string;
        phone: string;
        email: string;
        address: string;
    };
    onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
export function DialogComponent({ title, description, trigger, footer, open, onOpenChange, inputValues, onInputChange }: ModalProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
            <DialogContent className="sm:max-w-[768px]" onOpenAutoFocus={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    {description && <DialogDescription>{description}</DialogDescription>}
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    {' '}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Consumer Name
                        </Label>
                        <Input
                            id="consumer_name"
                            autoFocus={false}
                            autoComplete="off"
                            className="col-span-3"
                            onChange={onInputChange}
                            value={inputValues?.consumer_name ?? ''}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="phone" className="text-right">
                            Phone Number
                        </Label>
                        <Input
                            id="phone"
                            autoFocus={false}
                            autoComplete="off"
                            className="col-span-3"
                            onChange={onInputChange}
                            value={inputValues?.phone ?? ''}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                            Email (Optional)
                        </Label>
                        <Input
                            id="email"
                            autoFocus={false}
                            autoComplete="off"
                            className="col-span-3"
                            onChange={onInputChange}
                            value={inputValues?.email ?? ''}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="address" className="text-right">
                            Address
                        </Label>
                        <Input
                            id="address"
                            autoFocus={false}
                            autoComplete="off"
                            className="col-span-3"
                            onChange={onInputChange}
                            value={inputValues?.address ?? ''}
                        />
                    </div>
                </div>
                {footer && <DialogFooter>{footer}</DialogFooter>}
            </DialogContent>
        </Dialog>
    );
}
