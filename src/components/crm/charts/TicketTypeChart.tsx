import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';



const COLORS = ['#9A3412', 'hsl(var(--light-primary-color))', '#991B1B', '#155E75'];



type TicketTypeChartProps = {
    tickets: any
}



export default function TicketTypeChart({ tickets }: TicketTypeChartProps) {
    // const { theme } = useTheme();

    const data = [
        { name: 'Enquiry', value: tickets.filter((t: any) => t.ticket_type === 'Enquiry').length },
        { name: 'Request', value: tickets.filter((t: any) => t.ticket_type === 'Request').length },
        { name: 'Complaint', value: tickets.filter((t: any) => t.ticket_type === 'Complaint').length },
        { name: 'Compliment', value: tickets.filter((t: any) => t.ticket_type === 'Compliment').length },
    ];

    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-background px-3 py-2 rounded-lg shadow-lg">
                    <p className="font-medium text-gray-900 dark:text-white">{payload[0].name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{payload[0].value} tickets</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="crm-bg-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Ticket Types</h3>
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {data.map((_, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                    stroke='none'
                                    className='border border-border'
                                />
                            ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend
                            verticalAlign="bottom"
                            height={36}
                            formatter={(value) => (
                                <span className="text-gray-600 dark:text-gray-400 text-sm">{value}</span>
                            )}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}