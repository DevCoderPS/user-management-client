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
  skillOptions,
  statusOptions,
} from "../../utils/constants";
import { TextArea } from "../../components/TextArea";
import { Checkbox } from "../../components/Checkbox";
import { Rating } from "../../components/Rating";
import { useEffect } from "react";
import { formatDateUTC } from "../../utils/helper";
import { ColorPicker } from "../../components/ColorPicker";
import { Slider } from "../../components/Slider";
import { AutocompleteSelect } from "../../components/AutocompleteSelect";

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
        preferredTheme: user.preferredTheme,
        experienceLevel: user.experienceLevel,
        skills: user.skills,
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
          placeholder={t("messages.placeholder.firstName")}
          icon={<UserCircle className="w-5 h-5" />}
          error={errors.firstName}
          isRequired
        />
        <Input
          {...register("lastName")}
          label={t("messages.label.lastName")}
          placeholder={t("messages.placeholder.lastName")}
          icon={<UserCircle className="w-5 h-5" />}
          error={errors.lastName}
          isRequired
        />
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Input
          {...register("email")}
          label={t("messages.label.email")}
          placeholder={t("messages.placeholder.email")}
          icon={<Mail className="w-5 h-5" />}
          error={errors.email}
          isRequired
        />
        <Input
          {...register("phone")}
          label={t("messages.label.phone")}
          placeholder={t("messages.placeholder.phone")}
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
            label={t("messages.label.password")}
            placeholder={t("messages.placeholder.password")}
            icon={<UserLock className="w-5 h-5" />}
            error={errors.password}
          />
          <Input
            {...register("confirmPassword")}
            isPassword
            isRequired
            label={t("messages.label.confirmPassword")}
            placeholder={t("messages.placeholder.confirmPassword")}
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
          label={t("messages.label.gender")}
          options={genderOptions}
          placeholder={t("messages.placeholder.gender")}
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
          placeholder={t("messages.placeholder.role")}
          icon={<Transgender className="w-5 h-5" />}
          isRequired
          error={errors.role}
        />
        <Select
          {...register("department")}
          label={t("messages.label.department")}
          options={departmentOptions}
          placeholder={t("messages.placeholder.department")}
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
          placeholder={t("messages.placeholder.status")}
          icon={<UserRoundCog className="w-5 h-5" />}
          isRequired
          error={errors.status}
        />
        <ColorPicker
          label={t("messages.label.preferredTheme")}
          value={watch().preferredTheme || "#3B82F6"}
          onChange={(color) => setValue("preferredTheme", color)}
          error={errors.preferredTheme}
        />
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Slider
          label={t("messages.label.expLevel")}
          value={watch().experienceLevel || 1}
          onChange={(value) => setValue("experienceLevel", value)}
          min={1}
          max={10}
          error={errors.experienceLevel}
        />
        <Rating
          label={t("messages.label.rating")}
          value={watch().rating || 1}
          onChange={(value) => setValue("rating", value)}
          error={errors.rating}
        />
      </div>
      <AutocompleteSelect
        label={t("messages.label.skills")}
        options={skillOptions}
        value={watch().skills || []}
        onChange={(value) => setValue("skills", value)}
        placeholder={t("messages.placeholder.skills")}
        error={errors.skills?.message}
      />
      <TextArea
        {...register("address")}
        label={t("messages.label.address")}
        rows={2}
        placeholder={t("messages.placeholder.address")}
        error={errors.address}
      />
      <TextArea
        {...register("bio")}
        label={t("messages.label.bio")}
        rows={4}
        placeholder={t("messages.placeholder.bio")}
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
