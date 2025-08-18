"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Book,
  FileText,
  Sparkles,
  Upload,
  Brain,
  Search,
  ArrowRight,
  BookOpen,
  Zap,
  Shield,
  Users,
  Star,
  ChevronRight,
  Play,
  CheckCircle,
  Scroll
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";

export function HomePage() {
  const router = useRouter();
  const { user } = useAuth();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleGetStarted = () => {
    if (user?.isLoggedIn) {
      router.push("/books");
    } else {
      router.push("/register");
    }
  };

  const handleViewLibrary = () => {
    router.push("/books");
  };

  const features = [
    {
      icon: Upload,
      title: "رفع ذكي للمستندات",
      description: "ارفع ملفات PDF ومستندات Word والمزيد. يعالج الذكاء الاصطناعي محتواك فوراً.",
      color: "text-amber-600"
    },
    {
      icon: Brain,
      title: "ملخصات مدعومة بالذكاء الاصطناعي",
      description: "احصل على ملخصات ذكية تلتقط الرؤى الأساسية والنقاط الرئيسية.",
      color: "text-orange-600"
    },
    {
      icon: Search,
      title: "بحث متقدم",
      description: "اعثر على أي معلومة عبر مكتبتك بالكامل باستخدام البحث الدلالي.",
      color: "text-red-600"
    },
    {
      icon: BookOpen,
      title: "قراءة تفاعلية",
      description: "أضف التعليقات والإبرازات ونظم مواد القراءة دون عناء.",
      color: "text-amber-700"
    }
  ];

  const benefits = [
    "وفر 80% من وقت القراءة",
    "لا تفقد المعلومات المهمة أبداً",
    "اوصل إلى مكتبتك من أي مكان",
    "شارك الرؤى مع فريقك"
  ];

  const stats = [
    { number: "10K+", label: "مستند معالج" },
    { number: "95%", label: "وقت موفر" },
    { number: "4.9", label: "تقييم المستخدمين" },
    { number: "24/7", label: "متوفر" }
  ];

  return (
    <div className="min-h-screen public-page-bg">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-gray-900 dark:via-amber-900/20 dark:to-orange-900/20 library-ambiance">
        <div className="absolute inset-0 library-pattern opacity-10"></div>
        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Badge variant="outline" className="mb-6 px-4 py-2 text-sm font-medium">
              <Sparkles className="w-4 h-4 mr-2" />
              تجربة قراءة مدعومة بالذكاء الاصطناعي
            </Badge>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              مرحباً بكم في{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
                عليم
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              حوّل تجربة القراءة مع الملخصات المدعومة بالذكاء الاصطناعي والتحليل الذكي
              وإدارة المستندات السلسة. معرفتك، مُضخّمة.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button
                size="lg"
                className="px-8 py-6 text-lg font-semibold"
                onClick={handleGetStarted}
              >
                {user?.isLoggedIn ? "اذهب إلى المكتبة" : "ابدأ مجاناً"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              {user?.isLoggedIn && (
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-6 text-lg"
                  onClick={() => router.push("/books/new")}
                >
                  <Upload className="mr-2 h-5 w-5" />
                  رفع مستند
                </Button>
              )}

              {!user?.isLoggedIn && (
                <Button
                  variant="ghost"
                  size="lg"
                  className="px-8 py-6 text-lg"
                >
                  <Play className="mr-2 h-5 w-5" />
                  شاهد العرض التوضيحي
                </Button>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-primary">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Floating Library Elements */}
        <div className="absolute top-20 left-10 opacity-30">
          <div className="floating-book">
            <Book className="w-20 h-20 text-amber-600 dark:text-amber-400" />
          </div>
        </div>
        <div className="absolute top-32 right-20 opacity-25">
          <div className="floating-icon">
            <BookOpen className="w-14 h-24 text-orange-500 ml-12" />
          </div>
        </div>
        <div className="absolute top-60 left-1/4 opacity-20">
          <div className="page-flip">
            <FileText className="w-10 h-10 text-red-500" />
          </div>
        </div>
        <div className="absolute bottom-32 right-10 opacity-25">
          <div className="book-spine">
            <Scroll className="w-12 h-12 text-amber-500" />
          </div>
        </div>
        <div className="absolute bottom-20 left-20 opacity-20">
          <div className="knowledge-orb w-8 h-8"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              ميزات قوية للقراء المعاصرين
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              كل ما تحتاجه لثورة في طريقة استهلاك وفهم المحتوى المكتوب
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group library-card-hover library-shelf">
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-amber-100 to-orange-200 dark:from-amber-900 dark:to-orange-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 book-stack`}>
                    <feature.icon className={`w-8 h-8 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 md:py-32 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-gray-900 dark:to-amber-900/10 library-ambiance">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                لماذا تختار عليم؟
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                انضم إلى آلاف المختصين والطلاب والباحثين الذين حولوا
                سير عمل القراءة مع منصتنا الذكية.
              </p>
                
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                      <span className="text-lg">{benefit}</span>
                    </div>
                  ))}
                </div>

                <Button className="mt-8" size="lg" onClick={handleGetStarted}>
                  ابدأ رحلتك
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </div>

              <div className="relative">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300 book-stack">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="space-y-4">
                    <div className="h-4 bg-amber-200 dark:bg-amber-800 rounded w-3/4"></div>
                    <div className="h-4 bg-orange-200 dark:bg-orange-800 rounded w-1/2"></div>
                    <div className="h-4 bg-amber-300 dark:bg-amber-700 rounded w-2/3"></div>
                    <div className="h-6 bg-gradient-to-r from-amber-200 to-orange-200 dark:from-amber-900 dark:to-orange-900 rounded w-full reading-progress"></div>
                    <div className="h-4 bg-amber-200 dark:bg-amber-800 rounded w-5/6"></div>
                  </div>
                  <div className="mt-6 flex gap-2">
                    <Badge variant="secondary" className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200">
                      <BookOpen className="w-3 h-3 mr-1" />
                      AI Summary
                    </Badge>
                    <Badge variant="outline" className="border-orange-300 text-orange-700 dark:border-orange-700 dark:text-orange-300">
                      <Sparkles className="w-3 h-3 mr-1" />
                      Key Points
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              هل أنت مستعد لتحويل قراءتك؟
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              انضم إلى ثورة تحليل المستندات وإدارة المعرفة.
              ابدأ رحلتك المجانية اليوم.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8 py-6 text-lg" onClick={handleGetStarted}>
                <Zap className="mr-2 h-5 w-5" />
                {user?.isLoggedIn ? "اذهب إلى المكتبة" : "ابدأ تجربة مجانية"}
              </Button>

              {!user?.isLoggedIn && (
                <Button variant="outline" size="lg" className="px-8 py-6 text-lg" onClick={() => router.push("/login")}>
                  <Users className="mr-2 h-5 w-5" />
                  تسجيل الدخول
                </Button>
              )}
            </div>

            <p className="text-sm text-muted-foreground mt-6">
              لا حاجة لبطاقة ائتمان • خطة مجانية متوفرة دائماً
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
