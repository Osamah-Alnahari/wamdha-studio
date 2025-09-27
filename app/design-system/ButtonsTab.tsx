import React from "react";
import { Button } from "@/components/ui/button";
import { ComponentPreview } from "./ComponentPreview";
import { CodeBlock } from "./CodeBlock";

export const ButtonsTab: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-2">Buttons</h2>
        <p className="text-muted-foreground mb-8">
          Displays a button or a component that looks like a button.
        </p>
      </div>

      <ComponentPreview
        title="Variants"
        description="Use different button variants for different use cases"
        code={`import { Button } from "@/components/ui/button"

export function ButtonDemo() {
  return (
    <div className="flex flex-wrap gap-4">
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
    </div>
  )
}`}
        fileName="button-variants.tsx"
      >
        <div className="flex flex-wrap gap-4">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Sizes"
        description="Different button sizes for various layouts"
        code={`import { Button } from "@/components/ui/button"

export function ButtonSizes() {
  return (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button>Default</Button>
      <Button size="lg">Large</Button>
    </div>
  )
}`}
        fileName="button-sizes.tsx"
      >
        <div className="flex items-center gap-4">
          <Button size="sm">Small</Button>
          <Button>Default</Button>
          <Button size="lg">Large</Button>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="States"
        description="Different button states and interactions"
        code={`import { Button } from "@/components/ui/button"

export function ButtonStates() {
  return (
    <div className="flex items-center gap-4">
      <Button>Normal</Button>
      <Button disabled>Disabled</Button>
      <Button className="opacity-75 cursor-wait">Loading</Button>
    </div>
  )
}`}
        fileName="button-states.tsx"
      >
        <div className="flex items-center gap-4">
          <Button>Normal</Button>
          <Button disabled>Disabled</Button>
          <Button className="opacity-75 cursor-wait">Loading</Button>
        </div>
      </ComponentPreview>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Installation</h3>
        <CodeBlock
          code={`npx shadcn-ui@latest add button`}
          language="bash"
          fileName="terminal"
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Usage</h3>
        <CodeBlock
          code={`import { Button } from "@/components/ui/button"

export function ButtonDemo() {
  return <Button>Click me</Button>
}`}
          fileName="example.tsx"
        />
      </div>
    </div>
  );
};
