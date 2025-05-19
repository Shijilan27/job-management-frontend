'use client';

import { Stack, Title, Badge, Group, Text, ActionIcon } from '@mantine/core';
import { Table } from '@mantine/core';
import { IconEye, IconDownload } from '@tabler/icons-react';
import { MainLayout } from '@/components/layout/MainLayout';

// This would come from an API in a real application
const APPLICATIONS = [
  {
    id: '1',
    jobTitle: 'Senior Frontend Developer',
    company: 'Tech Corp',
    appliedDate: '2024-02-20',
    status: 'pending',
    resumeUrl: '#',
  },
  {
    id: '2',
    jobTitle: 'Full Stack Engineer',
    company: 'Startup Inc',
    appliedDate: '2024-02-19',
    status: 'interviewing',
    resumeUrl: '#',
  },
  {
    id: '3',
    jobTitle: 'React Developer',
    company: 'Web Solutions',
    appliedDate: '2024-02-18',
    status: 'rejected',
    resumeUrl: '#',
  },
] as const;

const statusColors = {
  pending: 'blue',
  interviewing: 'yellow',
  accepted: 'green',
  rejected: 'red',
} as const;

export default function Applications() {
  return (
    <MainLayout>
      <Stack gap="lg">
        <Title>My Applications</Title>

        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Job Title</Table.Th>
              <Table.Th>Company</Table.Th>
              <Table.Th>Applied Date</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {APPLICATIONS.map((application) => (
              <Table.Tr key={application.id}>
                <Table.Td>
                  <Text fw={500}>{application.jobTitle}</Text>
                </Table.Td>
                <Table.Td>{application.company}</Table.Td>
                <Table.Td>{application.appliedDate}</Table.Td>
                <Table.Td>
                  <Badge 
                    color={statusColors[application.status]} 
                    variant="light"
                  >
                    {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Group gap="xs">
                    <ActionIcon variant="subtle" color="blue" aria-label="View application">
                      <IconEye size={16} />
                    </ActionIcon>
                    <ActionIcon variant="subtle" color="blue" aria-label="Download resume">
                      <IconDownload size={16} />
                    </ActionIcon>
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Stack>
    </MainLayout>
  );
} 