import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CodeBlock } from "./CodeBlock";

export const TypographyTab: React.FC = () => {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Typography Scale</CardTitle>
          <CardDescription>
            Consistent type hierarchy with proper semantic structure
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">Heading 1</h1>
            <h2 className="text-3xl font-semibold tracking-tight">Heading 2</h2>
            <h3 className="text-2xl font-semibold">Heading 3</h3>
            <h4 className="text-xl font-semibold">Heading 4</h4>
            <p className="text-base">
              Body text with proper line height and spacing for optimal
              readability.
            </p>
            <p className="text-sm text-muted-foreground">
              Small text for captions and metadata.
            </p>
          </div>
        </CardContent>
      </Card>

      <CodeBlock
        title="Typography Classes"
        code={`<h1 className="text-4xl font-bold tracking-tight">Main heading</h1>
<h2 className="text-3xl font-semibold tracking-tight">Section heading</h2>
<p className="text-base leading-relaxed">Body text</p>
<p className="text-sm text-muted-foreground">Caption text</p>`}
      />
    </div>
  );
};
