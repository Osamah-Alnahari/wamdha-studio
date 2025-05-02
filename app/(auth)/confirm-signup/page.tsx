import { ConfirmSignupForm } from "@/components/auth/confirm-signup-form";
import { Suspense } from "react";
export const metadata = {
  title: "Confirm Signup",
  description: "Confirm your email",
};

export default function ConfirmSignupPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ConfirmSignupForm />
    </Suspense>
  );
}
