import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertEnrollmentSchema, type InsertEnrollment } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { UserPlus } from "lucide-react";

interface EnrollModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCourse?: string;
}

const courses = [
  "ICSE English Language",
  "ISC English Language",
  "ICSE/ISC Literature",
  "Vocabulary Building",
  "Grammar Enhancement",
  "Public Speaking",
];

const timeSlots = [
  "Morning (9:00 AM - 11:00 AM)",
  "Afternoon (2:00 PM - 4:00 PM)",
  "Evening (5:00 PM - 7:00 PM)",
];

export function EnrollModal({ isOpen, onClose, selectedCourse = "" }: EnrollModalProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<InsertEnrollment>({
    resolver: zodResolver(insertEnrollmentSchema),
    defaultValues: {
      name: "",
      grade: "",
      email: "",
      phone: "",
      course: selectedCourse,
      timeSlot: "",
    },
  });

  const enrollMutation = useMutation({
    mutationFn: async (data: InsertEnrollment) => {
      const response = await apiRequest("POST", "/api/enrollments", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Enrollment Successful!",
        description: "Your enrollment has been submitted successfully. We'll contact you soon.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/enrollments"] });
      form.reset();
      onClose();
    },
    onError: (error: Error) => {
      toast({
        title: "Enrollment Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = async (data: InsertEnrollment) => {
    setIsSubmitting(true);
    await enrollMutation.mutateAsync(data);
    setIsSubmitting(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Enroll Now
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              {...form.register("name")}
              placeholder="Enter your full name"
              className="w-full"
            />
            {form.formState.errors.name && (
              <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="grade">Grade/Class</Label>
            <Select onValueChange={(value) => form.setValue("grade", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Grade" />
              </SelectTrigger>
              <SelectContent>
                {[5, 6, 7, 8, 9, 10, 11, 12].map((grade) => (
                  <SelectItem key={grade} value={grade.toString()}>
                    Grade {grade}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {form.formState.errors.grade && (
              <p className="text-sm text-destructive">{form.formState.errors.grade.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              {...form.register("email")}
              placeholder="Enter your email"
              className="w-full"
            />
            {form.formState.errors.email && (
              <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              {...form.register("phone")}
              placeholder="Enter your phone number"
              className="w-full"
            />
            {form.formState.errors.phone && (
              <p className="text-sm text-destructive">{form.formState.errors.phone.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="course">Course Selection</Label>
            <Select 
              defaultValue={selectedCourse} 
              onValueChange={(value) => form.setValue("course", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Course" />
              </SelectTrigger>
              <SelectContent>
                {courses.map((course) => (
                  <SelectItem key={course} value={course}>
                    {course}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {form.formState.errors.course && (
              <p className="text-sm text-destructive">{form.formState.errors.course.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="timeSlot">Preferred Time Slot</Label>
            <Select onValueChange={(value) => form.setValue("timeSlot", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Time Slot" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((slot) => (
                  <SelectItem key={slot} value={slot}>
                    {slot}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {form.formState.errors.timeSlot && (
              <p className="text-sm text-destructive">{form.formState.errors.timeSlot.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Enrollment"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
