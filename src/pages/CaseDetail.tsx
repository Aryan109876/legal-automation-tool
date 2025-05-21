import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ChevronLeft, 
  Edit, 
  Trash2,
  Users, 
  FileText, 
  Calendar, 
  Clock,
  MessageSquare,
  AlertCircle,
  ClipboardList,
  Paperclip,
  Plus,
  MoreHorizontal,
  Scale
} from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import Timeline from '../components/cases/Timeline';
import DocumentsList from '../components/documents/DocumentsList';
import { useCaseDetail } from '../hooks/useCaseDetail';
import { CaseStatus, CasePriority } from '../types/case';

const CaseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { caseDetail, isLoading, error } = useCaseDetail(id);
  const [activeTab, setActiveTab] = useState('overview');
  
  if (isLoading) {
    return <div className="flex items-center justify-center h-full">Loading case details...</div>;
  }
  
  if (error || !caseDetail) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <h2 className="text-xl font-medium text-gray-900 mb-2">Error Loading Case</h2>
        <p className="text-gray-500 mb-4">The case details could not be loaded.</p>
        <button 
          onClick={() => navigate('/cases')}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Back to Cases
        </button>
      </div>
    );
  }
  
  const getStatusColor = (status: CaseStatus) => {
    const statusColors = {
      open: "bg-green-100 text-green-800 border-green-200",
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      closed: "bg-gray-100 text-gray-800 border-gray-200"
    };
    
    return statusColors[status];
  };
  
  const getPriorityColor = (priority: CasePriority) => {
    const priorityColors = {
      high: "bg-red-100 text-red-800 border-red-200",
      medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
      low: "bg-blue-100 text-blue-800 border-blue-200"
    };
    
    return priorityColors[priority];
  };
  
  return (
    <div>
      <div className="mb-6">
        <button 
          onClick={() => navigate('/cases')}
          className="inline-flex items-center px-3 py-1.5 text-sm text-gray-500 hover:text-gray-700"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Cases
        </button>
      </div>
      
      <PageHeader 
        title={caseDetail.title}
        description={`Case #${caseDetail.caseNumber}`}
        actions={[
          { label: 'Edit Case', onClick: () => console.log('Edit case'), icon: <Edit className="h-4 w-4 mr-2" /> },
          { label: 'Delete', onClick: () => console.log('Delete case'), icon: <Trash2 className="h-4 w-4 mr-2" /> }
        ]}
      />
      
      <div className="bg-white rounded-lg shadow-sm mb-6">
        <div className="flex flex-col md:flex-row md:items-center p-6 border-b border-gray-200">
          <div className="flex-1 mb-4 md:mb-0">
            <div className="flex flex-wrap gap-3">
              <div className={`px-3 py-1 rounded-full text-sm border ${getStatusColor(caseDetail.status)}`}>
                Status: {caseDetail.status.charAt(0).toUpperCase() + caseDetail.status.slice(1)}
              </div>
              <div className={`px-3 py-1 rounded-full text-sm border ${getPriorityColor(caseDetail.priority)}`}>
                Priority: {caseDetail.priority.charAt(0).toUpperCase() + caseDetail.priority.slice(1)}
              </div>
              <div className="px-3 py-1 rounded-full text-sm border bg-blue-50 text-blue-700 border-blue-100">
                Type: {caseDetail.type}
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-gray-400 mr-2" />
              <div>
                <p className="text-xs text-gray-500">Filing Date</p>
                <p className="text-sm font-medium">{new Date(caseDetail.filingDate).toLocaleDateString()}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-gray-400 mr-2" />
              <div>
                <p className="text-xs text-gray-500">Due Date</p>
                <p className="text-sm font-medium">{new Date(caseDetail.dueDate).toLocaleDateString()}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Scale className="h-5 w-5 text-gray-400 mr-2" />
              <div>
                <p className="text-xs text-gray-500">Court</p>
                <p className="text-sm font-medium">{caseDetail.court}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px overflow-x-auto">
            {['overview', 'documents', 'timeline', 'tasks', 'notes'].map((tab) => (
              <button
                key={tab}
                className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>
        
        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Case Summary</h3>
                  <p className="text-gray-600">{caseDetail.description}</p>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
                    <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
                  </div>
                  <Timeline activities={caseDetail.activities.slice(0, 3)} />
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-medium text-gray-900">Key Documents</h3>
                    <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
                  </div>
                  <DocumentsList documents={caseDetail.documents.slice(0, 3)} />
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-md font-medium text-gray-900 mb-3 flex items-center">
                    <Users className="h-5 w-5 mr-2 text-gray-500" />
                    Client Information
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Client</p>
                      <Link to={`/clients/${caseDetail.client.id}`} className="text-blue-600 hover:text-blue-800">
                        {caseDetail.client.name}
                      </Link>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Contact</p>
                      <p>{caseDetail.client.email}</p>
                      <p>{caseDetail.client.phone}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-md font-medium text-gray-900 mb-3 flex items-center">
                    <Users className="h-5 w-5 mr-2 text-gray-500" />
                    Team Members
                  </h3>
                  <div className="space-y-2">
                    {caseDetail.team.map((member) => (
                      <div key={member.id} className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 mr-3">
                          {member.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{member.name}</p>
                          <p className="text-xs text-gray-500">{member.role}</p>
                        </div>
                      </div>
                    ))}
                    <button className="flex items-center mt-2 text-sm text-blue-600">
                      <Plus className="h-4 w-4 mr-1" />
                      Add Team Member
                    </button>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-md font-medium text-gray-900 mb-3 flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-gray-500" />
                    Upcoming Deadlines
                  </h3>
                  <div className="space-y-3">
                    {caseDetail.deadlines.slice(0, 3).map((deadline, index) => (
                      <div key={index} className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center text-red-600 mt-0.5 mr-3 flex-shrink-0">
                          <AlertCircle className="h-3 w-3" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{deadline.title}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(deadline.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'documents' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Case Documents</h3>
                <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Document
                </button>
              </div>
              <DocumentsList documents={caseDetail.documents} />
            </div>
          )}
          
          {activeTab === 'timeline' && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Case Timeline</h3>
              <Timeline activities={caseDetail.activities} />
            </div>
          )}
          
          {activeTab === 'tasks' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Case Tasks</h3>
                <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Task
                </button>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Upcoming Tasks</h4>
                {caseDetail.tasks.filter(task => !task.completed).length === 0 ? (
                  <p className="text-sm text-gray-500">No upcoming tasks</p>
                ) : (
                  <div className="space-y-2">
                    {caseDetail.tasks
                      .filter(task => !task.completed)
                      .map((task) => (
                        <div key={task.id} className="flex items-start p-2 hover:bg-gray-100 rounded-md">
                          <input
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1 mr-3"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium">{task.title}</p>
                              <div className="flex items-center">
                                <span className="text-xs text-gray-500 mr-2">
                                  {new Date(task.dueDate).toLocaleDateString()}
                                </span>
                                <MoreHorizontal className="h-4 w-4 text-gray-400" />
                              </div>
                            </div>
                            <p className="text-xs text-gray-500">{task.description}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Completed Tasks</h4>
                {caseDetail.tasks.filter(task => task.completed).length === 0 ? (
                  <p className="text-sm text-gray-500">No completed tasks</p>
                ) : (
                  <div className="space-y-2">
                    {caseDetail.tasks
                      .filter(task => task.completed)
                      .map((task) => (
                        <div key={task.id} className="flex items-start p-2 hover:bg-gray-100 rounded-md">
                          <input
                            type="checkbox"
                            checked
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1 mr-3"
                            readOnly
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium line-through text-gray-500">{task.title}</p>
                              <span className="text-xs text-gray-500">
                                Completed on {new Date(task.completedDate!).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-xs text-gray-500 line-through">{task.description}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          )}
          
          {activeTab === 'notes' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Case Notes</h3>
                <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Note
                </button>
              </div>
              
              {caseDetail.notes.length === 0 ? (
                <div className="text-center py-6">
                  <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No notes yet</h3>
                  <p className="text-gray-500 mb-4">Add case notes to keep track of important information</p>
                  <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <Plus className="h-4 w-4 mr-2" />
                    Add First Note
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {caseDetail.notes.map((note) => (
                    <div key={note.id} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 mr-3">
                            {note.author.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-sm font-medium">{note.author}</p>
                            <p className="text-xs text-gray-500">
                              {new Date(note.timestamp).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <MoreHorizontal className="h-5 w-5 text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{note.content}</p>
                      {note.attachments && note.attachments.length > 0 && (
                        <div className="border-t border-gray-200 pt-3 mt-3">
                          <p className="text-xs font-medium text-gray-500 mb-2">Attachments</p>
                          <div className="space-y-2">
                            {note.attachments.map((attachment, index) => (
                              <div key={index} className="flex items-center text-sm">
                                <Paperclip className="h-4 w-4 text-gray-400 mr-2" />
                                <a href="#" className="text-blue-600 hover:text-blue-800">{attachment}</a>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CaseDetail;