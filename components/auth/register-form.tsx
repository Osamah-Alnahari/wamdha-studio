"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  ArrowRight,
  Loader2,
  Book,
  BookOpen,
  FileText,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { getErrorMessage } from "@/utils/get-error-message";
import { signUpUser } from "@/lib/services";

export function RegisterForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    if (!formData.name.trim()) {
      newErrors.name = "الاسم مطلوب";
      valid = false;
    }

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
    } else if (formData.password.length < 6) {
      newErrors.password = "كلمة المرور يجب أن تكون 6 أحرف على الأقل";
      valid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "كلمات المرور غير متطابقة";
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

    try {
      const { isSignUpComplete, userId, nextStep } = await signUpUser({
        username: String(formData.email),
        password: String(formData.password),
        userAttributes: {
          email: String(formData.email),
          preferred_username: String(formData.name),
          given_name: String(formData.name),
        },
      });
      router.push("/confirm-signup?email=" + formData.email);
    } catch (error) {
      console.log("Error signing up:", error);
      toast.error(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  const passwordStrength = {
    length: formData.password.length >= 6,
    lowercase: /[a-z]/.test(formData.password),
    uppercase: /[A-Z]/.test(formData.password),
    number: /\d/.test(formData.password),
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 library-pattern opacity-20"></div>
      
      {/* Geometric Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-200/30 to-blue-200/30 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-indigo-200/30 to-purple-200/30 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-blue-200/20 to-purple-200/20 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>
      
      {/* Enhanced Floating Library Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 opacity-30">
          <div className="floating-book">
            <BookOpen className="w-16 h-16 text-purple-600 dark:text-purple-400 drop-shadow-lg" />
          </div>
        </div>
        <div className="absolute top-40 right-20 opacity-25">
          <div className="floating-icon">
            <Book className="w-14 h-14 text-blue-500 drop-shadow-lg" />
          </div>
        </div>
        <div className="absolute bottom-32 left-20 opacity-25">
          <div className="page-flip">
            <FileText className="w-12 h-12 text-indigo-500 drop-shadow-lg" />
          </div>
        </div>
        <div className="absolute bottom-20 right-10 opacity-30">
          <div className="knowledge-orb w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full shadow-lg"></div>
        </div>
        <div className="absolute top-1/3 right-1/4 opacity-20">
          <div className="book-spine">
            <Book className="w-8 h-8 text-purple-700 dark:text-purple-300" />
          </div>
        </div>
        <div className="absolute bottom-1/3 left-1/4 opacity-20">
          <div className="floating-icon">
            <FileText className="w-10 h-10 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
      </div>

      <div className="relative container min-h-screen w-screen py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto px-4">
          

          {/* Right Column - Form Card */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md">
              <div className="library-card-hover bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border rounded-2xl p-8 shadow-2xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="name"
                      className={cn("text-base font-medium", errors.name && "text-destructive")}
                    >
                      الاسم الكامل
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="name"
                        name="name"
                        placeholder="أدخل اسمك الكامل"
                        className={cn(
                          "pl-12 py-3 text-base rounded-xl border-2 transition-all duration-200",
                          errors.name && "border-destructive focus-visible:ring-destructive"
                        )}
                        value={formData.name}
                        onChange={handleChange}
                        disabled={isLoading}
                      />
                    </div>
                    {errors.name && (
                      <p className="text-sm text-destructive">{errors.name}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className={cn("text-base font-medium", errors.email && "text-destructive")}
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
                          errors.email && "border-destructive focus-visible:ring-destructive"
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
                    <Label
                      htmlFor="password"
                      className={cn("text-base font-medium", errors.password && "text-destructive")}
                    >
                      كلمة المرور
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        className={cn(
                          "pl-12 pr-12 py-3 text-base rounded-xl border-2 transition-all duration-200",
                          errors.password && "border-destructive focus-visible:ring-destructive"
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
                    
                    {/* Password Strength Indicator */}
                    {formData.password && (
                      <div className="space-y-2 mt-3">
                        <p className="text-sm font-medium">قوة كلمة المرور:</p>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className={cn("flex items-center gap-1", passwordStrength.length ? "text-green-600" : "text-gray-400")}>
                            <CheckCircle className="w-3 h-3" />
                            <span>6 أحرف على الأقل</span>
                          </div>
                          <div className={cn("flex items-center gap-1", passwordStrength.lowercase ? "text-green-600" : "text-gray-400")}>
                            <CheckCircle className="w-3 h-3" />
                            <span>حرف صغير</span>
                          </div>
                          <div className={cn("flex items-center gap-1", passwordStrength.uppercase ? "text-green-600" : "text-gray-400")}>
                            <CheckCircle className="w-3 h-3" />
                            <span>حرف كبير</span>
                          </div>
                          <div className={cn("flex items-center gap-1", passwordStrength.number ? "text-green-600" : "text-gray-400")}>
                            <CheckCircle className="w-3 h-3" />
                            <span>رقم</span>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {errors.password && (
                      <p className="text-sm text-destructive">{errors.password}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="confirmPassword"
                      className={cn("text-base font-medium", errors.confirmPassword && "text-destructive")}
                    >
                      تأكيد كلمة المرور
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        className={cn(
                          "pl-12 py-3 text-base rounded-xl border-2 transition-all duration-200",
                          errors.confirmPassword && "border-destructive focus-visible:ring-destructive"
                        )}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        disabled={isLoading}
                      />
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-sm text-destructive">{errors.confirmPassword}</p>
                    )}
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full py-3 text-base font-semibold rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-200" 
                    disabled={isLoading}
                    size="lg"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        جاري إنشاء الحساب...
                      </>
                    ) : (
                      <>
                        إنشاء الحساب
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </form>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-white dark:bg-gray-800 px-4 text-muted-foreground">
                      أو تابع مع
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    type="button"
                    disabled={isLoading}
                    className="py-2 rounded-xl border-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
                  >
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 496 512">
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
                    className="py-2 rounded-xl border-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
                  >
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 488 512">
                      <path
                        fill="currentColor"
                        d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                      />
                    </svg>
                    Google
                  </Button>
                </div>
                
                {/* Footer */}
                <div className="text-center mt-6">
                  <p className="text-muted-foreground text-sm">
                    لديك حساب بالفعل؟{" "}
                    <Link
                      href="/login"
                      className="text-primary font-semibold hover:underline"
                    >
                      تسجيل الدخول
                    </Link>
                  </p>
                </div>

                {/* Terms and Privacy */}
                <div className="text-center text-xs text-muted-foreground mt-4">
                  <p>
                    بإنشاء حساب، أنت توافق على{" "}
                    <Link href="/terms-and-conditions" className="text-primary hover:underline">
                      الشروط والأحكام
                    </Link>{" "}
                    و{" "}
                    <Link href="/private" className="text-primary hover:underline">
                      سياسة الخصوصية
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Left Column - Header Content */}
          <div className="flex flex-col justify-center space-y-8 text-center lg:text-right">
            <div className="flex items-center justify-center lg:justify-start gap-4 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-xl">
                <Book className="h-9 w-9 text-white" />
              </div>
              <span className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">عليم</span>
            </div>
            
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                إنشاء حساب{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                  جديد
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0">
                انضم إلى آلاف المستخدمين في رحلة التعلم الذكي واكتشف قوة الذكاء الاصطناعي في تحليل المستندات
              </p>
              
              <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>مجاني تماماً</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>ذكاء اصطناعي متقدم</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>بدء فوري</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
