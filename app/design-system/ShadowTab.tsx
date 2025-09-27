import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CodeBlock } from "./CodeBlock";

export const ShadowTab: React.FC = () => {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Shadow System</CardTitle>
          <CardDescription>Elevation and depth through shadows</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Create visual hierarchy and depth with consistent shadow tokens.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Drop Shadows</CardTitle>
          <CardDescription>
            Different shadow intensities for elevation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 p-6">
            <div className="p-6 bg-background border rounded-lg shadow-sm">
              <div className="text-sm font-mono mb-2">shadow-sm</div>
              <div className="text-xs text-muted-foreground">Subtle shadow</div>
            </div>
            <div className="p-6 bg-background border rounded-lg shadow">
              <div className="text-sm font-mono mb-2">shadow</div>
              <div className="text-xs text-muted-foreground">
                Default shadow
              </div>
            </div>
            <div className="p-6 bg-background border rounded-lg shadow-md">
              <div className="text-sm font-mono mb-2">shadow-md</div>
              <div className="text-xs text-muted-foreground">Medium shadow</div>
            </div>
            <div className="p-6 bg-background border rounded-lg shadow-lg">
              <div className="text-sm font-mono mb-2">shadow-lg</div>
              <div className="text-xs text-muted-foreground">Large shadow</div>
            </div>
            <div className="p-6 bg-background border rounded-lg shadow-xl">
              <div className="text-sm font-mono mb-2">shadow-xl</div>
              <div className="text-xs text-muted-foreground">Extra large</div>
            </div>
            <div className="p-6 bg-background border rounded-lg shadow-2xl">
              <div className="text-sm font-mono mb-2">shadow-2xl</div>
              <div className="text-xs text-muted-foreground">
                Maximum shadow
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Inner Shadows</CardTitle>
          <CardDescription>
            Inset shadows for pressed or recessed elements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 p-6">
            <div className="p-6 bg-muted/50 border rounded-lg shadow-inner">
              <div className="text-sm font-mono mb-2">shadow-inner</div>
              <div className="text-xs text-muted-foreground">Inset shadow</div>
            </div>
            <div className="p-6 bg-background border rounded-lg shadow-none">
              <div className="text-sm font-mono mb-2">shadow-none</div>
              <div className="text-xs text-muted-foreground">No shadow</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Colored Shadows</CardTitle>
          <CardDescription>
            Shadows with custom colors for special effects
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 p-6">
            <div
              className="p-6 bg-background border rounded-lg"
              style={{
                boxShadow:
                  "0 10px 15px -3px rgba(59, 130, 246, 0.3), 0 4px 6px -2px rgba(59, 130, 246, 0.1)",
              }}
            >
              <div className="text-sm font-mono mb-2">blue shadow</div>
              <div className="text-xs text-muted-foreground">Custom blue</div>
            </div>
            <div
              className="p-6 bg-background border rounded-lg"
              style={{
                boxShadow:
                  "0 10px 15px -3px rgba(239, 68, 68, 0.3), 0 4px 6px -2px rgba(239, 68, 68, 0.1)",
              }}
            >
              <div className="text-sm font-mono mb-2">red shadow</div>
              <div className="text-xs text-muted-foreground">Custom red</div>
            </div>
            <div
              className="p-6 bg-background border rounded-lg"
              style={{
                boxShadow:
                  "0 10px 15px -3px rgba(34, 197, 94, 0.3), 0 4px 6px -2px rgba(34, 197, 94, 0.1)",
              }}
            >
              <div className="text-sm font-mono mb-2">green shadow</div>
              <div className="text-xs text-muted-foreground">Custom green</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Shadow Values</CardTitle>
          <CardDescription>CSS values for each shadow utility</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded font-mono">
              <span>shadow-sm</span>
              <span className="text-xs text-muted-foreground">
                0 1px 2px 0 rgb(0 0 0 / 0.05)
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded font-mono">
              <span>shadow</span>
              <span className="text-xs text-muted-foreground">
                0 1px 3px 0 rgb(0 0 0 / 0.1)
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded font-mono">
              <span>shadow-md</span>
              <span className="text-xs text-muted-foreground">
                0 4px 6px -1px rgb(0 0 0 / 0.1)
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded font-mono">
              <span>shadow-lg</span>
              <span className="text-xs text-muted-foreground">
                0 10px 15px -3px rgb(0 0 0 / 0.1)
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded font-mono">
              <span>shadow-xl</span>
              <span className="text-xs text-muted-foreground">
                0 20px 25px -5px rgb(0 0 0 / 0.1)
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded font-mono">
              <span>shadow-2xl</span>
              <span className="text-xs text-muted-foreground">
                0 25px 50px -12px rgb(0 0 0 / 0.25)
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <CodeBlock
        title="Shadow Usage"
        code={`/* Basic shadows */
<div className="shadow-sm">Subtle elevation</div>
<div className="shadow-md">Medium elevation</div>
<div className="shadow-lg">High elevation</div>

/* Special shadows */
<div className="shadow-inner">Inset shadow</div>
<div className="shadow-none">Remove shadow</div>

/* Hover effects */
<div className="shadow-md hover:shadow-lg transition-shadow">
  Hover to elevate
</div>

/* Custom colored shadow */
<div style={{ boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.3)' }}>
  Blue shadow
</div>`}
      />
    </div>
  );
};
