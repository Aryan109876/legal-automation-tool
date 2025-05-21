export type DocumentType = 'pleading' | 'evidence' | 'correspondence' | 'legal_research' | 'contract';

export interface Document {
  id: string;
  title: string;
  description: string;
  fileType: string;
  fileSize: number;
  type: DocumentType;
  caseId?: string;
  uploadedBy: string;
  uploadDate: string;
  lastModified: string;
  version: number;
  tags?: string[];
  metadata?: Record<string, any>;
}