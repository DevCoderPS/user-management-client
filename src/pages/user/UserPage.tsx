import type React from "react";
import type { ModalState } from "../../types";
import type { User, UserFormData } from "../../types/user.type";
import { useLanguage } from "../../store/i18nStore";
import { useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { Plus, RefreshCcw } from "lucide-react";
import { Modal } from "../../components/Modal";
import { useUserStore } from "../../store/userStore";
import { ConfirmModal } from "../../components/ConfirmModal";
import UserForm from "./UserForm";
import UserTable from "./UserTable";

const UserPage: React.FC = () => {
  const { t } = useLanguage();
  const [modalState, setModalState] = useState<ModalState>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const {
    users,
    loading,
    pagination,
    selectedUser,
    setSelectedUser,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
    setPagination,
  } = useUserStore();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleCreateUser = async (data: UserFormData) => {
    console.log("handle create user");
    await createUser(data);
    setModalState(null);
  };

  const handleUpdateUser = async (data: UserFormData) => {
    if (selectedUser) {
      await updateUser(selectedUser._id, data);
      setModalState(null);
      setSelectedUser(null);
    }
  };

  const handleDeleteUser = async () => {
    if (userToDelete) {
      await deleteUser(userToDelete._id);
      setUserToDelete(null);
      setModalState(null);
    }
  };

  const handleView = (user: User) => {
    setSelectedUser(user);
    setModalState("view");
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setModalState("edit");
  };

  const handleDelete = (user: User) => {
    setUserToDelete(user);
    setModalState("delete");
  };

  const handlePageChange = (page: number) => {
    setPagination(page, pagination.limit);
  };

  const handleLimitChange = (limit: number) => {
    setPagination(1, limit);
  };

  const closeModal = () => {
    setModalState(null);
    setSelectedUser(null);
    setUserToDelete(null);
  };

  const getModalTitle = () => {
    switch (modalState) {
      case "create":
        return t("messages.title.add");
      case "edit":
        return t("messages.title.edit");
      case "view":
        return t("messages.title.detail");
      default:
        return "";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {t("messages.title.screen")}
          </h1>
        </div>

        <div className="mt-4 sm:mt-0 flex space-x-3">
          <Button
            variant="outline"
            onClick={() => setModalState("create")}
            icon={<Plus className="w-5 h-5 mr-2" />}
          >
            {t("messages.button.language")}
          </Button>

          <Button
            variant="outline"
            onClick={() => fetchUsers()}
            loading={loading}
            icon={<RefreshCcw className="w-5 h-5 mr-2" />}
          >
            {t("messages.button.refresh")}
          </Button>

          <Button
            onClick={() => setModalState("create")}
            icon={<Plus className="w-5 h-5 mr-2" />}
          >
            {t("messages.button.add")}
          </Button>
        </div>
      </div>

      {/* City List */}
      <UserTable
        users={users}
        loading={loading}
        pagination={pagination}
        onPageChange={handlePageChange}
        onLimitChange={handleLimitChange}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Create/Edit Modal */}
      <Modal
        isOpen={modalState === "create" || modalState === "edit"}
        onClose={closeModal}
        title={getModalTitle()}
        size="xl"
      >
        <UserForm
          user={modalState === "edit" ? selectedUser : null}
          onSubmit={modalState === "edit" ? handleUpdateUser : handleCreateUser}
          onCancel={closeModal}
          loading={loading}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={modalState === "delete"}
        onClose={closeModal}
        onConfirm={handleDeleteUser}
        title="Delete City"
        message={`Are you sure you want to delete ${userToDelete?.firstName}? ${userToDelete?.lastName} This action cannot be undone.`}
        confirmText="Delete"
        variant="danger"
        loading={loading}
      />
    </div>
  );
};

export default UserPage;
