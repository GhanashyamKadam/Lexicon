import { z } from "zod";

export const insertEnrollmentSchema = z.object({
  name: z.string().min(1),
  grade: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  course: z.string().min(1),
  timeSlot: z.string().min(1),
});
export type InsertEnrollment = z.infer<typeof insertEnrollmentSchema>;

export type Enrollment = {
  id: number;
  name: string;
  grade: string;
  email: string;
  phone: string;
  course: string;
  timeSlot: string;
  createdAt: string;
};

export const insertContactMessageSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().min(1),
  message: z.string().min(1),
});
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;

export type ContactMessage = {
  id: number;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
};

export const insertUserSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
  email: z.string().email(),
});
export type InsertUser = z.infer<typeof insertUserSchema>;

export type SelectUser = {
  id: number;
  username: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
};
