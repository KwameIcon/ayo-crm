import { Clock, AlertCircle, History, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { format, formatDistanceToNow, differenceInHours } from 'date-fns';
import { cn } from '@/lib/utils';



export default function MetaTab({ ticket }: {ticket: any}) {
    const createdDate = new Date(ticket.created_date);
    const hoursPending = differenceInHours(new Date(), createdDate);
    const slaBreached = ticket.status !== 'Resolved' && hoursPending > 24;

    // Generate mock activity logs if not present
    const activityLogs = ticket.activity_logs || [
        { action: 'Ticket Created', performed_by: ticket.created_by || 'System', timestamp: ticket.created_date, details: 'Ticket was created' },
        ...(ticket.assigned_to_name ? [{ action: 'Assigned', performed_by: 'System', timestamp: new Date(new Date(ticket.created_date).getTime() + 30 * 60 * 1000).toISOString(), details: `Assigned to ${ticket.assigned_to_name}` }] : []),
        ...(ticket.status === 'Escalated' ? [{ action: 'Escalated', performed_by: ticket.assigned_to_name || 'System', timestamp: new Date(new Date(ticket.created_date).getTime() + 2 * 60 * 60 * 1000).toISOString(), details: 'Ticket was escalated due to complexity' }] : []),
        ...(ticket.resolved_at ? [{ action: 'Resolved', performed_by: ticket.assigned_to_name || 'System', timestamp: ticket.resolved_at, details: 'Ticket was resolved' }] : []),
    ];

    return (
        <div className="space-y-6 p-1">
            {/* SLA Status */}
            <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    SLA Status
                </h3>
                <div className="bg-gray-50 dark:bg-slate-800/50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Time Since Creation</p>
                            <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                {formatDistanceToNow(createdDate)}
                            </p>
                        </div>
                        <Badge className={cn('font-medium',
                            slaBreached
                                ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                : 'bg-green-100 text-primary-color dark:bg-green-900/30 dark:text-green-400'
                        )}>
                            {slaBreached ? (
                                <><AlertCircle className="w-3 h-3 mr-1" /> SLA Breached</>
                            ) : (
                                <><CheckCircle className="w-3 h-3 mr-1" /> Within SLA</>
                            )}
                        </Badge>
                    </div>
                    {slaBreached && (
                        <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                            This ticket has been pending for more than 24 hours.
                        </p>
                    )}
                </div>
            </div>

            {/* Core System Fields */}
            <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <History className="w-4 h-4" />
                    System Information
                </h3>
                <div className="bg-gray-50 dark:bg-slate-800/50 rounded-lg p-4 space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Ticket ID</p>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{ticket.ticket_id}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Created At</p>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {format(createdDate, 'MMM d, yyyy h:mm a')}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Created By</p>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {ticket.created_by || 'System'}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Last Updated</p>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {ticket.updated_date
                                    ? format(new Date(ticket.updated_date), 'MMM d, yyyy h:mm a')
                                    : format(createdDate, 'MMM d, yyyy h:mm a')
                                }
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Activity Logs */}
            <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <History className="w-4 h-4" />
                    Activity Logs
                </h3>
                <div className="bg-gray-50 dark:bg-slate-800/50 rounded-lg p-4">
                    <div className="space-y-4">
                        {activityLogs.map((log: any, index: number) => (
                            <div key={index} className="flex gap-3">
                                <div className="flex flex-col items-center">
                                    <div className={cn(
                                        'w-2 h-2 rounded-full mt-2',
                                        log.action === 'Resolved' ? 'bg-green-500' :
                                            log.action === 'Escalated' ? 'bg-red-500' :
                                                'bg-[#2D6A4F]'
                                    )} />
                                    {index < activityLogs.length - 1 && (
                                        <div className="w-0.5 h-full bg-gray-200 dark:bg-slate-700 mt-1" />
                                    )}
                                </div>
                                <div className="flex-1 pb-4">
                                    <div className="flex items-baseline justify-between gap-2">
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">{log.action}</p>
                                        <p className="text-xs text-gray-400 dark:text-gray-500">
                                            {formatDistanceToNow(new Date(log.timestamp), { addSuffix: true })}
                                        </p>
                                    </div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{log.details}</p>
                                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">by {log.performed_by}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}