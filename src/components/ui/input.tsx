import { forwardRef, type ComponentProps, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends ComponentProps<"input"> {
  error?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, leftIcon, rightIcon, ...props }, ref) => {
    return (
      <div
        className={cn(
          "flex items-center gap-2 w-full h-10 rounded-md bg-background border px-3 py-2 text-sm text-foreground transition-colors",
          "border-border focus-within:border-foreground/50",
          error && "border-destructive focus-within:border-destructive",
          className
        )}
      >
        {leftIcon && (
          <div className="flex shrink-0 size-4 items-center justify-center text-muted-foreground select-none">
            {leftIcon}
          </div>
        )}
        <input
          ref={ref}
          type={type ?? "text"}
          className={cn(
            "flex-1 bg-transparent p-0 outline-none placeholder:text-muted-foreground",
            "disabled:cursor-not-allowed min-w-0"
          )}
          aria-invalid={error}
          {...props}
        />
        {rightIcon && (
          <div className="flex shrink-0 size-4 items-center justify-center text-muted-foreground select-none">
            {rightIcon}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
