import { Suspense, useState, type ReactNode } from 'react';
import { ThemeProvider } from '@/components/crm/ThemeContext';
import Sidebar from '@/components/crm/Sidebar';
import Topbar from '@/components/crm/Topbar';
import { cn } from '@/lib/utils';
import Loader from './components/Loader';



type LayoutProps = {
    children: ReactNode
    currentPageName?: string
}



export default function Layout({ children }: LayoutProps) {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    return (
        <ThemeProvider>
            <div className="min-h-screen bg-background transition-colors duration-300">
                <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
                <Topbar sidebarCollapsed={sidebarCollapsed} />
                <main
                    className={cn(
                        'pt-20 pb-6 px-6 transition-all duration-300',
                        sidebarCollapsed ? 'ml-16' : 'ml-64'
                    )}
                >
                    <div className="max-w-7xl mx-auto">
                        <Suspense fallback={<Loader />}>
                            {children}
                        </Suspense>
                    </div>
                </main>
            </div>
        </ThemeProvider>
    );
}