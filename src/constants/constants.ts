export const AUTH_USER_KEY = "auth_user_key";

export const AUTH_FORM_SUBMIT_DELAY_MS = 1000;

export const PASSWORD_MIN_LENGTH = 18;

export const USERNAME_MIN_LENGTH = 5;

export const MIN_AGE_YEARS = 13;

export const MAX_AGE_YEARS = 120;

export const TODAY_ISO = new Date().toISOString().split("T")[0];

export const SEARCH_DEBOUNCE_MS = 500;

export const SEARCH_MIN_QUERY_LENGTH = 3;

export const SEARCH_POSTER_SIZE = "w92";

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
