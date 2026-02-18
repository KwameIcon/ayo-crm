// Personnel Data
export const personnel = [
  { id: '1', name: 'Christiana Appiah', email: 'christiana@ayo.com', role: 'Sales Team Lead', department: 'Sales' },
  { id: '2', name: 'Selorm Tsegah', email: 'selorm@ayo.com', role: 'Customer Experience Lead', department: 'Customer Service' },
  { id: '3', name: 'Rosina Baah', email: 'rosina@ayo.com', role: 'Customer Experience Executive', department: 'Customer Service' },
  { id: '4', name: 'Kwame Mensah', email: 'kwame@ayo.com', role: 'Claims Specialist', department: 'Claims' },
  { id: '5', name: 'Abena Osei', email: 'abena@ayo.com', role: 'IT Support', department: 'IT' },
  { id: '6', name: 'Kofi Asante', email: 'kofi@ayo.com', role: 'Finance Officer', department: 'Finance' },
  { id: '7', name: 'Efua Darko', email: 'efua@ayo.com', role: 'QA Analyst', department: 'QA' },
  { id: '8', name: 'Yaw Boateng', email: 'yaw@ayo.com', role: 'Marketing Coordinator', department: 'Marketing' },
];

export const channels = ['WhatsApp', 'Call Center', 'Email', 'Walk-in', 'Field', 'Call Request'];

export const products = [
  {
    id: 'pay_n_drive',
    name: 'Pay n Drive',
    types: ['New Purchase', 'Renewal', 'Claims', 'Policy Update', 'Cancellation', 'Refund']
  },
  {
    id: 'annual_cover',
    name: 'Annual Cover',
    types: ['Gold', 'Silver', 'Bronze']
  },
  {
    id: 'family_cover',
    name: 'Family Cover',
    types: ['New Enrollment', 'Add Dependent', 'Remove Dependent', 'Claims', 'Policy Update', 'Renewal']
  },
  {
    id: 'recharge_with_care',
    name: 'Recharge with Care',
    types: ['Activation', 'Recharge Issues', 'Balance Inquiry', 'Service Upgrade', 'Cancellation']
  },
  {
    id: 'medcover',
    name: 'MedCover',
    types: ['Platinium', 'Gold', 'Silver']
  }
];

export const categories = [
  'Policy Information',
  'Payment Issues',
  'Claims Process',
  'Technical Support',
  'Cancellation',
  'Renewal',
  'General Enquiry',
  'Complaint',
  'Compliment'
];

export const ticketTypes = ['Enquiry', 'Request', 'Complaint', 'Compliment'];

export const departments = ['IT', 'Customer Service', 'Sales', 'Claims', 'Marketing', 'Finance', 'QA'];

export const riskLevels = ['High', 'Medium', 'Low'];

export const statuses = ['Open', 'Pending', 'Escalated', 'Resolved'];

// Generate mock tickets
export const generateMockTickets = () => {
  const customers = [
    { title: "Can't register since July 20", name: 'Ama Serwaa', phone: '+233 24 123 4567', email: 'ama.serwaa@gmail.com' },
    { title: "Cannot renew policy", name: 'Kweku Annan', phone: '+233 20 987 6543', email: 'kweku.annan@yahoo.com' },
    { title: "Difficult to check policy status", name: 'Adjoa Mensah', phone: '+233 27 456 7890', email: 'adjoa.m@outlook.com' },
    { title: "Previous claim not settled", name: 'Kojo Owusu', phone: '+233 24 321 0987', email: 'kojo.owusu@gmail.com' },
    { title: "I cannot file a claim", name: 'Akua Asante', phone: '+233 50 654 3210', email: 'akua.asante@email.com' },
    { title: "No response to my call", name: 'Yaw Appiah', phone: '+233 26 789 0123', email: 'yaw.appiah@business.com' },
    { title: "Payment issue", name: 'Efua Boateng', phone: '+233 23 012 3456', email: 'efua.b@company.gh' },
    { title: "Cannot renew policy", name: 'Kofi Darko', phone: '+233 54 567 8901', email: 'kofi.darko@mail.com' },
  ];

  const descriptions = [
    'Customer inquiring about policy renewal process and required documents.',
    'Unable to process payment through mobile money. Transaction keeps failing.',
    'Requesting update on pending claim submitted last week.',
    'Technical issues with the mobile app - cannot login.',
    'Customer wants to cancel policy and requesting refund information.',
    'Positive feedback about prompt claim settlement.',
    'Question about coverage details for motor insurance.',
    'Complaint about delayed response to previous enquiry.',
  ];

  const tickets = [];
  const now = new Date();

  for (let i = 0; i < 15; i++) {
    const customer = customers[Math.floor(Math.random() * customers.length)];
    const daysAgo = Math.floor(Math.random() * 30);
    const createdAt = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const assignee = Math.random() > 0.2 ? personnel[Math.floor(Math.random() * personnel.length)] : null;
    const product = products[Math.floor(Math.random() * products.length)];
    const productType = product.types[Math.floor(Math.random() * product.types.length)];

    tickets.push({
      id: `TKT-${String(i + 1).padStart(5, '0')}`,
      ticket_id: `TKT-${String(i + 1).padStart(5, '0')}`,
      title: customer.title,
      customer_name: customer.name,
      contact_number: customer.phone,
      email: customer.email,
      channel: channels[Math.floor(Math.random() * channels.length)],
      category: categories[Math.floor(Math.random() * categories.length)],
      ticket_type: ticketTypes[Math.floor(Math.random() * ticketTypes.length)],
      department: departments[Math.floor(Math.random() * departments.length)],
      risk_level: riskLevels[Math.floor(Math.random() * riskLevels.length)],
      status,
      priority: ['Urgent', 'High', 'Normal', 'Low'][Math.floor(Math.random() * 4)],
      assigned_to: assignee?.email || null,
      assigned_to_name: assignee?.name || null,
      policy_number: Math.random() > 0.3 ? `POL-${Math.floor(Math.random() * 900000 + 100000)}` : null,
      product_id: product.id,
      product_name: product.name,
      product_type: productType,
      specifics: productType,
      description: descriptions[Math.floor(Math.random() * descriptions.length)],
      created_by: personnel[Math.floor(Math.random() * personnel.length)].name,
      created_date: createdAt.toISOString(),
      resolved_at: status === 'Resolved' ? new Date(createdAt.getTime() + Math.random() * 5 * 24 * 60 * 60 * 1000).toISOString() : null,
    });
  }

  return tickets.sort((_, b) => new Date(b.created_date).getTime() - new Date(b.created_date).getTime());
};

