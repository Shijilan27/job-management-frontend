'use client';

import { useState } from 'react';
import {
  Stack,
  TextInput,
  Group,
  Button,
  Select,
  RangeSlider,
  Container,
  Text,
  Paper,
  Avatar,
  Badge,
  Box,
  rem,
  SimpleGrid,
  Card,
  Popover,
  Title,
  Center,
  Divider,
  Modal,
} from '@mantine/core';
import { IconSearch, IconMapPin, IconUserSearch, IconClock, IconCurrencyDollar } from '@tabler/icons-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { CreateJobModal } from '@/components/jobs/CreateJobModal';
import { JobsList } from '@/components/jobs/JobsList';

type JobStatus = 'applied' | 'saved' | 'interviewing' | 'offered' | 'rejected';

type Job = {
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
};

function JobCard({ job }: { job: Job }) {
  return (
    <Card
      radius={20}
      p="lg"
      withBorder
      style={{
        border: '2px dashed #2196F3',
        borderRadius: 20,
        background: '#fff',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 2px 8px 0 rgba(33,150,243,0.04)',
        transition: 'transform 200ms ease, box-shadow 200ms ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 4px 16px 0 rgba(33,150,243,0.10)',
        },
      }}
    >
      {/* Header Section */}
      <Box mb="md">
        <Group justify="space-between" mb="xs" align="flex-start">
          <Avatar 
            src={job.companyLogo} 
            size={56}
            radius={28}
            style={{
              border: '2px solid #eee',
              background: '#fff',
              boxShadow: '0 2px 8px 0 rgba(33,150,243,0.08)',
            }}
          />
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
            {job.publishedAt ? new Date(job.publishedAt).toLocaleDateString() : ''}
          </Badge>
        </Group>
        <Text size="xl" fw={700} c="#222" mt="xs">
          {job.title}
        </Text>
        <Text size="md" c="#666">
          {job.company}
        </Text>
      </Box>

      {/* Job Details Section */}
      <Box style={{ flex: 1 }}>
        <Group gap={8}>
          <Group gap={6}>
            <IconUserSearch style={{ width: rem(18), height: rem(18), color: '#2196F3' }} />
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
            <Text size="sm" c="#2196F3">₹{job.salaryMin} - ₹{job.salaryMax}</Text>
          </Group>
        </Group>

        <ul style={{ margin: '18px 0 32px 18px', padding: 0, color: '#444', fontSize: 15, lineHeight: 1.6 }}>
          <li>A user-friendly interface lets you browse stunning photos and videos</li>
          <li>Filter destinations based on interests and travel style, and create personalized</li>
        </ul>
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
      >
        Apply Now
      </Button>
    </Card>
  );
}

