import React from 'react';
import { MessageSquare, FileText, Check, AlertCircle, User, Clock } from 'lucide-react';
import { Activity } from '../../types/case';

interface TimelineProps {
  activities: Activity[];
}

const Timeline: React.FC<TimelineProps> = ({ activities }) => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'note':
        return <MessageSquare className="h-5 w-5 text-blue-500" />;
      case 'document':
        return <FileText className="h-5 w-5 text-green-500" />;
      case 'status':
        return <Check className="h-5 w-5 text-purple-500" />;
      case 'deadline':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'assignment':
        return <User className="h-5 w-5 text-yellow-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };
  
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };
  
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const groupActivitiesByDate = () => {
    const grouped = new Map<string, Activity[]>();
    
    activities.forEach(activity => {
      const date = formatDate(activity.timestamp);
      if (!grouped.has(date)) {
        grouped.set(date, []);
      }
      grouped.get(date)!.push(activity);
    });
    
    return Array.from(grouped.entries()).sort((a, b) => {
      return new Date(b[0]).getTime() - new Date(a[0]).getTime();
    });
  };
  
  const groupedActivities = groupActivitiesByDate();
  
  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {groupedActivities.map(([date, dateActivities], groupIndex) => (
          <li key={date}>
            <div className="relative pb-8">
              {groupIndex !== groupedActivities.length - 1 && (
                <span
                  className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                ></span>
              )}
              
              <div className="relative flex items-center space-x-3 mb-3">
                <div>
                  <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center ring-8 ring-white">
                    <Clock className="h-5 w-5 text-gray-500" />
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{date}</p>
                  </div>
                </div>
              </div>
              
              <div className="ml-12 space-y-6">
                {dateActivities.map((activity) => (
                  <div key={activity.id} className="relative flex gap-x-4">
                    <div className="absolute left-0 top-0 -bottom-6 flex w-6 justify-center">
                      <div className="w-px bg-gray-200"></div>
                    </div>
                    
                    <div className="relative mt-3 flex h-6 w-6 flex-none items-center justify-center bg-white">
                      {getActivityIcon(activity.type)}
                    </div>
                    
                    <div className="flex-auto rounded-md p-3 ring-1 ring-inset ring-gray-200">
                      <div className="flex justify-between gap-x-4">
                        <div className="py-0.5 text-xs leading-5 text-gray-500">
                          <span className="font-medium text-gray-900">{activity.user}</span> {activity.action}
                        </div>
                        <time className="flex-none py-0.5 text-xs leading-5 text-gray-500">
                          {formatTime(activity.timestamp)}
                        </time>
                      </div>
                      <p className="text-sm leading-6 text-gray-900">{activity.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Timeline;