import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useTheme } from '../ThemeContext';
import { format, subDays } from 'date-fns';



type TrendChartProps = {
    tickets: any
}



export default function TrendChart({ tickets }: TrendChartProps) {
    const { theme } = useTheme();


    // Generate last 14 days data
    const data = Array.from({ length: 14 }, (_, i) => {
        const date = subDays(new Date(), 13 - i);
        const dateStr = format(date, 'yyyy-MM-dd');
        const dayTickets = tickets.filter((t: any) => t.created_date?.startsWith(dateStr));

        return {
            date: format(date, 'MMM d'),
            raised: dayTickets.length,
            resolved: dayTickets.filter((t: any) => t.status === 'Resolved').length,
        };
    });

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="crm-bg-border px-4 py-3 rounded-lg shadow-lg">
                    <p className="font-medium text-gray-900 dark:text-white mb-2">{label}</p>
                    {payload.map((entry: any, index: number) => (
                        <p key={index} className="text-sm" style={{ color: entry.color }}>
                            {entry.name}: {entry.value}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="crm-bg-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Daily Ticket Trend</h3>
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#334155' : '#e5e7eb'} />
                        <XAxis
                            dataKey="date"
                            tick={{ fill: theme === 'dark' ? '#94a3b8' : '#6b7280', fontSize: 12 }}
                        />
                        <YAxis tick={{ fill: theme === 'dark' ? '#94a3b8' : '#6b7280' }} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend
                            formatter={(value) => (
                                <span className="text-gray-600 dark:text-gray-400 text-sm">{value}</span>
                            )}
                        />
                        <Line
                            type="monotone"
                            dataKey="raised"
                            name="Raised"
                            stroke="hsl(var(--primary-color))"
                            strokeWidth={2}
                            dot={{ fill: 'hsl(var(--accent-deep))', strokeWidth: 2 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="resolved"
                            name="Resolved"
                            stroke="hsl(var(--accent-deep))"
                            strokeWidth={2}
                            strokeDasharray="5 5"
                            dot={{ fill: 'hsl(var(--primary-color))', strokeWidth: 2 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}