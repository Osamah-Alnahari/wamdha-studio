import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ComponentPreview } from "./ComponentPreview";
import { CodeBlock } from "./CodeBlock";

export const InputsTab: React.FC = () => {
  const [checkboxValue, setCheckboxValue] = useState(false);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-2">Inputs</h2>
        <p className="text-muted-foreground mb-8">
          Input components for collecting user data.
        </p>
      </div>

      <ComponentPreview
        title="Input"
        description="A basic input field for text entry"
        code={`import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function InputDemo() {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="Email" />
    </div>
  )
}`}
        fileName="input-demo.tsx"
      >
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" placeholder="Email" />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Input Types"
        description="Different input types for various data"
        code={`import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function InputTypes() {
  return (
    <div className="grid w-full gap-4">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="text">Text</Label>
        <Input type="text" id="text" placeholder="Enter text..." />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" placeholder="Enter email..." />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="password">Password</Label>
        <Input type="password" id="password" placeholder="Enter password..." />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="number">Number</Label>
        <Input type="number" id="number" placeholder="Enter number..." />
      </div>
    </div>
  )
}`}
        fileName="input-types.tsx"
      >
        <div className="grid w-full gap-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="text">Text</Label>
            <Input type="text" id="text" placeholder="Enter text..." />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email-demo">Email</Label>
            <Input type="email" id="email-demo" placeholder="Enter email..." />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="password">Password</Label>
            <Input type="password" id="password" placeholder="Enter password..." />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="number">Number</Label>
            <Input type="number" id="number" placeholder="Enter number..." />
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Textarea"
        description="Multi-line text input for longer content"
        code={`import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export function TextareaDemo() {
  return (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="message">Your message</Label>
      <Textarea placeholder="Type your message here." id="message" />
    </div>
  )
}`}
        fileName="textarea-demo.tsx"
      >
        <div className="grid w-full gap-1.5">
          <Label htmlFor="message">Your message</Label>
          <Textarea placeholder="Type your message here." id="message" />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Select"
        description="Dropdown selection component"
        code={`import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"

export function SelectDemo() {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="framework">Framework</Label>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select a framework" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="next">Next.js</SelectItem>
          <SelectItem value="sveltekit">SvelteKit</SelectItem>
          <SelectItem value="nuxt">Nuxt.js</SelectItem>
          <SelectItem value="remix">Remix</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}`}
        fileName="select-demo.tsx"
      >
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="framework">Framework</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select a framework" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="next">Next.js</SelectItem>
              <SelectItem value="sveltekit">SvelteKit</SelectItem>
              <SelectItem value="nuxt">Nuxt.js</SelectItem>
              <SelectItem value="remix">Remix</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Checkbox"
        description="Binary selection input"
        code={`import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export function CheckboxDemo() {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <Label 
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Accept terms and conditions
      </Label>
    </div>
  )
}`}
        fileName="checkbox-demo.tsx"
      >
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" />
          <Label 
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Accept terms and conditions
          </Label>
        </div>
      </ComponentPreview>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Installation</h3>
        <CodeBlock
          code={`npx shadcn-ui@latest add input
npx shadcn-ui@latest add textarea
npx shadcn-ui@latest add select
npx shadcn-ui@latest add checkbox
npx shadcn-ui@latest add label`}
          language="bash"
          fileName="terminal"
        />
      </div>
    </div>
  );
};