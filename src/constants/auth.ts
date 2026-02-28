export const AUTH_USER_KEY = "auth_user_key";

export const AUTH_FORM_SUBMIT_DELAY_MS = 1000;

export const PASSWORD_MIN_LENGTH = 18;

export const USERNAME_MIN_LENGTH = 5;

export const MIN_AGE_YEARS = 13;

export const MAX_AGE_YEARS = 120;

export const LOGIN_FORM_DEFAULT_VALUES = {
  email: "",
  password: "",
} as const;

export const REGISTER_FORM_DEFAULT_VALUES = {
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
  dateOfBirth: "",
} as const;