// Generate mock comments
export const generateMockComments = (ticketId: string) => {
  const commentTexts = [
    'I have contacted the customer and they will provide additional documents.',
    'Escalating this to the claims department for review.',
    'Customer confirmed the issue has been resolved.',
    'Waiting for customer callback to complete verification.',
    'Processed the request. Customer will receive confirmation within 24 hours.',
  ];

  const replies = [
    'Thanks for the update. Please keep me posted.',
    'Noted. I will follow up with the customer.',
    'Great work! Closing this ticket.',
  ];

  const comments = [];
  const numComments = Math.floor(Math.random() * 4) + 1;

  for (let i = 0; i < numComments; i++) {
    const author = personnel[Math.floor(Math.random() * personnel.length)];
    const hoursAgo = Math.floor(Math.random() * 72) + 1;

    const comment = {
      id: `CMT-${ticketId}-${i + 1}`,
      ticket_id: ticketId,
      content: commentTexts[Math.floor(Math.random() * commentTexts.length)],
      author_name: author.name,
      author_role: author.role,
      created_date: new Date(Date.now() - hoursAgo * 60 * 60 * 1000).toISOString(),
      parent_comment_id: null,
    };
    comments.push(comment);

    // Add reply sometimes
    if (Math.random() > 0.5) {
      const replyAuthor = personnel[Math.floor(Math.random() * personnel.length)];
      comments.push({
        id: `CMT-${ticketId}-${i + 1}-R1`,
        ticket_id: ticketId,
        content: replies[Math.floor(Math.random() * replies.length)],
        author_name: replyAuthor.name,
        author_role: replyAuthor.role,
        created_date: new Date(Date.now() - (hoursAgo - 1) * 60 * 60 * 1000).toISOString(),
        parent_comment_id: comment.id,
      });
    }
  }

  return comments.sort((a, b) => (new Date(a.created_date).getTime() - new Date(b.created_date).getTime()));
};

export const mockTickets = generateMockTickets();

