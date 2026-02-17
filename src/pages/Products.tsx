import { useState, useMemo } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTheme } from '@/components/crm/ThemeContext';
import { mockTickets, products } from '@/components/crm/mockData';
import StatCard from '@/components/crm/StatCard';
import TicketTable from '@/components/crm/TicketTable';
import TicketDetailModal from '@/components/crm/TicketDetailModal';
import { Package, Car, Shield, Users, Smartphone, Heart } from 'lucide-react';

const productIcons = {
    pay_n_drive: Car,
    annual_cover: Shield,
    family_cover: Users,
    recharge_with_care: Smartphone,
    medcover: Heart,
};

export default function Products() {
    const { role } = useTheme();
    const [selectedProduct, setSelectedProduct] = useState('all');
    const [selectedType, setSelectedType] = useState('all');
    const [selectedTicket, setSelectedTicket] = useState(null);

    const tickets = mockTickets;

    // Get available types for selected product
    const availableTypes = useMemo(() => {
        if (selectedProduct === 'all') return [];
        const product = products.find(p => p.id === selectedProduct);
        return product?.types || [];
    }, [selectedProduct]);

    // Filter tickets based on selection
    const filteredTickets = useMemo(() => {
        let result = tickets;
        if (selectedProduct !== 'all') {
            result = result.filter(t => t.product_id === selectedProduct);
        }
        if (selectedType !== 'all') {
            result = result.filter(t => t.product_type === selectedType);
        }
        return result;
    }, [tickets, selectedProduct, selectedType]);

    // Calculate product stats
    const stats = useMemo(() => {
        const productStats = products.map(product => {
            const productTickets = tickets.filter(t => t.product_id === product.id);
            return {
                id: product.id,
                name: product.name,
                total: productTickets.length,
                open: productTickets.filter(t => t.status === 'Open').length,
                resolved: productTickets.filter(t => t.status === 'Resolved').length,
            };
        });
        return productStats;
    }, [tickets]);

    // Reset type when product changes
    const handleProductChange = (value: string) => {
        setSelectedProduct(value);
        setSelectedType('all');
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Products</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        {role === 'admin' ? 'View and analyze tickets by product' : 'Monitor product-related tickets'}
                    </p>
                </div>
            </div>

            {/* Product Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {stats.map(product => (
                    <StatCard
                        key={product.id}
                        title={product.name}
                        value={product.total}
                        Icon={productIcons[product.id as keyof typeof productIcons] || Package}
                        color="primary"
                        trend={product.open > 0 ? { value: product.open, direction: 'up', label: 'open' } : undefined}
                    />
                ))}
            </div>

            {/* Product & Type Filters */}
            <div className="crm-bg-border rounded-xl p-4">
                <div className="flex flex-wrap gap-4">
                    <Select value={selectedProduct} onValueChange={handleProductChange}>
                        <SelectTrigger className="w-[220px]">
                            <Package className="w-4 h-4 mr-2 text-[#2D6A4F]" />
                            <SelectValue placeholder="Select Product" />
                        </SelectTrigger>
                        <SelectContent className='crm-bg-border'>
                            <SelectItem value="all">All Products</SelectItem>
                            {products.map(product => (
                                <SelectItem key={product.id} value={product.id}>{product.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {selectedProduct !== 'all' && availableTypes.length > 0 && (
                        <Select value={selectedType} onValueChange={setSelectedType}>
                            <SelectTrigger className="w-[220px]">
                                <SelectValue placeholder="Select Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Types</SelectItem>
                                {availableTypes.map(type => (
                                    <SelectItem key={type} value={type}>{type}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}

                    <div className="ml-auto text-sm text-gray-500 dark:text-gray-400 self-center">
                        {filteredTickets.length} ticket{filteredTickets.length !== 1 ? 's' : ''} found
                    </div>
                </div>
            </div>

            {/* Tickets Table */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-700 overflow-hidden">
                <TicketTable tickets={filteredTickets} onTicketClick={setSelectedTicket} />
            </div>

            {/* Ticket Detail Modal */}
            <TicketDetailModal
                ticket={selectedTicket}
                open={!!selectedTicket}
                onClose={() => setSelectedTicket(null)}
            />
        </div>
    );
}