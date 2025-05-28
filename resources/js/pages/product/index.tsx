import { Button } from '@/components/ui/button';

import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { DataTable } from '../../components/shared/data-table';
import { Product, columns } from './columns';
// import DialogComponent from './modal';
import { router, usePage } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { DialogComponent } from './modal';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Product',
        href: '/product',
    },
];
export default function DemoPage() {
    const { products } = usePage<{ products: Product[] }>().props;
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [values, setValues] = useState({
        product_name: '',
    });
    useEffect(() => {
        if (!open) {
            setValues({ product_name: '' });
        }
    }, [open]);

    // Reset values when the edit modal closes
    useEffect(() => {
        if (!openEdit) {
            setValues({ product_name: '' });
        }
    }, [openEdit]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const key = e.target.id;
        const value = e.target.value;
        setValues((values) => ({
            ...values,
            [key]: value,
        }));
    }
    const handleSubmit = () => {
        // setName(e);
        router.post(route('product.store'), values);
        setOpen(false);
        // alert(JSON.stringify(values));
    };
    const [id, setId] = useState<number | undefined>();
    const handleEditClick = async (id: number) => {
        setId(id);
        const res = await axios.get(`/product/${id}`);
        const data = res.data;
        setOpenEdit(true);
        setValues(data);
        // console.log(res.data); // open the modal
    };
    const handleUpdate = () => {
        // setName(e);
        // console.log(id);
        router.patch(route('product.update', id), values);
        setOpenEdit(false);
        // alert(JSON.stringify(values));
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="container mx-auto py-10">
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between">
                        <h2>{breadcrumbs[0].title} List</h2>
                        <DialogComponent
                            open={open}
                            onOpenChange={setOpen}
                            title="Insert New Product"
                            description="Insert New Product To Database"
                            trigger={<Button variant="outline">New</Button>}
                            inputValues={values}
                            onInputChange={handleChange}
                            footer={<Button onClick={handleSubmit}>Save</Button>}
                        ></DialogComponent>
                        <DialogComponent
                            open={openEdit}
                            onOpenChange={setOpenEdit}
                            title="Edit Product"
                            description={`Edit Product ${values.product_name}`}
                            inputValues={values}
                            onInputChange={handleChange}
                            footer={<Button onClick={handleUpdate}>Save</Button>}
                        ></DialogComponent>
                    </div>
                    <DataTable columns={columns(handleEditClick)} data={products} />
                </div>
            </div>
        </AppLayout>
    );
}
