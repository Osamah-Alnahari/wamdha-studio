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
  Phone
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function PrivacyPage() {
  const [activeSection, setActiveSection] = useState("overview");

  const privacyPrinciples = [
    {
      icon: Shield,
      title: "Data Protection",
      description: "Your documents and personal information are encrypted and protected with enterprise-grade security.",
      color: "text-green-500",
      bgColor: "bg-green-100 dark:bg-green-900"
    },
    {
      icon: Eye,
      title: "Transparency",
      description: "We clearly explain what data we collect, how we use it, and give you control over your information.",
      color: "text-blue-500",
      bgColor: "bg-blue-100 dark:bg-blue-900"
    },
    {
      icon: UserCheck,
      title: "User Control",
      description: "You own your data. You can access, modify, or delete your information at any time.",
      color: "text-purple-500",
      bgColor: "bg-purple-100 dark:bg-purple-900"
    },
    {
      icon: Lock,
      title: "Security First",
      description: "We implement the highest security standards to protect your data from unauthorized access.",
      color: "text-orange-500",
      bgColor: "bg-orange-100 dark:bg-orange-900"
    }
  ];

  const dataTypes = [
    {
      category: "Account Information",
      description: "Information you provide when creating your account",
      items: [
        "Name and email address",
        "Account preferences and settings",
        "Profile information (optional)",
        "Subscription and billing information"
      ],
      icon: UserCheck,
      retention: "Until account deletion"
    },
    {
      category: "Document Content",
      description: "Documents and files you upload for processing",
      items: [
        "Original document files",
        "Generated summaries and analyses",
        "Annotations and highlights",
        "Reading progress and bookmarks"
      ],
      icon: FileText,
      retention: "User-controlled storage"
    },
    {
      category: "Usage Analytics",
      description: "Anonymous data about how you use عليم",
      items: [
        "Feature usage patterns",
        "Performance metrics",
        "Error logs (anonymized)",
        "User interface interactions"
      ],
      icon: Database,
      retention: "12-24 months"
    },
    {
      category: "Technical Data",
      description: "Information needed for service functionality",
      items: [
        "IP address and location data",
        "Browser and device information",
        "Session and authentication tokens",
        "API usage logs"
      ],
      icon: Server,
      retention: "30-90 days"
    }
  ];

  const securityMeasures = [
    {
      title: "End-to-End Encryption",
      description: "All your documents are encrypted both in transit and at rest using AES-256 encryption."
    },
    {
      title: "Zero-Knowledge Architecture",
      description: "We process your documents without permanently storing sensitive content on our servers."
    },
    {
      title: "Regular Security Audits",
      description: "Independent security firms regularly audit our systems to ensure the highest protection standards."
    },
    {
      title: "Access Controls",
      description: "Strict employee access controls and monitoring ensure only authorized personnel can access systems."
    },
    {
      title: "Data Minimization",
      description: "We collect and retain only the minimum data necessary to provide our services effectively."
    },
    {
      title: "Secure Infrastructure",
      description: "Our services run on enterprise-grade cloud infrastructure with multiple layers of security."
    }
  ];

  const userRights = [
    {
      right: "Access Your Data",
      description: "Request a copy of all personal data we have about you in a machine-readable format.",
      action: "Submit access request"
    },
    {
      right: "Correct Your Data",
      description: "Update or correct any inaccurate personal information in your account.",
      action: "Update in settings"
    },
    {
      right: "Delete Your Data",
      description: "Request complete deletion of your account and all associated data.",
      action: "Contact support"
    },
    {
      right: "Data Portability",
      description: "Export your data to use with other services or for backup purposes.",
      action: "Download data"
    },
    {
      right: "Opt-Out",
      description: "Withdraw consent for data processing activities like analytics or marketing.",
      action: "Manage preferences"
    },
    {
      right: "Object to Processing",
      description: "Object to certain types of data processing for legitimate interests.",
      action: "File objection"
    }
  ];

  const sections = [
    { id: "overview", title: "Overview", icon: BookOpen },
    { id: "collection", title: "Data Collection", icon: Database },
    { id: "usage", title: "How We Use Data", icon: Eye },
    { id: "security", title: "Security Measures", icon: Shield },
    { id: "rights", title: "Your Rights", icon: UserCheck },
    { id: "contact", title: "Contact Us", icon: Mail }
  ];

  return (
    <div className="min-h-screen public-page-bg">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 dark:from-gray-900 dark:via-violet-900/20 dark:to-purple-900/20">
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

        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-6 px-4 py-2 text-sm font-medium border-violet-200 dark:border-violet-800">
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
              في عليم، نؤمن أن الخصوصية حق أساسي. تعلم كيف نحمي بياناتك،
              نحترم خصوصيتك، ونمنحك السيطرة الكاملة على معلوماتك.
            </p>

            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Timer className="w-4 h-4" />
                <span>Last Updated: Dec 2024</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <span>GDPR Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>SOC 2 Certified</span>
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
                Our Privacy Principles
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                These core principles guide every decision we make about data and privacy.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {privacyPrinciples.map((principle, index) => (
                <Card key={index} className="library-card-hover text-center">
                  <CardHeader>
                    <div className={`w-16 h-16 mx-auto rounded-2xl ${principle.bgColor} flex items-center justify-center mb-4`}>
                      <principle.icon className={`w-8 h-8 ${principle.color}`} />
                    </div>
                    <CardTitle className="text-xl">{principle.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
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
              <div className="lg:col-span-3 space-y-8">
                {/* Overview */}
                <Card className="library-card-hover">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-3">
                      <BookOpen className="w-6 h-6 text-violet-500" />
                      Privacy Policy Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                    <p className="text-lg leading-relaxed mb-6">
                      This Privacy Policy explains how عليم ("we," "our," or "us") collects, uses, 
                      processes, and protects your personal information when you use our AI-powered 
                      document analysis platform.
                    </p>
                    <p className="leading-relaxed mb-4">
                      We are committed to protecting your privacy and ensuring you have a positive 
                      experience on our platform. This policy outlines our practices concerning the 
                      collection, use, and disclosure of your information through our services.
                    </p>
                    <div className="bg-violet-50 dark:bg-violet-900/20 p-6 rounded-lg border border-violet-200 dark:border-violet-800">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-violet-500" />
                        Important Note
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        By using عليم, you agree to the collection and use of information in accordance 
                        with this policy. If you do not agree with our policies and practices, please 
                        do not use our services.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Data Collection */}
                <Card className="library-card-hover">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-3">
                      <Database className="w-6 h-6 text-blue-500" />
                      What Information We Collect
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-8">
                      {dataTypes.map((type, index) => (
                        <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                          <div className="flex items-start gap-4 mb-4">
                            <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
                              <type.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-xl font-semibold mb-2">{type.category}</h3>
                              <p className="text-muted-foreground mb-4">{type.description}</p>
                              <div className="grid md:grid-cols-2 gap-2 mb-4">
                                {type.items.map((item, itemIndex) => (
                                  <div key={itemIndex} className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                                    <span className="text-sm">{item}</span>
                                  </div>
                                ))}
                              </div>
                              <Badge variant="outline" className="text-xs">
                                <Timer className="w-3 h-3 mr-1" />
                                Retention: {type.retention}
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
                      How We Protect Your Data
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg text-muted-foreground mb-6">
                      We implement comprehensive security measures to protect your personal information 
                      against unauthorized access, alteration, disclosure, or destruction.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      {securityMeasures.map((measure, index) => (
                        <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-semibold mb-1">{measure.title}</h4>
                            <p className="text-sm text-muted-foreground">{measure.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* User Rights */}
                <Card className="library-card-hover">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-3">
                      <UserCheck className="w-6 h-6 text-purple-500" />
                      Your Rights and Controls
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg text-muted-foreground mb-6">
                      You have comprehensive rights regarding your personal data. Here's what you can do:
                    </p>
                    
                    <Accordion type="single" collapsible className="w-full">
                      {userRights.map((right, index) => (
                        <AccordionItem key={index} value={`right-${index}`}>
                          <AccordionTrigger className="text-left">
                            <div className="flex items-center gap-3">
                              <CheckCircle className="w-5 h-5 text-purple-500" />
                              {right.right}
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pl-8">
                            <p className="text-muted-foreground mb-3">{right.description}</p>
                            <Button variant="outline" size="sm">
                              {right.action}
                            </Button>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>

                {/* Contact Information */}
                <Card className="library-card-hover">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-3">
                      <Mail className="w-6 h-6 text-orange-500" />
                      Privacy Questions & Contact
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg text-muted-foreground mb-6">
                      If you have any questions about this Privacy Policy or our data practices, 
                      we're here to help.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="p-6 rounded-lg bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800">
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Mail className="w-5 h-5 text-orange-500" />
                          Data Protection Officer
                        </h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          For privacy-related questions and requests
                        </p>
                        <p className="font-medium">privacy@aleem.app</p>
                      </div>
                      
                      <div className="p-6 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Phone className="w-5 h-5 text-blue-500" />
                          Legal & Compliance
                        </h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          For legal matters and compliance questions
                        </p>
                        <p className="font-medium">legal@aleem.app</p>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-6 rounded-lg bg-gray-50 dark:bg-gray-800 border">
                      <h4 className="font-semibold mb-3">Response Timeline</h4>
                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="font-medium">General Inquiries:</span>
                          <p className="text-muted-foreground">Within 24 hours</p>
                        </div>
                        <div>
                          <span className="font-medium">Data Requests:</span>
                          <p className="text-muted-foreground">Within 30 days</p>
                        </div>
                        <div>
                          <span className="font-medium">Urgent Matters:</span>
                          <p className="text-muted-foreground">Within 2 hours</p>
                        </div>
                      </div>
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
              Privacy-First Reading Experience
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Experience the power of AI-assisted reading while knowing your data is secure and your privacy is protected.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8 py-6 text-lg">
                <Shield className="mr-2 h-5 w-5" />
                Start Reading Securely
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-6 text-lg">
                <Mail className="mr-2 h-5 w-5" />
                Contact Privacy Team
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
