import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import type { FieldValues, UseFormWatch } from 'react-hook-form';
import { categories, channels, personnel, riskLevels, specifics, ticketTypes } from '../mockData';
import AddSpecificModal from './AddSpecificModal';
import CrmButton from '@/components/commons/CrmButton';
import { Plus } from 'lucide-react';
import { SearchableSelect } from '@/components/commons/SearchableSelect';



export const TicketDetails = ({ setValue, watch, register }: any) => {

    const [_, setOpenSpecificsModal] = useState(false);


    const specificsOptions = specifics.find(s => s.type === watch('ticket_type').toLowerCase())?.options || [];
    const dOptions = specifics.find((s: any) => s.type === watch('ticket_type').toLowerCase())?.departmentOptions || [];


    return (
        <div>
            {/* Ticket Details */}
            <div className="space-y-4">
                <h3 className="font-medium text-gray-900 dark:text-white">Ticket Details</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label className='text-black/50 dark:text-white/50'>Channel <span className='text-red-500'>*</span></Label>
                        <Select onValueChange={(v) => setValue('channel', v)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select channel" />
                            </SelectTrigger>
                            <SelectContent className='crm-bg-border'>
                                {channels.map((c: any) => (
                                    <SelectItem key={c} value={c}>{c}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label className='text-black/50 dark:text-white/50'>Category <span className='text-red-500'>*</span></Label>
                        <Select onValueChange={(v) => setValue('category', v)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent className='crm-bg-border'>
                                {categories.map((c: any) => (
                                    <SelectItem key={c} value={c}>{c}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label className='text-black/50 dark:text-white/50'>Type <span className='text-red-500'>*</span></Label>
                        <Select onValueChange={(v) => setValue('ticket_type', v)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent className='crm-bg-border'>
                                {ticketTypes.map((t: any) => (
                                    <SelectItem key={t} value={t}>{t}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label className='text-black/50 dark:text-white/50'>Department <span className='text-red-500'>*</span></Label>
                        <Select onValueChange={(v) => setValue('department', v)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select department" />
                            </SelectTrigger>
                            <SelectContent className='crm-bg-border'>
                                {dOptions.map((d: any) => (
                                    <SelectItem key={d.name} value={d.name}>{d.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    {watch('ticket_type') !== 'Compliment' && <div className="space-y-2">
                        <Label className='text-black/50 dark:text-white/50'>Risk Level</Label>
                        <Select defaultValue="Low" onValueChange={(v) => setValue('risk_level', v)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select risk level" />
                            </SelectTrigger>
                            <SelectContent className='crm-bg-border'>
                                {riskLevels.map((r: any) => (
                                    <SelectItem key={r} value={r}>{r}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>}
                    <div className="space-y-2">
                        <Label className='text-black/50 dark:text-white/50'>Assign To</Label>
                        <Select onValueChange={(v) => setValue('assigned_to', v)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select assignee" />
                            </SelectTrigger>
                            <SelectContent className='crm-bg-border'>
                                {personnel.map((p: any) => (
                                    <SelectItem key={p.email} value={p.email}>{p.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label className='text-black/50 dark:text-white/50'>Specifics <span className='text-red-500'>*</span></Label>
                        <Select onValueChange={(v) => setValue('specifics', v)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select specific" />
                            </SelectTrigger>
                            <SelectContent className='crm-bg-border'>
                                {specificsOptions.map((p: any) => (
                                    <SelectItem key={p.name} value={p.name}>{p.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label className='text-black/50 dark:text-white/50'>Add Specific (If not listed)</Label>
                        <AddSpecificModal >
                            <CrmButton className='w-full' onClick={() => setOpenSpecificsModal(true)}>Add Specific <Plus /></CrmButton>
                        </AddSpecificModal>
                    </div>
                </div>

                {(watch('ticket_type') === 'Compliment' || watch('ticket_type') === 'Complaint') &&
                    <>
                        <Separator />
                        {conditionalFields({ register, watch, setValue })}
                    </>
                }

                <Separator />

                <div className="space-y-2">
                    <Label className='text-black/50 dark:text-white/50' htmlFor="description">Description <span className='text-red-500'>*</span></Label>
                    <Textarea
                        id="description"
                        {...register('description')}
                        placeholder="Describe the issue or request..."
                        className="min-h-[100px]"
                    />
                </div>
            </div>
        </div>
    )
}



type conditionalFieldsProps = {
    register: any
    setValue: any
    watch: UseFormWatch<FieldValues>
}



const conditionalFields = ({ register, setValue, watch }: conditionalFieldsProps) => {

    const ticketType = watch('ticket_type');
    const options = personnel.map((p: any) => ({ label: p.name, value: p.id }));
    // Watch the specific agent ID field
    const selectedAgentId = watch('complimented_agent_id');


    return (
        <div className='w-full space-y-4'>
            <h3 className="font-medium text-gray-900 dark:text-white">{ticketType === 'Compliment' ? 'Compliment Information' : 'Complaint Information'}</h3>
            <div className="w-full grid grid-cols-2 gap-4">
                {ticketType === 'Compliment' && <div className="space-y-2">
                    <Label className='text-black/50 dark:text-white/50' htmlFor="complimented_agent_id"> Complimented Agent <span className='text-red-500'>*</span> </Label>
                    <SearchableSelect
                        options={options}
                        value={selectedAgentId}
                        setValue={(val) => setValue('complimented_agent_id', val)}
                    />
                </div>}
                <div className="space-y-2">
                    <Label className='text-black/50 dark:text-white/50' htmlFor="evidence">Evidence  <sup className='text-xs text-gray-500 dark:text-gray-400'>Optional</sup> </Label>
                    <Input
                        type='file'
                        id="evidence"
                        {...register('evidence', { required: true })}
                        placeholder="Select file"
                    />
                </div>
            </div>
        </div>
    )
}