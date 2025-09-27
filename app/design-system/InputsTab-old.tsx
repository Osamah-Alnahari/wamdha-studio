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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CodeBlock } from "./CodeBlock";
import { cn } from "@/lib/utils";

export const InputsTab: React.FC = () => {
  const [checkboxValue, setCheckboxValue] = useState(false);

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Text Inputs</CardTitle>
          <CardDescription>Basic input fields for text entry</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="text-input">Text Input</Label>
              <Input id="text-input" placeholder="Enter text..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email-input">Email Input</Label>
              <Input
                id="email-input"
                type="email"
                placeholder="Enter email..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password-input">Password Input</Label>
              <Input
                id="password-input"
                type="password"
                placeholder="Enter password..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="disabled-input">Disabled Input</Label>
              <Input
                id="disabled-input"
                disabled
                placeholder="Disabled input..."
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Textarea</CardTitle>
          <CardDescription>
            Multi-line text input for longer content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="textarea">Message</Label>
            <Textarea
              id="textarea"
              placeholder="Enter your message here..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Select Dropdown</CardTitle>
          <CardDescription>Dropdown selection component</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label>Choose an option</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select an option..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="option1">Option 1</SelectItem>
                <SelectItem value="option2">Option 2</SelectItem>
                <SelectItem value="option3">Option 3</SelectItem>
                <SelectItem value="option4">Option 4</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Checkbox</CardTitle>
          <CardDescription>Boolean selection input</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="checkbox"
              checked={checkboxValue}
              onCheckedChange={(checked) => setCheckboxValue(checked === true)}
            />
            <Label htmlFor="checkbox">Accept terms and conditions</Label>
          </div>
        </CardContent>
      </Card>

      <CodeBlock
        title="Input Components Usage"
        code={`import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Text Input
<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" placeholder="Enter your email" />
</div>

// Textarea
<div className="space-y-2">
  <Label htmlFor="message">Message</Label>
  <Textarea id="message" placeholder="Your message" rows={4} />
</div>

// Select
<Select>
  <SelectTrigger>
    <SelectValue placeholder="Choose option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="1">Option 1</SelectItem>
    <SelectItem value="2">Option 2</SelectItem>
  </SelectContent>
</Select>

// Checkbox
<div className="flex items-center space-x-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">I agree to terms</Label>
</div>`}
      />
    </div>
  );
};
