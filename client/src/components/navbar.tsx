import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useTheme } from "@/lib/theme-provider";
import { useAuth } from "@/hooks/use-auth";
import { EnrollModal } from "./enroll-modal";
import { GraduationCap, Menu, Moon, Sun, UserCircle } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [location] = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/courses", label: "Courses" },
    { href: "/contact", label: "Contact" },
  ];

  const handleEnrollClick = (course = "") => {
    setSelectedCourse(course);
    setShowEnrollModal(true);
  };

  return (
    <>
      <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <GraduationCap className="h-8 w-8 text-primary mr-3" />
                <span className="text-xl font-bold text-foreground">Lexicon Learners</span>
              </Link>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`transition-colors hover:text-primary ${
                      location === item.href
                        ? "text-primary font-medium"
                        : "text-muted-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                <Button onClick={() => handleEnrollClick()} className="bg-primary hover:bg-primary/90">
                  Enroll Now
                </Button>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="hover:bg-accent"
              >
                {theme === "light" ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
              </Button>
              
              {user ? (
                <Link href="/admin">
                  <Button variant="ghost" size="icon">
                    <UserCircle className="h-5 w-5" />
                  </Button>
                </Link>
              ) : (
                <Link href="/auth">
                  <Button variant="ghost" size="icon">
                    <UserCircle className="h-5 w-5" />
                  </Button>
                </Link>
              )}
              
              <div className="md:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Menu className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right">
                    <div className="flex flex-col space-y-4 mt-8">
                      {navItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`text-left transition-colors hover:text-primary ${
                            location === item.href
                              ? "text-primary font-medium"
                              : "text-muted-foreground"
                          }`}
                        >
                          {item.label}
                        </Link>
                      ))}
                      <Button onClick={() => handleEnrollClick()} className="w-full bg-primary hover:bg-primary/90">
                        Enroll Now
                      </Button>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <EnrollModal
        isOpen={showEnrollModal}
        onClose={() => setShowEnrollModal(false)}
        selectedCourse={selectedCourse}
      />
    </>
  );
}
