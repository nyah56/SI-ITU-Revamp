import { Button } from '@/components/ui/button';

import { DataTable, Meta } from '@/components/shared/data-table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Consumer, columns } from '../../components/consumer/columns';
// import DialogComponent from './modal';
import { router, usePage } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { DialogComponent } from '../../components/consumer/modal';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Consumer',
        href: '/consumer',
    },
];
export default function DemoPage() {
    const searchColumn = { placeholder: 'Consumer', filter: 'consumer_name' };
    const { consumers } = usePage<{ consumers: { data: Consumer[]; meta: Meta } }>().props;
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [values, setValues] = useState({
        consumer_name: '',
        phone: '',
        email: '',
        address: '',
    });
    useEffect(() => {
        if (!open) {
            setValues({ consumer_name: '', phone: '', email: '', address: '' });
        }
    }, [open]);

    // Reset values when the edit modal closes
    useEffect(() => {
        if (!openEdit) {
            setValues({ consumer_name: '', phone: '', email: '', address: '' });
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
        router.post(route('consumer.store'), values);
        setOpen(false);
        // alert(JSON.stringify(values));
    };
    const [id, setId] = useState<number | undefined>();
    const handleEditClick = async (id: Consumer['id']) => {
        setId(id);
        const res = await axios.get(`/consumer/${id}`);
        const data = res.data;
        setOpenEdit(true);
        setValues(data);
        // console.log(res.data); // open the modal
    };
    const handleUpdate = () => {
        // setName(e);
        // console.log(id);
        router.patch(route('consumer.update', id), values);
        setOpenEdit(false);
        // alert(JSON.stringify(values));
    };

    const handleDelete = async (id: Consumer['id']) => {
        // console.log(id);

        router.delete(route('consumer.destroy', id));
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
                            footer={<Button onClick={handleSubmit}>Save</Button>}
                        ></DialogComponent>
                        <DialogComponent
                            open={openEdit}
                            onOpenChange={setOpenEdit}
                            title="Edit Product"
                            description={`Edit Customer Data [${values.consumer_name}]`}
                            inputValues={values}
                            onInputChange={handleChange}
                            footer={<Button onClick={handleUpdate}>Save</Button>}
                        ></DialogComponent>
                    </div>
                    <DataTable meta={consumers.meta} columns={columns(handleEditClick, handleDelete)} data={consumers.data} search={searchColumn} />
                </div>
            </div>
        </AppLayout>
    );
}
