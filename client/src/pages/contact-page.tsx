import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { insertContactMessageSchema, type InsertContactMessage } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send,
  MessageSquare 
} from "lucide-react";

export default function ContactPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<InsertContactMessage>({
    resolver: zodResolver(insertContactMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContactMessage) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for your message. We'll get back to you soon.",
      });
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to Send Message",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = async (data: InsertContactMessage) => {
    setIsSubmitting(true);
    await contactMutation.mutateAsync(data);
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Address",
      content: "123 Education Street, Academic District, City - 560001",
    },
    {
      icon: Phone,
      title: "Phone",
      content: "+91 98765 43210",
    },
    {
      icon: Mail,
      title: "Email",
      content: "info@lexiconlearners.com",
    },
    {
      icon: Clock,
      title: "Hours",
      content: "Mon-Sat: 9:00 AM - 7:00 PM",
    },
  ];

  return (
    <>
      <Navbar />
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-primary/10 to-emerald-500/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <Badge className="mb-4" variant="secondary">Contact Us</Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Get In Touch
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Have questions about our courses? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-8">
                  Contact Information
                </h2>
                
                <div className="space-y-6 mb-8">
                  {contactInfo.map((item, index) => (
                    <div key={index} className="flex items-start">
                      <div className="bg-primary/10 rounded-full p-3 mr-4 flex-shrink-0">
                        <item.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                        <p className="text-muted-foreground">{item.content}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Map Placeholder */}
                <Card className="bg-muted/30">
                  <CardContent className="p-8">
                    <div className="text-center">
                      <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        Find Us Here
                      </h3>
                      <p className="text-muted-foreground">
                        Interactive map integration coming soon
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Form */}
              <div>
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      Send us a Message
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          {...form.register("name")}
                          placeholder="Enter your full name"
                        />
                        {form.formState.errors.name && (
                          <p className="text-sm text-destructive">
                            {form.formState.errors.name.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          {...form.register("email")}
                          placeholder="Enter your email"
                        />
                        {form.formState.errors.email && (
                          <p className="text-sm text-destructive">
                            {form.formState.errors.email.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number (Optional)</Label>
                        <Input
                          id="phone"
                          type="tel"
                          {...form.register("phone")}
                          placeholder="Enter your phone number"
                        />
                        {form.formState.errors.phone && (
                          <p className="text-sm text-destructive">
                            {form.formState.errors.phone.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input
                          id="subject"
                          {...form.register("subject")}
                          placeholder="What's this about?"
                        />
                        {form.formState.errors.subject && (
                          <p className="text-sm text-destructive">
                            {form.formState.errors.subject.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          {...form.register("message")}
                          placeholder="Tell us how we can help you..."
                          rows={4}
                        />
                        {form.formState.errors.message && (
                          <p className="text-sm text-destructive">
                            {form.formState.errors.message.message}
                          </p>
                        )}
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-primary hover:bg-primary/90"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          "Sending..."
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
      </main>

      <Footer />
    </>
  );
}
