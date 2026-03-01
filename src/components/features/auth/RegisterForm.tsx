import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { useAppDispatch } from "@/store";
import { REGISTER_FORM_DEFAULT_VALUES } from "@/constants/auth";
import { simulatedLogin } from "@/lib/simulateLogin";
import { registerSchema, type RegisterFormData } from "@/lib/schemas/auth";
import { PasswordField } from "@/components/features/auth/PasswordField";
import { toast } from "@/hooks/use-toast";

type RegisterFormProps = {
  onAuthSuccess: () => void;
};

export function RegisterForm({ onAuthSuccess }: RegisterFormProps) {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: REGISTER_FORM_DEFAULT_VALUES,
  });

  const onSubmit = handleSubmit(async (data) => {
    await simulatedLogin(dispatch, {
      id: crypto.randomUUID(),
      email: data.email,
      name: data.username,
    });
    toast({ title: "Account created" });
    onAuthSuccess();
  });

  return (
    <form onSubmit={onSubmit} className="mt-4 space-y-4">
      <div className="space-y-2">
        <Label htmlFor="reg-email">Email</Label>
        <Input
          id="reg-email"
          type="email"
          autoComplete="email"
          error={!!errors.email}
          {...register("email")}
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="reg-username">Username</Label>
        <Input
          id="reg-username"
          type="text"
          autoComplete="username"
          error={!!errors.username}
          {...register("username")}
        />
        {errors.username && (
          <p className="text-sm text-destructive">{errors.username.message}</p>
        )}
      </div>
      <PasswordField
        id="reg-password"
        label="Password"
        errorMessage={errors.password?.message}
        registerReturn={register("password")}
        autoComplete="new-password"
      />
      <PasswordField
        id="reg-confirm"
        label="Confirm password"
        errorMessage={errors.confirmPassword?.message}
        registerReturn={register("confirmPassword")}
        autoComplete="new-password"
      />
      <div className="space-y-2">
        <Label htmlFor="reg-dob">Date of birth</Label>
        <Input
          id="reg-dob"
          type="date"
          error={!!errors.dateOfBirth}
          {...register("dateOfBirth")}
        />
        {errors.dateOfBirth && (
          <p className="text-sm text-destructive">
            {errors.dateOfBirth.message}
          </p>
        )}
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Spinner className="size-4" />
            Creating account…
          </>
        ) : (
          "Create account"
        )}
      </Button>
    </form>
  );
}
