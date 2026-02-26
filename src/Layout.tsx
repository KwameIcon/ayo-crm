import { Suspense, useState, type ReactNode } from 'react';
import { ThemeProvider } from '@/components/crm/ThemeContext';
import Sidebar from '@/components/crm/Sidebar';
import Topbar from '@/components/crm/Topbar';
import { cn } from '@/lib/utils';
import Loader from './components/Loader';
import Footer from './components/Footer';



type LayoutProps = {
    children: ReactNode
    currentPageName?: string
}



export default function Layout({ children }: LayoutProps) {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <ThemeProvider>
            <div className="min-h-screen bg-background transition-colors duration-300">
                <Sidebar
                    mobileOpen={mobileOpen}
                    setMobileOpen={setMobileOpen}
                    collapsed={sidebarCollapsed}
                    setCollapsed={setSidebarCollapsed}
                />
                <Topbar sidebarCollapsed={sidebarCollapsed} onMenuClick={() => setMobileOpen(true)} />
                <main
                    className={cn(
                        'pt-20 pb-24 px-4 md:px-6 transition-all duration-300',
                        'ml-0 md:ml-auto',
                        sidebarCollapsed ? 'md:ml-16' : 'md:ml-64',
                        'min-h-screen relative overflow-x-hidden'
                    )}
                >
                    <div className="max-w-7xl mx-auto">
                        <Suspense fallback={<Loader />}>
                            {children}
                        </Suspense>
                    </div>
                <Footer />
                </main>
            </div>
        </ThemeProvider>
    );
}