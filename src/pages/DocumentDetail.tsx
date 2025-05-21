import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, FileText, Download, Share, Edit, Trash2, History, Tag, User, Clock, AlertCircle, File as FilePdf, Eye } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';

const DocumentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  
  // Mock document data
  const document = {
    id: '402',
    title: 'Medical Records - SF General Hospital',
    description: 'Records from San Francisco General Hospital for James Smith covering initial examination and treatment following accident on Highway 101.',
    fileType: 'pdf',
    fileSize: 8354621,
    type: 'evidence',
    caseId: '1',
    caseTitle: 'Smith v. Johnson',
    caseNumber: 'CV-2023-0124',
    uploadedBy: 'Michael Wong',
    uploadDate: '2025-06-05T14:30:00Z',
    lastModified: '2025-06-05T14:30:00Z',
    version: 1,
    tags: ['medical', 'evidence', 'hospital'],
    versionHistory: [
      {
        version: 1,
        uploadedBy: 'Michael Wong',
        date: '2025-06-05T14:30:00Z',
        notes: 'Initial upload',
        fileSize: 8354621
      }
    ]
  };
  
  const formatFileSize = (sizeInBytes: number) => {
    if (sizeInBytes < 1024) {
      return `${sizeInBytes} B`;
    } else if (sizeInBytes < 1024 * 1024) {
      return `${(sizeInBytes / 1024).toFixed(1)} KB`;
    } else {
      return `${(sizeInBytes / (1024 * 1024)).toFixed(1)} MB`;
    }
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };
  
  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  return (
    <div>
      <div className="mb-6">
        <button 
          onClick={() => navigate('/documents')}
          className="inline-flex items-center px-3 py-1.5 text-sm text-gray-500 hover:text-gray-700"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Documents
        </button>
      </div>
      
      <PageHeader 
        title={document.title}
        description={`File in case: ${document.caseTitle} (${document.caseNumber})`}
        actions={[
          { 
            label: 'Download', 
            onClick: () => console.log('Download document'), 
            icon: <Download className="h-4 w-4 mr-2" /> 
          },
          { 
            label: 'Share', 
            onClick: () => console.log('Share document'), 
            icon: <Share className="h-4 w-4 mr-2" /> 
          }
        ]}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between">
                <h3 className="text-lg font-medium text-gray-900">Document Preview</h3>
                <button className="inline-flex items-center text-blue-600 hover:text-blue-800">
                  <Eye className="h-4 w-4 mr-1" />
                  Open Full View
                </button>
              </div>
            </div>
            
            <div className="h-96 flex items-center justify-center bg-gray-50 p-6">
              <div className="text-center">
                <FilePdf className="h-16 w-16 text-red-500 mx-auto" />
                <p className="mt-4 text-gray-600">PDF Document Preview</p>
                <p className="mt-2 text-sm text-gray-500">Click "Open Full View" to view the complete document</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Document Details</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Description</h4>
                <p className="text-gray-800">{document.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Document Type</h4>
                  <p className="text-gray-800 capitalize">{document.type}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">File Type</h4>
                  <p className="text-gray-800 uppercase">{document.fileType}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">File Size</h4>
                  <p className="text-gray-800">{formatFileSize(document.fileSize)}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Version</h4>
                  <p className="text-gray-800">{document.version}</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {document.tags.map((tag, index) => (
                    <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <button
                  onClick={() => setShowVersionHistory(!showVersionHistory)}
                  className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
                >
                  <History className="h-4 w-4 mr-1" />
                  {showVersionHistory ? 'Hide' : 'Show'} Version History
                </button>
                
                {showVersionHistory && (
                  <div className="mt-4 space-y-3">
                    {document.versionHistory.map((version, index) => (
                      <div key={index} className="flex items-start p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center">
                            <span className="font-medium text-gray-900">Version {version.version}</span>
                            {index === 0 && (
                              <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Current
                              </span>
                            )}
                          </div>
                          <div className="mt-1 text-sm text-gray-500">
                            <div className="flex items-center">
                              <User className="h-4 w-4 text-gray-400 mr-1" />
                              <span>{version.uploadedBy}</span>
                              <span className="mx-2">•</span>
                              <Clock className="h-4 w-4 text-gray-400 mr-1" />
                              <span>{formatDate(version.date)} at {formatTime(version.date)}</span>
                            </div>
                            {version.notes && (
                              <p className="mt-1">Notes: {version.notes}</p>
                            )}
                          </div>
                        </div>
                        <button className="text-blue-600 hover:text-blue-800 text-sm">
                          Download
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Document Actions</h3>
            
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-md hover:bg-gray-50 text-left text-sm font-medium text-gray-700">
                <div className="flex items-center">
                  <Download className="h-5 w-5 text-gray-400 mr-3" />
                  Download Document
                </div>
                <ChevronLeft className="h-4 w-4 text-gray-400 transform rotate-270" />
              </button>
              
              <button className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-md hover:bg-gray-50 text-left text-sm font-medium text-gray-700">
                <div className="flex items-center">
                  <Share className="h-5 w-5 text-gray-400 mr-3" />
                  Share Document
                </div>
                <ChevronLeft className="h-4 w-4 text-gray-400 transform rotate-270" />
              </button>
              
              <button className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-md hover:bg-gray-50 text-left text-sm font-medium text-gray-700">
                <div className="flex items-center">
                  <Edit className="h-5 w-5 text-gray-400 mr-3" />
                  Edit Metadata
                </div>
                <ChevronLeft className="h-4 w-4 text-gray-400 transform rotate-270" />
              </button>
              
              <button className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-md hover:bg-gray-50 text-left text-sm font-medium text-gray-700">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-gray-400 mr-3" />
                  Upload New Version
                </div>
                <ChevronLeft className="h-4 w-4 text-gray-400 transform rotate-270" />
              </button>
              
              <button className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-md hover:bg-gray-50 text-left text-sm font-medium text-red-600">
                <div className="flex items-center">
                  <Trash2 className="h-5 w-5 text-red-500 mr-3" />
                  Delete Document
                </div>
                <ChevronLeft className="h-4 w-4 text-gray-400 transform rotate-270" />
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Document Information</h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Uploaded by</p>
                <div className="flex items-center mt-1">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 mr-2">
                    {document.uploadedBy.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{document.uploadedBy}</p>
                    <p className="text-xs text-gray-500">
                      {formatDate(document.uploadDate)} at {formatTime(document.uploadDate)}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500">Related Case</p>
                <div className="mt-1">
                  <a href={`/cases/${document.caseId}`} className="text-sm font-medium text-blue-600 hover:text-blue-800">
                    {document.caseTitle} ({document.caseNumber})
                  </a>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 text-amber-500 mr-2" />
                  <p className="text-sm text-gray-700">This document contains confidential information</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentDetail;