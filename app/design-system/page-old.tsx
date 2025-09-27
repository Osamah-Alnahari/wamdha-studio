// "use client";
// import React, { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Badge } from "@/components/ui/badge";
// import { Copy, Check } from "lucide-react";

// // Simple CodeBlock component using shadcn/ui
// const CodeBlock: React.FC<{title?: string; code: string; language?: string}> = ({ title, code, language = "html" }) => {
//   const [copied, setCopied] = useState(false);
  
//   const handleCopy = () => {
//     navigator.clipboard?.writeText(code);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   return (
//     <Card className="mt-4">
//       <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//         <CardTitle className="text-sm font-medium">{title}</CardTitle>
//         <Button 
//           variant="outline" 
//           size="sm" 
//           onClick={handleCopy}
//           className="h-6 px-2"
//         >
//           {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
//         </Button>
//       </CardHeader>
//       <CardContent>
//         <pre className="text-xs bg-muted p-4 rounded-md overflow-x-auto">
//           <code>{code}</code>
//         </pre>
//       </CardContent>
//     </Card>
//   );
// };
//       .ds-container {
//         max-width: 1200px;
//         margin: 0 auto;
//         padding: 0 2rem 4rem;
//         display: flex;
//         flex-direction: column;
//         gap: 4rem;
//         font-family: var(
//           --ds-font-family-sans,
//           -apple-system,
//           BlinkMacSystemFont,
//           "Segoe UI",
//           Roboto,
//           sans-serif
//         );
//         line-height: 1.6;
//         color: var(--ds-color-text, #1a1a1a);
//       }
//       .ds-header {
//         text-align: center;
//         padding: 4rem 0 2rem;
//         background: linear-gradient(
//           135deg,
//           var(--ds-color-bg, #ffffff) 0%,
//           var(--ds-color-surface-alt, #f8fafc) 100%
//         );
//         border-radius: var(--ds-radius-lg, 12px);
//         margin: 2rem 0;
//         box-shadow: var(--ds-shadow-sm, 0 1px 3px rgba(0, 0, 0, 0.05));
//       }
//       .ds-title {
//         font-size: clamp(2.5rem, 5vw, 4rem);
//         font-weight: var(--ds-font-weight-bold, 700);
//         margin: 0 0 1rem;
//         background: linear-gradient(
//           135deg,
//           var(--ds-color-action-primary, #2563eb) 0%,
//           var(--ds-color-accent-forest, #059669) 100%
//         );
//         -webkit-background-clip: text;
//         -webkit-text-fill-color: transparent;
//         background-clip: text;
//       }
//       .ds-subtitle {
//         font-size: var(--ds-font-size-lg, 1.125rem);
//         color: var(--ds-color-text-muted, #6b7280);
//         max-width: 600px;
//         margin: 0 auto 2rem;
//         line-height: 1.7;
//       }
//       .ds-stats {
//         display: flex;
//         justify-content: center;
//         gap: 3rem;
//         margin-top: 2rem;
//       }
//       .stat {
//         display: flex;
//         flex-direction: column;
//         align-items: center;
//         gap: 0.5rem;
//       }
//       .stat-number {
//         font-size: var(--ds-font-size-2xl, 1.5rem);
//         font-weight: var(--ds-font-weight-bold, 700);
//         color: var(--ds-color-action-primary, #2563eb);
//       }
//       .stat-label {
//         font-size: var(--ds-font-size-sm, 0.875rem);
//         color: var(--ds-color-text-muted, #6b7280);
//         text-transform: uppercase;
//         letter-spacing: 0.05em;
//         font-weight: var(--ds-font-weight-medium, 500);
//       }
//       .ds-nav {
//         display: flex;
//         justify-content: center;
//         gap: 2rem;
//         padding: 1rem 0;
//         border-top: 1px solid var(--ds-color-border, #e5e7eb);
//       }
//       .nav-link {
//         color: var(--ds-color-text-muted, #6b7280);
//         text-decoration: none;
//         font-weight: var(--ds-font-weight-medium, 500);
//         padding: 0.5rem 1rem;
//         border-radius: var(--ds-radius-md, 6px);
//         transition: all 0.2s ease;
//       }
//       .nav-link:hover {
//         color: var(--ds-color-action-primary, #2563eb);
//         background: var(--ds-color-surface, #f8fafc);
//       }
//       .ds-section {
//         display: flex;
//         flex-direction: column;
//         gap: 2rem;
//       }
//       .section-header {
//         text-align: center;
//         margin-bottom: 2rem;
//       }
//       .section-title {
//         font-size: var(--ds-font-size-3xl, 1.875rem);
//         font-weight: var(--ds-font-weight-bold, 700);
//         margin: 0 0 1rem;
//         color: var(--ds-color-text, #1a1a1a);
//       }
//       .section-description {
//         font-size: var(--ds-font-size-lg, 1.125rem);
//         color: var(--ds-color-text-muted, #6b7280);
//         max-width: 700px;
//         margin: 0 auto;
//         line-height: 1.7;
//       }
//       .components-grid {
//         display: grid;
//         gap: 3rem;
//       }
//       .component-showcase {
//         background: var(--ds-color-surface, #ffffff);
//         border: 1px solid var(--ds-color-border, #e5e7eb);
//         border-radius: var(--ds-radius-lg, 12px);
//         padding: 2rem;
//         box-shadow: var(--ds-shadow-xs, 0 1px 2px rgba(0, 0, 0, 0.05));
//         transition: box-shadow 0.2s ease;
//       }
//       .component-showcase:hover {
//         box-shadow: var(--ds-shadow-md, 0 4px 6px rgba(0, 0, 0, 0.05));
//       }
//       .component-header {
//         display: flex;
//         align-items: center;
//         justify-content: space-between;
//         margin-bottom: 1rem;
//       }
//       .component-title {
//         font-size: var(--ds-font-size-xl, 1.25rem);
//         font-weight: var(--ds-font-weight-semibold, 600);
//         margin: 0;
//         color: var(--ds-color-text, #1a1a1a);
//       }
//       .component-badge {
//         background: var(--ds-color-action-primary, #2563eb);
//         color: white;
//         font-size: var(--ds-font-size-xs, 0.75rem);
//         font-weight: var(--ds-font-weight-medium, 500);
//         padding: 0.25rem 0.75rem;
//         border-radius: var(--ds-radius-full, 9999px);
//         text-transform: uppercase;
//         letter-spacing: 0.05em;
//       }
//       .component-description {
//         color: var(--ds-color-text-muted, #6b7280);
//         margin: 0 0 1.5rem;
//         line-height: 1.6;
//       }
//       .ds-codeblock {
//         border: 1px solid var(--ds-color-border, #e5e7eb);
//         border-radius: var(--ds-radius-lg, 12px);
//         background: var(--ds-color-surface, #ffffff);
//         overflow: hidden;
//         font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, "Roboto Mono",
//           monospace;
//         margin: 1rem 0;
//       }
//       .ds-codeblock-header {
//         display: flex;
//         align-items: center;
//         justify-content: space-between;
//         padding: 0.5rem 0.75rem;
//         gap: 1rem;
//         background: var(--ds-color-surface-alt, #f8fafc);
//         border-bottom: 1px solid var(--ds-color-border, #e5e7eb);
//       }
//       .ds-codeblock pre {
//         margin: 0;
//         padding: 1rem;
//         font-size: var(--ds-font-size-xs, 0.75rem);
//         line-height: 1.4;
//         overflow-x: auto;
//       }
//       .ds-btn {
//         font-size: var(--ds-font-size-xs, 0.75rem);
//         padding: 0.35rem 0.6rem;
//         border: 1px solid var(--ds-color-border, #e5e7eb);
//         background: var(--ds-color-surface, #ffffff);
//         border-radius: var(--ds-radius-sm, 4px);
//         cursor: pointer;
//       }
//       .ds-btn:hover {
//         background: var(--ds-color-surface-alt, #f8fafc);
//       }
//       .ds-field {
//         display: flex;
//         flex-direction: column;
//         gap: 0.25rem;
//         max-width: 320px;
//       }
//       .ds-field__label {
//         font-size: var(--ds-font-size-sm, 0.875rem);
//         font-weight: var(--ds-font-weight-medium, 500);
//       }
//       .field-input {
//         padding: 0.5rem 0.75rem;
//         border: 1px solid var(--ds-color-border, #e5e7eb);
//         border-radius: var(--ds-radius-md, 6px);
//         background: var(--ds-color-surface, #ffffff);
//         font: inherit;
//       }
//       .field-input:focus {
//         outline: none;
//         border-color: var(--ds-color-action-primary, #2563eb);
//         box-shadow: 0 0 0 2px
//           color-mix(
//             in srgb,
//             var(--ds-color-action-primary, #2563eb) 40%,
//             transparent
//           );
//       }
//       .ds-field__help {
//         font-size: var(--ds-font-size-xs, 0.75rem);
//         color: var(--ds-color-text-muted, #6b7280);
//       }
//       .ds-field__error {
//         font-size: var(--ds-font-size-xs, 0.75rem);
//         color: var(--ds-color-error, #dc2626);
//       }
//       .ds-field--error .field-input {
//         border-color: var(--ds-color-error, #dc2626);
//       }
//       .guidelines-grid {
//         display: grid;
//         grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
//         gap: 2rem;
//         margin-top: 2rem;
//       }
//       .guideline-card {
//         background: var(--ds-color-surface, #ffffff);
//         border: 1px solid var(--ds-color-border, #e5e7eb);
//         border-radius: var(--ds-radius-lg, 12px);
//         padding: 2rem;
//         box-shadow: var(--ds-shadow-xs, 0 1px 2px rgba(0, 0, 0, 0.05));
//       }
//       .guideline-title {
//         font-size: var(--ds-font-size-xl, 1.25rem);
//         font-weight: var(--ds-font-weight-semibold, 600);
//         margin: 0 0 1.5rem;
//         color: var(--ds-color-text, #1a1a1a);
//       }
//       .guideline-list {
//         display: flex;
//         flex-direction: column;
//         gap: 1rem;
//       }
//       .guideline-item {
//         padding: 1rem;
//         background: var(--ds-color-surface-alt, #f8fafc);
//         border-radius: var(--ds-radius-md, 6px);
//         border-left: 3px solid var(--ds-color-action-primary, #2563eb);
//         line-height: 1.6;
//       }
//       .token-showcase {
//         margin-top: 2rem;
//       }
//       @media (max-width: 768px) {
//         .ds-container {
//           padding: 0 1rem 2rem;
//           gap: 2rem;
//         }
//         .ds-header {
//           padding: 2rem 1rem;
//         }
//         .ds-stats {
//           gap: 1.5rem;
//         }
//         .ds-nav {
//           gap: 1rem;
//           flex-wrap: wrap;
//         }
//       }
//       .ds-footer {
//         margin-top: 4rem;
//         padding: 3rem 2rem 2rem;
//         text-align: center;
//         background: var(--ds-color-surface-alt, #f8fafc);
//         border-radius: var(--ds-radius-lg, 12px);
//         border: 1px solid var(--ds-color-border, #e5e7eb);
//       }
//     `}</style>
//   </>
// );

