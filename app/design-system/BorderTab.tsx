import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CodeBlock } from "./CodeBlock";

export const BorderTab: React.FC = () => {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Border System</CardTitle>
          <CardDescription>
            Border width, style, color, and radius utilities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Consistent border tokens for creating visual boundaries and
            emphasis.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Border Width</CardTitle>
          <CardDescription>Different border thicknesses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-muted/30 border-0 border-border rounded">
              <span className="text-sm font-mono">border-0</span>
            </div>
            <div className="p-4 bg-muted/30 border border-border rounded">
              <span className="text-sm font-mono">border</span>
            </div>
            <div className="p-4 bg-muted/30 border-2 border-border rounded">
              <span className="text-sm font-mono">border-2</span>
            </div>
            <div className="p-4 bg-muted/30 border-4 border-border rounded">
              <span className="text-sm font-mono">border-4</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Border Styles</CardTitle>
          <CardDescription>Solid, dashed, and dotted borders</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-muted/30 border-2 border-solid border-border rounded">
              <span className="text-sm font-mono">border-solid</span>
            </div>
            <div className="p-4 bg-muted/30 border-2 border-dashed border-border rounded">
              <span className="text-sm font-mono">border-dashed</span>
            </div>
            <div className="p-4 bg-muted/30 border-2 border-dotted border-border rounded">
              <span className="text-sm font-mono">border-dotted</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Border Colors</CardTitle>
          <CardDescription>Semantic border colors</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-muted/30 border-2 border-border rounded">
              <span className="text-xs font-mono">border-border</span>
            </div>
            <div className="p-4 bg-muted/30 border-2 border-input rounded">
              <span className="text-xs font-mono">border-input</span>
            </div>
            <div className="p-4 bg-muted/30 border-2 border-primary rounded">
              <span className="text-xs font-mono">border-primary</span>
            </div>
            <div className="p-4 bg-muted/30 border-2 border-destructive rounded">
              <span className="text-xs font-mono">border-destructive</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Border Radius</CardTitle>
          <CardDescription>
            Rounded corners with different radius values
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-primary/10 border border-primary/30 rounded-none">
              <span className="text-xs font-mono">rounded-none</span>
            </div>
            <div className="p-4 bg-primary/10 border border-primary/30 rounded-sm">
              <span className="text-xs font-mono">rounded-sm</span>
            </div>
            <div className="p-4 bg-primary/10 border border-primary/30 rounded">
              <span className="text-xs font-mono">rounded</span>
            </div>
            <div className="p-4 bg-primary/10 border border-primary/30 rounded-md">
              <span className="text-xs font-mono">rounded-md</span>
            </div>
            <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg">
              <span className="text-xs font-mono">rounded-lg</span>
            </div>
            <div className="p-4 bg-primary/10 border border-primary/30 rounded-xl">
              <span className="text-xs font-mono">rounded-xl</span>
            </div>
            <div className="p-4 bg-primary/10 border border-primary/30 rounded-2xl">
              <span className="text-xs font-mono">rounded-2xl</span>
            </div>
            <div className="p-4 bg-primary/10 border border-primary/30 rounded-full">
              <span className="text-xs font-mono">rounded-full</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Directional Borders</CardTitle>
          <CardDescription>Apply borders to specific sides</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-muted/30 border-t-2 border-primary">
              <span className="text-xs font-mono">border-t-2</span>
            </div>
            <div className="p-4 bg-muted/30 border-r-2 border-primary">
              <span className="text-xs font-mono">border-r-2</span>
            </div>
            <div className="p-4 bg-muted/30 border-b-2 border-primary">
              <span className="text-xs font-mono">border-b-2</span>
            </div>
            <div className="p-4 bg-muted/30 border-l-2 border-primary">
              <span className="text-xs font-mono">border-l-2</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Border Radius Scale</CardTitle>
          <CardDescription>
            Complete border radius scale with pixel values
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
              <span className="font-mono">rounded-none</span>
              <span className="text-muted-foreground">0px</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
              <span className="font-mono">rounded-sm</span>
              <span className="text-muted-foreground">2px</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
              <span className="font-mono">rounded</span>
              <span className="text-muted-foreground">4px</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
              <span className="font-mono">rounded-md</span>
              <span className="text-muted-foreground">6px</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
              <span className="font-mono">rounded-lg</span>
              <span className="text-muted-foreground">8px</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
              <span className="font-mono">rounded-xl</span>
              <span className="text-muted-foreground">12px</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <CodeBlock
        title="Border Usage"
        code={`/* Border Width */
<div className="border">Default border</div>
<div className="border-2">Thick border</div>
<div className="border-0">No border</div>

/* Border Style */
<div className="border-2 border-dashed">Dashed border</div>
<div className="border-2 border-dotted">Dotted border</div>

/* Border Color */
<div className="border border-primary">Primary border</div>
<div className="border border-destructive">Destructive border</div>

/* Border Radius */
<div className="rounded-lg">Large rounded corners</div>
<div className="rounded-full">Fully rounded</div>

/* Directional */
<div className="border-t-2 border-primary">Top border only</div>`}
      />
    </div>
  );
};
