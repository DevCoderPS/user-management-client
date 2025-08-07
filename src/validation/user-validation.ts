import * as yup from "yup";

export const userSchema = (t: (key: string) => string) =>
  yup.object().shape({
    firstName: yup
      .string()
      .required(t("messages.required.firstName"))
      .min(3, t("messages.valid.firstName.min"))
      .max(20, t("messages.valid.firstName.max")),

    lastName: yup
      .string()
      .required(t("messages.required.lastName"))
      .min(3, t("messages.valid.lastName.min"))
      .max(20, t("messages.valid.lastName.max")),

    email: yup
      .string()
      .required(t("messages.required.email"))
      .email(t("messages.valid.email.format"))
      .max(255, t("messages.valid.email.max")),

    phone: yup
      .string()
      .matches(
        /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/,
        t("messages.valid.phone.matches")
      )
      .notRequired(),

    password: yup.string().when("$isEditing", {
      is: false,
      then: (schema) =>
        schema
          .required(t("messages.required.password"))
          .min(8, t("messages.valid.password.min"))
          .max(20, t("messages.valid.password.max"))
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
            t("user.valid.password.matches")
          ),
      otherwise: (schema) => schema.optional(),
    }),

    confirmPassword: yup.string().when("$isEditing", {
      is: false,
      then: (schema) =>
        schema
          .required(t("messages.required.confirmPassword"))
          .oneOf([yup.ref("password")], t("messages.valid.confirmPassword")),
      otherwise: (schema) => schema.optional(),
    }),

    dateOfBirth: yup.string().required(t("messages.required.dateOfBirth")),

    gender: yup
      .string()
      .required(t("messages.required.gender"))
      .oneOf(["male", "female", "other"], t("messages.valid.gender")),

    role: yup
      .string()
      .required(t("messages.required.role"))
      .oneOf(["admin", "moderator", "user"], t("messages.valid.role")),

    department: yup
      .string()
      .required(t("messages.required.department"))
      .oneOf(
        ["engineering", "marketing", "sales", "hr", "finance", "operations"],
        t("messages.valid.department")
      ),

    status: yup
      .string()
      .required(t("messages.required.status"))
      .oneOf(["active", "inactive"], t("messages.valid.status")),

    rating: yup.number(),

    address: yup.string().nullable(),

    bio: yup.string().nullable(),

    isEmailVerified: yup.boolean().default(true),

    preferredTheme: yup
      .string()
      .required(t("messages.required.preferredTheme")),

    experienceLevel: yup
      .number()
      .required(t("messages.required.expLevel"))
      .min(1, t("messages.valid.expLevel.min"))
      .max(20, t("messages.valid.expLevel.max")),

    skills: yup.array().of(yup.string()).min(1, t("messages.required.skills")),
  });
