import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { EnrollModal } from "@/components/enroll-modal";
import { 
  BookOpen, 
  PenTool, 
  Theater, 
  MessageSquare, 
  CheckCircle, 
  Mic,
  Clock,
  Users,
  GraduationCap
} from "lucide-react";

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  batchSize: string;
  targetGrade: string;
  icon: React.ComponentType<any>;
  color: string;
  features: string[];
}

const courses: Course[] = [
  {
    id: "icse-english",
    title: "ICSE English Language",
    description: "Comprehensive preparation for ICSE English Language examination covering composition, comprehension, and grammar with focused practice sessions.",
    duration: "6 months",
    batchSize: "8-10 students",
    targetGrade: "Grade 9-10",
    icon: BookOpen,
    color: "bg-blue-500",
    features: [
      "Essay writing techniques",
      "Comprehension strategies",
      "Grammar fundamentals",
      "Mock examinations",
      "Individual feedback"
    ]
  },
  {
    id: "isc-english",
    title: "ISC English Language",
    description: "Advanced English language skills for ISC examination including essay writing, comprehension, and sophisticated language usage patterns.",
    duration: "8 months",
    batchSize: "6-8 students",
    targetGrade: "Grade 11-12",
    icon: PenTool,
    color: "bg-green-500",
    features: [
      "Advanced composition",
      "Critical analysis",
      "Language usage",
      "Exam strategies",
      "Portfolio development"
    ]
  },
  {
    id: "literature",
    title: "ICSE/ISC Literature",
    description: "In-depth study of prescribed texts, poetry analysis, and literary criticism for both ICSE and ISC curricula with expert guidance.",
    duration: "10 months",
    batchSize: "6-8 students",
    targetGrade: "Grade 9-12",
    icon: Theater,
    color: "bg-purple-500",
    features: [
      "Text analysis",
      "Poetry interpretation",
      "Character studies",
      "Thematic exploration",
      "Critical essays"
    ]
  },
  {
    id: "vocabulary",
    title: "Vocabulary Building",
    description: "Systematic approach to expand vocabulary through etymology, context, and usage patterns for better communication and writing.",
    duration: "4 months",
    batchSize: "10-12 students",
    targetGrade: "Grade 6-12",
    icon: MessageSquare,
    color: "bg-orange-500",
    features: [
      "Word etymology",
      "Context usage",
      "Synonym exploration",
      "Memory techniques",
      "Practical application"
    ]
  },
  {
    id: "grammar",
    title: "Grammar Enhancement",
    description: "Comprehensive grammar course covering all aspects from basic to advanced level with practical application and error correction.",
    duration: "5 months",
    batchSize: "8-10 students",
    targetGrade: "Grade 5-12",
    icon: CheckCircle,
    color: "bg-red-500",
    features: [
      "Parts of speech",
      "Sentence structure",
      "Punctuation rules",
      "Error correction",
      "Advanced constructions"
    ]
  },
  {
    id: "public-speaking",
    title: "Public Speaking",
    description: "Build confidence and master the art of public speaking with practical exercises, presentation skills, and personalized feedback.",
    duration: "3 months",
    batchSize: "6-8 students",
    targetGrade: "Grade 8-12",
    icon: Mic,
    color: "bg-indigo-500",
    features: [
      "Confidence building",
      "Speech preparation",
      "Body language",
      "Audience engagement",
      "Presentation skills"
    ]
  }
];

export default function CoursesPage() {
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");

  const handleEnrollClick = (courseTitle: string) => {
    setSelectedCourse(courseTitle);
    setShowEnrollModal(true);
  };

  return (
    <>
      <Navbar />
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-primary/10 to-emerald-500/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <Badge className="mb-4" variant="secondary">Our Courses</Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Comprehensive English Programs
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Choose from our expertly designed courses that cater to different learning needs and academic goals. Each program is tailored to ensure maximum learning outcomes.
              </p>
            </div>
          </div>
        </section>

        {/* Courses Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course) => (
                <Card 
                  key={course.id} 
                  className="hover:shadow-lg transition-all duration-300 transform hover:scale-105 group"
                >
                  <CardHeader className="pb-4">
                    <div className={`h-16 w-16 ${course.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <course.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {course.title}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      {course.description}
                    </p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-2" />
                        Duration: {course.duration}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Users className="h-4 w-4 mr-2" />
                        Batch Size: {course.batchSize}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <GraduationCap className="h-4 w-4 mr-2" />
                        Target: {course.targetGrade}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-semibold text-foreground">Key Features:</h4>
                      <ul className="space-y-1">
                        {course.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-sm text-muted-foreground">
                            <CheckCircle className="h-3 w-3 mr-2 text-green-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Button
                      onClick={() => handleEnrollClick(course.title)}
                      className="w-full bg-primary hover:bg-primary/90 group-hover:bg-primary/80 transition-colors"
                    >
                      Enroll Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Ready to Start Your Learning Journey?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of students who have transformed their English skills with our expert guidance and personalized approach.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => setShowEnrollModal(true)}
                size="lg"
                className="bg-primary hover:bg-primary/90"
              >
                Enroll Today
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => window.location.href = "/contact"}
              >
                Contact Us
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <EnrollModal
        isOpen={showEnrollModal}
        onClose={() => setShowEnrollModal(false)}
        selectedCourse={selectedCourse}
      />
    </>
  );
}
