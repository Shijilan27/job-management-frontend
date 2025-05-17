import { Stack, Title, Text, Badge, Group, Button, Paper, Grid, List } from '@mantine/core';
import { IconBuilding, IconCalendar, IconMapPin, IconClock, IconCurrency, IconBriefcase } from '@tabler/icons-react';
import { MainLayout } from '@/components/layout/MainLayout';

// This would come from an API in a real application
const JOB_DETAILS = {
  id: '1',
  title: 'Senior Frontend Developer',
  company: 'Tech Corp',
  location: 'New York, NY',
  type: 'Full-time',
  salary: '$120,000 - $150,000',
  experience: '5+ years',
  postedDate: '2024-02-20',
  status: 'active',
  description: 'We are looking for a Senior Frontend Developer to join our team. The ideal candidate will have:\n\n' +
    '• Strong experience with React, TypeScript, and modern frontend frameworks\n' +
    '• Experience with state management solutions (Redux, MobX, etc.)\n' +
    '• Knowledge of modern CSS and CSS-in-JS solutions\n' +
    '• Understanding of web performance optimization\n' +
    '• Experience with testing frameworks',
  requirements: [
    'Bachelor\'s degree in Computer Science or related field',
    '5+ years of frontend development experience',
    'Strong proficiency in JavaScript/TypeScript',
    'Experience with React and modern frontend frameworks',
    'Excellent problem-solving skills',
    'Strong communication skills',
  ],
  benefits: [
    'Competitive salary',
    'Health, dental, and vision insurance',
    'Flexible working hours',
    '401(k) matching',
    'Remote work options',
    'Professional development budget',
  ],
};

export default function JobDetails() {
  return (
    <MainLayout>
      <Stack gap="xl">
        <Paper shadow="xs" p="md" radius="md">
          <Stack gap="md">
            <Group justify="space-between" align="flex-start">
              <Stack gap="xs">
                <Title order={2}>{JOB_DETAILS.title}</Title>
                <Group gap="xs">
                  <IconBuilding size={16} />
                  <Text>{JOB_DETAILS.company}</Text>
                </Group>
              </Stack>
              <Button size="lg">Apply Now</Button>
            </Group>

            <Grid>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Group gap="lg">
                  <Group gap="xs">
                    <IconMapPin size={16} />
                    <Text size="sm">{JOB_DETAILS.location}</Text>
                  </Group>
                  <Group gap="xs">
                    <IconBriefcase size={16} />
                    <Text size="sm">{JOB_DETAILS.type}</Text>
                  </Group>
                  <Group gap="xs">
                    <IconClock size={16} />
                    <Text size="sm">{JOB_DETAILS.experience}</Text>
                  </Group>
                </Group>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Group gap="lg">
                  <Group gap="xs">
                    <IconCurrency size={16} />
                    <Text size="sm">{JOB_DETAILS.salary}</Text>
                  </Group>
                  <Group gap="xs">
                    <IconCalendar size={16} />
                    <Text size="sm">Posted {JOB_DETAILS.postedDate}</Text>
                  </Group>
                </Group>
              </Grid.Col>
            </Grid>
          </Stack>
        </Paper>

        <Grid>
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Stack gap="lg">
              <Paper shadow="xs" p="md" radius="md">
                <Title order={3} mb="md">Job Description</Title>
                <Text style={{ whiteSpace: 'pre-line' }}>{JOB_DETAILS.description}</Text>
              </Paper>

              <Paper shadow="xs" p="md" radius="md">
                <Title order={3} mb="md">Requirements</Title>
                <List>
                  {JOB_DETAILS.requirements.map((req, index) => (
                    <List.Item key={index}>{req}</List.Item>
                  ))}
                </List>
              </Paper>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Paper shadow="xs" p="md" radius="md">
              <Title order={3} mb="md">Benefits</Title>
              <List>
                {JOB_DETAILS.benefits.map((benefit, index) => (
                  <List.Item key={index}>{benefit}</List.Item>
                ))}
              </List>
            </Paper>
          </Grid.Col>
        </Grid>
      </Stack>
    </MainLayout>
  );
} 