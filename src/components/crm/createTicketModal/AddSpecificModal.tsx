import CrmButton from "@/components/commons/CrmButton";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { ticketTypes } from "../mockData";
import { useForm } from "react-hook-form";



type AddSpecificModalProps = {
    children: React.ReactNode
}




export default function AddSpecificModal({ children }: AddSpecificModalProps) {
    const [open, setOpen] = useState(false);
    const { register, handleSubmit, reset, setValue } = useForm({
        defaultValues: {
            specifics: '',
            ticket_type: ''
        }
    });


    const onSubmit = (data: any) => {
        console.log(data);
        reset();
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] crm-bg-border">
                <DialogHeader>
                    <DialogTitle>Add Specific</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 gap-4">
                            <div className="space-y-2">
                                <Label className='text-black/50 dark:text-white/50'>Type <span className='text-red-500'>*</span></Label>
                                <Select onValueChange={(v) => setValue('ticket_type', v)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {ticketTypes.map((t: any) => (
                                            <SelectItem key={t} value={t}>{t}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label className='text-black/50 dark:text-white/50' htmlFor="specifics">Specifics <span className='text-red-500'>*</span> </Label>
                                <Input
                                    id="specifics"
                                    {...register('specifics', { required: true })}
                                    placeholder="Enter specifics "
                                />
                            </div>

                        </div>
                    </div>
                </form>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                    <CrmButton type="submit">Save changes</CrmButton>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}