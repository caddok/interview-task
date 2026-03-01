import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store";
import { logout } from "@/store/slices/authSlice";
import { AuthModal } from "@/components/features/auth/AuthModal";
import { NavbarSearch } from "../search/NavbarSearch";
import { toast } from "@/hooks/use-toast";

const Navbar = () => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 bg-gradient-to-b from-background/95 to-transparent gap-2">
        <div className="flex flex-1 items-center gap-2 md:gap-4 min-w-0">
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-foreground">
            Binge<span className="text-primary">&</span>Tag
          </h1>
          {user && <NavbarSearch />}
        </div>

        {user ? (
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() => {
                dispatch(logout());
                toast({ title: "Signed out", variant: "destructive" });
              }}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <Avatar className="h-8 w-8 border-2 border-primary">
                <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">
                  {(user.name ?? user.email).slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-foreground hidden sm:inline">
                {user.name ?? user.email}
              </span>
            </button>
          </div>
        ) : (
          <Button
            onClick={() => setIsAuthModalOpen(true)}
            size="sm"
            className="bg-primary hover:bg-primary/80 text-primary-foreground font-semibold rounded-sm px-5"
          >
            <User className="h-4 w-4 mr-1" />
            Login
          </Button>
        )}
      </nav>
      <AuthModal open={isAuthModalOpen} onOpen={setIsAuthModalOpen} />
    </>
  );
};

export default Navbar;
