import { create } from "zustand";

interface ModalState {
  isOpen: boolean;
  title: string;
  content: React.ReactNode | null;
  size?: "sm" | "md" | "lg" | "xl"; // Optional size property
  onClose?: () => void;
}

interface ModalStore extends ModalState {
  openModal: (modal: Omit<ModalState, "isOpen">) => void;
  closeModal: () => void;
}
export const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  title: "",
  content: null,
  size: "md", // Default size can be set to "md"
  openModal: (modal) => set({ ...modal, isOpen: true }),
  closeModal: () =>
    set({ isOpen: false, content: null, title: "", onClose: undefined }),
}));
