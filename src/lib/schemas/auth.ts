import { z } from "zod";
import {
  PASSWORD_MIN_LENGTH,
  USERNAME_MIN_LENGTH,
  MIN_AGE_YEARS,
  MAX_AGE_YEARS,
} from "@/constants/constants";

const emailSchema = z
  .string()
  .min(1, "Email is required")
  .email("Invalid email");

const passwordSchema = z
  .string()
  .min(
    PASSWORD_MIN_LENGTH,
    `Password must be at least ${PASSWORD_MIN_LENGTH} characters`
  )
  .refine(
    (val) => /[A-Z]/.test(val),
    "Password must contain at least one uppercase letter"
  )
  .refine(
    (val) => /[a-z]/.test(val),
    "Password must contain at least one lowercase letter"
  )
  .refine(
    (val) => /[!#$%&*@^_\-+=[\]{}|'":;?/,.<>~`]/.test(val),
    "Password must contain at least one symbol"
  );

function getDateOfBirthBounds() {
  const today = new Date();
  const minDate = new Date();

  minDate.setFullYear(today.getFullYear() - MAX_AGE_YEARS);

  return { minDate, maxDate: today };
}

const { minDate: minBirthDate, maxDate: maxBirthDate } = getDateOfBirthBounds();

const dateOfBirthSchema = z
  .string()
  .min(1, "Date of birth is required")
  .refine((val) => {
    const date = new Date(val);
    if (Number.isNaN(date.getTime())) {
      return false;
    }

    const isWithinAllowedRange = date >= minBirthDate && date <= maxBirthDate;

    return isWithinAllowedRange;
  }, `Date must be in the past and not more than ${MAX_AGE_YEARS} years ago`)
  .refine((val) => {
    const birth = new Date(val);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const birthdayAlreadyPassedThisYear =
      today.getMonth() > birth.getMonth() ||
      (today.getMonth() === birth.getMonth() &&
        today.getDate() >= birth.getDate());
    if (!birthdayAlreadyPassedThisYear) {
      age -= 1;
    }

    const isOldEnough = age >= MIN_AGE_YEARS;

    return isOldEnough;
  }, `You must be at least ${MIN_AGE_YEARS} years old`);

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is rquired"),
});

export const registerSchema = z
  .object({
    email: emailSchema,
    username: z
      .string()
      .min(1, "Username is required")
      .min(
        USERNAME_MIN_LENGTH,
        `Username must be at least ${USERNAME_MIN_LENGTH} characters`
      ),
    password: passwordSchema,
    confirmPassword: z.string(),
    dateOfBirth: dateOfBirthSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
