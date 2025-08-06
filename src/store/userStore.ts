import { create } from "zustand";
import type { UserFormData, UserState } from "../types/user.type";
import { userApi } from "../api/userApi";
import {
  DEFAULT_PAGE,
  DEFAULT_LIMIT,
  DEFAULT_TOTAL,
  DEFAULT_TOTAL_PAGES,
} from "../utils/constants";
import { useNotificationStore } from "./notificationStore";
import { useLanguage } from "./i18nStore";

export const useUserStore = create<UserState>((set, get) => ({
  users: [],
  loading: false,
  error: null,
  selectedUser: null,
  pagination: {
    page: DEFAULT_PAGE,
    limit: DEFAULT_LIMIT,
    total: DEFAULT_TOTAL,
    totalPages: DEFAULT_TOTAL_PAGES,
  },

  // actions
  fetchUsers: async () => {
    set({ loading: true, error: null });
    try {
      const { pagination } = get();
      const response = await userApi.getUsers({
        page: pagination.page,
        limit: pagination.limit,
      });
      set({
        users: response.data,
        pagination: response.meta,
        loading: false,
        selectedUser: null, // Clear selection after fetch
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to fetch users",
        loading: false,
      });
    }
  },
  setSelectedUser: async (user) => set({ selectedUser: user }),
  createUser: async (user: UserFormData) => {
    set({ loading: true, error: null });
    try {
      const newUser = await userApi.createUser(user);
      set((state) => ({
        users: [newUser, ...state.users],
        loading: false,
      }));
      useNotificationStore.getState().addNotification({
        type: "success",
        title: useLanguage.getState().t("messages.alert.title.created"),
        message: useLanguage.getState().t("messages.alert.content.created"),
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to create user",
        loading: false,
      });
    }
  },
  updateUser: async (id: string, user: UserFormData) => {
    set({ loading: true, error: null });
    try {
      const updatedUser = await userApi.updateUser(id, user);
      set((state) => ({
        users: state.users.map((user) =>
          user._id === id ? updatedUser : user
        ),
        loading: false,
      }));
      useNotificationStore.getState().addNotification({
        type: "success",
        title: useLanguage.getState().t("messages.alert.title.updated"),
        message: useLanguage.getState().t("messages.alert.content.updated"),
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to update user",
        loading: false,
      });
    }
  },
  deleteUser: async (id: string) => {
    set({ loading: true, error: null });
    try {
      await userApi.deleteUser(id);
      set((state) => ({
        users: state.users.filter((user) => user._id !== id),
        loading: false,
      }));
      useNotificationStore.getState().addNotification({
        type: "success",
        title: useLanguage.getState().t("messages.alert.title.deleted"),
        message: useLanguage.getState().t("messages.alert.content.deleted"),
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to delete user",
        loading: false,
      });
    }
  },
  setPagination: (page, limit) => {
    set((state) => ({
      pagination: { ...state.pagination, page, limit },
    }));
    get().fetchUsers();
  },

  clearError: () => set({ error: null }),
}));
