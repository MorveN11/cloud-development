import { useEffect, useState } from 'react';

import { messaging } from '@/apps/firebase.app';
import { env } from '@/config/env.config';
import { useAuth } from '@/contexts/auth.context';
import { useUserActions } from '@/hooks/user/use-user-actions.hook';

import { getToken, onMessage } from 'firebase/messaging';
import { BellPlus } from 'lucide-react';
import { toast } from 'sonner';

export const useNotifications = () => {
  const { user } = useAuth();
  const { updateNotificationToken } = useUserActions();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const obtainToken = async () => {
      try {
        const currentToken = await getToken(messaging, {
          vapidKey: env.VITE_FIREBASE_VAPID_KEY,
        });

        if (currentToken) {
          setToken(currentToken);
        } else {
          console.warn('No registration token available. Request permission to generate one.');
        }
      } catch (error) {
        console.error('An error occurred while retrieving token. ', error);
      }
    };

    obtainToken();

    onMessage(messaging, (payload) => {
      toast(payload.notification?.title || 'New Notification!', {
        description: payload.notification?.body || 'You have a new message.',
        icon: <BellPlus className="size-5" />,
      });
    });
  }, []);

  useEffect(() => {
    if (!token || !user) {
      return;
    }
    const handleTokenUpdate = async () => {
      await updateNotificationToken(user.uid, token);
    };

    handleTokenUpdate();
  }, [token, user, updateNotificationToken]);

  return { token };
};
