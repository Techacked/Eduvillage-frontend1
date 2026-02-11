import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/context/AuthContext';

export interface Notification {
  _id: string;
  title: string;
  message: string;
  createdAt: string;
  read?: boolean;
}

export const useNotifications = () => {
  const { user } = useAuth();

  const { data: notifications = [], isLoading, refetch } = useQuery<Notification[]>({
    queryKey: ['notifications', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE}/api/notify/user/${user.id}`
      );
      if (!res.ok) return [];
      return res.json();
    },
    refetchInterval: 5000, // Poll every 5 seconds
    enabled: !!user?.id,
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  return {
    notifications,
    unreadCount,
    isLoading,
    refetch,
  };
};
