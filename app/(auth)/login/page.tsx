"use client";
import { LoginForm } from "@/components/auth/login-form";
import { useAuth } from "@/contexts/AuthContext";
import { redirect } from "next/navigation";


export default function LoginPage() {

  if ((useAuth())?.user?.isLoggedIn) {
    redirect("/books");
  }
  return <LoginForm />;
}
