import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { useAppDispatch } from "@/store";
import { login } from "@/store/slices/authSlice";
import {
  AUTH_FORM_SUBMIT_DELAY_MS,
  LOGIN_FORM_DEFAULT_VALUES,
} from "@/constants/auth";
import { delay } from "@/lib/utils";
import { loginSchema, type LoginFormData } from "@/lib/schemas/auth";
import { PasswordField } from "@/components/PasswordField";

interface LoginFormProps {
  onAuthSuccess: () => void;
}

export function LoginForm({ onAuthSuccess }: LoginFormProps) {
  const dispatch = useAppDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: LOGIN_FORM_DEFAULT_VALUES,
  });

  const onSubmit = handleSubmit(async (data) => {
    setIsSubmitting(true);
    await delay(AUTH_FORM_SUBMIT_DELAY_MS);
    dispatch(login({ id: crypto.randomUUID(), email: data.email }));
    setIsSubmitting(false);
    onAuthSuccess();
  });

  return (
    <form onSubmit={onSubmit} className="mt-4 space-y-4">
      <div className="space-y-2">
        <Label htmlFor="login-email">Email</Label>
        <Input
          id="login-email"
          type="email"
          autoComplete="email"
          error={!!errors.email}
          {...register("email")}
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>
      <PasswordField
        id="login-password"
        label="Password"
        errorMessage={errors.password?.message}
        registerReturn={register("password")}
        autoComplete="current-password"
      />
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Spinner className="size-4" />
            Signing in…
          </>
        ) : (
          "Sign in"
        )}
      </Button>
    </form>
  );
}
