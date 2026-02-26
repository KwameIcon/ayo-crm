import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import type { column } from './types';
import type { TableHeaderConfig } from './TableFilter';
import TableFilters from './TableFilter';
import { cn } from '@/lib/utils';
import Pagination from './Pagination';



// const statusColors = {
//     Open: 'open-bg',
//     Pending: 'pending-bg',
//     Escalated: 'escalated-bg',
//     Resolved: 'resolved-bg',
// };

// const riskColors = {
//     High: 'danger-bg',
//     Medium: 'warning-bg',
//     Low: 'low-bg',
// };



type TableProps<T> = {
    data: T[];
    columns: column<T>[];
    header: TableHeaderConfig
    emptyMessage?: string;
    tableClassName?: string;
    isFiltering?: boolean
    isPaginated?: boolean
}



export default function CrmTable<T>({ data, columns, header, emptyMessage = "No data found", tableClassName, isFiltering, isPaginated }: TableProps<T>) {



    return (
        <div className="w-full gap-4">
            {isFiltering && <TableFilters {...header} />}

            <div className="w-full crm-bg-border rounded-xl overflow-hidden">
                {data.length > 0 &&
                    <Table className={cn('w-full', tableClassName)}>
                        <TableHeader>
                            <TableRow className="bg-background h-16">
                                {columns.map((col) => (
                                    <TableHead key={String(col.key)} className="font-bold whitespace-nowrap">
                                        {col.header}
                                    </TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                data.map((row, index) => (
                                    <TableRow key={index} className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                                        {
                                            columns.map((col) => (
                                                <TableCell key={String(col.key)} className={cn("whitespace-nowrap", col.className)}>
                                                    {col.render ? col.render(row) : (row as any)[col.key]}
                                                </TableCell>
                                            ))
                                        }
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>

                }
                {
                    isPaginated && (
                        <Pagination
                            currentPage={1}
                            totalPages={5}
                            onPageChange={() => { }}
                        />
                    )
                }


                {data.length === 0 && (
                    <div className="p-12 text-center text-gray-500 dark:text-gray-400">
                        {emptyMessage}
                    </div>
                )}
            </div>
        </div>
    );
}