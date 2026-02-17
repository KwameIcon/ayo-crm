import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from '../ThemeContext';
import { departments } from '../mockData';



type DepartmentChartProps = {
    tickets: any
}



export default function DepartmentChart({ tickets }: DepartmentChartProps) {
    const { theme } = useTheme();

    const data = departments.map((dept: any) => ({
        name: dept,
        tickets: tickets.filter((t: any) => t.department === dept).length,
    }));

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-background px-3 py-2 rounded-lg shadow-lg">
                    <p className="font-medium text-gray-900 dark:text-white">{label}</p>
                    <p className="text-sm text-[#2D6A4F]">{payload[0].value} tickets</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="crm-bg-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Tickets by Department</h3>
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} layout="vertical" margin={{ left: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#334155' : '#e5e7eb'} />
                        <XAxis type="number" tick={{ fill: theme === 'dark' ? '#94a3b8' : '#6b7280' }} />
                        <YAxis
                            dataKey="name"
                            type="category"
                            width={100}
                            tick={{ fill: theme === 'dark' ? '#94a3b8' : '#6b7280', fontSize: 12 }}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="tickets" fill="hsl(var(--primary-color))" radius={[0, 4, 4, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}