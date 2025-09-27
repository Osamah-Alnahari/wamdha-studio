"use client";
import React from "react";

/**
 * Client wrapper providing styled-jsx styles for the design system showcase.
 * Keeps the page itself as a Server Component (so metadata export works) while
 * avoiding the Next.js error about using styled-jsx in a server component.
 */
export const DesignSystemStyles: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <>
    {children}
    <style jsx global>{`
      .ds-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 2rem 4rem;
        display: flex;
        flex-direction: column;
        gap: 4rem;
        font-family: var(
          --ds-font-family-sans,
          -apple-system,
          BlinkMacSystemFont,
          "Segoe UI",
          Roboto,
          sans-serif
        );
        line-height: 1.6;
        color: var(--ds-color-text, #1a1a1a);
      }

      /* Header Styles */
      .ds-header {
        text-align: center;
        padding: 4rem 0 2rem;
        background: linear-gradient(
          135deg,
          var(--ds-color-bg, #ffffff) 0%,
          var(--ds-color-surface-alt, #f8fafc) 100%
        );
        border-radius: var(--ds-radius-lg, 12px);
        margin: 2rem 0;
        box-shadow: var(--ds-shadow-sm, 0 1px 3px rgba(0, 0, 0, 0.05));
      }

      .ds-hero {
        margin-bottom: 3rem;
      }

      .ds-title {
        font-size: clamp(2.5rem, 5vw, 4rem);
        font-weight: var(--ds-font-weight-bold, 700);
        margin: 0 0 1rem;
        background: linear-gradient(
          135deg,
          var(--ds-color-action-primary, #2563eb) 0%,
          var(--ds-color-accent-forest, #059669) 100%
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      .ds-subtitle {
        font-size: var(--ds-font-size-lg, 1.125rem);
        color: var(--ds-color-text-muted, #6b7280);
        max-width: 600px;
        margin: 0 auto 2rem;
        line-height: 1.7;
      }

      .ds-stats {
        display: flex;
        justify-content: center;
        gap: 3rem;
        margin-top: 2rem;
      }

      .stat {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
      }

      .stat-number {
        font-size: var(--ds-font-size-2xl, 1.5rem);
        font-weight: var(--ds-font-weight-bold, 700);
        color: var(--ds-color-action-primary, #2563eb);
      }

      .stat-label {
        font-size: var(--ds-font-size-sm, 0.875rem);
        color: var(--ds-color-text-muted, #6b7280);
        text-transform: uppercase;
        letter-spacing: 0.05em;
        font-weight: var(--ds-font-weight-medium, 500);
      }

      .ds-nav {
        display: flex;
        justify-content: center;
        gap: 2rem;
        padding: 1rem 0;
        border-top: 1px solid var(--ds-color-border, #e5e7eb);
      }

      .nav-link {
        color: var(--ds-color-text-muted, #6b7280);
        text-decoration: none;
        font-weight: var(--ds-font-weight-medium, 500);
        padding: 0.5rem 1rem;
        border-radius: var(--ds-radius-md, 6px);
        transition: all 0.2s ease;
      }

      .nav-link:hover {
        color: var(--ds-color-action-primary, #2563eb);
        background: var(--ds-color-surface, #f8fafc);
      }

      /* Section Styles */
      .ds-section {
        display: flex;
        flex-direction: column;
        gap: 2rem;
      }

      .section-header {
        text-align: center;
        margin-bottom: 2rem;
      }

      .section-title {
        font-size: var(--ds-font-size-3xl, 1.875rem);
        font-weight: var(--ds-font-weight-bold, 700);
        margin: 0 0 1rem;
        color: var(--ds-color-text, #1a1a1a);
      }

      .section-description {
        font-size: var(--ds-font-size-lg, 1.125rem);
        color: var(--ds-color-text-muted, #6b7280);
        max-width: 700px;
        margin: 0 auto;
        line-height: 1.7;
      }

      /* Component Showcase */
      .components-grid {
        display: grid;
        gap: 3rem;
      }

      .component-showcase {
        background: var(--ds-color-surface, #ffffff);
        border: 1px solid var(--ds-color-border, #e5e7eb);
        border-radius: var(--ds-radius-lg, 12px);
        padding: 2rem;
        box-shadow: var(--ds-shadow-xs, 0 1px 2px rgba(0, 0, 0, 0.05));
        transition: box-shadow 0.2s ease;
      }

      .component-showcase:hover {
        box-shadow: var(--ds-shadow-md, 0 4px 6px rgba(0, 0, 0, 0.05));
      }

      .component-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1rem;
      }

      .component-title {
        font-size: var(--ds-font-size-xl, 1.25rem);
        font-weight: var(--ds-font-weight-semibold, 600);
        margin: 0;
        color: var(--ds-color-text, #1a1a1a);
      }

      .component-badge {
        background: var(--ds-color-action-primary, #2563eb);
        color: white;
        font-size: var(--ds-font-size-xs, 0.75rem);
        font-weight: var(--ds-font-weight-medium, 500);
        padding: 0.25rem 0.75rem;
        border-radius: var(--ds-radius-full, 9999px);
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }

      .component-description {
        color: var(--ds-color-text-muted, #6b7280);
        margin: 0 0 1.5rem;
        line-height: 1.6;
      }

      h1,
      h2,
      h3 {
        color: var(--ds-color-text, #1a1a1a);
      }

      section {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      /* Swatches */
      .swatch-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
        gap: 1rem;
      }
      .swatch {
        border: 1px solid var(--ds-color-border);
        border-radius: var(--ds-radius-md);
        padding: 0.75rem;
        background: var(--ds-color-surface);
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
      .swatch-color {
        height: 56px;
        border-radius: var(--ds-radius-sm);
        box-shadow: var(--ds-shadow-xs);
        border: 1px solid var(--ds-color-border);
      }
      .token-name {
        font-size: var(--ds-font-size-xs);
        word-break: break-all;
      }
      /* Typography demo */
      .font-demo {
        padding: 0.5rem 0;
        border-bottom: 1px dashed var(--ds-color-border);
      }
      /* Spacing */
      .space-scale {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
      .space-row {
        display: flex;
        align-items: center;
        gap: 1rem;
      }
      .space-bar {
        height: 8px;
        background: var(--ds-color-action-primary);
        border-radius: 4px;
      }
      /* Buttons */
      .button-row {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        align-items: center;
      }
      .ds-btn {
        font-family: var(--ds-font-family-sans);
        font-weight: var(--ds-font-weight-medium);
        border: none;
        cursor: pointer;
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        border-radius: var(--ds-radius-md);
        line-height: 1.2;
        background: var(--ds-color-surface-alt);
        color: var(--ds-color-text);
        transition: background var(--ds-motion-duration-fast)
            var(--ds-motion-ease-standard),
          box-shadow var(--ds-motion-duration-fast)
            var(--ds-motion-ease-standard);
      }
      .ds-btn-primary {
        background: var(--ds-color-action-primary);
        color: var(--ds-color-action-primary-fg);
      }
      .ds-btn-primary:hover {
        background: hsl(var(--primary) / 0.9);
      }
      .ds-btn-secondary {
        background: var(--ds-color-action-secondary);
      }
      .ds-btn-subtle {
        background: var(--ds-color-surface);
        border: 1px solid var(--ds-color-border);
      }
      .ds-btn-destructive {
        background: var(--ds-color-error);
        color: #fff;
      }
      .ds-btn-link {
        background: none;
        padding: 0;
        color: var(--ds-color-action-primary);
      }
      .ds-btn-link:hover {
        text-decoration: underline;
      }
      .ds-btn:focus-visible {
        outline: none;
        box-shadow: var(--ds-shadow-focus);
      }
      .ds-btn[disabled],
      .ds-btn[aria-busy="true"] {
        opacity: 0.55;
        cursor: not-allowed;
      }
      .ds-btn.loading::after {
        content: "";
        width: 1em;
        height: 1em;
        border-radius: 50%;
        border: 2px solid currentColor;
        border-top-color: transparent;
        animation: spin 0.8s linear infinite;
      }
      .ds-btn.loading {
        gap: 0.75rem;
      }
      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
      /* Fields */
      .field {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        max-width: 260px;
      }
      .field-label {
        font-size: var(--ds-font-size-sm);
        font-weight: var(--ds-font-weight-medium);
      }
      .field-input {
        padding: 0.5rem 0.75rem;
        border: 1px solid var(--ds-color-border);
        border-radius: var(--ds-radius-md);
        background: var(--ds-color-surface);
        font: inherit;
      }
      .field-input:focus {
        outline: none;
        border-color: var(--ds-color-action-primary);
        box-shadow: 0 0 0 2px hsl(var(--primary) / 0.25);
      }
      .field-help {
        font-size: var(--ds-font-size-xs);
        color: var(--ds-color-text-muted);
      }
      .field-error {
        font-size: var(--ds-font-size-xs);
        color: var(--ds-color-error);
      }
      .field--error .field-input {
        border-color: var(--ds-color-error);
      }
      .field-grid {
        display: flex;
        gap: 2rem;
        flex-wrap: wrap;
      }
      /* Cards */
      .card-grid {
        display: grid;
        gap: 1.5rem;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      }
      .card {
        background: var(--ds-color-surface);
        border: 1px solid var(--ds-color-border);
        border-radius: var(--ds-radius-lg);
        padding: 1.25rem;
        box-shadow: var(--ds-shadow-xs);
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
      .card-elevated {
        box-shadow: var(--ds-shadow-md);
      }
      .card-outline {
        background: var(--ds-color-surface-alt);
      }
      .card-header {
        font-weight: var(--ds-font-weight-semibold);
      }
      /* Skeleton */
      .skeleton-demo {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        max-width: 300px;
      }
      .skeleton {
        position: relative;
        overflow: hidden;
        background: hsl(var(--muted) / 0.5);
        border-radius: 4px;
      }
      .skeleton::after {
        content: "";
        position: absolute;
        inset: 0;
        background: linear-gradient(
          90deg,
          transparent,
          rgba(255, 255, 255, 0.25),
          transparent
        );
        animation: shimmer 1.4s infinite;
      }
      .skeleton-text {
        height: 14px;
      }
      .skeleton-text.short {
        width: 60%;
      }
      .skeleton-block {
        height: 80px;
      }
      @media (prefers-reduced-motion: reduce) {
        .skeleton::after {
          animation: none;
        }
      }
      @keyframes shimmer {
        0% {
          transform: translateX(-100%);
        }
        100% {
          transform: translateX(100%);
        }
      }
      /* Navbar demo */
      .demo-navbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.75rem 1rem;
        border: 1px solid var(--ds-color-border);
        border-radius: var(--ds-radius-lg);
        background: var(--ds-color-surface);
      }
      .nav-links {
        list-style: none;
        display: flex;
        gap: 1.25rem;
        padding: 0;
        margin: 0;
      }
      .nav-links a {
        text-decoration: none;
        color: var(--ds-color-text);
        font-size: var(--ds-font-size-sm);
      }
      .nav-links a[aria-current="page"] {
        font-weight: var(--ds-font-weight-semibold);
        position: relative;
      }
      .nav-links a[aria-current="page"]::after {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        bottom: -4px;
        height: 2px;
        background: var(--ds-color-action-primary);
        border-radius: 1px;
      }
      /* Accessibility Grid */
      .accessibility-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        margin-top: 2rem;
      }

      .accessibility-item {
        background: var(--ds-color-surface, #ffffff);
        border: 1px solid var(--ds-color-border, #e5e7eb);
        border-radius: var(--ds-radius-lg, 12px);
        padding: 2rem;
        text-align: center;
        transition: transform 0.2s ease;
      }

      .accessibility-item:hover {
        transform: translateY(-2px);
        box-shadow: var(--ds-shadow-md, 0 4px 6px rgba(0, 0, 0, 0.05));
      }

      .accessibility-icon {
        font-size: 2.5rem;
        margin-bottom: 1rem;
      }

      .accessibility-item h4 {
        font-size: var(--ds-font-size-lg, 1.125rem);
        font-weight: var(--ds-font-weight-semibold, 600);
        margin: 0 0 0.5rem;
        color: var(--ds-color-text, #1a1a1a);
      }

      .accessibility-item p {
        color: var(--ds-color-text-muted, #6b7280);
        margin: 0;
        line-height: 1.6;
      }

      /* Guidelines Grid */
      .guidelines-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
        gap: 2rem;
        margin-top: 2rem;
      }

      .guideline-card {
        background: var(--ds-color-surface, #ffffff);
        border: 1px solid var(--ds-color-border, #e5e7eb);
        border-radius: var(--ds-radius-lg, 12px);
        padding: 2rem;
        box-shadow: var(--ds-shadow-xs, 0 1px 2px rgba(0, 0, 0, 0.05));
      }

      .guideline-title {
        font-size: var(--ds-font-size-xl, 1.25rem);
        font-weight: var(--ds-font-weight-semibold, 600);
        margin: 0 0 1.5rem;
        color: var(--ds-color-text, #1a1a1a);
      }

      .guideline-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .guideline-item {
        padding: 1rem;
        background: var(--ds-color-surface-alt, #f8fafc);
        border-radius: var(--ds-radius-md, 6px);
        border-left: 3px solid var(--ds-color-action-primary, #2563eb);
        line-height: 1.6;
      }

      /* Token Showcase */
      .token-showcase {
        margin-top: 2rem;
      }

      /* Responsive Design */
      @media (max-width: 768px) {
        .ds-container {
          padding: 0 1rem 2rem;
          gap: 2rem;
        }

        .ds-header {
          padding: 2rem 1rem;
        }

        .ds-stats {
          gap: 1.5rem;
        }

        .ds-nav {
          gap: 1rem;
          flex-wrap: wrap;
        }

        .components-grid {
          gap: 2rem;
        }

        .component-showcase {
          padding: 1.5rem;
        }

        .accessibility-grid,
        .guidelines-grid {
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }
      }

      @media (max-width: 480px) {
        .ds-title {
          font-size: 2rem;
        }

        .ds-stats {
          flex-direction: column;
          gap: 1rem;
        }

        .component-header {
          flex-direction: column;
          align-items: flex-start;
          gap: 0.5rem;
        }
      }

      /* Footer */
      .ds-footer {
        margin-top: 4rem;
        padding: 3rem 2rem 2rem;
        text-align: center;
        background: var(--ds-color-surface-alt, #f8fafc);
        border-radius: var(--ds-radius-lg, 12px);
        border: 1px solid var(--ds-color-border, #e5e7eb);
      }

      .ds-footer strong {
        color: var(--ds-color-text, #1a1a1a);
        font-size: var(--ds-font-size-lg, 1.125rem);
        font-weight: var(--ds-font-weight-semibold, 600);
      }

      .ds-footer small {
        color: var(--ds-color-text-muted, #6b7280);
        font-size: var(--ds-font-size-sm, 0.875rem);
      }
      /* Field extracted component overrides */
      .ds-field {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
      }
      .ds-field__label {
        font-size: var(--ds-font-size-sm);
        font-weight: var(--ds-font-weight-medium);
      }
      .ds-field__help {
        font-size: var(--ds-font-size-xs);
        color: var(--ds-color-text-muted);
      }
      .ds-field__error {
        font-size: var(--ds-font-size-xs);
        color: var(--ds-color-error);
      }
      .ds-field--error .field-input {
        border-color: var(--ds-color-error);
      }
      /* Code blocks */
      .ds-codeblock {
        border: 1px solid var(--ds-color-border);
        border-radius: var(--ds-radius-lg);
        background: var(--ds-color-surface);
        overflow: hidden;
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, "Roboto Mono",
          monospace;
      }
      .ds-codeblock-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.5rem 0.75rem;
        gap: 1rem;
        background: var(--ds-color-surface-alt);
        border-bottom: 1px solid var(--ds-color-border);
      }
      .ds-codeblock-meta {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        font-size: var(--ds-font-size-xs);
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: var(--ds-color-text-muted);
      }
      .ds-codeblock-title {
        font-weight: var(--ds-font-weight-semibold);
        color: var(--ds-color-text);
      }
      .ds-codeblock-actions {
        display: flex;
        gap: 0.5rem;
      }
      .ds-codeblock pre {
        margin: 0;
        padding: 1rem 1rem 1.25rem;
        font-size: var(--ds-font-size-xs);
        line-height: 1.4;
        overflow-x: auto;
      }
      .ds-codeblock code {
        font-family: inherit;
      }
      .ds-codeblock-btn {
        font-size: var(--ds-font-size-xs);
        padding: 0.35rem 0.6rem;
      }
      .ds-codeblock[data-open="false"] pre {
        display: none;
      }
      .ds-codeblock:focus-within {
        outline: none;
        box-shadow: var(--ds-shadow-focus);
      }
    `}</style>
  </>
);
