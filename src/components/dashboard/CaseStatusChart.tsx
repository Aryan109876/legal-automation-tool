import React from 'react';

const CaseStatusChart: React.FC = () => {
  // Placeholder for visualization - in a real app, you'd use a library like Chart.js or Recharts
  return (
    <div className="flex justify-around h-64 items-end px-4">
      <div className="flex flex-col items-center">
        <div className="w-16 bg-green-500 rounded-t" style={{ height: '150px' }}></div>
        <p className="mt-2 text-sm font-medium">Open</p>
        <p className="text-gray-500 text-xs">28</p>
      </div>
      <div className="flex flex-col items-center">
        <div className="w-16 bg-yellow-500 rounded-t" style={{ height: '80px' }}></div>
        <p className="mt-2 text-sm font-medium">Pending</p>
        <p className="text-gray-500 text-xs">15</p>
      </div>
      <div className="flex flex-col items-center">
        <div className="w-16 bg-blue-500 rounded-t" style={{ height: '120px' }}></div>
        <p className="mt-2 text-sm font-medium">In Review</p>
        <p className="text-gray-500 text-xs">22</p>
      </div>
      <div className="flex flex-col items-center">
        <div className="w-16 bg-gray-500 rounded-t" style={{ height: '60px' }}></div>
        <p className="mt-2 text-sm font-medium">Closed</p>
        <p className="text-gray-500 text-xs">10</p>
      </div>
    </div>
  );
};

export default CaseStatusChart;