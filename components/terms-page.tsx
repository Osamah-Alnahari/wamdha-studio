"use client";

import { useState } from "react";
import {
  FileText,
  Scale,
  Shield,
  AlertCircle,
  CheckCircle,
  Book,
  Scroll,
  Gavel,
  Users,
  Globe,
  Clock,
  RefreshCw,
  Mail,
  ExternalLink,
  Info,
  AlertTriangle,
  UserCheck,
  CreditCard,
  Download,
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
import { Alert, AlertDescription } from "@/components/ui/alert";

export function TermsPage() {
  const keyHighlights = [
    {
      icon: UserCheck,
      title: "مسؤوليات المستخدم",
      description:
        "أنت مسؤول عن الحفاظ على أمان حسابك وجميع الأنشطة التي تتم تحت حسابك.",
      color: "text-blue-500",
      bgColor: "bg-blue-100 dark:bg-blue-900",
    },
    {
      icon: FileText,
      title: "حقوق المحتوى",
      description:
        "تحتفظ بملكية المحتوى الذي ترفعه. نحن نعالجه فقط لتقديم خدماتنا.",
      color: "text-green-500",
      bgColor: "bg-green-100 dark:bg-green-900",
    },
    {
      icon: CreditCard,
      title: "شروط الاشتراك",
      description:
        "دورات فوترة واضحة، سياسات الإلغاء، وشروط الاسترداد لجميع خطط الاشتراك.",
      color: "text-purple-500",
      bgColor: "bg-purple-100 dark:bg-purple-900",
    },
    {
      icon: Shield,
      title: "توفر الخدمة",
      description:
        "نسعى لتحقيق توفر بنسبة 99.9% ولكن لا يمكننا ضمان توفر الخدمة دون انقطاع.",
      color: "text-orange-500",
      bgColor: "bg-orange-100 dark:bg-orange-900",
    },
  ];

  const termsSection = [
    {
      id: "acceptance",
      title: "قبول الشروط",
      icon: CheckCircle,
      content: `باستخدام منصة عليم ("الخدمة")، فإنك تقبل وتوافق على الالتزام بشروط وأحكام هذه الاتفاقية. إذا كنت لا توافق على الالتزام بما سبق، يرجى عدم استخدام هذه الخدمة.

الخدمة مملوكة ومدارة بواسطة أسامة النهاري ("الشركة"، "نحن"، "لنا"). تحكم شروط الخدمة هذه ("الشروط") استخدامك لمنصة تحليل المستندات المدعومة بالذكاء الاصطناعي، بما في ذلك جميع المحتويات والميزات والوظائف المقدمة من خلال خدمتنا.

تشكل هذه الشروط اتفاقية ملزمة قانونياً بينك وبين عليم. يرجى قراءتها بعناية لأنها تؤثر على حقوقك والتزاماتك القانونية.`,
    },
    {
      id: "definitions",
      title: "التعريفات",
      icon: Book,
      content: `لأغراض هذه الشروط:

• "الخدمة" تشير إلى منصة عليم، بما في ذلك الموقع الإلكتروني والتطبيقات المحمولة والخدمات ذات الصلة
• "المستخدم"، "أنت"، و"لك" تشير إلى الفرد أو الكيان الذي يستخدم الخدمة
• "المحتوى" يعني أي معلومات أو بيانات أو نصوص أو مستندات أو مواد أخرى يتم رفعها أو إنشاؤها من خلال الخدمة
• "الحساب" يعني حساب المستخدم المسجل لديك مع الخدمة
• "الاشتراك" يشير إلى الخطط المدفوعة التي توفر الوصول إلى الميزات المتميزة
• "معالجة الذكاء الاصطناعي" تعني تحليل الذكاء الاصطناعي وملخص المستندات التي ترفعها`,
    },
    {
      id: "usage",
      title: "سياسة الاستخدام المقبول",
      icon: Scale,
      content: `توافق على استخدام عليم للأغراض القانونية فقط ووفقاً لهذه الشروط. توافق على عدم استخدام الخدمة:

الأنشطة المحظورة:
• لرفع مواد محمية بحقوق النشر دون ترخيص مناسب
• لمعالجة مستندات تحتوي على محتوى غير قانوني أو خطاب كراهية أو مواد ضارة
• لمحاولة الهندسة العكسية أو الاختراق أو المساس بأنظمة الأمان لدينا
• لمشاركة بيانات اعتماد حسابك مع أطراف غير مصرح لها
• لاستخدام أنظمة آلية للوصول إلى الخدمة دون إذن
• لانتهاك أي قانون محلي أو ولاية أو وطني أو دولي معمول به

إرشادات المحتوى:
• أنت مسؤول بالكامل عن المحتوى الذي ترفعه
• يجب أن يتوافق المحتوى مع قوانين حقوق النشر والملكية الفكرية المعمول بها
• نحتفظ بالحق في إزالة المحتوى الذي ينتهك هذه الإرشادات
• قد تؤدي الانتهاكات المتكررة إلى تعليق أو إنهاء الحساب`,
    },
    {
      id: "intellectual",
      title: "حقوق الملكية الفكرية",
      icon: FileText,
      content: `محتواك:
تحتفظ بجميع الحقوق للمحتوى الذي ترفعه إلى عليم. باستخدام خدمتنا، تمنحنا ترخيصاً محدوداً لمعالجة محتواك حصرياً لغرض تقديم خدمات تحليل وملخص الذكاء الاصطناعي لدينا.

محتوانا:
الخدمة، بما في ذلك تصميمها وميزاتها وتقنيتها وخوارزميات الذكاء الاصطناعي، مملوكة لعليم ومحمية بموجب قوانين حقوق النشر والعلامات التجارية والملكية الفكرية الأخرى.

المحتوى المُنشأ بالذكاء الاصطناعي:
الملخصات والتحليلات المُنشأة بواسطة الذكاء الاصطناعي لدينا تصبح جزءاً من مكتبة محتواك. لديك الحق في استخدام وتعديل وحذف هذا المحتوى المُنشأ كما تراه مناسباً.

حقوق العلامات التجارية:
عليم، وشعاراتنا، وعلامات الخدمة هي علامات تجارية لعليم إنك. لا يجوز لك استخدام علاماتنا التجارية دون موافقتنا الكتابية المسبقة.`,
    },
    {
      id: "privacy",
      title: "الخصوصية وحماية البيانات",
      icon: Shield,
      content: `جمع البيانات واستخدامها:
سياسة الخصوصية لدينا، المدمجة في هذه الشروط بالمرجع، توضح كيف نجمع ونستخدم ونحمي معلوماتك الشخصية والمحتوى.

أمان البيانات:
نطبق إجراءات أمان معيارية في الصناعة لحماية بياناتك، بما في ذلك التشفير وضوابط الوصول والمراجعات الأمنية المنتظمة.

احتفاظ البيانات:
• يتم الاحتفاظ ببيانات الحساب حتى تحذف حسابك
• يتم معالجة محتوى المستندات ولكن لا يتم تخزينها بشكل دائم ما لم تختار حفظها
• قد نحتفظ ببيانات تحليل مجهولة المصدر لتحسين الخدمة

التحويلات الدولية للبيانات:
قد يتم معالجة وتخزين بياناتك في دول أخرى غير دولتك. نضمن وجود ضمانات مناسبة للتحويلات الدولية للبيانات.`,
    },
  ];

  return (
    <div className="min-h-screen public-page-bg">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 dark:from-gray-900 dark:via-slate-900/20 dark:to-zinc-900/20 min-h-screen flex items-center">
        <div className="absolute inset-0 library-pattern opacity-10"></div>

        {/* Floating Legal Icons */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 opacity-20 animate-pulse">
            <Scale className="w-16 h-16 text-slate-500" />
          </div>
          <div className="absolute top-40 right-10 opacity-20 floating-icon">
            <Gavel className="w-12 h-12 text-gray-500" />
          </div>
          <div className="absolute bottom-20 left-20 opacity-20 animate-bounce">
            <FileText className="w-10 h-10 text-zinc-500" />
          </div>
        </div>

        <div className="relative container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl mx-auto text-center">
            <Badge
              variant="outline"
              className="mb-6 px-4 py-2 text-sm font-medium border-slate-200 dark:border-slate-800"
            >
              <Scroll className="w-4 h-4 mr-2" />
              اتفاقية قانونية
            </Badge>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              الشروط و{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-600 to-gray-600">
                الأحكام
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              تحكم هذه الشروط استخدامك لمنصة عليم. باستخدام منصة القراءة
              المدعومة بالذكاء الاصطناعي، فإنك توافق على هذه الشروط والأحكام.
            </p>

            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>آخر تحديث: ديسمبر 2024</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <span>قابل للتطبيق عالمياً</span>
              </div>
              <div className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                <span>تحميل PDF</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Highlights */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                الشروط الرئيسية في لمحة
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                إليك أهم النقاط التي يجب أن تعرفها حول استخدام عليم.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {keyHighlights.map((highlight, index) => (
                <Card key={index} className="library-card-hover text-center">
                  <CardHeader>
                    <div
                      className={`w-16 h-16 mx-auto rounded-2xl ${highlight.bgColor} flex items-center justify-center mb-4`}
                    >
                      <highlight.icon
                        className={`w-8 h-8 ${highlight.color}`}
                      />
                    </div>
                    <CardTitle className="text-xl">{highlight.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed text-right">
                      {highlight.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Important Notice */}
            <Alert className="border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-900/20">
              <AlertTriangle className="h-4 w-4 text-orange-500" />
              <AlertDescription className="text-orange-800 dark:text-orange-200 text-right">
                <strong>مهم:</strong> بإنشاء حساب أو استخدام عليم، فإنك توافق
                على الالتزام بشروط الخدمة هذه. إذا كنت لا توافق على أي جزء من
                هذه الشروط، يرجى عدم استخدام خدمتنا.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </section>

      {/* Detailed Terms */}
      <section className="py-20 md:py-32 bg-gradient-to-r from-slate-50 to-gray-50 dark:from-gray-900 dark:to-slate-900/10">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {termsSection.map((section, index) => (
                <AccordionItem
                  key={section.id}
                  value={section.id}
                  className="border rounded-lg bg-white dark:bg-gray-800"
                >
                  <AccordionTrigger className="px-6 py-4 text-right hover:no-underline">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                        <section.icon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-right">
                          {section.title}
                        </h3>
                        <Badge variant="outline" className="text-xs mt-1">
                          القسم {index + 1}
                        </Badge>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="prose prose-gray dark:prose-invert max-w-none text-right">
                      {section.content
                        .split("\n\n")
                        .map((paragraph, pIndex) => {
                          if (paragraph.startsWith("•")) {
                            return (
                              <div
                                key={pIndex}
                                className="space-y-2 my-4 text-right"
                              >
                                {paragraph.split("\n").map((item, iIndex) => (
                                  <div
                                    key={iIndex}
                                    className="text-muted-foreground text-right"
                                  >
                                    {item.replace("• ", "")}
                                  </div>
                                ))}
                              </div>
                            );
                          }

                          if (
                            paragraph.includes(":") &&
                            paragraph.length < 100
                          ) {
                            return (
                              <h4
                                key={pIndex}
                                className="font-semibold text-lg mt-6 mb-3 text-foreground text-right"
                              >
                                {paragraph}
                              </h4>
                            );
                          }

                          return (
                            <p
                              key={pIndex}
                              className="text-muted-foreground leading-relaxed mb-4 text-right"
                            >
                              {paragraph}
                            </p>
                          );
                        })}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </div>
  );
}
