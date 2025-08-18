"use client";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Book,
  FileText,
  LogOut,
  Menu,
  X,
  PlusCircle,
  Loader2,
  Home,
  Mail,
  Shield,
  ScrollText,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/get-error-message";
import { useAuth } from "@/contexts/AuthContext";
import { signOutUser } from "@/lib/services";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { user, setUser } = useAuth();

  if (
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/confirm-signup"
  ) {
    return null;
  }

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      // Sign out from Amplify
      await signOutUser();

      // Clear user state
      setUser(null);
      setIsMenuOpen(false);

      // Force redirect to login page
      window.location.href = "/login";
    } catch (error) {
      console.log("Error during logout:", getErrorMessage(error));
      toast.error("Error during logout. Please try again.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleNavigation = (path: string) => {
    router.push(path);
    setIsMenuOpen(false);
  };

  // Check if current route is in books section
  const isBooksRoute = pathname.startsWith('/books');

  // Navigation items for non-books routes (public pages)
  const publicNavItems = [
    { path: "/ourstory", label: "قصتنا", icon: Book },
    { path: "/contact", label: "تواصل معنا", icon: Mail },
    { path: "/private", label: "الخصوصية", icon: Shield },
    { path: "/terms-and-conditions", label: "الشروط", icon: ScrollText },
  ];

  // Navigation items for books routes (authenticated app)
  const appNavItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/books", label: "Library", icon: FileText },
    { path: "/books/new", label: "New Book", icon: PlusCircle },
  ];

  const navItems = isBooksRoute ? appNavItems : publicNavItems;

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => handleNavigation(isBooksRoute ? "/books" : "/")}
          >
            <Book className="h-6 w-6" />
            <span className="font-bold">عليم</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <div
              key={item.path}
              className={cn(
                "flex items-center text-sm font-medium transition-colors hover:text-primary cursor-pointer",
                pathname === item.path ? "text-primary" : "text-muted-foreground"
              )}
              onClick={() => handleNavigation(item.path)}
            >
              <item.icon className="h-5 w-5" />
              <span className="ml-2">{item.label}</span>
            </div>
          ))}
          {!isBooksRoute && (
            <div
              className={cn(
                "flex items-center text-sm font-medium transition-colors hover:text-primary cursor-pointer",
                "text-muted-foreground"
              )}
              onClick={() => handleNavigation("/books")}
            >
              <Zap className="h-5 w-5" />
              <span className="ml-2">Studio</span>
            </div>
          )}
        </nav>

        {/* Desktop User Menu */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />

          {user?.isLoggedIn ? (
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-end">
                <span className="text-sm font-medium">{user.name}</span>
                <span className="text-xs text-muted-foreground">
                  {user.email}
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                disabled={isLoggingOut}
              >
                {isLoggingOut ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <LogOut className="h-5 w-5" />
                )}
                <span className="sr-only">Log out</span>
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                onClick={() => handleNavigation("/login")}
              >
                Sign in
              </Button>
              <Button onClick={() => handleNavigation("/register")}>
                Sign up
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container py-4 grid gap-4">
            <nav className="grid gap-2">
              {navItems.map((item) => (
                <div
                  key={item.path}
                  className={cn(
                    "flex items-center py-2 text-sm font-medium transition-colors hover:text-primary cursor-pointer",
                    pathname === item.path
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                  onClick={() => handleNavigation(item.path)}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="ml-2">{item.label}</span>
                </div>
              ))}
              {!isBooksRoute && (
                <div
                  className={cn(
                    "flex items-center py-2 text-sm font-medium transition-colors hover:text-primary cursor-pointer",
                    "text-muted-foreground"
                  )}
                  onClick={() => handleNavigation("/books")}
                >
                  <Zap className="h-5 w-5" />
                  <span className="ml-2">الاستوديو</span>
                </div>
              )}
            </nav>
            <div className="flex items-center justify-between pt-4 border-t">
              <ThemeToggle showLabel />

              {user?.isLoggedIn ? (
                <div className="flex items-center gap-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{user.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {user.email}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                  >
                    {isLoggingOut ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <LogOut className="h-5 w-5" />
                    )}
                    <span className="sr-only">Log out</span>
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    onClick={() => handleNavigation("/login")}
                  >
                    Sign in
                  </Button>
                  <Button onClick={() => handleNavigation("/register")}>
                    Sign up
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
