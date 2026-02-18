import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, TicketPlus, RefreshCw, CheckCircle, AlertCircle, Eye } from 'lucide-react';
import TemplateModal from './TemplateModal';
import TemplateDetailModal from './TemplateDetailModal';

const systemTemplates = [
    {
        id: 'sys_ticket_created',
        name: 'Ticket Created',
        trigger: 'When a new ticket is raised',
        icon: TicketPlus,
        color: 'open-bg',
        message: 'Dear {{customer_name}}, your ticket #{{ticket_id}} has been created successfully. Our team will address your {{ticket_type}} shortly. Thank you for contacting Ayo InsureTech.',
        active: true,
    },
    {
        id: 'sys_status_pending',
        name: 'Status: Pending',
        trigger: 'When ticket status changes to Pending',
        icon: RefreshCw,
        color: 'pending-bg',
        message: 'Hi {{customer_name}}, your ticket #{{ticket_id}} is now pending. We are awaiting {{pending_reason}}. Please respond at your earliest convenience.',
        active: true,
    },
    {
        id: 'sys_status_escalated',
        name: 'Status: Escalated',
        trigger: 'When ticket status changes to Escalated',
        icon: AlertCircle,
        color: 'escalated-bg',
        message: 'Dear {{customer_name}}, your ticket #{{ticket_id}} has been escalated for priority handling. A senior agent will contact you within {{sla_time}}.',
        active: true,
    },
    {
        id: 'sys_status_resolved',
        name: 'Status: Resolved',
        trigger: 'When ticket status changes to Resolved',
        icon: CheckCircle,
        color: 'resolved-bg',
        message: 'Dear {{customer_name}}, great news! Your ticket #{{ticket_id}} has been resolved. {{resolution_summary}}. Thank you for choosing Ayo InsureTech!',
        active: true,
    },
];

export default function SystemTemplates() {
    const [templates, setTemplates] = useState(systemTemplates);
    const [editingTemplate, setEditingTemplate] = useState<any>(null);
    const [viewingTemplate, setViewingTemplate] = useState<any>(null);

    const handleSave = (updatedTemplate: any) => {
        setTemplates(templates.map(t =>
            t.id === updatedTemplate.id ? { ...t, message: updatedTemplate.message } : t
        ));
        setEditingTemplate(null);
    };

    return (
        <div className="space-y-7">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                    System templates are automatically sent based on ticket actions. You can customize the message content but cannot create or delete these templates.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {templates.map(template => (
                    <Card key={template.id} className="relative crm-bg-border">
                        <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-lg ${template.color}`}>
                                        <template.icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-base">{template.name}</CardTitle>
                                        <CardDescription className="text-xs mt-0.5">{template.trigger}</CardDescription>
                                    </div>
                                </div>
                                <Badge variant={template.active ? 'default' : 'secondary'} className={template.active ? 'bg-primary-color text-white' : ''}>
                                    {template.active ? 'Active' : 'Inactive'}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-slate-800 rounded-lg p-3 font-mono">
                                {template.message}
                            </p>
                            <div className="flex gap-2 mt-3">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setViewingTemplate(template)}
                                >
                                    <Eye className="w-4 h-4 mr-2" />
                                    View
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setEditingTemplate(template)}
                                >
                                    <Edit className="w-4 h-4 mr-2" />
                                    Edit
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {editingTemplate && (
                <TemplateModal
                    open={!!editingTemplate}
                    onClose={() => setEditingTemplate(null)}
                    onSave={handleSave}
                    template={editingTemplate}
                    mode="edit"
                    type="system"
                />
            )}

            <TemplateDetailModal
                template={viewingTemplate}
                type="system"
                open={!!viewingTemplate}
                onClose={() => setViewingTemplate(null)}
            />
        </div>
    );
}