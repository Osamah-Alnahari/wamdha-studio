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
      <Card>
        <CardHeader>
          <CardTitle>Color Palette</CardTitle>
          <CardDescription>
            Semantic color tokens with dark mode support
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Core Semantic Colors */}
          <div>
            <h4 className="font-semibold mb-4">Core Semantic Colors</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <div className="h-16 bg-primary rounded-lg border"></div>
                <div className="text-sm">
                  <div className="font-medium">Primary</div>
                  <div className="text-muted-foreground">
                    hsl(var(--primary))
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-16 bg-secondary rounded-lg border"></div>
                <div className="text-sm">
                  <div className="font-medium">Secondary</div>
                  <div className="text-muted-foreground">
                    hsl(var(--secondary))
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-16 bg-accent rounded-lg border"></div>
                <div className="text-sm">
                  <div className="font-medium">Accent</div>
                  <div className="text-muted-foreground">
                    hsl(var(--accent))
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-16 bg-destructive rounded-lg border"></div>
                <div className="text-sm">
                  <div className="font-medium">Destructive</div>
                  <div className="text-muted-foreground">
                    hsl(var(--destructive))
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* State Colors */}
          <div>
            <h4 className="font-semibold mb-4">State Colors</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <div className="h-16 bg-green-600 rounded-lg border"></div>
                <div className="text-sm">
                  <div className="font-medium">Success</div>
                  <div className="text-muted-foreground">hsl(142 55% 45%)</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-16 bg-amber-500 rounded-lg border"></div>
                <div className="text-sm">
                  <div className="font-medium">Warning</div>
                  <div className="text-muted-foreground">hsl(38 92% 50%)</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-16 bg-destructive rounded-lg border"></div>
                <div className="text-sm">
                  <div className="font-medium">Error</div>
                  <div className="text-muted-foreground">
                    hsl(var(--destructive))
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-16 bg-blue-600 rounded-lg border"></div>
                <div className="text-sm">
                  <div className="font-medium">Info</div>
                  <div className="text-muted-foreground">hsl(200 90% 45%)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Brand Scale Colors */}
          <div>
            <h4 className="font-semibold mb-4">Brand Color Scale</h4>
            <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
              <div className="space-y-2">
                <div className="h-12 bg-blue-50 rounded border"></div>
                <div className="text-xs text-center">
                  <div className="font-medium">50</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-12 bg-blue-100 rounded border"></div>
                <div className="text-xs text-center">
                  <div className="font-medium">100</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-12 bg-blue-200 rounded border"></div>
                <div className="text-xs text-center">
                  <div className="font-medium">200</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-12 bg-blue-300 rounded border"></div>
                <div className="text-xs text-center">
                  <div className="font-medium">300</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-12 bg-blue-400 rounded border"></div>
                <div className="text-xs text-center">
                  <div className="font-medium">400</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-12 bg-blue-500 rounded border"></div>
                <div className="text-xs text-center">
                  <div className="font-medium">500</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-12 bg-blue-600 rounded border"></div>
                <div className="text-xs text-center">
                  <div className="font-medium">600</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-12 bg-blue-700 rounded border"></div>
                <div className="text-xs text-center">
                  <div className="font-medium">700</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-12 bg-blue-800 rounded border"></div>
                <div className="text-xs text-center">
                  <div className="font-medium">800</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-12 bg-blue-900 rounded border"></div>
                <div className="text-xs text-center">
                  <div className="font-medium">900</div>
                </div>
              </div>
            </div>
          </div>

          {/* Book-Inspired Palette */}
          <div>
            <h4 className="font-semibold mb-4">Book-Inspired Palette</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <div
                  className="h-16 rounded-lg border"
                  style={{ backgroundColor: "#FBF8F1" }}
                ></div>
                <div className="text-sm">
                  <div className="font-medium">Paper</div>
                  <div className="text-muted-foreground">#FBF8F1</div>
                </div>
              </div>
              <div className="space-y-2">
                <div
                  className="h-16 rounded-lg border"
                  style={{ backgroundColor: "#2D2A26" }}
                ></div>
                <div className="text-sm">
                  <div className="font-medium text-white">Ink</div>
                  <div className="text-muted-foreground">#2D2A26</div>
                </div>
              </div>
              <div className="space-y-2">
                <div
                  className="h-16 rounded-lg border"
                  style={{ backgroundColor: "#29524A" }}
                ></div>
                <div className="text-sm">
                  <div className="font-medium text-white">Forest</div>
                  <div className="text-muted-foreground">#29524A</div>
                </div>
              </div>
              <div className="space-y-2">
                <div
                  className="h-16 rounded-lg border"
                  style={{ backgroundColor: "#8B5E34" }}
                ></div>
                <div className="text-sm">
                  <div className="font-medium text-white">Leather</div>
                  <div className="text-muted-foreground">#8B5E34</div>
                </div>
              </div>
              <div className="space-y-2">
                <div
                  className="h-16 rounded-lg border"
                  style={{ backgroundColor: "#C89D7C" }}
                ></div>
                <div className="text-sm">
                  <div className="font-medium">Gold</div>
                  <div className="text-muted-foreground">#C89D7C</div>
                </div>
              </div>
              <div className="space-y-2">
                <div
                  className="h-16 rounded-lg border"
                  style={{ backgroundColor: "#F5EFE6" }}
                ></div>
                <div className="text-sm">
                  <div className="font-medium">Paper Alt</div>
                  <div className="text-muted-foreground">#F5EFE6</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <CodeBlock
        title="Using Color Tokens"
        code={`// Core semantic colors
<div className="bg-primary text-primary-foreground">Primary action</div>
<div className="bg-secondary text-secondary-foreground">Secondary action</div>
<div className="bg-accent text-accent-foreground">Accent element</div>
<div className="bg-destructive text-destructive-foreground">Error state</div>

// State colors
<div className="bg-green-600 text-white">Success message</div>
<div className="bg-amber-500 text-white">Warning alert</div>
<div className="bg-blue-600 text-white">Info notification</div>

// Brand scale (Tailwind classes)
<div className="bg-blue-50">Very light</div>
<div className="bg-blue-500">Primary brand</div>
<div className="bg-blue-900">Very dark</div>

// Book-inspired palette (custom CSS)
.paper-bg { background-color: #FBF8F1; }
.ink-text { color: #2D2A26; }
.forest-accent { background-color: #29524A; }
.leather-border { border-color: #8B5E34; }
.gold-highlight { background-color: #C89D7C; }

// CSS custom properties
.semantic-element {
  background: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
  border: 1px solid hsl(var(--border));
}`}
      />
    </div>
  );
};
