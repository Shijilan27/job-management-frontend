import { useForm } from '@mantine/form';
import { TextInput, Textarea, Button, Stack, Group, FileInput } from '@mantine/core';
import { IconUpload } from '@tabler/icons-react';

interface ApplicationFormProps {
  jobId: string;
  jobTitle: string;
  onSubmit: (values: ApplicationFormValues) => void;
}

interface ApplicationFormValues {
  fullName: string;
  email: string;
  phone: string;
  coverLetter: string;
  resume: File | null;
  linkedIn?: string;
  portfolio?: string;
}

export function ApplicationForm({ jobId, jobTitle, onSubmit }: ApplicationFormProps) {
  const form = useForm<ApplicationFormValues>({
    initialValues: {
      fullName: '',
      email: '',
      phone: '',
      coverLetter: '',
      resume: null,
      linkedIn: '',
      portfolio: '',
    },
    validate: {
      fullName: (value) => (value.length < 2 ? 'Name is too short' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      phone: (value) => (value.length < 10 ? 'Invalid phone number' : null),
      coverLetter: (value) => (value.length < 50 ? 'Cover letter is too short' : null),
      resume: (value) => (!value ? 'Resume is required' : null),
    },
  });

  const handleSubmit = form.onSubmit((values) => {
    onSubmit(values);
  });

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap="md">
        <TextInput
          required
          label="Full Name"
          placeholder="John Doe"
          {...form.getInputProps('fullName')}
        />

        <TextInput
          required
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps('email')}
        />

        <TextInput
          required
          label="Phone"
          placeholder="+1 234 567 8900"
          {...form.getInputProps('phone')}
        />

        <TextInput
          label="LinkedIn Profile"
          placeholder="https://linkedin.com/in/yourprofile"
          {...form.getInputProps('linkedIn')}
        />

        <TextInput
          label="Portfolio Website"
          placeholder="https://yourportfolio.com"
          {...form.getInputProps('portfolio')}
        />

        <Textarea
          required
          label="Cover Letter"
          placeholder="Tell us why you're interested in this position..."
          minRows={4}
          {...form.getInputProps('coverLetter')}
        />

        <FileInput
          required
          label="Resume"
          placeholder="Upload your resume"
          accept="application/pdf,application/msword"
          leftSection={<IconUpload size={16} />}
          {...form.getInputProps('resume')}
        />

        <Group justify="flex-end" mt="md">
          <Button type="submit">Submit Application</Button>
        </Group>
      </Stack>
    </form>
  );
} 