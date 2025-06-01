import { Button } from '@/components/ui/button';

import { DataTable } from '@/components/shared/data-table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Order, columns } from '../../components/order/columns';
// import DialogComponent from './modal';
import { router, usePage } from '@inertiajs/react';

import axios from 'axios';
import { SetStateAction, useEffect, useState } from 'react';
import { DialogComponent } from '../../components/order/modal';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Order',
        href: '/order',
    },
];

export default function DemoPage() {
    const { orders } = usePage<{ orders: Order[] }>().props;
    const { consumers } = usePage<any>().props;
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [framework, setFramework] = useState('');
    const [values, setValues] = useState({
        consumer_name: '',
    });

    useEffect(() => {
        if (!open) {
            setValues({ consumer_name: '' });
            setFramework('');
        }
    }, [open]);

    // Reset values when the edit modal closes
    useEffect(() => {
        if (!openEdit) {
            setValues({ consumer_name: '' });
            setFramework('');
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
    const data = consumers.map((i: Order) => ({
        value: i.id,
        label: i.consumer_name,
    }));
    const handleCombo = (e: SetStateAction<any>) => {
        setFramework(e);
        setValues((values) => ({
            ...values,
            consumer_name: e,
        }));
    };
    const handleSubmit = () => {
        // setName(e);
        // console.log(values);
        router.post(route('order.store'), values);
        setOpen(false);
        // alert(JSON.stringify(values));
    };
    const [id, setId] = useState<number | undefined>();
    const handleEditClick = async (id: number) => {
        setId(id);
        const res = await axios.get(`/farmer/${id}`);
        const data = res.data;
        setOpenEdit(true);
        setValues(data);
        // console.log(res.data); // open the modal
    };
    const handleUpdate = () => {
        // setName(e);
        // console.log(id);
        router.patch(route('farmer.update', id), values);
        setOpenEdit(false);
        // alert(JSON.stringify(values));
    };

    const handleDelete = async (id: any) => {
        // console.log(id);

        router.delete(route('farmer.destroy', id));
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
                            title="Insert New Customer Data"
                            description="Insert New Customer To Database"
                            trigger={<Button variant="outline">New</Button>}
                            inputValues={values}
                            onInputChange={handleChange}
                            comboBoxValue={framework}
                            onComboboxChange={handleCombo}
                            comboKeyPair={data}
                            footer={<Button onClick={handleSubmit}>Save</Button>}
                        ></DialogComponent>
                        {/* <DialogComponent
                            open={openEdit}
                            onOpenChange={setOpenEdit}
                            title="Edit Product"
                            description={`Edit Customer Data [${values.consumer_name}]`}
                            inputValues={values}
                            onInputChange={handleChange}
                            comboBoxValue={framework}
                            onComboboxChange={setFramework}
                            comboKeyPair={data}
                            footer={<Button onClick={handleUpdate}>Save</Button>}
                        ></DialogComponent> */}
                    </div>

                    <DataTable columns={columns(handleEditClick, handleDelete)} data={orders} />
                </div>
            </div>
        </AppLayout>
    );
}
