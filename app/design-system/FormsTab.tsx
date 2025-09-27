import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CodeBlock } from "./CodeBlock";
import { cn } from "@/lib/utils";

// Field component for form examples
const Field: React.FC<{
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  help?: string;
  error?: string;
  required?: boolean;
}> = ({ label, id, type = "text", placeholder, help, error, required }) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className={cn(error && "text-destructive")}>
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        className={cn(
          error && "border-destructive focus-visible:ring-destructive"
        )}
        aria-describedby={
          help ? `${id}-help` : error ? `${id}-error` : undefined
        }
        aria-invalid={error ? "true" : "false"}
      />
      {help && !error && (
        <p id={`${id}-help`} className="text-sm text-muted-foreground">
          {help}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export const FormsTab: React.FC = () => {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Form Controls</CardTitle>
          <CardDescription>
            Accessible form inputs with proper validation states
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Field
              label="Full Name"
              id="name"
              placeholder="Enter your full name"
              help="We'll use this name on your profile"
              required
            />
            <Field
              label="Email Address"
              id="email"
              type="email"
              placeholder="john@example.com"
              required
            />
            <Field
              label="Phone Number"
              id="phone"
              type="tel"
              placeholder="+1 (555) 123-4567"
              error="Please enter a valid phone number"
            />
            <Field label="Company" id="company" placeholder="Acme Inc." />
          </div>
        </CardContent>
      </Card>

      <CodeBlock
        title="Form Field Implementation"
        code={`import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

<div className="space-y-2">
  <Label htmlFor="email">Email Address</Label>
  <Input 
    id="email" 
    type="email" 
    placeholder="john@example.com" 
    required 
  />
  <p className="text-sm text-muted-foreground">
    We'll never share your email
  </p>
</div>`}
      />
    </div>
  );
};
