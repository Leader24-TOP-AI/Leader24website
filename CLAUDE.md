# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
```bash
npm run dev          # Start development server with HMR (runs on port 5000)
npm run build        # Build frontend with Vite and backend with esbuild
npm run start        # Run production server (requires built files)
npm run check        # Run TypeScript type checking
npm run db:push      # Push database schema changes with Drizzle Kit
```

### Environment Setup
- Requires `DATABASE_URL` environment variable for PostgreSQL connection
- Uses `.env` files for environment configuration
- Default port is 5000 (configurable via `PORT` env var)

## Architecture Overview

### Tech Stack
- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS + Shadcn/ui
- **Backend**: Express.js + TypeScript + Drizzle ORM
- **Database**: PostgreSQL with Neon
- **Internationalization**: i18next (English and Italian)
- **Authentication**: Passport.js
- **External Services**: OpenAI API, SendGrid, N8N Chat

### Project Structure
- `/client/src/` - React frontend application
  - `components/` - Reusable UI components including Shadcn/ui primitives
  - `pages/` - Page components (Home, Sectors, EcommercePage, etc.)
  - `data/` - Static data files for features, industries, case studies
  - `hooks/` - Custom React hooks
  - `lib/` - Utility functions and configurations
- `/server/` - Express backend
  - `index.ts` - Main server entry point
  - `routes.ts` - API route definitions
  - `db.ts` - Database connection and queries
- `/shared/` - Shared TypeScript schemas used by both frontend and backend
- `/public/locales/` - i18n translation files (en/ and it/)

### Key Architectural Patterns

1. **Path Aliases**: Use `@/` for client imports and `@shared/` for shared code
2. **Type Safety**: Shared Zod schemas between frontend and backend in `/shared/schema.ts`
3. **Theming**: CSS variables-based theming with dark/light mode support
4. **Component Library**: Extensive use of Shadcn/ui components in `/client/src/components/ui/`
5. **Internationalization**: Namespace-based translation structure (common, home, sectors, etc.)
6. **State Management**: React Query (TanStack Query) for server state
7. **Forms**: React Hook Form with Zod validation

### Development Considerations

1. **Database Changes**: Always update schemas in `/shared/schema.ts` and run `npm run db:push`
2. **Adding Components**: Follow existing Shadcn/ui patterns in the ui/ directory
3. **Translations**: Update both `/public/locales/en/` and `/public/locales/it/` when adding new text
4. **API Routes**: Define new routes in `/server/routes.ts`
5. **Environment Variables**: Required vars include `DATABASE_URL`, optional include `PORT`, `RESEND_API_KEY`, `OPENAI_API_KEY`

### Common Patterns

1. **API Endpoints**: Follow RESTful conventions, all API routes prefixed with `/api/`
2. **Component Imports**: Use the path alias `@/components/` for importing components
3. **Styling**: Use Tailwind CSS classes, custom animations defined in `tailwind.config.ts`
4. **Error Handling**: Centralized error handler in server, use try-catch blocks in async functions
5. **TypeScript**: Strict mode enabled, avoid using `any` type