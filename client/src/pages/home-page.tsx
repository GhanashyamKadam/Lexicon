import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { EnrollModal } from "@/components/enroll-modal";
import { 
  GraduationCap, 
  Users, 
  TrendingUp, 
  BookOpen, 
  Clock,
  Star,
  ArrowRight
} from "lucide-react";

export default function HomePage() {
  const [showEnrollModal, setShowEnrollModal] = useState(false);

  const stats = [
    { icon: Users, value: "500+", label: "Students Taught" },
    { icon: TrendingUp, value: "98%", label: "Success Rate" },
    { icon: BookOpen, value: "6", label: "Specialized Courses" },
    { icon: Clock, value: "5+", label: "Years Experience" },
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      grade: "ICSE Grade 10",
      rating: 5,
      comment: "Lexicon Learners transformed my English skills completely. The personalized attention and comprehensive curriculum helped me excel in my ICSE exams.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Arjun Patel",
      grade: "ISC Grade 12",
      rating: 5,
      comment: "The public speaking course boosted my confidence tremendously. I can now express myself clearly and confidently in any situation.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Sneha Reddy",
      grade: "ICSE Grade 9",
      rating: 5,
      comment: "Excellent teaching methods and individual attention. My vocabulary and grammar have improved significantly after joining this academy.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    }
  ];

  return (
    <>
      <Navbar />
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center">
          {/* Background with gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-emerald-500/20 dark:from-primary/30 dark:to-emerald-500/30"></div>
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')"
            }}
          />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-4xl mx-auto animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                Master English with{" "}
                <span className="text-primary">Lexicon Learners</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
                Professional English language coaching academy offering comprehensive programs for ICSE, ISC, Literature, Grammar, Vocabulary, and Public Speaking excellence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => setShowEnrollModal(true)}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  <GraduationCap className="mr-2 h-5 w-5" />
                  Start Your Journey
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-6 text-lg font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  <BookOpen className="mr-2 h-5 w-5" />
                  Explore Courses
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <Card key={index} className="text-center transform hover:scale-105 transition-transform duration-300">
                  <CardContent className="p-6">
                    <stat.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                    <div className="text-4xl font-bold text-foreground mb-2">{stat.value}</div>
                    <div className="text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-foreground mb-12">
              What Our Students Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="flex text-yellow-400">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4 italic">
                      "{testimonial.comment}"
                    </p>
                    <div className="flex items-center">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name} 
                        className="w-12 h-12 rounded-full mr-4 object-cover"
                      />
                      <div>
                        <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.grade}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Course Preview */}
        <section id="courses" className="py-16 bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Our Popular Courses</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Discover our comprehensive range of English language programs designed to help you excel
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {[
                { title: "ICSE English Language", description: "Complete preparation for ICSE examinations", color: "bg-blue-500" },
                { title: "ISC English Language", description: "Advanced English skills for ISC students", color: "bg-green-500" },
                { title: "Public Speaking", description: "Build confidence in communication", color: "bg-purple-500" }
              ].map((course, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className={`h-12 w-12 ${course.color} rounded-lg flex items-center justify-center mb-4`}>
                      <BookOpen className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">{course.title}</h3>
                    <p className="text-muted-foreground mb-4">{course.description}</p>
                    <Badge variant="secondary" className="mb-4">Popular</Badge>
                    <div className="flex justify-between items-center">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setShowEnrollModal(true)}
                      >
                        Enroll Now
                      </Button>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center">
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => window.location.href = "/courses"}
              >
                View All Courses
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <EnrollModal
        isOpen={showEnrollModal}
        onClose={() => setShowEnrollModal(false)}
      />
    </>
  );
}
