# Live Examples

## 🎯 What You Can See

### Component Showcase

**Interactive Demo**: `public/component-showcase.html` - Live demo of all UI components with dark/light mode toggle

### Real Application Usage

Browse through our actual implementation to see the design system in action:

#### Core Pages

- **Homepage** (`components/home-page.tsx`) - Feature cards, CTAs, statistics showcase with Arabic RTL support
- **Contact Page** (`components/contact-page.tsx`) - Multi-section forms, validation states, service cards
- **Our Story** (`components/ourstory-page.tsx`) - Timeline design, interactive value cards, responsive layouts
- **Library** (`components/library-page.tsx`) - Grid layouts, search functionality, book management

#### Document Management Flow

- **Document Upload** (`components/document-uploader.tsx`) - Dual-mode uploader with drag & drop
- **Page Processing** (`components/page-viewer.tsx`) - Content display with action buttons
- **Summary Editing** (`components/summary-viewer.tsx`) - Rich text editor with image management
- **Page Reordering** (`components/summarized-pages-list.tsx`) - Drag & drop lists with react-beautiful-dnd

#### Legal & Content Pages

- **Terms & Privacy** - Accordion navigation, alert integration, typography hierarchy
- **Error Handling** - Custom 404 page, error boundaries, loading states

## 📱 Design System in Production

This isn't just a demo - it's a real application serving users with:

### 25+ Production Components

#### UI Foundation

- **Button** (6 variants × 4 sizes) - Primary, secondary, destructive, outline, ghost, link
- **Card** with Header/Content/Footer - Consistent container styling
- **Form Components** - Input, Label, Textarea with validation states
- **Alert & Toast** - Notifications and important messages
- **Badges & Status** - Visual indicators and tags

#### Layout & Navigation

- **Responsive Navigation** - Mobile-first navbar with theme toggle
- **Footer** - Comprehensive site footer with links and branding
- **Tabs & Accordions** - Content organization components
- **Loading States** - Skeleton loaders throughout the application

#### Interactive Elements

- **Modal Dialogs** - Confirmation dialogs and forms
- **Drag & Drop** - File uploads and list reordering
- **Theme Toggle** - Seamless light/dark mode switching

### CSS Custom Properties for Theming

```css
:root {
  --primary: 240 5.9% 10%;
  --background: 0 0% 100%;
  --radius: 0.5rem;
}
.dark {
  --primary: 0 0% 98%;
  --background: 0 0% 7%;
}
```

### TypeScript Integration

Full IntelliSense support for all components:

```tsx
import { Button } from "@/components/ui/button";
// Autocomplete shows: variant, size, asChild, onClick, disabled, etc.

<Button variant="destructive" size="lg">
  Delete Account
</Button>;
```

### Real Performance Features

- **Mobile-First Responsive Design** - Breakpoints at 640px, 768px, 1024px, 1280px
- **Accessibility Standards** - WCAG 2.1 guidelines with keyboard navigation
- **Production-Ready Patterns** - Error boundaries, loading states, form validation
- **Arabic RTL Support** - Full right-to-left text rendering and proper typography
- **Theme System** - Automatic dark/light mode with system preference detection

## Component Showcase Highlights

### Interactive Elements You Can Test

1. **Button Variants** - See all 6 button styles with hover and active states
2. **Form Components** - Interactive inputs with validation and error states
3. **Cards & Layouts** - Responsive card grids with hover effects
4. **Theme Switching** - Toggle between light and dark modes instantly
5. **Loading States** - Skeleton loaders and spinner animations
6. **Alerts & Toasts** - Different notification types and styles

### Real-World Implementation

The showcase demonstrates components as they appear in the actual application:

- **Consistent spacing** using Tailwind's design tokens
- **Color harmony** across light and dark themes
- **Responsive behavior** on different screen sizes
- **Interactive states** with smooth transitions
- **Accessibility features** like focus indicators and ARIA labels
