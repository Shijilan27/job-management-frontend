'use client';

import { Card, Group, Text, Badge, Button, Stack } from '@mantine/core';
import Image from 'next/image';
import { IconClock, IconBriefcase, IconMapPin } from '@tabler/icons-react';

type JobStatus = 'applied' | 'saved' | 'interviewing' | 'offered' | 'rejected';

interface JobCardProps {
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  type: string;
  salaryMin: number;
  salaryMax: number;
  publishedAt: string | null;
}

export function JobCard({ title, company, companyLogo, location, type, salaryMin, salaryMax, publishedAt }: JobCardProps) {
  return (
    <Card withBorder radius="md" p="md">
      <Card.Section p="md">
        <Group justify="space-between" align="flex-start">
          <Group gap="sm">
            <div style={{ 
              width: '48px', 
              height: '48px', 
              borderRadius: '50%',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#F8F9FA',
              border: '1px solid var(--mantine-color-gray-2)',
            }}>
              <Image
                src={companyLogo || '/company-logos/placeholder.png'}
                alt={company}
                width={32}
                height={32}
                style={{
                  objectFit: 'contain',
                }}
              />
            </div>
            <div>
              <Text size="lg" fw={500} className="line-clamp-1">
                {title}
              </Text>
              <Text size="sm" c="dimmed">
                {company}
              </Text>
            </div>
          </Group>
          <Badge variant="light" color="blue">
            {type}
          </Badge>
        </Group>
      </Card.Section>

      <Stack gap="xs" mt="md">
        <Group gap="xs" c="dimmed">
          <IconMapPin size={16} />
          <Text size="sm">{location}</Text>
        </Group>
        <Group gap="xs" c="dimmed">
          <Text size="sm">₹{salaryMin} - ₹{salaryMax}</Text>
        </Group>
        <Group gap="xs" c="dimmed">
          <IconClock size={16} />
          <Text size="sm">{publishedAt ? new Date(publishedAt).toLocaleDateString() : ''}</Text>
        </Group>
      </Stack>

      <Button fullWidth variant="light" color="blue" mt="md">
        Apply Now
      </Button>
    </Card>
  );
} 