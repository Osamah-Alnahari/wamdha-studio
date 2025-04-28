"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Book, FileText, LogOut, Menu, X, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { fetchAuthSession, signOut } from "aws-amplify/auth";
import { getErrorMessage } from "@/utils/get-error-message";
import { useAuth } from "@/contexts/AuthContext";

interface UserType {
  name: string;
  email: string;
  isLoggedIn: boolean;
}

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, setUser } = useAuth();

  // Don't show navbar on login or register pages
  if (
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/confirm-signup"
  ) {
    return null;
  }

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.log(getErrorMessage(error));
    }
    setUser(null);
    setIsMenuOpen(false);
    toast.success("Logged out successfully");
    window.location.href = "/login";
  };

  const handleNavigation = (path: string) => {
    router.push(path);
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => handleNavigation("/books")}
          >
            <Book className="h-6 w-6" />
            <span className="font-bold">عليم</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <div
            className={cn(
              "flex items-center text-sm font-medium transition-colors hover:text-primary cursor-pointer",
              pathname === "/books" ? "text-primary" : "text-muted-foreground"
            )}
            onClick={() => handleNavigation("/books")}
          >
            <FileText className="h-5 w-5" />
            <span className="ml-2">Library</span>
          </div>
          <div
            className={cn(
              "flex items-center text-sm font-medium transition-colors hover:text-primary cursor-pointer",
              pathname === "/books/new"
                ? "text-primary"
                : "text-muted-foreground"
            )}
            onClick={() => handleNavigation("/books/new")}
          >
            <PlusCircle className="h-5 w-5" />
            <span className="ml-2">New Book</span>
          </div>
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
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="h-5 w-5" />
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
              <div
                className={cn(
                  "flex items-center py-2 text-sm font-medium transition-colors hover:text-primary cursor-pointer",
                  pathname === "/books"
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
                onClick={() => handleNavigation("/books")}
              >
                <FileText className="h-5 w-5" />
                <span className="ml-2">Library</span>
              </div>
              <div
                className={cn(
                  "flex items-center py-2 text-sm font-medium transition-colors hover:text-primary cursor-pointer",
                  pathname === "/books/new"
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
                onClick={() => handleNavigation("/books/new")}
              >
                <PlusCircle className="h-5 w-5" />
                <span className="ml-2">New Book</span>
              </div>
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
                  <Button variant="ghost" size="icon" onClick={handleLogout}>
                    <LogOut className="h-5 w-5" />
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