// Generate mock SMS data
export const generateMockSMS = () => {
  const smsMessages = [];
  const systemTemplates = [
    { msg: 'Dear {name}, your ticket #{ticket_id} has been received. We will respond within 24 hours.', type: 'system' },
    { msg: 'Hi {name}, your ticket #{ticket_id} status has been updated to Pending.', type: 'system' },
    { msg: 'Dear {name}, your ticket #{ticket_id} has been resolved. Thank you for choosing Ayo InsureTech.', type: 'system' },
    { msg: 'Dear {name}, your ticket #{ticket_id} has been escalated for priority handling.', type: 'system' },
  ];
  const userTemplates = [
    { msg: 'Hi {name}, your claim for policy {policy} is being processed. Reference: {ticket_id}', type: 'user' },
    { msg: 'Hi {name}, we need additional documents for ticket #{ticket_id}. Please reply or call us.', type: 'user' },
    { msg: 'Dear {name}, reminder: Your policy renewal is due. Contact us for assistance.', type: 'user' },
    { msg: 'Hi {name}, your payment of GHS 500 has been confirmed. Reference: {ticket_id}', type: 'user' },
  ];

  const allTemplates = [...systemTemplates, ...systemTemplates, ...userTemplates]; // More system SMS
  const statuses = ['delivered', 'sent', 'failed', 'pending'];
  const now = new Date();

  for (let i = 0; i < 15; i++) {
    const ticket = mockTickets[Math.floor(Math.random() * mockTickets.length)];
    const daysAgo = Math.floor(Math.random() * 60);
    const hoursAgo = Math.floor(Math.random() * 24);
    const sentAt = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000 - hoursAgo * 60 * 60 * 1000);
    const template = allTemplates[Math.floor(Math.random() * allTemplates.length)];
    const message = template.msg
      .replace('{name}', ticket.customer_name.split(' ')[0])
      .replace('{ticket_id}', ticket.ticket_id)
      .replace('{policy}', ticket.policy_number || 'N/A');

    smsMessages.push({
      id: `SMS-${String(i + 1).padStart(5, '0')}`,
      ticket_id: ticket.ticket_id,
      recipient_name: ticket.customer_name,
      recipient_phone: ticket.contact_number,
      message,
      type: template.type,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      sent_at: sentAt.toISOString(),
      sent_by: template.type === 'system' ? 'System' : personnel[Math.floor(Math.random() * personnel.length)].name,
      cost: (Math.random() * 0.5 + 0.1).toFixed(2),
    });
  }

  return smsMessages.sort((a, b) => new Date(b.sent_at).getTime() - new Date(a.sent_at).getTime());
};

export const mockSMS = generateMockSMS();



export const specifics = [
  {
    type: 'enquiry',
    options : [
      { name: 'policy_info', label: 'Policy Information' },
      { name: 'policy_premium', label: 'Policy Premium',},
      { name: 'claims', label: 'Claims' },
      { name: 'family_member', label: 'Family Member/ Beneficiary' },
      { name: 'ussd', label: 'USSD and Portal' },
      { name: 'product_options', label: 'Product Options' },
    ],
    departmentOptions: [
      { name: 'customer_service', label: 'Customer Service' },
      { name: 'sales', label: 'Sales' },
      { name: 'claims_team', label: 'Claims Team' },
      { name: 'product_project_team', label: 'Product/Project Team' },
      { name: 'marketing', label: 'Marketing' },
      { name: 'it', label: 'IT' },
    ]
  },
  {
    type: 'request',
    options : [
      { name: 'policy_management', label: 'Policy Management' },
      { name: 'beneficiary_family_member', label: 'Beneficiary/Family Member Covered' },
      { name: 'payments_deductions', label: 'Payments and Deductions' },
      { name: 'claims_support', label: 'Claims Support' },
      { name: 'documentations', label: 'Documentations' },
      { name: 'technical_support', label: 'Tecnical Support' },
      { name: 'cancellation_reinstatement', label: 'Cancellation/ Reinstatement' },
      { name: 'refund', label: 'Refund' },
    ],
    departmentOptions: [
      { name: 'customer_service', label: 'Customer Service' },
      { name: 'claims_team', label: 'Claims Team' },
      { name: 'product_project_team', label: 'Product/Project Team' },
      { name: 'marketing', label: 'Marketing' },
      { name: 'it', label: 'IT' },
    ]
  },
  {
    type: 'complaint',
    options : [
      { name: 'payment_issues', label: 'Payment Issues' },
      { name: 'claims_process_status', label: 'Claims Process and Status' },
      { name: 'communication_failures', label: 'Communication Failures' },
      { name: 'portal_ussd_issues', label: 'Portal/USSD Issues' },
      { name: 'policy_misunderstanding', label: 'Policy Misunderstanding' },
      { name: 'policy_access_issues', label: 'Policy Access Issues' },
      { name: 'service_delays', label: 'Service Delays' },
    ],
    departmentOptions: [
      { name: 'customer_service', label: 'Customer Service' },
      { name: 'operations', label: 'Operations' },
      { name: 'claims', label: 'Claims' },
      { name: 'product_project_team', label: 'Product/Project Team' },
      { name: 'it', label: 'IT' },
      { name: 'finance', label: 'Finance' },
      { name: 'qa', label: 'QA' },
      { name: 'call_center', label: 'Call Center' },
      { name: 'sales', label: 'Sales' },
    ]
  },
  {
    type: 'compliment',
    options : [
      { name: 'customer_service', label: 'Excellent Customer Service' },
      { name: 'claims_payment', label: 'Prompt Claims Payment' },
      { name: 'support', label: 'Helpful Support' },
    ],
    departmentOptions: [
      { name: 'customer_service', label: 'Customer Service' },
      { name: 'claims_team', label: 'Claims Team' },
      { name: 'sales', label: 'Sales' },
      { name: 'marketing', label: 'Marketing' },
      { name: 'it', label: 'IT' },
    ]
  }
]