// const CodeBlock: React.FC<{
//   title?: string;
//   code: string;
//   language?: string;
// }> = ({ title, code, language = "html" }) => {
//   return (
//     <div className="ds-codeblock">
//       <div className="ds-codeblock-header">
//         <span>{title}</span>
//         <button
//           className="ds-btn"
//           onClick={() => navigator.clipboard?.writeText(code)}
//         >
//           Copy
//         </button>
//       </div>
//       <pre>
//         <code>{code}</code>
//       </pre>
//     </div>
//   );
// };

// const Field: React.FC<{
//   label: string;
//   help?: string;
//   error?: string;
//   required?: boolean;
//   children: React.ReactElement;
// }> = ({ label, help, error, required, children }) => {
//   const id = `field-${Math.random().toString(36).substr(2, 9)}`;
//   const control = React.cloneElement(children, {
//     id,
//     "aria-describedby":
//       [help && `${id}-help`, error && `${id}-err`].filter(Boolean).join(" ") ||
//       undefined,
//     "aria-invalid": error ? true : undefined,
//   } as any);

//   return (
//     <div className={`ds-field ${error ? "ds-field--error" : ""}`}>
//       <label className="ds-field__label" htmlFor={id}>
//         {label} {required && <span aria-hidden="true">*</span>}
//       </label>
//       {control}
//       {help && (
//         <p id={`${id}-help`} className="ds-field__help">
//           {help}
//         </p>
//       )}
//       {error && (
//         <p id={`${id}-err`} className="ds-field__error" role="alert">
//           {error}
//         </p>
//       )}
//     </div>
//   );
// };

