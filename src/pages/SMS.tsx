import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LayoutDashboard, FileText } from 'lucide-react';
import SMSDashboard from '@/components/crm/sms/SMSDashboard';
import SMSTemplates from '@/components/crm/sms/SMSTemplates';

export default function SMS() {
    const [activeTab, setActiveTab] = useState('dashboard');

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">SMS Management</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">Manage SMS communications and templates</p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="crm-bg-border">
                    <TabsTrigger value="dashboard" className="data-[state=active]:bg-white dark:data-[state=active]:bg-primary-color">
                        <LayoutDashboard className="w-4 h-4 mr-2" />
                        Dashboard
                    </TabsTrigger>
                    <TabsTrigger value="templates" className="data-[state=active]:bg-white dark:data-[state=active]:bg-primary-color">
                        <FileText className="w-4 h-4 mr-2" />
                        Templates
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="dashboard" className="mt-6">
                    <SMSDashboard />
                </TabsContent>

                <TabsContent value="templates" className="mt-6">
                    <SMSTemplates />
                </TabsContent>
            </Tabs>
        </div>
    );
}