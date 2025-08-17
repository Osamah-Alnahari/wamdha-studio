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
  Download
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function TermsPage() {
  const [activeSection, setActiveSection] = useState("overview");

  const keyHighlights = [
    {
      icon: UserCheck,
      title: "User Responsibilities",
      description: "You are responsible for maintaining the security of your account and for all activities under your account.",
      color: "text-blue-500",
      bgColor: "bg-blue-100 dark:bg-blue-900"
    },
    {
      icon: FileText,
      title: "Content Rights",
      description: "You retain ownership of your uploaded content. We process it only to provide our services.",
      color: "text-green-500", 
      bgColor: "bg-green-100 dark:bg-green-900"
    },
    {
      icon: CreditCard,
      title: "Subscription Terms",
      description: "Clear billing cycles, cancellation policies, and refund terms for all subscription plans.",
      color: "text-purple-500",
      bgColor: "bg-purple-100 dark:bg-purple-900"
    },
    {
      icon: Shield,
      title: "Service Availability",
      description: "We strive for 99.9% uptime but cannot guarantee uninterrupted service availability.",
      color: "text-orange-500",
      bgColor: "bg-orange-100 dark:bg-orange-900"
    }
  ];

  const termsSection = [
    {
      id: "acceptance",
      title: "Acceptance of Terms",
      icon: CheckCircle,
      content: `By accessing and using عليم ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.

The Service is owned and operated by عليم Inc. ("Company", "we", "us", or "our"). These Terms of Service ("Terms") govern your use of our AI-powered document analysis platform, including all content, features, and functionality offered on or through our Service.

These Terms form a legally binding agreement between you and عليم. Please read them carefully as they affect your legal rights and obligations.`
    },
    {
      id: "definitions",
      title: "Definitions",
      icon: Book,
      content: `For the purposes of these Terms:

• "Service" refers to the عليم platform, including website, mobile applications, and related services
• "User", "you", and "your" refer to the individual or entity using the Service
• "Content" means any information, data, text, documents, or other materials uploaded or created through the Service
• "Account" means your registered user account with the Service
• "Subscription" refers to paid plans that provide access to premium features
• "AI Processing" means the artificial intelligence analysis and summarization of your uploaded documents`
    },
    {
      id: "eligibility",
      title: "User Eligibility",
      icon: Users,
      content: `To use عليم, you must:

• Be at least 18 years old or have parental consent if under 18
• Have the legal capacity to enter into binding agreements
• Not be prohibited from using the Service under applicable laws
• Provide accurate and complete registration information
• Maintain the security and confidentiality of your account credentials

Educational users under 18 may use the Service with appropriate institutional oversight and consent from their educational institution.`
    },
    {
      id: "account",
      title: "Account Registration and Security",
      icon: UserCheck,
      content: `Account Creation:
You are responsible for maintaining the confidentiality of your account information and password. You agree to notify us immediately of any unauthorized use of your account.

Account Responsibilities:
• Provide accurate, current, and complete information during registration
• Maintain and update your information to keep it accurate and current
• Choose a strong, unique password and keep it confidential
• Notify us immediately of any security breach or unauthorized access

Account Termination:
You may terminate your account at any time through your account settings. We may suspend or terminate accounts that violate these Terms or for other reasons outlined in this agreement.`
    },
    {
      id: "usage",
      title: "Acceptable Use Policy",
      icon: Scale,
      content: `You agree to use عليم only for lawful purposes and in accordance with these Terms. You agree NOT to use the Service:

Prohibited Activities:
• To upload copyrighted material without proper authorization
• To process documents containing illegal content, hate speech, or harmful material
• To attempt to reverse engineer, hack, or compromise our security systems
• To share your account credentials with unauthorized parties
• To use automated systems to access the Service without permission
• To violate any applicable local, state, national, or international law

Content Guidelines:
• You are solely responsible for the content you upload
• Content must comply with applicable copyright and intellectual property laws
• We reserve the right to remove content that violates these guidelines
• Repeated violations may result in account suspension or termination`
    },
    {
      id: "intellectual",
      title: "Intellectual Property Rights",
      icon: FileText,
      content: `Your Content:
You retain all rights to the content you upload to عليم. By using our Service, you grant us a limited license to process your content solely for the purpose of providing our AI analysis and summarization services.

Our Content:
The Service, including its design, features, technology, and AI algorithms, is owned by عليم and protected by copyright, trademark, and other intellectual property laws.

AI-Generated Content:
Summaries and analyses generated by our AI become part of your content library. You have the right to use, modify, and delete this generated content as you see fit.

Trademark Rights:
عليم, our logos, and service marks are trademarks of عليم Inc. You may not use our trademarks without our prior written consent.`
    },
    {
      id: "subscription",
      title: "Subscription and Billing",
      icon: CreditCard,
      content: `Subscription Plans:
We offer various subscription tiers with different features and usage limits. Current plans and pricing are available on our website.

Billing Terms:
• Subscriptions are billed in advance on a monthly or annual basis
• Payment is due at the start of each billing period
• All fees are non-refundable except as expressly stated in our refund policy
• We reserve the right to change pricing with 30 days' notice

Cancellation:
• You may cancel your subscription at any time through your account settings
• Cancellation takes effect at the end of your current billing period
• You will retain access to paid features until the end of your billing period
• No prorated refunds are provided for partial billing periods

Auto-Renewal:
Subscriptions automatically renew unless cancelled before the renewal date. You can disable auto-renewal in your account settings.`
    },
    {
      id: "privacy",
      title: "Privacy and Data Protection",
      icon: Shield,
      content: `Data Collection and Use:
Our Privacy Policy, which is incorporated into these Terms by reference, explains how we collect, use, and protect your personal information and content.

Data Security:
We implement industry-standard security measures to protect your data, including encryption, access controls, and regular security audits.

Data Retention:
• Account data is retained until you delete your account
• Document content is processed but not permanently stored unless you choose to save it
• We may retain anonymized analytics data for service improvement

International Data Transfers:
Your data may be processed and stored in countries other than your own. We ensure appropriate safeguards are in place for international data transfers.`
    },
    {
      id: "liability",
      title: "Limitation of Liability",
      icon: AlertTriangle,
      content: `Service Availability:
While we strive to maintain high service availability, we cannot guarantee uninterrupted access to the Service. We are not liable for any damages resulting from service interruptions.

AI Accuracy Disclaimer:
Our AI-generated summaries and analyses are provided as-is. While we strive for accuracy, we do not guarantee the completeness or accuracy of AI-generated content.

Limitation of Damages:
To the maximum extent permitted by law, عليم shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Service.

Maximum Liability:
Our total liability to you for any claims arising from these Terms or your use of the Service shall not exceed the amount you paid us in the twelve months preceding the claim.`
    },
    {
      id: "termination",
      title: "Termination",
      icon: RefreshCw,
      content: `Termination by You:
You may terminate your account at any time by following the cancellation process in your account settings.

Termination by Us:
We may suspend or terminate your access to the Service if you violate these Terms, engage in fraudulent activity, or for other reasons we deem necessary to protect our Service or other users.

Effect of Termination:
Upon termination:
• Your access to the Service will cease immediately
• We may delete your account data after a reasonable grace period
• Outstanding payment obligations remain in effect
• Provisions of these Terms that should survive termination will continue to apply`
    },
    {
      id: "updates",
      title: "Updates to Terms",
      icon: Clock,
      content: `Modification of Terms:
We reserve the right to modify these Terms at any time. We will notify users of material changes via email or through the Service at least 30 days before changes take effect.

Acceptance of Changes:
Your continued use of the Service after changes become effective constitutes your acceptance of the modified Terms.

Version History:
We maintain a history of Terms changes, which you can access through your account settings or by contacting our support team.`
    },
    {
      id: "governing",
      title: "Governing Law and Disputes",
      icon: Gavel,
      content: `Governing Law:
These Terms are governed by the laws of [Your Jurisdiction], without regard to conflict of law principles.

Dispute Resolution:
We encourage users to contact us directly to resolve any disputes. For disputes that cannot be resolved through direct communication, we prefer mediation or arbitration over litigation.

Jurisdiction:
Any legal proceedings related to these Terms shall be conducted in the courts of [Your Jurisdiction].

Class Action Waiver:
You agree to resolve disputes individually and waive any right to participate in class action lawsuits or class-wide arbitration.`
    }
  ];

  const sections = [
    { id: "overview", title: "Overview", icon: Book },
    { id: "acceptance", title: "Acceptance", icon: CheckCircle },
    { id: "usage", title: "Usage Policy", icon: Scale },
    { id: "privacy", title: "Privacy", icon: Shield },
    { id: "billing", title: "Billing", icon: CreditCard },
    { id: "contact", title: "Contact", icon: Mail }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 dark:from-gray-900 dark:via-slate-900/20 dark:to-zinc-900/20">
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

        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-6 px-4 py-2 text-sm font-medium border-slate-200 dark:border-slate-800">
              <Scroll className="w-4 h-4 mr-2" />
              Legal Agreement
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              Terms &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-600 to-gray-600">
                Conditions
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              These terms govern your use of عليم. By using our AI-powered reading platform, 
              you agree to these terms and conditions.
            </p>

            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Last Updated: Dec 2024</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <span>Globally Applicable</span>
              </div>
              <div className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
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
                Key Terms at a Glance
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Here are the most important points you should know about using عليم.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {keyHighlights.map((highlight, index) => (
                <Card key={index} className="library-card-hover text-center">
                  <CardHeader>
                    <div className={`w-16 h-16 mx-auto rounded-2xl ${highlight.bgColor} flex items-center justify-center mb-4`}>
                      <highlight.icon className={`w-8 h-8 ${highlight.color}`} />
                    </div>
                    <CardTitle className="text-xl">{highlight.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {highlight.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Important Notice */}
            <Alert className="border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-900/20">
              <AlertTriangle className="h-4 w-4 text-orange-500" />
              <AlertDescription className="text-orange-800 dark:text-orange-200">
                <strong>Important:</strong> By creating an account or using عليم, you agree to be bound by these Terms of Service. 
                If you do not agree with any part of these terms, please do not use our service.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </section>

      {/* Detailed Terms */}
      <section className="py-20 md:py-32 bg-gradient-to-r from-slate-50 to-gray-50 dark:from-gray-900 dark:to-slate-900/10">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Navigation Sidebar */}
              <div className="lg:col-span-1">
                <Card className="sticky top-8">
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Navigation</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {sections.map((section) => (
                      <Button
                        key={section.id}
                        variant={activeSection === section.id ? "default" : "ghost"}
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
              <div className="lg:col-span-3">
                <Accordion type="single" collapsible className="w-full space-y-4">
                  {termsSection.map((section, index) => (
                    <AccordionItem key={section.id} value={section.id} className="border rounded-lg bg-white dark:bg-gray-800">
                      <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                            <section.icon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold">{section.title}</h3>
                            <Badge variant="outline" className="text-xs mt-1">
                              Section {index + 1}
                            </Badge>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-6">
                        <div className="prose prose-gray dark:prose-invert max-w-none">
                          {section.content.split('\n\n').map((paragraph, pIndex) => {
                            if (paragraph.startsWith('•')) {
                              return (
                                <ul key={pIndex} className="list-disc list-inside space-y-1 my-4">
                                  {paragraph.split('\n').map((item, iIndex) => (
                                    <li key={iIndex} className="text-muted-foreground">
                                      {item.replace('• ', '')}
                                    </li>
                                  ))}
                                </ul>
                              );
                            }
                            
                            if (paragraph.includes(':') && paragraph.length < 100) {
                              return (
                                <h4 key={pIndex} className="font-semibold text-lg mt-6 mb-3 text-foreground">
                                  {paragraph}
                                </h4>
                              );
                            }
                            
                            return (
                              <p key={pIndex} className="text-muted-foreground leading-relaxed mb-4">
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
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Questions About These Terms?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Our legal team is here to help clarify any questions you may have about these terms and conditions.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card className="library-card-hover">
                <CardHeader className="text-center">
                  <Mail className="w-12 h-12 mx-auto text-blue-500 mb-4" />
                  <CardTitle>Legal Inquiries</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground mb-4">
                    For questions about these terms, compliance, or legal matters
                  </p>
                  <p className="font-semibold">legal@aleem.app</p>
                </CardContent>
              </Card>

              <Card className="library-card-hover">
                <CardHeader className="text-center">
                  <ExternalLink className="w-12 h-12 mx-auto text-green-500 mb-4" />
                  <CardTitle>Additional Resources</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground mb-4">
                    Privacy Policy, Cookie Policy, and other legal documents
                  </p>
                  <Button variant="outline">View All Policies</Button>
                </CardContent>
              </Card>
            </div>
            
            <Alert className="border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20">
              <Info className="h-4 w-4 text-blue-500" />
              <AlertDescription className="text-blue-800 dark:text-blue-200">
                These Terms of Service are effective as of December 2024. We recommend bookmarking this page 
                and reviewing it periodically for any updates.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </section>
    </div>
  );
}
