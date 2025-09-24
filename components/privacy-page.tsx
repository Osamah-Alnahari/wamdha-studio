"use client";

import { useState } from "react";
import {
  Shield,
  Lock,
  Eye,
  Database,
  FileText,
  CheckCircle,
  AlertTriangle,
  Key,
  Globe,
  Server,
  BookOpen,
  Scroll,
  UserCheck,
  Timer,
  Mail,
  Phone,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { APP_NAME } from "@/constants";

export function PrivacyPage() {
  const [activeSection, setActiveSection] = useState("overview");

  const privacyPrinciples = [
    {
      icon: Shield,
      title: "حماية البيانات",
      description:
        "مستنداتك والمعلومات الشخصية مشفرة ومحمية بأمان على مستوى المؤسسات.",
      color: "text-green-500",
      bgColor: "bg-green-100 dark:bg-green-900",
    },
    {
      icon: Eye,
      title: "الشفافية",
      description:
        "نوضح بوضوح البيانات التي نجمعها، وكيفية استخدامها، ونمنحك السيطرة على معلوماتك.",
      color: "text-blue-500",
      bgColor: "bg-blue-100 dark:bg-blue-900",
    },
    {
      icon: UserCheck,
      title: "سيطرة المستخدم",
      description:
        "أنت تملك بياناتك. يمكنك الوصول إليها أو تعديلها أو حذفها في أي وقت.",
      color: "text-purple-500",
      bgColor: "bg-purple-100 dark:bg-purple-900",
    },
    {
      icon: Lock,
      title: "الأمان أولاً",
      description:
        "نطبق أعلى معايير الأمان لحماية بياناتك من الوصول غير المصرح به.",
      color: "text-orange-500",
      bgColor: "bg-orange-100 dark:bg-orange-900",
    },
  ];

  const dataTypes = [
    {
      category: "معلومات الحساب",
      description: "المعلومات التي تقدمها عند إنشاء حسابك",
      items: [
        "الاسم وعنوان البريد الإلكتروني",
        "تفضيلات الحساب والإعدادات",
        "معلومات الملف الشخصي (اختياري)",
        "معلومات الاشتراك والفوترة",
      ],
      icon: UserCheck,
      retention: "حتى حذف الحساب",
    },
    {
      category: "محتوى المستندات",
      description: "المستندات والملفات التي ترفعها للمعالجة",
      items: [
        "ملفات المستندات الأصلية",
        "الملخصات والتحليلات المُنشأة",
        "التعليقات والتمييز",
        "تقدم القراءة والإشارات المرجعية",
      ],
      icon: FileText,
      retention: "تخزين يتحكم فيه المستخدم",
    },
    {
      category: "تحليلات الاستخدام",
      description: `بيانات مجهولة المصدر حول كيفية استخدامك ل${APP_NAME}`,
      items: [
        "أنماط استخدام الميزات",
        "مقاييس الأداء",
        "سجلات الأخطاء (مجهولة المصدر)",
        "تفاعلات واجهة المستخدم",
      ],
      icon: Database,
      retention: "12-24 شهر",
    },
    {
      category: "البيانات التقنية",
      description: "المعلومات المطلوبة لوظائف الخدمة",
      items: [
        "عنوان IP وبيانات الموقع",
        "معلومات المتصفح والجهاز",
        "رموز الجلسة والمصادقة",
        "سجلات استخدام API",
      ],
      icon: Server,
      retention: "30-90 يوم",
    },
  ];

  const securityMeasures = [
    {
      title: "التشفير من طرف إلى طرف",
      description:
        "جميع مستنداتك مشفرة أثناء النقل والتخزين باستخدام تشفير AES-256.",
    },
    {
      title: "هندسة المعرفة الصفرية",
      description:
        "نعالج مستنداتك دون تخزين المحتوى الحساس بشكل دائم على خوادمنا.",
    },
    {
      title: "مراجعات الأمان المنتظمة",
      description:
        "تقوم شركات الأمان المستقلة بمراجعة أنظمتنا بانتظام لضمان أعلى معايير الحماية.",
    },
    {
      title: "ضوابط الوصول",
      description:
        "ضوابط الوصول الصارمة للموظفين والمراقبة تضمن أن الموظفين المصرح لهم فقط يمكنهم الوصول للأنظمة.",
    },
    {
      title: "تقليل البيانات",
      description:
        "نجمع ونحتفظ فقط بالحد الأدنى من البيانات اللازمة لتقديم خدماتنا بفعالية.",
    },
    {
      title: "البنية التحتية الآمنة",
      description:
        "تعمل خدماتنا على بنية تحتية سحابية على مستوى المؤسسات مع طبقات متعددة من الأمان.",
    },
  ];

  const sections = [
    { id: "overview", title: "نظرة عامة", icon: BookOpen },
    { id: "collection", title: "جمع البيانات", icon: Database },
    { id: "usage", title: "كيفية استخدام البيانات", icon: Eye },
    { id: "security", title: "إجراءات الأمان", icon: Shield },
  ];

  return (
    <div className="min-h-screen public-page-bg">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 dark:from-gray-900 dark:via-violet-900/20 dark:to-purple-900/20 min-h-screen flex items-center">
        <div className="absolute inset-0 library-pattern opacity-10"></div>

        {/* Floating Security Icons */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 opacity-20 animate-pulse">
            <Shield className="w-16 h-16 text-violet-500" />
          </div>
          <div className="absolute top-40 right-10 opacity-20 floating-icon">
            <Lock className="w-12 h-12 text-purple-500" />
          </div>
          <div className="absolute bottom-20 left-20 opacity-20 animate-bounce">
            <Key className="w-10 h-10 text-indigo-500" />
          </div>
        </div>

        <div className="relative container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl mx-auto text-center">
            <Badge
              variant="outline"
              className="mb-6 px-4 py-2 text-sm font-medium border-violet-200 dark:border-violet-800"
            >
              <Scroll className="w-4 h-4 mr-2" />
              سياسة الخصوصية
            </Badge>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              خصوصيتك{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-600">
                مهمة
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              في {APP_NAME}، نؤمن أن الخصوصية حق أساسي. تعلم كيف نحمي بياناتك،
              نحترم خصوصيتك، ونمنحك السيطرة الكاملة على معلوماتك.
            </p>

            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Timer className="w-4 h-4" />
                <span>آخر تحديث: ديسمبر 2024</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <span>متوافق مع الخصوصية</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>البيانات محمية</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Principles */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                مبادئ الخصوصية لدينا
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                هذه المبادئ الأساسية توجه كل قرار نتخذه بشأن البيانات والخصوصية.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {privacyPrinciples.map((principle, index) => (
                <Card key={index} className="library-card-hover text-center">
                  <CardHeader>
                    <div
                      className={`w-16 h-16 mx-auto rounded-2xl ${principle.bgColor} flex items-center justify-center mb-4`}
                    >
                      <principle.icon
                        className={`w-8 h-8 ${principle.color}`}
                      />
                    </div>
                    <CardTitle className="text-xl">{principle.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed text-right">
                      {principle.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 md:py-32 bg-gradient-to-r from-violet-50 to-purple-50 dark:from-gray-900 dark:to-violet-900/10">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Navigation Sidebar */}
              <div className="lg:col-span-1">
                <Card className="sticky top-8">
                  <CardHeader>
                    <CardTitle className="text-lg">التنقل السريع</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {sections.map((section) => (
                      <Button
                        key={section.id}
                        variant={
                          activeSection === section.id ? "default" : "ghost"
                        }
                        className="w-full justify-start"
                        onClick={() => setActiveSection(section.id)}
                      >
                        <section.icon className="w-4 h-4 mr-2" />
                        {section.title}
                      </Button>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-3 space-y-8">
                {/* Overview */}
                <Card className="library-card-hover">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-3">
                      <BookOpen className="w-6 h-6 text-violet-500" />
                      نظرة عامة على سياسة الخصوصية
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="prose prose-gray dark:prose-invert max-w-none text-right">
                    <p className="text-lg leading-relaxed mb-6">
                      توضح سياسة الخصوصية هذه كيف يجمع ${APP_NAME} ويستخدم
                      ويعالج ويحمي معلوماتك الشخصية عند استخدامك للمنصة
                    </p>
                    <p className="leading-relaxed mb-4">
                      نحن ملتزمون بحماية خصوصيتك وضمان حصولك على تجربة إيجابية
                      على منصتنا. تحدد هذه السياسة ممارساتنا فيما يتعلق بجمع
                      واستخدام وكشف معلوماتك من خلال خدماتنا.
                    </p>
                    <p className="leading-relaxed mb-4">
                      هذه السياسة سارية المفعول اعتباراً من ديسمبر 2024 وتنطبق
                      على جميع مستخدمي منصة ${APP_NAME}.
                    </p>
                    <div className="bg-violet-50 dark:bg-violet-900/20 p-6 rounded-lg border border-violet-200 dark:border-violet-800">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-violet-500" />
                        ملاحظة مهمة
                      </h4>
                      <p className="text-sm text-muted-foreground text-right">
                        باستخدام ${APP_NAME}، فإنك توافق على جمع واستخدام
                        المعلومات وفقاً لهذه السياسة. إذا كنت لا توافق على
                        سياساتنا وممارساتنا، يرجى عدم استخدام خدماتنا.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Data Collection */}
                <Card className="library-card-hover">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-3">
                      <Database className="w-6 h-6 text-blue-500" />
                      المعلومات التي نجمعها
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-8">
                      {dataTypes.map((type, index) => (
                        <div
                          key={index}
                          className="border border-gray-200 dark:border-gray-700 rounded-lg p-6"
                        >
                          <div className="flex items-start gap-4 mb-4">
                            <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
                              <type.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div className="flex-1 text-right">
                              <h3 className="text-xl font-semibold mb-2">
                                {type.category}
                              </h3>
                              <p className="text-muted-foreground mb-4">
                                {type.description}
                              </p>
                              <div className="grid md:grid-cols-2 gap-2 mb-4">
                                {type.items.map((item, itemIndex) => (
                                  <div
                                    key={itemIndex}
                                    className="flex items-center gap-2 justify-end"
                                  >
                                    <span className="text-sm">{item}</span>
                                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                                  </div>
                                ))}
                              </div>
                              <Badge variant="outline" className="text-xs">
                                <Timer className="w-3 h-3 mr-1" />
                                الاحتفاظ: {type.retention}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Security Measures */}
                <Card className="library-card-hover">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-3">
                      <Shield className="w-6 h-6 text-green-500" />
                      كيف نحمي بياناتك
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg text-muted-foreground mb-6 text-right">
                      نطبق إجراءات أمان شاملة لحماية معلوماتك الشخصية من الوصول
                      غير المصرح به أو التعديل أو الكشف أو التدمير.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                      {securityMeasures.map((measure, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                        >
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <div className="text-right">
                            <h4 className="font-semibold mb-1">
                              {measure.title}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {measure.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              تجربة قراءة تركز على الخصوصية
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              اختبر قوة القراءة المدعومة بالذكاء الاصطناعي مع العلم أن بياناتك
              آمنة وخصوصيتك محمية.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8 py-6 text-lg">
                <Shield className="mr-2 h-5 w-5" />
                ابدأ القراءة بأمان
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-6 text-lg">
                <Mail className="mr-2 h-5 w-5" />
                اتصل بفريق الخصوصية
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
