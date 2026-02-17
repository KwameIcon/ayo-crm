import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Shield, Save, Camera } from 'lucide-react';
import CrmButton from '@/components/commons/CrmButton';

export default function Settings() {
    const [activeTab, setActiveTab] = useState('profile');

    const [profile, setProfile] = useState({
        fullName: 'Christiana Appiah',
        email: 'christiana@ayo.com',
        phone: '+233 24 123 4567',
        department: 'Sales',
        role: 'Sales Team Lead',
    });


    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your account and preferences</p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="crm-bg-border">
                    <TabsTrigger value="profile" className="data-[state=active]:bg-primary-color data-[state=active]:text-white">
                        <User className="w-4 h-4 mr-2" />
                        Profile
                    </TabsTrigger>
                    <TabsTrigger value="security" className="data-[state=active]:bg-primary-color data-[state=active]:text-white">
                        <Shield className="w-4 h-4 mr-2" />
                        Security
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="profile" className="mt-6">
                    <Card className='crm-bg-border'>
                        <CardHeader>
                            <CardTitle>Profile Information</CardTitle>
                            <CardDescription>Update your personal details</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center gap-6">
                                <div className="relative">
                                    <div className="w-20 h-20 rounded-full bg-primary-color flex items-center justify-center text-white text-2xl font-semibold">
                                        {profile.fullName.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <Button size="icon" variant="outline" className="absolute -bottom-1 -right-1 rounded-full w-8 h-8">
                                        <Camera className="w-4 h-4" />
                                    </Button>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-white">{profile.fullName}</p>
                                    <p className="text-sm text-gray-500">{profile.role}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Full Name</Label>
                                    <Input value={profile.fullName} onChange={(e) => setProfile({ ...profile, fullName: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Email</Label>
                                    <Input value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Phone</Label>
                                    <Input value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Department</Label>
                                    <Input value={profile.department} disabled className="bg-gray-50 dark:bg-slate-800" />
                                </div>
                            </div>

                            <CrmButton className="">
                                <Save className="w-4 h-4 mr-2" />
                                Save Changes
                            </CrmButton>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="security" className="mt-6">
                    <Card className='crm-bg-border'>
                        <CardHeader>
                            <CardTitle>Security Settings</CardTitle>
                            <CardDescription>Manage your account security</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Current Password</Label>
                                    <Input type="password" placeholder="Enter current password" />
                                </div>
                                <div className="space-y-2">
                                    <Label>New Password</Label>
                                    <Input type="password" placeholder="Enter new password" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Confirm New Password</Label>
                                    <Input type="password" placeholder="Confirm new password" />
                                </div>
                            </div>

                            <CrmButton className="">
                                <Shield className="w-4 h-4 mr-2" />
                                Update Password
                            </CrmButton>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}