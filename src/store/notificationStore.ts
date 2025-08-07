import { create } from "zustand";
import type { NotificationState } from "../types";

interface NotificationStore {
  notifications: NotificationState[];

  addNotification: (notification: Omit<NotificationState, "id">) => void;
  removeNotification: (id: string) => void;
}

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  notifications: [],
  addNotification: (notification) => {
    const id = Date.now().toString();
    const newNotification = { ...notification, id };
    set((state) => ({
      notifications: [...state.notifications, newNotification],
    }));

    // Auto remove after duration
    setTimeout(() => {
      get().removeNotification(id);
    }, notification.duration || 5000);
  },

  removeNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    }));
  },
}));
