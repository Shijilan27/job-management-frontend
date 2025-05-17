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
} from '@mantine/core';
import { IconSearch, IconMapPin, IconUserSearch, IconClock, IconCurrencyDollar } from '@tabler/icons-react';
import { MainLayout } from '@/components/layout/MainLayout';

type JobStatus = 'applied' | 'saved' | 'interviewing' | 'offered' | 'rejected';

interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  type: string;
  experience: string;
  onsite: string;
  salary: string;
  postedDate: string;
  status: JobStatus;
}

const SAMPLE_JOBS: Job[] = [
  {
    id: '1',
    title: 'Full Stack Developer',
    company: 'Amazon',
    companyLogo: '/amazon-logo.svg',
    location: 'Onsite',
    type: 'Full-time',
    experience: '1-3 yr Exp',
    onsite: 'Onsite',
    salary: '12LPA',
    postedDate: '24h Ago',
    status: 'saved',
  },
  {
    id: '2',
    title: 'Node.Js Developer',
    company: 'Tesla',
    companyLogo: '/tesla-logo.svg',
    location: 'Onsite',
    type: 'Full-time',
    experience: '1-3 yr Exp',
    onsite: 'Onsite',
    salary: '12LPA',
    postedDate: '24h Ago',
    status: 'applied',
  },
  {
    id: '3',
    title: 'UX/UI Designer',
    company: 'Google',
    companyLogo: '/google-logo.svg',
    location: 'Onsite',
    type: 'Full-time',
    experience: '1-3 yr Exp',
    onsite: 'Onsite',
    salary: '12LPA',
    postedDate: '24h Ago',
    status: 'interviewing',
  },
];

function JobCard({ job }: { job: Job }) {
  return (
    <Card
      radius="md"
      p="md"
      withBorder
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 200ms ease, box-shadow 200ms ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 'var(--mantine-shadow-md)',
        },
      }}
    >
      {/* Header Section */}
      <Box mb="md">
        <Group justify="space-between" mb="xs" align="flex-start">
          <Avatar 
            src={job.companyLogo} 
            size={50}
            radius="xl"
            styles={{
              root: {
                border: '1px solid var(--mantine-color-gray-2)',
                background: 'white',
              },
              image: {
                objectFit: 'contain',
                padding: '4px',
              },
            }}
          />
          <Badge 
            color="blue" 
            variant="light" 
            size="lg"
            style={{
              padding: '8px 12px',
              fontSize: '0.9rem',
            }}
          >
            {job.postedDate}
          </Badge>
        </Group>
        <Text size="xl" fw={600} c="dark.9" mt="xs">
          {job.title}
        </Text>
        <Text size="md" c="gray.6">
          {job.company}
        </Text>
      </Box>

      {/* Job Details Section */}
      <Box style={{ flex: 1 }}>
        <Group gap={8}>
          <Group gap={6}>
            <IconClock style={{ width: rem(18), height: rem(18), color: 'var(--mantine-color-gray-6)' }} />
            <Text size="sm" c="gray.7">{job.experience}</Text>
          </Group>
          <Text size="sm" c="gray.5">•</Text>
          <Group gap={6}>
            <IconMapPin style={{ width: rem(18), height: rem(18), color: 'var(--mantine-color-gray-6)' }} />
            <Text size="sm" c="gray.7">{job.onsite}</Text>
          </Group>
          <Text size="sm" c="gray.5">•</Text>
          <Group gap={6}>
            <IconCurrencyDollar style={{ width: rem(18), height: rem(18), color: 'var(--mantine-color-gray-6)' }} />
            <Text size="sm" c="gray.7">{job.salary}</Text>
          </Group>
        </Group>

        <Text size="sm" mt="md" mb="xl" c="gray.7" lineClamp={2}>
          A user-friendly interface lets you browse stunning photos and videos. Filter destinations based on interests and travel style, and create personalized
        </Text>
      </Box>

      {/* Button Section */}
      <Button 
        variant="light" 
        color="blue" 
        fullWidth
        size="md"
        style={{
          marginTop: 'auto',
          transition: 'transform 150ms ease, background-color 150ms ease',
          '&:hover': {
            transform: 'translateY(-1px)',
            backgroundColor: 'var(--mantine-color-blue-1)',
          },
        }}
      >
        Apply Now
      </Button>
    </Card>
  );
}

