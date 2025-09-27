import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CodeBlock } from "./CodeBlock";

export const ColorsTab: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-2">Colors</h2>
        <p className="text-muted-foreground mb-8">
          Semantic color tokens with dark mode support and accessibility-first
          design.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Semantic Colors</CardTitle>
          <CardDescription>
            Core color tokens that adapt to light and dark themes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="h-16 bg-primary rounded-lg border shadow-sm"></div>
              <div className="text-sm">
                <div className="font-medium">Primary</div>
                <div className="text-muted-foreground text-xs">
                  hsl(var(--primary))
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-16 bg-secondary rounded-lg border shadow-sm"></div>
              <div className="text-sm">
                <div className="font-medium">Secondary</div>
                <div className="text-muted-foreground text-xs">
                  hsl(var(--secondary))
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-16 bg-accent rounded-lg border shadow-sm"></div>
              <div className="text-sm">
                <div className="font-medium">Accent</div>
                <div className="text-muted-foreground text-xs">
                  hsl(var(--accent))
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-16 bg-muted rounded-lg border shadow-sm"></div>
              <div className="text-sm">
                <div className="font-medium">Muted</div>
                <div className="text-muted-foreground text-xs">
                  hsl(var(--muted))
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>State Colors</CardTitle>
          <CardDescription>
            Colors for different UI states and feedback
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div
                className="h-16 rounded-lg border shadow-sm"
                style={{ backgroundColor: "hsl(95 35% 58%)" }}
              ></div>
              <div className="text-sm">
                <div className="font-medium">Success</div>
                <div className="text-muted-foreground text-xs">
                  hsl(95 35% 58%)
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div
                className="h-16 rounded-lg border shadow-sm"
                style={{ backgroundColor: "hsl(30 45% 65%)" }}
              ></div>
              <div className="text-sm">
                <div className="font-medium">Warning</div>
                <div className="text-muted-foreground text-xs">
                  hsl(30 45% 65%)
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-16 bg-destructive rounded-lg border shadow-sm"></div>
              <div className="text-sm">
                <div className="font-medium">Destructive</div>
                <div className="text-muted-foreground text-xs">
                  hsl(var(--destructive))
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div
                className="h-16 rounded-lg border shadow-sm"
                style={{ backgroundColor: "hsl(215 40% 68%)" }}
              ></div>
              <div className="text-sm">
                <div className="font-medium">Info</div>
                <div className="text-muted-foreground text-xs">
                  hsl(215 40% 68%)
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Text Colors</CardTitle>
          <CardDescription>
            Typography color tokens for different text hierarchy
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg border bg-card">
                <div className="text-foreground text-lg font-medium mb-1">
                  Foreground
                </div>
                <div className="text-xs text-muted-foreground">
                  hsl(var(--foreground))
                </div>
              </div>
              <div className="p-4 rounded-lg border bg-card">
                <div className="text-muted-foreground text-lg font-medium mb-1">
                  Muted Foreground
                </div>
                <div className="text-xs text-muted-foreground">
                  hsl(var(--muted-foreground))
                </div>
              </div>
              <div className="p-4 rounded-lg border bg-card">
                <div className="text-primary text-lg font-medium mb-1">
                  Primary Text
                </div>
                <div className="text-xs text-muted-foreground">
                  hsl(var(--primary))
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Border & Background</CardTitle>
          <CardDescription>Surface and border color tokens</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="h-16 bg-background border-2 border-border rounded-lg shadow-sm"></div>
              <div className="text-sm">
                <div className="font-medium">Background</div>
                <div className="text-muted-foreground text-xs">
                  hsl(var(--background))
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-16 bg-card border-2 border-border rounded-lg shadow-sm"></div>
              <div className="text-sm">
                <div className="font-medium">Card</div>
                <div className="text-muted-foreground text-xs">
                  hsl(var(--card))
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-16 bg-popover border-2 border-border rounded-lg shadow-sm"></div>
              <div className="text-sm">
                <div className="font-medium">Popover</div>
                <div className="text-muted-foreground text-xs">
                  hsl(var(--popover))
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-16 bg-muted border-4 border-border rounded-lg shadow-sm"></div>
              <div className="text-sm">
                <div className="font-medium">Border</div>
                <div className="text-muted-foreground text-xs">
                  hsl(var(--border))
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Brand Scale</CardTitle>
          <CardDescription>
            10-step brand color scale for comprehensive theming
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
            <div className="space-y-2">
              <div
                className="h-12 rounded-lg border shadow-sm"
                style={{ backgroundColor: "hsl(210 60% 98%)" }}
              ></div>
              <div className="text-xs text-center">
                <div className="font-medium">50</div>
              </div>
            </div>
            <div className="space-y-2">
              <div
                className="h-12 rounded-lg border shadow-sm"
                style={{ backgroundColor: "hsl(210 50% 95%)" }}
              ></div>
              <div className="text-xs text-center">
                <div className="font-medium">100</div>
              </div>
            </div>
            <div className="space-y-2">
              <div
                className="h-12 rounded-lg border shadow-sm"
                style={{ backgroundColor: "hsl(210 45% 90%)" }}
              ></div>
              <div className="text-xs text-center">
                <div className="font-medium">200</div>
              </div>
            </div>
            <div className="space-y-2">
              <div
                className="h-12 rounded-lg border shadow-sm"
                style={{ backgroundColor: "hsl(210 40% 82%)" }}
              ></div>
              <div className="text-xs text-center">
                <div className="font-medium">300</div>
              </div>
            </div>
            <div className="space-y-2">
              <div
                className="h-12 rounded-lg border shadow-sm"
                style={{ backgroundColor: "hsl(210 35% 72%)" }}
              ></div>
              <div className="text-xs text-center">
                <div className="font-medium">400</div>
              </div>
            </div>
            <div className="space-y-2">
              <div
                className="h-12 rounded-lg border shadow-sm"
                style={{ backgroundColor: "hsl(210 30% 62%)" }}
              ></div>
              <div className="text-xs text-center">
                <div className="font-medium">500</div>
              </div>
            </div>
            <div className="space-y-2">
              <div
                className="h-12 rounded-lg border shadow-sm"
                style={{ backgroundColor: "hsl(210 55% 45%)" }}
              ></div>
              <div className="text-xs text-center">
                <div className="font-medium text-white">600</div>
              </div>
            </div>
            <div className="space-y-2">
              <div
                className="h-12 rounded-lg border shadow-sm"
                style={{ backgroundColor: "hsl(210 53% 35%)" }}
              ></div>
              <div className="text-xs text-center">
                <div className="font-medium text-white">700</div>
              </div>
            </div>
            <div className="space-y-2">
              <div
                className="h-12 rounded-lg border shadow-sm"
                style={{ backgroundColor: "hsl(210 52% 25%)" }}
              ></div>
              <div className="text-xs text-center">
                <div className="font-medium text-white">800</div>
              </div>
            </div>
            <div className="space-y-2">
              <div
                className="h-12 rounded-lg border shadow-sm"
                style={{ backgroundColor: "hsl(210 55% 20%)" }}
              ></div>
              <div className="text-xs text-center">
                <div className="font-medium text-white">900</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Book-Inspired Palette</CardTitle>
          <CardDescription>
            Reading-focused colors with light and dark theme variants
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-medium mb-3">Light Theme</h4>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="space-y-2">
                <div
                  className="h-16 rounded-lg border shadow-sm"
                  style={{ backgroundColor: "#fefefe" }}
                ></div>
                <div className="text-sm">
                  <div className="font-medium">Paper</div>
                  <div className="text-muted-foreground text-xs">#fefefe</div>
                </div>
              </div>
              <div className="space-y-2">
                <div
                  className="h-16 rounded-lg border shadow-sm"
                  style={{ backgroundColor: "#1a1a1a" }}
                ></div>
                <div className="text-sm">
                  <div className="font-medium text-white">Ink</div>
                  <div className="text-muted-foreground text-xs">#1a1a1a</div>
                </div>
              </div>
              <div className="space-y-2">
                <div
                  className="h-16 rounded-lg border shadow-sm"
                  style={{ backgroundColor: "#8B4B3C" }}
                ></div>
                <div className="text-sm">
                  <div className="font-medium text-white">Burgundy</div>
                  <div className="text-muted-foreground text-xs">#8B4B3C</div>
                </div>
              </div>
              <div className="space-y-2">
                <div
                  className="h-16 rounded-lg border shadow-sm"
                  style={{ backgroundColor: "#8B4513" }}
                ></div>
                <div className="text-sm">
                  <div className="font-medium text-white">Leather</div>
                  <div className="text-muted-foreground text-xs">#8B4513</div>
                </div>
              </div>
              <div className="space-y-2">
                <div
                  className="h-16 rounded-lg border shadow-sm"
                  style={{ backgroundColor: "#D4B896" }}
                ></div>
                <div className="text-sm">
                  <div className="font-medium">Parchment</div>
                  <div className="text-muted-foreground text-xs">#D4B896</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-3">Dark Theme</h4>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="space-y-2">
                <div
                  className="h-16 rounded-lg border shadow-sm"
                  style={{ backgroundColor: "#0f0f0f" }}
                ></div>
                <div className="text-sm">
                  <div className="font-medium text-white">Paper Dark</div>
                  <div className="text-muted-foreground text-xs">#0f0f0f</div>
                </div>
              </div>
              <div className="space-y-2">
                <div
                  className="h-16 rounded-lg border shadow-sm"
                  style={{ backgroundColor: "#f5f5f5" }}
                ></div>
                <div className="text-sm">
                  <div className="font-medium">Ink Light</div>
                  <div className="text-muted-foreground text-xs">#f5f5f5</div>
                </div>
              </div>
              <div className="space-y-2">
                <div
                  className="h-16 rounded-lg border shadow-sm"
                  style={{ backgroundColor: "#6B342E" }}
                ></div>
                <div className="text-sm">
                  <div className="font-medium text-white">Burgundy Dark</div>
                  <div className="text-muted-foreground text-xs">#6B342E</div>
                </div>
              </div>
              <div className="space-y-2">
                <div
                  className="h-16 rounded-lg border shadow-sm"
                  style={{ backgroundColor: "#654321" }}
                ></div>
                <div className="text-sm">
                  <div className="font-medium text-white">Leather Dark</div>
                  <div className="text-muted-foreground text-xs">#654321</div>
                </div>
              </div>
              <div className="space-y-2">
                <div
                  className="h-16 rounded-lg border shadow-sm"
                  style={{ backgroundColor: "#B8A082" }}
                ></div>
                <div className="text-sm">
                  <div className="font-medium">Parchment Dark</div>
                  <div className="text-muted-foreground text-xs">#B8A082</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">CSS Variables</h3>
        <CodeBlock
          title="Using Color Tokens"
          code={`/* In your CSS */
.my-element {
  background-color: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
  border-color: hsl(var(--border));
}

/* With Tailwind CSS */
<div className="bg-primary text-primary-foreground border-border">
  Primary colored element
</div>`}
          fileName="colors.css"
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Book Palette Implementation</h3>
        <CodeBlock
          title="Book-Inspired Colors Configuration"
          code={`// In your tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        book: {
          // Light theme
          paper: '#fefefe',
          ink: '#1a1a1a',
          forest: '#22c55e',
          leather: '#8b4513',
          gold: '#ffd700',
          // Dark theme
          'paper-dark': '#0f0f0f',
          'ink-light': '#f5f5f5',
          'forest-dark': '#16a34a',
          'leather-dark': '#654321',
          'gold-dark': '#b8860b',
        },
        brand: {
          50: 'hsl(220 14.3% 95.9%)',
          100: 'hsl(220 13% 91%)',
          200: 'hsl(216 12.2% 83.9%)',
          300: 'hsl(218 10.6% 65%)',
          400: 'hsl(220 8.9% 46.1%)',
          500: 'hsl(220.9 39.3% 11%)',
          600: 'hsl(221.2 83.2% 53.3%)',
          700: 'hsl(224 71.4% 4.1%)',
          800: 'hsl(222.2 84% 4.9%)',
          900: 'hsl(221.2 83.2% 53.3%)',
        }
      }
    }
  }
}`}
          fileName="tailwind.config.js"
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Usage Examples</h3>
        <CodeBlock
          title="Using Book Palette Colors"
          code={`/* CSS Variables for Theme Switching */
:root {
  --book-paper: #fefefe;
  --book-ink: #1a1a1a;
  --book-forest: #22c55e;
}

[data-theme="dark"] {
  --book-paper: #0f0f0f;
  --book-ink: #f5f5f5;
  --book-forest: #16a34a;
}

/* Tailwind Classes */
<div className="bg-book-paper text-book-ink border-book-forest">
  Reading interface with book-inspired colors
</div>

/* Reading-focused components */
<article className="bg-book-paper-dark text-book-ink-light">
  Dark mode reading experience
</article>`}
          fileName="book-colors.css"
        />
      </div>
    </div>
  );
};
