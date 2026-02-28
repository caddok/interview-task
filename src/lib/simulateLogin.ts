import type { AppDispatch } from "@/store";
import type { AuthUser } from "@/types/auth";
import { AUTH_FORM_SUBMIT_DELAY_MS } from "@/constants/constants";
import { delay } from "./utils";
import { login } from "@/store/slices/authSlice";

export async function simulatedLogin(
  dispatch: AppDispatch,
  payload: AuthUser
): Promise<void> {
  await delay(AUTH_FORM_SUBMIT_DELAY_MS);
  dispatch(login(payload));
}
