import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { channels, departments, statuses, riskLevels } from './mockData';



type TicketFiltersProps = {
    filters: any;
    setFilters: any;
}



export default function TicketFilters({ filters, setFilters }: TicketFiltersProps) {
  const hasFilters = Object.values(filters).some(v => v && v !== 'all');

  const clearFilters = () => {
    setFilters({
      channel: 'all',
      department: 'all',
      status: 'all',
      risk: 'all',
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center gap-2 text-primary">
        <Filter className="w-4 h-4" />
        <span className="text-sm font-medium">Filters:</span>
      </div>

      <Select value={filters.channel || 'all'} onValueChange={(v) => setFilters({ ...filters, channel: v })}>
        <SelectTrigger className="w-36 crm-bg-border">
          <SelectValue placeholder="Channel" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Channels</SelectItem>
          {channels.map(c => (
            <SelectItem key={c} value={c}>{c}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={filters.department || 'all'} onValueChange={(v) => setFilters({ ...filters, department: v })}>
        <SelectTrigger className="w-40 crm-bg-border">
          <SelectValue placeholder="Department" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Departments</SelectItem>
          {departments.map(d => (
            <SelectItem key={d} value={d}>{d}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={filters.status || 'all'} onValueChange={(v) => setFilters({ ...filters, status: v })}>
        <SelectTrigger className="w-36 crm-bg-border">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          {statuses.map(s => (
            <SelectItem key={s} value={s}>{s}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={filters.risk || 'all'} onValueChange={(v) => setFilters({ ...filters, risk: v })}>
        <SelectTrigger className="w-32 crm-bg-border">
          <SelectValue placeholder="Risk" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Risk</SelectItem>
          {riskLevels.map(r => (
            <SelectItem key={r} value={r}>{r}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      {hasFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X className="w-4 h-4 mr-1" />
          Clear
        </Button>
      )}
    </div>
  );
}