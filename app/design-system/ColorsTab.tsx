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
                style={{ backgroundColor: "hsl(142 76% 36%)" }}
              ></div>
              <div className="text-sm">
                <div className="font-medium">Success</div>
                <div className="text-muted-foreground text-xs">
                  hsl(142 76% 36%)
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div
                className="h-16 rounded-lg border shadow-sm"
                style={{ backgroundColor: "hsl(48 96% 53%)" }}
              ></div>
              <div className="text-sm">
                <div className="font-medium">Warning</div>
                <div className="text-muted-foreground text-xs">
                  hsl(48 96% 53%)
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
                style={{ backgroundColor: "hsl(221 83% 53%)" }}
              ></div>
              <div className="text-sm">
                <div className="font-medium">Info</div>
                <div className="text-muted-foreground text-xs">
                  hsl(221 83% 53%)
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
        <h3 className="text-lg font-semibold">Custom Colors</h3>
        <CodeBlock
          title="Adding Custom Colors"
          code={`// In your tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          50: 'hsl(210 100% 97%)',
          100: 'hsl(210 100% 94%)',
          500: 'hsl(210 100% 50%)',
          900: 'hsl(210 100% 15%)',
        }
      }
    }
  }
}`}
          fileName="tailwind.config.js"
        />
      </div>
    </div>
  );
};
