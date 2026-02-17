import { formatDistanceToNow } from 'date-fns';
import { CheckCircle2, Circle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import type { Dispatch, SetStateAction } from 'react';



const statusConfig = {
    Open: { color: 'border-l-blue-500', bg: 'bg-container', headerBg: 'bg-container' },
    Pending: { color: 'border-l-yellow-500', bg: 'bg-container', headerBg: 'bg-container' },
    Escalated: { color: 'border-l-red-500', bg: 'bg-container', headerBg: 'bg-container' },
    Resolved: { color: 'border-l-green-500', bg: 'bg-container', headerBg: 'bg-container' },
};



type KanbanCardProps = {
    ticket: any;
    onView: any;
    provided: any;
    isDragging: boolean;
}



function KanbanCard({ ticket, onView, provided, isDragging }: KanbanCardProps) {
    const displayName = ticket.assigned_to_name || ticket.created_by || 'Unassigned';
    const initials = displayName !== 'Unassigned'
        ? displayName.split(' ').map((n: any) => n[0]).join('').toUpperCase()
        : '?';
    const isResolved = ticket.status === 'Resolved';
    // console.log("ticket", ticket)

    return (
        <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onClick={() => onView(ticket)}
            className={cn(
                'bg-container rounded-lg ',
                'border-l-2 p-3 transition-shadow cursor-pointer hover:shadow-md',
                statusConfig[ticket.status as keyof typeof statusConfig].color,
                isDragging && 'shadow-lg ring-2 ring-[#2D6A4F]/30'
            )}
        >
            <div className="flex items-center gap-2">
                {isResolved ? (
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                ) : (
                    <Circle className="w-4 h-4 text-gray-300 dark:text-gray-600 flex-shrink-0" />
                )}
                <p className={cn(
                    'text-sm font-medium truncate',
                    isResolved ? 'text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white'
                )}>
                    {ticket.title}
                </p>
            </div>
            <div className="flex items-center gap-2 mt-2">
                <div
                    className={cn(
                        'w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0',
                        displayName !== 'Unassigned'
                            ? 'bg-[#2D6A4F]/10 text-[#2D6A4F]'
                            : 'bg-gray-100 dark:bg-slate-800 text-gray-400'
                    )}
                    title={displayName}
                >
                    {initials}
                </div>
                <p className="text-xs text-gray-400 dark:text-gray-500">
                    {formatDistanceToNow(new Date(ticket.created_date), { addSuffix: true })}
                </p>
            </div>
        </div>
    );
}





type KanbanBoardProps = {
    tickets: any;
    onTicketClick: Dispatch<SetStateAction<null>>;
    onStatusChange: (ticket: any, status: string) => void;
}




export default function KanbanBoard({ tickets, onTicketClick, onStatusChange }: KanbanBoardProps) {
    const columns = ['Open', 'Pending', 'Escalated', 'Resolved'];

    const handleDragEnd = (result: any) => {
        if (!result.destination) return;

        const { draggableId, destination } = result;
        const newStatus = destination.droppableId;
        const ticket = tickets.find((t: any) => (t.id || t.ticket_id) === draggableId);

        if (ticket && ticket.status !== newStatus && onStatusChange) {
            onStatusChange(ticket, newStatus);
        }
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {columns.map(status => {
                    const columnTickets = tickets.filter((t: any) => t.status === status);
                    return (
                        <div key={status} className="flex flex-col">
                            <div className={cn(
                                'rounded-t-lg px-4 py-3 mb-3',
                                statusConfig[status as keyof typeof statusConfig].headerBg
                            )}>
                                <div className="flex items-center justify-between">
                                    <h3 className="font-semibold text-gray-900 dark:text-white">{status}</h3>
                                    <Badge variant="secondary" className="bg-white dark:bg-slate-800">
                                        {columnTickets.length}
                                    </Badge>
                                </div>
                            </div>

                            <Droppable droppableId={status}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        className={cn(
                                            'space-y-4 flex-1 max-h-[600px] p-1 pb-10 overflow-y-scroll hide-scrollbar rounded-lg transition-colors',
                                            snapshot.isDraggingOver && 'bg-[#2D6A4F]/5'
                                        )}
                                    >
                                        {columnTickets.map((ticket: any, index: number) => (
                                            <Draggable
                                                key={ticket.id || ticket.ticket_id}
                                                draggableId={ticket.id || ticket.ticket_id}
                                                index={index}
                                            >
                                                {(provided, snapshot) => (
                                                    <KanbanCard
                                                        ticket={ticket}
                                                        onView={onTicketClick}
                                                        provided={provided}
                                                        isDragging={snapshot.isDragging}
                                                    />
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                        {columnTickets.length === 0 && !snapshot.isDraggingOver && (
                                            <div className="text-center py-8 text-gray-400 dark:text-gray-500 text-sm">
                                                No tickets
                                            </div>
                                        )}
                                    </div>
                                )}
                            </Droppable>
                        </div>
                    );
                })}
            </div>
        </DragDropContext>
    );
}