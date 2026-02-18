import { useState } from 'react';
import { useForm  } from 'react-hook-form';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { personnel, products} from '../mockData';
import CrmButton from '../../commons/CrmButton';
import { Separator } from '../../ui/separator';
import { TicketDetails } from './TicketDetails';



type CreateTicketModalProps = {
    onCreateTicket: any
}




export default function CreateTicketModal({ onCreateTicket }: CreateTicketModalProps) {
    const [open, setOpen] = useState(false);
    const { register, handleSubmit, reset, setValue, watch } = useForm({
        defaultValues: {
            customer_name: '',
            contact_number: '',
            email: '',
            product: '',
            policy: '',
            channel: '',
            category: '',
            specifics: '',
            evidence: '',
            complimented_agent_id: '',
            ticket_type: '',
            department: '',
            risk_level: 'Low',
            description: '',
            assigned_to: '',
        }
    });



    const productTypes = products.flatMap((product) => product.name);
    const policyTypes = products.find(p => p.name === watch('product'))?.types || [];
    



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
                                <Label className='text-black/50 dark:text-white/50' htmlFor="contact_number">Phone Number <span className="text-red-500"> *</span></Label>
                                <Input
                                    id="contact_number"
                                    {...register('contact_number')}
                                    placeholder="+233 XX XXX XXXX"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className='text-black/50 dark:text-white/50' htmlFor="customer_name">Customer Name </Label>
                                <Input
                                    id="customer_name"
                                    {...register('customer_name', { required: true })}
                                    placeholder="Enter customer name"
                                />
                            </div>
                            <div className="col-span-2 space-y-2">
                                <Label className='text-black/50 dark:text-white/50' htmlFor="email">Email  <sup className='text-xs text-gray-500 dark:text-gray-400'>Optional</sup></Label>
                                <Input
                                    id="email"
                                    type="email"
                                    {...register('email')}
                                    placeholder="customer@email.com"
                                />
                            </div>
                        </div>
                    </div>

                    <Separator />

                    <div className='space-y-4'>
                        <h3 className="font-medium text-gray-900 dark:text-white">Product & Policy</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className='text-black/50 dark:text-white/50' htmlFor="product">Product Type <span className="text-red-500"> *</span></Label>
                                <Select onValueChange={(v) => setValue('product', v)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select product" />
                                    </SelectTrigger>
                                    <SelectContent className='crm-bg-border'>
                                        {productTypes.map(t => (
                                            <SelectItem key={t} value={t}>{t}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            {policyTypes.length > 0 &&
                                <div className="space-y-2">
                                    <Label className='text-black/50 dark:text-white/50' htmlFor="policy">Policy <span className="text-red-500"> *</span></Label>
                                    <Select onValueChange={(v) => setValue('policy', v)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select policy" />
                                        </SelectTrigger>
                                        <SelectContent className='crm-bg-border'>
                                            {policyTypes.map(p => (
                                                <SelectItem key={p} value={p}>{p}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            }
                        </div>
                    </div>

                    <Separator />
                    {<TicketDetails setValue={setValue} watch={watch} register={register} />}
                    

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
