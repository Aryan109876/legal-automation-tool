import { useEffect, useState } from 'react';
import { useCase } from '../contexts/CaseContext';
import { Case } from '../types/case';

export const useCaseDetail = (id: string | undefined) => {
  const { getCaseById } = useCase();
  const [caseDetail, setCaseDetail] = useState<Case | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // Simulate loading data from an API
    const fetchData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 800));
        
        if (!id) {
          throw new Error('Case ID is required');
        }
        
        const foundCase = getCaseById(id);
        
        if (!foundCase) {
          throw new Error('Case not found');
        }
        
        setCaseDetail(foundCase);
        setIsLoading(false);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [id, getCaseById]);
  
  return {
    caseDetail,
    isLoading,
    error
  };
};