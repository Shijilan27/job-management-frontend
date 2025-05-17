'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  TextInput,
  Select,
  NumberInput,
  Textarea,
  Button,
  Stack,
  Group,
  Paper,
  Container,
  Title,
  Grid,
  Text,
  Tabs,
  rem,
  Box,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconBriefcase, IconBuilding, IconFileDescription } from '@tabler/icons-react';
import { MainLayout } from '@/components/layout/MainLayout';
import type { JobFormData } from '@/types/job';

const HOVER_TRANSITION = 'transform 200ms ease, box-shadow 200ms ease';

export default function CreateJobPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('basic');
  
  const form = useForm<JobFormData>({
    initialValues: {
      title: '',
      company: '',
      location: '',
      type: 'Full-time',
      salaryMin: 0,
      salaryMax: 0,
      applicationDeadline: new Date(),
      description: '',
    },
    validate: {
      title: (value) => !value ? 'Job title is required' : null,
      company: (value) => !value ? 'Company name is required' : null,
      location: (value) => !value ? 'Location is required' : null,
      type: (value) => !value ? 'Job type is required' : null,
      salaryMin: (value) => value < 0 ? 'Minimum salary must be positive' : null,
      salaryMax: (value, values) => 
        value < values.salaryMin 
          ? 'Maximum salary must be greater than minimum salary' 
          : null,
      description: (value) => 
        !value 
          ? 'Job description is required'
          : value.length < 50 
          ? 'Job description must be at least 50 characters long'
          : null,
    },
  });

  const handleSubmit = async (values: JobFormData, isDraft: boolean = false) => {
    try {
      setIsSubmitting(true);
      
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...values,
          status: isDraft ? 'draft' : 'published',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create job posting');
      }

      notifications.show({
        title: isDraft ? 'Draft Saved' : 'Job Posted',
        message: isDraft 
          ? 'Your job posting has been saved as a draft'
          : 'Your job posting has been published successfully',
        color: 'green',
      });

      if (!isDraft) {
        router.push('/jobs');
      }
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: error instanceof Error ? error.message : 'An error occurred',
        color: 'red',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MainLayout>
      <Container size="lg" py="xl">
        <Paper radius="lg" p={0} withBorder>
          <Box p="xl" bg="var(--mantine-color-blue-0)" style={{ borderTopLeftRadius: 'var(--mantine-radius-lg)', borderTopRightRadius: 'var(--mantine-radius-lg)' }}>
            <Title order={2}>Create Job Opening</Title>
            <Text c="dimmed" mt="xs">Fill in the details below to create a new job posting</Text>
          </Box>
          
          <form onSubmit={form.onSubmit((values) => handleSubmit(values, false))}>
            <Tabs value={activeTab} onChange={(value) => setActiveTab(value as string)} px="xl">
              <Tabs.List>
                <Tabs.Tab 
                  value="basic" 
                  leftSection={<IconBriefcase style={{ width: rem(16), height: rem(16) }} />}
                >
                  Basic Information
                </Tabs.Tab>
                <Tabs.Tab 
                  value="company" 
                  leftSection={<IconBuilding style={{ width: rem(16), height: rem(16) }} />}
                >
                  Company Details
                </Tabs.Tab>
                <Tabs.Tab 
                  value="description" 
                  leftSection={<IconFileDescription style={{ width: rem(16), height: rem(16) }} />}
                >
                  Job Description
                </Tabs.Tab>
              </Tabs.List>

              <Box p="xl">
                <Tabs.Panel value="basic">
                  <Stack gap="md">
                    <Paper p="md" radius="md" withBorder style={{ 
                      transition: HOVER_TRANSITION,
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: 'var(--mantine-shadow-md)',
                      }
                    }}>
                      <Text size="sm" fw={500} mb="xs" c="dimmed">Job Details</Text>
                      <Grid gutter="md">
                        <Grid.Col span={{ base: 12, md: 6 }}>
                          <TextInput
                            label="Job Title"
                            placeholder="Full Stack Developer"
                            {...form.getInputProps('title')}
                          />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                          <Select
                            label="Job Type"
                            placeholder="Full-time"
                            data={[
                              'Full-time',
                              'Part-time',
                              'Contract',
                              'Internship',
                              'Freelance'
                            ]}
                            {...form.getInputProps('type')}
                          />
                        </Grid.Col>
                      </Grid>
                    </Paper>
                  </Stack>
                </Tabs.Panel>

                <Tabs.Panel value="company">
                  <Stack gap="md">
                    <Paper p="md" radius="md" withBorder style={{ 
                      transition: HOVER_TRANSITION,
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: 'var(--mantine-shadow-md)',
                      }
                    }}>
                      <Text size="sm" fw={500} mb="xs" c="dimmed">Company Information</Text>
                      <Grid gutter="md">
                        <Grid.Col span={{ base: 12, md: 6 }}>
                          <TextInput
                            label="Company Name"
                            placeholder="Amazon, Microsoft, Swiggy"
                            {...form.getInputProps('company')}
                          />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                          <Select
                            label="Location"
                            placeholder="Choose Preferred Location"
                            data={[
                              'Remote',
                              'New York, NY',
                              'San Francisco, CA',
                              'London, UK',
                              'Bangalore, India'
                            ]}
                            {...form.getInputProps('location')}
                          />
                        </Grid.Col>
                      </Grid>
                    </Paper>

                    <Paper p="md" radius="md" withBorder style={{ 
                      transition: HOVER_TRANSITION,
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: 'var(--mantine-shadow-md)',
                      }
                    }}>
                      <Text size="sm" fw={500} mb="xs" c="dimmed">Compensation</Text>
                      <Grid gutter="md">
                        <Grid.Col span={{ base: 12, md: 6 }}>
                          <Group grow>
                            <NumberInput
                              label="Minimum Salary"
                              placeholder="₹ 7.5"
                              min={0}
                              {...form.getInputProps('salaryMin')}
                            />
                            <NumberInput
                              label="Maximum Salary"
                              placeholder="₹ 12,00,000"
                              min={0}
                              {...form.getInputProps('salaryMax')}
                            />
                          </Group>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                          <DateInput
                            label="Application Deadline"
                            placeholder="Select a date"
                            minDate={new Date()}
                            {...form.getInputProps('applicationDeadline')}
                          />
                        </Grid.Col>
                      </Grid>
                    </Paper>
                  </Stack>
                </Tabs.Panel>

                <Tabs.Panel value="description">
                  <Paper p="md" radius="md" withBorder style={{ 
                    transition: HOVER_TRANSITION,
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: 'var(--mantine-shadow-md)',
                    }
                  }}>
                    <Text size="sm" fw={500} mb="xs" c="dimmed">Job Description</Text>
                    <Textarea
                      label="Detailed Description"
                      placeholder="Please share a description to let the candidate know more about the job role"
                      minRows={6}
                      {...form.getInputProps('description')}
                    />
                  </Paper>
                </Tabs.Panel>
              </Box>
            </Tabs>

            <Box px="xl" pb="xl">
              <Group justify="flex-end" mt="xl">
                <Button 
                  variant="default" 
                  onClick={() => handleSubmit(form.values, true)}
                  loading={isSubmitting}
                >
                  Save Draft
                </Button>
                <Button 
                  type="submit" 
                  loading={isSubmitting}
                  style={{ 
                    transition: 'transform 150ms ease',
                    '&:hover': {
                      transform: 'scale(1.02)',
                    }
                  }}
                >
                  Publish Job
                </Button>
              </Group>
            </Box>
          </form>
        </Paper>
      </Container>
    </MainLayout>
  );
}
