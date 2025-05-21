import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FolderOpen, 
  File, 
  Users, 
  Calendar, 
  BarChart3, 
  Settings,
  Scale,
  X
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  collapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const { user } = useAuth();
  
  const navItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard className="h-5 w-5" /> },
    { name: 'Cases', path: '/cases', icon: <Scale className="h-5 w-5" /> },
    { name: 'Documents', path: '/documents', icon: <File className="h-5 w-5" /> },
    { name: 'Clients', path: '/clients', icon: <Users className="h-5 w-5" /> },
    { name: 'Calendar', path: '/calendar', icon: <Calendar className="h-5 w-5" /> },
    { name: 'Analytics', path: '/analytics', icon: <BarChart3 className="h-5 w-5" /> },
    { name: 'Settings', path: '/settings', icon: <Settings className="h-5 w-5" /> }
  ];
  
  return (
    <div className={`bg-[#1A365D] text-white flex flex-col transition-all duration-300 ease-in-out ${collapsed ? 'w-16' : 'w-64'}`}>
      <div className="h-16 flex items-center px-4 border-b border-blue-800">
        {!collapsed && (
          <div className="flex items-center">
            <Scale className="h-8 w-8 text-white mr-2" />
            <span className="font-bold text-lg">LegalFlow</span>
          </div>
        )}
        {collapsed && <Scale className="h-8 w-8 text-white mx-auto" />}
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-2 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `${isActive 
                  ? 'bg-blue-800 text-white' 
                  : 'text-blue-100 hover:bg-blue-700'} 
                group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-150 ease-in-out`
              }
            >
              <div className={`${collapsed ? 'mx-auto' : 'mr-3'}`}>
                {item.icon}
              </div>
              {!collapsed && <span>{item.name}</span>}
            </NavLink>
          ))}
        </nav>
      </div>
      
      {!collapsed && (
        <div className="p-4 border-t border-blue-800">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-blue-700 flex items-center justify-center text-white">
              {user?.name.charAt(0).toUpperCase()}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">{user?.name}</p>
              <p className="text-xs text-blue-300">{user?.role}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;