'use client';

import { useEffect, useState } from 'react';
import { Card, Text, Group, Badge, Stack, Button, Box, Avatar, rem } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconClock, IconMapPin, IconCurrencyDollar } from '@tabler/icons-react';

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

interface JobsListProps {
  selectedLocation?: string | null;
  selectedJobType?: string | null;
  searchQuery?: string;
  salaryRange?: [number, number];
  onJobApply?: (job: Job) => void;
}

function JobCard({ job, onApply }: { job: Job, onApply?: (job: Job) => void }) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1d Ago';
    if (diffDays < 7) return `${diffDays}d Ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const formatSalary = (min: number, max: number) => {
    return `${(min / 100000).toFixed(1)}LPA - ${(max / 100000).toFixed(1)}LPA`;
  };

  return (
    <Card
      radius={20}
      p="lg"
      withBorder
      style={{
        borderRadius: 20,
        background: '#fff',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 4px 24px 0 rgba(33, 150, 243, 0.10)',
        transition: 'transform 200ms ease, box-shadow 200ms ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 32px 0 rgba(33,150,243,0.15)',
        },
      }}
    >
      {/* Header Section */}
      <Group justify="space-between" mb="xs" align="flex-start">
        <Avatar 
          size={56}
          radius={28}
          style={{
            border: '2px solid #eee',
            background: '#fff',
            boxShadow: '0 2px 8px 0 rgba(33,150,243,0.08)',
            fontWeight: 700,
            fontSize: 22,
            color: '#2196F3',
          }}
          src={job.companyLogo ? `http://localhost:3000${job.companyLogo}` : undefined}
        >
          {!job.companyLogo && job.company.charAt(0)}
        </Avatar>
        <Badge 
          color="#2196F3" 
          variant="light" 
          size="lg"
          style={{
            background: '#E3F2FD',
            color: '#2196F3',
            borderRadius: 12,
            fontWeight: 600,
            fontSize: '0.95rem',
            padding: '8px 18px',
            boxShadow: '0 1px 4px 0 rgba(33,150,243,0.08)',
          }}
        >
          {formatDate(job.createdAt)}
        </Badge>
      </Group>
      <Text size="xl" fw={700} c="#222" mt="xs">
        {job.title}
      </Text>
      <Text size="md" c="#666">
        {job.company}
      </Text>

      {/* Job Details Section */}
      <Box style={{ flex: 1, marginTop: 8 }}>
        <Group gap={16}>
          <Group gap={6}>
            <IconClock style={{ width: rem(18), height: rem(18), color: '#2196F3' }} />
            <Text size="sm" c="#2196F3">{job.type}</Text>
          </Group>
          <Text size="sm" c="#B0BEC5">•</Text>
          <Group gap={6}>
            <IconMapPin style={{ width: rem(18), height: rem(18), color: '#2196F3' }} />
            <Text size="sm" c="#2196F3">{job.location}</Text>
          </Group>
          <Text size="sm" c="#B0BEC5">•</Text>
          <Group gap={6}>
            <IconCurrencyDollar style={{ width: rem(18), height: rem(18), color: '#2196F3' }} />
            <Text size="sm" c="#2196F3">{formatSalary(job.salaryMin, job.salaryMax)}</Text>
          </Group>
        </Group>

        <Text size="sm" mt="md" mb="xl" c="#444" lineClamp={2} style={{ fontSize: 15, lineHeight: 1.6 }}>
          {job.description}
        </Text>
      </Box>

      {/* Button Section */}
      <Button 
        fullWidth
        size="md"
        style={{
          marginTop: 'auto',
          background: '#2196F3',
          color: '#fff',
          fontWeight: 700,
          fontSize: 18,
          borderRadius: 10,
          height: 44,
          boxShadow: '0 2px 8px 0 rgba(33,150,243,0.10)',
          transition: 'transform 150ms ease, background-color 150ms ease',
        }}
        onClick={() => onApply?.(job)}
      >
        Apply Now
      </Button>
    </Card>
  );
}

export function JobsList({ selectedLocation, selectedJobType, searchQuery, salaryRange, onJobApply }: JobsListProps) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://job-management-backend.onrender.com/jobs', {
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch jobs');
      }

      const data = await response.json();
      setJobs(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError('Failed to load jobs. Please try again later.');
      notifications.show({
        title: 'Error',
        message: 'Failed to load jobs',
        color: 'red',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  if (loading) {
    return <Text>Loading jobs...</Text>;
  }

  if (error) {
    return <Text color="red">{error}</Text>;
  }

  // Filter jobs based on selectedLocation, selectedJobType, searchQuery, and salaryRange
  const hasAnySelectFilter = !!selectedLocation || !!selectedJobType;
  const hasAnyFilter = hasAnySelectFilter || !!searchQuery || !!salaryRange;
  const filteredJobs = jobs.filter((job) => {
    if (!hasAnyFilter) return true;
    let matches = false;
    if (selectedLocation && job.location === selectedLocation) matches = true;
    if (selectedJobType && job.type === selectedJobType) matches = true;
    if (searchQuery && (
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase())
    )) matches = true;
    // Only apply salary filter if a select filter is chosen
    if (hasAnySelectFilter && salaryRange) {
      const minSalaryK = job.salaryMin / 1000;
      const maxSalaryK = job.salaryMax / 1000;
      if (!(maxSalaryK < salaryRange[0] || minSalaryK > salaryRange[1])) matches = true;
    }
    return matches;
  });

  if (filteredJobs.length === 0) {
    return <Text>No jobs found matching your filters.</Text>;
  }

  return (
    <>
      {filteredJobs.map((job) => (
        <JobCard key={job.id} job={job} onApply={onJobApply} />
      ))}
    </>
  );
} 