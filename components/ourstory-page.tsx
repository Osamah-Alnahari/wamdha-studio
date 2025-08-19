"use client";

import { useState, useEffect } from "react";
import { 
  Book, 
  BookOpen, 
  Lightbulb, 
  Users, 
  Target, 
  Sparkles,
  Quote,
  Heart,
  Star,
  ArrowRight,
  Scroll,
  Library,
  GraduationCap,
  Globe
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function OurStoryPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeBook, setActiveBook] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    
    // Animate books cycling
    const interval = setInterval(() => {
      setActiveBook((prev) => (prev + 1) % 5);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const milestones = [
    {
      year: "2023",
      title: "The Vision",
      description: "Recognizing the overwhelming amount of information in today's digital world, we envisioned a solution that could help people truly understand and retain knowledge from their reading materials.",
      icon: Lightbulb
    },
    {
      year: "2023",
      title: "Building the Foundation",
      description: "We assembled a team of passionate engineers, AI researchers, and reading experts to create the most intuitive document analysis platform.",
      icon: Users
    },
    {
      year: "2024",
      title: "Launch & Growth",
      description: "عليم was born, combining cutting-edge AI with elegant design to serve thousands of students, professionals, and lifelong learners.",
      icon: Target
    },
    {
      year: "2024", 
      title: "Community Impact",
      description: "Today, we're proud to help users save countless hours while deepening their understanding of complex materials across every field imaginable.",
      icon: Heart
    }
  ];

  const values = [
    {
      title: "Knowledge First",
      description: "We believe that true understanding comes from quality, not quantity. Our AI doesn't just summarize—it helps you comprehend.",
      icon: GraduationCap,
      color: "text-blue-500"
    },
    {
      title: "Accessibility",
      description: "Learning should be accessible to everyone, everywhere. We're breaking down barriers between people and knowledge.",
      icon: Globe,
      color: "text-green-500"
    },
    {
      title: "Innovation",
      description: "We constantly push the boundaries of what's possible in AI-assisted learning and reading comprehension.",
      icon: Sparkles,
      color: "text-purple-500"
    },
    {
      title: "Community",
      description: "We're building more than a tool—we're fostering a community of curious minds and lifelong learners.",
      icon: Users,
      color: "text-orange-500"
    }
  ];

  const teamQuotes = [
    {
      quote: "We're not just building software; we're crafting a bridge between human curiosity and the vast ocean of knowledge.",
      author: "Sarah Chen",
      role: "Founder & CEO",
      avatar: "SC"
    },
    {
      quote: "Every algorithm we write, every feature we design, is guided by one question: How can we make learning more joyful?",
      author: "Ahmad Al-Rashid",
      role: "Chief Technology Officer", 
      avatar: "AR"
    },
    {
      quote: "The magic happens when AI and human intelligence dance together to unlock deeper understanding.",
      author: "Dr. Elena Rodriguez",
      role: "Head of AI Research",
      avatar: "ER"
    }
  ];

  return (
    <div className="min-h-screen public-page-bg">
      {/* Hero Section with Animated Books */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-gray-900 dark:via-amber-900/20 dark:to-orange-900/20 min-h-screen flex items-center">
        <div className="absolute inset-0 library-pattern opacity-10"></div>
        
        {/* Floating Books Animation */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`absolute transition-all duration-1000 ${
                activeBook === i ? 'opacity-100 scale-110' : 'opacity-60 scale-100'
              }`}
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 2) * 20}%`,
                transform: `rotate(${-10 + i * 5}deg)`,
                animationDelay: `${i * 0.5}s`
              }}
            >
              <div className="floating-book">
                <Book className="w-8 h-8 md:w-12 md:h-12 text-amber-600 dark:text-amber-400" />
              </div>
            </div>
          ))}
        </div>

        <div className="relative container mx-auto px-4 py-12 md:py-16">
          <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Badge variant="outline" className="mb-6 px-4 py-2 text-sm font-medium border-amber-200 dark:border-amber-800">
              <Scroll className="w-4 h-4 mr-2" />
              رحلتنا
            </Badge>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              القصة وراء{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
                عليم
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              وُلدت من إيمان بسيط: أن كل فرد يستحق أن يطلق الإمكانات الكاملة
              لتجربة القراءة. هكذا نثور في طريقة تعلم العالم.
            </p>

            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Library className="w-4 h-4" />
                <span>Founded 2023</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>10,000+ Users</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span>1M+ Documents Processed</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-8">
              Our Mission
            </h2>
            <p className="text-2xl md:text-3xl leading-relaxed text-muted-foreground font-light">
              To democratize knowledge by making complex information accessible, 
              understandable, and actionable for every learner, everywhere.
            </p>
            
            <div className="mt-16 grid md:grid-cols-3 gap-8">
              <Card className="library-card-hover">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
                    <BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardTitle>Accessibility</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">
                    Making knowledge accessible to learners of all backgrounds and abilities.
                  </p>
                </CardContent>
              </Card>

              <Card className="library-card-hover">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mb-4">
                    <Sparkles className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  <CardTitle>Innovation</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">
                    Pushing the boundaries of AI to create meaningful learning experiences.
                  </p>
                </CardContent>
              </Card>

              <Card className="library-card-hover">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-4">
                    <Heart className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                  <CardTitle>Impact</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">
                    Creating real, measurable improvements in how people learn and grow.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section> */}

      {/* Timeline */}
      <section className="py-20 md:py-32 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-gray-900 dark:to-amber-900/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
              Our Journey
            </h2>
            
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-amber-300 dark:bg-amber-700 transform md:-translate-x-px"></div>
              
              {milestones.map((milestone, index) => (
                <div key={index} className={`relative flex items-center mb-16 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Timeline dot */}
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-amber-500 rounded-full transform -translate-x-2 md:-translate-x-2 z-10"></div>
                  
                  <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-16' : 'md:pl-16'} pl-20 md:pl-0`}>
                    <Card className="library-card-hover">
                      <CardHeader>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-12 h-12 rounded-lg bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
                            <milestone.icon className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                          </div>
                          <Badge variant="secondary">{milestone.year}</Badge>
                        </div>
                        <CardTitle className="text-xl">{milestone.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground leading-relaxed">
                          {milestone.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      {/* <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Our Values
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                The principles that guide every decision we make and every feature we build.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="library-card-hover text-center">
                  <CardHeader>
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center mb-4">
                      <value.icon className={`w-8 h-8 ${value.color}`} />
                    </div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section> */}

      {/* Team Quotes */}
      <section className="py-20 md:py-32 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-blue-900/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Voices from Our Team
              </h2>
              <p className="text-xl text-muted-foreground">
                Meet some of the passionate minds behind عليم
              </p>
            </div>

            <div className="grid gap-8">
              {teamQuotes.map((quote, index) => (
                <Card key={index} className="library-card-hover">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4">
                      <Quote className="w-8 h-8 text-blue-500 flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-lg md:text-xl leading-relaxed mb-6 italic">
                          "{quote.quote}"
                        </p>
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                            {quote.avatar}
                          </div>
                          <div>
                            <div className="font-semibold">{quote.author}</div>
                            <div className="text-sm text-muted-foreground">{quote.role}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Join Our Story
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Be part of the knowledge revolution. Start your journey with عليم today 
              and help us write the next chapter of learning.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8 py-6 text-lg">
                Start Reading Smarter
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-6 text-lg">
                <Users className="mr-2 h-5 w-5" />
                Join Our Community
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