// // Lightweight demo helpers (scoped styles via styled-jsx)
// // NOTE: In production, move these into design-system/css/*.css

// const colorTokens = [
//   "ds-color-bg",
//   "ds-color-surface",
//   "ds-color-surface-alt",
//   "ds-color-text",
//   "ds-color-text-muted",
//   "ds-color-action-primary",
//   "ds-color-action-primary-fg",
//   "ds-color-action-secondary",
//   "ds-color-border",
//   "ds-color-error",
//   "ds-color-success",
//   "ds-color-warning",
//   "ds-color-info",
//   "ds-color-paper",
//   "ds-color-paper-alt",
//   "ds-color-ink",
//   "ds-color-accent-forest",
//   "ds-color-accent-leather",
//   "ds-color-accent-gold",
// ];

// const fontSizes = ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl"];

// const spacings = [1, 2, 3, 4, 5, 6, 8, 10, 12, 16];

// const buttons: Array<{ variant: string; label: string }> = [
//   { variant: "primary", label: "Primary" },
//   { variant: "secondary", label: "Secondary" },
//   { variant: "subtle", label: "Subtle" },
//   { variant: "destructive", label: "Destructive" },
//   { variant: "link", label: "Link" },
// ];

// // Note: Client Components cannot export metadata.
// // The page title should be set in the parent layout or using next/head if needed.

