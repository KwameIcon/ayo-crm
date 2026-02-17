import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bot, User, Plus } from 'lucide-react';
import SystemTemplates from './SystemTemplates';
import UserTemplates from './UserTemplates';
import TemplateModal from './TemplateModal';
import CrmButton from '@/components/commons/CrmButton';

export default function SMSTemplates() {
    const [activeTab, setActiveTab] = useState('system');
    const [showCreateModal, setShowCreateModal] = useState(false);

    return (
        <div className="space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <div className="flex items-center justify-between">
                    <TabsList className="crm-bg-border">
                        <TabsTrigger value="system" className="data-[state=active]:bg-white dark:data-[state=active]:bg-primary-color">
                            <Bot className="w-4 h-4 mr-2" />
                            System Templates
                        </TabsTrigger>
                        <TabsTrigger value="user" className="data-[state=active]:bg-white dark:data-[state=active]:bg-primary-color">
                            <User className="w-4 h-4 mr-2" />
                            User Templates
                        </TabsTrigger>
                    </TabsList>

                    {activeTab === 'user' && (
                        <CrmButton onClick={() => setShowCreateModal(true)} className="">
                            <Plus className="w-4 h-4 mr-2" />
                            Create Template
                        </CrmButton>
                    )}
                </div>

                <TabsContent value="system" className="mt-6">
                    <SystemTemplates />
                </TabsContent>

                <TabsContent value="user" className="mt-6">
                    <UserTemplates />
                </TabsContent>
            </Tabs>

            <TemplateModal
                open={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                onSave={(template: any) => {
                    console.log('Template created:', template);
                    setShowCreateModal(false);
                }}
                mode="create"
                type="user"
            />
        </div>
    );
}