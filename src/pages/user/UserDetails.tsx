import type React from "react";
import { formatDateUTC } from "../../utils/helper";
import { Card } from "../../components/Card";
import {
  Calendar,
  Mail,
  MapPin,
  Palette,
  Phone,
  Star,
  TrendingUp,
} from "lucide-react";
import { Button } from "../../components/Button";
import type { User } from "../../types/user.type";
import { useLanguage } from "../../store/i18nStore";

interface UserDetailsProps {
  user: User;
  onEdit: () => void;
  onClose: () => void;
}

const UserDetails: React.FC<UserDetailsProps> = ({ user, onEdit, onClose }) => {
  const { t } = useLanguage();
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center text-white font-medium text-xl"
          style={{ backgroundColor: user.preferredTheme }}
        >
          {user.firstName[0]}
          {user.lastName[0]}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {user.firstName} {user.lastName}
          </h2>
          <div className="flex items-center gap-2 mt-1">
            <span
              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                user.status === "active"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {user.status}
            </span>
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="ml-1 text-sm text-gray-600">
                {user.rating.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <Card>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          {t("messages.label.contactInformation")}
        </h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-gray-400" />
            <span className="text-gray-900">{user.email}</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-gray-400" />
            <span className="text-gray-900">{user.phone}</span>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-gray-400" />
            <span className="text-gray-900">{user.address}</span>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-gray-400" />
            <span className="text-gray-900">
              {t("messages.label.born")} {formatDateUTC(user.dateOfBirth)}
            </span>
          </div>
        </div>
      </Card>

      {/* Bio */}
      {user.bio && (
        <Card>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {t("messages.label.about")}
          </h3>
          <p className="text-gray-700 leading-relaxed">{user.bio}</p>
        </Card>
      )}

      {/* Skills */}
      <Card>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          {t("messages.label.skills")}
        </h3>
        <div className="flex flex-wrap gap-2">
          {user.skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </Card>

      {/* Additional Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {t("messages.label.expLevel")}
          </h3>
          <div className="flex items-center gap-3">
            <TrendingUp className="w-5 h-5 text-gray-400" />
            <div className="flex-1">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Level {user.experienceLevel}</span>
                <span>{user.experienceLevel}/10</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${(user.experienceLevel / 10) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {t("messages.label.themePreference")}
          </h3>
          <div className="flex items-center gap-3">
            <Palette className="w-5 h-5 text-gray-400" />
            <div className="flex items-center gap-2">
              <div
                className="w-6 h-6 rounded border border-gray-300"
                style={{ backgroundColor: user.preferredTheme }}
              />
              <span className="text-gray-900">{user.preferredTheme}</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Timestamps */}
      <Card>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          {t("messages.label.accountInformation")}
        </h3>
        <div className="space-y-2 text-sm text-gray-600">
          <div>
            {t("messages.label.created")} : {formatDateUTC(user.createdAt)}
          </div>
          <div>
            {t("messages.label.lastUpdated")} : {formatDateUTC(user.updatedAt)}
          </div>
          <div>
            {t("messages.label.gender")} :{" "}
            {user.gender.charAt(0).toUpperCase() + user.gender.slice(1)}
          </div>
        </div>
      </Card>

      {/* Actions */}
      <div className="flex gap-4 pt-4">
        <Button onClick={onEdit} className="flex-1">
          {t("messages.button.edit")}
        </Button>
        <Button variant="outline" onClick={onClose}>
          {t("messages.button.close")}
        </Button>
      </div>
    </div>
  );
};
export default UserDetails;
