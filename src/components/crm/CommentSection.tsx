import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Send, Reply, CornerDownRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { generateMockComments } from './mockData';



type CommentItemProps = {
    comment: any;
    onReply?: any;
    replyingTo?: any;
    setReplyingTo?: any;
}



function CommentItem({ comment, replyingTo, setReplyingTo }: CommentItemProps) {
    const isReply = !!comment.parent_comment_id;

    return (
        <div className={cn('group', isReply && 'ml-8 pl-4 border-l-2 border-gray-200 dark:border-slate-700')}>
            <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-[#2D6A4F]/10 flex-shrink-0 flex items-center justify-center">
                    <span className="text-primary-color text-xs font-medium">
                        {comment.author_name.split(' ').map((n: any) => n[0]).join('')}
                    </span>
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 flex-wrap">
                        <span className="font-medium text-gray-900 dark:text-white text-sm">
                            {comment.author_name}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                            {comment.author_role}
                        </span>
                        <span className="text-xs text-gray-400 dark:text-gray-500">
                            {formatDistanceToNow(new Date(comment.created_date), { addSuffix: true })}
                        </span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mt-1 text-sm">
                        {comment.content}
                    </p>
                    {!isReply && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                            className="text-xs hover:bg-transparent text-gray-500 hover:text-[#2D6A4F] -ml-2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <Reply className="w-3 h-3 mr-1" />
                            Reply
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function CommentSection({ ticketId }: {ticketId: string}) {
    const [comments, setComments] = useState(() => generateMockComments(ticketId));
    const [newComment, setNewComment] = useState('');
    const [replyingTo, setReplyingTo] = useState(null);
    const [replyText, setReplyText] = useState('');

    const handleSubmit = () => {
        if (!newComment.trim()) return;

        const comment = {
            id: `CMT-${ticketId}-${Date.now()}`,
            ticket_id: ticketId,
            content: newComment,
            author_name: 'Christiana Appiah',
            author_role: 'Sales Team Lead',
            created_date: new Date().toISOString(),
            parent_comment_id: null,
        };

        setComments([...comments, comment]);
        setNewComment('');
    };

    const handleReply = (parentId: string) => {
        if (!replyText.trim()) return;

        const reply = {
            id: `CMT-${ticketId}-${Date.now()}-R`,
            ticket_id: ticketId,
            content: replyText,
            author_name: 'Christiana Appiah',
            author_role: 'Sales Team Lead',
            created_date: new Date().toISOString(),
            parent_comment_id: parentId,
        };

        setComments([...comments, reply]);
        setReplyText('');
        setReplyingTo(null);
    };

    // Organize comments with their replies
    const organizedComments = comments.reduce((acc: any, comment: any) => {
        if (!comment.parent_comment_id) {
            acc.push({
                ...comment,
                replies: comments.filter(c => c.parent_comment_id === comment.id),
            });
        }
        return acc;
    }, []);

    return (
        <div className="flex flex-col h-full">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Internal Comments</h3>

            {/* Comments List */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
                {organizedComments.map((comment: any) => (
                    <div key={comment.id}>
                        <CommentItem
                            comment={comment}
                            onReply={handleReply}
                            replyingTo={replyingTo}
                            setReplyingTo={setReplyingTo}
                        />

                        {/* Replies */}
                        {comment.replies?.map((reply: any) => (
                            <div key={reply.id} className="mt-3">
                                <CommentItem comment={reply} />
                            </div>
                        ))}

                        {/* Reply Input */}
                        {replyingTo === comment.id && (
                            <div className="ml-8 mt-3 flex gap-2">
                                <CornerDownRight className="w-4 h-4 text-gray-400 mt-2 flex-shrink-0" />
                                <div className="flex-1 flex gap-2">
                                    <Textarea
                                        value={replyText}
                                        onChange={(e) => setReplyText(e.target.value)}
                                        placeholder="Write a reply..."
                                        className="min-h-[60px] text-sm resize-none"
                                    />
                                    <Button
                                        size="sm"
                                        onClick={() => handleReply(comment.id)}
                                        className="bg-primary-color hover:bg-[#2D6A4F]/90"
                                    >
                                        <Send className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}

                {comments.length === 0 && (
                    <p className="text-center text-gray-400 dark:text-gray-500 py-8 text-sm">
                        No comments yet. Start the conversation!
                    </p>
                )}
            </div>

            {/* New Comment Input */}
            <div className="border-t border-gray-200 dark:border-slate-700 pt-4">
                <div className="flex gap-2">
                    <Textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add a comment..."
                        className="min-h-[80px] text-sm resize-none"
                    />
                </div>
                <div className="flex justify-end mt-2">
                    <Button
                        onClick={handleSubmit}
                        disabled={!newComment.trim()}
                        className="bg-primary-color hover:bg-[#2D6A4F]/90"
                    >
                        <Send className="w-4 h-4 mr-2" />
                        Send
                    </Button>
                </div>
            </div>
        </div>
    );
}