// function Swatch({ token }: { token: string }) {
//   const cssVar = `var(--${token})`;
//   return (
//     <div className="swatch" role="listitem" aria-label={token}>
//       <div className="swatch-color" style={{ background: cssVar }} />
//       <code className="token-name">--{token}</code>
//     </div>
//   );
// }

// function FontDemo({ size }: { size: string }) {
//   return (
//     <div
//       className="font-demo"
//       style={{ fontSize: `var(--ds-font-size-${size})` }}
//     >
//       <code>--ds-font-size-{size}</code> The quick brown fox jumps over the lazy
//       dog.
//     </div>
//   );
// }

// function SpaceRow({ val }: { val: number }) {
//   return (
//     <div className="space-row">
//       <div className="space-bar" style={{ width: `var(--ds-space-${val})` }} />
//       <code>--ds-space-{val}</code>
//     </div>
//   );
// }

// function ButtonDemo({ variant, label }: { variant: string; label: string }) {
//   const className = `ds-btn ds-btn-${variant}`;
//   return <button className={className}>{label}</button>;
// }

// function FieldDemo() {
//   return (
//     <div className="field">
//       <label htmlFor="email" className="field-label">
//         Email
//       </label>
//       <input
//         id="email"
//         type="email"
//         className="field-input"
//         placeholder="you@example.com"
//       />
//       <p className="field-help">We'll never share your email.</p>
//     </div>
//   );
// }

// function FieldErrorDemo() {
//   return (
//     <div className="field field--error">
//       <label htmlFor="pwd" className="field-label">
//         Password
//       </label>
//       <input
//         id="pwd"
//         type="password"
//         className="field-input"
//         placeholder="••••••"
//         aria-describedby="pwd-err"
//       />
//       <p id="pwd-err" className="field-error">
//         Password must be at least 8 characters.
//       </p>
//     </div>
//   );
// }

// function CardDemo() {
//   return (
//     <div className="card-grid">
//       <div className="card" role="group" aria-label="Card default">
//         <div className="card-header">Default Card</div>
//         <p>Basic surface card using surface token.</p>
//       </div>
//       <div
//         className="card card-elevated"
//         role="group"
//         aria-label="Elevated card"
//       >
//         <div className="card-header">Elevated Card</div>
//         <p>Elevated variant uses shadow md.</p>
//       </div>
//       <div className="card card-outline" role="group" aria-label="Outline card">
//         <div className="card-header">Outline Card</div>
//         <p>Outline variant with background alt.</p>
//       </div>
//     </div>
//   );
// }

// function SkeletonDemo() {
//   return (
//     <div className="skeleton-demo" aria-label="Skeleton examples">
//       <div className="skeleton skeleton-text" />
//       <div className="skeleton skeleton-text short" />
//       <div className="skeleton skeleton-block" />
//     </div>
//   );
// }

// export default function DesignSystemPage() {
//   useEffect(() => {
//     document.title = "Design System Showcase - Reads";
//   }, []);

