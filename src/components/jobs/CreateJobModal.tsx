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
  Modal,
  FileInput,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import type { JobFormData } from '@/types/job';

interface CreateJobModalProps {
  opened: boolean;
  onClose: () => void;
  onJobCreated?: () => void;
}

export function CreateJobModal({ opened, onClose, onJobCreated }: CreateJobModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoError, setLogoError] = useState<string | null>(null);
  
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
      title: (value) => {
        if (!value) return 'Job title is required';
        if (value.length < 3) return 'Job title must be at least 3 characters long';
        if (value.length > 100) return 'Job title cannot exceed 100 characters';
        return null;
      },
      company: (value) => {
        if (!value) return 'Company name is required';
        if (value.length < 2) return 'Company name must be at least 2 characters long';
        if (value.length > 100) return 'Company name cannot exceed 100 characters';
        return null;
      },
      location: (value) => {
        if (!value) return 'Location is required';
        if (value.length > 100) return 'Location cannot exceed 100 characters';
        return null;
      },
      type: (value) => {
        if (!value) return 'Job type is required';
        const validTypes = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance'];
        if (!validTypes.includes(value)) {
          return 'Invalid job type';
        }
        return null;
      },
      salaryMin: (value) => {
        if (value < 0) return 'Minimum salary must be positive';
        return null;
      },
      salaryMax: (value, values) => {
        if (value < 0) return 'Maximum salary must be positive';
        if (value < values.salaryMin) {
          return 'Maximum salary must be greater than minimum salary';
        }
        return null;
      },
      applicationDeadline: (value) => {
        if (!value) return 'Application deadline is required';
        if (value < new Date()) {
          return 'Application deadline must be in the future';
        }
        return null;
      },
      description: (value) => {
        if (!value) return 'Job description is required';
        if (value.length < 50) return 'Job description must be at least 50 characters long';
        if (value.length > 5000) return 'Job description cannot exceed 5000 characters';
        return null;
      },
    },
  });

  const handleSubmit = async (values: JobFormData, isDraft: boolean = false) => {
    try {
      setIsSubmitting(true);
      setLogoError(null);
      
      const validation = form.validate();
      if (validation.hasErrors) {
        throw new Error('Please fix the form errors before submitting');
      }

      // Logo validation
      if (logoFile) {
        if (!logoFile.type.startsWith('image/')) {
          setLogoError('Logo must be an image file');
          setIsSubmitting(false);
          return;
        }
        if (logoFile.size > 5 * 1024 * 1024) {
          setLogoError('Logo must be less than 5MB');
          setIsSubmitting(false);
          return;
        }
      }

      // Use FormData for file upload
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value as any);
      });
      formData.append('status', isDraft ? 'draft' : 'published');
      if (logoFile) {
        formData.append('companyLogo', logoFile);
      }

      const response = await fetch('https://job-management-backend.onrender.com/jobs', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      let errorMessage = 'Failed to create job posting';
      
      if (!response.ok) {
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.errors?.[0]?.message || response.statusText;
          console.error('Server error:', errorData);
        } catch (parseError) {
          console.error('Error parsing response:', parseError);
          errorMessage = response.statusText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log('Success response:', data);
      
      notifications.show({
        title: isDraft ? 'Draft Saved' : 'Job Posted',
        message: isDraft 
          ? 'Your job posting has been saved as a draft'
          : 'Your job posting has been published successfully',
        color: 'green',
      });

      form.reset();
      onClose();
      
      if (onJobCreated) {
        onJobCreated();
      }
    } catch (error) {
      console.error('Error creating job:', error);
      notifications.show({
        title: 'Error',
        message: error instanceof Error ? error.message : 'An error occurred',
        color: 'red',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const headingStyles = {
    fontSize: '16px',
    fontWeight: 700,
    color: '#222222',
    fontFamily: 'var(--font-satoshi)',
  };

  const inputStyles = {
    input: {
      height: '45px',
      border: '1px solid #E5E5E5',
      borderRadius: '10px',
      fontSize: '16px',
      fontFamily: 'var(--font-satoshi)',
      color: '#000000',
      fontWeight: 700,
      backgroundColor: '#FFFFFF',
      '&::placeholder': {
        color: '#000000',
        fontWeight: 600,
        opacity: 0.7,
      },
      '&:focus': {
        borderColor: '#00AAFF',
      },
    },
    dropdown: {
      backgroundColor: '#FFFFFF',
      border: '1px solid #E5E5E5',
      '& [data-selected]': {
        color: '#000000',
        fontWeight: 700,
        backgroundColor: '#F5F5F5',
      },
    },
    option: {
      color: '#000000',
      fontWeight: 600,
      '&:hover': {
        backgroundColor: '#F5F5F5',
      },
    },
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      size={600}
      centered
      title="Create Job Opening"
      styles={{
        title: {
          fontFamily: 'var(--font-satoshi)',
          fontWeight: 700,
          fontSize: '20px',
          color: '#222222',
          textAlign: 'center',
          width: '100%',
        },
        header: {
          padding: '20px 20px 0 20px',
          marginBottom: 0,
        },
        content: {
          background: 'rgba(255, 255, 255, 0.95)',
        },
        body: {
          padding: '20px',
        },
      }}
      overlayProps={{
        backgroundOpacity: 0.15,
        blur: 2,
      }}
    >
      <form onSubmit={form.onSubmit((values) => handleSubmit(values, false))}>
        <Stack gap="xs">
          {/* Job Title and Company Name */}
          <Group grow>
            <Box>
              <Text style={headingStyles} mb={4}>Job Title</Text>
              <TextInput
                placeholder="Full Stack Developer"
                styles={inputStyles}
                {...form.getInputProps('title')}
              />
            </Box>
            <Box>
              <Text style={headingStyles} mb={4}>Company Name</Text>
              <TextInput
                placeholder="Amazon, Microsoft, Swiggy"
                styles={inputStyles}
                {...form.getInputProps('company')}
              />
            </Box>
          </Group>

          {/* Location and Job Type */}
          <Group grow>
            <Box>
              <Text style={headingStyles} mb={4}>Location</Text>
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
            <Box>
              <Text style={headingStyles} mb={4}>Job Type</Text>
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
          </Group>

          {/* Salary Range */}
          <Box>
            <Text style={headingStyles} mb={4}>Salary Range</Text>
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
            <Text style={headingStyles} mb={4}>Application Deadline</Text>
            <DateInput
              placeholder="Select a date"
              minDate={new Date()}
              styles={inputStyles}
              {...form.getInputProps('applicationDeadline')}
            />
          </Box>

          {/* Job Description */}
          <Box>
            <Text style={headingStyles} mb={4}>Job Description</Text>
            <Textarea
              placeholder="Please share a description to let the candidate know more about the job role"
              minRows={3}
              styles={{
                ...inputStyles,
                input: {
                  ...inputStyles.input,
                  height: '120px',
                },
              }}
              {...form.getInputProps('description')}
            />
          </Box>

          {/* Company Logo Upload */}
          <Box>
            <Text style={headingStyles} mb={4}>Company Logo (max 5MB)</Text>
            <FileInput
              placeholder="Upload company logo"
              accept="image/*"
              value={logoFile}
              onChange={setLogoFile}
              error={logoError}
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
    </Modal>
  );
} 