# Lexicon Learners - English Learning Platform

## Overview

Lexicon Learners is a modern English learning platform built with React and Express.js. The application allows students to enroll in various English courses, contact instructors, and provides an admin dashboard for managing enrollments and messages. The platform is designed specifically for ICSE/ISC English language preparation with features like course enrollment, contact management, and administrative oversight.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Forms**: React Hook Form with Zod validation
- **Theme**: Dark/light mode support with custom theme provider

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Authentication**: Passport.js with local strategy and session-based auth
- **Database**: PostgreSQL with Drizzle ORM
- **Session Storage**: PostgreSQL sessions using connect-pg-simple
- **API Structure**: RESTful endpoints with proper error handling

### Database Design
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts` for type sharing between frontend and backend
- **Tables**: Users, enrollments, contact messages, courses
- **Migrations**: Managed through Drizzle Kit

## Key Components

### Authentication System
- Session-based authentication using Passport.js
- Password hashing with Node.js crypto (scrypt)
- Protected routes for admin access
- User registration and login functionality

### Course Management
- Course catalog with detailed information
- Enrollment system with form validation
- Course filtering and display
- Admin course management capabilities

### Contact System
- Contact form for inquiries
- Message storage and management
- Admin dashboard for reviewing messages
- Email and phone validation

### Admin Dashboard
- Protected admin routes
- Enrollment management
- Contact message review
- Statistics and analytics display

## Data Flow

1. **User Registration/Login**: Frontend forms → Backend validation → Database storage → Session creation
2. **Course Enrollment**: Form submission → Validation → Database insertion → Success notification
3. **Contact Messages**: Form submission → Validation → Database storage → Admin notification
4. **Admin Operations**: Authentication check → Data fetching → Display in dashboard

## External Dependencies

### Frontend Dependencies
- **UI Components**: Radix UI primitives with shadcn/ui
- **HTTP Client**: Native fetch API with custom wrapper
- **Form Handling**: React Hook Form with Zod resolvers
- **Icons**: Lucide React
- **Date Handling**: date-fns

### Backend Dependencies
- **Database**: Neon Database (PostgreSQL)
- **Authentication**: Passport.js with local strategy
- **Session Store**: connect-pg-simple for PostgreSQL sessions
- **Validation**: Zod with drizzle-zod integration
- **Password Hashing**: Node.js crypto module

### Development Dependencies
- **Build Tool**: Vite for frontend bundling
- **Development Server**: tsx for TypeScript execution
- **CSS Processing**: PostCSS with Tailwind CSS
- **Type Checking**: TypeScript compiler

## Deployment Strategy

### Build Process
1. Frontend build using Vite (`vite build`)
2. Backend build using esbuild (`esbuild server/index.ts`)
3. Static files served from `dist/public`
4. Server bundle in `dist/index.js`

### Environment Requirements
- Node.js runtime
- PostgreSQL database (via DATABASE_URL)
- Session secret (SESSION_SECRET)
- Production/development environment variables

### Database Setup
- Drizzle migrations in `./migrations` directory
- Database push command: `npm run db:push`
- Schema synchronization with PostgreSQL

### Development vs Production
- Development: Vite dev server with HMR
- Production: Static file serving with Express
- Database: Uses Neon Database with WebSocket support in development

The application follows a monorepo structure with shared types and schemas, making it easy to maintain consistency between frontend and backend. The authentication system is session-based for simplicity, and the admin dashboard provides comprehensive management capabilities for the English learning platform.