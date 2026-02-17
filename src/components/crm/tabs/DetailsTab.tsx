import { User, Phone, Mail, Tag, FileText, Image, Package2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';



type DetailRowProps = {
    icon: any;
    label: string;
    value: any;
    className?: string;
}



function DetailRow({ icon: Icon, label, value, className }: DetailRowProps) {
    return (
        <div className={cn("flex items-start gap-3", className)}>
            <Icon className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
            <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{value || '-'}</p>
            </div>
        </div>
    );
}

export default function DetailsTab({ ticket }: { ticket: any }) {
    return (
        <div className="space-y-6 p-1">
            {/* Customer Information */}
            <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Customer Information
                </h3>
                <div className="bg-gray-50 dark:bg-slate-800/50 rounded-lg p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <DetailRow icon={User} label="Customer Name" value={ticket.customer_name} />
                    <DetailRow icon={Phone} label="Contact Number" value={ticket.contact_number} />
                    <DetailRow icon={Mail} label="Email" value={ticket.email} />
                    <DetailRow icon={FileText} label="Affected Policy/Service" value={ticket.affected_policy} />
                    {ticket.policy_number && (
                        <DetailRow icon={FileText} label="Policy Number" value={ticket.policy_number} />
                    )}
                </div>
            </div>

            {/* Categorization */}
            <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    Categorization & Priority
                </h3>
                <div className="bg-gray-50 dark:bg-slate-800/50 rounded-lg p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <DetailRow icon={Tag} label="Ticket Type" value={ticket.ticket_type} />
                    <DetailRow icon={Tag} label="Channel" value={ticket.channel} />
                    <DetailRow icon={Tag} label="Specifics" value={ticket.specifics || ticket.category} />
                    <div className="flex items-start gap-3">
                        <Tag className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                        <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Risk Level</p>
                            <Badge className={cn('mt-1', {
                                'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400': ticket.risk_level === 'High',
                                'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400': ticket.risk_level === 'Medium',
                                'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400': ticket.risk_level === 'Low',
                            })}>
                                {ticket.risk_level}
                            </Badge>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product and policy */}
            <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <Package2 className="w-4 h-4" />
                    Product & Policy Information
                </h3>
                <div className="bg-gray-50 dark:bg-slate-800/50 rounded-lg p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <DetailRow icon={Package2} label="Product" value={ticket.product_name} />
                    <DetailRow icon={FileText} label="Policy" value={ticket.specifics} />
                    {/* <DetailRow icon={Mail} label="Email" value={ticket.email} />
                    <DetailRow icon={FileText} label="Affected Policy/Service" value={ticket.affected_policy} />
                    {ticket.policy_number && (
                        <DetailRow icon={FileText} label="Policy Number" value={ticket.policy_number} />
                    )} */}
                </div>
            </div>

            {/* Description & Evidence */}
            <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Description
                </h3>
                <div className="bg-gray-50 dark:bg-slate-800/50 rounded-lg p-4">
                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                        {ticket.description || 'No description provided.'}
                    </p>
                </div>
            </div>

            {/* Evidence/Screenshots */}
            {ticket.evidence_urls?.length > 0 && (
                <div>
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                        <Image className="w-4 h-4" />
                        Evidence/Screenshots
                    </h3>
                    <div className="bg-gray-50 dark:bg-slate-800/50 rounded-lg p-4">
                        <div className="flex flex-wrap gap-2">
                            {ticket.evidence_urls.map((url: string, idx: number) => (
                                <a
                                    key={idx}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-[#2D6A4F] hover:underline"
                                >
                                    Attachment {idx + 1}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Timestamps */}
            <div className="flex flex-wrap gap-6 text-sm pt-2">
                <div>
                    <p className="text-gray-500 dark:text-gray-400">Created At</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                        {format(new Date(ticket.created_date), 'MMM d, yyyy h:mm a')}
                    </p>
                </div>
                {ticket.created_by && (
                    <div>
                        <p className="text-gray-500 dark:text-gray-400">Created By</p>
                        <p className="font-medium text-gray-900 dark:text-white">{ticket.created_by}</p>
                    </div>
                )}
            </div>
        </div>
    );
}