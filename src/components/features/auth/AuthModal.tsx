import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "@/components/features/auth/LoginForm";
import { RegisterForm } from "@/components/features/auth/RegisterForm";

type AuthModalProps = {
  open: boolean;
  onOpen: (open: boolean) => void;
};

export function AuthModal({ open, onOpen }: AuthModalProps) {
  const handleAuthSuccess = () => onOpen(false);

  return (
    <Dialog open={open} onOpenChange={onOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Sign in</DialogTitle>
          <DialogDescription className="sr-only">
            Sign in to your account or create a new one.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue={"login"} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value={"login"}>Login</TabsTrigger>
            <TabsTrigger value={"register"}>Register</TabsTrigger>
          </TabsList>
          <TabsContent value={"login"}>
            <LoginForm onAuthSuccess={handleAuthSuccess} />
          </TabsContent>
          <TabsContent value={"register"}>
            <RegisterForm onAuthSuccess={handleAuthSuccess} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
