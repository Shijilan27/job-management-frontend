export type JobType = 'Full-time' | 'Part-time' | 'Contract' | 'Internship' | 'Freelance';

export interface JobFormData {
  title: string;
  company: string;
  location: string;
  type: JobType;
  salaryMin: number;
  salaryMax: number;
  applicationDeadline: Date;
  description: string;
}

export interface JobDraft extends JobFormData {
  id: string;
  status: 'draft';
  createdAt: Date;
  updatedAt: Date;
}

export interface JobPosting extends JobFormData {
  id: string;
  status: 'published' | 'closed';
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
} 