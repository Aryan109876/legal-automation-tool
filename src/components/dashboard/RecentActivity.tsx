import React from 'react';
import { User, FileText, MessageSquare, Clock } from 'lucide-react';

const RecentActivity: React.FC = () => {
  const activities = [
    {
      id: 1,
      type: 'document',
      action: 'uploaded',
      subject: 'Expert Witness Statement',
      caseNumber: 'CV-2023-0124',
      user: 'Alex Thompson',
      timestamp: '2025-06-10T14:32:00Z',
    },
    {
      id: 2,
      type: 'comment',
      action: 'added',
      subject: 'Client meeting notes',
      caseNumber: 'CV-2023-0783',
      user: 'Sarah Johnson',
      timestamp: '2025-06-10T11:15:00Z',
    },
    {
      id: 3,
      type: 'status',
      action: 'changed',
      subject: 'Case status from "Pending" to "Active"',
      caseNumber: 'CV-2022-1124',
      user: 'David Miller',
      timestamp: '2025-06-09T16:45:00Z',
    },
    {
      id: 4,
      type: 'deadline',
      action: 'added',
      subject: 'Motion Filing Deadline',
      caseNumber: 'CV-2023-0513',
      user: 'Jennifer Lee',
      timestamp: '2025-06-09T10:20:00Z',
    },
  ];
  
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'document':
        return <FileText className="h-5 w-5 text-blue-500" />;
      case 'comment':
        return <MessageSquare className="h-5 w-5 text-green-500" />;
      case 'status':
        return <Clock className="h-5 w-5 text-purple-500" />;
      case 'deadline':
        return <Clock className="h-5 w-5 text-red-500" />;
      default:
        return <User className="h-5 w-5 text-gray-500" />;
    }
  };
  
  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffMs = now.getTime() - activityTime.getTime();
    const diffMins = Math.round(diffMs / 60000);
    const diffHours = Math.round(diffMs / 3600000);
    const diffDays = Math.round(diffMs / 86400000);
    
    if (diffMins < 60) {
      return `${diffMins} min${diffMins !== 1 ? 's' : ''} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    } else {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    }
  };
  
  return (
    <div className="space-y-4">
      {activities.map(activity => (
        <div key={activity.id} className="flex items-start">
          <div className="mr-3 mt-1">
            {getActivityIcon(activity.type)}
          </div>
          <div className="flex-1">
            <p className="text-sm">
              <span className="font-medium text-gray-900">{activity.user}</span>
              {' '}{activity.action}{' '}
              <span className="font-medium text-gray-900">{activity.subject}</span>
              {' '}on case{' '}
              <span className="text-blue-600">{activity.caseNumber}</span>
            </p>
            <p className="text-xs text-gray-500 mt-1">{formatTimeAgo(activity.timestamp)}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentActivity;