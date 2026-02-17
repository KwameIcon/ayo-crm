import { User, Building2, AlertTriangle, CheckCircle, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';



const statusColors = {
    Open: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    Pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    Escalated: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    Resolved: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
};



type AssignmentTabProps = {
    ticket: any;
}




export default function AssignmentTab({ ticket }: AssignmentTabProps) {
    return (
        <div className="space-y-6 p-1">
            {/* Assignment */}
            <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Assigned To
                </h3>
                <div className="bg-gray-50 dark:bg-slate-800/50 rounded-lg p-4">
                    {ticket.assigned_to_name ? (
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#2D6A4F]/10 flex items-center justify-center">
                                <span className="text-[#2D6A4F] font-medium">
                                    {ticket.assigned_to_name.split(' ').map((n: any) => n[0]).join('')}
                                </span>
                            </div>
                            <div>
                                <p className="font-medium text-gray-900 dark:text-white">{ticket.assigned_to_name}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{ticket.assigned_to}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 text-orange-500">
                            <AlertTriangle className="w-5 h-5" />
                            <span className="font-medium">Unassigned</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Department */}
            <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    Department Involved
                </h3>
                <div className="bg-gray-50 dark:bg-slate-800/50 rounded-lg p-4">
                    <p className="text-gray-700 dark:text-gray-300 font-medium">{ticket.department}</p>
                </div>
            </div>

            {/* Status */}
            <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Status
                </h3>
                <div className="bg-gray-50 dark:bg-slate-800/50 rounded-lg p-4">
                    <Badge className={cn('font-medium text-sm', statusColors[ticket.status as keyof typeof statusColors])}>
                        {ticket.status}
                    </Badge>
                </div>
            </div>

            {/* Resolution */}
            <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Resolution
                </h3>
                <div className="bg-gray-50 dark:bg-slate-800/50 rounded-lg p-4">
                    {ticket.resolution_notes ? (
                        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                            {ticket.resolution_notes}
                        </p>
                    ) : (
                        <p className="text-gray-400 dark:text-gray-500 text-sm italic">
                            No resolution notes yet.
                        </p>
                    )}
                </div>
            </div>

            {/* Resolution Time */}
            {ticket.resolved_at && (
                <div className="flex gap-6 text-sm pt-2">
                    <div>
                        <p className="text-gray-500 dark:text-gray-400">Resolved At</p>
                        <p className="font-medium text-gray-900 dark:text-white">
                            {format(new Date(ticket.resolved_at), 'MMM d, yyyy h:mm a')}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}