import { useTheme } from './ThemeContext';
import { Sun, Moon, Shield, User, Bell, Search, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import GlobalSearchModal from './GlobalSearchModal';



type TopbarProps = {
    sidebarCollapsed: boolean;
    onMenuClick: () => void
}



export default function Topbar({ sidebarCollapsed, onMenuClick }: TopbarProps) {
    const { theme, toggleTheme, role, toggleRole } = useTheme();
    const [showSearch, setShowSearch] = useState(false);

    return (
        <>
            <header
                className={cn(
                    'fixed top-0 right-0 z-30 h-16 transition-all duration-300',
                    ' backdrop-blur-md crm-bg-border',
                    'left-0 md:left-auto',
                    sidebarCollapsed ? 'md:left-16' : 'md:left-64'
                )}
            >
                <div className="flex items-center justify-between h-full px-6">
                    {/* Mobile Menu Toggle */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden text-gray-600 dark:text-gray-400"
                        onClick={onMenuClick}
                    >
                        <Menu className="w-5 h-5" />
                    </Button>

                    {/* Search */}
                    <div
                        className="relative w-96 hidden md:block cursor-pointer"
                        onClick={() => setShowSearch(true)}
                    >
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <div className="pl-10 pr-4 py-2 crm-bg-border rounded-md text-sm text-gray-400">
                            Search tickets, customers...
                        </div>
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-3">
                        {/* Role Toggle */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className={cn(
                                        'gap-2 font-medium',
                                        role === 'admin'
                                            ? 'border-border text-primary-color hover:bg-[#2D6A4F]/10'
                                            : 'border-blue-500 text-blue-500 hover:bg-blue-500/10'
                                    )}
                                >
                                    {role === 'admin' ? (
                                        <Shield className="w-4 h-4" />
                                    ) : (
                                        <User className="w-4 h-4" />
                                    )}
                                    <span className="hidden sm:inline">{role === 'admin' ? 'Admin' : 'Agent'}</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuItem
                                    onClick={() => role !== 'admin' && toggleRole()}
                                    className={cn(role === 'admin' && 'bg-[#2D6A4F]/10')}
                                >
                                    <Shield className="w-4 h-4 mr-2" />
                                    Admin Mode
                                    {role === 'admin' && <Badge className="ml-auto bg-primary-color">Active</Badge>}
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => role !== 'agent' && toggleRole()}
                                    className={cn(role === 'agent' && 'bg-blue-500/10')}
                                >
                                    <User className="w-4 h-4 mr-2" />
                                    Agent Mode
                                    {role === 'agent' && <Badge className="ml-auto bg-blue-500">Active</Badge>}
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Theme Toggle */}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleTheme}
                            className="text-gray-600 dark:text-gray-400"
                        >
                            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                        </Button>

                        {/* Notifications */}
                        <Button variant="ghost" size="icon" className="relative text-gray-600 dark:text-gray-400">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                        </Button>

                        {/* User Menu */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="gap-2">
                                    <div className="w-8 h-8 rounded-full bg-primary-color flex items-center justify-center">
                                        <span className="text-white font-medium text-sm">CA</span>
                                    </div>
                                    <span className="hidden md:inline text-gray-700 dark:text-gray-300">
                                        Christiana A.
                                    </span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56 crm-bg-border">
                                <div className="px-3 py-2">
                                    <p className="font-medium text-gray-900 dark:text-white">Christiana Appiah</p>
                                    <p className="text-sm text-gray-500">Sales Team Lead</p>
                                </div>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link to={createPageUrl('Settings')}>Profile Settings</Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link to={createPageUrl('Help')}>Help Center</Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">Sign Out</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </header>
            <GlobalSearchModal open={showSearch} onClose={() => setShowSearch(false)} />
        </>
    );
}