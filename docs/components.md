# Components We Built

## Design Tokens

Here's how we implemented our design token system using CSS custom properties and Tailwind CSS:

### Our Color System (`app/globals.css`)

```css
/* Light Mode Variables */
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --primary: 240 5.9% 10%;
  --primary-foreground: 0 0% 98%;
  --secondary: 240 4.8% 95.9%;
  --destructive: 0 84.2% 60.2%;
  --border: 240 5.9% 90%;
  --input: 240 5.9% 90%;
  --ring: 240 5.9% 10%;
  --radius: 0.5rem;
}

/* Dark Mode Implementation */
.dark {
  --background: 0 0% 7%;
  --foreground: 0 0% 98%;
  --primary: 0 0% 98%;
  --primary-foreground: 240 5.9% 10%;
  --border: 0 0% 15%;
  --input: 0 0% 15%;
}
```

## Custom Components We Built

Here are the core components we built from scratch for document management:

### Business Logic Components (`components/`)

- **DocumentUploader** - Drag & drop file upload with processing states
- **DocumentSplitter** - Main orchestrator for document processing workflow
- **PageViewer** - Display individual pages with copy/summary generation
- **SummaryViewer** - Rich text editor for summaries with image management
- **PagesList** - Navigation list for original document pages
- **SummarizedPagesList** - Drag & drop reorderable summary pages with actions
- **MobilePreview** - Mobile viewport simulation for content
- **FetchKeyImage** - AI-powered image generation component

### Website Design Components (`components/`)

- **HomePage** - Landing page with animated feature cards and CTA sections
- **ContactPage** - Multi-section contact form with service cards
- **OurStoryPage** - Company story with timeline and values showcase
- **PrivacyPage** - Legal content with interactive navigation sidebar
- **TermsPage** - Terms of service with accordion-style sections
- **Footer** - Comprehensive site footer with links and branding
- **Navbar** - Responsive navigation with theme toggle

### Most Reused Custom Components (15 Core Components)

These are the custom components we built that are used most frequently across the project:

#### UI Foundation Components (`components/ui/`)

1. **Button** - Used in 29+ files, 6 variants (default, destructive, outline, secondary, ghost, link)
2. **Card** - Used in 13+ files, with CardHeader, CardContent, CardFooter sub-components
3. **Input** - Used in 15+ files, form input with consistent styling and validation states
4. **Label** - Used in 12+ files, form labels with proper accessibility
5. **Badge** - Used in 8+ files, status indicators and tags with multiple variants

#### Navigation & Layout Components (`components/`)

6. **Navbar** - Site-wide navigation with responsive design and theme toggle
7. **Footer** - Comprehensive footer with links, branding, and subscription form
8. **ThemeToggle** - Dark/light mode switch used in navbar and throughout the app

#### Document Processing Components (`components/`)

9. **DocumentUploader** - Dual-mode file upload (drag & drop + start from scratch)
10. **DocumentSplitter** - Main orchestrator component that coordinates the entire document workflow
11. **PageViewer** - Document page display with copy/summary generation actions
12. **SummaryViewer** - Rich text editor with drag & drop image management
13. **SummarizedPagesList** - Reorderable list component with drag & drop using react-beautiful-dnd
14. **PagesList** - Navigation list for original document pages with action buttons

#### Website Content Components (`components/`)

15. **HomePage** - Landing page with feature cards, hero sections, and CTAs

## Design Foundations

### Typography Scale

- **Headings**: 4xl, 3xl, 2xl, xl (Bold/Semibold)
- **Body**: Base 1rem, Small 0.875rem
- **Arabic Support**: Full RTL text support with proper line heights

### Spacing System (Tailwind)

- **Base Unit**: 0.25rem (4px)
- **Common Gaps**: 2 (8px), 4 (16px), 6 (24px), 8 (32px)
- **Container Padding**: px-4 (16px mobile), px-6 (24px desktop)

### Border Radius Standards

- **Cards**: rounded-lg (8px)
- **Buttons**: rounded-md (6px)
- **Images**: rounded-xl (12px)
- **Full**: rounded-full (50%)

## Component Documentation

### Design System Structure

```
components/
├── ui/                   # Core UI components (design system)
│   ├── button.tsx        # Button component with variants
│   ├── input.tsx         # Form input component
│   ├── card.tsx          # Card container component
│   ├── dialog.tsx        # Modal dialog component
│   ├── toast.tsx         # Notification component
│   └── ...               # 25+ additional components
├── auth/                 # Authentication components
│   ├── login-form.tsx
│   ├── register-form.tsx
│   └── confirm-signup-form.tsx
├── shared/               # Shared business components
│   └── book/
│       ├── book-details.tsx
│       └── book-details-page.tsx
├── skeletons/            # Loading state components
│   ├── LibrarySkeleton.tsx
│   └── BookDetailsSkeleton.tsx
└── ...                   # Feature-specific components
```
