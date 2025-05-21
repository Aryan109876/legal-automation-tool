import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ChevronLeft, 
  User,
  Building,
  Mail,
  Phone,
  MapPin,
  Edit,
  FileText,
  Clock,
  DollarSign,
  UserPlus,
  MessageSquare,
  Calendar,
  Scale,
  Plus,
  Download
} from 'lucide-react';
import PageHeader from '../components/common/PageHeader';

const ClientDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock client data - In a real app, you would fetch this from an API
  const client = {
    id: '101',
    name: 'James Smith',
    email: 'jsmith@example.com',
    phone: '(555) 123-4567',
    type: 'individual',
    address: '123 Main St, San Francisco, CA',
    relationshipManager: 'Sarah Johnson',
    joinDate: '2024-12-15',
    billingInfo: {
      billingAddress: '123 Main St, San Francisco, CA',
      billingContact: 'James Smith',
      paymentMethod: 'Credit Card (ending in 4567)',
      defaultRate: '$250 per hour'
    },
    cases: [
      {
        id: '1',
        caseNumber: 'CV-2023-0124',
        title: 'Smith v. Johnson',
        status: 'open',
        type: 'Personal Injury',
        startDate: '2025-01-15',
        attorney: 'Sarah Johnson'
      }
    ],
    documents: [
      {
        id: '402',
        title: 'Medical Records',
        type: 'Evidence',
        caseNumber: 'CV-2023-0124',
        uploadDate: '2025-06-05T14:30:00Z'
      },
      {
        id: '403',
        title: 'Accident Report',
        type: 'Evidence',
        caseNumber: 'CV-2023-0124',
        uploadDate: '2025-01-20T11:15:00Z'
      },
      {
        id: '401',
        title: 'Complaint',
        type: 'Pleading',
        caseNumber: 'CV-2023-0124',
        uploadDate: '2025-01-15T10:30:00Z'
      }
    ],
    notes: [
      {
        id: '1',
        author: 'Sarah Johnson',
        content: 'Initial consultation with client. Discussed case details and potential strategies.',
        timestamp: '2025-01-10T11:30:00Z'
      },
      {
        id: '2',
        author: 'Michael Wong',
        content: 'Follow-up call regarding document collection. Client will provide additional medical records next week.',
        timestamp: '2025-01-20T15:45:00Z'
      }
    ],
    meetings: [
      {
        id: '1',
        title: 'Initial Consultation',
        date: '2025-01-10T10:00:00Z',
        duration: 60,
        location: 'Office - Conference Room A',
        attendees: ['Sarah Johnson', 'James Smith']
      },
      {
        id: '2',
        title: 'Deposition Preparation',
        date: '2025-06-18T14:00:00Z',
        duration: 120,
        location: 'Office - Conference Room B',
        attendees: ['Sarah Johnson', 'Michael Wong', 'James Smith']
      }
    ],
    invoices: [
      {
        id: '1001',
        number: 'INV-2025-0124',
        issueDate: '2025-02-01',
        dueDate: '2025-02-15',
        amount: 2500.00,
        status: 'paid',
        paidDate: '2025-02-10'
      },
      {
        id: '1002',
        number: 'INV-2025-0203',
        issueDate: '2025-03-01',
        dueDate: '2025-03-15',
        amount: 1800.00,
        status: 'pending'
      }
    ]
  };
  
  if (!client) {
    return <div>Client not found</div>;
  }
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };
  
  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(amount);
  };
  
  return (
    <div>
      <div className="mb-6">
        <button 
          onClick={() => navigate('/clients')}
          className="inline-flex items-center px-3 py-1.5 text-sm text-gray-500 hover:text-gray-700"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Clients
        </button>
      </div>
      
      <PageHeader 
        title={client.name}
        description={client.type === 'individual' ? 'Individual Client' : client.type}
        actions={[
          { label: 'Edit Client', onClick: () => console.log('Edit client'), icon: <Edit className="h-4 w-4 mr-2" /> },
          { label: 'New Case', onClick: () => console.log('New case'), icon: <Plus className="h-4 w-4 mr-2" /> }
        ]}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-6 md:col-span-2">
          <div className="flex items-center mb-6">
            <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 mr-4">
              {client.type === 'individual' ? (
                <User className="h-8 w-8" />
              ) : (
                <Building className="h-8 w-8" />
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{client.name}</h2>
              <p className="text-gray-500">Client since {formatDate(client.joinDate)}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-md font-medium text-gray-900 mb-3">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-sm font-medium">{client.email}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="text-sm font-medium">{client.phone}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="text-sm font-medium">{client.address}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-md font-medium text-gray-900 mb-3">Relationship Details</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <User className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Relationship Manager</p>
                    <p className="text-sm font-medium">{client.relationshipManager}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Scale className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Active Cases</p>
                    <p className="text-sm font-medium">{client.cases.filter(c => c.status === 'open').length}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <DollarSign className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Default Rate</p>
                    <p className="text-sm font-medium">{client.billingInfo.defaultRate}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-md font-medium text-gray-900 mb-3">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-md hover:bg-gray-50 text-left">
              <div className="flex items-center">
                <Scale className="h-5 w-5 text-gray-400 mr-3" />
                <span className="text-sm font-medium text-gray-700">Create New Case</span>
              </div>
              <ChevronLeft className="h-4 w-4 text-gray-400 transform rotate-270" />
            </button>
            
            <button className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-md hover:bg-gray-50 text-left">
              <div className="flex items-center">
                <FileText className="h-5 w-5 text-gray-400 mr-3" />
                <span className="text-sm font-medium text-gray-700">Upload Document</span>
              </div>
              <ChevronLeft className="h-4 w-4 text-gray-400 transform rotate-270" />
            </button>
            
            <button className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-md hover:bg-gray-50 text-left">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                <span className="text-sm font-medium text-gray-700">Schedule Meeting</span>
              </div>
              <ChevronLeft className="h-4 w-4 text-gray-400 transform rotate-270" />
            </button>
            
            <button className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-md hover:bg-gray-50 text-left">
              <div className="flex items-center">
                <DollarSign className="h-5 w-5 text-gray-400 mr-3" />
                <span className="text-sm font-medium text-gray-700">Create Invoice</span>
              </div>
              <ChevronLeft className="h-4 w-4 text-gray-400 transform rotate-270" />
            </button>
            
            <button className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-md hover:bg-gray-50 text-left">
              <div className="flex items-center">
                <MessageSquare className="h-5 w-5 text-gray-400 mr-3" />
                <span className="text-sm font-medium text-gray-700">Add Note</span>
              </div>
              <ChevronLeft className="h-4 w-4 text-gray-400 transform rotate-270" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b border-gray-200">
          <nav className="flex overflow-x-auto">
            {['overview', 'cases', 'documents', 'billing', 'notes', 'meetings'].map((tab) => (
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Active Cases</h3>
                  <Link to="/cases" className="text-sm text-blue-600 hover:text-blue-800">View All</Link>
                </div>
                
                {client.cases.length === 0 ? (
                  <div className="text-gray-500 text-center py-4">No active cases</div>
                ) : (
                  <div className="space-y-4">
                    {client.cases.map(caseItem => (
                      <div key={caseItem.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between">
                          <div>
                            <Link 
                              to={`/cases/${caseItem.id}`}
                              className="text-md font-medium text-blue-600 hover:text-blue-800"
                            >
                              {caseItem.title}
                            </Link>
                            <p className="text-sm text-gray-500">Case #{caseItem.caseNumber}</p>
                          </div>
                          <div className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 h-fit">
                            {caseItem.status.charAt(0).toUpperCase() + caseItem.status.slice(1)}
                          </div>
                        </div>
                        <div className="mt-3 flex justify-between text-sm text-gray-500">
                          <div className="flex items-center">
                            <Scale className="h-4 w-4 mr-1" />
                            {caseItem.type}
                          </div>
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-1" />
                            {caseItem.attorney}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Recent Documents</h3>
                  <Link to="/documents" className="text-sm text-blue-600 hover:text-blue-800">View All</Link>
                </div>
                
                {client.documents.length === 0 ? (
                  <div className="text-gray-500 text-center py-4">No documents</div>
                ) : (
                  <div className="space-y-4">
                    {client.documents.slice(0, 3).map(doc => (
                      <div key={doc.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start">
                          <div className="mt-1 p-2 bg-blue-100 rounded-md">
                            <FileText className="h-5 w-5 text-blue-700" />
                          </div>
                          <div className="ml-3 flex-1">
                            <Link 
                              to={`/documents/${doc.id}`}
                              className="text-md font-medium text-gray-900 hover:text-blue-600"
                            >
                              {doc.title}
                            </Link>
                            <p className="text-sm text-gray-500">{doc.type} • Case #{doc.caseNumber}</p>
                            <p className="text-xs text-gray-500">Uploaded on {formatDate(doc.uploadDate)}</p>
                          </div>
                          <button className="text-blue-600 hover:text-blue-800">
                            <Download className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Upcoming Meetings</h3>
                  <button className="text-sm text-blue-600 hover:text-blue-800">Schedule</button>
                </div>
                
                {client.meetings.length === 0 ? (
                  <div className="text-gray-500 text-center py-4">No upcoming meetings</div>
                ) : (
                  <div className="space-y-4">
                    {client.meetings
                      .filter(meeting => new Date(meeting.date) > new Date())
                      .slice(0, 2)
                      .map(meeting => (
                        <div key={meeting.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-start">
                            <div className="mt-1 h-12 w-12 bg-blue-100 rounded-md flex flex-col items-center justify-center">
                              <span className="text-xs font-medium text-blue-700">
                                {new Date(meeting.date).toLocaleDateString('en-GB', { day: '2-digit' })}
                              </span>
                              <span className="text-xs font-medium text-blue-700">
                                {new Date(meeting.date).toLocaleDateString('en-GB', { month: 'short' })}
                              </span>
                            </div>
                            <div className="ml-3 flex-1">
                              <p className="text-md font-medium text-gray-900">{meeting.title}</p>
                              <div className="flex items-center text-sm text-gray-500">
                                <Clock className="h-4 w-4 mr-1" />
                                <span>
                                  {new Date(meeting.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                                <span className="mx-1">•</span>
                                <span>{meeting.duration} min</span>
                              </div>
                              <p className="text-sm text-gray-500 mt-1">{meeting.location}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Billing Overview</h3>
                  <Link to="#billing" className="text-sm text-blue-600 hover:text-blue-800" onClick={() => setActiveTab('billing')}>View All</Link>
                </div>
                
                <div className="border border-gray-200 rounded-lg divide-y">
                  <div className="p-4">
                    <div className="flex justify-between mb-2">
                      <p className="text-sm text-gray-500">Outstanding Amount</p>
                      <p className="text-md font-medium text-red-600">
                        {formatCurrency(
                          client.invoices
                            .filter(inv => inv.status === 'pending')
                            .reduce((sum, inv) => sum + inv.amount, 0)
                        )}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm text-gray-500">Last Payment</p>
                      <p className="text-md font-medium text-gray-900">
                        {formatCurrency(
                          client.invoices
                            .filter(inv => inv.status === 'paid')
                            .sort((a, b) => new Date(b.paidDate!).getTime() - new Date(a.paidDate!).getTime())[0]?.amount || 0
                        )}
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <p className="text-sm font-medium text-gray-900 mb-2">Payment Method</p>
                    <p className="text-sm text-gray-500">{client.billingInfo.paymentMethod}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'cases' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-gray-900">Client Cases</h3>
                <button 
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  New Case
                </button>
              </div>
              
              {client.cases.length === 0 ? (
                <div className="text-center py-12">
                  <Scale className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Cases Yet</h3>
                  <p className="text-gray-500 mb-6 max-w-md mx-auto">This client doesn't have any cases yet. Create a new case to get started.</p>
                  <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <Plus className="h-4 w-4 mr-2" />
                    Create First Case
                  </button>
                </div>
              ) : (
                <div className="bg-white overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Case
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Attorney
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Start Date
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {client.cases.map((caseItem) => (
                        <tr key={caseItem.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                <Link to={`/cases/${caseItem.id}`} className="text-blue-600 hover:text-blue-900">
                                  {caseItem.title}
                                </Link>
                              </div>
                              <div className="text-sm text-gray-500">#{caseItem.caseNumber}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {caseItem.type}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              {caseItem.status.charAt(0).toUpperCase() + caseItem.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {caseItem.attorney}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(caseItem.startDate)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Link to={`/cases/${caseItem.id}`} className="text-blue-600 hover:text-blue-900">
                              Details
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'documents' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-gray-900">Client Documents</h3>
                <button 
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Upload Document
                </button>
              </div>
              
              {client.documents.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Documents Yet</h3>
                  <p className="text-gray-500 mb-6 max-w-md mx-auto">This client doesn't have any documents yet. Upload a document to get started.</p>
                  <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <Plus className="h-4 w-4 mr-2" />
                    Upload First Document
                  </button>
                </div>
              ) : (
                <div className="bg-white overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Document
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Case
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Upload Date
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {client.documents.map((doc) => (
                        <tr key={doc.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0">
                                <FileText className="h-5 w-5 text-blue-500" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  <Link to={`/documents/${doc.id}`} className="text-blue-600 hover:text-blue-900">
                                    {doc.title}
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {doc.type}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            #{doc.caseNumber}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(doc.uploadDate)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-3">
                              <Link to={`/documents/${doc.id}`} className="text-blue-600 hover:text-blue-900">
                                View
                              </Link>
                              <button className="text-blue-600 hover:text-blue-900">
                                Download
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'billing' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-gray-900">Billing & Invoices</h3>
                <button 
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Invoice
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h4 className="text-md font-medium text-gray-900 mb-4">Billing Information</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Billing Address</p>
                      <p className="text-sm font-medium">{client.billingInfo.billingAddress}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Billing Contact</p>
                      <p className="text-sm font-medium">{client.billingInfo.billingContact}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Payment Method</p>
                      <p className="text-sm font-medium">{client.billingInfo.paymentMethod}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Default Rate</p>
                      <p className="text-sm font-medium">{client.billingInfo.defaultRate}</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <button className="text-sm text-blue-600 hover:text-blue-800">
                      Edit Billing Information
                    </button>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h4 className="text-md font-medium text-gray-900 mb-4">Billing Summary</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <p className="text-sm text-gray-500">Outstanding Amount</p>
                      <p className="text-sm font-medium text-red-600">
                        {formatCurrency(
                          client.invoices
                            .filter(inv => inv.status === 'pending')
                            .reduce((sum, inv) => sum + inv.amount, 0)
                        )}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm text-gray-500">Total Paid (YTD)</p>
                      <p className="text-sm font-medium">
                        {formatCurrency(
                          client.invoices
                            .filter(inv => inv.status === 'paid')
                            .reduce((sum, inv) => sum + inv.amount, 0)
                        )}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm text-gray-500">Last Payment</p>
                      <p className="text-sm font-medium">
                        {client.invoices.find(inv => inv.status === 'paid') 
                          ? `${formatCurrency(
                              client.invoices
                                .filter(inv => inv.status === 'paid')
                                .sort((a, b) => new Date(b.paidDate!).getTime() - new Date(a.paidDate!).getTime())[0].amount
                            )} on ${formatDate(
                              client.invoices
                                .filter(inv => inv.status === 'paid')
                                .sort((a, b) => new Date(b.paidDate!).getTime() - new Date(a.paidDate!).getTime())[0].paidDate!
                            )}`
                          : 'No payments yet'
                        }
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <button className="text-sm text-blue-600 hover:text-blue-800">
                      View Payment History
                    </button>
                  </div>
                </div>
              </div>
              
              <h4 className="text-md font-medium text-gray-900 mb-4">Invoices</h4>
              
              {client.invoices.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <h3 className="text-md font-medium text-gray-900 mb-1">No Invoices Yet</h3>
                  <p className="text-sm text-gray-500 mb-4">This client doesn't have any invoices yet.</p>
                  <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <Plus className="h-4 w-4 mr-2" />
                    Create First Invoice
                  </button>
                </div>
              ) : (
                <div className="bg-white overflow-hidden border border-gray-200 rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Invoice Number
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Issue Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Due Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {client.invoices.map((invoice) => (
                        <tr key={invoice.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {invoice.number}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(invoice.issueDate)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(invoice.dueDate)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {formatCurrency(invoice.amount)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              invoice.status === 'paid' 
                                ? 'bg-green-100 text-green-800' 
                                : invoice.status === 'pending' 
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-red-100 text-red-800'
                            }`}>
                              {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">
                              View
                            </button>
                            <button className="text-blue-600 hover:text-blue-900">
                              Download
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'notes' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-gray-900">Client Notes</h3>
                <button 
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Note
                </button>
              </div>
              
              {client.notes.length === 0 ? (
                <div className="text-center py-12">
                  <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Notes Yet</h3>
                  <p className="text-gray-500 mb-6 max-w-md mx-auto">Add notes to keep track of important information about this client.</p>
                  <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <Plus className="h-4 w-4 mr-2" />
                    Add First Note
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {client.notes.map((note) => (
                    <div key={note.id} className="bg-white p-6 rounded-lg border border-gray-200">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 mr-3">
                            {note.author.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{note.author}</p>
                            <p className="text-xs text-gray-500">{formatDateTime(note.timestamp)}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="text-gray-400 hover:text-gray-600">
                            <Edit className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-700 whitespace-pre-line">{note.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'meetings' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-gray-900">Client Meetings</h3>
                <button 
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Schedule Meeting
                </button>
              </div>
              
              {client.meetings.length === 0 ? (
                <div className="text-center py-12">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Meetings Scheduled</h3>
                  <p className="text-gray-500 mb-6 max-w-md mx-auto">Schedule a meeting with this client to get started.</p>
                  <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <Plus className="h-4 w-4 mr-2" />
                    Schedule First Meeting
                  </button>
                </div>
              ) : (
                <div className="space-y-8">
                  <div>
                    <h4 className="text-md font-medium text-gray-900 mb-4">Upcoming Meetings</h4>
                    <div className="space-y-4">
                      {client.meetings
                        .filter(meeting => new Date(meeting.date) > new Date())
                        .map((meeting) => (
                          <div key={meeting.id} className="bg-white p-6 rounded-lg border border-gray-200">
                            <div className="flex items-start">
                              <div className="mr-4 bg-blue-100 rounded-lg p-3 text-center">
                                <p className="text-blue-700 font-medium">
                                  {new Date(meeting.date).toLocaleDateString('en-GB', { day: '2-digit' })}
                                </p>
                                <p className="text-blue-700 text-sm">
                                  {new Date(meeting.date).toLocaleDateString('en-GB', { month: 'short' })}
                                </p>
                              </div>
                              
                              <div className="flex-1">
                                <h5 className="text-lg font-medium text-gray-900">{meeting.title}</h5>
                                <div className="mt-2 space-y-2 text-sm text-gray-500">
                                  <div className="flex items-center">
                                    <Clock className="h-4 w-4 mr-2" />
                                    <span>
                                      {new Date(meeting.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                      {' - '}
                                      {new Date(new Date(meeting.date).getTime() + meeting.duration * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                      {` (${meeting.duration} minutes)`}
                                    </span>
                                  </div>
                                  <div className="flex items-center">
                                    <MapPin className="h-4 w-4 mr-2" />
                                    <span>{meeting.location}</span>
                                  </div>
                                  <div className="flex items-center">
                                    <UserPlus className="h-4 w-4 mr-2" />
                                    <span>{meeting.attendees.join(', ')}</span>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex space-x-2">
                                <button className="p-2 text-gray-400 hover:text-gray-600">
                                  <Edit className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      
                      {client.meetings.filter(meeting => new Date(meeting.date) > new Date()).length === 0 && (
                        <p className="text-gray-500 text-center py-4">No upcoming meetings</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-md font-medium text-gray-900 mb-4">Past Meetings</h4>
                    <div className="space-y-4">
                      {client.meetings
                        .filter(meeting => new Date(meeting.date) <= new Date())
                        .map((meeting) => (
                          <div key={meeting.id} className="bg-white p-6 rounded-lg border border-gray-200">
                            <div className="flex items-start">
                              <div className="mr-4 bg-gray-100 rounded-lg p-3 text-center">
                                <p className="text-gray-700 font-medium">
                                  {new Date(meeting.date).toLocaleDateString('en-GB', { day: '2-digit' })}
                                </p>
                                <p className="text-gray-700 text-sm">
                                  {new Date(meeting.date).toLocaleDateString('en-GB', { month: 'short' })}
                                </p>
                              </div>
                              
                              <div className="flex-1">
                                <h5 className="text-lg font-medium text-gray-900">{meeting.title}</h5>
                                <div className="mt-2 space-y-2 text-sm text-gray-500">
                                  <div className="flex items-center">
                                    <Clock className="h-4 w-4 mr-2" />
                                    <span>
                                      {new Date(meeting.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                      {' - '}
                                      {new Date(new Date(meeting.date).getTime() + meeting.duration * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                      {` (${meeting.duration} minutes)`}
                                    </span>
                                  </div>
                                  <div className="flex items-center">
                                    <MapPin className="h-4 w-4 mr-2" />
                                    <span>{meeting.location}</span>
                                  </div>
                                  <div className="flex items-center">
                                    <UserPlus className="h-4 w-4 mr-2" />
                                    <span>{meeting.attendees.join(', ')}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      
                      {client.meetings.filter(meeting => new Date(meeting.date) <= new Date()).length === 0 && (
                        <p className="text-gray-500 text-center py-4">No past meetings</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientDetail;