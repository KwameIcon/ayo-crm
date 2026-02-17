import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useTheme } from '../ThemeContext';



const COLORS = {
    High: '#ef4444',
    Medium: '#f59e0b',
    Low: '#22c55e',
};



type RiskChartProps = {
    tickets: any
}



export default function RiskChart({ tickets }: RiskChartProps) {
    const { theme } = useTheme();

    const data = [
        { name: 'High', value: tickets.filter((t: any) => t.risk_level === 'High').length },
        { name: 'Medium', value: tickets.filter((t: any) => t.risk_level === 'Medium').length },
        { name: 'Low', value: tickets.filter((t: any) => t.risk_level === 'Low').length },
    ];

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="crm-bg-border px-3 py-2 rounded-lg shadow-lg ">
                    <p className="font-medium text-gray-900 dark:text-white">{label} Risk</p>
                    <p className="text-sm" style={{ color: COLORS[label as keyof typeof COLORS] }}>{payload[0].value} tickets</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="crm-bg-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Risk Level Distribution</h3>
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} layout="vertical" margin={{ left: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#334155' : '#e5e7eb'} />
                        <XAxis type="number" tick={{ fill: theme === 'dark' ? '#94a3b8' : '#6b7280' }} />
                        <YAxis
                            dataKey="name"
                            type="category"
                            width={70}
                            tick={{ fill: theme === 'dark' ? '#94a3b8' : '#6b7280' }}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}