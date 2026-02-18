import { useState, useMemo } from 'react';
import { List, LayoutGrid } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TicketFilters from '@/components/crm/TicketFilters';
import TicketTable from '@/components/crm/TicketTable';
import KanbanBoard from '@/components/crm/KanbanBoard';
import TicketDetailModal from '@/components/crm/TicketDetailModal';
import CreateTicketModal from '@/components/crm/createTicketModal/CreateTicketModal';
import { mockTickets } from '@/components/crm/mockData';



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

                {/* Filters */}
                <TicketFilters filters={filters} setFilters={setFilters} />

                {/* Content */}
                {view === 'table' ? (
                    <TicketTable tickets={filteredTickets} onTicketClick={setSelectedTicket} />
                ) : (
                    <KanbanBoard tickets={filteredTickets} onTicketClick={setSelectedTicket} onStatusChange={handleStatusChange} />
                )}
            </div>

            <TicketDetailModal
                ticket={selectedTicket}
                open={!!selectedTicket}
                onClose={() => setSelectedTicket(null)}
            />
        </>
    );
}