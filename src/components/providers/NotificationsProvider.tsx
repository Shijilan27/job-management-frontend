'use client';

import { Notifications } from '@mantine/notifications';

export function NotificationsProvider() {
  return <Notifications position="top-right" zIndex={1000} />;
} 