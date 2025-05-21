import React, { createContext, useContext, useState } from 'react';
import { Case, Activity, CaseStatus, CasePriority } from '../types/case';
import mockCases from '../data/mockCases';

interface CaseContextType {
  cases: Case[];
  getCaseById: (id: string) => Case | undefined;
  addCase: (caseData: Omit<Case, 'id'>) => void;
  updateCase: (id: string, caseData: Partial<Case>) => void;
  deleteCase: (id: string) => void;
  addActivity: (caseId: string, activity: Omit<Activity, 'id'>) => void;
}

const CaseContext = createContext<CaseContextType | undefined>(undefined);

export const useCase = () => {
  const context = useContext(CaseContext);
  if (!context) {
    throw new Error('useCase must be used within a CaseProvider');
  }
  return context;
};

export const CaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cases, setCases] = useState<Case[]>(mockCases);
  
  const getCaseById = (id: string) => {
    return cases.find(caseItem => caseItem.id === id);
  };
  
  const addCase = (caseData: Omit<Case, 'id'>) => {
    const newCase: Case = {
      ...caseData,
      id: Date.now().toString()
    };
    
    setCases(prevCases => [...prevCases, newCase]);
  };
  
  const updateCase = (id: string, caseData: Partial<Case>) => {
    setCases(prevCases => 
      prevCases.map(caseItem => 
        caseItem.id === id ? { ...caseItem, ...caseData } : caseItem
      )
    );
  };
  
  const deleteCase = (id: string) => {
    setCases(prevCases => prevCases.filter(caseItem => caseItem.id !== id));
  };
  
  const addActivity = (caseId: string, activity: Omit<Activity, 'id'>) => {
    const newActivity: Activity = {
      ...activity,
      id: Date.now().toString()
    };
    
    setCases(prevCases => 
      prevCases.map(caseItem => 
        caseItem.id === caseId 
          ? { ...caseItem, activities: [newActivity, ...caseItem.activities] } 
          : caseItem
      )
    );
  };
  
  return (
    <CaseContext.Provider value={{ cases, getCaseById, addCase, updateCase, deleteCase, addActivity }}>
      {children}
    </CaseContext.Provider>
  );
};

export default CaseContext;