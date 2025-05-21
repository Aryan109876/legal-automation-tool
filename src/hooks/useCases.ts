import { useEffect, useState } from 'react';
import { useCase } from '../contexts/CaseContext';
import { Case } from '../types/case';

export const useCases = () => {
  const { cases } = useCase();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // Simulate loading data from an API
    const fetchData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 800));
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load cases');
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  return {
    cases,
    isLoading,
    error
  };
};