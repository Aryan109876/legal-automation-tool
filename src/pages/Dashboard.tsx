import React from 'react';
import { Clock, Calendar, FileText, Users, DollarSign, Scale, ArrowUpRight } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import CaseStatusChart from '../components/dashboard/CaseStatusChart';
import UpcomingDeadlines from '../components/dashboard/UpcomingDeadlines';
import RecentActivity from '../components/dashboard/RecentActivity';
import RevenueChart from '../components/dashboard/RevenueChart';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Dashboard" 
        description="Monitor your caseload and performance"
        actions={[
          { label: 'New Case', onClick: () => console.log('New case') },
          { label: 'Generate Report', onClick: () => console.log('Generate report') }
        ]}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Active Cases" 
          value="28" 
          icon={<Scale className="h-8 w-8 text-blue-500" />}
          trend="up"
          trendValue="12%"
        />
        <StatCard 
          title="Pending Documents" 
          value="17" 
          icon={<FileText className="h-8 w-8 text-amber-500" />}
          trend="down"
          trendValue="3%"
        />
        <StatCard 
          title="Client Communications" 
          value="53" 
          icon={<Users className="h-8 w-8 text-purple-500" />}
          trend="up"
          trendValue="24%"
        />
        <StatCard 
          title="Monthly Revenue" 
          value="£24,500" 
          icon={<DollarSign className="h-8 w-8 text-green-500" />}
          trend="up"
          trendValue="8%"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Case Status Overview</h2>
          <CaseStatusChart />
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Revenue Trend</h2>
          <RevenueChart />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900">Upcoming Deadlines</h2>
            <Calendar className="h-5 w-5 text-gray-400" />
          </div>
          <UpcomingDeadlines />
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
            <Clock className="h-5 w-5 text-gray-400" />
          </div>
          <RecentActivity />
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: 'up' | 'down';
  trendValue: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend, trendValue }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-1 text-3xl font-semibold text-gray-900">{value}</p>
        </div>
        <div className="rounded-full bg-blue-50 p-3 flex items-center justify-center">
          {icon}
        </div>
      </div>
      <div className={`mt-4 flex items-center text-sm ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
        <ArrowUpRight className={`h-4 w-4 mr-1 ${trend === 'down' ? 'transform rotate-90' : ''}`} />
        <span>{trendValue} from last month</span>
      </div>
    </div>
  );
};

export default Dashboard;