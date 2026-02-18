import { useState, useMemo } from 'react';
import { format } from 'date-fns';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { MessageSquare, Search, Calendar as CalendarIcon, Send, X, Bot, User } from 'lucide-react';
import StatCard from '@/components/crm/StatCard';
import SendSMSModal from '@/components/crm/SendSMSModal';
import { mockSMS } from '@/components/crm/mockData';
import { cn } from '@/lib/utils';
import type { DateRange } from 'react-day-picker';
import CrmButton from '@/components/commons/CrmButton';
import SMSDetailModal from './SMSDetailModal';

const statusConfig = {
    delivered: { color: 'resolved-bg' },
    sent: { color: 'open-bg' },
    pending: { color: 'pending-bg' },
    failed: { color: 'danger-bg' },
};

export default function SMSDashboard() {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [typeFilter, setTypeFilter] = useState('all');
    const [selectedSMS, setSelectedSMS] = useState<any>(null);
    const [dateRange, setDateRange] = useState<DateRange | undefined>({
        from: undefined,
        to: undefined,
    });
    const [showSendModal, setShowSendModal] = useState(false);

    const stats = useMemo(() => {
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        const monthSMS = mockSMS.filter(s => {
            const d = new Date(s.sent_at);
            return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
        });

        const total = monthSMS.length;
        const systemSMS = monthSMS.filter(s => s.type === 'system').length;
        const userSMS = monthSMS.filter(s => s.type === 'user').length;

        // const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const currentDay = new Date().getDate();
        const avgDaily = currentDay > 0 ? Math.round(total / currentDay) : 0;

        return { total, systemSMS, userSMS, avgDaily };
    }, []);

    const filteredSMS = useMemo(() => {
        let result = mockSMS;

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(sms =>
                sms.recipient_phone.toLowerCase().includes(query) ||
                sms.recipient_name.toLowerCase().includes(query) ||
                sms.message.toLowerCase().includes(query) ||
                sms.ticket_id.toLowerCase().includes(query)
            );
        }

        if (statusFilter !== 'all') {
            result = result.filter(sms => sms.status === statusFilter);
        }

        if (typeFilter !== 'all') {
            result = result.filter(sms => sms.type === typeFilter);
        }

        if (dateRange?.from) {
            const fromDate = new Date(dateRange.from);
            result = result.filter(sms => new Date(sms.sent_at) >= fromDate);
        }
        if (dateRange?.to) {
            const toDate = new Date(dateRange.to);
            result = result.filter(sms => new Date(sms.sent_at) <= toDate);
        }

        return result;
    }, [searchQuery, statusFilter, typeFilter, dateRange]);

    const clearFilters = () => {
        setSearchQuery('');
        setStatusFilter('all');
        setTypeFilter('all');
        setDateRange({ from: undefined, to: undefined });
    };

    const hasFilters = searchQuery || statusFilter !== 'all' || typeFilter !== 'all' || dateRange?.from || dateRange?.to;

    return (
        <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard title="Total SMS (This Month)" value={stats.total} Icon={MessageSquare} color="primary" />
                <StatCard title="System SMS" value={stats.systemSMS} Icon={Bot} color="blue" />
                <StatCard title="User SMS" value={stats.userSMS} Icon={User} color="green" />
                <StatCard title="Avg. Daily SMS" value={stats.avgDaily} Icon={Send} color="orange" />
            </div>

            {/* Filters */}
            <div className="crm-bg-border rounded-xl  p-4">
                <div className="flex flex-wrap gap-4">
                    <div className="relative flex-1 min-w-[200px]">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                            placeholder="Search by phone, name, ticket ID..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9"
                        />
                    </div>

                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-[140px]">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent className='crm-bg-border'>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="delivered">Delivered</SelectItem>
                            <SelectItem value="sent">Sent</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="failed">Failed</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                        <SelectTrigger className="w-[140px]">
                            <SelectValue placeholder="Type" />
                        </SelectTrigger>
                        <SelectContent className='crm-bg-border'>
                            <SelectItem value="all">All Types</SelectItem>
                            <SelectItem value="system">System</SelectItem>
                            <SelectItem value="user">User</SelectItem>
                        </SelectContent>
                    </Select>

                    <Popover>
                        <PopoverTrigger asChild className='crm-bg-border'>
                            <Button variant="outline" className="w-[200px] justify-start">
                                <CalendarIcon className="w-4 h-4 mr-2" />
                                {dateRange?.from ? (
                                    dateRange?.to ? (
                                        `${format(dateRange.from, 'dd/MM/yy')} - ${format(dateRange.to, 'dd/MM/yy')}`
                                    ) : (
                                        format(dateRange.from, 'dd/MM/yyyy')
                                    )
                                ) : (
                                    'Date range'
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 crm-bg-border" align="start">
                            <Calendar
                                mode="range"
                                selected={dateRange}
                                onSelect={(range) => setDateRange(range || { from: undefined, to: undefined })}
                                numberOfMonths={2}
                                className='crm-bg-border'
                            />
                        </PopoverContent>
                    </Popover>

                    {hasFilters && (
                        <Button variant="ghost" onClick={clearFilters} className="text-gray-500">
                            <X className="w-4 h-4 mr-1" />
                            Clear
                        </Button>
                    )}

                    <CrmButton onClick={() => setShowSendModal(true)} className="ml-auto">
                        <Send className="w-4 h-4 mr-2" />
                        Send SMS
                    </CrmButton>
                </div>
            </div>

            {/* Table */}
            <div className="crm-bg-border rounded-xl  overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-background h-14">
                            <TableHead>Recipient</TableHead>
                            <TableHead>Message</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Ticket</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredSMS.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                                    No SMS messages found
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredSMS.slice(0, 50).map(sms => {
                                return (
                                    <TableRow key={sms.id} className="cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800" onClick={() => setSelectedSMS(sms)}>
                                        <TableCell>
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-white">{sms.recipient_name}</p>
                                                <p className="text-xs text-gray-500">{sms.recipient_phone}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell className="max-w-xs">
                                            <p className="truncate text-sm text-gray-600 dark:text-gray-400">{sms.message}</p>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className={sms.type === 'system' ? 'border-border text-blue-600' : 'border-border text-primary-color'}>
                                                {sms.type === 'system' ? <Bot className="w-3 h-3 mr-1" /> : <User className="w-3 h-3 mr-1" />}
                                                {sms.type}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <span className="text-sm font-mono text-primary-color">{sms.ticket_id}</span>
                                        </TableCell>
                                        <TableCell>
                                            <Badge className={cn('w-16 flex items-center justify-center gap-1', statusConfig[sms.status as keyof typeof statusConfig].color)}>
                                                {sms.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-sm text-gray-600 dark:text-gray-400">
                                            {format(new Date(sms.sent_at), 'dd/MM/yyyy HH:mm')}
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        )}
                    </TableBody>
                </Table>
            </div>

            <SendSMSModal
                open={showSendModal}
                onClose={() => setShowSendModal(false)}
                onSend={(data) => {
                    console.log('SMS sent:', data);
                    setShowSendModal(false);
                }}
                recipient={{ name: '', phone: '' }}
                ticketId=""
            />

            <SMSDetailModal
                sms={selectedSMS}
                open={!!selectedSMS}
                onClose={() => setSelectedSMS(null)}
            />
        </div>
    );
}