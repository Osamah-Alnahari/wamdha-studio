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
  CheckCircle
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
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast.success("Message sent successfully!", {
      description: "We'll get back to you within 24 hours.",
    });
    
    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us a detailed message and we'll respond within 24 hours",
      contact: "support@aleem.app",
      action: "Send Email",
      color: "text-blue-500",
      bgColor: "bg-blue-100 dark:bg-blue-900"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Get instant help from our support team during business hours",
      contact: "Available 9 AM - 6 PM PST",
      action: "Start Chat",
      color: "text-green-500",
      bgColor: "bg-green-100 dark:bg-green-900"
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with our team for urgent matters",
      contact: "+1 (555) 123-4567",
      action: "Call Now",
      color: "text-purple-500",
      bgColor: "bg-purple-100 dark:bg-purple-900"
    }
  ];

  const departments = [
    {
      title: "General Support",
      description: "Account issues, billing questions, technical support",
      icon: HeadphonesIcon,
      email: "support@aleem.app"
    },
    {
      title: "Product Feedback",
      description: "Feature requests, bug reports, improvement suggestions",
      icon: Lightbulb,
      email: "feedback@aleem.app"
    },
    {
      title: "Business Inquiries",
      description: "Partnerships, enterprise solutions, media requests",
      icon: Users,
      email: "business@aleem.app"
    }
  ];

  const faqs = [
    {
      question: "How does عليم's AI summarization work?",
      answer: "Our AI uses advanced natural language processing to analyze your documents, identifying key concepts, main arguments, and important details to create comprehensive yet concise summaries."
    },
    {
      question: "What file formats does عليم support?",
      answer: "We support PDF, DOCX, TXT, and many other popular document formats. Our system can handle everything from academic papers to business reports."
    },
    {
      question: "Is my data secure with عليم?",
      answer: "Absolutely. We use enterprise-grade encryption and never store your documents longer than necessary for processing. Your privacy and data security are our top priorities."
    },
    {
      question: "Can I use عليم for commercial purposes?",
      answer: "Yes! We offer enterprise plans designed for businesses, educational institutions, and research organizations. Contact our business team for custom solutions."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-emerald-900/20 dark:to-teal-900/20">
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

        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-6 px-4 py-2 text-sm font-medium border-emerald-200 dark:border-emerald-800">
              <BookOpen className="w-4 h-4 mr-2" />
              We're Here to Help
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              Get in{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                Touch
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Have questions about عليم? Need help getting started? Want to share feedback? 
              Our team is here to help you make the most of your reading experience.
            </p>

            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4" />
                <span>Customer-First</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4" />
                <span>4.9/5 Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Choose Your Preferred Way to Reach Us
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Whether you need quick answers or detailed support, we have multiple channels ready to assist you.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {contactMethods.map((method, index) => (
                <Card key={index} className="library-card-hover text-center">
                  <CardHeader>
                    <div className={`w-16 h-16 mx-auto rounded-2xl ${method.bgColor} flex items-center justify-center mb-4`}>
                      <method.icon className={`w-8 h-8 ${method.color}`} />
                    </div>
                    <CardTitle className="text-xl">{method.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {method.description}
                    </p>
                    <p className="font-semibold mb-4">{method.contact}</p>
                    <Button className="w-full">
                      {method.action}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 md:py-32 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-gray-900 dark:to-emerald-900/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Send Us a Message
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Fill out the form below and we'll get back to you as soon as possible. 
                  The more details you provide, the better we can assist you.
                </p>

                <div className="space-y-6">
                  <h3 className="text-xl font-semibold mb-4">Specialized Departments</h3>
                  {departments.map((dept, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-white/50 dark:bg-gray-800/50">
                      <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center flex-shrink-0">
                        <dept.icon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{dept.title}</h4>
                        <p className="text-sm text-muted-foreground mb-1">{dept.description}</p>
                        <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">{dept.email}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Card className="library-card-hover">
                <CardHeader>
                  <CardTitle className="text-2xl">Quick Contact Form</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                          Full Name *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          Email Address *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-2">
                        Subject *
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        placeholder="What's this about?"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        placeholder="Please provide as much detail as possible..."
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
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
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
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-muted-foreground">
                Quick answers to common questions about عليم
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
                  <CardContent className="pl-12">
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-muted-foreground mb-4">
                Still have questions? We're here to help!
              </p>
              <Button size="lg">
                <MessageCircle className="mr-2 h-5 w-5" />
                Contact Support
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
              Our Commitment to You
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="library-card-hover">
                <CardHeader className="text-center">
                  <Clock className="w-12 h-12 mx-auto text-blue-500 mb-4" />
                  <CardTitle>24/7 Availability</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">
                    Our support team is available around the clock to help you succeed.
                  </p>
                </CardContent>
              </Card>

              <Card className="library-card-hover">
                <CardHeader className="text-center">
                  <Heart className="w-12 h-12 mx-auto text-red-500 mb-4" />
                  <CardTitle>Customer First</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">
                    Your success is our priority. We're committed to your learning journey.
                  </p>
                </CardContent>
              </Card>

              <Card className="library-card-hover">
                <CardHeader className="text-center">
                  <Star className="w-12 h-12 mx-auto text-yellow-500 mb-4" />
                  <CardTitle>Excellence</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">
                    We strive for excellence in every interaction and solution we provide.
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
