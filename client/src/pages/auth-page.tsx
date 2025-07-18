import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertUserSchema, type InsertUser } from "@shared/schema";
import { useAuth } from "@/hooks/use-auth";
import { GraduationCap, UserPlus, LogIn, BookOpen, Award, Users } from "lucide-react";
import { z } from "zod";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

type LoginData = z.infer<typeof loginSchema>;

export default function AuthPage() {
  const [, setLocation] = useLocation();
  const { user, loginMutation, registerMutation } = useAuth();
  const [activeTab, setActiveTab] = useState("login");

  // Redirect if already logged in
  if (user) {
    setLocation("/admin");
    return null;
  }

  const loginForm = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const registerForm = useForm<InsertUser>({
    resolver: zodResolver(insertUserSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const handleLogin = async (data: LoginData) => {
    try {
      await loginMutation.mutateAsync(data);
      setLocation("/admin");
    } catch (error) {
      // Error handling is done in the mutation
    }
  };

  const handleRegister = async (data: InsertUser) => {
    try {
      await registerMutation.mutateAsync(data);
      setLocation("/admin");
    } catch (error) {
      // Error handling is done in the mutation
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-emerald-500/10">
      <div className="flex min-h-screen">
        {/* Left Side - Auth Forms */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <GraduationCap className="h-12 w-12 text-primary mr-3" />
                <span className="text-3xl font-bold text-foreground">Lexicon Learners</span>
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Admin Access</h1>
              <p className="text-muted-foreground">
                Sign in to manage your academy dashboard
              </p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <LogIn className="h-5 w-5" />
                      Sign In
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="login-username">Username</Label>
                        <Input
                          id="login-username"
                          {...loginForm.register("username")}
                          placeholder="Enter your username"
                        />
                        {loginForm.formState.errors.username && (
                          <p className="text-sm text-destructive">
                            {loginForm.formState.errors.username.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="login-password">Password</Label>
                        <Input
                          id="login-password"
                          type="password"
                          {...loginForm.register("password")}
                          placeholder="Enter your password"
                        />
                        {loginForm.formState.errors.password && (
                          <p className="text-sm text-destructive">
                            {loginForm.formState.errors.password.message}
                          </p>
                        )}
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-primary hover:bg-primary/90"
                        disabled={loginMutation.isPending}
                      >
                        {loginMutation.isPending ? "Signing In..." : "Sign In"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="register">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <UserPlus className="h-5 w-5" />
                      Create Account
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={registerForm.handleSubmit(handleRegister)} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="register-username">Username</Label>
                        <Input
                          id="register-username"
                          {...registerForm.register("username")}
                          placeholder="Choose a username"
                        />
                        {registerForm.formState.errors.username && (
                          <p className="text-sm text-destructive">
                            {registerForm.formState.errors.username.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="register-email">Email</Label>
                        <Input
                          id="register-email"
                          type="email"
                          {...registerForm.register("email")}
                          placeholder="Enter your email"
                        />
                        {registerForm.formState.errors.email && (
                          <p className="text-sm text-destructive">
                            {registerForm.formState.errors.email.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="register-password">Password</Label>
                        <Input
                          id="register-password"
                          type="password"
                          {...registerForm.register("password")}
                          placeholder="Create a password"
                        />
                        {registerForm.formState.errors.password && (
                          <p className="text-sm text-destructive">
                            {registerForm.formState.errors.password.message}
                          </p>
                        )}
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-primary hover:bg-primary/90"
                        disabled={registerMutation.isPending}
                      >
                        {registerMutation.isPending ? "Creating Account..." : "Create Account"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Right Side - Hero Section */}
        <div className="flex-1 bg-gradient-to-br from-primary to-emerald-500 flex items-center justify-center p-8 text-white">
          <div className="max-w-lg text-center">
            <h2 className="text-4xl font-bold mb-6">
              Welcome to Lexicon Learners
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Empowering students with exceptional English language skills through innovative teaching methods and personalized attention.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="bg-white/20 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <BookOpen className="h-8 w-8" />
                </div>
                <h3 className="font-semibold mb-1">Expert Courses</h3>
                <p className="text-sm text-white/80">Comprehensive curriculum</p>
              </div>
              
              <div className="text-center">
                <div className="bg-white/20 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="font-semibold mb-1">500+ Students</h3>
                <p className="text-sm text-white/80">Successfully trained</p>
              </div>
              
              <div className="text-center">
                <div className="bg-white/20 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <Award className="h-8 w-8" />
                </div>
                <h3 className="font-semibold mb-1">98% Success</h3>
                <p className="text-sm text-white/80">Achievement rate</p>
              </div>
            </div>

            <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold mb-3">Why Choose Us?</h3>
              <ul className="text-left space-y-2 text-white/90">
                <li>• Personalized attention for every student</li>
                <li>• Experienced and qualified instructors</li>
                <li>• Comprehensive English language programs</li>
                <li>• Proven track record of success</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