//   return (
//     <DesignSystemStyles>
//       <main className="ds-container" id="main">
//         <div className="ds-header">
//           <div className="ds-hero">
//             <h1 className="ds-title">Reads Design System</h1>
//             <p className="ds-subtitle">
//               A comprehensive component library built for consistency,
//               accessibility, and developer experience.
//             </p>
//             <div className="ds-stats">
//               <div className="stat">
//                 <span className="stat-number">12+</span>
//                 <span className="stat-label">Components</span>
//               </div>
//               <div className="stat">
//                 <span className="stat-number">50+</span>
//                 <span className="stat-label">Design Tokens</span>
//               </div>
//               <div className="stat">
//                 <span className="stat-number">WCAG AA</span>
//                 <span className="stat-label">Accessible</span>
//               </div>
//             </div>
//           </div>
//           <nav className="ds-nav" aria-label="Design system navigation">
//             <a href="#components" className="nav-link">
//               Components
//             </a>
//             <a href="#tokens" className="nav-link">
//               Design Tokens
//             </a>
//             <a href="#guidelines" className="nav-link">
//               Guidelines
//             </a>
//             <a href="#accessibility" className="nav-link">
//               Accessibility
//             </a>
//           </nav>
//         </div>

//         <section id="components" className="ds-section">
//           <div className="section-header">
//             <h2 className="section-title">Component Library</h2>
//             <p className="section-description">
//               Production-ready components with comprehensive documentation, code
//               samples, and accessibility guidelines.
//             </p>
//           </div>

//           <div className="components-grid">
//             <div className="component-showcase">
//               <div className="component-header">
//                 <h3 className="component-title">Button</h3>
//                 <span className="component-badge">Core</span>
//               </div>
//               <p className="component-description">
//                 Primary action buttons for main user interactions like "Sign
//                 Up", "Save", "Submit".
//               </p>

//               {/* Live Demo */}
//               <div
//                 style={{
//                   display: "flex",
//                   gap: "1rem",
//                   flexWrap: "wrap",
//                   marginBottom: "1rem",
//                 }}
//               >
//                 <Button>Primary</Button>
//                 <Button variant="secondary">Secondary</Button>
//                 <Button variant="outline">Outline</Button>
//                 <Button variant="destructive">Delete</Button>
//                 <Button variant="link">Link</Button>
//                 <Button variant="ghost">Ghost</Button>
//                 <Button disabled>Disabled</Button>
//               </div>

//               <CodeBlock
//                 title="Button HTML"
//                 language="html"
//                 code={`<!-- Primary Button -->
// <button class="btn btn-primary">Primary Action</button>

// <!-- Secondary Button -->
// <button class="btn btn-secondary">Secondary Action</button>

// <!-- Disabled Button -->
// <button class="btn btn-primary" disabled>Disabled</button>

// <!-- All States -->
// <div class="button-group">
//   <button class="btn btn-primary">Primary</button>
//   <button class="btn btn-secondary">Secondary</button>
//   <button class="btn btn-outline">Outline</button>
//   <button class="btn btn-destructive">Delete</button>
//   <button class="btn btn-link">Link</button>
// </div>`}
//               />

//               <CodeBlock
//                 title="Button CSS"
//                 language="css"
//                 code={`.btn {
//   padding: var(--spacing-xs) var(--spacing-sm);
//   font-family: var(--font-family-base);
//   font-weight: var(--font-weight-bold);
//   border: none;
//   border-radius: var(--border-radius);
//   cursor: pointer;
//   transition: background 0.2s;
// }

// .btn-primary {
//   background-color: var(--color-primary);
//   color: white;
// }

// .btn-primary:hover {
//   background-color: var(--color-primary-hover);
// }

// .btn:disabled {
//   opacity: 0.6;
//   cursor: not-allowed;
// }`}
//               />
//             </div>

//             <div className="component-showcase">
//               <div className="component-header">
//                 <h3 className="component-title">Form Fields</h3>
//                 <span className="component-badge">Core</span>
//               </div>
//               <p className="component-description">
//                 Input fields for text, email, password with error states and
//                 accessibility support.
//               </p>

//               {/* Live Demo */}
//               <div
//                 style={{
//                   display: "flex",
//                   gap: "1.5rem",
//                   flexWrap: "wrap",
//                   marginBottom: "1rem",
//                 }}
//               >
//                 <Field label="Email" help="We'll never share it">
//                   <input type="email" placeholder="you@example.com" />
//                 </Field>
//                 <Field label="Password" required error="Must be 8+ characters">
//                   <input type="password" />
//                 </Field>
//               </div>

