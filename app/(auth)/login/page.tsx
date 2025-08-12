"use client";
import { LoginForm } from "@/components/auth/login-form";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!isLoading && user?.isLoggedIn) {
      router.push("/books");
    }
  }, [user?.isLoggedIn, isLoading, router]);

  if (user?.isLoggedIn) {
    return null;
  }

  return <LoginForm />;
}
