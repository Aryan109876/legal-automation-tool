import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  PlusCircle, 
  Filter, 
  SortAsc, 
  SortDesc, 
  MoreVertical,
  User,
  Building,
  Mail,
  Phone,
  Eye, 
  Edit, 
  Trash2
} from 'lucide-react';
import PageHeader from '../components/common/PageHeader';

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: 'individual' | 'company';
  companyName?: string;
  activeCases: number;
  totalCases: number;
  address: string;
  relationshipManager: string;
  joinDate: string;
}

const Clients: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'individual' | 'company'>('all');
  const [sortField, setSortField] = useState<keyof Client>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  // Mock clients data
  const mockClients: Client[] = [
    {
      id: '101',
      name: 'James Smith',
      email: 'jsmith@example.com',
      phone: '(555) 123-4567',
      type: 'individual',
      activeCases: 1,
      totalCases: 2,
      address: '123 Main St, San Francisco, CA',
      relationshipManager: 'Sarah Johnson',
      joinDate: '2024-12-15'
    },
    {
      id: '102',
      name: 'Williams Corporation',
      email: 'legal@williamscorp.com',
      phone: '(555) 987-6543',
      type: 'company',
      companyName: 'Williams Corporation',
      activeCases: 1,
      totalCases: 1,
      address: '789 Industrial Ave, Chicago, IL',
      relationshipManager: 'David Miller',
      joinDate: '2025-01-10'
    },
    {
      id: '103',
      name: 'Elizabeth Roberts',
      email: 'eroberts@example.com',
      phone: '(555) 789-0123',
      type: 'individual',
      activeCases: 1,
      totalCases: 1,
      address: '45 Park Lane, London',
      relationshipManager: 'William Taylor',
      joinDate: '2025-02-03'
    },
    {
      id: '104',
      name: 'Thompson Development LLC',
      email: 'info@thompsondevelopment.com',
      phone: '(555) 234-5678',
      type: 'company',
      companyName: 'Thompson Development LLC',
      activeCases: 0,
      totalCases: 1,
      address: '567 Business Park, Manchester',
      relationshipManager: 'Rachel Green',
      joinDate: '2024-11-22'
    },
    {
      id: '105',
      name: 'Michael Anderson',
      email: 'manderson@example.com',
      phone: '(555) 456-7890',
      type: 'individual',
      activeCases: 0,
      totalCases: 3,
      address: '234 Oak Street, New York, NY',
      relationshipManager: 'Sarah Johnson',
      joinDate: '2024-10-05'
    }
  ];
  
  const toggleSortDirection = () => {
    setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
  };
  
  const handleSort = (field: keyof Client) => {
    if (sortField === field) {
      toggleSortDirection();
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  const filteredClients = mockClients
    .filter(client => 
      (typeFilter === 'all' || client.type === typeFilter) &&
      (client.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
       client.email.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      const valueA = String(a[sortField]).toLowerCase();
      const valueB = String(b[sortField]).toLowerCase();
      
      if (sortField === 'joinDate') {
        const dateA = new Date(a.joinDate).getTime();
        const dateB = new Date(b.joinDate).getTime();
        return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
      }
      
      if (sortField === 'activeCases' || sortField === 'totalCases') {
        return sortDirection === 'asc' 
          ? a[sortField] - b[sortField] 
          : b[sortField] - a[sortField];
      }
      
      return sortDirection === 'asc' 
        ? valueA.localeCompare(valueB) 
        : valueB.localeCompare(valueA);
    });
  
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Clients" 
        description="Manage your client relationships"
        actions={[
          { 
            label: 'Add Client', 
            onClick: () => console.log('Add client'), 
            icon: <PlusCircle className="h-4 w-4 mr-2" /> 
          }
        ]}
      />
      
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <select
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as 'all' | 'individual' | 'company')}
            >
              <option value="all">All Clients</option>
              <option value="individual">Individuals</option>
              <option value="company">Companies</option>
            </select>
            
            <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center">
                    Client
                    {sortField === 'name' && (
                      sortDirection === 'asc' ? 
                        <SortAsc className="h-4 w-4 ml-1" /> : 
                        <SortDesc className="h-4 w-4 ml-1" />
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hidden md:table-cell"
                  onClick={() => handleSort('email')}
                >
                  <div className="flex items-center">
                    Contact
                    {sortField === 'email' && (
                      sortDirection === 'asc' ? 
                        <SortAsc className="h-4 w-4 ml-1" /> : 
                        <SortDesc className="h-4 w-4 ml-1" />
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hidden lg:table-cell"
                  onClick={() => handleSort('activeCases')}
                >
                  <div className="flex items-center">
                    Cases
                    {sortField === 'activeCases' && (
                      sortDirection === 'asc' ? 
                        <SortAsc className="h-4 w-4 ml-1" /> : 
                        <SortDesc className="h-4 w-4 ml-1" />
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hidden sm:table-cell"
                  onClick={() => handleSort('joinDate')}
                >
                  <div className="flex items-center">
                    Client Since
                    {sortField === 'joinDate' && (
                      sortDirection === 'asc' ? 
                        <SortAsc className="h-4 w-4 ml-1" /> : 
                        <SortDesc className="h-4 w-4 ml-1" />
                    )}
                  </div>
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredClients.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                    No clients found
                  </td>
                </tr>
              ) : (
                filteredClients.map((client) => (
                  <tr key={client.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                          {client.type === 'individual' ? (
                            <User className="h-5 w-5 text-gray-500" />
                          ) : (
                            <Building className="h-5 w-5 text-gray-500" />
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            <Link to={`/clients/${client.id}`} className="hover:text-blue-600">
                              {client.name}
                            </Link>
                          </div>
                          <div className="text-sm text-gray-500">
                            {client.type === 'company' && client.companyName}
                            {client.type === 'individual' && 'Individual Client'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                      <div className="flex flex-col">
                        <div className="flex items-center text-sm text-gray-900">
                          <Mail className="h-4 w-4 text-gray-400 mr-1" />
                          <span>{client.email}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <Phone className="h-4 w-4 text-gray-400 mr-1" />
                          <span>{client.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">
                      <div>
                        <span className="font-medium">{client.activeCases}</span> active
                      </div>
                      <div className="text-xs">
                        {client.totalCases} total
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                      {new Date(client.joinDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end items-center space-x-3">
                        <Link to={`/clients/${client.id}`} className="text-blue-600 hover:text-blue-900">
                          <Eye className="h-5 w-5" />
                        </Link>
                        <button className="text-gray-600 hover:text-gray-900">
                          <Edit className="h-5 w-5" />
                        </button>
                        <div className="relative" onClick={(e) => e.stopPropagation()}>
                          <button className="text-gray-400 hover:text-gray-600">
                            <MoreVertical className="h-5 w-5" />
                          </button>
                          <div className="hidden origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                            <a
                              href="#"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Add Case
                            </a>
                            <a
                              href="#"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Send Email
                            </a>
                            <a
                              href="#"
                              className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                            >
                              Delete
                            </a>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Previous
            </button>
            <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredClients.length}</span> of{' '}
                <span className="font-medium">{filteredClients.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Previous</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  1
                </button>
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Next</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clients;