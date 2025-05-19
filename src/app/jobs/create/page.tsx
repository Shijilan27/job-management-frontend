'use client';

import { useState } from 'react';
import {
  TextInput,
  Select,
  NumberInput,
  Textarea,
  Button,
  Stack,
  Group,
  Box,
  Title,
  Text,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import type { JobFormData } from '@/types/job';

export default function CreateJobPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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
      description: (value) => !value ? 'Job description is required' : null,
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

  const inputStyles = {
    input: {
      height: '45px',
      border: '1px solid #BCBCBC',
      borderRadius: '10px',
      fontSize: '14px',
      fontFamily: 'var(--font-satoshi)',
      '&:focus': {
        borderColor: '#00AAFF',
      },
    },
  };

  return (
    <Box 
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: '700px',
        background: '#FFFFFF',
        borderRadius: '20px',
        padding: '20px',
      }}
    >
      <Title
        order={2}
        style={{
          textAlign: 'center',
          marginBottom: '20px',
          fontFamily: 'var(--font-satoshi)',
          fontWeight: 700,
          fontSize: '20px',
          color: '#222222',
        }}
      >
        Create Job Opening
      </Title>

      <form onSubmit={form.onSubmit((values) => handleSubmit(values, false))}>
        <Stack gap="xs">
          {/* Job Title */}
          <Box>
            <Text size="sm" fw={600} mb={4}>Job Title</Text>
            <TextInput
              placeholder="Full Stack Developer"
              styles={inputStyles}
              {...form.getInputProps('title')}
            />
          </Box>

          {/* Company Name */}
          <Box>
            <Text size="sm" fw={600} mb={4}>Company Name</Text>
            <TextInput
              placeholder="Amazon, Microsoft, Swiggy"
              styles={inputStyles}
              {...form.getInputProps('company')}
            />
          </Box>

          {/* Location */}
          <Box>
            <Text size="sm" fw={600} mb={4}>Location</Text>
            <Select
              placeholder="Choose Preferred Location"
              data={[
                'Remote',
                'New York, NY',
                'San Francisco, CA',
                'London, UK',
                'Bangalore, India'
              ]}
              styles={inputStyles}
              {...form.getInputProps('location')}
            />
          </Box>

          {/* Job Type */}
          <Box>
            <Text size="sm" fw={600} mb={4}>Job Type</Text>
            <Select
              placeholder="Full-time"
              data={[
                'Full-time',
                'Part-time',
                'Contract',
                'Internship',
                'Freelance'
              ]}
              styles={inputStyles}
              {...form.getInputProps('type')}
            />
          </Box>

          {/* Salary Range */}
          <Box>
            <Text size="sm" fw={600} mb={4}>Salary Range</Text>
            <Group grow>
              <NumberInput
                placeholder="₹0"
                min={0}
                styles={inputStyles}
                {...form.getInputProps('salaryMin')}
              />
              <NumberInput
                placeholder="₹12,00,000"
                min={0}
                styles={inputStyles}
                {...form.getInputProps('salaryMax')}
              />
            </Group>
          </Box>

          {/* Application Deadline */}
          <Box>
            <Text size="sm" fw={600} mb={4}>Application Deadline</Text>
            <DateInput
              placeholder="Select a date"
              minDate={new Date()}
              styles={inputStyles}
              {...form.getInputProps('applicationDeadline')}
            />
          </Box>

          {/* Job Description */}
          <Box>
            <Text size="sm" fw={600} mb={4}>Job Description</Text>
            <Textarea
              placeholder="Please share a description to let the candidate know more about the job role"
              minRows={3}
              styles={{
                ...inputStyles,
                input: {
                  ...inputStyles.input,
                  height: '80px',
                },
              }}
              {...form.getInputProps('description')}
            />
          </Box>

          {/* Buttons */}
          <Group justify="space-between" mt="md">
            <Button
              variant="default"
              onClick={() => handleSubmit(form.values, true)}
              loading={isSubmitting}
              style={{
                height: '40px',
                background: '#FFFFFF',
                border: '1.5px solid #222222',
                boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.25)',
                borderRadius: '10px',
                fontFamily: 'var(--font-satoshi)',
                fontWeight: 600,
                fontSize: '16px',
                color: '#222222',
              }}
            >
              Save Draft
            </Button>
            <Button
              type="submit"
              loading={isSubmitting}
              style={{
                height: '40px',
                background: '#00AAFF',
                borderRadius: '10px',
                fontFamily: 'var(--font-satoshi)',
                fontWeight: 600,
                fontSize: '16px',
                color: '#FFFFFF',
              }}
            >
              Publish
            </Button>
          </Group>
        </Stack>
      </form>
    </Box>
  );
} 