import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HelpCircle, MessageCircle, Users, Ticket } from 'lucide-react';

const faqs = [
    {
        category: 'Tickets',
        icon: Ticket,
        questions: [
            { q: 'How do I create a new ticket?', a: 'Click the "Create Ticket" button on the Dashboard or Tickets page. Fill in the required information including customer details, ticket type, and description.' },
            { q: 'How do I change a ticket status?', a: 'Open the ticket details by clicking on it, then use the status dropdown in the header to change the status to Open, Pending, Escalated, or Resolved.' },
            { q: 'How do I assign a ticket to someone?', a: 'Open the ticket details, go to the Assignment tab, and select a team member from the dropdown list.' },
            { q: 'What do the different ticket statuses mean?', a: 'Open: New tickets awaiting action. Pending: Waiting for customer response or additional info. Escalated: Requires supervisor attention. Resolved: Issue has been fixed.' },
        ]
    },
    {
        category: 'SMS',
        icon: MessageCircle,
        questions: [
            { q: 'How do I send an SMS to a customer?', a: 'Open the ticket details, go to the SMS tab, and click "Send SMS". You can choose a template or write a custom message.' },
            { q: 'Can I use SMS templates?', a: 'Yes! When sending an SMS, you can select from predefined templates like "Ticket Received", "Processing Update", or "Ticket Resolved".' },
            { q: 'How do I view SMS history?', a: 'Go to the SMS page from the sidebar to see all sent messages, or view ticket-specific SMS in the ticket details SMS tab.' },
        ]
    },
    {
        category: 'Account',
        icon: Users,
        questions: [
            { q: 'How do I update my profile?', a: 'Go to Settings > Profile to update your personal information including name, email, and phone number.' },
            { q: 'How do I change my password?', a: 'Go to Settings > Security and enter your current password followed by your new password.' },
            { q: 'How do I enable dark mode?', a: 'Go to Settings > Appearance and toggle the Dark Mode switch, or use the theme toggle in the top navigation bar.' },
        ]
    },
];


export default function Help() {
    const [searchQuery, _] = useState('');

    const filteredFaqs = faqs.map(category => ({
        ...category,
        questions: category.questions.filter(
            item => item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.a.toLowerCase().includes(searchQuery.toLowerCase())
        )
    })).filter(category => category.questions.length > 0);

    return (
        <div className="space-y-6 pb-10">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Help Center</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">Find answers and get support</p>
            </div>


            {/* FAQs */}
            <Card className='crm-bg-border'>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <HelpCircle className="w-5 h-5 text-[#2D6A4F]" />
                        Frequently Asked Questions
                    </CardTitle>
                    <CardDescription>Quick answers to common questions</CardDescription>
                </CardHeader>
                <CardContent>
                    {filteredFaqs.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                            <HelpCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                            <p>No results found for "{searchQuery}"</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {filteredFaqs.map((category, idx) => (
                                <div key={idx}>
                                    <div className="flex items-center gap-2 mb-3">
                                        <category.icon className="w-4 h-4 text-[#2D6A4F]" />
                                        <h3 className="font-semibold text-gray-900 dark:text-white">{category.category}</h3>
                                    </div>
                                    <Accordion type="single" collapsible className="border rounded-lg">
                                        {category.questions.map((item, index) => (
                                            <AccordionItem key={index} value={`${idx}-${index}`}>
                                                <AccordionTrigger className="px-4 hover:no-underline">
                                                    {item.q}
                                                </AccordionTrigger>
                                                <AccordionContent className="px-4 pb-4 text-gray-600 dark:text-gray-400">
                                                    {item.a}
                                                </AccordionContent>
                                            </AccordionItem>
                                        ))}
                                    </Accordion>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

        </div>
    );
}