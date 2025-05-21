import { Case } from '../types/case';

const mockCases: Case[] = [
  {
    id: '1',
    caseNumber: 'CV-2023-0124',
    title: 'Smith v. Johnson',
    description: 'Personal injury case involving a car accident on Highway 101. The plaintiff is seeking damages for medical expenses, lost wages, and pain and suffering.',
    type: 'Personal Injury',
    status: 'open',
    priority: 'high',
    filingDate: '2025-01-15',
    dueDate: '2025-07-15',
    court: 'Superior Court of California, San Francisco',
    judge: 'Hon. Maria Rodriguez',
    client: {
      id: '101',
      name: 'James Smith',
      email: 'jsmith@example.com',
      phone: '(555) 123-4567',
      address: '123 Main St, San Francisco, CA'
    },
    team: [
      {
        id: '201',
        name: 'Sarah Johnson',
        role: 'Lead Attorney',
        email: 'sjohnson@legalflow.com'
      },
      {
        id: '202',
        name: 'Michael Wong',
        role: 'Associate',
        email: 'mwong@legalflow.com'
      },
      {
        id: '203',
        name: 'Lisa Chen',
        role: 'Paralegal',
        email: 'lchen@legalflow.com'
      }
    ],
    activities: [
      {
        id: '301',
        type: 'document',
        user: 'Sarah Johnson',
        action: 'uploaded',
        description: 'Medical records from San Francisco General Hospital',
        timestamp: '2025-06-05T14:30:00Z'
      },
      {
        id: '302',
        type: 'note',
        user: 'Michael Wong',
        action: 'added',
        description: 'Called client to discuss deposition preparation',
        timestamp: '2025-06-03T11:15:00Z'
      },
      {
        id: '303',
        type: 'status',
        user: 'Sarah Johnson',
        action: 'changed',
        description: 'Case status updated from "Pending" to "Open"',
        timestamp: '2025-06-01T09:45:00Z'
      },
      {
        id: '304',
        type: 'deadline',
        user: 'Lisa Chen',
        action: 'added',
        description: 'Deadline for expert witness disclosure',
        timestamp: '2025-05-28T16:20:00Z'
      }
    ],
    documents: [
      {
        id: '401',
        title: 'Complaint',
        description: 'Initial complaint filed with the court',
        fileType: 'pdf',
        fileSize: 2456320,
        uploadedBy: 'Sarah Johnson',
        uploadDate: '2025-01-15T10:30:00Z'
      },
      {
        id: '402',
        title: 'Medical Records',
        description: 'Records from San Francisco General Hospital',
        fileType: 'pdf',
        fileSize: 8354621,
        uploadedBy: 'Michael Wong',
        uploadDate: '2025-06-05T14:30:00Z'
      },
      {
        id: '403',
        title: 'Accident Report',
        description: 'Police report for the accident',
        fileType: 'pdf',
        fileSize: 1245689,
        uploadedBy: 'Lisa Chen',
        uploadDate: '2025-01-20T11:15:00Z'
      }
    ],
    tasks: [
      {
        id: '501',
        title: 'Prepare for client deposition',
        description: 'Review documents and prepare client for upcoming deposition',
        assignedTo: '201',
        dueDate: '2025-06-20',
        completed: false
      },
      {
        id: '502',
        title: 'File motion for document production',
        description: 'Draft and file motion to compel document production from defendant',
        assignedTo: '202',
        dueDate: '2025-06-15',
        completed: false
      },
      {
        id: '503',
        title: 'Update case summary',
        description: 'Update case summary with recent developments',
        assignedTo: '203',
        dueDate: '2025-06-10',
        completed: true,
        completedDate: '2025-06-09'
      }
    ],
    notes: [
      {
        id: '601',
        author: 'Sarah Johnson',
        content: 'Client is concerned about the timeline for medical treatment and potential long-term impacts. Need to schedule consultation with medical expert to discuss prognosis.',
        timestamp: '2025-06-03T11:30:00Z'
      },
      {
        id: '602',
        author: 'Michael Wong',
        content: 'Opposing counsel has requested an extension for their response to our discovery requests. Considering whether to agree or oppose.',
        timestamp: '2025-05-28T15:45:00Z',
        attachments: ['Extension_Request.pdf']
      }
    ],
    deadlines: [
      {
        title: 'Expert Witness Disclosure',
        date: '2025-07-01',
        description: 'Deadline to disclose expert witnesses'
      },
      {
        title: 'Discovery Cut-off',
        date: '2025-08-15',
        description: 'All discovery must be completed'
      },
      {
        title: 'Mediation',
        date: '2025-09-05',
        description: 'Court-ordered mediation'
      }
    ]
  },
  {
    id: '2',
    caseNumber: 'CV-2023-0783',
    title: 'Williams Corp Bankruptcy',
    description: 'Chapter 11 bankruptcy proceedings for Williams Corporation, a mid-sized manufacturing company.',
    type: 'Bankruptcy',
    status: 'pending',
    priority: 'medium',
    filingDate: '2025-03-10',
    dueDate: '2025-09-10',
    court: 'US Bankruptcy Court, Northern District',
    client: {
      id: '102',
      name: 'Williams Corporation',
      email: 'legal@williamscorp.com',
      phone: '(555) 987-6543',
      companyName: 'Williams Corporation'
    },
    team: [
      {
        id: '204',
        name: 'David Miller',
        role: 'Lead Attorney',
        email: 'dmiller@legalflow.com'
      },
      {
        id: '205',
        name: 'Jennifer Lee',
        role: 'Financial Specialist',
        email: 'jlee@legalflow.com'
      }
    ],
    activities: [
      {
        id: '305',
        type: 'document',
        user: 'David Miller',
        action: 'uploaded',
        description: 'Reorganization plan draft',
        timestamp: '2025-06-02T10:15:00Z'
      },
      {
        id: '306',
        type: 'note',
        user: 'Jennifer Lee',
        action: 'added',
        description: 'Meeting notes with creditors committee',
        timestamp: '2025-05-30T14:45:00Z'
      }
    ],
    documents: [
      {
        id: '404',
        title: 'Bankruptcy Petition',
        description: 'Initial Chapter 11 filing',
        fileType: 'pdf',
        fileSize: 3567421,
        uploadedBy: 'David Miller',
        uploadDate: '2025-03-10T09:30:00Z'
      },
      {
        id: '405',
        title: 'Creditor List',
        description: 'Complete list of creditors and amounts',
        fileType: 'xlsx',
        fileSize: 1245689,
        uploadedBy: 'Jennifer Lee',
        uploadDate: '2025-03-12T11:15:00Z'
      }
    ],
    tasks: [
      {
        id: '504',
        title: 'Finalize reorganization plan',
        description: 'Complete and review reorganization plan for submission',
        assignedTo: '204',
        dueDate: '2025-06-30',
        completed: false
      },
      {
        id: '505',
        title: 'Prepare for creditors meeting',
        description: 'Gather financial documents and prepare presentation',
        assignedTo: '205',
        dueDate: '2025-06-25',
        completed: false
      }
    ],
    notes: [
      {
        id: '603',
        author: 'David Miller',
        content: 'Major creditor Bank of Commerce is seeking additional collateral. Need to discuss options with client.',
        timestamp: '2025-06-01T13:20:00Z'
      }
    ],
    deadlines: [
      {
        title: 'Reorganization Plan Submission',
        date: '2025-07-10',
        description: 'Deadline to submit reorganization plan to court'
      },
      {
        title: 'Creditors Meeting',
        date: '2025-06-25',
        description: 'Meeting with creditors committee'
      }
    ]
  },
  {
    id: '3',
    caseNumber: 'CV-2022-1124',
    title: 'Roberts Estate Dispute',
    description: 'Contested will and estate distribution among surviving family members of Robert Roberts.',
    type: 'Estate',
    status: 'open',
    priority: 'medium',
    filingDate: '2025-02-15',
    dueDate: '2025-08-15',
    court: 'Probate Court of London',
    client: {
      id: '103',
      name: 'Elizabeth Roberts',
      email: 'eroberts@example.com',
      phone: '(555) 789-0123',
      address: '45 Park Lane, London'
    },
    team: [
      {
        id: '206',
        name: 'William Taylor',
        role: 'Lead Attorney',
        email: 'wtaylor@legalflow.com'
      }
    ],
    activities: [
      {
        id: '307',
        type: 'document',
        user: 'William Taylor',
        action: 'uploaded',
        description: 'Original will and testament',
        timestamp: '2025-05-20T09:15:00Z'
      }
    ],
    documents: [
      {
        id: '406',
        title: 'Will and Testament',
        description: 'Original signed will from 2020',
        fileType: 'pdf',
        fileSize: 1567421,
        uploadedBy: 'William Taylor',
        uploadDate: '2025-05-20T09:15:00Z'
      }
    ],
    tasks: [
      {
        id: '506',
        title: 'Interview family witnesses',
        description: 'Schedule and conduct interviews with key family members',
        assignedTo: '206',
        dueDate: '2025-06-15',
        completed: false
      }
    ],
    notes: [
      {
        id: '604',
        author: 'William Taylor',
        content: 'Client believes there was undue influence on testator. Need to gather evidence of mental capacity at time of will signing.',
        timestamp: '2025-05-22T10:30:00Z'
      }
    ],
    deadlines: [
      {
        title: 'Evidence Submission',
        date: '2025-07-15',
        description: 'Deadline to submit all supporting evidence'
      }
    ]
  },
  {
    id: '4',
    caseNumber: 'CV-2023-0513',
    title: 'Thompson v. City Council',
    description: 'Zoning dispute regarding commercial property development within city limits.',
    type: 'Municipal',
    status: 'closed',
    priority: 'low',
    filingDate: '2025-01-05',
    dueDate: '2025-04-05',
    court: 'Municipal Court of Manchester',
    client: {
      id: '104',
      name: 'Thompson Development LLC',
      email: 'info@thompsondevelopment.com',
      phone: '(555) 234-5678',
      companyName: 'Thompson Development LLC'
    },
    team: [
      {
        id: '207',
        name: 'Rachel Green',
        role: 'Lead Attorney',
        email: 'rgreen@legalflow.com'
      }
    ],
    activities: [
      {
        id: '308',
        type: 'status',
        user: 'Rachel Green',
        action: 'changed',
        description: 'Case status updated from "Open" to "Closed"',
        timestamp: '2025-04-05T16:30:00Z'
      }
    ],
    documents: [
      {
        id: '407',
        title: 'Settlement Agreement',
        description: 'Final settlement between parties',
        fileType: 'pdf',
        fileSize: 2345678,
        uploadedBy: 'Rachel Green',
        uploadDate: '2025-04-05T16:00:00Z'
      }
    ],
    tasks: [
      {
        id: '507',
        title: 'File closing documents',
        description: 'Submit final paperwork to close case',
        assignedTo: '207',
        dueDate: '2025-04-10',
        completed: true,
        completedDate: '2025-04-08'
      }
    ],
    notes: [
      {
        id: '605',
        author: 'Rachel Green',
        content: 'Case settled with city agreeing to modified zoning proposal. Client satisfied with outcome.',
        timestamp: '2025-04-05T16:45:00Z'
      }
    ],
    deadlines: [
      {
        title: 'Documentation Filing',
        date: '2025-04-10',
        description: 'Deadline to file all closing documentation'
      }
    ]
  }
];

export default mockCases;