# Features

## Core Document Management

- **DocumentUploader**: Dual-mode file upload (drag & drop + start from scratch)
- **DocumentSplitter**: Main orchestrator for document processing workflow
- **PageViewer**: Display individual pages with copy/summary generation
- **SummaryViewer**: Rich text editor for summaries with drag & drop image management
- **AI Integration**: Automatic text summarization and image generation
- **Drag & Drop Reordering**: Page management with `react-beautiful-dnd`

## Website Design & User Experience

### Landing Page Design (`components/home-page.tsx`)

- **Hero Section**: Animated entrance with gradient backgrounds
- **Feature Cards**: Interactive cards with hover effects and icons
- **Statistics Showcase**: Animated counters and metrics display
- **Call-to-Action**: Multiple conversion points with different button styles
- **Arabic Support**: Full RTL text rendering and proper typography

### Contact Experience (`components/contact-page.tsx`)

- **Multi-Section Layout**: Service cards, contact form, and information grid
- **Interactive Form**: Real-time validation and submission states
- **Service Showcases**: Icon-based service description cards
- **Contact Methods**: Multiple ways to reach out with clear CTAs

### Brand Storytelling (`components/ourstory-page.tsx`)

- **Timeline Design**: Company journey with animated scroll reveals
- **Values Showcase**: Interactive cards highlighting core principles
- **Team Section**: Professional presentation with role descriptions
- **Visual Hierarchy**: Proper heading scales and content organization

### Legal Pages Design

- **Privacy Policy**: Interactive sidebar navigation with content sections
- **Terms of Service**: Accordion-style organization for easy scanning
- **Alert Integration**: Important notices with proper styling
- **Content Structure**: Clear typography hierarchy and readability

## Design System Implementation

### Theme System

- **CSS Custom Properties**: Consistent color tokens across light/dark modes
- **Theme Toggle**: Seamless switching between light and dark themes
- **Color Palette**: Primary, secondary, destructive, and muted color schemes
- **Typography Scale**: Responsive text sizing with proper line heights

### Component Architecture

- **Reusable Cards**: Consistent styling with hover effects (`library-card-hover`)
- **Button Variants**: 6 different styles (default, destructive, outline, secondary, ghost, link)
- **Form Components**: Consistent input styling with validation states
- **Loading States**: Skeleton loaders and loading spinners throughout

### Responsive Design

- **Mobile-First**: Breakpoints at 640px, 768px, 1024px, 1280px
- **Grid Systems**: CSS Grid and Flexbox for complex layouts
- **Container Queries**: Adaptive component sizing based on container
- **Touch Targets**: Proper sizing for mobile interaction

## Authentication & User Management

- **AWS Cognito Integration**: Secure authentication flow
- **Session Management**: Persistent login state with context providers
- **Form Validation**: Real-time validation with error handling
- **User Context**: Global user state management

## Cloud Integration & Performance

- **AWS Amplify**: Backend services (Auth, Storage, GraphQL API, Analytics)
- **File Upload**: Direct S3 uploads with progress tracking
- **Image Processing**: AI-powered image generation and storage
- **Analytics**: User behavior tracking and usage metrics

## Developer Experience

- **TypeScript**: Full type safety with custom interfaces
- **Zustand State Management**: Efficient state management for document workflow
- **Custom Hooks**: Reusable logic for mobile detection, toast notifications, and API clients
- **Error Boundaries**: Graceful error handling throughout the application
- **Modular Service Layer**: APIs and AI integrations organized by feature