//               <CodeBlock
//                 title="Form HTML"
//                 language="html"
//                 code={`<!-- Basic Field -->
// <div class="form-field">
//   <label class="form-label" for="email">Email</label>
//   <input class="form-input" type="email" id="email" placeholder="you@example.com" />
//   <div class="form-help">We'll never share your email.</div>
// </div>

// <!-- Field with Error -->
// <div class="form-field form-field--error">
//   <label class="form-label" for="password">Password *</label>
//   <input class="form-input" type="password" id="password" aria-describedby="pwd-error" />
//   <div class="form-error" id="pwd-error">Password must be at least 8 characters.</div>
// </div>`}
//               />

//               <CodeBlock
//                 title="Form CSS"
//                 language="css"
//                 code={`.form-field {
//   display: flex;
//   flex-direction: column;
//   gap: var(--spacing-xs);
//   margin-bottom: var(--spacing-sm);
// }

// .form-label {
//   font-size: var(--font-size-sm);
//   font-weight: var(--font-weight-bold);
// }

// .form-input {
//   padding: var(--spacing-xs);
//   border: var(--border-width) solid var(--color-secondary);
//   border-radius: var(--border-radius);
//   font-size: var(--font-size-base);
// }

// .form-input:focus {
//   outline: none;
//   border-color: var(--color-primary);
// }

// .form-error {
//   color: var(--color-error);
//   font-size: var(--font-size-sm);
// }`}
//               />
//             </div>

//             <div className="component-showcase">
//               <div className="component-header">
//                 <h3 className="component-title">Card</h3>
//                 <span className="component-badge">Layout</span>
//               </div>
//               <p className="component-description">
//                 Container for grouping related content with optional elevation.
//               </p>

//               {/* Live Demo */}
//               <div
//                 style={{
//                   display: "grid",
//                   gap: "1rem",
//                   gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
//                   marginBottom: "1rem",
//                 }}
//               >
//                 <div className="card">
//                   <div className="card-header">Default Card</div>
//                   <p>Basic card with border and padding.</p>
//                 </div>
//                 <div className="card card-elevated">
//                   <div className="card-header">Elevated Card</div>
//                   <p>Card with shadow elevation.</p>
//                 </div>
//               </div>

//               <CodeBlock
//                 title="Card HTML"
//                 language="html"
//                 code={`<!-- Basic Card -->
// <div class="card">
//   <div class="card-header">Card Title</div>
//   <p>Card content goes here. Use for grouping related information.</p>
// </div>

// <!-- Elevated Card -->
// <div class="card card-elevated">
//   <div class="card-header">Elevated Card</div>
//   <p>Card with shadow for more prominence.</p>
// </div>`}
//               />

//               <CodeBlock
//                 title="Card CSS"
//                 language="css"
//                 code={`.card {
//   background: #fff;
//   border: var(--border-width) solid var(--color-secondary);
//   border-radius: var(--border-radius);
//   padding: var(--spacing-md);
//   margin-bottom: var(--spacing-md);
// }

// .card-elevated {
//   box-shadow: 0 2px 8px rgba(0,0,0,0.1);
// }

// .card-header {
//   font-weight: var(--font-weight-bold);
//   margin-bottom: var(--spacing-xs);
// }`}
//               />
//             </div>

//             <div className="component-showcase">
//               <div className="component-header">
//                 <h3 className="component-title">Navigation</h3>
//                 <span className="component-badge">Layout</span>
//               </div>
//               <p className="component-description">
//                 Navigation bar for main app sections with accessibility support.
//               </p>

//               {/* Live Demo */}
//               <nav
//                 className="demo-navbar"
//                 aria-label="Primary navigation"
//                 style={{ marginBottom: "1rem" }}
//               >
//                 <div className="nav-brand">Reads</div>
//                 <ul className="nav-links">
//                   <li>
//                     <a href="#" aria-current="page">
//                       Home
//                     </a>
//                   </li>
//                   <li>
//                     <a href="#">Library</a>
//                   </li>
//                   <li>
//                     <a href="#">Upload</a>
//                   </li>
//                 </ul>
//                 <div className="nav-actions">
//                   <button className="ds-btn ds-btn-subtle">Theme</button>
//                 </div>
//               </nav>

