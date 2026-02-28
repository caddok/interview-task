import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { UseFormRegisterReturn } from "react-hook-form";

interface PasswordFieldProps {
  id: string;
  label: string;
  errorMessage: string | undefined;
  registerReturn: UseFormRegisterReturn;
  autoComplete: "current-password" | "new-password";
}

export function PasswordField({
  id,
  label,
  errorMessage,
  registerReturn,
  autoComplete,
}: PasswordFieldProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={isVisible ? "text" : "password"}
        autoComplete={autoComplete}
        error={!!errorMessage}
        rightIcon={
          <button
            type="button"
            tabIndex={-1}
            className="cursor-pointer hover:text-foreground focus:outline-none"
            onClick={() => setIsVisible((prev) => !prev)}
            aria-label={isVisible ? "Hide password" : "Show password"}
          >
            {isVisible ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </button>
        }
        {...registerReturn}
      />
      {errorMessage && (
        <p className="text-sm text-destructive">{errorMessage}</p>
      )}
    </div>
  );
}
