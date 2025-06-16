import { DataTable, Meta } from '@/components/shared/data-table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Order, columns } from '../../components/order/columns';
// import DialogComponent from './modal';
import { router, usePage } from '@inertiajs/react';

import { CreateModal } from '@/components/order/create-modal';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { EditModal } from '../../components/order/edit-modal';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Order',
        href: '/order',
    },
];

type Consumer = {
    id: string;
    consumer_name: string;
    phone: string | null;
    email: string | null;
    address: string | null;
};
export default function DemoPage() {
    const searchColumn = { placeholder: 'Consumer', filter: 'consumer_name' };
    const { orders } = usePage<{ orders: { data: Order[]; meta: Meta } }>().props;
    const { consumers } = usePage<{ consumers: Consumer[] }>().props;
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [combo, setCombo] = useState({
        consumer: '',
        status: '',
    });
    // console.log(consumers);
    const [values, setValues] = useState({
        consumer_name: '',
        status: '',
    });

    useEffect(() => {
        if (!open) {
            setValues({ consumer_name: '', status: '' });
            setCombo({ consumer: '', status: '' });
        }
    }, [open]);

    // Reset values when the edit modal closes
    useEffect(() => {
        if (!openEdit) {
            setValues({ consumer_name: '', status: '' });
            setCombo({ consumer: '', status: '' });
        }
    }, [openEdit]);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const key = e.target.id;
        const value = e.target.value;
        setValues((values) => ({
            ...values,
            [key]: value,
        }));
    };

    const handleConsumer = (e: string) => {
        setCombo({ ...combo, consumer: e });
        // setValues((values) => ({
        //     ...values,
        //     consumer_name: e,
        // }));
        setValues((values) => ({
            ...values,
            consumer_name: e,
        }));
    };
    const handleStatus = (e: string) => {
        setCombo({ ...combo, status: e });

        setValues((values) => ({
            ...values,
            status: e,
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

    const statusData = [
        { value: 'pending', label: 'Pending' },
        { value: 'processing', label: 'Processing' },
        { value: 'completed', label: 'Completed' },
        { value: 'cancelled', label: 'Cancelled' },
    ];
    const data = consumers.map((i: Consumer) => ({
        value: i.id,
        label: i.consumer_name,
    }));

    const handleEditClick = async (id: Order['id']) => {
        setId(id);
        // console.log(id);
        const response = await axios.get(`/order/${id}`);
        const result = response.data;
        const getCombo = data.find((item: { value: string }) => item.value === result.consumer_id);
        // console.log(getCombo?.value);
        // setCombo(getCombo.value);
        setCombo({ consumer: getCombo?.value ?? '', status: result.status });

        setOpenEdit(true);
        setValues({ consumer_name: result.consumer_id, status: result.status });
    };
    const handleUpdate = () => {
        // setName(e);
        // console.log(id);
        router.patch(route('order.update', id), values);
        setOpenEdit(false);
        // alert(JSON.stringify(values));
    };

    const handleDelete = async (id: Order['id']) => {
        // console.log(id);

        router.delete(route('order.destroy', id));
    };
    const createDialog = {
        open: open,
        onOpenChange: setOpen,
        title: 'Insert New Customer Data',
        description: 'Insert New Customer To Database',
        inputValues: values,
        onInputChange: handleChange,
        comboBoxValue: { consumer: combo.consumer, status: combo.status },
        onComboboxChange: { consumer: handleConsumer, status: handleStatus },
        comboKeyPair: { consumer: data, status: statusData },
        handleSubmit: handleSubmit,
    };
    const editDialog = {
        open: openEdit,
        onOpenChange: setOpenEdit,
        title: 'Edit Order Data',
        description: 'Edit Order Data',
        onInputChange: handleChange,
        comboBoxValue: { consumer: combo.consumer, status: combo.status },
        onComboboxChange: { consumer: handleConsumer, status: handleStatus },
        comboKeyPair: { consumer: data, status: statusData },
        handleSubmit: handleUpdate,
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="container mx-auto py-10">
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between">
                        <h2>{breadcrumbs[0].title} List</h2>
                        <CreateModal {...createDialog}></CreateModal>
                        <EditModal {...editDialog}></EditModal>
                    </div>

                    <DataTable meta={orders.meta} columns={columns(handleEditClick, handleDelete)} data={orders.data} search={searchColumn} />
                </div>
            </div>
        </AppLayout>
    );
}
