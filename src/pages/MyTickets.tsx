import { useState, useMemo } from 'react';
import { List, LayoutGrid } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import KanbanBoard from '@/components/crm/KanbanBoard';
import CreateTicketModal from '@/components/crm/createTicketModal/CreateTicketModal';
import { mockTickets } from '@/components/crm/mockData';
import { channels, MockSpecifics, personnel, products } from '@/components/crm/mockData';
import { Actions, AssignTo, Customer, RiskBadge, StatusBadge } from '@/lib/commons';
import CrmTable from '@/components/Table';



export default function MyTickets() {
    const [tickets, setTickets] = useState(mockTickets);
    const [view, setView] = useState('table');
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [filters, setFilters] = useState({
        channel: 'all',
        department: 'all',
        status: 'all',
        risk: 'all',
    });



    // Filter for current user's tickets (simulating Christiana Appiah)
    const myTickets = useMemo(() => {
        return tickets.filter(t => t.assigned_to === 'christiana@ayo.com');
    }, [tickets]);



    const filteredTickets = useMemo(() => {
        return myTickets.filter(ticket => {
            if (filters.channel !== 'all' && ticket.channel !== filters.channel) return false;
            if (filters.department !== 'all' && ticket.department !== filters.department) return false;
            if (filters.status !== 'all' && ticket.status !== filters.status) return false;
            if (filters.risk !== 'all' && ticket.risk_level !== filters.risk) return false;
            return true;
        });
    }, [myTickets, filters]);



    const handleCreateTicket = (newTicket: any) => {
        // Auto-assign to current user
        const assignedTicket = {
            ...newTicket,
            assigned_to: 'christiana@ayo.com',
            assigned_to_name: 'Christiana Appiah',
        };
        setTickets([assignedTicket, ...tickets]);
    };

    const handleStatusChange = (ticket: any, newStatus: string) => {
        setTickets(tickets.map(t =>
            (t.id || t.ticket_id) === (ticket.id || ticket.ticket_id)
                ? { ...t, status: newStatus }
                : t
        ));
    };

    return (
        <>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Tickets</h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">
                            {filteredTickets.length} tickets assigned to you
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        {/* View Toggle */}
                        <Tabs value={view} onValueChange={setView}>
                            <TabsList className="bg-gray-100 dark:bg-slate-800">
                                <TabsTrigger value="table" className="gap-2">
                                    <List className="w-4 h-4" />
                                    <span className="hidden sm:inline">List</span>
                                </TabsTrigger>
                                <TabsTrigger value="kanban" className="gap-2">
                                    <LayoutGrid className="w-4 h-4" />
                                    <span className="hidden sm:inline">Kanban</span>
                                </TabsTrigger>
                            </TabsList>
                        </Tabs>
                        <CreateTicketModal onCreateTicket={handleCreateTicket} />
                    </div>
                </div>

                {/* Content */}
                {view === 'table' ? (
                    <CrmTable
                        data={mockTickets}
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
                ) : (
                    <KanbanBoard tickets={filteredTickets} onTicketClick={setSelectedTicket} onStatusChange={handleStatusChange} />
                )}
            </div>

        </>
    );
}