//               <CodeBlock
//                 title="Navigation HTML"
//                 language="html"
//                 code={`<!-- Navigation Bar -->
// <nav class="navbar" aria-label="Primary navigation">
//   <div class="nav-brand">App Name</div>
//   <ul class="nav-links">
//     <li><a class="nav-link" href="#" aria-current="page">Home</a></li>
//     <li><a class="nav-link" href="#">Library</a></li>
//     <li><a class="nav-link" href="#">Upload</a></li>
//   </ul>
//   <div class="nav-actions">
//     <button class="btn btn-secondary">Settings</button>
//   </div>
// </nav>`}
//               />

//               <CodeBlock
//                 title="Navigation CSS"
//                 language="css"
//                 code={`.navbar {
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   background: var(--color-primary);
//   color: white;
//   padding: var(--spacing-sm);
//   border-radius: var(--border-radius);
// }

// .nav-links {
//   display: flex;
//   gap: var(--spacing-sm);
//   list-style: none;
//   margin: 0;
//   padding: 0;
// }

// .nav-link {
//   color: white;
//   text-decoration: none;
//   font-weight: var(--font-weight-bold);
// }

// .nav-link:hover {
//   text-decoration: underline;
// }

// .nav-link[aria-current="page"] {
//   border-bottom: 2px solid white;
// }`}
//               />
//             </div>

//             <div className="component-showcase">
//               <div className="component-header">
//                 <h3 className="component-title">Design Tokens</h3>
//                 <span className="component-badge">Foundation</span>
//               </div>
//               <p className="component-description">
//                 Foundational design variables for consistent styling across all
//                 components.
//               </p>

//               <CodeBlock
//                 title="Design Tokens CSS"
//                 language="css"
//                 code={`:root {
//   /* Colors */
//   --color-primary: #007bff;
//   --color-primary-hover: #0056b3;
//   --color-secondary: #6c757d;
//   --color-success: #28a745;
//   --color-error: #dc3545;
//   --color-text: #212529;
//   --color-text-muted: #6c757d;

//   /* Typography */
//   --font-family-base: "Inter", sans-serif;
//   --font-size-sm: 0.875rem;
//   --font-size-base: 1rem;
//   --font-size-lg: 1.25rem;
//   --font-weight-normal: 400;
//   --font-weight-bold: 600;

//   /* Spacing */
//   --spacing-xs: 0.5rem;
//   --spacing-sm: 1rem;
//   --spacing-md: 1.5rem;
//   --spacing-lg: 2rem;

//   /* Borders */
//   --border-radius: 0.375rem;
//   --border-width: 1px;
// }`}
//               />
//             </div>
//           </div>
//         </section>

//         <section id="accessibility" className="ds-section">
//           <div className="section-header">
//             <h2 className="section-title">Accessibility Guidelines</h2>
//             <p className="section-description">
//               All components follow WCAG 2.1 AA standards for inclusive design.
//             </p>
//           </div>
//           <div className="accessibility-grid">
//             <div className="accessibility-item">
//               <div className="accessibility-icon">⌨️</div>
//               <h4>Keyboard Navigation</h4>
//               <p>
//                 All interactive elements are focusable and operable via keyboard
//               </p>
//             </div>
//             <div className="accessibility-item">
//               <div className="accessibility-icon">🔊</div>
//               <h4>Screen Reader Support</h4>
//               <p>Proper semantic HTML, ARIA labels, and role attributes</p>
//             </div>
//             <div className="accessibility-item">
//               <div className="accessibility-icon">🎨</div>
//               <h4>Color Contrast</h4>
//               <p>All text meets 4.5:1 contrast ratio minimum</p>
//             </div>
//             <div className="accessibility-item">
//               <div className="accessibility-icon">🎯</div>
//               <h4>Focus Indicators</h4>
//               <p>Clear visual focus states for all interactive elements</p>
//             </div>
//             <div className="accessibility-item">
//               <div className="accessibility-icon">⚠️</div>
//               <h4>Error Handling</h4>
//               <p>Form errors are announced and associated with inputs</p>
//             </div>
//             <div className="accessibility-item">
//               <div className="accessibility-icon">🎞️</div>
//               <h4>Reduced Motion</h4>
//               <p>Animations respect prefers-reduced-motion settings</p>
//             </div>
//           </div>
//         </section>

