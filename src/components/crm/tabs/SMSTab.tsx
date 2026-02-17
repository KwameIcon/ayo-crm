import { useState, useMemo } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Send, CheckCircle, Clock, XCircle, AlertCircle } from 'lucide-react';
import { mockSMS } from '../mockData';
import SendSMSModal from '../SendSMSModal';
import { cn } from '@/lib/utils';
import CrmButton from '@/components/commons/CrmButton';

const statusConfig = {
    delivered: { icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900/30' },
    sent: { icon: Send, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30' },
    pending: { icon: Clock, color: 'text-yellow-500', bg: 'bg-yellow-100 dark:bg-yellow-900/30' },
    failed: { icon: XCircle, color: 'text-red-500', bg: 'bg-red-100 dark:bg-red-900/30' },
};

export default function SMSTab({ ticket }: any) {
    const [showSendModal, setShowSendModal] = useState(false);

    const ticketSMS = useMemo(() => {
        return mockSMS.filter(sms => sms.ticket_id === ticket.ticket_id);
    }, [ticket.ticket_id]);

    const handleSendSMS = (smsData: any) => {
        console.log('SMS sent:', smsData);
        setShowSendModal(false);
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-[#2D6A4F]" />
                    <h3 className="font-semibold text-gray-900 dark:text-white">SMS History</h3>
                    <Badge variant="secondary">{ticketSMS.length}</Badge>
                </div>
                <CrmButton onClick={() => setShowSendModal(true)} size="sm" className="">
                    <Send className="w-4 h-4 mr-2" />
                    Send SMS
                </CrmButton>
            </div>

            {ticketSMS.length === 0 ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <AlertCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No SMS sent for this ticket yet</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {ticketSMS.map(sms => {
                        const StatusIcon = statusConfig[sms.status as keyof typeof statusConfig].icon;
                        return (
                            <div
                                key={sms.id}
                                className="p-4 crm-bg-border rounded-lg"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm text-gray-900 dark:text-white">{sms.message}</p>
                                        <div className="flex items-center gap-3 mt-2 text-xs text-gray-500 dark:text-gray-400">
                                            <span>To: {sms.recipient_phone}</span>
                                            <span>•</span>
                                            <span>By: {sms.sent_by}</span>
                                            <span>•</span>
                                            <span>{formatDistanceToNow(new Date(sms.sent_at), { addSuffix: true })}</span>
                                        </div>
                                    </div>
                                    <Badge className={cn('flex items-center gap-1', statusConfig[sms.status as keyof typeof statusConfig].bg, statusConfig[sms.status as keyof typeof statusConfig].color)}>
                                        <StatusIcon className="w-3 h-3" />
                                        {sms.status}
                                    </Badge>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            <SendSMSModal
                open={showSendModal}
                onClose={() => setShowSendModal(false)}
                onSend={handleSendSMS}
                recipient={{
                    name: ticket.customer_name,
                    phone: ticket.contact_number,
                }}
                ticketId={ticket.ticket_id}
            />
        </div>
    );
}