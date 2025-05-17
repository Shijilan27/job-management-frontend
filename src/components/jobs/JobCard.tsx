'use client';

import { Card, Group, Text, Badge, Button, Stack } from '@mantine/core';
import Image from 'next/image';
import { IconClock, IconBriefcase, IconMapPin } from '@tabler/icons-react';

type JobStatus = 'applied' | 'saved' | 'interviewing' | 'offered' | 'rejected';

interface JobCardProps {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  postedDate: string;
  status: JobStatus;
}

export function JobCard({ title, company, location, type, postedDate }: JobCardProps) {
  return (
    <Card withBorder radius="md" p="md">
      <Card.Section p="md">
        <Group justify="space-between" align="flex-start">
          <Group gap="sm">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
              <Image
                src="/company-logo-placeholder.png"
                alt={company}
                width={32}
                height={32}
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
          <IconBriefcase size={16} />
          <Text size="sm">1-3 yr Exp</Text>
          <Text size="sm">•</Text>
          <Text size="sm">Onsite</Text>
          <Text size="sm">•</Text>
          <Text size="sm">12LPA</Text>
        </Group>
        <Group gap="xs" c="dimmed">
          <IconClock size={16} />
          <Text size="sm">{postedDate}</Text>
        </Group>
      </Stack>

      <Button fullWidth variant="light" color="blue" mt="md">
        Apply Now
      </Button>
    </Card>
  );
} 