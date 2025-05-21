import { useEffect, useState } from 'react';
import { Document } from '../types/document';
import mockDocuments from '../data/mockDocuments';

export const useDocuments = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // Simulate loading data from an API
    const fetchData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 800));
        setDocuments(mockDocuments);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load documents');
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  return {
    documents,
    isLoading,
    error
  };
};