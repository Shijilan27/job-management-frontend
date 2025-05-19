'use client';

import { Grid } from '@mantine/core';
import { JobCard } from './JobCard';

type JobStatus = 'applied' | 'saved' | 'interviewing' | 'offered' | 'rejected';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salaryMin: number;
  salaryMax: number;
  applicationDeadline: string;
  description: string;
  status: 'draft' | 'published' | 'closed';
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  companyLogo?: string;
}

interface JobGridProps {
  jobs: Job[];
}

export function JobGrid({ jobs }: JobGridProps) {
  return (
    <Grid>
      {jobs.map((job) => (
        <Grid.Col key={job.id} span={{ base: 12, sm: 6, lg: 4 }}>
          <JobCard {...job} />
        </Grid.Col>
      ))}
    </Grid>
  );
} 