import { configureStore } from "@reduxjs/toolkit";
import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";
import { AUTH_USER_KEY } from "@/constants/auth";
import type { AuthUser } from "@/types/auth";
import authReducer from "./slices/authSlice";

function loadPersistedUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(AUTH_USER_KEY);
    if (!raw) {
      return null;
    }

    const data = JSON.parse(raw) as unknown;
    if (
      data &&
      typeof data === "object" &&
      "id" in data &&
      "email" in data &&
      typeof (data as AuthUser).id === "string" &&
      typeof (data as AuthUser).email === "string"
    ) {
      return data as AuthUser;
    }

    return null;
  } catch (error) {
    console.warn("Failed to load user:", error);
    return null;
  }
}

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState: {
    auth: { user: loadPersistedUser() },
  },
});

store.subscribe(() => {
  const user = store.getState().auth.user;
  if (user) {
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(AUTH_USER_KEY);
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
