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
  Scroll,
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
      description:
        "يحلل الذكاء الاصطناعي محتواك ويستخرج المعلومات المهمة تلقائياً",
      color: "text-amber-600",
    },
    {
      icon: Brain,
      title: "ملخصات مدعومة بالذكاء الاصطناعي",
      description: "احصل على ملخصات ذكية تلتقط الرؤى الأساسية والنقاط الرئيسية",
      color: "text-orange-600",
    },
    {
      icon: Search,
      title: "إنشاء الصور من النص",
      description:
        "حول النص إلى صور توضيحية باستخدام الذكاء الاصطناعي. احصل على رسوم توضيحية تلقائية لمحتواك",
      color: "text-red-600",
    },
    {
      icon: BookOpen,
      title: "معاينة الهاتف المحمول",
      description: "احصل على معاينة فورية لشكل المحتوى على الشاشات الصغيرة",
      color: "text-amber-700",
    },
  ];

  const benefits = [
    "وفر 80% من وقت القراءة",
    "لا تفقد المعلومات المهمة أبداً",
    "اوصل إلى مكتبتك من أي مكان",
  ];

  const stats = [
    { number: "xx", label: "مستند معالج" },
    { number: "xx", label: "وقت موفر" },
    { number: "xx", label: "تقييم المستخدمين" },
    { number: "24/7", label: "متوفر" },
  ];

  return (
    <div className="min-h-screen public-page-bg">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-gray-900 dark:via-amber-900/20 dark:to-orange-900/20 library-ambiance min-h-screen flex items-center">
        <div className="absolute inset-0 library-pattern opacity-10"></div>
        <div className="relative container mx-auto px-4 py-12 md:py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            {/* Book Preview - Left Column */}
            <div
              className={`relative transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-10"
              }`}
            >
              <div className="relative">
                {/* Multiple book covers arranged in a stack/grid */}
                <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
                  <div className="transform rotate-6 hover:rotate-12 transition-transform duration-300">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets%2F07886841aac447a0bacf69bae3b6d774%2F8c61c2bd69bc443ebca74e684fa50c6c?format=webp&width=800"
                      alt="كتاب 250 تقنية في التلاعب النفسي"
                      className="w-full h-auto rounded-xl shadow-2xl"
                    />
                  </div>
                  <div className="transform -rotate-3 hover:-rotate-6 transition-transform duration-300 mt-8">
                    <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-2xl aspect-[3/4] flex items-center justify-center text-white p-6">
                      <div className="text-center">
                        <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-80" />
                        <h3 className="text-lg font-bold mb-2">كتاب تجريبي</h3>
                        <p className="text-sm opacity-80">
                          إدارة الوقت والإنتاجية
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="transform rotate-2 hover:rotate-6 transition-transform duration-300 -mt-4">
                    <div className="bg-gradient-to-br from-green-600 to-teal-600 rounded-xl shadow-2xl aspect-[3/4] flex items-center justify-center text-white p-6">
                      <div className="text-center">
                        <Brain className="w-12 h-12 mx-auto mb-4 opacity-80" />
                        <h3 className="text-lg font-bold mb-2">علم النفس</h3>
                        <p className="text-sm opacity-80">
                          التفكير النقدي والإبداع
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="transform -rotate-6 hover:-rotate-12 transition-transform duration-300 mt-6">
                    <div className="bg-gradient-to-br from-orange-600 to-red-600 rounded-xl shadow-2xl aspect-[3/4] flex items-center justify-center text-white p-6">
                      <div className="text-center">
                        <Star className="w-12 h-12 mx-auto mb-4 opacity-80" />
                        <h3 className="text-lg font-bold mb-2">
                          التطوير الذاتي
                        </h3>
                        <p className="text-sm opacity-80">
                          بناء العادات الإيجابية
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating animation elements */}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-amber-500 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-6 -right-6 w-8 h-8 bg-purple-500 rounded-full opacity-30 animate-bounce"></div>
              </div>
            </div>

            {/* Content - Right Column */}
            <div
              className={`text-center lg:text-right transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-10"
              }`}
            >
              <Badge
                variant="outline"
                className="mb-6 px-4 py-2 text-sm font-medium"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                تجربة قراءة مدعومة بالذكاء الاصطناعي
              </Badge>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
                مرحباً بك في{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
                  عليم
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
                حوّل تجربة القراءة مع الملخصات المدعومة بالذكاء الاصطناعي
                والتحليل الذكي وإدارة المستندات السلسة. معرفتك، مُضخّمة.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-12">
                <Button
                  size="lg"
                  className="px-8 py-6 text-lg font-semibold"
                  onClick={handleGetStarted}
                >
                  {user?.isLoggedIn ? "اذهب إلى المكتبة" : "ابدأ مجاناً"}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>

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
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center lg:text-right">
                    <div className="text-2xl md:text-3xl font-bold text-primary">
                      {stat.number}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
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
              ميزات متقدمة لتحسين تجربة القراءة
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              اكتشف أدوات ذكية تساعدك على فهم المحتوى بسرعة وسهولة أكبر
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group library-card-hover library-shelf"
              >
                <CardHeader className="text-center pb-4">
                  <div
                    className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-amber-100 to-orange-200 dark:from-amber-900 dark:to-orange-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 book-stack`}
                  >
                    <feature.icon className={`w-8 h-8 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
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
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="relative order-2 md:order-1">
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
                    <Badge
                      variant="secondary"
                      className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
                    >
                      <BookOpen className="w-3 h-3 mr-1" />
                      AI Summary
                    </Badge>
                    <Badge
                      variant="outline"
                      className="border-orange-300 text-orange-700 dark:border-orange-700 dark:text-orange-300"
                    >
                      <Sparkles className="w-3 h-3 mr-1" />
                      Key Points
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="order-1 md:order-2 text-right">
                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-right">
                  لماذا تختار عليم؟
                </h2>
                <p className="text-lg text-muted-foreground mb-10 text-right leading-relaxed">
                  انضم إلى آلاف المختصين والطلاب والباحثين الذين حولوا سير عمل
                  القراءة مع منصتنا الذكية.
                </p>

                <div className="space-y-6 mb-10">
                  {benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 justify-end"
                    >
                      <span className="text-lg text-right">{benefit}</span>
                      <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                    </div>
                  ))}
                </div>

                <div className="text-right">
                  <Button
                    className="px-8 py-4 text-lg"
                    size="lg"
                    onClick={handleGetStarted}
                  >
                    ابدأ رحلتك
                    <ChevronRight className="mr-2 h-5 w-5" />
                  </Button>
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
              انضم إلى ثورة تحليل المستندات وإدارة المعرفة. ابدأ رحلتك المجانية
              اليوم.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="px-8 py-6 text-lg"
                onClick={handleGetStarted}
              >
                <Zap className="mr-2 h-5 w-5" />
                {user?.isLoggedIn ? "اذهب إلى المكتبة" : "ابدأ تجربة مجانية"}
              </Button>

              {!user?.isLoggedIn && (
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-6 text-lg"
                  onClick={() => router.push("/login")}
                >
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
