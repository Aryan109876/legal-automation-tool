import React from 'react';

const RevenueChart: React.FC = () => {
  // Placeholder for visualization - in a real app, you'd use a chart library
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const values = [15000, 21000, 18000, 25000, 22000, 24500];
  
  const maxValue = Math.max(...values);
  
  return (
    <div className="h-64">
      <div className="flex h-full items-end">
        {months.map((month, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div 
              className="w-full mx-1 bg-blue-500 rounded-t transition-all duration-500 ease-in-out hover:bg-blue-600" 
              style={{ 
                height: `${(values[index] / maxValue) * 80}%`,
                maxWidth: '40px',
                margin: '0 auto'
              }}
            ></div>
            <p className="mt-2 text-xs font-medium">{month}</p>
            <p className="text-xs text-gray-500">£{(values[index] / 1000).toFixed(1)}k</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RevenueChart;