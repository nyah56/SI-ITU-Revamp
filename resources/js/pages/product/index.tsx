import { Button } from '@/components/ui/button';

import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Product, columns } from '../../components/product/columns';
import { DataTable, Meta } from '../../components/shared/data-table';
// import DialogComponent from './modal';
import { router, usePage } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { DialogComponent } from '../../components/product/modal';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Product',
        href: '/product',
    },
];

export default function DemoPage() {
    const searchColumn = { placeholder: 'Product', filter: 'product_name' };
    const { products } = usePage<{
        products: {
            data: Product[];
            meta: Meta;
        };
    }>().props;
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [values, setValues] = useState({
        product_name: '',
    });
    // console.log(products);
    useEffect(() => {
        if (!open) {
            setValues({ product_name: '' });
        }
    }, [open]);
    // conso
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
    const handleEditClick = async (id: Product['id']) => {
        console.log(id);
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
    const handleDelete = async (id: Product['id']) => {
        // console.log(id);

        router.delete(route('product.destroy', id));
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
                    <DataTable meta={products.meta} columns={columns(handleEditClick, handleDelete)} data={products.data} search={searchColumn} />
                </div>
            </div>
        </AppLayout>
    );
}
