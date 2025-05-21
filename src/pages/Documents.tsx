import React, { useState } from 'react';
import { Search, PlusCircle, Filter, SortAsc, SortDesc, Grid, List } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import DocumentsList from '../components/documents/DocumentsList';
import { useDocuments } from '../hooks/useDocuments';
import { Document, DocumentType } from '../types/document';

const Documents: React.FC = () => {
  const { documents, isLoading } = useDocuments();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<DocumentType | 'all'>('all');
  const [sortField, setSortField] = useState<keyof Document>('uploadDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  
  const toggleSortDirection = () => {
    setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
  };
  
  const handleSort = (field: keyof Document) => {
    if (sortField === field) {
      toggleSortDirection();
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  const filteredDocuments = documents
    .filter(doc => 
      (typeFilter === 'all' || doc.type === typeFilter) &&
      (doc.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
       doc.description.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortField === 'uploadDate' || sortField === 'lastModified') {
        const dateA = new Date(a[sortField]).getTime();
        const dateB = new Date(b[sortField]).getTime();
        return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
      } else if (sortField === 'fileSize') {
        return sortDirection === 'asc' ? a.fileSize - b.fileSize : b.fileSize - a.fileSize;
      } else {
        const valueA = String(a[sortField]).toLowerCase();
        const valueB = String(b[sortField]).toLowerCase();
        return sortDirection === 'asc' 
          ? valueA.localeCompare(valueB) 
          : valueB.localeCompare(valueA);
      }
    });
  
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Document Management" 
        description="Upload, organize and manage all case-related documents"
        actions={[
          { 
            label: 'Upload Document', 
            onClick: () => console.log('Upload document'), 
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
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <select
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as DocumentType | 'all')}
            >
              <option value="all">All Types</option>
              <option value="pleading">Pleadings</option>
              <option value="evidence">Evidence</option>
              <option value="correspondence">Correspondence</option>
              <option value="legal_research">Legal Research</option>
              <option value="contract">Contracts</option>
            </select>
            
            <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </button>
            
            <div className="hidden sm:flex items-center border border-gray-300 rounded-md">
              <button
                className={`p-2 ${viewMode === 'list' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setViewMode('list')}
              >
                <List className="h-5 w-5" />
              </button>
              <button
                className={`p-2 ${viewMode === 'grid' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        
        {viewMode === 'list' ? (
          <DocumentsList documents={filteredDocuments} />
        ) : (
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredDocuments.map(document => (
              <div key={document.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-center h-20 mb-4">
                  {document.fileType === 'pdf' ? (
                    <div className="w-16 h-20 bg-red-500 rounded relative flex items-center justify-center">
                      <div className="absolute inset-0 m-2 bg-white rounded"></div>
                      <span className="text-xs font-bold text-red-600 z-10">PDF</span>
                    </div>
                  ) : document.fileType === 'docx' ? (
                    <div className="w-16 h-20 bg-blue-500 rounded relative flex items-center justify-center">
                      <div className="absolute inset-0 m-2 bg-white rounded"></div>
                      <span className="text-xs font-bold text-blue-600 z-10">DOC</span>
                    </div>
                  ) : (
                    <div className="w-16 h-20 bg-gray-500 rounded relative flex items-center justify-center">
                      <div className="absolute inset-0 m-2 bg-white rounded"></div>
                      <span className="text-xs font-bold text-gray-600 z-10">{document.fileType.toUpperCase()}</span>
                    </div>
                  )}
                </div>
                <h3 className="font-medium text-gray-900 mb-1 truncate">{document.title}</h3>
                <p className="text-xs text-gray-500 mb-2 truncate">{document.description}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{new Date(document.uploadDate).toLocaleDateString()}</span>
                  <span>{(document.fileSize / 1024).toFixed(1)} KB</span>
                </div>
              </div>
            ))}
          </div>
        )}
        
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
                Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
                <span className="font-medium">{filteredDocuments.length}</span> results
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
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  2
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  3
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

export default Documents;