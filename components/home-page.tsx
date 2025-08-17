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
  CheckCircle
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
      title: "Smart Document Upload",
      description: "Upload PDFs, Word documents, and more. Our AI instantly processes your content.",
      color: "text-blue-500"
    },
    {
      icon: Brain,
      title: "AI-Powered Summaries",
      description: "Get intelligent summaries that capture key insights and main points.",
      color: "text-purple-500"
    },
    {
      icon: Search,
      title: "Advanced Search",
      description: "Find any information across your entire library with semantic search.",
      color: "text-green-500"
    },
    {
      icon: BookOpen,
      title: "Interactive Reading",
      description: "Annotate, highlight, and organize your reading materials effortlessly.",
      color: "text-orange-500"
    }
  ];

  const benefits = [
    "Save 80% of your reading time",
    "Never lose important information",
    "Access your library anywhere",
    "Share insights with your team"
  ];

  const stats = [
    { number: "10K+", label: "Documents Processed" },
    { number: "95%", label: "Time Saved" },
    { number: "4.9", label: "User Rating" },
    { number: "24/7", label: "Available" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Badge variant="outline" className="mb-6 px-4 py-2 text-sm font-medium">
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Reading Experience
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              Welcome to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                عليم
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform your reading experience with AI-powered summaries, intelligent analysis, 
              and seamless document management. Your knowledge, amplified.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                size="lg" 
                className="px-8 py-6 text-lg font-semibold"
                onClick={handleGetStarted}
              >
                {user?.isLoggedIn ? "Go to Library" : "Get Started Free"}
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
                  Upload Document
                </Button>
              )}
              
              {!user?.isLoggedIn && (
                <Button 
                  variant="ghost" 
                  size="lg" 
                  className="px-8 py-6 text-lg"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
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
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 opacity-20">
          <Book className="w-16 h-16 text-blue-500 animate-pulse" />
        </div>
        <div className="absolute top-40 right-10 opacity-20">
          <Brain className="w-12 h-12 text-purple-500 animate-bounce" />
        </div>
        <div className="absolute bottom-20 left-20 opacity-20">
          <Sparkles className="w-10 h-10 text-indigo-500 animate-pulse" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Powerful Features for Modern Readers
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to revolutionize how you consume and understand written content
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
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
      <section className="py-20 md:py-32 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-blue-900/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Why Choose عليم?
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Join thousands of professionals, students, and researchers who have transformed 
                  their reading workflow with our intelligent platform.
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
                  Start Your Journey
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </div>

              <div className="relative">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="space-y-4">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                    <div className="h-4 bg-blue-200 dark:bg-blue-900 rounded w-2/3"></div>
                    <div className="h-6 bg-gradient-to-r from-purple-200 to-blue-200 dark:from-purple-900 dark:to-blue-900 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                  </div>
                  <div className="mt-6 flex gap-2">
                    <Badge variant="secondary">AI Summary</Badge>
                    <Badge variant="outline">Key Points</Badge>
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
              Ready to Transform Your Reading?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join the revolution in document analysis and knowledge management. 
              Start your free journey today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8 py-6 text-lg" onClick={handleGetStarted}>
                <Zap className="mr-2 h-5 w-5" />
                {user?.isLoggedIn ? "Go to Library" : "Start Free Trial"}
              </Button>
              
              {!user?.isLoggedIn && (
                <Button variant="outline" size="lg" className="px-8 py-6 text-lg" onClick={() => router.push("/login")}>
                  <Users className="mr-2 h-5 w-5" />
                  Sign In
                </Button>
              )}
            </div>

            <p className="text-sm text-muted-foreground mt-6">
              No credit card required • Free forever plan available
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
