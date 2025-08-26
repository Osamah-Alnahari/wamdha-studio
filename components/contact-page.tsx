"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageCircle,
  Clock,
  BookOpen,
  Users,
  HeadphonesIcon,
  Lightbulb,
  Star,
  Heart,
  CheckCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    toast.success("تم إرسال الرسالة بنجاح!", {
      description: "سنرد عليك خلال 24 ساعة.",
    });

    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "الدعم عبر البريد الإلكتروني",
      description: "أرسل لنا رسالة مفصلة وسنرد عليك خلال 24 ساعة",
      contact: "support@aleem.app",
      action: "إرسال بريد إلكتروني",
      color: "text-blue-500",
      bgColor: "bg-blue-100 dark:bg-blue-900",
    },
    {
      icon: MessageCircle,
      title: "الدردشة المباشرة",
      description: "احصل على مساعدة فورية من فريق الدعم خلال ساعات العمل",
      contact: "متاح من 9 صباحاً إلى 6 مساءً",
      action: "بدء الدردشة",
      color: "text-green-500",
      bgColor: "bg-green-100 dark:bg-green-900",
    },
    {
      icon: Phone,
      title: "الدعم الهاتفي",
      description: "تحدث مباشرة مع فريقنا للأمور العاجلة",
      contact: "+966 551 282 648",
      action: "اتصل الآن",
      color: "text-purple-500",
      bgColor: "bg-purple-100 dark:bg-purple-900",
    },
  ];

  const departments = [
    {
      title: "الدعم العام",
      description: "مشاكل الحساب، أسئلة الفوترة، الدعم التقني",
      icon: HeadphonesIcon,
      email: "support@aleem.app",
    },
    {
      title: "ملاحظات المنتج",
      description: "طلبات الميزات، تقارير الأخطاء، اقتراحات التحسين",
      icon: Lightbulb,
      email: "support@aleem.app",
    },
    {
      title: "الاستفسارات التجارية",
      description: "الشراكات، الحلول المؤسسية، طلبات الإعلام",
      icon: Users,
      email: "support@aleem.app",
    },
  ];

  const faqs = [
    {
      question: "كيف يعمل تلخيص الذكاء الاصطناعي في عليم؟",
      answer:
        "يستخدم الذكاء الاصطناعي لدينا معالجة متقدمة للغة الطبيعية لتحليل مستنداتك، وتحديد المفاهيم الرئيسية والحجج المهمة والتفاصيل الهامة لإنشاء ملخصات شاملة ومختصرة.",
    },
    {
      question: "هل بياناتي آمنة مع عليم؟",
      answer:
        "بالتأكيد. نستخدم تشفيراً على مستوى المؤسسات ولا نخزن مستنداتك لفترة أطول من اللازم للمعالجة. خصوصيتك وأمان بياناتك هما أولويتنا القصوى.",
    },
  ];

  return (
    <div className="min-h-screen public-page-bg">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-emerald-900/20 dark:to-teal-900/20 min-h-screen flex items-center">
        <div className="absolute inset-0 library-pattern opacity-10"></div>

        {/* Floating Contact Icons */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 opacity-20 animate-pulse">
            <Mail className="w-16 h-16 text-emerald-500" />
          </div>
          <div className="absolute top-40 right-10 opacity-20 animate-bounce">
            <MessageCircle className="w-12 h-12 text-teal-500" />
          </div>
          <div className="absolute bottom-20 left-20 opacity-20 animate-pulse">
            <Phone className="w-10 h-10 text-cyan-500" />
          </div>
        </div>

        <div className="relative container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl mx-auto text-center">
            <Badge
              variant="outline"
              className="mb-6 px-4 py-2 text-sm font-medium border-emerald-200 dark:border-emerald-800"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              نحن هنا للمساعدة
            </Badge>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              تواصل{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                معنا
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              لديك أسئلة حول عليم؟ تحتاج مساعدة في البدء؟ تريد مشاركة تعليقاتك؟
              فريقنا هنا لمساعدتك في الاستفادة القصوى من تجربة القراءة.
            </p>

            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>دعم 24/7</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4" />
                <span>العميل أولاً</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4" />
                <span>تقييم xx/5</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 md:py-32 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-gray-900 dark:to-emerald-900/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div className="text-right">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  أرسل لنا رسالة
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  املأ النموذج أدناه وسنرد عليك في أقرب وقت ممكن. كلما قدمت
                  تفاصيل أكثر، كلما استطعنا مساعدتك بشكل أفضل.
                </p>

                <div className="space-y-6">
                  <h3 className="text-xl font-semibold mb-4">
                    الأقسام المتخصصة
                  </h3>
                  {departments.map((dept, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 rounded-lg bg-white/50 dark:bg-gray-800/50"
                    >
                      <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center flex-shrink-0">
                        <dept.icon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div className="text-right">
                        <h4 className="font-semibold">{dept.title}</h4>
                        <p className="text-sm text-muted-foreground mb-1">
                          {dept.description}
                        </p>
                        <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                          {dept.email}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Card className="library-card-hover">
                <CardHeader>
                  <CardTitle className="text-2xl">
                  أرسل لنا رسالة
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium mb-2"
                        >
                          الاسم الكامل *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="اسمك الكامل"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium mb-2"
                        >
                          البريد الإلكتروني *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="example@gmail.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium mb-2"
                      >
                        الموضوع *
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        placeholder="الموضوع"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium mb-2"
                      >
                        الرسالة *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        placeholder="يرجى تقديم أكبر قدر ممكن من التفاصيل..."
                        className="resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      size="lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          جاري الإرسال...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          إرسال الرسالة
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                الأسئلة الشائعة
              </h2>
              <p className="text-xl text-muted-foreground">
                إجابات سريعة للأسئلة الشائعة حول عليم
              </p>
            </div>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <Card key={index} className="library-card-hover">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" />
                      {faq.question}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pr-12 text-right">
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-muted-foreground mb-4">
                لا تزال لديك أسئلة؟ نحن هنا للمساعدة!
              </p>
              <Button size="lg">
                <MessageCircle className="mr-2 h-5 w-5" />
                اتصل بالدعم
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Location & Hours (Optional) */}
      <section className="py-20 md:py-32 bg-gradient-to-r from-slate-50 to-gray-50 dark:from-gray-900 dark:to-slate-900/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              التزامنا تجاهك
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="library-card-hover">
                <CardHeader className="text-center">
                  <Clock className="w-12 h-12 mx-auto text-blue-500 mb-4" />
                  <CardTitle>التوفر 24/7</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">
                    فريق الدعم لدينا متاح على مدار الساعة لمساعدتك على النجاح.
                  </p>
                </CardContent>
              </Card>

              <Card className="library-card-hover">
                <CardHeader className="text-center">
                  <Heart className="w-12 h-12 mx-auto text-red-500 mb-4" />
                  <CardTitle>العميل أولاً</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">
                    نجاحك هو أولويتنا. نحن ملتزمون برحلة تعلمك.
                  </p>
                </CardContent>
              </Card>

              <Card className="library-card-hover">
                <CardHeader className="text-center">
                  <Star className="w-12 h-12 mx-auto text-yellow-500 mb-4" />
                  <CardTitle>التميز</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">
                    نسعى للتميز في كل تفاعل وحل نقدمه.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
