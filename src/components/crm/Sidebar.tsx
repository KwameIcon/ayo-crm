import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { useTheme } from './ThemeContext';
import {
    LayoutDashboard,
    Ticket,
    Settings,
    HelpCircle,
    ChevronLeft,
    ChevronRight,
    Package2,
    MessageSquare,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';




type SidebarProps = {
    collapsed: boolean;
    setCollapsed: React.Dispatch<React.SetStateAction<boolean>>
}




export default function Sidebar({ collapsed, setCollapsed }: SidebarProps) {
    const location = useLocation();
    const { role } = useTheme();


    const adminNavItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: 'dashboard' },
        { icon: Ticket, label: 'All Tickets', path: 'alltickets' },
        { icon: Package2, label: 'Products', path: 'products' },
        { icon: MessageSquare, label: 'SMS', path: 'sms' },
    ];

    const agentNavItems = [
        { icon: LayoutDashboard, label: 'My Workspace', path: 'dashboard' },
        { icon: Ticket, label: 'My Tickets', path: 'mytickets' },
        { icon: Package2, label: 'Products', path: 'products' },
        { icon: MessageSquare, label: 'SMS', path: 'sms' },
    ];

    const navItems = role === 'admin' ? adminNavItems : agentNavItems;

    const bottomNavItems = [
        { icon: Settings, label: 'Settings', path: 'settings' },
        { icon: HelpCircle, label: 'Help', path: 'help' },
    ];

    const isActive = (path: string) => {
        const currentPath = location.pathname.split('/').pop();
        return currentPath === path || (currentPath === '' && path === 'dashboard');
    };


    return (
        <aside
            className={cn(
                'fixed left-0 top-0 z-40 h-screen transition-all duration-300 ease-in-out',
                'crm-bg-border',
                collapsed ? 'w-16' : 'w-64'
            )}
        >
            {/* Logo */}
            <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-slate-800">
                {!collapsed && (
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-primary-color flex items-center justify-center">
                            <span className="text-white font-bold text-sm">A</span>
                        </div>
                        <span className="font-semibold text-lg text-primary-color">Ayo CRM</span>
                    </div>
                )}
                {collapsed && (
                    <div className="w-8 h-8 rounded-lg bg-primary-color flex items-center justify-center mx-auto">
                        <span className="text-white font-bold text-sm">A</span>
                    </div>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex flex-col justify-between h-[calc(100vh-4rem)] p-3">
                <div className="space-y-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={createPageUrl(item.path)}
                            className={cn(
                                'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200',
                                'hover:bg-gray-100 dark:hover:bg-slate-800',
                                isActive(item.path)
                                    ? 'bg-primary-color text-white'
                                    : 'text-gray-600 dark:text-gray-400'
                            )}
                        >
                            <item.icon className={cn('w-5 h-5 flex-shrink-0', isActive(item.path) && 'text-primary-color')} />
                            {!collapsed && <span className="font-medium">{item.label}</span>}
                        </Link>
                    ))}
                </div>

                <div className="space-y-1 pt-4 border-t border-gray-200 dark:border-slate-800">
                    {bottomNavItems.map((item) => (
                        <Link
                            key={item.path}
                            to={createPageUrl(item.path)}
                            className={cn(
                                'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200',
                                'hover:bg-gray-100 dark:hover:bg-slate-800',
                                'text-gray-600 dark:text-gray-400'
                            )}
                        >
                            <item.icon className="w-5 h-5 flex-shrink-0" />
                            {!collapsed && <span className="font-medium">{item.label}</span>}
                        </Link>
                    ))}

                    {/* Collapse Toggle */}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setCollapsed(!collapsed)}
                        className={cn(
                            'w-full justify-center mt-2 bg-background',
                            'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                        )}
                    >
                        {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
                    </Button>
                </div>
            </nav>
        </aside>
    );
}