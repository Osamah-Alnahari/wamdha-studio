"use client";

import { usePathname } from "next/navigation";
import {
  Book,
  Mail,
  Phone,
  MapPin,
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Globe,
  Shield,
  FileText,
  ScrollText,
  Home,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  const pathname = usePathname();

  // Don't show footer on books routes
  if (pathname.startsWith("/books")) {
    return null;
  }

  const currentYear = new Date().getFullYear();

  const navigationLinks = [
    { href: "/", label: "الرئيسية", icon: Home },
    { href: "/ourstory", label: "قصتنا", icon: Book },
    { href: "/contact", label: "تواصل معنا", icon: Mail },
    { href: "/books", label: "الاستوديو", icon: Zap },
  ];

  const legalLinks = [
    { href: "/privacy", label: "سياسة الخصوصية", icon: Shield },
    {
      href: "/terms-and-conditions",
      label: "الشروط والأحكام",
      icon: ScrollText, 
    },
  ];

  const socialLinks = [
    { href: "#", label: "تويتر", icon: Twitter, color: "hover:text-blue-400" },
    {
      href: "#",
      label: "فيسبوك",
      icon: Facebook,
      color: "hover:text-blue-600",
    },
    {
      href: "#",
      label: "إنستغرام",
      icon: Instagram,
      color: "hover:text-pink-500",
    },
    {
      href: "#",
      label: "لينكد إن",
      icon: Linkedin,
      color: "hover:text-blue-700",
    },
    { href: "#", label: "يوتيوب", icon: Youtube, color: "hover:text-red-500" },
  ];

  const supportLinks = [
    { href: "#", label: "مركز المساعدة" },
    { href: "#", label: "الأسئلة الشائعة" },
    { href: "#", label: "الدعم الفني" },
    { href: "#", label: "تعليمات الاستخدام" },
  ];

  const productLinks = [
    { href: "#", label: "الميزات" },
    { href: "#", label: "التسعير" },
  ];

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Book className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">عليم</span>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-6 max-w-md">
              منصة ذكية لتحليل المستندات وإنشاء الملخصات باستخدام الذكاء
              الاصطناعي. حوّل طريقة قراءتك وفهمك للمحتوى المكتوب.
            </p>
            {/* Newsletter Signup */}
            {/* <div className="mb-6">
              <h3 className="font-semibold mb-3">اشترك في نشرتنا الإخبارية</h3>
              <div className="flex gap-2">
                <Input 
                  placeholder="أدخل بريدك الإلكتروني" 
                  className="flex-1"
                  dir="rtl"
                />
                <Button>اشتراك</Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                احصل على آخر التحديثات والنصائح مباشرة في بريدك
              </p>
            </div> */}
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>support@aleem.app</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span dir="ltr">+966 551 282 648</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>الشرقية، المملكة العربية السعودية</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="font-semibold mb-4">التنقل</h3>
            <ul className="space-y-3">
              {navigationLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <link.icon className="h-4 w-4" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Product & Support */}
          <div>
            <h3 className="font-semibold mb-4">المنتج</h3>
            <ul className="space-y-3 mb-6">
              {productLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Social */}
          <div>
            <h3 className="font-semibold mb-4">قانوني</h3>
            <ul className="space-y-3 mb-6">
              {legalLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <link.icon className="h-4 w-4" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <h3 className="font-semibold mb-4">تابعنا</h3>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className={`text-muted-foreground transition-colors ${social.color}`}
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t mt-6 pt-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              © {currentYear} عليم. جميع الحقوق محفوظة.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
