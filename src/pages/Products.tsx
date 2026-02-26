import { useMemo } from 'react';
import { useTheme } from '@/components/crm/ThemeContext';
import { channels, MockSpecifics, mockTickets, personnel, products } from '@/components/crm/mockData';
import StatCard from '@/components/crm/StatCard';
import { Package, Car, Shield, Users, Smartphone, Heart} from 'lucide-react';
import CrmTable from '@/components/Table';
import { Actions, AssignTo, Customer, RiskBadge, StatusBadge } from '@/lib/commons';

const productIcons = {
    pay_n_drive: Car,
    annual_cover: Shield,
    family_cover: Users,
    recharge_with_care: Smartphone,
    medcover: Heart,
};

export default function Products() {
    const { role } = useTheme();

    const tickets = mockTickets;


    // Calculate product stats
    const stats = useMemo(() => {
        const productStats = products.map(product => {
            const productTickets = tickets.filter(t => t.product_id === product.id);
            return {
                id: product.id,
                name: product.name,
                total: productTickets.length,
                open: productTickets.filter(t => t.status === 'Open').length,
                resolved: productTickets.filter(t => t.status === 'Resolved').length,
            };
        });
        return productStats;
    }, [tickets]);


    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Products</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        {role === 'admin' ? 'View and analyze tickets by product' : 'Monitor product-related tickets'}
                    </p>
                </div>
            </div>

            {/* Product Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {stats.map(product => (
                    <StatCard
                        key={product.id}
                        title={product.name}
                        value={product.total}
                        Icon={productIcons[product.id as keyof typeof productIcons] || Package}
                        color="primary"
                        trend={product.open > 0 ? { value: product.open, direction: 'up', label: 'open' } : undefined}
                    />
                ))}
            </div>

            {/* Tickets Table */}
            <CrmTable
                data={tickets}
                isFiltering
                isPaginated={true}
                header={{
                    title: 'Tickets',
                    resultCount: tickets.length,
                    button: null,
                    searchPlaceholder: 'Search a ticket',
                    filters: [
                        {
                            key: 'ticket_id',
                            label: 'Ticket ID',
                            type: 'input',
                        },
                        {
                            key: 'customer',
                            label: 'Customer',
                            type: 'select',
                            options: [...personnel.map((p) => p.name)]
                        },
                        {
                            key: 'product',
                            label: 'Product',
                            type: 'select',
                            options: [...products.map(product => product.name)],
                        },
                        {
                            key: 'Channel',
                            label: 'Channel',
                            type: 'select',
                            options: channels,
                        },
                        {
                            key: 'specifics',
                            label: 'Specifics',
                            type: 'select',
                            options: [...MockSpecifics],
                        },
                        {
                            key: 'assignee',
                            label: 'Assignee',
                            type: "select",
                            options: [...personnel.map((p) => p.name)]
                        },
                        {
                            key: "created_by",
                            label: "Created By",
                            type: "select",
                            options: [...personnel.map((p) => p.name)]
                        },
                        {
                            key: "risk_level",
                            label: "Risk Level",
                            type: "select",
                            options: ["High", "Medium", "Low"]
                        },
                        {
                            key: 'status',
                            label: 'Status',
                            type: 'select',
                            options: ['Open', 'Resolved', 'Pending', 'Escalated'],
                        }
                    ]
                }}
                columns={[
                    {
                        key: 'ticket_id', header: 'Ticket ID', render: (item: any) =>
                            <p className="font-medium text-primary-color whitespace-nowrap">
                                {item.ticket_id}
                            </p>
                    },
                    { key: 'customer', header: 'Customer', render: (item: any) => <Customer name={item.customer_name} contact_number={item.contact_number} /> },
                    { key: 'product_name', header: 'Product' },
                    { key: 'channel', header: 'Channel' },
                    // { key: 'specifics', header: 'Specifics' },
                    { key: 'assignee', header: 'Assignee', render: (item: any) => <AssignTo ticket={item} /> },
                    // { key: 'created_by', header: 'Created By', render: (item: any) => <CreatedBy ticket={item} /> },
                    { key: 'risk_level', header: 'Risk Level', render: (item: any) => <RiskBadge risk={item.risk_level} /> },
                    { key: 'status', header: 'Status', render: (item: any) => <StatusBadge status={item.status} /> },
                    { key: 'created_date', header: 'Created At' },
                    { key: 'actions', header: 'Actions', render: (item: any) => <Actions ticket={item} /> },
                ]}
            />


        </div>
    );
}




