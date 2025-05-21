import React, { useState } from 'react';
import PageHeader from '../components/common/PageHeader';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  Clock, 
  Users,
  AlertCircle,
  Plus,
  Scale,
  FileText
} from 'lucide-react';

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState<'month' | 'week' | 'day'>('month');
  
  const events = [
    {
      id: 1,
      title: 'Client Meeting - James Smith',
      start: new Date(2025, 5, 15, 10, 0),
      end: new Date(2025, 5, 15, 11, 30),
      type: 'meeting',
      caseId: '1'
    },
    {
      id: 2,
      title: 'Court Hearing - Smith v. Johnson',
      start: new Date(2025, 5, 17, 9, 0),
      end: new Date(2025, 5, 17, 12, 0),
      type: 'hearing',
      caseId: '1'
    },
    {
      id: 3,
      title: 'Deposition - Dr. Wilson',
      start: new Date(2025, 5, 20, 14, 0),
      end: new Date(2025, 5, 20, 16, 0),
      type: 'deposition',
      caseId: '1'
    },
    {
      id: 4,
      title: 'Document Review - Williams Bankruptcy',
      start: new Date(2025, 5, 22, 13, 0),
      end: new Date(2025, 5, 22, 17, 0),
      type: 'internal',
      caseId: '2'
    },
    {
      id: 5,
      title: 'Settlement Conference',
      start: new Date(2025, 5, 25, 11, 0),
      end: new Date(2025, 5, 25, 13, 0),
      type: 'meeting',
      caseId: '4'
    }
  ];
  
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };
  
  const getDateDetails = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const monthName = currentDate.toLocaleString('default', { month: 'long' });
    
    return { year, month, monthName };
  };
  
  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };
  
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };
  
  const renderMonthView = () => {
    const { year, month, monthName } = getDateDetails();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    
    // Create array for days of week headers
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    // Create array for the dates
    const dates = [];
    
    // Add empty cells for days before the first day of month
    for (let i = 0; i < firstDayOfMonth; i++) {
      dates.push(null);
    }
    
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      dates.push(i);
    }
    
    // Get events for this month
    const monthEvents = events.filter(event => 
      event.start.getFullYear() === year && 
      event.start.getMonth() === month
    );
    
    // Group events by date
    const eventsByDate: Record<number, typeof events> = {};
    monthEvents.forEach(event => {
      const day = event.start.getDate();
      if (!eventsByDate[day]) {
        eventsByDate[day] = [];
      }
      eventsByDate[day].push(event);
    });
    
    return (
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">{monthName} {year}</h2>
          <div className="flex space-x-2">
            <button 
              onClick={previousMonth}
              className="p-2 rounded-md hover:bg-gray-100"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>
            <button
              onClick={() => setCurrentDate(new Date())}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Today
            </button>
            <button 
              onClick={nextMonth}
              className="p-2 rounded-md hover:bg-gray-100"
            >
              <ChevronRight className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="grid grid-cols-7 gap-px bg-gray-200">
            {daysOfWeek.map((day, i) => (
              <div key={i} className="bg-gray-50 py-2 text-center text-xs font-medium text-gray-500">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-px bg-gray-200">
            {dates.map((date, i) => (
              <div 
                key={i} 
                className={`bg-white min-h-24 p-2 ${
                  date && date === new Date().getDate() && 
                  month === new Date().getMonth() && 
                  year === new Date().getFullYear() 
                    ? 'bg-blue-50' 
                    : ''
                }`}
              >
                {date && (
                  <>
                    <p className="text-sm font-medium">{date}</p>
                    <div className="mt-1 space-y-1 max-h-[80px] overflow-y-auto">
                      {eventsByDate[date]?.map(event => (
                        <div 
                          key={event.id}
                          className={`px-2 py-1 text-xs rounded-md truncate ${
                            event.type === 'hearing' 
                              ? 'bg-red-100 text-red-800' 
                              : event.type === 'meeting' 
                                ? 'bg-blue-100 text-blue-800'
                                : event.type === 'deposition'
                                  ? 'bg-purple-100 text-purple-800'
                                  : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {event.title}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  const renderWeekView = () => {
    // Simplified week view for demonstration
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">Week view placeholder</p>
      </div>
    );
  };
  
  const renderDayView = () => {
    // Simplified day view for demonstration
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">Day view placeholder</p>
      </div>
    );
  };
  
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Calendar" 
        description="Manage your appointments, hearings, and deadlines"
        actions={[
          { 
            label: 'Add Event', 
            onClick: () => console.log('Add event'), 
            icon: <Plus className="h-4 w-4 mr-2" /> 
          }
        ]}
      />
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex border border-gray-300 rounded-md">
            <button
              onClick={() => setCurrentView('month')}
              className={`px-4 py-2 text-sm font-medium ${
                currentView === 'month' 
                  ? 'bg-blue-100 text-blue-700 border-blue-500' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setCurrentView('week')}
              className={`px-4 py-2 text-sm font-medium ${
                currentView === 'week' 
                  ? 'bg-blue-100 text-blue-700 border-blue-500' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setCurrentView('day')}
              className={`px-4 py-2 text-sm font-medium ${
                currentView === 'day' 
                  ? 'bg-blue-100 text-blue-700 border-blue-500' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Day
            </button>
          </div>
          
          <div className="hidden sm:block">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-red-500 mr-1"></div>
                <span className="text-xs text-gray-600">Hearings</span>
              </div>
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-blue-500 mr-1"></div>
                <span className="text-xs text-gray-600">Meetings</span>
              </div>
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-purple-500 mr-1"></div>
                <span className="text-xs text-gray-600">Depositions</span>
              </div>
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-gray-500 mr-1"></div>
                <span className="text-xs text-gray-600">Internal</span>
              </div>
            </div>
          </div>
        </div>
        
        {currentView === 'month' && renderMonthView()}
        {currentView === 'week' && renderWeekView()}
        {currentView === 'day' && renderDayView()}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 md:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Upcoming Events</h3>
            <CalendarIcon className="h-5 w-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {events
              .filter(event => event.start > new Date())
              .sort((a, b) => a.start.getTime() - b.start.getTime())
              .slice(0, 5)
              .map(event => (
                <div key={event.id} className="flex border-l-4 pl-4 py-2" style={{
                  borderColor: 
                    event.type === 'hearing' 
                      ? '#EF4444' 
                      : event.type === 'meeting' 
                        ? '#3B82F6'
                        : event.type === 'deposition'
                          ? '#8B5CF6'
                          : '#6B7280'
                }}>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{event.title}</p>
                    <div className="mt-1 flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 text-gray-400 mr-1" />
                      <span>
                        {event.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
                        {event.end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <span className="mx-2">•</span>
                      <span>{event.start.toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    {event.type === 'hearing' && (
                      <div className="bg-red-100 p-2 rounded-full">
                        <Scale className="h-5 w-5 text-red-700" />
                      </div>
                    )}
                    {event.type === 'meeting' && (
                      <div className="bg-blue-100 p-2 rounded-full">
                        <Users className="h-5 w-5 text-blue-700" />
                      </div>
                    )}
                    {event.type === 'deposition' && (
                      <div className="bg-purple-100 p-2 rounded-full">
                        <FileText className="h-5 w-5 text-purple-700" />
                      </div>
                    )}
                    {event.type === 'internal' && (
                      <div className="bg-gray-100 p-2 rounded-full">
                        <Users className="h-5 w-5 text-gray-700" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Upcoming Deadlines</h3>
            <AlertCircle className="h-5 w-5 text-red-400" />
          </div>
          
          <div className="space-y-3">
            <div className="border-l-4 border-red-500 pl-4 py-2">
              <p className="font-medium text-gray-900">Expert Witness Disclosure</p>
              <div className="mt-1 flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 text-gray-400 mr-1" />
                <span>Due in 3 days</span>
              </div>
              <p className="mt-1 text-sm text-gray-600">Smith v. Johnson (CV-2023-0124)</p>
            </div>
            
            <div className="border-l-4 border-yellow-500 pl-4 py-2">
              <p className="font-medium text-gray-900">File Motion for Summary Judgment</p>
              <div className="mt-1 flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 text-gray-400 mr-1" />
                <span>Due in 7 days</span>
              </div>
              <p className="mt-1 text-sm text-gray-600">Thompson v. City (CV-2023-0513)</p>
            </div>
            
            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <p className="font-medium text-gray-900">Submit Reorganization Plan</p>
              <div className="mt-1 flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 text-gray-400 mr-1" />
                <span>Due in 14 days</span>
              </div>
              <p className="mt-1 text-sm text-gray-600">Williams Corp (CV-2023-0783)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;