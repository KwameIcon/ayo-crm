import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { User, Phone, Ticket, Calendar, Bot, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

const statusConfig = {
    delivered: { color: 'resolved-bg', label: 'Delivered' },
    sent: { color: 'open-bg', label: 'Sent' },
    pending: { color: 'pending-bg', label: 'Pending' },
    failed: { color: 'danger-bg', label: 'Failed' },
};



type SMSDetailModalProps = {
    sms: any;
    open: boolean;
    onClose: () => void;
};



export default function SMSDetailModal({ sms, open, onClose }: SMSDetailModalProps) {
    if (!sms) return null;


    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 text-primary-color" />
                        SMS Details
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    {/* Status */}
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Status</span>
                        <Badge className={cn('w-16 flex items-center justify-center gap-1', statusConfig[sms.status as keyof typeof statusConfig].color)}>
                            {statusConfig[sms.status as keyof typeof statusConfig].label}
                        </Badge>
                    </div>

                    {/* Type */}
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Type</span>
                        <Badge variant="outline" className={sms.type === 'system' ? 'border-blue-300 text-blue-600' : 'border-green-300 text-green-600'}>
                            {sms.type === 'system' ? <Bot className="w-3 h-3 mr-1" /> : <User className="w-3 h-3 mr-1" />}
                            {sms.type === 'system' ? 'System' : 'User'}
                        </Badge>
                    </div>

                    {/* Recipient */}
                    <div className="p-3 bg-gray-50 dark:bg-slate-800 rounded-lg space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                            <User className="w-4 h-4 text-gray-400" />
                            <span className="font-medium text-gray-900 dark:text-white">{sms.recipient_name}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Phone className="w-4 h-4 text-gray-400" />
                            {sms.recipient_phone}
                        </div>
                    </div>

                    {/* Message */}
                    <div>
                        <p className="text-sm text-gray-500 mb-2">Message</p>
                        <div className="p-3 bg-gray-50 dark:bg-slate-800 rounded-lg">
                            <p className="text-sm text-gray-900 dark:text-white">{sms.message}</p>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">{sms.message.length} characters</p>
                    </div>

                    {/* Meta */}
                    <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2">
                            <Ticket className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-500">Ticket:</span>
                            <span className="font-mono text-primary-color">{sms.ticket_id}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-500">Sent:</span>
                        </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 -mt-2">
                        {format(new Date(sms.sent_at), 'dd MMM yyyy, HH:mm:ss')}
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-slate-700">
                        <span className="text-sm text-gray-500">Sent by</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{sms.sent_by}</span>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}