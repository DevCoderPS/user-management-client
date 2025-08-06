import type { PaginationMeta } from ".";

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  gender: string;
  password: string;
  phone?: string;
  dateOfBirth: Date;
  status: string;
  department: string;
  isEmailVerified?: boolean;
  rating: number;
  address: string;
  bio: string;
  delFlg: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserFormData {
  firstName: string;
  lastName: string;
  email: string;
  role: "admin" | "moderator" | "user";
  gender: "male" | "female" | "other";
  password: string;
  phone?: string;
  dateOfBirth: Date;
  status: "active" | "inactive";
  department: string;
  rating: number;
  isEmailVerified?: boolean;
  address?: string;
  bio?: string;
  delFlg?: boolean;
}

export interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
  selectedUser: User | null;
  pagination: PaginationMeta;

  // actions
  fetchUsers: () => Promise<void>;
  setSelectedUser: (user: User | null) => void;
  createUser: (data: UserFormData) => Promise<void>;
  updateUser: (id: string, data: UserFormData) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  setPagination: (page: number, limit: number) => void;
  clearError: () => void;
}

export interface UserFormProps {
  user?: User | null;
  onCancel: () => void;
  onSubmit: (data: UserFormData) => void;
  loading?: boolean;
}
