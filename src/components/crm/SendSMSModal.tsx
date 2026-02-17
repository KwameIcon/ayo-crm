import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Send, User, Phone, MessageSquare } from 'lucide-react';
import CrmButton from '../commons/CrmButton';

const templates = [
    { id: 'custom', label: 'Custom Message', message: '' },
    { id: 'received', label: 'Ticket Received', message: 'Dear {name}, your ticket has been received. We will respond within 24 hours. Reference: {ticket_id}' },
    { id: 'processing', label: 'Processing Update', message: 'Hi {name}, your request is being processed. We will update you shortly. Reference: {ticket_id}' },
    { id: 'resolved', label: 'Ticket Resolved', message: 'Dear {name}, your ticket has been resolved. Thank you for choosing Ayo InsureTech. Reference: {ticket_id}' },
    { id: 'documents', label: 'Documents Required', message: 'Hi {name}, we need additional documents for your request. Please reply or visit our office. Reference: {ticket_id}' },
];



type SendSMSModalProps = {
    open: boolean;
    onClose: () => void;
    onSend: (data: any) => void;
    recipient: any;
    ticketId: string;
};



export default function SendSMSModal({ open, onClose, onSend, recipient, ticketId }: SendSMSModalProps) {
    const [selectedTemplate, setSelectedTemplate] = useState('custom');
    const [message, setMessage] = useState('');
    const [phone, setPhone] = useState(recipient?.phone || '');

    const handleTemplateChange = (templateId: string) => {
        setSelectedTemplate(templateId);
        const template = templates.find(t => t.id === templateId);
        if (template && template.message) {
            const filledMessage = template.message
                .replace('{name}', recipient?.name?.split(' ')[0] || 'Customer')
                .replace('{ticket_id}', ticketId || 'N/A');
            setMessage(filledMessage);
        } else {
            setMessage('');
        }
    };

    const handleSend = () => {
        onSend({
            recipient_name: recipient?.name,
            recipient_phone: phone,
            message,
            ticket_id: ticketId,
            sent_at: new Date().toISOString(),
        });
        setMessage('');
        setSelectedTemplate('custom');
    };

    const charCount = message.length;
    const smsCount = Math.ceil(charCount / 160) || 1;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-md crm-bg-border">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Send className="w-5 h-5 text-[#2D6A4F]" />
                        Send SMS
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            Recipient
                        </Label>
                        <Input value={recipient?.name || ''} disabled className="bg-gray-50 dark:bg-slate-800" />
                    </div>

                    <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            Phone Number
                        </Label>
                        <Input
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+233 XX XXX XXXX"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Template</Label>
                        <Select value={selectedTemplate} onValueChange={handleTemplateChange}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a template" />
                            </SelectTrigger>
                            <SelectContent className='crm-bg-border'>
                                {templates.map(template => (
                                    <SelectItem key={template.id} value={template.id}>
                                        {template.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                            <MessageSquare className="w-4 h-4" />
                            Message
                        </Label>
                        <Textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type your message..."
                            className="h-32 resize-none"
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                            <span>{charCount} characters</span>
                            <span>{smsCount} SMS</span>
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <CrmButton
                        onClick={handleSend}
                        disabled={!message.trim() || !phone.trim()}
                        className="bg-[#2D6A4F] hover:bg-[#245a42]"
                    >
                        <Send className="w-4 h-4 mr-2" />
                        Send SMS
                    </CrmButton>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}