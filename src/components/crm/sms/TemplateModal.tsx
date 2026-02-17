import React, { useState, useRef } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Save, GripVertical } from 'lucide-react';
import CrmButton from '@/components/commons/CrmButton';

const availableVariables = [
    { key: 'customer_name', label: 'Customer Name' },
    { key: 'ticket_id', label: 'Ticket ID' },
    { key: 'ticket_type', label: 'Ticket Type' },
    { key: 'policy_number', label: 'Policy Number' },
    { key: 'agent_name', label: 'Agent Name' },
    { key: 'phone_number', label: 'Phone Number' },
    { key: 'amount', label: 'Amount' },
    { key: 'due_date', label: 'Due Date' },
    { key: 'status', label: 'Status' },
    { key: 'department', label: 'Department' },
];



type TemplateModalProps = {
    open: boolean;
    onClose: () => void;
    onSave: (template: any) => void;
    template?: any;
    mode: string;
    type: string;
}



export default function TemplateModal({ open, onClose, onSave, template, mode, type }: TemplateModalProps) {
    const [name, setName] = useState(template?.name || '');
    const [description, setDescription] = useState(template?.description || '');
    const [message, setMessage] = useState(template?.message || '');
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const [_, setDraggedVar] = useState(null);

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, variable: any) => {
        setDraggedVar(variable);
        e.dataTransfer.setData('text/plain', `{{${variable.key}}}`);
        e.dataTransfer.effectAllowed = 'copy';
    };

    const handleDragOver = (e: any) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    };

    const handleDrop = (e: any) => {
        e.preventDefault();
        const variableText = e.dataTransfer.getData('text/plain');
        const textarea = textareaRef.current;

        if (textarea) {
            const start = textarea?.selectionStart;
            const end = textarea?.selectionEnd;
            const newMessage = message.substring(0, start) + variableText + message.substring(end);
            setMessage(newMessage);

            setTimeout(() => {
                textarea.focus();
                const newCursorPos = start + variableText.length;
                textarea.setSelectionRange(newCursorPos, newCursorPos);
            }, 0);
        }
        setDraggedVar(null);
    };

    const insertVariable = (variable: any) => {
        const textarea = textareaRef.current;
        if (textarea) {
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            const variableText = `{{${variable.key}}}`;
            const newMessage = message.substring(0, start) + variableText + message.substring(end);
            setMessage(newMessage);

            setTimeout(() => {
                textarea.focus();
                const newCursorPos = start + variableText.length;
                textarea.setSelectionRange(newCursorPos, newCursorPos);
            }, 0);
        }
    };

    const handleSave = () => {
        onSave({
            ...template,
            name,
            description,
            message,
        });
    };

    const charCount = message.length;
    const smsCount = Math.ceil(charCount / 160) || 1;

    const isSystemEdit = type === 'system';

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl crm-bg-border">
                <DialogHeader>
                    <DialogTitle>
                        {mode === 'create' ? 'Create Template' : isSystemEdit ? 'Edit System Template' : 'Edit Template'}
                    </DialogTitle>
                </DialogHeader>

                <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2 space-y-4">
                        {!isSystemEdit && (
                            <>
                                <div className="space-y-2">
                                    <Label>Template Name</Label>
                                    <Input
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="e.g., Payment Reminder"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Description</Label>
                                    <Input
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Brief description of when to use this template"
                                    />
                                </div>
                            </>
                        )}

                        {isSystemEdit && (
                            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
                                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                                    Editing system template: <strong>{template?.name}</strong>
                                </p>
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label>Message Content</Label>
                            <Textarea
                                ref={textareaRef}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onDragOver={handleDragOver}
                                onDrop={handleDrop}
                                placeholder="Type your message here. Drag variables from the right panel or click them to insert."
                                className="h-40 resize-none font-mono text-sm"
                            />
                            <div className="flex justify-between text-xs text-gray-500">
                                <span>{charCount} characters</span>
                                <span>{smsCount} SMS segment{smsCount > 1 ? 's' : ''}</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Variables</Label>
                        <p className="text-xs text-gray-500 mb-2">Drag & drop or click to insert</p>
                        <div className="space-y-1.5 max-h-[300px] overflow-y-auto">
                            {availableVariables.map(variable => (
                                <div
                                    key={variable.key}
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, variable)}
                                    onClick={() => insertVariable(variable)}
                                    className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 cursor-grab active:cursor-grabbing hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                                >
                                    <GripVertical className="w-3 h-3 text-gray-400" />
                                    <span className="text-xs font-mono text-[#2D6A4F]">{'{{' + variable.key + '}}'}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <CrmButton
                        onClick={handleSave}
                        disabled={!message.trim() || (!isSystemEdit && !name.trim())}
                        className="bg-[#2D6A4F] hover:bg-[#245a42]"
                    >
                        <Save className="w-4 h-4 mr-2" />
                        {mode === 'create' ? 'Create Template' : 'Save Changes'}
                    </CrmButton>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}