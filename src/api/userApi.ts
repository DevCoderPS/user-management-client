import type { QueryParams } from "../types";
import type { UserFormData } from "../types/user.type";
import apiClient from "./apiClient";

export const userApi = {
  getUsers: async (params: QueryParams) => {
    const response = await apiClient.get("/users", { params });
    return response.data;
  },
  getUserById: async (id: string) => {
    const response = await apiClient.get(`/users/${id}`);
    return response.data;
  },
  createUser: async (data: UserFormData) => {
    const response = await apiClient.post("/users", data);
    return response.data;
  },
  updateUser: async (id: string, data: UserFormData) => {
    const response = await apiClient.patch(`/users/${id}`, data);
    return response.data;
  },
  deleteUser: async (id: string) => {
    const response = await apiClient.delete(`/users/${id}`);
    return response.data;
  },
};
