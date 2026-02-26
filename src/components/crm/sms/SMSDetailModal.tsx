import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { User, Phone, Ticket, Calendar, Bot, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { Separator } from '@/components/ui/separator';

const statusConfig = {
    delivered: { color: 'resolved-bg', label: 'Delivered' },
    sent: { color: 'open-bg', label: 'Sent' },
    pending: { color: 'pending-bg', label: 'Pending' },
    failed: { color: 'danger-bg', label: 'Failed' },
};



type SMSDetailModalProps = {
    sms: any;
    children: React.ReactNode;
};



export default function SMSDetailModal({ sms, children }: SMSDetailModalProps) {
    if (!sms) return null;


    return (
        <Dialog >

            <DialogTrigger asChild>
                {children}
            </DialogTrigger>

            <DialogContent className="max-w-md crm-bg-border">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 text-primary-color" />
                        SMS Details
                    </DialogTitle>
                </DialogHeader>

                <Separator/>

                <div className="space-y-6">
                    <div className='grid grid-cols-1 gap-3'>
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
                            <Badge variant="outline" className={'crm-primary-bg !bg-transparent'}>
                                {sms.type === 'system' ? <Bot className="w-3 h-3 mr-1" /> : <User className="w-3 h-3 mr-1" />}
                                {sms.type === 'system' ? 'System' : 'User'}
                            </Badge>
                        </div>
                    </div>

                    <Separator />

                    {/* Recipient */}
                    <div className="p-3 bg-background rounded-lg space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                            <User className="w-4 h-4 text-gray-400" />
                            <span className="font-medium text-gray-900 dark:text-white">{sms.recipient_name}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Phone className="w-4 h-4 text-gray-400" />
                            {sms.recipient_phone}
                        </div>
                    </div>

                    <Separator />

                    {/* Message */}
                    <div>
                        <p className="text-sm text-gray-500 mb-2">Message</p>
                        <div className="p-3 bg-background rounded-lg">
                            <p className="text-sm text-gray-900 dark:text-white">{sms.message}</p>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">{sms.message.length} characters</p>
                    </div>

                    <Separator />

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

                    <Separator />

                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Sent by</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{sms.sent_by}</span>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}