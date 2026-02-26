import TicketDetailModal from "@/components/crm/TicketDetailModal";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { AlertCircle, MoreVertical } from "lucide-react";
import { cn } from "./utils";



const statusColors = {
    Open: 'open-bg',
    Pending: 'pending-bg',
    Escalated: 'escalated-bg',
    Resolved: 'resolved-bg',
};

const riskColors = {
    High: 'danger-bg',
    Medium: 'warning-bg',
    Low: 'low-bg',
};


export function RiskBadge({ risk }: { risk: string }) {
    return (
        <Badge className={cn('font-medium w-16 flex items-center justify-center', riskColors[risk as keyof typeof riskColors])}>
            {risk}
        </Badge>
    )
}

export function StatusBadge({ status }: { status: string }) {
    return (
        <Badge className={cn('font-medium w-16 flex items-center justify-center', statusColors[status as keyof typeof statusColors])}>
            {status}
        </Badge>
    )
}


export function Customer({ name, contact_number }: { name: string, contact_number: string }) {
    return (
        <div>
            <p className="font-medium text-gray-900 dark:text-white">{name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{contact_number}</p>
        </div>
    )
}


export function AssignTo({ ticket }: { ticket: any }) {

    return (
        <>
            {
                ticket.assigned_to_name ? (
                    <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-[#2D6A4F]/10 flex items-center justify-center">
                            <span className="text-primary-color text-xs font-medium">
                                {ticket.assigned_to_name.split(' ').map((n: any) => n[0]).join('')}
                            </span>
                        </div>
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                            {ticket.assigned_to_name.split(' ')[0]}
                        </span>
                    </div>
                ) : (
                    <div className="flex items-center gap-1 text-orange-500">
                        <AlertCircle className="w-4 h-4" />
                        <span className="text-sm">Unassigned</span>
                    </div>
                )
            }
        </>
    )
}


export function CreatedBy({ ticket }: { ticket: any }) {
    return (
        <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#2D6A4F]/10 flex items-center justify-center">
                <span className="text-primary-color text-xs font-medium">
                    {ticket.created_by.split(' ')[0][0]}
                </span>
            </div>
            <span className="text-sm text-gray-700 dark:text-gray-300">
                {ticket.created_by.split(' ')[0]}
            </span>
        </div>
    )
}


export function Actions({ ticket }: { ticket: any }) {
    return (
        <Popover>
            <PopoverTrigger>
                <MoreVertical className="w-4 h-4" />
            </PopoverTrigger>
            <PopoverContent align='end' className="w-56 px-2 overflow-hidden">
                <TicketDetailModal ticket={ticket}>
                    <div className='w-52 px-2 py-2 text-left transition-colors duration-200 hover:bg-accent hover:text-primary-color rounded'>View Ticket</div>
                </TicketDetailModal>
            </PopoverContent>
        </Popover>
    )
}