"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlock } from "./CodeBlock";
import { Eye, Code2 } from "lucide-react";

interface ComponentPreviewProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  code: string;
  fileName?: string;
}

export const ComponentPreview: React.FC<ComponentPreviewProps> = ({
  title,
  description,
  children,
  code,
  fileName,
}) => {
  return (
    <div className="space-y-4">
      {(title || description) && (
        <div>
          {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      )}

      <Tabs defaultValue="preview" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="preview" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Preview
          </TabsTrigger>
          <TabsTrigger value="code" className="flex items-center gap-2">
            <Code2 className="h-4 w-4" />
            Code
          </TabsTrigger>
        </TabsList>

        <TabsContent value="preview" className="mt-4">
          <div className="rounded-lg border bg-background p-6 min-h-[200px] flex items-center justify-center">
            {children}
          </div>
        </TabsContent>

        <TabsContent value="code" className="mt-4">
          <CodeBlock code={code} fileName={fileName} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
