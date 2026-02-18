import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { FileText, Bot, User} from 'lucide-react';



type TemplateDetailModalProps = {
    template: any;
    type: string;
    open: boolean;
    onClose: () => void;
};



export default function TemplateDetailModal({ template, type, open, onClose }: TemplateDetailModalProps) {
    if (!template) return null;

    const isSystem = type === 'system';

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-primary-color" />
                        Template Details
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    {/* Type Badge */}
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Type</span>
                        <Badge variant="outline" className={isSystem ? 'border-blue-300 text-blue-600' : 'border-primary-color text-primary-color'}>
                            {isSystem ? <Bot className="w-3 h-3 mr-1" /> : <User className="w-3 h-3 mr-1" />}
                            {isSystem ? 'System' : 'User'}
                        </Badge>
                    </div>

                    {/* Name */}
                    <div>
                        <p className="text-sm text-gray-500 mb-1">Template Name</p>
                        <p className="font-medium text-gray-900 dark:text-white">{template.name}</p>
                    </div>

                    {/* Description / Trigger */}
                    {(template.description || template.trigger) && (
                        <div>
                            <p className="text-sm text-gray-500 mb-1">{isSystem ? 'Trigger' : 'Description'}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{template.trigger || template.description}</p>
                        </div>
                    )}

                    {/* Message */}
                    <div>
                        <p className="text-sm text-gray-500 mb-2">Message Content</p>
                        <div className="p-3 bg-gray-50 dark:bg-slate-800 rounded-lg">
                            <p className="text-sm font-mono text-gray-900 dark:text-white whitespace-pre-wrap">{template.message}</p>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">{template.message.length} characters</p>
                    </div>

                    {/* Variables Used */}
                    <div>
                        <p className="text-sm text-gray-500 mb-2">Variables Used</p>
                        <div className="flex flex-wrap gap-1">
                            {(template.message.match(/\{\{[^}]+\}\}/g) || []).map((variable: string, idx: number) => (
                                <Badge key={idx} variant="secondary" className="font-mono text-xs">
                                    {variable}
                                </Badge>
                            ))}
                            {!(template.message.match(/\{\{[^}]+\}\}/g) || []).length && (
                                <span className="text-sm text-gray-400">No variables</span>
                            )}
                        </div>
                    </div>

                    {/* Status for system templates */}
                    {isSystem && template.active !== undefined && (
                        <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-slate-700">
                            <span className="text-sm text-gray-500">Status</span>
                            <Badge className={template.active ? 'bg-primary-color text-white' : 'bg-gray-400'}>
                                {template.active ? 'Active' : 'Inactive'}
                            </Badge>
                        </div>
                    )}

                    {/* Created info for user templates */}
                    {!isSystem && template.createdBy && (
                        <div className="pt-2 border-t border-gray-200 dark:border-slate-700 space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-500">Created by</span>
                                <span className="text-sm font-medium text-gray-900 dark:text-white">{template.createdBy}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-500">Created on</span>
                                <span className="text-sm text-gray-600 dark:text-gray-400">{template.createdAt}</span>
                            </div>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}