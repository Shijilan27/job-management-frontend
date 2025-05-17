import { Stack, Title, Paper, TextInput, Textarea, Button, Group, Avatar, FileInput, Switch } from '@mantine/core';
import { IconUpload } from '@tabler/icons-react';
import { MainLayout } from '@/components/layout/MainLayout';

export default function Profile() {
  return (
    <MainLayout>
      <Stack gap="lg">
        <Title>Profile Settings</Title>

        <Paper shadow="xs" p="md" radius="md">
          <Stack gap="md">
            <Group>
              <Avatar size="xl" radius="xl" />
              <FileInput
                placeholder="Change profile picture"
                accept="image/*"
                leftSection={<IconUpload size={16} />}
              />
            </Group>

            <TextInput
              label="Full Name"
              placeholder="John Doe"
              defaultValue="John Doe"
            />

            <TextInput
              label="Email"
              placeholder="your@email.com"
              defaultValue="john@example.com"
            />

            <TextInput
              label="Phone"
              placeholder="+1 234 567 8900"
              defaultValue="+1 234 567 8900"
            />

            <TextInput
              label="LinkedIn Profile"
              placeholder="https://linkedin.com/in/yourprofile"
            />

            <TextInput
              label="Portfolio Website"
              placeholder="https://yourportfolio.com"
            />

            <Textarea
              label="Professional Summary"
              placeholder="Write a brief summary of your professional experience..."
              minRows={4}
            />

            <Title order={3} mt="md">Preferences</Title>

            <Switch
              label="Email notifications for new job matches"
              defaultChecked
            />

            <Switch
              label="Email notifications for application updates"
              defaultChecked
            />

            <Switch
              label="Make profile visible to recruiters"
            />

            <Group justify="flex-end" mt="xl">
              <Button variant="light">Cancel</Button>
              <Button>Save Changes</Button>
            </Group>
          </Stack>
        </Paper>
      </Stack>
    </MainLayout>
  );
} 