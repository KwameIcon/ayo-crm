import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, FileText} from 'lucide-react';
import TemplateModal from './TemplateModal';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from '@/components/ui/alert-dialog';

const initialUserTemplates = [
    {
        id: 'user_1',
        name: 'Payment Reminder',
        description: 'Remind customers about pending payments',
        message: 'Hi {{customer_name}}, this is a friendly reminder that your payment of {{amount}} for policy {{policy_number}} is due on {{due_date}}. Please make payment to avoid service interruption.',
        createdBy: 'Christiana Appiah',
        createdAt: '2024-01-15',
    },
    {
        id: 'user_2',
        name: 'Document Request',
        description: 'Request additional documents from customer',
        message: 'Dear {{customer_name}}, we need the following documents for your ticket #{{ticket_id}}: {{document_list}}. Please submit within {{deadline}} days.',
        createdBy: 'Selorm Tsegah',
        createdAt: '2024-01-20',
    },
    {
        id: 'user_3',
        name: 'Appointment Confirmation',
        description: 'Confirm scheduled appointments',
        message: 'Hi {{customer_name}}, your appointment with {{agent_name}} is confirmed for {{appointment_date}} at {{appointment_time}}. Location: {{location}}. Reply YES to confirm.',
        createdBy: 'Rosina Baah',
        createdAt: '2024-02-01',
    },
];

export default function UserTemplates() {
    const [templates, setTemplates] = useState(initialUserTemplates);
    const [editingTemplate, setEditingTemplate] = useState(null);
    const [deletingTemplate, setDeletingTemplate] = useState<any>(null);

    const handleSave = (updatedTemplate: any) => {
        if (editingTemplate) {
            setTemplates(templates.map(t =>
                t.id === updatedTemplate.id ? { ...t, ...updatedTemplate } : t
            ));
        } else {
            setTemplates([...templates, { ...updatedTemplate, id: `user_${Date.now()}`, createdBy: 'Christiana Appiah', createdAt: new Date().toISOString().split('T')[0] }]);
        }
        setEditingTemplate(null);
    };

    const handleDelete = () => {
        setTemplates(templates.filter(t => t.id !== deletingTemplate.id));
        setDeletingTemplate(null);
    };

    return (
        <div className="space-y-7">
            {templates.length === 0 ? (
                <div className="text-center py-12 bg-background rounded-xl">
                    <FileText className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                    <p className="text-gray-500 dark:text-gray-400">No user templates yet</p>
                    <p className="text-sm text-gray-400 mt-1">Create your first template to get started</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {templates.map(template => (
                        <Card key={template.id} className='crm-bg-border'>
                            <CardHeader className="pb-3">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <CardTitle className="text-base">{template.name}</CardTitle>
                                        <CardDescription className="text-xs mt-0.5">{template.description}</CardDescription>
                                    </div>
                                    <Badge variant="outline">User</Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-slate-800 rounded-lg p-3 font-mono">
                                    {template.message}
                                </p>
                                <div className="flex items-center justify-between mt-3">
                                    <p className="text-xs text-gray-400">
                                        By {template.createdBy} • {template.createdAt}
                                    </p>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setEditingTemplate(template as any)}
                                        >
                                            <Edit className="w-4 h-4 mr-1" />
                                            Edit
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                            onClick={() => setDeletingTemplate(template)}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            {editingTemplate && (
                <TemplateModal
                    open={!!editingTemplate}
                    onClose={() => setEditingTemplate(null)}
                    onSave={handleSave}
                    template={editingTemplate}
                    mode="edit"
                    type="user"
                />
            )}

            <AlertDialog open={!!deletingTemplate} onOpenChange={() => setDeletingTemplate(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Template</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete "{deletingTemplate?.name}"? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}