export default function Home() {
  const [salaryRange, setSalaryRange] = useState<[number, number]>([50, 180]);
  const [opened, setOpened] = useState(false);

  return (
    <MainLayout>
      <Container size="xl" py="xl">
        <Stack gap="xl">
          <Group grow>
            <TextInput
              size="md"
              placeholder="Search By Job Title, Role"
              leftSection={<IconSearch style={{ width: rem(16), height: rem(16), color: 'var(--mantine-color-gray-6)' }} />}
              styles={{
                input: {
                  '&::placeholder': {
                    color: 'var(--mantine-color-gray-6)',
                  },
                },
                section: { 
                  pointerEvents: 'none',
                },
              }}
            />
            <Select
              size="md"
              placeholder="Preferred Location"
              leftSection={<IconMapPin style={{ width: rem(16), height: rem(16), color: 'var(--mantine-color-gray-6)' }} />}
              data={['Remote', 'New York, NY', 'San Francisco, CA', 'London, UK']}
              styles={{
                input: {
                  '&::placeholder': {
                    color: 'var(--mantine-color-gray-6)',
                  },
                },
                section: { 
                  pointerEvents: 'none',
                },
              }}
            />
            <Select
              size="md"
              placeholder="Job type"
              leftSection={<IconUserSearch style={{ width: rem(16), height: rem(16), color: 'var(--mantine-color-gray-6)' }} />}
              data={['Full-time', 'Part-time', 'Contract', 'Internship']}
              styles={{
                input: {
                  '&::placeholder': {
                    color: 'var(--mantine-color-gray-6)',
                  },
                },
                section: { 
                  pointerEvents: 'none',
                },
              }}
            />
            <Popover opened={opened} onChange={setOpened} width="target" position="bottom">
              <Popover.Target>
                <TextInput
                  size="md"
                  readOnly
                  value={`₹${salaryRange[0]}k - ₹${salaryRange[1]}k`}
                  placeholder="Salary Range"
                  leftSection={<IconCurrencyDollar style={{ width: rem(16), height: rem(16), color: 'var(--mantine-color-gray-6)' }} />}
                  onClick={() => setOpened((o) => !o)}
                  styles={{
                    input: {
                      '&::placeholder': {
                        color: 'var(--mantine-color-gray-6)',
                      },
                      cursor: 'pointer',
                    },
                    section: { 
                      pointerEvents: 'none',
                    },
                  }}
                />
              </Popover.Target>
              <Popover.Dropdown>
                <Box p="md" style={{ width: '100%', minWidth: '250px' }}>
                  <Text size="sm" fw={500} mb="md">Salary Range</Text>
                  <RangeSlider
                    min={0}
                    max={200}
                    value={salaryRange}
                    onChange={setSalaryRange}
                    size="md"
                    radius="xl"
                    color="blue"
                    marks={[
                      { value: 0, label: '₹0k' },
                      { value: 100, label: '₹100k' },
                      { value: 200, label: '₹200k' },
                    ]}
                    styles={{
                      markLabel: {
                        color: 'var(--mantine-color-gray-7)',
                        fontSize: '0.875rem',
                      },
                      thumb: {
                        borderWidth: 2,
                        height: 24,
                        width: 24,
                        backgroundColor: 'white',
                      },
                      track: {
                        height: 8,
                      },
                    }}
                  />
                </Box>
              </Popover.Dropdown>
            </Popover>
          </Group>

          <SimpleGrid 
            cols={{ base: 1, sm: 2, md: 3 }} 
            spacing="xl"
            verticalSpacing="xl"
          >
            {SAMPLE_JOBS.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </SimpleGrid>
        </Stack>
      </Container>
    </MainLayout>
  );
}
