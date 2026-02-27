import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User } from "lucide-react";

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 bg-gradient-to-b from-background/95 to-transparent">
      <h1 className="text-2xl md:text-3xl font-black tracking-tight text-foreground">
        Binge<span className="text-primary">&</span>Tag
      </h1>

      {loggedIn ? (
        <button
          onClick={() => setLoggedIn(false)}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <Avatar className="h-8 w-8 border-2 border-primary">
            <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">
              JD
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium text-foreground hidden sm:inline">Jane Doe</span>
        </button>
      ) : (
        <Button
          onClick={() => setLoggedIn(true)}
          size="sm"
          className="bg-primary hover:bg-primary/80 text-primary-foreground font-semibold rounded-sm px-5"
        >
          <User className="h-4 w-4 mr-1" />
          Login
        </Button>
      )}
    </nav>
  );
};

export default Navbar;