export default function Home() {
  const [salaryRange, setSalaryRange] = useState<[number, number]>([50, 80]);
  const [opened, setOpened] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedJobType, setSelectedJobType] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [jobModalOpened, setJobModalOpened] = useState(false);

  const commonInputStyles = {
    color: '#333333',
    fontWeight: 500,
    fontSize: '16px',
    backgroundColor: '#FFFFFF',
    '&::placeholder': {
      color: '#666666',
      fontWeight: 500,
      opacity: 1,
    },
    '&:focus': {
      border: '1px solid #00AAFF',
    },
  };

  const selectStyles = {
    input: commonInputStyles,
    dropdown: {
      backgroundColor: '#FFFFFF',
      border: '1px solid #E5E5E5',
      '& [data-selected]': {
        color: '#333333',
        fontWeight: 500,
        backgroundColor: '#F5F5F5',
      },
    },
    option: {
      color: '#333333',
      fontWeight: 500,
      '&:hover': {
        backgroundColor: '#F5F5F5',
      },
    },
  };

  const handleJobCreated = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <MainLayout>
      <Container size="lg" py="xl">
        <Stack gap="xl">
          {/* Search and Filter Bar - matches reference image */}
          <Center>
            <Box
              style={{
                width: '100%',
                maxWidth: 1100,
                background: '#fff',
                borderRadius: 16,
                boxShadow: '0 2px 16px 0 rgba(0,0,0,0.04)',
                padding: '16px 24px',
                display: 'flex',
                alignItems: 'center',
                gap: 0,
                fontFamily: 'Satoshi, Inter, sans-serif',
              }}
            >
              {/* Search Input */}
              <Group gap={8} style={{ flex: 1, minWidth: 220, alignItems: 'center' }}>
                <IconSearch size={20} color="#222" style={{ marginRight: 6 }} />
                <TextInput
                  placeholder="Search By Job Title, Role"
                  style={{ fontSize: 17, fontWeight: 500, width: '100%', color: '#222' }}
                  styles={{
                    input: {
                      fontFamily: 'Satoshi, Inter, sans-serif',
                      color: '#222',
                      '::placeholder': {
                        color: '#222',
                        opacity: 1,
                        fontWeight: 500,
                      },
                    },
                  }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.currentTarget.value)}
                />
              </Group>
              <Divider orientation="vertical" mx={24} size="md" color="#E5E5E5" />
              {/* Location Dropdown */}
              <Group gap={8} style={{ minWidth: 180, alignItems: 'center' }}>
                <IconMapPin size={18} color="#222" style={{ marginRight: 6 }} />
                <Select
                  placeholder="Preferred Location"
                  data={[
                    'Remote',
                    'New York, NY',
                    'San Francisco, CA',
                    'London, UK',
                    'Bangalore, India',
                  ]}
                  style={{ fontSize: 17, fontWeight: 500, width: '100%', color: '#222' }}
                  styles={{
                    input: {
                      fontFamily: 'Satoshi, Inter, sans-serif',
                      color: '#222',
                    },
                    dropdown: {
                      color: '#222',
                      background: '#fff',
                    },
                    option: {
                      color: '#222',
                    },
                  }}
                  value={selectedLocation}
                  onChange={setSelectedLocation}
                />
              </Group>
              <Divider orientation="vertical" mx={24} size="md" color="#E5E5E5" />
              {/* Job Type Dropdown */}
              <Group gap={8} style={{ minWidth: 150, alignItems: 'center' }}>
                <IconUserSearch size={18} color="#222" style={{ marginRight: 6 }} />
                <Select
                  placeholder="Job type"
                  data={[ 'Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance' ]}
                  style={{ fontSize: 17, fontWeight: 500, width: '100%', color: '#222' }}
                  styles={{
                    input: {
                      fontFamily: 'Satoshi, Inter, sans-serif',
                      color: '#222',
                    },
                    dropdown: {
                      color: '#222',
                      background: '#fff',
                    },
                    option: {
                      color: '#222',
                    },
                  }}
                  value={selectedJobType}
                  onChange={setSelectedJobType}
                />
              </Group>
              <Divider orientation="vertical" mx={24} size="md" color="#E5E5E5" />
              {/* Salary Range Slider */}
              <Box style={{ minWidth: 260 }}>
                <Text size="sm" fw={600} style={{ marginBottom: 4, fontFamily: 'Satoshi, Inter, sans-serif', color: '#222' }}>
                  Salary Per Month
                </Text>
                <RangeSlider
                  min={0}
                  max={200}
                  step={5}
                  value={salaryRange}
                  onChange={setSalaryRange}
                  label={null}
                  styles={{
                    track: { height: 3 },
                    thumb: { border: '2px solid #000', background: '#fff', width: 18, height: 18 },
                  }}
                />
                <Group justify="space-between" mt={4}>
                  <Text size="sm" fw={500} style={{ color: '#222' }}>
                    ₹{salaryRange[0] / 10}L
                  </Text>
                  <Text size="sm" fw={500} style={{ color: '#222' }}>
                    ₹{salaryRange[1] / 10}L
                  </Text>
                </Group>
              </Box>
            </Box>
          </Center>

          {/* Create Job Modal */}
          <CreateJobModal
            opened={modalOpened}
            onClose={() => setModalOpened(false)}
            onJobCreated={handleJobCreated}
          />

          {/* Jobs List */}
          <SimpleGrid
            cols={{ base: 1, sm: 2, md: 2, lg: 4 }}
            spacing="lg"
            verticalSpacing="lg"
          >
            <JobsList
              key={refreshKey}
              selectedLocation={selectedLocation}
              selectedJobType={selectedJobType}
              searchQuery={searchQuery}
              salaryRange={salaryRange}
              onJobApply={(job) => {
                setSelectedJob(job);
                setJobModalOpened(true);
              }}
            />
          </SimpleGrid>

          {/* Job Card Overlay Modal */}
          <Modal
            opened={jobModalOpened}
            onClose={() => setJobModalOpened(false)}
            size="lg"
            centered
            title={null}
            styles={{
              content: { background: '#f8fafc', borderRadius: 18, boxShadow: '0 8px 32px 0 rgba(33,150,243,0.15)' },
            }}
          >
            {selectedJob ? (
              <div style={{ padding: 32, background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px 0 rgba(0,0,0,0.08)', maxWidth: 600, margin: '0 auto' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 24 }}>
                  {selectedJob.companyLogo && (
                    <img src={`http://localhost:3000${selectedJob.companyLogo}`} alt="logo" style={{ width: 80, height: 80, objectFit: 'contain', borderRadius: 12, border: '1px solid #eee', background: '#f8fafc' }} />
                  )}
                  <div>
                    <h2 style={{ margin: 0, fontSize: 32, fontWeight: 700, color: '#1a202c', letterSpacing: '-1px' }}>{selectedJob.title}</h2>
                    <div style={{ fontSize: 20, color: '#374151', fontWeight: 600, marginTop: 4 }}>{selectedJob.company}</div>
                  </div>
                </div>
                <div style={{ marginBottom: 16, color: '#222', fontSize: 18 }}>
                  <span style={{ fontWeight: 600 }}>Location:</span> {selectedJob.location} &nbsp; | &nbsp;
                  <span style={{ fontWeight: 600 }}>Type:</span> {selectedJob.type}
                </div>
                <div style={{ marginBottom: 16, color: '#222', fontSize: 18 }}>
                  <span style={{ fontWeight: 600 }}>Salary:</span> ₹{selectedJob.salaryMin} - ₹{selectedJob.salaryMax}
                </div>
                <div style={{ marginBottom: 18, color: '#374151', fontSize: 17, lineHeight: 1.7 }}>
                  <span style={{ fontWeight: 600, color: '#1a202c' }}>Description:</span> {selectedJob.description}
                </div>
                <div style={{ marginBottom: 10, color: '#374151', fontSize: 16 }}>
                  <span style={{ fontWeight: 600 }}>Status:</span> {selectedJob.status}
                </div>
                <div style={{ color: '#374151', fontSize: 16 }}>
                  <span style={{ fontWeight: 600 }}>Application Deadline:</span> {new Date(selectedJob.applicationDeadline).toLocaleString()}
                </div>
              </div>
            ) : null}
          </Modal>
        </Stack>
      </Container>
    </MainLayout>
  );
}
