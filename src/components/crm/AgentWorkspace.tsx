import { formatDistanceToNow } from 'date-fns';
import { Ticket, Clock, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import StatCard from './StatCard';
import CreateTicketModal from './CreateTicketModal';


const statusColors = {
    Open: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    Pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    Escalated: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    Resolved: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
};




type AgentWorkspaceProps = {
    tickets: any;
    onTicketClick: any
    onCreateTicket: any
}





export default function AgentWorkspace({ tickets, onTicketClick, onCreateTicket }: AgentWorkspaceProps) {
    // Filter for agent's tickets (simulating current user = Christiana Appiah)
    const myTickets = tickets.filter((t: any) => t.assigned_to === 'christiana@ayo.com');
    const activeTickets = myTickets.filter((t: any) => t.status !== 'Resolved');
    const pendingTickets = myTickets.filter((t: any) => t.status === 'Pending');
    const escalatedTickets = myTickets.filter((t: any) => t.status === 'Escalated');

    const recentComments = [
        { author: 'Selorm Tsegah', ticket: 'TKT-00023', content: 'Customer confirmed receipt of documents.', time: '2 hours ago' },
        { author: 'Rosina Baah', ticket: 'TKT-00045', content: 'Escalating to claims department.', time: '4 hours ago' },
        { author: 'Kwame Mensah', ticket: 'TKT-00012', content: 'Payment processed successfully.', time: '6 hours ago' },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Workspace</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Welcome back, Christiana</p>
                </div>
                <CreateTicketModal onCreateTicket={onCreateTicket} />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    title="My Active Tickets"
                    value={activeTickets.length}
                    Icon={Ticket}
                    color="green"
                />
                <StatCard
                    title="Pending Response"
                    value={pendingTickets.length}
                    Icon={Clock}
                    color="orange"
                />
                <StatCard
                    title="Escalated"
                    value={escalatedTickets.length}
                    Icon={AlertCircle}
                    color="red"
                />
                <StatCard
                    title="Resolved This Month"
                    value={myTickets.filter((t: any) => t.status === 'Resolved').length}
                    Icon={Ticket}
                    color="blue"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Active Tickets */}
                <div className="crm-bg-border rounded-xl  p-6">
                    <h2 className="font-semibold text-gray-900 dark:text-white mb-4">My Active Tickets</h2>
                    <div className="space-y-3">
                        {activeTickets.slice(0, 5).map((ticket: any) => (
                            <div
                                key={ticket.id || ticket.ticket_id}
                                onClick={() => onTicketClick(ticket)}
                                className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 cursor-pointer transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-sm font-medium text-primary-color">{ticket.ticket_id}</span>
                                    <span className="text-gray-700 dark:text-gray-300">{ticket.customer_name}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Badge className={cn('text-xs w-16 flex itemce justify-center', statusColors[ticket.status as keyof typeof statusColors])}>
                                        {ticket.status}
                                    </Badge>
                                    <span className="text-xs text-gray-400">
                                        {formatDistanceToNow(new Date(ticket.created_date), { addSuffix: true })}
                                    </span>
                                </div>
                            </div>
                        ))}
                        {activeTickets.length === 0 && (
                            <p className="text-center text-gray-400 dark:text-gray-500 py-8">
                                No active tickets assigned to you.
                            </p>
                        )}
                    </div>
                </div>

                {/* Recent Comments */}
                <div className="crm-bg-border rounded-xl p-6">
                    <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Recent Comments</h2>
                    <div className="space-y-4">
                        {recentComments.map((comment, index) => (
                            <div key={index} className="flex gap-3">
                                <div className="w-8 h-8 rounded-full bg-[#2D6A4F]/10 flex-shrink-0 flex items-center justify-center">
                                    <span className="text-[#2D6A4F] text-xs font-medium">
                                        {comment.author.split(' ').map(n => n[0]).join('')}
                                    </span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-baseline gap-2">
                                        <span className="font-medium text-gray-900 dark:text-white text-sm">
                                            {comment.author}
                                        </span>
                                        <span className="text-xs text-[#2D6A4F]">{comment.ticket}</span>
                                        <span className="text-xs text-gray-400">{comment.time}</span>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5 truncate">
                                        {comment.content}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}