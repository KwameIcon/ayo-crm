import { useState, useMemo } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Ticket, User, Phone, Clock } from 'lucide-react';
import { mockTickets } from './mockData';
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';


type GlobalSearchModalProps = {
    open: boolean;
    onClose: () => void;
};



export default function GlobalSearchModal({ open, onClose }: GlobalSearchModalProps) {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const results = useMemo(() => {
        if (!query.trim() || query.length < 2) return { tickets: [], customers: [] };

        const q = query.toLowerCase();

        const ticketMatches = mockTickets.filter(ticket =>
            ticket.ticket_id.toLowerCase().includes(q) ||
            ticket.customer_name.toLowerCase().includes(q) ||
            ticket.contact_number.replace(/\s/g, '').includes(q.replace(/\s/g, '')) ||
            ticket.email?.toLowerCase().includes(q)
        ).slice(0, 5);

        const customerMap = new Map();
        mockTickets.forEach(ticket => {
            const key = ticket.contact_number;
            if (
                ticket.customer_name.toLowerCase().includes(q) ||
                ticket.contact_number.replace(/\s/g, '').includes(q.replace(/\s/g, '')) ||
                ticket.email?.toLowerCase().includes(q)
            ) {
                if (!customerMap.has(key)) {
                    customerMap.set(key, {
                        name: ticket.customer_name,
                        phone: ticket.contact_number,
                        email: ticket.email,
                        ticketCount: 1,
                    });
                } else {
                    customerMap.get(key).ticketCount++;
                }
            }
        });

        return {
            tickets: ticketMatches,
            customers: Array.from(customerMap.values()).slice(0, 3),
        };
    }, [query]);

    const handleTicketClick = (ticket: any) => {
        onClose();
        navigate(createPageUrl('AllTickets') + `?ticket=${ticket.ticket_id}`);
    };

    const hasResults = results.tickets.length > 0 || results.customers.length > 0;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-xl p-0 gap-0 top-[15%] translate-y-0 crm-bg-border">
                <div className="p-4 border-b border-border">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search by ticket ID, MSISDN, phone number, or customer name..."
                            className="pl-10 h-12 text-base border-0 focus-visible:ring-0 bg-transparent"
                            autoFocus
                        />
                    </div>
                </div>

                <div className="max-h-[400px] overflow-y-auto">
                    {query.length < 2 ? (
                        <div className="p-8 text-center text-gray-500">
                            <Search className="w-10 h-10 mx-auto mb-3 opacity-30" />
                            <p>Type at least 2 characters to search</p>
                            <p className="text-sm text-gray-400 mt-1">Search tickets, customers by phone or ID</p>
                        </div>
                    ) : !hasResults ? (
                        <div className="p-8 text-center text-gray-500">
                            <Search className="w-10 h-10 mx-auto mb-3 opacity-30" />
                            <p>No results found for "{query}"</p>
                        </div>
                    ) : (
                        <div className="p-2">
                            {results.customers.length > 0 && (
                                <div className="mb-4">
                                    <p className="text-xs font-medium text-gray-500 px-3 py-2">CUSTOMERS</p>
                                    {results.customers.map((customer, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 cursor-pointer"
                                        >
                                            <div className="w-10 h-10 rounded-full bg-[#2D6A4F]/10 flex items-center justify-center">
                                                <User className="w-5 h-5 text-[#2D6A4F]" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-gray-900 dark:text-white">{customer.name}</p>
                                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                                    <Phone className="w-3 h-3" />
                                                    {customer.phone}
                                                </div>
                                            </div>
                                            <Badge variant="secondary">{customer.ticketCount} ticket{customer.ticketCount > 1 ? 's' : ''}</Badge>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {results.tickets.length > 0 && (
                                <div>
                                    <p className="text-xs font-medium text-gray-500 px-3 py-2">TICKETS</p>
                                    {results.tickets.map(ticket => (
                                        <div
                                            key={ticket.ticket_id}
                                            onClick={() => handleTicketClick(ticket)}
                                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 cursor-pointer"
                                        >
                                            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                                <Ticket className="w-5 h-5 text-blue-600" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <p className="font-mono text-sm font-medium text-[#2D6A4F]">{ticket.ticket_id}</p>
                                                    <Badge variant="outline" className="text-xs">{ticket.status}</Badge>
                                                </div>
                                                <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                                                    {ticket.customer_name} • {ticket.contact_number}
                                                </p>
                                            </div>
                                            <div className="text-xs text-gray-400 flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {formatDistanceToNow(new Date(ticket.created_date), { addSuffix: true })}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="p-3 border-t border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/50">
                    <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
                        <span><kbd className="px-1.5 py-0.5 bg-white dark:bg-slate-700 rounded border">↵</kbd> to select</span>
                        <span><kbd className="px-1.5 py-0.5 bg-white dark:bg-slate-700 rounded border">esc</kbd> to close</span>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}