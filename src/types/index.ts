export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export type ModalState = "create" | "edit" | "view" | "delete" | null;

export interface NotificationState {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title?: string;
  message: string;
  duration?: number;
}

export interface QueryParams {
  page?: number;
  limit?: number;
  search?: string;
}
