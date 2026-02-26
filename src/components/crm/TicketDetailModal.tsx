import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { FileText, MessageSquare, Users, Settings, Send } from 'lucide-react';
import DetailsTab from './tabs/DetailsTab';
import AssignmentTab from './tabs/AssignmentTab';
import MetaTab from './tabs/MetaTab';
import CommentSection from './CommentSection';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { statuses } from './mockData';
import SMSTab from './tabs/SMSTab';
import { DialogTrigger } from '@radix-ui/react-dialog';


const statusColors = {
    Open: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    Pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    Escalated: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    Resolved: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
};

const riskColors = {
    High: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    Medium: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
    Low: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
};



type TicketDetailModalProps = {
    ticket: any;
    onStatusChange?: (ticket: any, status: string) => void
    children: React.ReactNode
}



export default function TicketDetailModal({ ticket, onStatusChange, children }: TicketDetailModalProps) {
    const [activeTab, setActiveTab] = useState('details');
    const [currentStatus, setCurrentStatus] = useState(ticket?.status);


    const handleStatusChange = (newStatus: string) => {
        setCurrentStatus(newStatus);
        if (onStatusChange) {
            onStatusChange(ticket, newStatus);
        }
    };

    if (!ticket) return null;

    return (
        <Dialog>
            <DialogTrigger>
                {children}
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden p-0 bg-container">
                <DialogHeader className="px-6 py-4 border-b border-border">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-wrap">
                            <DialogTitle className="text-lg font-semibold text-primary-color">
                                {ticket.ticket_id}
                            </DialogTitle>
                            <Select value={currentStatus || ticket.status} onValueChange={handleStatusChange}>
                                <SelectTrigger className={cn('w-[120px] h-7 text-xs font-medium border-0', statusColors[(currentStatus || ticket.status) as keyof typeof statusColors])}>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {statuses.map(status => (
                                        <SelectItem key={status} value={status}>{status}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Badge className={cn('font-medium', statusColors[ticket.status as keyof typeof statusColors])}>
                                {ticket.status}
                            </Badge>
                            <Badge className={cn('font-medium', riskColors[ticket.risk_level as keyof typeof riskColors
                            ])}>
                                {ticket.risk_level} Risk
                            </Badge>
                        </div>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {ticket.customer_name} • {ticket.ticket_type}
                    </p>
                </DialogHeader>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
                    <div className="px-6 border-b border-border">
                        <TabsList className="bg-transparent h-12 p-0 gap-4">
                            <TabsTrigger
                                value="details"
                                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary-color rounded-none px-1 pb-3"
                            >
                                <FileText className="w-4 h-4 mr-2" />
                                Details
                            </TabsTrigger>
                            <TabsTrigger
                                value="comments"
                                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary-color rounded-none px-1 pb-3"
                            >
                                <MessageSquare className="w-4 h-4 mr-2" />
                                Comments
                            </TabsTrigger>
                            <TabsTrigger
                                value="assignment"
                                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary-color rounded-none px-1 pb-3"
                            >
                                <Users className="w-4 h-4 mr-2" />
                                Assignment
                            </TabsTrigger>
                            <TabsTrigger
                                value="sms"
                                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary-color rounded-none px-1 pb-3"
                            >
                                <Send className="w-4 h-4 mr-2" />
                                SMS
                            </TabsTrigger>
                            <TabsTrigger
                                value="meta"
                                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary-color rounded-none px-1 pb-3"
                            >
                                <Settings className="w-4 h-4 mr-2" />
                                Meta
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <div className="overflow-y-auto h-[calc(90vh-180px)]">
                        <TabsContent value="details" className="p-6 m-0">
                            <DetailsTab ticket={ticket} />
                        </TabsContent>
                        <TabsContent value="comments" className="p-6 m-0 h-full">
                            <CommentSection ticketId={ticket.ticket_id} />
                        </TabsContent>
                        <TabsContent value="assignment" className="p-6 m-0">
                            <AssignmentTab ticket={ticket} />
                        </TabsContent>
                        <TabsContent value="sms" className="p-6 m-0">
                            <SMSTab ticket={ticket} />
                        </TabsContent>
                        <TabsContent value="meta" className="p-6 m-0">
                            <MetaTab ticket={ticket} />
                        </TabsContent>
                    </div>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
}