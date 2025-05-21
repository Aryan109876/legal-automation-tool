import React from 'react';
import { Clock, AlertCircle } from 'lucide-react';

const UpcomingDeadlines: React.FC = () => {
  const deadlines = [
    {
      id: 1,
      title: 'File Motion for Summary Judgment',
      caseNumber: 'CV-2023-0124',
      caseTitle: 'Smith v. Johnson',
      dueDate: '2025-06-15',
      priority: 'high',
    },
    {
      id: 2,
      title: 'Client meeting to review discovery documents',
      caseNumber: 'CV-2023-0783',
      caseTitle: 'Williams Corp Bankruptcy',
      dueDate: '2025-06-18',
      priority: 'medium',
    },
    {
      id: 3,
      title: 'Submit Brief for Appeal',
      caseNumber: 'CV-2022-1124',
      caseTitle: 'Roberts Estate Dispute',
      dueDate: '2025-06-22',
      priority: 'high',
    },
    {
      id: 4,
      title: 'Deposition Preparation',
      caseNumber: 'CV-2023-0513',
      caseTitle: 'Thompson v. City Council',
      dueDate: '2025-06-25',
      priority: 'medium',
    },
  ];
  
  const getPriorityColor = (priority: string) => {
    const colors = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-blue-100 text-blue-800',
    };
    
    return colors[priority as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };
  
  const getDaysRemaining = (dueDate: string) => {
    const today = new Date();
    const deadline = new Date(dueDate);
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };
  
  return (
    <div className="space-y-4">
      {deadlines.map(deadline => {
        const daysRemaining = getDaysRemaining(deadline.dueDate);
        const isUrgent = daysRemaining <= 3;
        
        return (
          <div key={deadline.id} className="flex border-l-4 pl-4 py-2" style={{ borderColor: isUrgent ? '#EF4444' : '#3B82F6' }}>
            <div className="flex-1">
              <div className="flex items-start">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{deadline.title}</p>
                  <p className="text-sm text-gray-500">{deadline.caseTitle} ({deadline.caseNumber})</p>
                </div>
                <span className={`ml-2 px-2 py-1 rounded-full text-xs ${getPriorityColor(deadline.priority)}`}>
                  {deadline.priority}
                </span>
              </div>
              
              <div className="mt-2 flex items-center text-sm">
                <Clock className="h-4 w-4 text-gray-400 mr-1" />
                <span className="text-gray-500">Due: {new Date(deadline.dueDate).toLocaleDateString()}</span>
                
                {isUrgent && (
                  <span className="ml-3 flex items-center text-red-600">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {daysRemaining <= 0 ? 'Overdue' : `${daysRemaining} days left`}
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UpcomingDeadlines;