//         <section id="guidelines" className="ds-section">
//           <div className="section-header">
//             <h2 className="section-title">Usage Guidelines</h2>
//             <p className="section-description">
//               Best practices for implementing components and design tokens
//               consistently.
//             </p>
//           </div>
//           <div className="guidelines-grid">
//             <div className="guideline-card">
//               <h3 className="guideline-title">Component Usage</h3>
//               <div className="guideline-list">
//                 <div className="guideline-item">
//                   <strong>Primary Button:</strong> Main actions (1 per
//                   page/section)
//                 </div>
//                 <div className="guideline-item">
//                   <strong>Secondary Button:</strong> Secondary actions like
//                   "Cancel", "Back"
//                 </div>
//                 <div className="guideline-item">
//                   <strong>Form Fields:</strong> Always pair with labels and help
//                   text
//                 </div>
//                 <div className="guideline-item">
//                   <strong>Cards:</strong> Group related content, use elevation
//                   for emphasis
//                 </div>
//                 <div className="guideline-item">
//                   <strong>Navigation:</strong> Use aria-current="page" for
//                   current page
//                 </div>
//               </div>
//             </div>
//             <div className="guideline-card">
//               <h3 className="guideline-title">Design Token Usage</h3>
//               <div className="guideline-list">
//                 <div className="guideline-item">
//                   <strong>Colors:</strong> Use semantic tokens instead of hex
//                   values
//                 </div>
//                 <div className="guideline-item">
//                   <strong>Spacing:</strong> Use consistent spacing scale
//                   (0.5rem, 1rem, 1.5rem, 2rem)
//                 </div>
//                 <div className="guideline-item">
//                   <strong>Typography:</strong> Stick to defined font sizes and
//                   weights
//                 </div>
//                 <div className="guideline-item">
//                   <strong>Borders:</strong> Use consistent border radius
//                   (0.375rem)
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         <section id="tokens" className="ds-section">
//           <div className="section-header">
//             <h2 className="section-title">Design Token Reference</h2>
//             <p className="section-description">
//               Color palette and visual tokens that form the foundation of our
//               design system.
//             </p>
//           </div>
//           <div className="token-showcase">
//             <div className="swatch-grid" role="list">
//               {colorTokens.map((t) => (
//                 <Swatch key={t} token={t} />
//               ))}
//             </div>
//           </div>
//         </section>

//         <section>
//           <h2>Typography Scale</h2>
//           {fontSizes.map((f) => (
//             <FontDemo key={f} size={f} />
//           ))}
//         </section>

//         <section>
//           <h2>Spacing Scale</h2>
//           <div className="space-scale">
//             {spacings.map((s) => (
//               <SpaceRow key={s} val={s} />
//             ))}
//           </div>
//         </section>

//         <section>
//           <h2>Additional Component States</h2>
//           <div style={{ display: "grid", gap: "2rem" }}>
//             <div>
//               <h3>Button States</h3>
//               <div className="button-row">
//                 {buttons.map((b) => (
//                   <ButtonDemo key={b.variant} {...b} />
//                 ))}
//                 <button
//                   className="ds-btn ds-btn-primary"
//                   disabled
//                   aria-disabled="true"
//                 >
//                   Disabled
//                 </button>
//                 <button
//                   className="ds-btn ds-btn-primary loading"
//                   aria-busy="true"
//                 >
//                   Loading…
//                 </button>
//               </div>
//             </div>

//             <div>
//               <h3>Form Field States</h3>
//               <div className="field-grid">
//                 <FieldDemo />
//                 <FieldErrorDemo />
//               </div>
//             </div>

//             <div>
//               <h3>Card Variants</h3>
//               <CardDemo />
//             </div>

//             <div>
//               <h3>Loading States</h3>
//               <SkeletonDemo />
//             </div>
//           </div>
//         </section>

//         <footer className="ds-footer">
//           <strong>Reads Design System</strong> • Complete component library with
//           design tokens, accessibility guidelines, and usage documentation •
//           Built {new Date().getFullYear()}
//           <br />
//           <small style={{ marginTop: "0.5rem", display: "block" }}>
//             All components follow WCAG 2.1 AA standards • Consistent styling •
//             Easy to use and extend
//           </small>
//         </footer>
//       </main>
//     </DesignSystemStyles>
//   );
// }
