import { formatDistanceToNow } from 'date-fns';
import { AlertCircle, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';



const statusColors = {
    Open: 'open-bg',
    Pending: 'pending-bg',
    Escalated: 'escalated-bg',
    Resolved: 'resolved-bg',
};

const riskColors = {
    High: 'danger-bg',
    Medium: 'warning-bg',
    Low: 'low-bg',
};



type TicketTableProps = {
    tickets: any;
    onTicketClick: (val: any) => void
}



export default function TicketTable({ tickets, onTicketClick }: TicketTableProps) {
    return (
        <div className="crm-bg-border rounded-xl overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow className="bg-background h-14">
                        <TableHead className="font-bold">Ticket ID</TableHead>
                        <TableHead className="font-bold">Customer</TableHead>
                        <TableHead className="font-bold">Channel</TableHead>
                        <TableHead className="font-bold">Category</TableHead>
                        <TableHead className="font-bold">Risk</TableHead>
                        <TableHead className="font-bold">Status</TableHead>
                        <TableHead className="font-bold">Assignee</TableHead>
                        <TableHead className="font-bold">Created</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tickets.map((ticket: any) => (
                        <TableRow
                            key={ticket.id || ticket.ticket_id}
                            onClick={() => onTicketClick(ticket)}
                            className="cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors"
                        >
                            <TableCell className="font-medium text-primary-color whitespace-nowrap">
                                {ticket.ticket_id}
                            </TableCell>
                            <TableCell className='whitespace-nowrap'>
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-white">{ticket.customer_name}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{ticket.contact_number}</p>
                                </div>
                            </TableCell>
                            <TableCell className = 'whitespace-nowrap'>
                                <span className="text-gray-700 dark:text-gray-300">{ticket.channel}</span>
                            </TableCell>
                            <TableCell className = 'whitespace-nowrap'>
                                <span className="text-gray-700 dark:text-gray-300 text-sm">{ticket.category}</span>
                            </TableCell>
                            <TableCell className = 'whitespace-nowrap'>
                                <Badge className={cn('font-medium w-16 flex items-center justify-center', riskColors[ticket.risk_level as keyof typeof riskColors])}>
                                    {ticket.risk_level}
                                </Badge>
                            </TableCell>
                            <TableCell className = 'whitespace-nowrap'>
                                <Badge className={cn('font-medium w-16 flex items-center justify-center', statusColors[ticket.status as keyof typeof statusColors])}>
                                    {ticket.status}
                                </Badge>
                            </TableCell>
                            <TableCell className = 'whitespace-nowrap'>
                                {ticket.assigned_to_name ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-7 h-7 rounded-full bg-[#2D6A4F]/10 flex items-center justify-center">
                                            <span className="text-primary-color text-xs font-medium">
                                                {ticket.assigned_to_name.split(' ').map((n: any) => n[0]).join('')}
                                            </span>
                                        </div>
                                        <span className="text-sm text-gray-700 dark:text-gray-300">
                                            {ticket.assigned_to_name.split(' ')[0]}
                                        </span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-1 text-orange-500">
                                        <AlertCircle className="w-4 h-4" />
                                        <span className="text-sm">Unassigned</span>
                                    </div>
                                )}
                            </TableCell>
                            <TableCell className='whitespace-nowrap'>
                                <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                                    <Clock className="w-4 h-4" />
                                    <span className="text-sm">
                                        {formatDistanceToNow(new Date(ticket.created_date), { addSuffix: true })}
                                    </span>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {tickets.length === 0 && (
                <div className="p-12 text-center text-gray-500 dark:text-gray-400">
                    No tickets found matching your filters.
                </div>
            )}
        </div>
    );
}