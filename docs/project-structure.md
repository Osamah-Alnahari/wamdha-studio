# Project Structure

```text
wamdha-studio/
│
├── app/                  # Next.js app (routing, layouts, providers)
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Main page
│   ├── globals.css       # Global styles and CSS variables
│   ├── (auth)/           # Authentication routes
│   │   ├── login/
│   │   ├── register/
│   │   └── confirm-signup/
│   ├── books/            # Book management routes
│   │   ├── page.tsx      # Library page
│   │   ├── [id]/         # Dynamic book routes
│   │   └── new/          # New book creation
│   ├── contact/          # Contact page
│   ├── ourstory/         # About/story page
│   ├── privacy/          # Privacy policy
│   └── terms-and-conditions/ # Terms of service
│
├── components/           # Reusable UI components
│   ├── ui/               # Core design system components
│   │   ├── button.tsx    # Button with variants
│   │   ├── card.tsx      # Card container
│   │   ├── input.tsx     # Form input
│   │   ├── label.tsx     # Form label
│   │   ├── badge.tsx     # Status badges
│   │   ├── alert.tsx     # Alert messages
│   │   ├── dialog.tsx    # Modal dialogs
│   │   ├── tabs.tsx      # Tab navigation
│   │   ├── accordion.tsx # Expandable content
│   │   └── ...           # 25+ additional UI components
│   ├── auth/             # Authentication components
│   │   ├── login-form.tsx
│   │   ├── register-form.tsx
│   │   └── confirm-signup-form.tsx
│   ├── shared/           # Shared business components
│   │   └── book/
│   │       ├── book-details.tsx
│   │       └── book-details-page.tsx
│   ├── skeletons/        # Loading state components
│   │   ├── LibrarySkeleton.tsx
│   │   └── BookDetailsSkeleton.tsx
│   ├── navbar.tsx        # Site navigation
│   ├── footer.tsx        # Site footer
│   ├── theme-toggle.tsx  # Dark/light mode toggle
│   ├── document-uploader.tsx     # File upload component
│   ├── document-splitter.tsx     # Document processing orchestrator
│   ├── page-viewer.tsx           # Document page display
│   ├── summary-viewer.tsx        # Summary editor
│   ├── pages-list.tsx            # Page navigation
│   ├── summarized-pages-list.tsx # Reorderable summary list
│   ├── mobile-preview.tsx        # Mobile viewport simulator
│   ├── home-page.tsx             # Landing page
│   ├── contact-page.tsx          # Contact form and info
│   ├── ourstory-page.tsx         # Company story
│   ├── privacy-page.tsx          # Privacy policy
│   └── terms-page.tsx            # Terms of service
│
├── contexts/             # React context providers
│   ├── AuthContext.tsx   # Authentication state
│   └── theme-provider.tsx # Theme management
│
├── hooks/                # Custom React hooks
│   ├── use-amplify-client.ts # AWS Amplify client
│   ├── use-mobile.tsx        # Mobile detection
│   └── use-toast.ts          # Toast notifications
│
├── lib/                  # Utility libraries and services
│   ├── amplify.ts        # AWS Amplify configuration
│   ├── api-client.ts     # API client setup
│   ├── utils.ts          # General utilities
│   ├── document-processor.ts # Document processing logic
│   └── services/         # Service layer
│       ├── auth.service.ts    # Authentication services
│       ├── book.service.ts    # Book management
│       ├── file.service.ts    # File upload/download
│       └── ai.service.ts      # AI integration
│
├── stores/               # State management
│   └── document-store.ts # Zustand store for document workflow
│
├── types/                # TypeScript type definitions
│   ├── index.ts          # Export all types
│   ├── auth-types.ts     # Authentication types
│   ├── api-types.ts      # API response types
│   ├── component-types.ts # Component prop types
│   ├── document-types.ts  # Document management types
│   └── store-types.ts     # State management types
│
├── utils/                # Helper functions
│   └── get-error-message.tsx # Error handling utilities
│
├── constants/            # Application constants
│   └── index.ts          # App configuration
│
├── public/               # Static assets
│   ├── placeholder-logo.png
│   ├── placeholder.jpg
│   └── component-showcase.html # Live component demo
│
├── amplify/              # AWS Amplify backend configuration
│   ├── cli.json
│   ├── team-provider-info.json
│   ├── backend/
│   │   ├── auth/         # Cognito configuration
│   │   ├── api/          # GraphQL API
│   │   ├── storage/      # S3 storage
│   │   └── analytics/    # Analytics configuration
│   └── #current-cloud-backend/
│
├── docs/                 # Documentation
│   ├── getting-started.md
│   ├── components.md
│   ├── examples.md
│   ├── features.md
│   ├── tech-stack.md
│   └── architecture.md
│
├── components.json       # shadcn/ui configuration
├── tailwind.config.ts    # Tailwind CSS configuration
├── tsconfig.json        # TypeScript configuration
├── next.config.mjs      # Next.js configuration
├── package.json         # Dependencies and scripts
└── README.md            # Project overview
```

## Key Directories Explained

### `/app` - Next.js 14 App Router

- **Route-based structure** with nested layouts
- **Server/Client components** separated appropriately
- **Global styles** and CSS custom properties in globals.css

### `/components` - Component Library

- **`/ui`** - Core design system components (Button, Card, Input, etc.)
- **Feature components** - Business logic components (DocumentUploader, PageViewer)
- **Page components** - Full page implementations (HomePage, ContactPage)

### `/lib` - Services & Utilities

- **API clients** and service layer organization
- **AWS Amplify** configuration and helpers
- **Document processing** logic separate from UI components

### `/types` - TypeScript Definitions

- **Organized by feature** (auth, api, components, etc.)
- **Centralized exports** from index.ts for easy imports
- **Prop interfaces** for all custom components

### `/stores` - State Management

- **Zustand stores** for complex state (document workflow)
- **React Context** for simple shared state (auth, theme)
