import { type JSXElementConstructor } from 'react';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';



type StatCardProps = {
    title: string;
    value: string | number;
    Icon: JSXElementConstructor<any>,
    trend?: any;
    trendValue?: any;
    color?: string;
}



export default function StatCard({ title, value, Icon, trend, trendValue, color = 'green' }: StatCardProps) {
    const colorVariants = {
        green: 'bg-[#2D6A4F]/10 text-[#2D6A4F] dark:bg-[#2D6A4F]/20',
        blue: 'bg-blue-500/10 text-blue-600 dark:bg-blue-500/20',
        orange: 'bg-orange-500/10 text-orange-600 dark:bg-orange-500/20',
        red: 'bg-red-500/10 text-red-600 dark:bg-red-500/20',
        purple: 'bg-purple-500/10 text-purple-600 dark:bg-purple-500/20',
    };

    return (
        <div className="rounded-xl crm-bg-border p-6 transition-all duration-300 ease-in-out hover:shadow-lg hover:border-primary-color">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{value}</p>
                    {trend && (
                        <div className="flex items-center gap-1 mt-2">
                            {trend === 'up' ? (
                                <TrendingUp className="w-4 h-4 text-green-500" />
                            ) : (
                                <TrendingDown className="w-4 h-4 text-red-500" />
                            )}
                            <span className={cn('text-sm font-medium', trend === 'up' ? 'text-green-500' : 'text-red-500')}>
                                {trendValue}
                            </span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">vs last month</span>
                        </div>
                    )}
                </div>
                <div className={cn('p-3 rounded-xl', colorVariants[color as keyof typeof colorVariants])}>
                    <Icon className="w-6 h-6" />
                </div>
            </div>
        </div>
    );
}