import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CodeBlock } from "./CodeBlock";

export const SpacingTab: React.FC = () => {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Spacing System</CardTitle>
          <CardDescription>
            Consistent spacing tokens for margin, padding, and gaps
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Tailwind CSS uses a consistent spacing scale based on rem units.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Padding Examples</CardTitle>
          <CardDescription>Internal spacing within components</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-primary/10 border border-primary/20">
              <div className="p-1 bg-primary/20 border border-primary/30">
                p-1
              </div>
            </div>
            <div className="bg-primary/10 border border-primary/20">
              <div className="p-2 bg-primary/20 border border-primary/30">
                p-2
              </div>
            </div>
            <div className="bg-primary/10 border border-primary/20">
              <div className="p-4 bg-primary/20 border border-primary/30">
                p-4
              </div>
            </div>
            <div className="bg-primary/10 border border-primary/20">
              <div className="p-6 bg-primary/20 border border-primary/30">
                p-6
              </div>
            </div>
            <div className="bg-primary/10 border border-primary/20">
              <div className="p-8 bg-primary/20 border border-primary/30">
                p-8
              </div>
            </div>
            <div className="bg-primary/10 border border-primary/20">
              <div className="p-12 bg-primary/20 border border-primary/30">
                p-12
              </div>
            </div>
            <div className="bg-primary/10 border border-primary/20">
              <div className="p-16 bg-primary/20 border border-primary/30">
                p-16
              </div>
            </div>
            <div className="bg-primary/10 border border-primary/20">
              <div className="p-20 bg-primary/20 border border-primary/30">
                p-20
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Margin Examples</CardTitle>
          <CardDescription>External spacing between components</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted/30 p-4">
            <div className="bg-primary/20 p-2 m-1 border border-primary/30">
              m-1
            </div>
            <div className="bg-primary/20 p-2 m-2 border border-primary/30">
              m-2
            </div>
            <div className="bg-primary/20 p-2 m-4 border border-primary/30">
              m-4
            </div>
            <div className="bg-primary/20 p-2 m-6 border border-primary/30">
              m-6
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Gap Examples</CardTitle>
          <CardDescription>Spacing between flex and grid items</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Flex Gap</h4>
            <div className="flex gap-2 p-4 bg-muted/30 rounded">
              <div className="bg-primary/20 p-2 border border-primary/30">
                Item 1
              </div>
              <div className="bg-primary/20 p-2 border border-primary/30">
                Item 2
              </div>
              <div className="bg-primary/20 p-2 border border-primary/30">
                Item 3
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-2">Grid Gap</h4>
            <div className="grid grid-cols-3 gap-4 p-4 bg-muted/30 rounded">
              <div className="bg-primary/20 p-2 border border-primary/30">
                Item 1
              </div>
              <div className="bg-primary/20 p-2 border border-primary/30">
                Item 2
              </div>
              <div className="bg-primary/20 p-2 border border-primary/30">
                Item 3
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Spacing Scale</CardTitle>
          <CardDescription>
            Complete spacing scale with rem values
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
              <span className="font-mono">0</span>
              <span className="text-muted-foreground">0px</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
              <span className="font-mono">1</span>
              <span className="text-muted-foreground">0.25rem (4px)</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
              <span className="font-mono">2</span>
              <span className="text-muted-foreground">0.5rem (8px)</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
              <span className="font-mono">3</span>
              <span className="text-muted-foreground">0.75rem (12px)</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
              <span className="font-mono">4</span>
              <span className="text-muted-foreground">1rem (16px)</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
              <span className="font-mono">6</span>
              <span className="text-muted-foreground">1.5rem (24px)</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
              <span className="font-mono">8</span>
              <span className="text-muted-foreground">2rem (32px)</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
              <span className="font-mono">12</span>
              <span className="text-muted-foreground">3rem (48px)</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
              <span className="font-mono">16</span>
              <span className="text-muted-foreground">4rem (64px)</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <CodeBlock
        title="Spacing Usage"
        code={`/* Padding */
<div className="p-4">Padding all sides</div>
<div className="px-6 py-4">Horizontal and vertical padding</div>
<div className="pt-8 pb-4">Top and bottom padding</div>

/* Margin */
<div className="m-4">Margin all sides</div>
<div className="mx-auto">Center with auto margin</div>
<div className="mt-8 mb-4">Top and bottom margin</div>

/* Gap */
<div className="flex gap-4">Flex with gap</div>
<div className="grid grid-cols-3 gap-6">Grid with gap</div>`}
      />
    </div>
  );
};
