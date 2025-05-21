export type CaseStatus = 'open' | 'pending' | 'closed';
export type CasePriority = 'high' | 'medium' | 'low';

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  companyName?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
}

export interface Activity {
  id: string;
  type: 'note' | 'document' | 'status' | 'deadline' | 'assignment' | 'general';
  user: string;
  action: string;
  description: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  dueDate: string;
  completed: boolean;
  completedDate?: string;
}

export interface Note {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  attachments?: string[];
}

export interface Deadline {
  title: string;
  date: string;
  description?: string;
}

export interface Case {
  id: string;
  caseNumber: string;
  title: string;
  description: string;
  type: string;
  status: CaseStatus;
  priority: CasePriority;
  filingDate: string;
  dueDate: string;
  court: string;
  judge?: string;
  client: Client;
  team: TeamMember[];
  activities: Activity[];
  documents: any[]; // Using any for simplicity, ideally would be Document[]
  tasks: Task[];
  notes: Note[];
  deadlines: Deadline[];
}