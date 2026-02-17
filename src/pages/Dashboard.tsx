import { useState, useMemo } from 'react';
import { Ticket, Clock, AlertTriangle, Timer } from 'lucide-react';
import { useTheme } from '@/components/crm/ThemeContext';
import StatCard from '@/components/crm/StatCard';
import TicketTypeChart from '@/components/crm/charts/TicketTypeChart';
import DepartmentChart from '@/components/crm/charts/DepartmentChart';
import TrendChart from '@/components/crm/charts/TrendChart';
import RiskChart from '@/components/crm/charts/RiskChart';
import AgentWorkspace from '@/components/crm/AgentWorkspace';
import TicketDetailModal from '@/components/crm/TicketDetailModal';
import { mockTickets } from '@/components/crm/mockData';



export default function Dashboard() {
    const { role } = useTheme();
    const [tickets, setTickets] = useState(mockTickets);
    const [selectedTicket, setSelectedTicket] = useState(null);

    const stats = useMemo(() => {
        const thisMonth = new Date().getMonth();
        const monthTickets = tickets.filter(t => new Date(t.created_date).getMonth() === thisMonth);
        const pendingTickets = tickets.filter(t => t.status === 'Pending');
        const highRiskTickets = tickets.filter(t => t.risk_level === 'High');

        // Calculate average resolution time
        const resolvedTickets = tickets.filter(t => t.resolved_at);
        const avgResolutionHours = resolvedTickets.length > 0
            ? resolvedTickets.reduce((acc, t) => {
                const created = t.created_date ? new Date(t.created_date) : null;
                const resolved = t.resolved_at ? new Date(t.resolved_at) : null;
                if (created instanceof Date && !isNaN(+created) && resolved instanceof Date && !isNaN(+resolved)) {
                    return acc + ((resolved.getTime() - created.getTime()) / (1000 * 60 * 60));
                }
                return acc;
            }, 0) / resolvedTickets.length
            : 0;

        return {
            totalThisMonth: monthTickets.length,
            pending: pendingTickets.length,
            highRisk: highRiskTickets.length,
            avgResolution: `${Math.round(avgResolutionHours)}h`,
        };
    }, [tickets]);

    const handleCreateTicket = (newTicket: any) => {
        setTickets([newTicket, ...tickets]);
    };

    // Agent view
    if (role === 'agent') {
        return (
            <>
                <AgentWorkspace
                    tickets={tickets}
                    onTicketClick={setSelectedTicket}
                    onCreateTicket={handleCreateTicket}
                />
                <TicketDetailModal
                    ticket={selectedTicket}
                    open={!!selectedTicket}
                    onClose={() => setSelectedTicket(null)}
                />
            </>
        );
    }

    // Admin view
    return (
        <>
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Overview of ticket performance and metrics</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard
                        title="Total Tickets (Month)"
                        value={stats.totalThisMonth}
                        Icon={Ticket}
                        color="green"
                        trend="up"
                        trendValue="12%"
                    />
                    <StatCard
                        title="Pending Tickets"
                        value={stats.pending}
                        Icon={Clock}
                        color="orange"
                    />
                    <StatCard
                        title="High Risk Tickets"
                        value={stats.highRisk}
                        Icon={AlertTriangle}
                        color="red"
                    />
                    <StatCard
                        title="Avg. Resolution Time"
                        value={stats.avgResolution}
                        Icon={Timer}
                        color="blue"
                        trend="down"
                        trendValue="8%"
                    />
                </div>

                {/* Charts Row 1 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <TicketTypeChart tickets={tickets} />
                    <DepartmentChart tickets={tickets} />
                </div>

                {/* Charts Row 2 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <TrendChart tickets={tickets} />
                    <RiskChart tickets={tickets} />
                </div>
            </div>

            <TicketDetailModal
                ticket={selectedTicket}
                open={!!selectedTicket}
                onClose={() => setSelectedTicket(null)}
            />
        </>
    );
}