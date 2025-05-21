import React, { useState } from 'react';
import PageHeader from '../components/common/PageHeader';
import { 
  BarChart3, 
  TrendingUp, 
  Timer,
  DollarSign,
  Folder,
  Users,
  Scale,
  ArrowUpRight,
  Clock, 
  Calendar,
  Download
} from 'lucide-react';

const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'month' | 'quarter' | 'year'>('month');
  
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Analytics" 
        description="Track metrics and performance across your legal practice"
        actions={[
          { 
            label: 'Export Report', 
            onClick: () => console.log('Export report'), 
            icon: <Download className="h-4 w-4 mr-2" /> 
          }
        ]}
      />
      
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex flex-col sm:flex-row justify-between mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4 sm:mb-0">Practice Overview</h2>
          
          <div className="flex border border-gray-300 rounded-md">
            <button
              onClick={() => setTimeRange('month')}
              className={`px-4 py-2 text-sm font-medium ${
                timeRange === 'month' 
                  ? 'bg-blue-100 text-blue-700 border-blue-500' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setTimeRange('quarter')}
              className={`px-4 py-2 text-sm font-medium ${
                timeRange === 'quarter' 
                  ? 'bg-blue-100 text-blue-700 border-blue-500' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Quarter
            </button>
            <button
              onClick={() => setTimeRange('year')}
              className={`px-4 py-2 text-sm font-medium ${
                timeRange === 'year' 
                  ? 'bg-blue-100 text-blue-700 border-blue-500' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Year
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard 
            title="Revenue" 
            value={timeRange === 'month' ? '£24,500' : timeRange === 'quarter' ? '£72,800' : '£285,000'} 
            trend="up"
            trendValue="12%"
            icon={<DollarSign className="h-8 w-8 text-green-500" />}
          />
          <MetricCard 
            title="Active Cases" 
            value={timeRange === 'month' ? '28' : timeRange === 'quarter' ? '42' : '105'} 
            trend="up"
            trendValue="8%"
            icon={<Folder className="h-8 w-8 text-blue-500" />}
          />
          <MetricCard 
            title="Billable Hours" 
            value={timeRange === 'month' ? '320' : timeRange === 'quarter' ? '950' : '3,800'} 
            trend="down"
            trendValue="3%"
            icon={<Clock className="h-8 w-8 text-purple-500" />}
          />
          <MetricCard 
            title="New Clients" 
            value={timeRange === 'month' ? '5' : timeRange === 'quarter' ? '12' : '38'} 
            trend="up"
            trendValue="15%"
            icon={<Users className="h-8 w-8 text-amber-500" />}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900">Case Type Distribution</h3>
            <BarChart3 className="h-5 w-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Personal Injury</span>
                <span className="text-sm text-gray-500">32%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '32%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Corporate</span>
                <span className="text-sm text-gray-500">28%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '28%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Estate</span>
                <span className="text-sm text-gray-500">18%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '18%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Family Law</span>
                <span className="text-sm text-gray-500">12%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '12%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Other</span>
                <span className="text-sm text-gray-500">10%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '10%' }}></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900">Case Resolution</h3>
            <TrendingUp className="h-5 w-5 text-gray-400" />
          </div>
          
          <div className="flex justify-around h-48 items-end px-4">
            <div className="flex flex-col items-center">
              <div className="w-16 bg-green-500 rounded-t" style={{ height: '120px' }}></div>
              <p className="mt-2 text-sm font-medium">Settlement</p>
              <p className="text-gray-500 text-xs">65%</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 bg-blue-500 rounded-t" style={{ height: '40px' }}></div>
              <p className="mt-2 text-sm font-medium">Trial</p>
              <p className="text-gray-500 text-xs">15%</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 bg-purple-500 rounded-t" style={{ height: '20px' }}></div>
              <p className="mt-2 text-sm font-medium">Dismissed</p>
              <p className="text-gray-500 text-xs">10%</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 bg-amber-500 rounded-t" style={{ height: '20px' }}></div>
              <p className="mt-2 text-sm font-medium">Other</p>
              <p className="text-gray-500 text-xs">10%</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900">Time Utilization</h3>
            <Timer className="h-5 w-5 text-gray-400" />
          </div>
          
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                  Billable Time
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-blue-600">
                  70%
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
              <div style={{ width: '70%' }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"></div>
            </div>
          </div>
          
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-orange-600 bg-orange-200">
                  Administrative
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-orange-600">
                  20%
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-orange-200">
              <div style={{ width: '20%' }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-orange-500"></div>
            </div>
          </div>
          
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
                  Research
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-green-600">
                  10%
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
              <div style={{ width: '10%' }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"></div>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <div className="inline-flex items-center">
              <TrendingUp className="h-5 w-5 text-green-500 mr-1" />
              <span className="text-sm text-gray-700">Billable utilization up 5% from last period</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900">Top Performing Case Types</h3>
            <Scale className="h-5 w-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Scale className="h-5 w-5 text-blue-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Personal Injury</p>
                  <p className="text-xs text-gray-500">28 active cases</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">£12,500</p>
                <p className="text-xs text-green-600">+15% revenue</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-green-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Corporate</p>
                  <p className="text-xs text-gray-500">15 active cases</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">£9,800</p>
                <p className="text-xs text-green-600">+12% revenue</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Family Law</p>
                  <p className="text-xs text-gray-500">12 active cases</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">£7,200</p>
                <p className="text-xs text-green-600">+8% revenue</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface MetricCardProps {
  title: string;
  value: string;
  trend: 'up' | 'down';
  trendValue: string;
  icon: React.ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, trend, trendValue, icon }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
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
        <span>{trendValue} from last period</span>
      </div>
    </div>
  );
};

export default Analytics;