"use client";
import { RegisterForm } from "@/components/auth/register-form";
import { useAuth } from "@/contexts/AuthContext";
import { redirect } from "next/navigation";

export default function RegisterPage() {
  if (useAuth()?.user?.isLoggedIn) {
    redirect("/books");
  }
  return <RegisterForm />;
}
