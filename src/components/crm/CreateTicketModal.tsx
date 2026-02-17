import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from '@/components/ui/select';
import { channels, categories, ticketTypes, departments, riskLevels, personnel } from './mockData';
import CrmButton from '../commons/CrmButton';



type CreateTicketModalProps = {
    onCreateTicket: any
}




export default function CreateTicketModal({ onCreateTicket }: CreateTicketModalProps) {
    const [open, setOpen] = useState(false);
    const { register, handleSubmit, reset, setValue } = useForm({
        defaultValues: {
            customer_name: '',
            contact_number: '',
            email: '',
            channel: '',
            category: '',
            ticket_type: '',
            department: '',
            risk_level: 'Low',
            description: '',
            assigned_to: '',
        }
    });

    const onSubmit = (data: any) => {
        const assignee = personnel.find(p => p.email === data.assigned_to);
        const newTicket = {
            ...data,
            id: `TKT-${String(Math.floor(Math.random() * 90000) + 10000).padStart(5, '0')}`,
            ticket_id: `TKT-${String(Math.floor(Math.random() * 90000) + 10000).padStart(5, '0')}`,
            assigned_to_name: assignee?.name || null,
            status: 'Open',
            created_date: new Date().toISOString(),
        };

        onCreateTicket(newTicket);
        reset();
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <CrmButton className="">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Ticket
                </CrmButton>
            </DialogTrigger>
            <DialogContent className="crm-bg-border max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Create New Ticket</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
                    {/* Customer Info */}
                    <div className="space-y-4">
                        <h3 className="font-medium text-gray-900 dark:text-white">Customer Information</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="customer_name">Customer Name *</Label>
                                <Input
                                    id="customer_name"
                                    {...register('customer_name', { required: true })}
                                    placeholder="Enter customer name"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="contact_number">Phone Number</Label>
                                <Input
                                    id="contact_number"
                                    {...register('contact_number')}
                                    placeholder="+233 XX XXX XXXX"
                                />
                            </div>
                            <div className="col-span-2 space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    {...register('email')}
                                    placeholder="customer@email.com"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Ticket Details */}
                    <div className="space-y-4">
                        <h3 className="font-medium text-gray-900 dark:text-white">Ticket Details</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Channel *</Label>
                                <Select onValueChange={(v) => setValue('channel', v)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select channel" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {channels.map(c => (
                                            <SelectItem key={c} value={c}>{c}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Category *</Label>
                                <Select onValueChange={(v) => setValue('category', v)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map(c => (
                                            <SelectItem key={c} value={c}>{c}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Type *</Label>
                                <Select onValueChange={(v) => setValue('ticket_type', v)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {ticketTypes.map(t => (
                                            <SelectItem key={t} value={t}>{t}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Department *</Label>
                                <Select onValueChange={(v) => setValue('department', v)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select department" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {departments.map(d => (
                                            <SelectItem key={d} value={d}>{d}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Risk Level</Label>
                                <Select defaultValue="Low" onValueChange={(v) => setValue('risk_level', v)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select risk level" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {riskLevels.map(r => (
                                            <SelectItem key={r} value={r}>{r}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Assign To</Label>
                                <Select onValueChange={(v) => setValue('assigned_to', v)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select assignee" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {personnel.map(p => (
                                            <SelectItem key={p.email} value={p.email}>{p.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                {...register('description')}
                                placeholder="Describe the issue or request..."
                                className="min-h-[100px]"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <CrmButton type="submit" className="hover:bg-accent-deep">
                            Create Ticket
                        </CrmButton>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}