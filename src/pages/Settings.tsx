import React, { useState } from 'react';
import PageHeader from '../components/common/PageHeader';
import { 
  User,
  Bell,
  Key,
  Globe,
  Briefcase,
  Users,
  UserPlus,
  Mail,
  CheckCircle,
  Shield,
  Save
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Settings: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  
  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User className="h-5 w-5" /> },
    { id: 'security', label: 'Security', icon: <Shield className="h-5 w-5" /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="h-5 w-5" /> },
    { id: 'team', label: 'Team Members', icon: <Users className="h-5 w-5" /> },
    { id: 'firm', label: 'Firm Settings', icon: <Briefcase className="h-5 w-5" /> },
  ];
  
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Settings" 
        description="Manage your account, preferences, and firm settings"
      />
      
      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b border-gray-200">
          <nav className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm flex items-center ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
        
        <div className="p-6">
          {activeTab === 'profile' && (
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900 mb-6">Profile Information</h3>
                
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-64 flex flex-col items-center mb-6 md:mb-0">
                    <div className="h-32 w-32 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-4xl mb-4">
                      {user?.name.charAt(0)}
                    </div>
                    <button className="mt-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      Change Photo
                    </button>
                  </div>
                  
                  <div className="flex-1">
                    <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                      <div className="sm:col-span-3">
                        <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                          First name
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="first-name"
                            id="first-name"
                            defaultValue={user?.name.split(' ')[0]}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                          Last name
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="last-name"
                            id="last-name"
                            defaultValue={user?.name.split(' ')[1]}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                          Email address
                        </label>
                        <div className="mt-1">
                          <input
                            id="email"
                            name="email"
                            type="email"
                            defaultValue={user?.email}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                          Role
                        </label>
                        <div className="mt-1">
                          <select
                            id="role"
                            name="role"
                            defaultValue={user?.role}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          >
                            <option>Lawyer</option>
                            <option>Paralegal</option>
                            <option>Admin</option>
                            <option>Partner</option>
                          </select>
                        </div>
                      </div>

                      <div className="sm:col-span-6">
                        <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                          About
                        </label>
                        <div className="mt-1">
                          <textarea
                            id="about"
                            name="about"
                            rows={4}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            placeholder="Brief description for your profile"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-5 border-t border-gray-200">
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'security' && (
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900 mb-6">Security Settings</h3>
                
                <div className="space-y-6">
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <Key className="h-6 w-6 text-blue-500" />
                      </div>
                      <div className="ml-3 flex-1">
                        <h4 className="text-md font-medium text-gray-900">Change Password</h4>
                        <p className="mt-1 text-sm text-gray-500">Update your password regularly to maintain account security.</p>
                        
                        <div className="mt-4 space-y-4">
                          <div>
                            <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">
                              Current Password
                            </label>
                            <div className="mt-1">
                              <input
                                type="password"
                                name="current-password"
                                id="current-password"
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
                              New Password
                            </label>
                            <div className="mt-1">
                              <input
                                type="password"
                                name="new-password"
                                id="new-password"
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                              Confirm New Password
                            </label>
                            <div className="mt-1">
                              <input
                                type="password"
                                name="confirm-password"
                                id="confirm-password"
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              />
                            </div>
                          </div>
                          
                          <div className="pt-2">
                            <button
                              type="button"
                              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                              Update Password
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <Shield className="h-6 w-6 text-blue-500" />
                      </div>
                      <div className="ml-3 flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-md font-medium text-gray-900">Two-Factor Authentication</h4>
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            Not Enabled
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">Add an extra layer of security to your account by requiring both your password and a verification code.</p>
                        
                        <div className="mt-4">
                          <button
                            type="button"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Set Up Two-Factor
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <Globe className="h-6 w-6 text-blue-500" />
                      </div>
                      <div className="ml-3 flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-md font-medium text-gray-900">Active Sessions</h4>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">Manage your active sessions across different devices.</p>
                        
                        <div className="mt-4 space-y-3">
                          <div className="border border-gray-200 rounded-md p-3">
                            <div className="flex justify-between">
                              <div>
                                <p className="text-sm font-medium text-gray-900">Current Session</p>
                                <p className="text-xs text-gray-500">Windows • Chrome • London, UK</p>
                                <p className="text-xs text-gray-500">IP: 24.45.67.89</p>
                              </div>
                              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 h-fit">
                                Active Now
                              </span>
                            </div>
                          </div>
                          
                          <div className="border border-gray-200 rounded-md p-3">
                            <div className="flex justify-between">
                              <div>
                                <p className="text-sm font-medium text-gray-900">iPhone 13</p>
                                <p className="text-xs text-gray-500">iOS • Safari • London, UK</p>
                                <p className="text-xs text-gray-500">Last active: 2 hours ago</p>
                              </div>
                              <button className="text-xs text-red-600 hover:text-red-800">
                                End Session
                              </button>
                            </div>
                          </div>
                          
                          <button className="text-sm text-blue-600 hover:text-blue-800">
                            Log Out Of All Sessions
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'notifications' && (
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900 mb-6">Notification Settings</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-md font-medium text-gray-900 mb-4">Case Updates</h4>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="case-activity"
                            name="case-activity"
                            type="checkbox"
                            defaultChecked
                            className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="case-activity" className="font-medium text-gray-700">Case Activity</label>
                          <p className="text-gray-500">Get notified when there is new activity on your cases</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="case-assigned"
                            name="case-assigned"
                            type="checkbox"
                            defaultChecked
                            className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="case-assigned" className="font-medium text-gray-700">Case Assignment</label>
                          <p className="text-gray-500">Get notified when you are assigned to a new case</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="status-changes"
                            name="status-changes"
                            type="checkbox"
                            defaultChecked
                            className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="status-changes" className="font-medium text-gray-700">Status Changes</label>
                          <p className="text-gray-500">Get notified when a case status changes</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-gray-200">
                    <h4 className="text-md font-medium text-gray-900 mb-4">Document Notifications</h4>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="new-documents"
                            name="new-documents"
                            type="checkbox"
                            defaultChecked
                            className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="new-documents" className="font-medium text-gray-700">New Documents</label>
                          <p className="text-gray-500">Get notified when new documents are added to your cases</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="document-updates"
                            name="document-updates"
                            type="checkbox"
                            className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="document-updates" className="font-medium text-gray-700">Document Updates</label>
                          <p className="text-gray-500">Get notified when documents are modified</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-gray-200">
                    <h4 className="text-md font-medium text-gray-900 mb-4">Deadline Reminders</h4>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="reminder-day-before"
                            name="reminder-day-before"
                            type="checkbox"
                            defaultChecked
                            className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="reminder-day-before" className="font-medium text-gray-700">1 Day Before</label>
                          <p className="text-gray-500">Get reminded 1 day before deadline</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="reminder-week-before"
                            name="reminder-week-before"
                            type="checkbox"
                            defaultChecked
                            className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="reminder-week-before" className="font-medium text-gray-700">1 Week Before</label>
                          <p className="text-gray-500">Get reminded 1 week before deadline</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-gray-200">
                    <h4 className="text-md font-medium text-gray-900 mb-4">Notification Methods</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Mail className="h-5 w-5 text-gray-400 mr-3" />
                          <span className="text-sm text-gray-700">Email Notifications</span>
                        </div>
                        <div>
                          <label className="inline-flex relative items-center cursor-pointer">
                            <input type="checkbox" checked className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Bell className="h-5 w-5 text-gray-400 mr-3" />
                          <span className="text-sm text-gray-700">Browser Notifications</span>
                        </div>
                        <div>
                          <label className="inline-flex relative items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-5 mt-6 border-t border-gray-200">
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Reset to Defaults
                    </button>
                    <button
                      type="submit"
                      className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'team' && (
            <div className="space-y-8">
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Team Members</h3>
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add Member
                  </button>
                </div>
                
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                          Name
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Role
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Email
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Status
                        </th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      <tr>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          Sarah Johnson
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">Lead Attorney</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">sjohnson@legalflow.com</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Active
                          </span>
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <a href="#" className="text-blue-600 hover:text-blue-900">
                            Edit
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          Michael Wong
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">Associate</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">mwong@legalflow.com</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Active
                          </span>
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <a href="#" className="text-blue-600 hover:text-blue-900">
                            Edit
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          Lisa Chen
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">Paralegal</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">lchen@legalflow.com</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Active
                          </span>
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <a href="#" className="text-blue-600 hover:text-blue-900">
                            Edit
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          David Miller
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">Lead Attorney</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">dmiller@legalflow.com</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Active
                          </span>
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <a href="#" className="text-blue-600 hover:text-blue-900">
                            Edit
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'firm' && (
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900 mb-6">Firm Settings</h3>
                
                <div className="space-y-6">
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="text-md font-medium text-gray-900 mb-4">Firm Information</h4>
                    <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                      <div className="sm:col-span-3">
                        <label htmlFor="firm-name" className="block text-sm font-medium text-gray-700">
                          Firm Name
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="firm-name"
                            id="firm-name"
                            defaultValue="LegalFlow Associates"
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                      
                      <div className="sm:col-span-3">
                        <label htmlFor="business-type" className="block text-sm font-medium text-gray-700">
                          Business Type
                        </label>
                        <div className="mt-1">
                          <select
                            id="business-type"
                            name="business-type"
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          >
                            <option>Solo Practice</option>
                            <option>Partnership</option>
                            <option>Limited Liability Partnership</option>
                            <option>Professional Corporation</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="sm:col-span-6">
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                          Address
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="address"
                            id="address"
                            defaultValue="123 Legal Street, London, UK"
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                      
                      <div className="sm:col-span-3">
                        <label htmlFor="firm-email" className="block text-sm font-medium text-gray-700">
                          Firm Email
                        </label>
                        <div className="mt-1">
                          <input
                            type="email"
                            name="firm-email"
                            id="firm-email"
                            defaultValue="info@legalflow.com"
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                      
                      <div className="sm:col-span-3">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                          Phone Number
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="phone"
                            id="phone"
                            defaultValue="+44 20 1234 5678"
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="text-md font-medium text-gray-900 mb-4">Billing Settings</h4>
                    <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                      <div className="sm:col-span-3">
                        <label htmlFor="default-rate" className="block text-sm font-medium text-gray-700">
                          Default Hourly Rate
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">£</span>
                          </div>
                          <input
                            type="text"
                            name="default-rate"
                            id="default-rate"
                            defaultValue="250.00"
                            className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                          />
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">GBP / hr</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="sm:col-span-3">
                        <label htmlFor="billing-increment" className="block text-sm font-medium text-gray-700">
                          Billing Increment
                        </label>
                        <div className="mt-1">
                          <select
                            id="billing-increment"
                            name="billing-increment"
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          >
                            <option>6 minutes (0.1 hour)</option>
                            <option>15 minutes (0.25 hour)</option>
                            <option>30 minutes (0.5 hour)</option>
                            <option>60 minutes (1 hour)</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="sm:col-span-6">
                        <label htmlFor="invoice-prefix" className="block text-sm font-medium text-gray-700">
                          Invoice Number Prefix
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="invoice-prefix"
                            id="invoice-prefix"
                            defaultValue="LF-INV-"
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-5 mt-6 border-t border-gray-200">
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="ml-3 inline-flex justify-center items-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Settings
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;