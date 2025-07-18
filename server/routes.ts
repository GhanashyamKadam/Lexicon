import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import { insertEnrollmentSchema, insertContactMessageSchema, insertCourseSchema } from "@shared/schema";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication routes
  setupAuth(app);

  // Enrollment routes
  app.post("/api/enrollments", async (req, res, next) => {
    try {
      const validatedData = insertEnrollmentSchema.parse(req.body);
      const enrollment = await storage.createEnrollment(validatedData);
      res.json(enrollment);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: fromZodError(error).toString() 
        });
      }
      next(error);
    }
  });

  app.get("/api/enrollments", async (req, res, next) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Authentication required" });
      }
      
      const enrollments = await storage.getEnrollments();
      res.json(enrollments);
    } catch (error) {
      next(error);
    }
  });

  // Contact message routes
  app.post("/api/contact", async (req, res, next) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      res.json(message);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: fromZodError(error).toString() 
        });
      }
      next(error);
    }
  });

  app.get("/api/contact", async (req, res, next) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Authentication required" });
      }
      
      const messages = await storage.getContactMessages();
      res.json(messages);
    } catch (error) {
      next(error);
    }
  });

  app.patch("/api/contact/:id/read", async (req, res, next) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Authentication required" });
      }
      
      const id = parseInt(req.params.id);
      await storage.markMessageAsRead(id);
      res.json({ success: true });
    } catch (error) {
      next(error);
    }
  });

  // Course routes
  app.get("/api/courses", async (req, res, next) => {
    try {
      const courses = await storage.getActiveCourses();
      res.json(courses);
    } catch (error) {
      next(error);
    }
  });

  app.get("/api/courses/all", async (req, res, next) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Authentication required" });
      }
      
      const courses = await storage.getCourses();
      res.json(courses);
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/courses", async (req, res, next) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Authentication required" });
      }
      
      const validatedData = insertCourseSchema.parse(req.body);
      const course = await storage.createCourse(validatedData);
      res.json(course);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: fromZodError(error).toString() 
        });
      }
      next(error);
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
