import type React from "react";
import type { UserFormProps } from "../../types/user.type";
import { useLanguage } from "../../store/i18nStore";
import { Button } from "../../components/Button";
import { useForm } from "react-hook-form";
import { userSchema } from "../../validation/user-validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "../../components/Input";
import {
  Calendar,
  Mail,
  Phone,
  Transgender,
  UserCircle,
  UserLock,
  UserRoundCog,
} from "lucide-react";
import { Select } from "../../components/Select";
import {
  departmentOptions,
  genderOptions,
  roleOptions,
  statusOptions,
} from "../../utils/constants";
import { TextArea } from "../../components/TextArea";
import { Checkbox } from "../../components/Checkbox";
import { Rating } from "../../components/Rating";
import { useEffect } from "react";
import { formatDateUTC } from "../../utils/helper";

const UserForm: React.FC<UserFormProps> = ({
  user,
  onCancel,
  onSubmit,
  loading,
}) => {
  const { t } = useLanguage();

  const isEditing = !!user;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(userSchema(t)),
    context: { isEditing },
  });

  useEffect(() => {
    if (user) {
      const dateOfBirth = formatDateUTC(user.dateOfBirth);
      reset({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        dateOfBirth: dateOfBirth,
        role: user.role,
        department: user.department,
        gender: user.gender,
        status: user.status,
        address: user.address,
        bio: user.bio,
        rating: user.rating,
        isEmailVerified: user.isEmailVerified,
      });
    }
  }, [reset, user]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Basic Information */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Input
          {...register("firstName")}
          label={t("messages.label.firstName")}
          icon={<UserCircle className="w-5 h-5" />}
          error={errors.firstName}
          isRequired
        />
        <Input
          {...register("lastName")}
          label={t("messages.label.lastName")}
          icon={<UserCircle className="w-5 h-5" />}
          error={errors.lastName}
          isRequired
        />
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Input
          {...register("email")}
          label={t("messages.label.email")}
          icon={<Mail className="w-5 h-5" />}
          error={errors.email}
          isRequired
        />
        <Input
          {...register("phone")}
          label={t("messages.label.phone")}
          icon={<Phone className="w-5 h-5" />}
          error={errors.phone}
          isRequired
        />
      </div>
      {!isEditing && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Input
            {...register("password")}
            isPassword
            isRequired
            label={t("user.label.password")}
            icon={<UserLock className="w-5 h-5" />}
            error={errors.password}
          />
          <Input
            {...register("confirmPassword")}
            isPassword
            isRequired
            label={t("user.label.confirmPassword")}
            icon={<UserLock className="w-5 h-5" />}
            error={errors.confirmPassword}
          />
        </div>
      )}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Input
          {...register("dateOfBirth", { valueAsDate: true })}
          type="date"
          isRequired
          label={t("messages.label.dateOfBirth")}
          icon={<Calendar className="w-5 h-5" />}
          error={errors.dateOfBirth}
        />
        <Select
          {...register("gender")}
          label={t("messages.label.department")}
          options={genderOptions}
          placeholder="Please Select Gender"
          icon={<Transgender className="w-5 h-5" />}
          isRequired
          error={errors.gender}
        />
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Select
          {...register("role")}
          label={t("messages.label.role")}
          options={roleOptions}
          placeholder="Please Select Gender"
          icon={<Transgender className="w-5 h-5" />}
          isRequired
          error={errors.role}
        />
        <Select
          {...register("department")}
          label={t("messages.label.department")}
          options={departmentOptions}
          placeholder="Please Select Role"
          icon={<UserRoundCog className="w-5 h-5" />}
          isRequired
          error={errors.department}
        />
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Select
          {...register("status")}
          label={t("messages.label.status")}
          options={statusOptions}
          placeholder="Please Select Role"
          icon={<UserRoundCog className="w-5 h-5" />}
          isRequired
          error={errors.status}
        />
        <Rating
          label={t("messages.label.rating")}
          value={watch().rating || 1}
          onChange={(value) => setValue("rating", value)}
          error={errors.rating}
        />
      </div>
      <TextArea
        {...register("address")}
        label={t("messages.label.address")}
        rows={2}
        placeholder="Tell us about yourself..."
        error={errors.address}
      />
      <TextArea
        {...register("bio")}
        label={t("messages.label.bio")}
        rows={4}
        placeholder="Tell us about yourself..."
        error={errors.bio}
      />
      <Checkbox
        {...register("isEmailVerified")}
        label={t("messages.label.isEmailVerified")}
        onChange={(e) => setValue("isEmailVerified", e.target.checked)}
        error={errors.isEmailVerified}
      />

      {/* Button Section */}
      <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={loading}
        >
          {t("messages.button.cancel")}
        </Button>
        <Button type="submit" loading={loading}>
          {isEditing ? t("messages.button.update") : t("messages.button.save")}
        </Button>
      </div>
    </form>
  );
};
export default UserForm;
