import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { useAppDispatch } from "@/store";
import { LOGIN_FORM_DEFAULT_VALUES } from "@/constants/constants";
import { simulatedLogin } from "@/lib/simulateLogin";
import { loginSchema, type LoginFormData } from "@/lib/schemas/auth";
import { PasswordField } from "@/components/features/auth/PasswordField";
import { toast } from "@/hooks/use-toast";

type LoginFormProps = {
  onAuthSuccess: () => void;
};

export function LoginForm({ onAuthSuccess }: LoginFormProps) {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: LOGIN_FORM_DEFAULT_VALUES,
  });

  const onSubmit = handleSubmit(async (data) => {
    await simulatedLogin(dispatch, {
      id: crypto.randomUUID(),
      email: data.email,
    });
    toast({ title: "Signed in" });
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
