# Reads Studio

Reads Studio is a full-featured, AI-powered web application for book and document management.  
Built with **Next.js, TypeScript, Tailwind CSS, and AWS Amplify**, it delivers a modern, secure, and highly interactive experience.

---

## Table of Contents

- [Getting Started](#getting-started)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)

---

## Getting Started

1. **Clone the repository**

   ```sh
   git clone <repo-url>
   cd reads-studio

   ```

2. **Install dependencies**

   ```sh
   npm install --legacy-peer-deps
   ```

3. **Configure AWS Amplify**

   - Install Amplify CLI if not already installed:

     ```sh
     npm install -g @aws-amplify/cli
     ```

   - Configure your AWS credentials (one-time per machine):

     ```sh
     amplify configure
     ```

   - Pull the existing Amplify backend environment:

     ```sh
     amplify pull --appId <appId> --envName <env>
     ```

     This will automatically generate/update the `amplify/` folder and configuration files (e.g., `aws-exports.js`).

4. **Run the development server**

   ```sh
   npm run dev
   ```

5. **Open in browser**
   [http://localhost:3000](http://localhost:3000)

---

## Features

### Authentication & User Management

- Secure sign up, login, and logout (AWS Cognito)
- Email confirmation and password recovery
- User session and context management

### Document & Book Management

- Upload documents and books in multiple formats
- Automatic document splitting into pages for easier navigation and processing
- Drag-and-drop page reordering (`react-beautiful-dnd`)
- Edit, delete, and add pages to documents
- Book creation, editing, and deletion
- Book details with cover, author, and metadata
- Library view with search and filtering
- Document preview and page viewer

### Slides Management

- Create slides from document pages
- Edit, delete, and reorder slides
- Download slides locally
- Upload slides to cloud storage

### AI-Powered Features

- Summarize documents or individual pages using AI
- Generate page images using AI models

### UI/UX & Accessibility

- Responsive design (desktop & mobile)
- Mobile preview mode
- Theme toggle (light/dark mode)
- Skeleton loaders (LibrarySkeleton, BookDetailsSkeleton)
- Toast notifications (`sonner`)
- Error boundaries for graceful error handling
- Accessibility-first design principles

### Navigation & Pages

- Home page with highlights & quick access
- Contact page for feedback/support
- Our Story page (mission, values, team)
- Privacy Policy & Terms pages
- Custom 404 Not Found page
- Footer and Navbar navigation

### Amplify & Cloud Integration

- AWS Amplify backend (Auth, Storage, GraphQL API, Analytics)
- Cloud storage for documents and images
- Analytics and usage tracking (Amplify Analytics)

### Utilities & Helpers

- Custom React hooks (mobile detection, toast, Amplify client)
- Context providers (Auth, Document, Theme)
- Utility functions for error handling, uploads, etc.
- Modular, reusable UI components (forms, cards, navigation, etc.)

### Other Features

- Real-time updates with `document-store`
- Confirmation dialogs for destructive actions
- Modular service layer for APIs and AI integrations

---

## Tech Stack

- **Framework:** Next.js
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Cloud & Backend:** AWS Amplify (Cognito, Storage, GraphQL API, Analytics)

---

## Project Structure

```text
reads-studio/
│
├── app/                  # Next.js app (routing, layouts, providers)
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Main page
│   └── ...               # Other pages and UI
│
├── components/           # Reusable UI components
│   ├── navbar.tsx        # Navigation bar
│   ├── footer.tsx        # Footer
│   ├── document-splitter.tsx
│   └── ...               # Forms, cards, skeletons, modals
│
├── contexts/             # React context providers
│   ├── AuthContext.tsx   # Authentication context
│   └── ...               # Document, theme contexts
│
├── hooks/                # Custom React hooks
│   ├── use-amplify-client.ts
│   └── ...               # Mobile detection, toast
│
├── lib/                  # API clients, services, AI integrations
│   ├── api-client.ts
│   └── ...
│
├── public/               # Static assets
│   ├── placeholder-logo.png
│   └── ...               # Images, SVGs
│
├── stores/               # State management
│   ├── document-store.ts
│   └── ...
│
├── styles/               # Global and component styles
│   ├── globals.css
│   └── ...
│
├── types/                # TypeScript type definitions
│   ├── api-types.ts
│   └── ...
│
├── utils/                # Helper functions
│   ├── get-error-message.tsx
│   └── ...
│
├── amplify/              # AWS Amplify config & backend
│   ├── cli.json
│   └── ...
```
