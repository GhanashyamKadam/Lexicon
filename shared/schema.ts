import { pgTable, text, serial, integer, boolean, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  isAdmin: boolean("is_admin").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const enrollments = pgTable("enrollments", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  grade: varchar("grade", { length: 10 }).notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  course: text("course").notNull(),
  timeSlot: text("time_slot").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  isRead: boolean("is_read").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  duration: text("duration").notNull(),
  batchSize: text("batch_size").notNull(),
  targetGrade: text("target_grade").notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const enrollmentRelations = relations(enrollments, ({ one }) => ({
  course: one(courses, {
    fields: [enrollments.course],
    references: [courses.title],
  }),
}));

export const courseRelations = relations(courses, ({ many }) => ({
  enrollments: many(enrollments),
}));

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
});

export const insertEnrollmentSchema = createInsertSchema(enrollments).pick({
  name: true,
  grade: true,
  email: true,
  phone: true,
  course: true,
  timeSlot: true,
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).pick({
  name: true,
  email: true,
  phone: true,
  subject: true,
  message: true,
});

export const insertCourseSchema = createInsertSchema(courses).pick({
  title: true,
  description: true,
  duration: true,
  batchSize: true,
  targetGrade: true,
  isActive: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertEnrollment = z.infer<typeof insertEnrollmentSchema>;
export type Enrollment = typeof enrollments.$inferSelect;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertCourse = z.infer<typeof insertCourseSchema>;
export type Course = typeof courses.$inferSelect;
