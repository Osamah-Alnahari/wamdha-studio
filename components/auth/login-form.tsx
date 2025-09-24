"use client";

import type React from "react";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  Loader2,
  Book,
  BookOpen,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { getErrorMessage } from "@/utils/get-error-message";
import { useAuth } from "@/contexts/AuthContext";
import {
  signInUser,
  resendConfirmationCode,
  getCurrentSession,
  extractUserFromSession,
  listenToAuthEvents,
} from "@/lib/services";
import { getCurrentUser, signInWithRedirect } from "@aws-amplify/auth";
import type { AuthUser } from "@aws-amplify/auth";
import { useAmplifyClient } from "@/hooks/use-amplify-client";
import { APP_NAME } from "@/constants";

export function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [customState, setCustomState] = useState<string | null>(null);
  const { setUser } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    form: "",
  });
  const { client } = useAmplifyClient();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (errors.form) {
      setErrors((prev) => ({ ...prev, form: "" }));
    }
  };

  const getUser = async (): Promise<void> => {
    try {
      const currentUser = await getCurrentUser();
      setCurrentUser(currentUser);
      console.log("Current user:", currentUser);

      // Update auth context after OAuth
      const session = await getCurrentSession();
      if (session) {
        const userInfo = extractUserFromSession(session);
        if (userInfo) {
          setUser(userInfo);
          // Only redirect if we're on the login page
          if (
            window.location.pathname === "/login" ||
            window.location.pathname === "/"
          ) {
            router.push("/books");
          }
        }
      }
    } catch (error) {
      console.log("Not signed in");
    }
  };

  useEffect(() => {
    console.log("starting1");
    const unsubscribe = listenToAuthEvents(({ payload }) => {
      console.log("starting2");

      switch (payload.event) {
        case "signInWithRedirect":
          getUser();
          break;
        case "signInWithRedirect_failure":
          console.log("Sign in with redirect failed:", payload.data);
          toast.error("Google sign-in failed. Please try again.");
          setIsLoading(false);
          break;
        case "customOAuthState":
          setCustomState(payload.data);
          break;
      }
    });

    getUser();

    return unsubscribe;
  }, [router, setUser]);

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    if (!formData.email.trim()) {
      newErrors.email = "البريد الإلكتروني مطلوب";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "البريد الإلكتروني غير صحيح";
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = "كلمة المرور مطلوبة";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    let redirectLink = "/books";

    try {
      const result = await signInUser({
        username: String(formData.email),
        password: String(formData.password),
      });

      const { isSignedIn, nextStep } = result;

      if (nextStep.signInStep === "CONFIRM_SIGN_UP") {
        await resendConfirmationCode(String(formData.email));
        redirectLink = "/confirm-signup?email=" + formData.email;
      } else if (isSignedIn) {
        const session = await getCurrentSession();
        if (session) {
          const userInfo = extractUserFromSession(session);
          if (userInfo) {
            setUser(userInfo);
          }
        }
      }

      router.push(redirectLink);
    } catch (error) {
      console.log("Error signing in:", (error as Error).name);
      toast.error(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-gray-900 dark:via-amber-900/20 dark:to-orange-900/20">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 library-pattern opacity-20"></div>

      {/* Geometric Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-amber-200/30 to-orange-200/30 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-red-200/30 to-pink-200/30 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-orange-200/20 to-amber-200/20 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      {/* Enhanced Floating Library Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 opacity-30">
          <div className="floating-book">
            <BookOpen className="w-16 h-16 text-amber-600 dark:text-amber-400 drop-shadow-lg" />
          </div>
        </div>
        <div className="absolute top-40 right-20 opacity-25">
          <div className="floating-icon">
            <Book className="w-14 h-14 text-orange-500 drop-shadow-lg" />
          </div>
        </div>
        <div className="absolute bottom-32 left-20 opacity-25">
          <div className="page-flip">
            <FileText className="w-12 h-12 text-red-500 drop-shadow-lg" />
          </div>
        </div>
        <div className="absolute bottom-20 right-10 opacity-30">
          <div className="knowledge-orb w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full shadow-lg"></div>
        </div>
        <div className="absolute top-1/3 left-1/4 opacity-20">
          <div className="book-spine">
            <Book className="w-8 h-8 text-amber-700 dark:text-amber-300" />
          </div>
        </div>
        <div className="absolute bottom-1/3 right-1/4 opacity-20">
          <div className="floating-icon">
            <FileText className="w-10 h-10 text-orange-600 dark:text-orange-400" />
          </div>
        </div>
      </div>

      <div className="relative container flex min-h-screen w-screen flex-col items-center justify-center">
        <div className="mx-auto flex w-full flex-col justify-center space-y-8 sm:w-[450px]">
          {/* Header with Logo */}
          <div className="flex flex-col space-y-4 text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-600 to-orange-600 flex items-center justify-center">
                <Book className="h-7 w-7 text-white" />
              </div>
              <span className="text-3xl font-bold">{APP_NAME}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">
              مرحباً بك مرة أخرى
            </h1>
            <p className="text-lg text-muted-foreground">
              سجل دخولك للوصول إلى مكتبتك الذكية
            </p>
          </div>

          {/* Main Card */}
          <div className="library-card-hover bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border rounded-2xl p-8 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {errors.form && (
                <div className="rounded-lg bg-destructive/15 p-4 text-sm text-destructive border border-destructive/20">
                  {errors.form}
                </div>
              )}

              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className={cn(
                    "text-base font-medium",
                    errors.email && "text-destructive"
                  )}
                >
                  البريد الإلكتروني
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    placeholder="name@example.com"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    className={cn(
                      "pl-12 py-3 text-base rounded-xl border-2 transition-all duration-200",
                      errors.email &&
                        "border-destructive focus-visible:ring-destructive"
                    )}
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="password"
                    className={cn(
                      "text-base font-medium",
                      errors.password && "text-destructive"
                    )}
                  >
                    كلمة المرور
                  </Label>
                  <Link
                    href="#"
                    className="text-sm text-primary hover:underline"
                  >
                    نسيت كلمة المرور؟
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className={cn(
                      "pl-12 pr-12 py-3 text-base rounded-xl border-2 transition-all duration-200",
                      errors.password &&
                        "border-destructive focus-visible:ring-destructive"
                    )}
                    value={formData.password}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1 h-10 w-10"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full py-3 text-base font-semibold rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 transition-all duration-200"
                disabled={isLoading}
                size="lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    جاري تسجيل الدخول...
                  </>
                ) : (
                  <>
                    تسجيل الدخول
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white dark:bg-gray-800 px-4 text-muted-foreground">
                  أو تابع مع
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                type="button"
                disabled={isLoading}
                className="py-3 rounded-xl border-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
              >
                <svg className="mr-2 h-5 w-5" viewBox="0 0 496 512">
                  <path
                    fill="currentColor"
                    d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
                  />
                </svg>
                GitHub
              </Button>
              <Button
                variant="outline"
                type="button"
                disabled={isLoading}
                className="py-3 rounded-xl border-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
                onClick={async () => {
                  setIsLoading(true);
                  try {
                    await signInWithRedirect({
                      provider: "Google",
                      customState: "/books",
                    });
                  } catch (error) {
                    console.error("Google sign-in error:", error);
                    toast.error("Failed to initiate Google sign-in");
                    setIsLoading(false);
                  }
                }}
              >
                <svg className="mr-2 h-5 w-5" viewBox="0 0 488 512">
                  <path
                    fill="currentColor"
                    d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                  />
                </svg>
                Google
              </Button>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center">
            <p className="text-muted-foreground">
              ليس لديك حساب؟{" "}
              <Link
                href="/register"
                className="text-primary font-semibold hover:underline"
              >
                إنشاء حساب جديد
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
