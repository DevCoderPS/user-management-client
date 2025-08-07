import React from "react";
import { Modal } from "./Modal";
import { Button } from "./Button";
import { TriangleAlert } from "lucide-react";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "info";
  loading?: boolean;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to continue?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger",
  loading = false,
}) => {
  const iconColors = {
    danger: "text-red-600 bg-red-100",
    warning: "text-yellow-600 bg-yellow-100",
    info: "text-blue-600 bg-blue-100",
  };

  const buttonVariants = {
    danger: "danger" as const,
    warning: "primary" as const,
    info: "primary" as const,
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <div className="text-center">
        <div
          className={`mx-auto flex items-center justify-center h-12 w-12 rounded-full ${iconColors[variant]} mb-4`}
        >
          <TriangleAlert className="w-5 h-5" />
        </div>

        <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>

        <p className="text-sm text-gray-500 mb-6">{message}</p>

        <div className="flex gap-3 justify-center">
          <Button variant="outline" onClick={onClose} disabled={loading}>
            {cancelText}
          </Button>
          <Button
            variant={buttonVariants[variant]}
            onClick={onConfirm}
            loading={loading}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
