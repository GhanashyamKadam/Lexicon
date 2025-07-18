import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Target, Eye, Users, Award, BookOpen, TrendingUp } from "lucide-react";

export default function AboutPage() {
  const features = [
    {
      icon: Users,
      title: "Expert Faculty",
      description: "Highly qualified and experienced English language instructors"
    },
    {
      icon: Award,
      title: "Proven Results",
      description: "98% success rate with consistent academic excellence"
    },
    {
      icon: BookOpen,
      title: "Comprehensive Curriculum",
      description: "Complete coverage of all English language components"
    },
    {
      icon: TrendingUp,
      title: "Individual Progress",
      description: "Personalized attention and customized learning paths"
    }
  ];

  return (
    <>
      <Navbar />
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-primary/10 to-emerald-500/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Badge className="mb-4" variant="secondary">About Us</Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                About Lexicon Learners
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                We are committed to empowering students with exceptional English language skills through innovative teaching methods and personalized attention.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div className="order-2 lg:order-1">
                <img 
                  src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                  alt="Modern classroom environment" 
                  className="rounded-lg shadow-lg w-full h-auto object-cover"
                />
              </div>
              
              <div className="order-1 lg:order-2">
                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <Target className="h-8 w-8 text-primary mr-3" />
                    <h2 className="text-3xl font-bold text-foreground">Our Mission</h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    To provide comprehensive English language education that not only helps students excel in their academic pursuits but also develops their communication skills for lifelong success. We believe in nurturing confident, articulate, and skilled English speakers who can thrive in any environment.
                  </p>
                </div>
                
                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <Eye className="h-8 w-8 text-primary mr-3" />
                    <h2 className="text-3xl font-bold text-foreground">Our Vision</h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    To be the leading English language coaching academy that transforms students into confident communicators and literary enthusiasts, preparing them for success in all aspects of life through the power of language. We envision a future where every student discovers their unique voice and potential.
                  </p>
                </div>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {features.map((feature, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="bg-primary/10 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <feature.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Founder's Message */}
            <Card className="bg-gradient-to-r from-primary/5 to-emerald-500/5 border-primary/20">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-foreground mb-2">Founder's Message</h3>
                  <div className="w-20 h-1 bg-primary mx-auto"></div>
                </div>
                
                <blockquote className="text-center">
                  <p className="text-lg text-muted-foreground italic mb-6 leading-relaxed">
                    "Language is the bridge between minds. At Lexicon Learners, we don't just teach English - we open doors to opportunities, confidence, and lifelong learning. Every student's journey is unique, and we're here to guide them every step of the way. Our commitment goes beyond academic excellence; we nurture the whole person, helping students find their voice and express their ideas with clarity and confidence."
                  </p>
                  <footer className="text-foreground font-medium">
                    — Dr. Meera Krishnan, Founder & Director
                  </footer>
                </blockquote>
                
                <div className="mt-8 flex justify-center">
                  <div className="bg-primary/10 rounded-full p-4">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Statistics */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Our Impact</h2>
              <p className="text-xl text-muted-foreground">
                Numbers that speak to our commitment to excellence
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-5xl font-bold text-primary mb-2">500+</div>
                <div className="text-muted-foreground">Students Successfully Trained</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-primary mb-2">98%</div>
                <div className="text-muted-foreground">Academic Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-primary mb-2">5+</div>
                <div className="text-muted-foreground">Years of Excellence</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
