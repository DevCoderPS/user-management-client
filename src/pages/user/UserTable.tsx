import { Eye, Mail, Pencil, Phone, Trash2Icon } from "lucide-react";
import { Button } from "../../components/Button";
import { useLanguage } from "../../store/i18nStore";
import type { User } from "../../types/user.type";
import { Table } from "../../components/Table";
import { formatDateUTC } from "../../utils/helper";

interface UserTableProps {
  users: User[];
  loading?: boolean;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  onPageChange?: (page: number) => void;
  onLimitChange?: (limit: number) => void;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  onView: (user: User) => void;
}
const UserTable: React.FC<UserTableProps> = ({
  users,
  loading,
  pagination,
  onPageChange,
  onLimitChange,
  onEdit,
  onDelete,
  onView,
}) => {
  const { t } = useLanguage();

  const columns = [
    {
      key: "name",
      header: t("messages.table.name"),
      render: (user: User) => (
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <div
              className="h-10 w-10 rounded-full flex items-center justify-center text-white font-medium text-sm"
              style={{ backgroundColor: user.preferredTheme }}
            >
              {user.firstName[0]}
              {user.lastName[0]}
            </div>
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {user.firstName} {user.lastName}
            </div>
          </div>
        </div>
      ),
      width: "250px",
    },
    {
      key: "contact",
      header: t("messages.table.contact"),
      render: (user: User) => (
        <div className="space-y-1">
          <div className="flex items-center space-x-1 text-sm text-gray-600">
            <Mail className="w-3 h-3" />
            <span className="truncate max-w-[150px]">{user.email}</span>
          </div>
          <div className="flex items-center space-x-1 text-sm text-gray-600">
            <Phone className="w-3 h-3" />
            <span>{user.phone}</span>
          </div>
        </div>
      ),
      width: "200px",
    },
    {
      key: "role",
      header: t("messages.table.roleAndDepartment"),
      render: (user: User) => (
        <div>
          <div className="text-sm text-gray-900 capitalize">{user.role}</div>
          <div className="text-sm text-gray-500 capitalize">
            {user.department}
          </div>
        </div>
      ),
    },
    {
      key: "skills",
      header: t("messages.table.skills"),
      render: (user: User) => (
        <div className="flex flex-wrap gap-1">
          {user.skills.slice(0, 2).map((skill) => (
            <span
              key={skill}
              className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-md"
            >
              {skill}
            </span>
          ))}
          {user.skills.length > 2 && (
            <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-md">
              +{user.skills.length - 2}
            </span>
          )}
        </div>
      ),
      width: "200px",
    },
    {
      key: "rating",
      header: t("messages.table.rating"),
      render: (user: User) => (
        <div className="flex items-center">
          <span className="text-yellow-400">★</span>
          <span className="ml-1 text-sm text-gray-900">
            {user.rating.toFixed(1)}
          </span>
        </div>
      ),
      width: "80px",
    },
    {
      key: "isActive",
      header: t("messages.table.active"),
      render: (user: User) => (
        <span
          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full capitalize ${
            user.status === "active"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {user.status}
        </span>
      ),
      width: "100px",
    },
    {
      key: "createdAt",
      header: t("messages.table.created"),
      render: (user: User) => (
        <span className="text-sm text-gray-600">
          {formatDateUTC(user.createdAt, "MM/DD/YYYY")}
        </span>
      ),
    },
    {
      key: "actions",
      header: t("messages.table.actions"),
      render: (value: User) => (
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onView(value)}
            icon={<Eye className="w-5 h-5" />}
          />
          <Button
            size="sm"
            variant="outline"
            onClick={() => onEdit(value)}
            icon={<Pencil className="w-5 h-5" />}
          />
          <Button
            size="sm"
            variant="danger"
            onClick={() => onDelete(value)}
            icon={<Trash2Icon className="w-5 h-5" />}
          />
        </div>
      ),
    },
  ];
  return (
    <div className="space-y-6">
      <Table
        data={users}
        columns={columns}
        loading={loading}
        pagination={pagination}
        onPageChange={onPageChange}
        onLimitChange={onLimitChange}
        emptyMessage={t("messages.table.noDataFound")}
      />
    </div>
  );
};

export default UserTable;
